import React, { useContext, useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import CircularProgress from '@mui/material/CircularProgress';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Formik } from 'formik';
import { loginButton,
    globalStyle,
    headerLogin,
    backButton,
    loginContainer,
    formContainer,
    container,
    header,
    paragraph,
    subText,
    customField,
    customInputLabel,
    customLink,
    sidePanel
} from './styles';
import { AuthContext } from '../../../contexts/auth';
import { Link as RouterLink } from 'react-router-dom';
import { encryptData } from '../../../services/encryptionService';
import { loginEstudante } from '../../../services/studentService';
import { LoginForm } from '../../../types/loginTypes';
import { loginAdministrador } from '../../../services/admService';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageMenu from '../../../components/translationButton';
import { Button, Box, Typography, FilledInput, InputLabel } from '@mui/material';

const initialValues: LoginForm = {
    login: '',
    senha: '',
};

const Login: React.FC = () => {
    const authContext = useContext(AuthContext);
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleClickShowPassword = () => setShowPassword(prev => !prev);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleSubmit = async (values: LoginForm, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        setLoading(true);
        setError(null);

        try {
            const isAdmin = values.login.endsWith('@vocco.com');
            const response = isAdmin ? await loginAdministrador(values) : await loginEstudante(values);
            if (response.status === 200) {
                const role = isAdmin ? 'ADMIN' : 'ESTUDANTE';

                authContext?.login(
                    encryptData(response.data.token),
                    encryptData(JSON.stringify(response.data.usuario)),
                    encryptData(role),
                    encryptData(JSON.stringify(response.data.estudante || null)),
                    encryptData(JSON.stringify(response.data.administrador || null))
                );

                const redirectUrl = role === 'ESTUDANTE' ? '/estudante' : '/admin';
                navigate(redirectUrl);
            } else {
                setError('loginError');
            }
        } catch (error) {
            setError(t('loginError'));
        } finally {
            setLoading(false);
            setSubmitting(false);
        }
    };

    return (
        <>
            <Box sx={globalStyle} />
            <Box sx={container}>
                <Box sx={loginContainer}>
                    <Box sx={headerLogin}>
                        <Button sx={backButton} startIcon={<ArrowBackIcon />}>
                            <Typography sx={customLink} component={RouterLink} to="/pagina-inicial">{t('loginBackButton')}</Typography>
                        </Button>
                        <LanguageMenu />
                    </Box>

                    <Typography variant="h4" sx={header}>{t('loginTitle')}</Typography>
                    <Typography sx={paragraph}>{t('loginText')}</Typography>

                    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                        {({ handleChange, isSubmitting, handleBlur, handleSubmit, values }) => (
                            <Box component="form" sx={formContainer} onSubmit={handleSubmit}>
                                <FormControl variant="filled">
                                    <InputLabel htmlFor="login" sx={customInputLabel}>{t('loginField1')}</InputLabel>
                                    <FilledInput
                                        id="login"
                                        type="email"
                                        name="login"
                                        value={values.login}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        required
                                        sx={customField}
                                    />
                                </FormControl>

                                <Typography variant="body2" color="textSecondary" sx={subText}>
                                    <Typography sx={customLink} component={RouterLink} to="/recuperar-senha">{t('loginRecover')}</Typography>
                                </Typography>

                                <FormControl variant="filled">
                                    <InputLabel htmlFor="senha" sx={customInputLabel}>{t('loginField2')}</InputLabel>
                                    <FilledInput
                                        id="senha"
                                        type={showPassword ? 'text' : 'password'}
                                        name="senha"
                                        value={values.senha}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        required
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
                                        sx={customField}
                                    />
                                </FormControl>

                                <FormControl>
                                    <Button sx={loginButton} id='loginButton' component="button" type="submit" disabled={isSubmitting}>
                                        {loading ? <CircularProgress size={35} color="inherit" /> : t('loginButton')}
                                    </Button>
                                </FormControl>

                                {error && <Box sx={{color:'red'}}>{error}</Box>}
                            </Box>
                        )}
                    </Formik>

                    <Typography variant="body1" sx={subText}>
                        {t('loginRegister1')}<Typography id='registerLink' sx={customLink} component={RouterLink} to="/register"> {t('loginRegister2')}</Typography>
                    </Typography>
                </Box>

                <Box sx={sidePanel} />
            </Box>

        </>
    );
};

export default Login;
