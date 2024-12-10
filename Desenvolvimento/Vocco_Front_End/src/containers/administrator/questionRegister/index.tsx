import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, FieldProps } from 'formik';
import {
    Box,
    Typography,
    Grid,
    Button,
    Paper,
    Autocomplete,
    // CircularProgress,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';
import AdminHeader from '../../../components/adminHeader';
import Footer from '../../../components/homeFooter';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { buscaPerfil, cadastrarPergunta } from '../../../services/testService';
import { Perfil, TestFormCad } from '../../../types/testTypes';

const questionValidationSchema = yup.object().shape({
    texto: yup.string().required('O texto é obrigatória'),
    textoIngles: yup.string().required('O texto em inglês é obrigatória'),
    perfilId: yup.number().required('Perfil é obrigatório'),
});

const QuestionRegister: React.FC = () => {
    const [perfil, setPerfil] = useState<Perfil[]>([]);
    const [message, setMessage] = useState<string | null>(null); // Estado para a mensagem de sucesso/erro
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Estado para controlar o modal
    const navigate = useNavigate(); // Hook para navegação

    useEffect(() => {
        const fetchAreas = async () => {
            try {
                const fetchedPerfil = await buscaPerfil();
                setPerfil(fetchedPerfil);
            } catch (error) {
                console.error('Erro ao buscar perfis:', error);
                throw error;
            }
        };
        fetchAreas();
    }, []);

    const initialValues: TestFormCad = {
        texto: '',
        textoIngles: '',
        testeId: 1,
        perfilId: undefined,
    };

    const handleSubmit = async (values: TestFormCad) => {
        try {
            const response = await cadastrarPergunta(values);
            if (response.status === 200) {
                setMessage('Pergunta cadastrado com sucesso!');
            }
        } catch (error) {
            setMessage('Erro ao cadastrar pergunta');
        } finally {
            setIsModalOpen(true);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setMessage(null);
        navigate('/gerenciamento-teste');
    };

    return (
        <>
            <AdminHeader />
            <Box sx={{ minHeight: '90vh', display: 'flex', flexDirection: 'column', backgroundColor: '#F3F3F3' }}>
                <Box sx={{ height: 50 }}></Box>
                <Box sx={{ backgroundColor: '#F3F3F3', marginTop: 10 }}>
                    <Box sx={{ marginTop: 5 }}>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={questionValidationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ isSubmitting, errors, touched }) => (
                                <Form>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 2,
                                            maxWidth: 600,
                                            margin: 'auto',
                                        }}
                                    >
                                        <Paper
                                            sx={{ padding: 4, paddingBottom: 8, paddingLeft: 7, paddingRight: 7 }}
                                        >
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    fontSize: '25px',
                                                    textAlign: 'left',
                                                    fontFamily: 'Roboto, monospace',
                                                    color: '#757575',
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                Dados da Pergunta
                                            </Typography>
                                            <Grid
                                                container
                                                spacing={2}
                                            >

                                                <Grid item xs={12}>
                                                    <Field
                                                        as={TextField}
                                                        name="texto"
                                                        label="Texto da pergunta"
                                                        variant="standard"
                                                        size="small"
                                                        fullWidth
                                                        multiline
                                                        error={touched.texto && Boolean(errors.texto)}
                                                        helperText={touched.texto && errors.texto}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Field
                                                        as={TextField}
                                                        name="textoIngles"
                                                        label="Texto em inglês"
                                                        variant="standard"
                                                        size="small"
                                                        fullWidth
                                                        multiline
                                                        error={touched.textoIngles && Boolean(errors.textoIngles)}
                                                        helperText={touched.textoIngles && errors.textoIngles}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Field name="perfilId">
                                                        {({ field, form, meta }: FieldProps<number>) => (
                                                            <Autocomplete
                                                                options={perfil}
                                                                getOptionLabel={(option) => option.descricao}
                                                                value={perfil.find((option) => option.id === field.value) || null}
                                                                onChange={(_, value) => {
                                                                    form.setFieldValue(field.name, value ? value.id : '');
                                                                }}
                                                                renderInput={(params) => (
                                                                    <TextField
                                                                        {...params}
                                                                        label="Perfil"
                                                                        variant="filled"
                                                                        error={meta.touched && Boolean(meta.error)}
                                                                        helperText={meta.touched && meta.error}
                                                                    />
                                                                )}
                                                            />
                                                        )}
                                                    </Field>
                                                </Grid>
                                            </Grid>
                                        </Paper>

                                        <Grid container spacing={2} justifyContent="center" sx={{ marginBottom: 10 }}>
                                            <Grid item xs={12}>
                                                <Button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    variant="contained"
                                                    sx={{
                                                        fontSize: '20px',
                                                        fontFamily: 'Roboto, monospace',
                                                        color: 'white',
                                                        backgroundColor: '#185D8E',
                                                        fontWeight: 'bold',
                                                        width: '100%',
                                                        height: '45px',
                                                    }}
                                                >
                                                    Cadastrar
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Form>
                            )}
                        </Formik>
                    </Box>
                </Box>
            </Box>

            {/* Modal de Confirmação */}
            <Dialog
                open={isModalOpen}
                onClose={handleCloseModal}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <DialogTitle id="modal-title" variant="h6" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold' }}>Confirmação</DialogTitle>
                <DialogContent >
                    <DialogContentText id="modal-description" variant="h6" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold', fontFamily: 'Roboto, monospace', }}>
                        Teste Cadastrado!
                        {message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <Button
                            onClick={handleCloseModal}
                            sx={{
                                textAlign: 'center',
                                height: '35px',
                                fontSize: '17px',
                                fontFamily: 'Roboto, monospace',
                                color: 'white',
                                backgroundColor: '#185D8E',
                                fontWeight: 'bold',
                                marginBottom: '10px',
                                '&:hover': {
                                    backgroundColor: '#104A6F',
                                    color: 'white',
                                }
                            }}
                        >
                            OK
                        </Button>
                    </Box>
                </DialogActions>
            </Dialog>

            <Footer />
        </>
    );
};

export default QuestionRegister;

