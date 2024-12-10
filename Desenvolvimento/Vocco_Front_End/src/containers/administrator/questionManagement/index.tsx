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
    InputAdornment,
    TableContainer,
    Table,
    TableRow,
    TableCell,
    TableBody,
    Autocomplete,
    FormControl,
    Paper,
    Checkbox,
    TablePagination,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AdminHeader from '../../../components/adminHeader';
import Footer from '../../../components/homeFooter';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { Link } from 'react-router-dom';
import {
    buscaPerfil,
    detalharPerguntaPorId,
    editarPergunta,
    excluirPergunta,
    listarPergunta
} from '../../../services/testService';
import { Perfil, TestForm } from '../../../types/testTypes';
import { Form, Field, Formik } from 'formik';

interface FormValues {
    id: number;
    texto: string;
    textoIngles: string;
    perfil: Perfil;
    ativo: boolean;
}

function TestManagement() {
    const [questions, setQuestions] = useState<TestForm[]>([]);
    const [perfil, setPerfil] = useState<Perfil[]>([]);
    const [filteredQuestions, setFilteredQuestions] = useState<TestForm[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedQuestion, setSelectedQuestion] = useState<TestForm | null>(null);
    const [detailModalOpen, setDetailModalOpen] = useState(false);
    const [selectedDetailQuestion, setSelectedDetailQuestion] = useState<FormValues | null>(null);
    const [selectedQuestions, setSelectedQuestions] = useState<number[]>([]);
    const [deleteMultipleModalOpen, setDeleteMultipleModalOpen] = useState(false);

    const fetchQuestionDetails = async (questionId: number) => {
        try {
            const questionDetails = await detalharPerguntaPorId(questionId);
            return questionDetails;
        } catch (error) {
            console.error('Erro ao buscar detalhes da pergunta:', error);
            throw error;
            return null;
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            try {
                const fetchedPerfil = await buscaPerfil();
                const questionList = await listarPergunta();
                const questionsWithDetails = await Promise.all(
                    questionList.map(async (question: { id: number, perfilId: number; }) => {
                        const questionDetails = await fetchQuestionDetails(question.id);

                        if (questionDetails) {
                            const perfilObject = fetchedPerfil.find((perfil: { id: number; }) => perfil.id === questionDetails.perfil.id);

                            return {
                                ...questionDetails,
                                perfil: perfilObject || null
                            };
                        }
                        return null;
                    })
                );

                const filteredQuestions = questionsWithDetails.filter((item) => item !== null);

                setPerfil(fetchedPerfil);
                setQuestions(filteredQuestions);
                setFilteredQuestions(filteredQuestions);
            } catch (error) {
                console.error('Erro ao buscar perguntas:', error);
                throw error;
            }

            setLoading(false);
        };
        fetchData();
    }, []);

    const handleDetailModalOpen = async (question: FormValues) => {
        try {
            const data = await detalharPerguntaPorId(question.id);
            setSelectedDetailQuestion(data);
            setDetailModalOpen(true);
        } catch (error) {
            console.error('Erro ao obter detalhes da pergunta:', error);
            throw error;
        }
    };

    const handleDetailModalClose = () => {
        setDetailModalOpen(false);
        setSelectedDetailQuestion(null);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = event.target.value.toLowerCase();
        setSearchTerm(searchTerm);

        if (searchTerm.trim() === '') {
            setFilteredQuestions(questions);
            setPage(0);
            return;
        }

        const filtered = questions.filter((question) => {
            if (!isNaN(Number(searchTerm))) {
                return question.id === Number(searchTerm);
            }
            return question.texto.toLowerCase().includes(searchTerm);
        });

        setFilteredQuestions(filtered);
        setPage(0);
    };

    const handleEditModalOpen = (question: TestForm) => {
        setSelectedQuestion(question);
        setEditModalOpen(true);
    };

    const handleEditModalClose = () => {
        setSelectedQuestion(null);
        setEditModalOpen(false);
    };

    const handleDeleteModalOpen = (question: TestForm) => {
        setSelectedQuestion(question);
        setDeleteModalOpen(true);
    };

    const handleDeleteModalClose = () => {
        setSelectedQuestion(null);
        setDeleteModalOpen(false);
    };

    const handleDeleteCourse = async () => {
        if (selectedQuestion) {
            try {
                await excluirPergunta(selectedQuestion.id);
                setQuestions(questions.map((c) =>
                    c.id === selectedQuestion.id ? { ...c, ativo: false } : c
                ));
                setFilteredQuestions(filteredQuestions.map((c) =>
                    c.id === selectedQuestion.id ? { ...c, ativo: false } : c
                ));
                handleDeleteModalClose();
            } catch (error) {
                console.error('Erro ao excluir pergunta:', error);
                throw error;
            }
        }
    };

    const handleDeleteMultipleModalClose = () => {
        setDeleteMultipleModalOpen(false);
    };

    const handleDeleteMultipleModalOpen = () => {
        setDeleteMultipleModalOpen(true);
    };

    const handleDeleteSelectedQuestions = async () => {
        try {
            await Promise.all(
                selectedQuestions.map(async (questionId) => {
                    await excluirPergunta(questionId);
                })
            );

            setQuestions((prevQuestions) =>
                prevQuestions.map((question) =>
                    selectedQuestions.includes(question.id) ? { ...question, ativo: false } : question
                )
            );

            setFilteredQuestions((prevFilteredQuestions) =>
                prevFilteredQuestions.map((question) =>
                    selectedQuestions.includes(question.id) ? { ...question, ativo: false } : question
                )
            );

            setSelectedQuestions([]);
        } catch (error) {
            console.error('Erro ao excluir perguntas selecionadas:', error);
        }
    };

    const toggleSelectQuestion = (questionId: number) => {
        setSelectedQuestions((prevSelected) =>
            prevSelected.includes(questionId)
                ? prevSelected.filter((id) => id !== questionId)
                : [...prevSelected, questionId]
        );
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

    const paginatedQuestions = filteredQuestions
        .sort((a, b) => b.id - a.id)
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const totalPages = Math.ceil(filteredQuestions.length / rowsPerPage);

    const goToFirstPage = () => {
        setPage(0);
    };

    const goToLastPage = () => {
        setPage(totalPages - 1);
    };

    useEffect(() => {
        setPage(0);
    }, [filteredQuestions]);

    return (
        <>
            <AdminHeader />
            <Box sx={{ marginTop: '20px', minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#F3F3F3' }}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginTop: 20, gap: 2, paddingLeft: 65 }}>
                    <TextField
                        label="Pesquisar perguntas do teste"
                        variant="outlined"
                        sx={{ width: '55%', fontFamily: 'Roboto, monospace' }}
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
                    <Link to="/cadastro-pergunta">
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
                        Teste Vocacional de John Holland
                    </Typography>
                    {loading ? (
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: '60px',
                        }}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <TableContainer>
                            <Table>
                                <TableRow>
                                    <TableCell sx={{ borderRight: '1px solid #ddd', textAlign: 'center', fontWeight: 'bold', color: '#757575', width: '10rem' }}>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={handleDeleteMultipleModalOpen}
                                            disabled={selectedQuestions.length <= 1}
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
                                    <TableCell sx={{ borderRight: '1px solid #ddd', fontWeight: 'bold', color: '#757575' }}>PERGUNTAS</TableCell>
                                    <TableCell sx={{ textAlign: 'center', fontWeight: 'bold', color: '#757575', width: '5rem' }}>STATUS</TableCell>
                                </TableRow>
                                <TableBody>
                                    {paginatedQuestions.map((question) => (
                                        <TableRow key={question.id}>
                                            <TableCell align="center" sx={{ borderRight: '1px solid #ddd' }}>
                                                <Checkbox
                                                    checked={selectedQuestions.includes(question.id)}
                                                    onChange={() => toggleSelectQuestion(question.id)}
                                                    sx={{ '& .MuiSvgIcon-root': { fontSize: 18 } }}
                                                />
                                                <IconButton onClick={() => handleEditModalOpen(question)}>
                                                    <EditIcon sx={{ fontSize: 18 }} />
                                                </IconButton>
                                                <IconButton onClick={() => handleDeleteModalOpen(question)}>
                                                    <DeleteIcon sx={{ fontSize: 18 }} />
                                                </IconButton>
                                            </TableCell>
                                            <TableCell sx={{ borderRight: '1px solid #ddd', textAlign: 'center' }}>{question.id}</TableCell>
                                            <TableCell sx={{ borderRight: '1px solid #ddd', fontSize: '1.1rem', fontFamily: 'Poppins, sans-serif' }}>
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    {question.texto}
                                                    <IconButton
                                                        size="small"
                                                        onClick={(e) => { e.stopPropagation(); handleDetailModalOpen(question); }}
                                                        sx={{ color: '#185D8E' }}
                                                    >
                                                        <VisibilityOutlinedIcon sx={{ fontSize: '18px' }} />
                                                    </IconButton>
                                                </Box>
                                            </TableCell>
                                            <TableCell sx={{ textAlign: 'center' }}>{question.ativo ? 'Ativo' : 'Inativo'}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
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
                        count={filteredQuestions.length}
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

            {/* Modal de detalhes */}
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
                    {selectedDetailQuestion && (

                        <Grid container>
                            <Grid item xs={12}>
                                <Paper sx={{ padding: '20px', height: '290px', border: '3px solid #185D8E', boxShadow: 'none' }}>
                                    <Typography variant="h6" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold', fontFamily: 'Roboto, monospace', color: '#757575' }}>
                                        Dados da pergunta
                                    </Typography>

                                    <Typography sx={{ fontFamily: 'Poppins, sans-serif' }}>
                                        <b>ID:</b> {selectedDetailQuestion.id}
                                    </Typography>
                                    <Typography sx={{ fontFamily: 'Poppins, sans-serif' }}>
                                        <b>Ativo:</b> {selectedDetailQuestion.ativo ? 'Sim' : 'Não'}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontFamily: 'Poppins, sans-serif',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                        }}>
                                        <b>Texto:</b> {selectedDetailQuestion.texto}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontFamily: 'Poppins, sans-serif',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                        }}>
                                        <b>Texto em Inglês:</b> {selectedDetailQuestion.textoIngles || 'Não disponível'}
                                    </Typography>
                                    <Typography sx={{ fontFamily: 'Poppins, sans-serif' }}>
                                        <b>ID do Perfil:</b> {selectedDetailQuestion.perfil?.id || 'Não disponível'}
                                    </Typography>
                                    <Typography sx={{ fontFamily: 'Poppins, sans-serif' }}>
                                        <b>Perfil:</b> {selectedDetailQuestion.perfil?.descricao || 'Não disponível'}
                                    </Typography>
                                </Paper>

                            </Grid>
                        </Grid>
                    )}
                </Box>

            </Modal>

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
                    {selectedQuestion && (
                        <Formik
                            initialValues={selectedQuestion}
                            enableReinitialize
                            onSubmit={async (values, { setSubmitting }) => {
                                try {
                                    const finalValues = {
                                        ...values,
                                        perfilId: values.perfil?.id
                                    };
                                    await editarPergunta(finalValues);
                                    setQuestions(questions.map((question) =>
                                        question.id === values.id ? values : question
                                    ));
                                    setFilteredQuestions(filteredQuestions.map((question) =>
                                        question.id === values.id ? values : question
                                    ));
                                    handleEditModalClose();
                                } catch (error) {
                                    console.error('Erro ao atualizar pergunta:', error);
                                    throw error;
                                }
                                setSubmitting(false);
                            }}
                        >
                            {({ values, setFieldValue, errors, touched }) => (
                                <Form>
                                    <Grid item xs={12} sx={{ textAlign: 'justify' }}>
                                        <Typography
                                            variant="h5" gutterBottom sx={{
                                                fontSize: '20px',
                                                marginBottom: '25px', marginTop: '10px', color: '#185D8E',
                                                fontFamily: 'Roboto, monospace', fontWeight: 'bold', textAlign: 'justify'
                                            }}
                                        >
                                            Edite os campos da pergunta selecionada:
                                        </Typography>
                                    </Grid>

                                    <Grid container spacing={2} direction="column" alignItems="center">
                                        <Grid item sx={{ width: '80%' }} alignItems="center">
                                            <Field
                                                as={TextField}
                                                name="texto"
                                                label="Texto"
                                                fullWidth
                                                multiline
                                                minRows={1}
                                                error={touched.texto && Boolean(errors.texto)}
                                                helperText={touched.texto && errors.texto}
                                            />
                                        </Grid>
                                        <Grid item sx={{ width: '80%' }} alignItems="center">
                                            <Field
                                                as={TextField}
                                                name="textoIngles"
                                                label="Texto em inglês"
                                                fullWidth
                                                multiline
                                                minRows={1}
                                                error={touched.textoIngles && Boolean(errors.textoIngles)}
                                                helperText={touched.textoIngles && errors.textoIngles}
                                            />
                                        </Grid>
                                        <Grid item sx={{ width: '80%' }} alignItems="center">
                                            <FormControl fullWidth variant="filled">
                                                <Autocomplete
                                                    disablePortal
                                                    options={perfil}
                                                    getOptionLabel={(option) => option.descricao}
                                                    value={values.perfil || null}
                                                    onChange={(_, value) => setFieldValue('perfil', value || null)}
                                                    isOptionEqualToValue={(option, value) => option.id === value?.id}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            label="Perfil"
                                                            variant="filled"
                                                            error={touched.perfil && Boolean(errors.perfil)}
                                                        />
                                                    )}
                                                />
                                            </FormControl>
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
                                    </Grid>
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
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        maxWidth: 400,
                        width: '90%',
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
                        Tem certeza que deseja excluir a pergunta?
                    </Typography>
                    <Grid
                        container
                        spacing={2}
                        justifyContent="space-between"
                        sx={{ mt: 2 }}
                    >
                        <Grid item>
                            <Button
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
                            <Button
                                onClick={handleDeleteModalClose}
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
                                Não
                            </Button>
                        </Grid>
                    </Grid>
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
                        Confirmar Exclusão
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
                        Tem certeza que deseja excluir as perguntas selecionadas?
                    </Typography>
                    <Grid container justifyContent="space-between" spacing={2} sx={{ mt: 1 }}>
                        <Grid item>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={async () => {
                                    await handleDeleteSelectedQuestions();
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

        </>
    );
}

export default TestManagement;