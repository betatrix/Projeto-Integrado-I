import React, { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import CircularProgress from '@mui/material/CircularProgress';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { recuperacaoSenha } from '../../../services/studentService';
import {
    globalStyles,
    backButton,
    loginContainer,
    formContainer,
    containerStyles,
    headerStyles,
    paragraphStyles,
    subTextStyles,
    customLinkStyles,
    customFieldStyles,
    customInputLabelStyles,
    sidePanelStyles,
    recoverButton,
    headerRecover,
} from './styles'; // Importando os novos estilos
import { Alert, Box, Button, FilledInput, InputLabel, Snackbar, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { SxProps, Theme } from '@mui/material/styles';
import LanguageMenu from '../../../components/translationButton';

const RecuperarSenha: React.FC = () => {
    const { t } = useTranslation();

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
            } else {
                setShowErrorMessage(true);
            }
        } catch (error) {
            setShowErrorMessage(true);
        } finally {
            setLoading(false);
        }
    };

    const handleCloseSuccessMessage = () => {
        setShowSuccessMessage(false);
    };

    const handleCloseErrorMessage = () => {
        setShowErrorMessage(false);
    };

    return (
        <>
            <Box sx={globalStyles as SxProps<Theme>} />
            <Box sx={containerStyles}>
                <Box sx={sidePanelStyles} />
                <Box sx={headerRecover}>
                    <Button sx={backButton} startIcon={<ArrowBackIcon />}>
                        <Typography component="a" href="/login" sx={customLinkStyles}>
                            {t('backButton')}
                        </Typography>
                    </Button>
                    <LanguageMenu />
                </Box>
                <Box sx={loginContainer}>
                    <Typography component="h4" sx={headerStyles}>
                        {t('forgotTitle')}
                    </Typography>
                    <Typography sx={paragraphStyles}>
                        {t('forgotText')}
                    </Typography>

                    <Box component="form" sx={formContainer} onSubmit={handleSubmit}>
                        {emailError && <Box sx={subTextStyles}>{t('forgotError1')}</Box>}
                        <FormControl variant="filled">
                            <InputLabel component="label" htmlFor="email" sx={customInputLabelStyles}>
                                {t('forgotField')}
                            </InputLabel>
                            <FilledInput
                                id="email"
                                type="email"
                                value={email}
                                onChange={handleEmailChange}
                                sx={customFieldStyles}
                            />
                        </FormControl>

                        <FormControl>
                            <Box component="button" sx={recoverButton} type="submit">
                                {loading ? <CircularProgress size={24} color="inherit" /> : t('forgotButton')}
                            </Box>
                        </FormControl>
                    </Box>

                    <Snackbar
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={showSuccessMessage}
                        autoHideDuration={6000}
                        onClose={handleCloseSuccessMessage}
                    >
                        <Alert onClose={handleCloseSuccessMessage} severity="success" sx={{ width: '100%', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem'}}>
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
                        <Alert onClose={handleCloseErrorMessage} severity="error" sx={{ width: '100%', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem' }}>
                            {t('forgotError2')}
                        </Alert>
                    </Snackbar>
                </Box>
            </Box>
        </>
    );
};

export default RecuperarSenha;
