import React from 'react';
import FormControl from '@mui/material/FormControl';
import CircularProgress from '@mui/material/CircularProgress';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { StudentRegisterForm } from '../../../types/studentTypes';
import { cadastroEstudante } from '../../../services/studentService';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import {
    Global,
    LoginContainer,
    FormContainer,
    CustomField,
    CustomButton,
    CustomInputLabel,
    Header,
    SubText,
    CustomLink,
    BackButton,
    MessageError,
} from './styles';

const nivelEducacao = [
    { label: 'Ensino Fundamental', value: 'ENSINO_FUNDAMENTAL' },
    { label: 'Ensino Médio', value: 'ENSINO_MEDIO' },
    { label: 'Superior incompleto', value: 'ENSINO_SUPERIOR_INCOMPLETO' },
    { label: 'Superior completo', value: 'ENSINO_SUPERIOR_COMPLETO' },
];

const initialValues: StudentRegisterForm = {
    nome: '',
    email: '',
    senha: '',
    dataNascimento: '',
    celular: '',
    nivelEscolar: '',
};

const validationSchema = Yup.object().shape({
    nome: Yup.string().required('Nome é obrigatório'),
    email: Yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
    senha: Yup.string().required('Senha é obrigatória')
        .min(5, 'A senha deve ter no mínimo 5 caracteres!'),
    confirmarSenha: Yup.string().required('Confirmação de senha é obrigatória')
        .oneOf([Yup.ref('senha'), ''], 'As senhas precisam ser iguais'),
    dataNascimento: Yup.date().required('Data de nascimento é obrigatória')
        .max(new Date(new Date().setFullYear(new Date().getFullYear() - 14)), 'Você deve ter pelo menos 14 anos.'),
    celular: Yup.string().required('Celular é obrigatório')
        .max(15, 'O celular deve ter no máximo 15 caracteres!'),
    nivelEscolar: Yup.string().required('Nível de escolaridade é obrigatório'),
});

const formatarCelular = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);

    if (match) {
        return `(${match[1]}) ${match[2]}-${match[3]}`;
    }

    return value;
};

export const StudentRegister = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = React.useState(false);
    const handleNavigateForward = () => navigate('/login');

    const handleSubmit = async (values: StudentRegisterForm, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        setLoading(true);
        setSubmitting(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            const response = await cadastroEstudante(values);
            console.log('Estudante cadastrado com sucesso:', response);
            handleNavigateForward();
        } catch (error) {
            console.error('Erro ao cadastrar estudante:', error);
        } finally {
            setLoading(false);
            setSubmitting(false);
        }
    };

    return (
        <>
            <Global />
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap');
            </style>
            <BackButton startIcon={<ArrowBackIcon />}>
                <CustomLink to={'/pagina-inicial'}>Página inicial</CustomLink>
            </BackButton>
            <LoginContainer>
                <Header variant="h4">É novo? Cadastre-se aqui.</Header>

                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                    {({ isSubmitting, setFieldValue, errors, touched }) => (
                        <FormContainer as={Form}>
                            <FormControl variant="filled">
                                <CustomInputLabel htmlFor="nome">Nome</CustomInputLabel>
                                <Field as={CustomField}
                                    id="nome"
                                    name="nome"
                                    type="text"
                                    error={touched.nome && Boolean(errors.nome)}
                                />
                                <MessageError name="nome" component="div" />
                            </FormControl>

                            <FormControl variant="filled">
                                <CustomInputLabel htmlFor="email">E-mail</CustomInputLabel>
                                <Field as={CustomField}
                                    id="email"
                                    name="email"
                                    type="email"
                                    error={touched.email && Boolean(errors.email)}
                                />
                                <MessageError name="email" component="div" />
                            </FormControl>

                            <FormControl variant="filled">
                                <CustomInputLabel htmlFor="dataNascimento" shrink>Data de nascimento</CustomInputLabel>
                                <Field as={CustomField}
                                    id="dataNascimento"
                                    name="dataNascimento"
                                    type="date"
                                    error={touched.dataNascimento && Boolean(errors.dataNascimento)}
                                />
                                <MessageError name="dataNascimento" component="div" />
                            </FormControl>
                            <FormControl variant="filled">
                                <CustomInputLabel htmlFor="celular">Celular</CustomInputLabel>
                                <Field
                                    as={CustomField}
                                    id="celular"
                                    name="celular"
                                    type="tel"
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        const formattedValue = formatarCelular(e.target.value);
                                        setFieldValue('celular', formattedValue);
                                    }}
                                    error={touched.celular && Boolean(errors.celular)}
                                    fullWidth
                                />
                                <MessageError name="celular" component="div" />
                            </FormControl>
                            <FormControl variant="filled" style={{ gridColumn: 'span 2' }}>
                                <Autocomplete
                                    disablePortal
                                    id="nivelEscolar"
                                    options={nivelEducacao}
                                    getOptionLabel={(option) => option.label}
                                    onChange={(_event, value) => setFieldValue('nivelEscolar', value ? value.value : '')}
                                    sx={{
                                        '& .MuiFilledInput-root': {
                                            borderRadius: '10px',
                                            '&.Mui-focused': {
                                                color: '#696f8c !important',
                                            },
                                        },
                                        '& .MuiFilledInput-underline:before, & .MuiFilledInput-underline:after': {
                                            borderBottom: 'none !important',
                                        },
                                    }}
                                    renderInput={(params) => (
                                        <TextField {...params}
                                            label="Nível de escolaridade"
                                            variant="filled"
                                            error={touched.nivelEscolar && Boolean(errors.nivelEscolar)}
                                        />
                                    )}
                                />
                                <MessageError name="nivelEscolar" component="div" />
                            </FormControl>

                            <FormControl variant="filled">
                                <CustomInputLabel htmlFor="senha">Senha</CustomInputLabel>
                                <Field as={CustomField}
                                    id="senha"
                                    name="senha"
                                    type="password"
                                    autoComplete="new-password"
                                    error={touched.senha && Boolean(errors.senha)}
                                />
                                <MessageError name="senha" component="div" />
                            </FormControl>

                            <FormControl variant="filled">
                                <CustomInputLabel htmlFor="confirmarSenha">Confirme sua senha</CustomInputLabel>
                                <Field as={CustomField}
                                    id="confirmarSenha"
                                    name="confirmarSenha"
                                    type="password"
                                    autoComplete="new-password"
                                />
                                <MessageError name="confirmarSenha" component="div" />
                            </FormControl>

                            <CustomButton variant="contained" size="large" type="submit" disabled={isSubmitting} style={{ gridColumn: 'span 2' }}>
                                {loading ? <CircularProgress size={24} color="inherit" /> : 'Enviar'}
                            </CustomButton>

                            <SubText variant="body1" style={{ gridColumn: 'span 2' }}>
                                Já possuí uma conta? Faça o<CustomLink to={'/login'}> login!</CustomLink>
                            </SubText>
                        </FormContainer>
                    )}
                </Formik>
            </LoginContainer>
        </>
    );
};

export default StudentRegister;
