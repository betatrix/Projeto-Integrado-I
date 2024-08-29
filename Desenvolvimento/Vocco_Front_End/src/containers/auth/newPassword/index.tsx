import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import FormControl from '@mui/material/FormControl';
import CircularProgress from '@mui/material/CircularProgress';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { redefinicaoSenha } from '../../../services/studentService';
import {
    Global,
    LoginContainer,
    CustomField,
    CustomButton,
    CustomInputLabel,
    Header,
    FormContainer,
    CustomLink,
    Container,
    RightPanel,
    BackButton,
    Paragraph,
} from './styles';
import { Alert, Snackbar } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const validationSchema = Yup.object({
    password: Yup.string()
        .min(6, 'A senha deve ter mais de 5 caracteres.')
        .required('Senha é obrigatória.'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'As senhas não coincidem.')
        .required('Confirmação de senha é obrigatória.'),
});

const NovaSenha: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [, setErrorMessage] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    const getTokenFromUrl = (): string => {
        const params = new URLSearchParams(location.search);
        const token = params.get('token');

        if (!token) {
            setShowErrorMessage(true);
            setLoading(false);
            throw new Error('Token não encontrado na URL');
        }
        return token;
    };

    const formik = useFormik({
        initialValues: {
            password: '',
            confirmPassword: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            setLoading(true);
            const token = getTokenFromUrl();

            try {
                await new Promise((resolve) => setTimeout(resolve, 2000));

                const response = await redefinicaoSenha(token, values.password);

                if (response === 200) {
                    console.log('Sucesso ao redefinir a senha:', response);
                    setShowSuccessMessage(true);

                    // Redirecionar após 3 segundos
                    setTimeout(() => {
                        navigate('/login');
                    }, 3000);
                } else {
                    setErrorMessage('Não foi possível alterar sua senha :(');
                    setShowErrorMessage(true);
                    console.error(response);
                }
            } catch (error) {
                setErrorMessage('Erro ao redefinir a senha.');
                setShowErrorMessage(true);
                console.error('Erro ao redefinir a senha:', error);
            } finally {
                setLoading(false);
            }
        },
    });

    // Função para fechar o pop-up
    const handleCloseSuccessMessage = () => {
        setShowSuccessMessage(false);
    };

    const handleCloseErrorMessage = () => {
        setShowErrorMessage(false);
    };

    return (
        <>
            <Global />
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap');
            </style>
            <Container>
                <BackButton startIcon={<ArrowBackIcon />}>
                    <CustomLink to={'/login'}>Página inicial</CustomLink>
                </BackButton>
                <RightPanel></RightPanel>
                <LoginContainer>
                    <Header variant="h4"> Vamos redefinir sua senha!</Header>

                    <Paragraph>
                    Por favor, insira sua nova senha abaixo. Certifique-se de que a senha tenha pelo menos 6 caracteres, incluindo uma combinação de letras, números e símbolos para garantir a segurança.
                    </Paragraph>

                    <FormContainer onSubmit={formik.handleSubmit}>
                        <FormControl variant="filled" error={formik.touched.password && Boolean(formik.errors.password)}>
                            <CustomInputLabel htmlFor="password">Digite sua nova senha!</CustomInputLabel>
                            <CustomField
                                id="password"
                                type="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.password && formik.errors.password ? (
                                <div>{formik.errors.password}</div>
                            ) : null}
                        </FormControl>

                        <FormControl variant="filled" error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}>
                            <CustomInputLabel htmlFor="confirmPassword">Confirme sua senha</CustomInputLabel>
                            <CustomField
                                id="confirmPassword"
                                type="password"
                                value={formik.values.confirmPassword}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                                <div>{formik.errors.confirmPassword}</div>
                            ) : null}
                        </FormControl>

                        <FormControl>
                            <CustomButton variant="contained" size="large" type="submit">
                                {loading ? <CircularProgress size={24} color="inherit" /> : 'Enviar'}
                            </CustomButton>
                        </FormControl>
                    </FormContainer>

                    <Snackbar
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={showSuccessMessage}
                        autoHideDuration={6000}
                        onClose={handleCloseSuccessMessage}
                    >
                        <Alert onClose={handleCloseSuccessMessage} severity="success" sx={{ width: '100%' }}>
                            Senha alterada com sucesso!
                        </Alert>
                    </Snackbar>

                    <Snackbar
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={showErrorMessage}
                        autoHideDuration={6000}
                        onClose={handleCloseErrorMessage}
                    >
                        <Alert onClose={handleCloseErrorMessage} severity="error" sx={{ width: '100%' }}>
                            Não foi possível alterar sua senha :(
                        </Alert>
                    </Snackbar>
                </LoginContainer>
            </Container>
        </>
    );
};

export default NovaSenha;
