import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { TextField } from 'formik-mui';
import { Button, Box, Grid, Typography, Paper, FormControl, InputLabel, FilledInput, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import * as Yup from 'yup';
import axios from 'axios';
import { cadastrarAdministrador } from '../../../services/userService'; // Função que você já criou
import Footer from '../../../components/homeFooter';
import AdminHeader from '../../../components/adminHeader';
import { useNavigate } from 'react-router-dom';

export const CadastroAdministrador: React.FC = () => {
    const [isModalOpen, setModalOpen] = useState(false); // Controle do modal
    const navigate = useNavigate(); // Para navegação

    const initialValues = {
        nome: '',
        cpf: '',
        email: '',
        senha: '',
        cargo: '',
        celular: '',
        endereco: {
            cep: '',
            logradouro: '',
            numero: '',
            complemento: '',
            bairro: '',
            cidade: '',
            estado: '',
        },
    };

    const validationSchema = Yup.object({
        nome: Yup.string().required('O nome é obrigatório'),
        cpf: Yup.string()
            .required('O CPF é obrigatório')
            .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'O CPF deve conter 11 dígitos numéricos'),
        email: Yup.string().email('E-mail inválido').required('O e-mail é obrigatório'),
        senha: Yup.string()
            .required('A senha é obrigatória')
            .min(5, 'A senha deve ter pelo menos 5 caracteres'),
        cargo: Yup.string().required('O cargo é obrigatório'),
        celular: Yup.string()
            .required('O celular é obrigatório')
            .matches(/^\(\d{2}\) \d{5}-\d{4}$/, 'Formato inválido (Ex: (99) 99999-9999)'),
        endereco: Yup.object().shape({
            cep: Yup.string()
                .required('O CEP é obrigatório')
                .matches(/^\d{8}$/, 'O CEP deve conter 8 dígitos'),
            logradouro: Yup.string().required('O logradouro é obrigatório'),
            numero: Yup.string().required('O número é obrigatório'),
            complemento: Yup.string(),
            bairro: Yup.string().required('O bairro é obrigatório'),
            cidade: Yup.string().required('A cidade é obrigatória'),
            estado: Yup.string().required('O estado é obrigatório'),
        }),
    });

    const formatarCPF = (value: string) => {
        const cleaned = value.replace(/\D/g, '');
        const match = cleaned.match(/^(\d{3})(\d{3})(\d{3})(\d{2})$/);

        if (match) {
            return `${match[1]}.${match[2]}.${match[3]}-${match[4]}`;
        }

        return value;
    };
    const formatarCelular = (value: string) => {
        const cleaned = value.replace(/\D/g, '');
        const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);

        if (match) {
            return `(${match[1]}) ${match[2]}-${match[3]}`;
        }

        return value;
    };

    const handleCepChange = async (
        event: React.ChangeEvent<HTMLInputElement>,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
    ) => {
        const cep = event.target.value.replace(/\D/g, '');
        setFieldValue('endereco.cep', cep);

        if (cep.length === 8) {
            try {
                const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
                const { logradouro, bairro, localidade, uf } = response.data;

                setFieldValue('endereco.logradouro', logradouro || '');
                setFieldValue('endereco.bairro', bairro || '');
                setFieldValue('endereco.cidade', localidade || '');
                setFieldValue('endereco.estado', uf || '');
            } catch (error) {
                console.error('Erro ao buscar CEP:', error);
            }
        }
    };

    // Função para envio do formulário
    const handleSubmit = async (values: typeof initialValues, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        try {
            await cadastrarAdministrador(values); // Chama a função de cadastro no serviço
            setModalOpen(true); // Abre o modal de confirmação
        } catch (error) {
            console.error('Erro ao cadastrar administrador:', error);
            throw error;
        } finally {
            setSubmitting(false);
        }
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        navigate('/gerenciamento-administrador'); // Redireciona após fechar o modal
    };

    return (
        <>
            <AdminHeader />
            <Box sx={{ backgroundColor: '#F3F3F3', padding: '20px' }}>
                <Box sx={{ height: 50 }}></Box>
                <Box sx={{ backgroundColor: '#F3F3F3', marginTop: 10 }}>
                    <Box sx={{ marginTop: 5 }}>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({
                                values,
                                handleBlur,
                                setFieldValue,
                                touched,
                                errors,
                            }) => (
                                <Form>
                                    <Box sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 2,
                                        maxWidth: 600,
                                        margin: 'auto',
                                    }}>
                                        <Paper sx={{ padding: 4, marginBottom: 3, paddingBottom: 8, paddingLeft: 7, paddingRight: 7 }}>
                                            <Typography variant="h6"
                                                sx={{
                                                    fontSize: '25px',
                                                    textAlign: 'left',
                                                    fontFamily: 'Roboto, monospace',
                                                    color: '#757575',
                                                    fontWeight: 'bold',
                                                }}>
                                                Dados do Administrador
                                            </Typography>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12}>
                                                    <Field
                                                        component={TextField}
                                                        name="nome"
                                                        label="Nome"
                                                        variant="standard"
                                                        fullWidth
                                                        required
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <FormControl variant="filled" fullWidth>
                                                        <InputLabel htmlFor="cpf">CPF</InputLabel>
                                                        <FilledInput
                                                            id="cpf"
                                                            type="text"
                                                            name="cpf"
                                                            value={values.cpf}
                                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                                const formattedValue = formatarCPF(e.target.value);
                                                                setFieldValue('cpf', formattedValue);
                                                            }}
                                                            inputProps={{ maxLength: 14 }}
                                                            onBlur={handleBlur}
                                                            error={Boolean(touched.cpf && errors.cpf)}

                                                        />
                                                        {touched.cpf && errors.cpf && (
                                                            <Box sx={{ color: 'red', fontSize: '16px' }}>
                                                                <ErrorMessage name="cpf" component="div" />
                                                            </Box>
                                                        )}
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <FormControl variant="filled" fullWidth>
                                                        <InputLabel htmlFor="celular">Celular</InputLabel>
                                                        <FilledInput
                                                            id="celular"
                                                            type="text"
                                                            name="celular"
                                                            value={values.celular}
                                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                                const formattedValue = formatarCelular(e.target.value);
                                                                setFieldValue('celular', formattedValue);
                                                            }}
                                                            inputProps={{ maxLength: 15 }} // Limita ao tamanho do celular formatado
                                                            onBlur={handleBlur}
                                                            error={Boolean(touched.celular && errors.celular)}
                                                        />
                                                        {touched.celular && errors.celular && (
                                                            <Box sx={{ color: 'red', fontSize: '16px' }}>
                                                                <ErrorMessage name="celular" component="div" />
                                                            </Box>
                                                        )}
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Field
                                                        component={TextField}
                                                        name="email"
                                                        label="E-mail"
                                                        variant="standard"
                                                        fullWidth
                                                        required
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Field
                                                        component={TextField}
                                                        name="senha"
                                                        label="Senha"
                                                        variant="standard"
                                                        type="password"
                                                        fullWidth
                                                        required
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Field
                                                        component={TextField}
                                                        name="cargo"
                                                        variant="standard"
                                                        label="Cargo"
                                                        fullWidth
                                                        required
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Paper>
                                    </Box>
                                    <Box sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 2,
                                        maxWidth: 600,
                                        margin: 'auto',
                                    }}>
                                        <Paper sx={{ padding: 4, paddingBottom: 8, paddingLeft: 7, paddingRight: 7 }}>
                                            <Typography variant="h6"
                                                sx={{
                                                    fontSize: '25px',
                                                    textAlign: 'left',
                                                    fontFamily: 'Roboto, monospace',
                                                    color: '#757575',
                                                    fontWeight: 'bold',
                                                }}>
                                                Endereço
                                            </Typography>
                                            <Grid container spacing={2}>
                                                <Grid item xs={6}>
                                                    <Field
                                                        component={TextField}
                                                        name="endereco.cep"
                                                        label="CEP"
                                                        variant="standard"
                                                        fullWidth
                                                        required
                                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                                            handleCepChange(event, setFieldValue)
                                                        }
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Field
                                                        component={TextField}
                                                        name="endereco.numero"
                                                        label="Número"
                                                        variant="standard"
                                                        fullWidth
                                                        required
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Field
                                                        component={TextField}
                                                        name="endereco.logradouro"
                                                        label="Logradouro"
                                                        variant="standard"
                                                        fullWidth
                                                        required
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Field
                                                        component={TextField}
                                                        name="endereco.complemento"
                                                        label="Complemento"
                                                        variant="standard"
                                                        fullWidth
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Field
                                                        component={TextField}
                                                        name="endereco.bairro"
                                                        label="Bairro"
                                                        variant="standard"
                                                        fullWidth
                                                        required
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Field
                                                        component={TextField}
                                                        name="endereco.cidade"
                                                        label="Cidade"
                                                        variant="standard"
                                                        fullWidth
                                                        required
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Field
                                                        component={TextField}
                                                        name="endereco.estado"
                                                        label="Estado"
                                                        variant="standard"
                                                        fullWidth
                                                        required
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Paper>

                                        <Grid
                                            container
                                            spacing={2}
                                            justifyContent="center"
                                            sx={{ marginBottom: 10}}>
                                            <Grid
                                                item
                                                xs={12}
                                                display="flex"
                                                justifyContent="center"
                                            >
                                                <Button
                                                    type="submit"
                                                    variant="contained"
                                                    color="primary"
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
                <DialogContent>
                    <DialogContentText id="modal-description" variant="h6" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold', fontFamily: 'Roboto, monospace', }}>
                        Administrador Cadastrado!
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

export default CadastroAdministrador;
