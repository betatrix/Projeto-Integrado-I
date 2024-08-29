import React, { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import CircularProgress from '@mui/material/CircularProgress';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { recuperacaoSenha } from '../../../services/studentService';
import {
    Global,
    LoginContainer,
    CustomField,
    CustomButton,
    CustomInputLabel,
    Header,
    Paragraph,
    FormContainer,
    CustomLink,
    Container,
    RightPanel,
    BackButton,
    SubText,
} from './styles';
import { Alert, Snackbar } from '@mui/material';
import { useTranslation } from 'react-i18next';

const RecuperarSenha: React.FC = () => {
    const{ t } = useTranslation();

    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [emailError, setEmailError] = useState(false);

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
        setEmailError(false);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailError(true);
            return;
        }

        setLoading(true);

        try {
            await new Promise((resolve) => setTimeout(resolve, 2000));

            const response = await recuperacaoSenha(email);

            if (response === 200) {
                setShowSuccessMessage(true);
                console.log('Sucesso ao enviar email:', response);
            } else {
                setShowErrorMessage(true);
                console.error(response);
            }

        } catch (error) {
            setShowErrorMessage(true);
            console.error('Erro ao enviar email:', error);
        } finally {
            setLoading(false);
        }
    };

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
                    <CustomLink to={'/login'}>{t('backButton')}</CustomLink>
                </BackButton>
                <RightPanel></RightPanel>
                <LoginContainer>
                    <Header variant="h4">{t('forgotTitle')}</Header>
                    <Paragraph>
                        {t('forgotText')}
                    </Paragraph>

                    <FormContainer onSubmit={handleSubmit}>
                        {emailError && <SubText>{t('forgotError1')}</SubText>}
                        <FormControl variant="filled" >
                            <CustomInputLabel htmlFor="email">{t('forgotField')}</CustomInputLabel>
                            <CustomField
                                id="email"
                                type={'email'}
                                value={email}
                                onChange={handleEmailChange}
                            />
                        </FormControl>

                        <FormControl>
                            <CustomButton variant="contained" size="large" type="submit" >
                                {loading ? <CircularProgress size={24} color="inherit" /> : t('forgotButton')}
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
                            {t('forgotSucess')}
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
                            {t('forgotError2')}
                        </Alert>
                    </Snackbar>
                </LoginContainer>
            </Container>
        </>
    );
};

export default RecuperarSenha;
