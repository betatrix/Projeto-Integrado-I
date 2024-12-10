/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
    Box,
    TextField,
    List,
    ListItem,
    ListItemText,
    Checkbox,
    Button,
    Typography,
    CircularProgress,
    Input,
    InputLabel,
    FormControl,
    FormHelperText,
    Stepper,
    StepLabel,
    Grid,
    Modal,
    InputAdornment,
    TablePagination,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import { useInstitution } from '../../../context/institutionContext';
import { buscarCursos } from '../../../services/courseService';
import { cadastrarCursoInstituicao } from '../../../services/courseInstitutionService';
import Step from '@mui/material/Step';
import { CourseForm } from '../../../types/courseTypes';
import { useNavigate } from 'react-router-dom';
import AdminHeader from '../../../components/adminHeader';
import Footer from '../../../components/homeFooter';
import * as yup from 'yup';

const notaMecSchema = yup
    .number()
    .nullable()
    .typeError('A nota deve ser um número')
    .min(1, 'Nota mínima 1')
    .max(10, 'Nota máxima 10');

export const BuscaCurso: React.FC = () => {
    const { institutionId } = useInstitution();
    const navigate = useNavigate();
    const steps = [
        'Cadastrar Dados da Instituição',
        'Adicionar Cursos na Instituição',
        'Adicionar Políticas Afirmativas na Instituição',
    ];
    const [selectedCourses, setSelectedCourses] = useState<{
        [key: number]: { notaMec: number; isSelected: boolean };
    }>({});
    const [courses, setCourses] = useState<CourseForm[]>([]);
    const [filteredCourses, setFilteredCourses] = useState<CourseForm[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [validationErrors, setValidationErrors] = useState<{
        [key: number]: string;
    }>({});
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);

    useEffect(() => {
        const fetchCourses = async () => {
            setLoading(true);
            try {
                const fetchedCourses = await buscarCursos();
                setCourses(fetchedCourses);
                setFilteredCourses(fetchedCourses);
            } catch (error) {
                console.error('Failed to fetch courses:', error);
                throw error;
            }
            setLoading(false);
        };
        fetchCourses();
    }, [institutionId, navigate]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        const filtered = courses.filter((course) =>
            course.descricao.toLowerCase().includes(event.target.value.toLowerCase())
        );
        setFilteredCourses(filtered);
    };

    const handleCourseSelection = (
        courseId: number,
        notaMec: number,
        isSelected: boolean
    ) => {
        setSelectedCourses((prev) => ({
            ...prev,
            [courseId]: { notaMec, isSelected },
        }));
    };

    const handleNotaMecChange = async (courseId: number, notaMec: number) => {
        try {
            await notaMecSchema.validate(notaMec);
            setValidationErrors((prev) => ({ ...prev, [courseId]: '' }));
            setSelectedCourses((prev) => ({
                ...prev,
                [courseId]: { ...prev[courseId], notaMec },
            }));
        } catch (error) {
            if (error instanceof Error) {
                setValidationErrors(prev => ({ ...prev, [courseId]: error.message }));
            } else {
                console.error('Unexpected error:', error);
            }
        }
    };

    const handleOpenConfirmModal = () => {
        const hasSelectedCourse = Object.values(selectedCourses).some(course => course.isSelected);
        if (hasSelectedCourse) {
            setConfirmModalOpen(true);
        } else {
            alert('Selecione um curso para adicionar!');
        }
    };

    const handleCloseConfirmModal = () => {
        setConfirmModalOpen(false);
    };

    const handleConfirmCourses = async () => {
        if (!institutionId) {
            alert('Instituição não identificada.');
            return;
        }
        try {
            const selectedEntries = Object.entries(selectedCourses)
                .filter(([_, c]) => c.isSelected)
                .map(([id, { notaMec }]) => ({
                    courseId: Number(id),
                    notaMec,
                }));
            if (selectedEntries.length > 0) {
                for (const { notaMec } of selectedEntries) {
                    await notaMecSchema.validate(notaMec);
                }
                await Promise.all(
                    selectedEntries.map(({ notaMec, courseId }) =>
                        cadastrarCursoInstituicao(institutionId, notaMec, courseId)
                    )
                );
                navigate('/politicas', { state: { institutionId } });
                // alert('Cursos cadastrados com sucesso na Instituição');
            } else {
                alert('Selecione um curso para continuar!');
            }
        } catch (error) {
            alert('Erro na validação das notas MEC.');
        }
        setConfirmModalOpen(false);
    };

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (_event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const paginatedCourses = filteredCourses
        .sort((a, b) => b.id - a.id)
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const totalPages = Math.ceil(filteredCourses.length / rowsPerPage);

    const goToFirstPage = () => {
        setPage(0);
    };

    const goToLastPage = () => {
        setPage(totalPages - 1);
    };

    return (
        <>
            <AdminHeader />
            <Box sx={{ marginTop: '20px', minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#F3F3F3' }}>
                <Box sx={{ height: 90 }}></Box>
                <Box sx={{ width: '100%' }}>
                    <Stepper activeStep={1} alternativeLabel>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Box>
                <Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                            maxWidth: 600,
                            margin: 'auto',
                            mt: 4,
                            marginBottom: '40px',
                        }}
                    >
                        <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginTop: 5, gap: 2, marginBottom: '30px' }}>
                            <TextField
                                label="Pesquisar Curso"
                                variant="outlined"
                                sx={{ width: '100%', fontFamily: 'Roboto, monospace', }}

                                value={searchTerm}
                                onChange={handleSearchChange}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <SearchIcon />
                                        </InputAdornment>
                                    ),
                                }}

                            />
                            <Button variant="contained" sx={{
                                height: '50px',
                                fontSize: '17px',
                                fontFamily: 'Roboto, monospace',
                                color: 'white',
                                backgroundColor: '#185D8E',
                                fontWeight: 'bold',
                                '&:hover': {
                                    backgroundColor: '#104A6F',
                                },
                            }} onClick={handleOpenConfirmModal}>
                                Adicionar
                            </Button>
                            <Button variant="contained" sx={{
                                height: '50px',
                                fontSize: '17px',
                                fontFamily: 'Roboto, monospace',
                                color: 'white',
                                backgroundColor: '#185D8E',
                                fontWeight: 'bold',
                                '&:hover': {
                                    backgroundColor: '#104A6F',
                                },
                            }} onClick={
                                () => {
                                    navigate('/politicas', { state: { institutionId } });
                                }
                            }>
                                Continuar
                            </Button>
                        </Box>
                        {loading ? (
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: '80vh',
                                }}
                            >
                                <CircularProgress />
                            </Box>
                        ) : (
                            <List>
                                {paginatedCourses.map((course) => (
                                    <ListItem key={course.id} divider>
                                        <Checkbox
                                            checked={selectedCourses[course.id]?.isSelected || false}
                                            onChange={(e) =>
                                                handleCourseSelection(
                                                    course.id,
                                                    selectedCourses[course.id]?.notaMec || 0,
                                                    e.target.checked
                                                )
                                            }
                                        />
                                        <ListItemText primary={course.descricao} />
                                        {selectedCourses[course.id]?.isSelected && (
                                            <FormControl
                                                style={{ marginLeft: '10px', minWidth: '120px' }}
                                                error={!!validationErrors[course.id]}
                                            >
                                                <InputLabel htmlFor={`notaMec-${course.id}`}>
                                                    Nota MEC|IDEB
                                                </InputLabel>
                                                <Input
                                                    id={`notaMec-${course.id}`}
                                                    value={selectedCourses[course.id]?.notaMec || ''}
                                                    onChange={(e) =>
                                                        handleNotaMecChange(
                                                            course.id,
                                                            Number(e.target.value)
                                                        )
                                                    }
                                                    type="number"
                                                    inputProps={{ min: 1, max: 5 }}
                                                />
                                                <FormHelperText>
                                                    {validationErrors[course.id] || 'Nota de 1 a 5'}
                                                </FormHelperText>
                                            </FormControl>
                                        )}
                                    </ListItem>
                                ))}
                            </List>
                        )}
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 7 }}>
                    <Button
                        onClick={goToFirstPage}
                        disabled={page === 0}
                        sx={{ marginRight: 2, fontFamily: 'Roboto, monospace', fontWeight: 'bold' }}
                    >
                        Primeira Página
                    </Button>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={filteredCourses.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                    <Button
                        onClick={goToLastPage}
                        disabled={page === totalPages - 1}
                        sx={{ marginLeft: 2, fontFamily: 'Roboto, monospace', fontWeight: 'bold' }}
                    >
                        Última Página
                    </Button>
                </Box>
            </Box>

            {/* Confirm Modal */}
            <Modal
                open={confirmModalOpen}
                onClose={handleCloseConfirmModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        width: '80%',
                        maxWidth: 400,
                        borderRadius: '5px'
                    }}
                >
                    <Typography variant="h6" component="h2" gutterBottom sx={{
                        color: '#185D8E',
                        fontFamily: 'Roboto, monospace',
                        marginTop: 1,
                        fontWeight: 'bold',
                        display: 'flex',
                        justifyContent: 'center',
                        textAlign: 'justify',
                        mb: '5px'
                    }}>
                        Confirmação
                    </Typography>
                    <Typography variant="body1" gutterBottom sx={{
                        mt: 2,
                        fontFamily: 'Poppins, sans-serif',
                        textAlign: 'justify',
                        mb: '10px'
                    }}>
                        Você está prestes a adicionar os cursos selecionados à instituição.
                        Deseja continuar?
                    </Typography>
                    <Grid container spacing={2} justifyContent="space-between"
                        sx={{ mt: 1 }}>
                        <Grid item >
                            <Button variant="contained" color="primary" onClick={handleConfirmCourses} sx={{
                                height: '35px',
                                fontSize: '17px',
                                fontFamily: 'Roboto, monospace',
                                color: 'white',
                                backgroundColor: '#185D8E',
                                fontWeight: 'bold',
                                '&:hover': {
                                    backgroundColor: '#104A6F',
                                    color: 'white',
                                }
                            }}>
                                Sim
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" onClick={handleCloseConfirmModal} sx={{
                                height: '35px',
                                fontSize: '17px',
                                fontFamily: 'Roboto, monospace',
                                color: 'white',
                                backgroundColor: '#185D8E',
                                fontWeight: 'bold',
                                '&:hover': {
                                    backgroundColor: '#104A6F',
                                    color: 'white',
                                }
                            }}>
                                Não
                            </Button>
                        </Grid>

                    </Grid>
                </Box>
            </Modal>
            <Footer />
        </>
    );
};

export default BuscaCurso;
