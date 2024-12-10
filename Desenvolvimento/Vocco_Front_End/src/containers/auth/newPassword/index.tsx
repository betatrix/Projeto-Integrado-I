import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import FormControl from '@mui/material/FormControl';
import CircularProgress from '@mui/material/CircularProgress';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { redefinicaoSenha } from '../../../services/studentService';
import {
    customField,
    customButton,
    customInputLabel,
    header,
    formContainer,
    customLinkStyles,
    container,
    backButton,
    paragraph,
    headerNewPass,
    sidePanelStyles,
    loginContainer,
    globalStyles,
} from './styles';
import { Alert, Box, Button, Snackbar, Typography, SxProps, Theme, InputLabel, FilledInput, LinearProgress, IconButton, InputAdornment } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import LanguageMenu from '../../../components/translationButton';
import { useTranslation } from 'react-i18next';
import { VisibilityOff, Visibility } from '@mui/icons-material';

const validationSchema = Yup.object({
    password: Yup.string()
        .min(6, 'A senha deve ter mais de 6 caracteres*')
        .required('Senha é obrigatória*'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'As senhas não coincidem*')
        .required('Confirmação de senha é obrigatória*'),
});

const NovaSenha: React.FC = () => {
    const { t } = useTranslation();

    const [loading, setLoading] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [, setErrorMessage] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    const handleClickShowPassword = () => setShowPassword(prev => !prev);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const calculatePasswordStrength = (password: string) => {
        let score = 0;

        if (password.length >= 5) score += 25;
        if (/[A-Z]/.test(password)) score += 25;
        if (/[0-9]/.test(password)) score += 25;
        if (/[^A-Za-z0-9]/.test(password)) score += 25;

        return score;
    };

    const strength = calculatePasswordStrength(password);

    const getStrengthLabel = () => {
        if (strength === 100) return 'Forte';
        if (strength >= 75) return 'Boa';
        if (strength >= 50) return 'Fraca';
        return 'Muito fraca';
    };

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
                    setShowSuccessMessage(true);

                    setTimeout(() => {
                        navigate('/login');
                    }, 3000);
                } else {
                    setErrorMessage('Não foi possível alterar sua senha :(');
                    setShowErrorMessage(true);
                }
            } catch (error) {
                setErrorMessage('Erro ao redefinir a senha.');
                setShowErrorMessage(true);
            } finally {
                setLoading(false);
            }
        },
    });

    const handleCloseSuccessMessage = () => {
        setShowSuccessMessage(false);
    };

    const handleCloseErrorMessage = () => {
        setShowErrorMessage(false);
    };

    return (
        <>
            <Box sx={globalStyles as SxProps<Theme>} />
            <Box sx={container}>
                <Box sx={sidePanelStyles} />
                <Box sx={headerNewPass}>
                    <Button sx={backButton} startIcon={<ArrowBackIcon />}>
                        <Typography component="a" href="/login" sx={customLinkStyles}>
                            {t('backButton')}
                        </Typography>
                    </Button>
                    <LanguageMenu />
                </Box>
                <Box sx={loginContainer}>
                    <Typography variant="h4" sx={header}>
                        {t('newPasswordTitle')}
                    </Typography>

                    <Typography sx={paragraph}>
                        {t('newPasswordText')}
                    </Typography>

                    <Box sx={formContainer} component="form" onSubmit={formik.handleSubmit}>
                        <FormControl variant="filled" error={formik.touched.password && Boolean(formik.errors.password)}>
                            <InputLabel component="label" htmlFor="password" sx={customInputLabel}>
                                {t('newPasswordField1')}
                            </InputLabel>
                            <FilledInput
                                sx={customField}
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                value={formik.values.password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    formik.handleChange(e);
                                }}
                                onBlur={formik.handleBlur}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            sx={{color: '#185D8E'}}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                            <Box>
                                <LinearProgress
                                    variant="determinate"
                                    value={strength}
                                    sx={{
                                        height: 8,
                                        borderRadius: 4,
                                        backgroundColor: '#e0e0e0',
                                        '& .MuiLinearProgress-bar': {
                                            backgroundColor:
                                                    strength === 100 ? '#4caf50' :
                                                        strength >= 75 ? '#ffeb3b' :
                                                            strength >= 50 ? '#ff9800' : '#f44336',
                                        },
                                    }}
                                />
                                <Typography variant="caption" sx={{ mt: 1 }}>
                                    Força da senha: {getStrengthLabel()}
                                </Typography>
                            </Box>
                            {formik.touched.password && formik.errors.password ? (
                                <Box sx={{ color: 'red', fontSize: '16px' }}>
                                    <div>{formik.errors.password}</div>
                                </Box>

                            ) : null}
                        </FormControl>

                        <FormControl variant="filled" error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}>
                            <InputLabel component="label" htmlFor="confirmPassword" sx={customInputLabel}>
                                {t('newPasswordField2')}
                            </InputLabel>
                            <FilledInput
                                sx={customField}
                                id="confirmPassword"
                                type="password"
                                value={formik.values.confirmPassword}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                                <Box sx={{ color: 'red', fontSize: '16px' }}>
                                    <div>{formik.errors.confirmPassword}</div>
                                </Box>
                            ) : null}
                        </FormControl>

                        <FormControl>
                            <Button sx={customButton} variant="contained" size="large" type="submit">
                                {loading ? <CircularProgress size={24} color="inherit" /> : t('newPasswordButton')}
                            </Button>
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
                        <Alert onClose={handleCloseSuccessMessage} severity="success" sx={{ width: '100%', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem' }}>
                            {t('newPasswordSucess')}
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
                            {t('newPasswordError')}
                        </Alert>
                    </Snackbar>
                </Box>
            </Box>
        </>
    );
};

export default NovaSenha;