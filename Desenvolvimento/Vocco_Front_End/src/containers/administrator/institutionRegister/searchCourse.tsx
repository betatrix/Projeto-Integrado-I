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
} from '@mui/material';

import { useInstitution } from '../../../context/institutionContext';
import { buscarCursos } from '../../../services/courseService';
import { cadastrarCursoInstituicao } from '../../../services/courseInstitutionService';
import Step from '@mui/material/Step';
import { CourseForm } from '../../../types/courseTypes';
import { useNavigate } from 'react-router-dom';
import AdminHeader from '../../../components/adminHeader';
import Footer from '../../../components/adminFooter';
import * as yup from 'yup';

const notaMecSchema = yup
    .number()
    .nullable()
    .typeError('A nota deve ser um número')
    .min(1, 'Nota mínima 1')
    .max(5, 'Nota máxima 5')
    .required('A nota é obrigatória');

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
        if (!institutionId) {
            navigate('/cadastro');
        } else {
            const fetchCourses = async () => {
                setLoading(true);
                try {
                    const fetchedCourses = await buscarCursos();
                    setCourses(fetchedCourses);
                    setFilteredCourses(fetchedCourses);
                } catch (error) {
                    console.error('Failed to fetch courses:', error);
                }
                setLoading(false);
            };
            fetchCourses();
        }
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
            alert('Selecione um curso para continuar!');
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
                for (const { notaMec, courseId } of selectedEntries) {
                    await notaMecSchema.validate(notaMec);
                    console.log(courseId);
                }
                const responses = await Promise.all(
                    selectedEntries.map(({ notaMec, courseId }) =>
                        cadastrarCursoInstituicao(institutionId, notaMec, courseId)
                    )
                );
                navigate('/politicas', { state: { institutionId } });
                console.log('Cursos cadastrados com sucesso:', responses);
                // alert('Cursos cadastrados com sucesso na Instituição');
            } else {
                alert('Selecione um curso para continuar!');
            }
        } catch (error) {
            console.error('Erro ao cadastrar cursos na instituição:', error);
            alert('Erro na validação das notas MEC.');
        }
        setConfirmModalOpen(false);
    };

    return (
        <>
            <AdminHeader />
            <Box sx={{ marginTop: '20px' }}>
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
                        <Typography variant="h4" sx={{ mb: 2 }}>
                            Cursos da Instituição
                        </Typography>
                        <TextField
                            label="Pesquisar Curso"
                            variant="standard"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            fullWidth
                        />
                        {loading ? (
                            <CircularProgress />
                        ) : (
                            <List>
                                {filteredCourses.map((course) => (
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
                                                    Nota MEC
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
                        <Grid container spacing={2} justifyContent="space-between">
                            <Grid item xs={6} display="flex" justifyContent="flex-start">
                                <Button
                                    variant="outlined"
                                    onClick={() => navigate('/cadastro')}
                                >
                                    Voltar
                                </Button>
                            </Grid>
                            <Grid item xs={6} display="flex" justifyContent="flex-end">
                                <Button variant="contained" onClick={handleOpenConfirmModal}>
                                    Avançar
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
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
                    }}
                >
                    <Typography variant="h6" gutterBottom>
                        Confirmação
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Você está prestes a adicionar os cursos selecionados à instituição.
                        Deseja continuar?
                    </Typography>
                    <Grid container spacing={2} justifyContent="space-between">
                        <Grid item xs={6} display="flex" justifyContent="flex-start">
                            <Button variant="outlined" onClick={handleCloseConfirmModal}>
                                Cancelar
                            </Button>
                        </Grid>
                        <Grid item xs={6} display="flex" justifyContent="flex-end">
                            <Button variant="contained" onClick={handleConfirmCourses}>
                                Confirmar
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
