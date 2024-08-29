import {
    AppBar,
    Container,
    Toolbar,
    Box,
    Typography,
    Tooltip,
    Button,
} from '@mui/material';
import { Link as ScrollLink } from 'react-scroll';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageMenu from '../translationButton';

const styles = {
    logo: {
        mr: 2,
        fontFamily: 'monospace',
        fontWeight: 700,
        letterSpacing: '.3rem',
        color: 'inherit',
        textDecoration: 'none',
    },
    LoginText: {
        mr: 2,
        marginLeft: '10px',
        color: 'white',
        borderColor: 'white',
        '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderColor: 'white',
        },
    },
    menu: {
        mt: '45px',
    },
    linkButton: {
        color: 'white',
        textDecoration: 'none',
        marginRight: '10px',
        cursor: 'pointer',
    },
};

function InitialPageHeader() {
    const navigate = useNavigate();
    const{ t } = useTranslation();

    const handleLogin = () => {
        navigate('/login');
    };

    return (
        <AppBar position="sticky" style={{ backgroundColor: '#1b1f27' }}>
            <Container maxWidth="xl">
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="/pagina-inicial"
                            sx={styles.logo}
                        >
                            VOCCO
                        </Typography>
                        <Box sx={{ marginLeft: '10px' }}>
                            <ScrollLink to="home" smooth={true} duration={500} style={styles.linkButton}>
                                <Button color="inherit">{t('home')}</Button>
                            </ScrollLink>
                            <ScrollLink to="testInformation" smooth={true} duration={500} style={styles.linkButton}>
                                <Button color="inherit">{t('testInformation')}</Button>
                            </ScrollLink>
                            <ScrollLink to="about" smooth={true} duration={500} style={styles.linkButton}>
                                <Button color="inherit">{t('about')}</Button>
                            </ScrollLink>
                            <ScrollLink to="faq" smooth={true} duration={500} style={styles.linkButton}>
                                <Button color="inherit">{t('faq')}</Button>
                            </ScrollLink>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <LanguageMenu />
                        <Tooltip title="Login">
                            <Button type="button" variant="outlined" onClick={handleLogin} sx={styles.LoginText} >
                                {t('login')}
                            </Button>
                        </Tooltip>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default InitialPageHeader;
