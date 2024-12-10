import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    TextField,
    CircularProgress,
    IconButton,
    Modal,
    Button,
    Grid,
    FormControl,
    InputAdornment,
    Autocomplete,
    TableContainer,
    Table,
    TableRow,
    TableCell,
    TableBody,
    TablePagination,
    Paper,
    TableHead,
    Checkbox,
    Snackbar,
    Alert,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AdminHeader from '../../../components/adminHeader';
import Footer from '../../../components/homeFooter';
import { buscarCursosListaCompleta, editarCurso, buscarAreas, excluirCurso } from '../../../services/courseService';
import { CourseForm, Area, TipoInstituicaoCurso, NivelEmpregabilidade } from '../../../types/courseTypes';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import * as yup from 'yup';

const niveisEmpregabilidade = [
    { label: 'Alta', value: 'ALTA' },
    { label: 'Média', value: 'MEDIA' },
    { label: 'Baixa', value: 'BAIXA' },
    { label: 'Em Queda', value: 'EM_QUEDA' },
];

const tiposInstituicao = [
    { label: 'Superior', value: 'SUPERIOR' },
    { label: 'Técnico', value: 'TECNICO' },
    { label: 'Ambos', value: 'AMBOS' },
];

const courseValidationSchema = yup.object().shape({
    descricao: yup.string().required('Descrição é obrigatória'),
    possiveisCarreiras: yup
        .array()
        .of(yup.string().required())
        .min(1, 'Possíveis carreiras é um campo obrigatório'),
});

const CourseManagement: React.FC = () => {
    const [courses, setCourses] = useState<CourseForm[]>([]);
    const [filteredCourses, setFilteredCourses] = useState<CourseForm[]>([]);
    const [areas, setAreas] = useState<Area[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState<CourseForm | null>(null);
    const [detailModalOpen, setDetailModalOpen] = useState(false);
    const [selectedCourses, setSelectedCourses] = useState<number[]>([]);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [showSuccessDeleteMessage, setShowSuccessDeleteMessage] = useState(false);
    const [showErrorDeleteMessage, setShowErrorDeleteMessage] = useState(false);
    const [showSuccessMassDeleteMessage, setShowSuccessMassDeleteMessage] = useState(false);
    const [showErrorMassDeleteMessage, setShowErrorMassDeleteMessage] = useState(false);

    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    const [deleteMultipleModalOpen, setDeleteMultipleModalOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const fetchedAreas = await buscarAreas();
                setAreas(fetchedAreas);

                const fetchedCourses = await buscarCursosListaCompleta();

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const mappedCourses = fetchedCourses.map((course: { area: any }) => {
                    const areaObject = fetchedAreas.find(
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        (area: { descricao: any }) => area.descricao === course.area
                    );
                    return {
                        ...course,
                        area: areaObject || null,
                    };
                });

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const sortedCourses = mappedCourses.sort((a: { descricao: string; }, b: { descricao: any; }) =>
                    a.descricao.localeCompare(b.descricao, 'pt', { sensitivity: 'base' })
                );

                setCourses(sortedCourses);
                setFilteredCourses(sortedCourses);
            } catch (error) {
                console.error('Erro ao buscar cursos ou áreas:', error);
                throw error;
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = event.target.value.toLowerCase();
        setSearchTerm(searchTerm);

        if (searchTerm.trim() === '') {
            setFilteredCourses(courses);
            setPage(0);
            return;
        }

        const filtered = courses.filter((course) => {
            if (!isNaN(Number(searchTerm))) {
                return course.id === Number(searchTerm);
            }
            return course.descricao.toLowerCase().includes(searchTerm);
        });

        setFilteredCourses(filtered);
        setPage(0);
    };

    const handleEditModalOpen = (course: CourseForm) => {
        setSelectedCourse({
            ...course,
            ativo: course.ativo ? 'Ativo' : 'Inativo'
        });
        setEditModalOpen(true);
    };

    const handleEditModalClose = () => {
        setSelectedCourse(null);
        setEditModalOpen(false);
    };

    const handleDeleteModalOpen = (course: CourseForm) => {
        setSelectedCourse(course);
        setDeleteModalOpen(true);
    };

    const handleDeleteModalClose = () => {
        setSelectedCourse(null);
        setDeleteModalOpen(false);
    };

    const handleDeleteCourse = async () => {
        if (selectedCourse) {
            try {
                await excluirCurso(selectedCourse.id);
                setCourses(courses.map((c) =>
                    c.id === selectedCourse.id ? { ...c, ativo: false } : c
                ));
                setFilteredCourses(filteredCourses.map((c) =>
                    c.id === selectedCourse.id ? { ...c, ativo: false } : c
                ));
                setShowSuccessDeleteMessage(true);
            } catch (error) {
                console.error('Erro ao excluir curso:', error);
                setShowErrorDeleteMessage(true);
            } finally {
                handleDeleteModalClose();
            }
        }
    };

    const handleDetailModalOpen = (course: CourseForm) => {
        setSelectedCourse(course);
        setDetailModalOpen(true);
    };

    const handleDetailModalClose = () => {
        setSelectedCourse(null);
        setDetailModalOpen(false);
    };

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

    useEffect(() => {
        setPage(0);
    }, [filteredCourses]);

    const handleDeleteSelectedCourses = async () => {
        try {
            // Faz a exclusão em massa
            await Promise.all(
                selectedCourses.map(async (courseId) => {
                    await excluirCurso(courseId);
                })
            );

            // Atualiza o status dos cursos localmente para "Inativo"
            setCourses((prevCourses) =>
                prevCourses.map((course) =>
                    selectedCourses.includes(course.id) ? { ...course, ativo: false } : course
                )
            );

            setFilteredCourses((prevFilteredCourses) =>
                prevFilteredCourses.map((course) =>
                    selectedCourses.includes(course.id) ? { ...course, ativo: false } : course
                )
            );

            setSelectedCourses([]); // Limpa a seleção
            setShowSuccessMassDeleteMessage(true); // Exibe mensagem de sucesso
        } catch (error) {
            console.error('Erro ao excluir cursos selecionados:', error);
            setShowErrorMassDeleteMessage(true); // Exibe mensagem de erro
        }
    };

    const handleDeleteMultipleModalOpen = () => {
        setDeleteMultipleModalOpen(true);
    };

    const handleDeleteMultipleModalClose = () => {
        setDeleteMultipleModalOpen(false);
    };

    const toggleSelectCourse = (courseId: number) => {
        setSelectedCourses((prevSelected) =>
            prevSelected.includes(courseId)
                ? prevSelected.filter((id) => id !== courseId)
                : [...prevSelected, courseId]
        );
    };

    return (
        <>
            <AdminHeader />
            <Box sx={{ marginTop: '20px', minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#F3F3F3' }}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginTop: 20, gap: 2, paddingLeft: 65 }}>
                    <TextField
                        label="Pesquisar cursos"
                        variant="outlined"
                        sx={{ width: '55%', fontFamily: 'Roboto, monospace', }}
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
                    <Link to="/cadastro-curso">
                        <Button sx={{
                            height: '50px',
                            fontSize: '17px',
                            fontFamily: 'Roboto, monospace',
                            color: 'white',
                            backgroundColor: '#185D8E',
                            fontWeight: 'bold',
                            '&:hover': {
                                backgroundColor: '#104A6F',
                            },
                        }}>Cadastrar</Button>
                    </Link>
                </Box>
                <Box sx={{ paddingTop: 10, paddingLeft: 45, paddingRight: 45, marginBottom: 10 }}>
                    <Typography variant="h6" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold', fontFamily: 'Poppins, sans-serif' }}>
                        Cursos
                    </Typography>

                    {loading ? (
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: '60px'
                            }}
                        >
                            <CircularProgress />
                        </Box>
                    ) : (
                        <TableContainer >
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ borderRight: '1px solid #ddd', textAlign: 'center', fontWeight: 'bold', color: '#757575', width: '10rem' }}>
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                onClick={handleDeleteMultipleModalOpen}
                                                disabled={selectedCourses.length <= 1}
                                                sx={{
                                                    color: 'white',
                                                    backgroundColor: '#185D8E',
                                                    fontWeight: 'bold',
                                                    fontFamily: 'Roboto, monospace',
                                                }}
                                            >
                                                Excluir
                                            </Button>
                                        </TableCell>
                                        <TableCell sx={{ borderRight: '1px solid #ddd', textAlign: 'center', fontWeight: 'bold', color: '#757575', width: '5rem' }}>ID</TableCell>
                                        <TableCell sx={{ borderRight: '1px solid #ddd', fontWeight: 'bold', color: '#757575' }}>NOME</TableCell>
                                        <TableCell sx={{ textAlign: 'center', fontWeight: 'bold', color: '#757575', width: '5rem' }}>STATUS</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {paginatedCourses.map((course) => (
                                        <TableRow key={course.id}>

                                            <TableCell align="center" sx={{ borderRight: '1px solid #ddd' }}>
                                                <Checkbox
                                                    checked={selectedCourses.includes(course.id)}
                                                    onChange={() => toggleSelectCourse(course.id)}
                                                    sx={{ '& .MuiSvgIcon-root': { fontSize: 18 } }}
                                                />
                                                <IconButton onClick={() => handleEditModalOpen(course)}>
                                                    <EditIcon sx={{ fontSize: 18 }} />
                                                </IconButton>
                                                <IconButton onClick={() => handleDeleteModalOpen(course)}>
                                                    <DeleteIcon sx={{ fontSize: 18 }} />
                                                </IconButton>
                                            </TableCell>
                                            <TableCell sx={{ borderRight: '1px solid #ddd', textAlign: 'center' }}>{course.id}</TableCell>
                                            <TableCell sx={{ borderRight: '1px solid #ddd' }}>
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '1.1rem' }}>
                                                    {course.descricao}
                                                    <IconButton size="small" onClick={() => handleDetailModalOpen(course)} sx={{
                                                        color: '#185D8E',
                                                    }}>
                                                        <VisibilityOutlinedIcon sx={{
                                                            fontSize: '18px'
                                                        }} />
                                                    </IconButton>
                                                </Box>
                                            </TableCell>
                                            <TableCell sx={{ textAlign: 'center' }}>{course.ativo ? 'Ativo' : 'Inativo'}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 7 }}>
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
            <Footer />

            {/* Edit Modal */}
            <Modal
                open={editModalOpen}
                onClose={handleEditModalClose}
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
                        maxWidth: 620,
                        borderRadius: '5px'
                    }}
                >
                    {selectedCourse && (
                        <Formik
                            initialValues={{
                                ...selectedCourse,
                                ativo: selectedCourse?.ativo as string
                            }}
                            enableReinitialize
                            validationSchema={courseValidationSchema}
                            onSubmit={async (values, { setSubmitting }) => {
                                try {
                                    const finalValues = {
                                        ...values,
                                        ativo: values.ativo === 'Ativo',
                                        areaId: values.area?.id,
                                    };
                                    await editarCurso(finalValues);
                                    setCourses((prevCourses) =>
                                        prevCourses.map((course) =>
                                            course.id === finalValues.id ? { ...course, ...finalValues } : course
                                        )
                                    );
                                    setFilteredCourses((prevFilteredCourses) =>
                                        prevFilteredCourses.map((course) =>
                                            course.id === finalValues.id ? { ...course, ...finalValues } : course
                                        )
                                    );
                                    setShowSuccessMessage(true);
                                } catch (error) {
                                    console.error('Erro ao atualizar curso:', error);
                                    setShowErrorMessage(true);
                                } finally {
                                    setSubmitting(false);
                                    handleEditModalClose();
                                }
                            }}
                        >
                            {({ values, setFieldValue, errors, touched }) => (
                                <Form>
                                    <Grid container spacing={2} direction="column" alignItems="center"></Grid>
                                    <Grid item xs={12} sx={{ textAlign: 'justify' }}>
                                        <Typography
                                            variant="h5" gutterBottom sx={{
                                                fontSize: '20px',
                                                marginBottom: '25px', marginTop: '10px', color: '#185D8E',
                                                fontFamily: 'Roboto, monospace', fontWeight: 'bold', textAlign: 'justify'
                                            }}
                                        >
                                            Edite os campos  do Curso selecionado:
                                        </Typography>
                                    </Grid>

                                    <Grid container spacing={2} direction="column" alignItems="center">
                                        <Grid item sx={{ width: '60%' }} alignItems="center">
                                            <Field
                                                as={TextField}
                                                name="descricao"
                                                label="Nome"
                                                fullWidth
                                                error={touched.descricao && Boolean(errors.descricao)}
                                                helperText={touched.descricao && errors.descricao}
                                            />
                                        </Grid>
                                        <Grid item sx={{ width: '60%' }} alignItems="center">
                                            <FormControl fullWidth variant="filled">
                                                <Autocomplete
                                                    disablePortal
                                                    options={niveisEmpregabilidade}
                                                    getOptionLabel={(option) => option.label}
                                                    value={niveisEmpregabilidade.find((option) => option.value === values.empregabilidade) || null}
                                                    onChange={(_, value) =>
                                                        setFieldValue('empregabilidade', value ? value.value : NivelEmpregabilidade.INDEFINIDO)
                                                    }
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            label="Empregabilidade"
                                                            variant="filled"
                                                            error={touched.empregabilidade && Boolean(errors.empregabilidade)}
                                                            helperText={touched.empregabilidade && errors.empregabilidade}
                                                        />
                                                    )}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item sx={{ width: '60%' }} alignItems="center">
                                            <FormControl fullWidth variant="filled">
                                                <Autocomplete
                                                    disablePortal
                                                    options={areas}
                                                    getOptionLabel={(option) => option.descricao}
                                                    value={values.area || null}
                                                    onChange={(_, value) => setFieldValue('area', value || null)}
                                                    isOptionEqualToValue={(option, value) => option.id === value?.id}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            label="Área"
                                                            variant="filled"
                                                            error={touched.area && Boolean(errors.area)}
                                                            helperText={touched.area && errors.area}
                                                        />
                                                    )}
                                                />
                                            </FormControl>

                                        </Grid>
                                        <Grid item sx={{ width: '60%' }} alignItems="center">
                                            <FormControl fullWidth variant="filled">
                                                <Autocomplete
                                                    disablePortal
                                                    options={tiposInstituicao}
                                                    getOptionLabel={(option) => option.label}
                                                    value={tiposInstituicao.find((option) => option.value === values.tipo) || null}
                                                    onChange={(_, value) =>
                                                        setFieldValue('tipo', value ? value.value : TipoInstituicaoCurso.INDEFINIDO)
                                                    }
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            label="Tipo de Instituição"
                                                            variant="filled"
                                                            error={touched.tipo && Boolean(errors.tipo)}
                                                            helperText={touched.tipo && errors.tipo}
                                                        />
                                                    )}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item sx={{ width: '60%' }} alignItems="center">
                                            <Field
                                                as={TextField}
                                                name="possiveisCarreiras"
                                                label="Possíveis Carreiras"
                                                fullWidth
                                                value={values.possiveisCarreiras ? values.possiveisCarreiras.join(', ') : ''}
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                                    setFieldValue(
                                                        'possiveisCarreiras',
                                                        e.target.value.split(',').map((carreira) => carreira.trim())
                                                    )
                                                }
                                                error={touched.possiveisCarreiras && Boolean(errors.possiveisCarreiras)}
                                                helperText={touched.possiveisCarreiras && errors.possiveisCarreiras}
                                            />
                                        </Grid>
                                        <Grid item sx={{ width: '60%' }} alignItems="center">
                                            <FormControl fullWidth variant="filled">
                                                <Autocomplete
                                                    disablePortal
                                                    options={['Ativo', 'Inativo']}
                                                    value={values.ativo || 'Inativo'}
                                                    onChange={(_, value) => setFieldValue('ativo', value)}
                                                    isOptionEqualToValue={(option, value) => option === value}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            label="Status do Curso"
                                                            variant="filled"
                                                        />
                                                    )}
                                                />
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>

                                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, marginTop: 3 }}>
                                            <Button variant="contained" onClick={handleEditModalClose} sx={{
                                                height: '50px',
                                                width: '100px',
                                                fontSize: '17px',
                                                fontFamily: 'Roboto, monospace',
                                                fontWeight: 'bold',
                                                color: 'white',
                                                backgroundColor: '#185D8E',
                                                '&:hover': {
                                                    backgroundColor: '#104A6F',
                                                },
                                            }}>
                                                Cancelar
                                            </Button>

                                            <Button type="submit" variant="contained" color="primary" sx={{
                                                height: '50px',
                                                width: '100px',
                                                fontSize: '17px',
                                                fontFamily: 'Roboto, monospace',
                                                fontWeight: 'bold',
                                                color: 'white',
                                                backgroundColor: '#185D8E',
                                                '&:hover': {
                                                    backgroundColor: '#104A6F',
                                                },
                                            }}>
                                                Salvar
                                            </Button>

                                        </Box>
                                    </Grid>
                                    {/* </Grid> */}
                                </Form>
                            )}
                        </Formik>
                    )}
                </Box>
            </Modal>

            {/* Delete Modal */}
            <Modal
                open={deleteModalOpen}
                onClose={handleDeleteModalClose}
                aria-labelledby="modal-modal-title"
            >
                <Box
                    sx={{
                        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                        bgcolor: 'background.paper', boxShadow: 24, p: 4, maxWidth: 400, width: '90%', borderRadius: '5px'
                    }}
                >
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{
                        color: '#185D8E',
                        fontFamily: 'Roboto, monospace',
                        marginTop: 1,
                        fontWeight: 'bold',
                        display: 'flex',
                        justifyContent: 'center',
                        textAlign: 'justify',
                        mb: '5px'
                    }}>
                        Confirmar exclusão
                    </Typography>
                    <Typography id="modal-modal-description" sx={{
                        mt: 2,
                        fontFamily: 'Poppins, sans-serif',
                        textAlign: 'justify',
                        mb: '10px'
                    }}>
                        Você está prestes a excluir o curso {selectedCourse?.descricao}. Deseja continuar?
                    </Typography>
                    <Grid
                        container
                        spacing={2}
                        justifyContent="space-between"
                        sx={{ mt: 1 }}
                    >
                        <Grid item>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleDeleteCourse}
                                sx={{
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
                                }}
                            >
                                Sim
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button variant="outlined" onClick={handleDeleteModalClose} sx={{
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
            {/* Detail Modal */}
            <Modal
                open={detailModalOpen}
                onClose={handleDetailModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper', boxShadow: 24, p: 4, width: '80%', maxWidth: 600, borderRadius: '5px'
                }}>
                    {selectedCourse && (
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Typography
                                    variant="h5"
                                    gutterBottom
                                    sx={{
                                        color: '#185D8E',
                                        fontFamily: 'Roboto, monospace',
                                        fontWeight: 'bold',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        textAlign: 'center'
                                    }}
                                >
                                    {selectedCourse.descricao}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Paper sx={{ padding: '20px', height: '290px', border: '3px solid #185D8E', boxShadow: 'none' }}>
                                    <Typography variant="h6" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold', fontFamily: 'Roboto, monospace', color: '#757575' }}>
                                        Dados do Curso
                                    </Typography>
                                    <Typography sx={{ fontFamily: 'Poppins, sans-serif', }}><b>ID:</b> {selectedCourse.id}</Typography>
                                    <Typography sx={{ fontFamily: 'Poppins, sans-serif', }}><b>Status:</b> {selectedCourse.ativo ? 'Ativo' : 'Inativo'}</Typography>
                                    <Typography sx={{ fontFamily: 'Poppins, sans-serif', }}><b>Nome:</b> {selectedCourse.descricao}</Typography>
                                    <Typography sx={{ fontFamily: 'Poppins, sans-serif', }}>
                                        <b>Empregabilidade:</b> {niveisEmpregabilidade.find((nivel) => nivel.value === selectedCourse.empregabilidade)?.label || 'Não especificada'}
                                    </Typography>
                                    <Typography sx={{ fontFamily: 'Poppins, sans-serif', }}> <b>Área:</b> {selectedCourse.area?.descricao || 'Não especificada'}</Typography>
                                    <Typography sx={{ fontFamily: 'Poppins, sans-serif', }}>
                                        <b>Tipo de Ensino:</b> {tiposInstituicao.find((tipo) => tipo.value === selectedCourse.tipo)?.label || 'Não especificado'}
                                    </Typography>
                                    <Typography sx={{ fontFamily: 'Poppins, sans-serif', }}>
                                        <b>Possíveis Carreiras:</b> {selectedCourse.possiveisCarreiras?.join(', ') || 'Não especificadas'}
                                    </Typography>
                                </Paper>
                            </Grid>
                        </Grid>
                    )}
                </Box>
            </Modal>
            <Modal
                open={deleteMultipleModalOpen}
                onClose={handleDeleteMultipleModalClose}
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
                        maxWidth: 400,
                        width: '90%',
                        borderRadius: '5px',
                    }}
                >
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                        sx={{
                            color: '#185D8E',
                            fontFamily: 'Roboto, monospace',
                            marginTop: 1,
                            fontWeight: 'bold',
                            textAlign: 'center',
                            mb: '5px',
                        }}
                    >
                        Confirmar exclusão
                    </Typography>
                    <Typography
                        id="modal-modal-description"
                        sx={{
                            mt: 2,
                            fontFamily: 'Poppins, sans-serif',
                            textAlign: 'justify',
                            mb: '10px',
                        }}
                    >
                        Você está prestes a excluir os cursos selecionados. Deseja continuar?
                    </Typography>
                    <Grid container justifyContent="space-between" spacing={2} sx={{ mt: 1 }}>
                        <Grid item>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={async () => {
                                    await handleDeleteSelectedCourses();
                                    handleDeleteMultipleModalClose();
                                }}
                                sx={{
                                    height: '35px',
                                    fontSize: '17px',
                                    fontFamily: 'Roboto, monospace',
                                    color: 'white',
                                    backgroundColor: '#185D8E',
                                    fontWeight: 'bold',
                                    '&:hover': {
                                        backgroundColor: '#104A6F',
                                        color: 'white',
                                    },
                                }}
                            >
                                Sim
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                variant="outlined"
                                onClick={handleDeleteMultipleModalClose}
                                sx={{
                                    height: '35px',
                                    fontSize: '17px',
                                    fontFamily: 'Roboto, monospace',
                                    color: 'white',
                                    backgroundColor: '#185D8E',
                                    fontWeight: 'bold',
                                    '&:hover': {
                                        backgroundColor: '#104A6F',
                                        color: 'white',
                                    },
                                }}
                            >
                                Não
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>

            {/* Mensagem de sucesso na atualização */}
            <Snackbar
                open={showSuccessMessage}
                autoHideDuration={6000}
                onClose={() => setShowSuccessMessage(false)}
            >
                <Alert onClose={() => setShowSuccessMessage(false)} severity="success" sx={{ width: '100%' }}>
                    Curso atualizado com sucesso!
                </Alert>
            </Snackbar>

            {/* Mensagem de erro na atualização */}
            <Snackbar
                open={showErrorMessage}
                autoHideDuration={6000}
                onClose={() => setShowErrorMessage(false)}
            >
                <Alert onClose={() => setShowErrorMessage(false)} severity="error" sx={{ width: '100%' }}>
                    Erro ao atualizar curso.
                </Alert>
            </Snackbar>

            {/* Mensagem de sucesso na exclusão */}
            <Snackbar
                open={showSuccessDeleteMessage}
                autoHideDuration={6000}
                onClose={() => setShowSuccessDeleteMessage(false)}
            >
                <Alert onClose={() => setShowSuccessDeleteMessage(false)} severity="success" sx={{ width: '100%' }}>
                    Curso excluído com sucesso!
                </Alert>
            </Snackbar>

            {/* Mensagem de erro na exclusão */}
            <Snackbar
                open={showErrorDeleteMessage}
                autoHideDuration={6000}
                onClose={() => setShowErrorDeleteMessage(false)}
            >
                <Alert onClose={() => setShowErrorDeleteMessage(false)} severity="error" sx={{ width: '100%' }}>
                    Erro ao excluir curso.
                </Alert>
            </Snackbar>

            {/* Mensagem de sucesso na exclusão múltipla */}
            <Snackbar
                open={showSuccessMassDeleteMessage}
                autoHideDuration={6000}
                onClose={() => setShowSuccessMassDeleteMessage(false)}
            >
                <Alert onClose={() => setShowSuccessMassDeleteMessage(false)} severity="success" sx={{ width: '100%' }}>
                    Cursos excluídos com sucesso!
                </Alert>
            </Snackbar>

            {/* Mensagem de erro na exclusão múltipla */}
            <Snackbar
                open={showErrorMassDeleteMessage}
                autoHideDuration={6000}
                onClose={() => setShowErrorMassDeleteMessage(false)}
            >
                <Alert onClose={() => setShowErrorMassDeleteMessage(false)} severity="error" sx={{ width: '100%' }}>
                    Erro ao excluir cursos.
                </Alert>
            </Snackbar>
        </>
    );
};

export default CourseManagement;
