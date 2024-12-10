import React, { useContext, useState } from 'react';
import {
    AppBar,
    Container,
    Toolbar,
    Box,
    Typography,
    Button,
    IconButton,
    Drawer,
    List,
    ListItem,
} from '@mui/material';
import {
    Menu as MenuIcon,
    HouseOutlined,
    AssignmentIndOutlined,
    InfoOutlined,
    HelpOutline,
    Person2Outlined,
    Close as CloseIcon,
    BookOutlined
} from '@mui/icons-material';
import { Link as ScrollLink } from 'react-scroll';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from '@mui/material';
import LanguageMenu from '../translationButton';
import { linkButtonMobile, logo, linkButton, LoginText } from './styles';
import { AuthContext } from '../../contexts/auth';
import { decryptData } from '../../services/encryptionService';

const InitialPageHeader = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const isMobile = useMediaQuery('(max-width:600px)');
    const [drawerOpen, setDrawerOpen] = useState(false);

    const authContext = useContext(AuthContext);

    const handleLogin = () => {
        if (authContext?.isAuthenticated === true && decryptData(authContext.role!) === 'ESTUDANTE'){
            navigate('/estudante');
        } else if (authContext?.isAuthenticated == true && decryptData(authContext.role!) == 'ADMIN') {
            navigate('/admin');
        } else {
            navigate('/login');
        }
    };

    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    const handleCloseDrawer = () => {
        setDrawerOpen(false);
    };

    const menuItems = (
        <List>
            <ListItem sx={{ justifyContent: 'flex-end' }}>
                <IconButton onClick={handleCloseDrawer} sx={{ color: '#185D8E' }}>
                    <CloseIcon />
                </IconButton>
            </ListItem>

            <ListItem>
                <Person2Outlined style={{ color: '#185D8E' }} />
                <ScrollLink onClick={handleLogin} smooth={true} duration={500} onSetActive={handleCloseDrawer}>
                    <Button color="inherit" sx={linkButtonMobile}>{t('login')}</Button>
                </ScrollLink>
            </ListItem>
            <ListItem>
                <HouseOutlined style={{ color: '#185D8E' }} />
                <ScrollLink to="home" smooth={true} duration={500} onSetActive={handleCloseDrawer}>
                    <Button color="inherit" sx={linkButtonMobile}>{t('home')}</Button>
                </ScrollLink>
            </ListItem>
            <ListItem>
                <InfoOutlined style={{ color: '#185D8E' }} />
                <ScrollLink to="about" smooth={true} duration={500} onSetActive={handleCloseDrawer}>
                    <Button color="inherit" sx={linkButtonMobile}>{t('about')}</Button>
                </ScrollLink>
            </ListItem>
            <ListItem>
                <AssignmentIndOutlined style={{ color: '#185D8E' }} />
                <ScrollLink to="testInformation" smooth={true} duration={500} onSetActive={handleCloseDrawer}>
                    <Button color="inherit" sx={linkButtonMobile}>{t('testInformation')}</Button>
                </ScrollLink>
            </ListItem>
            <ListItem>
                <BookOutlined style={{ color: '#185D8E' }} />
                <ScrollLink to="sources" smooth={true} duration={500} onSetActive={handleCloseDrawer}>
                    <Button color="inherit" sx={linkButtonMobile}>{t('sources')}</Button>
                </ScrollLink>
            </ListItem>
            <ListItem>
                <HelpOutline style={{ color: '#185D8E' }} />
                <ScrollLink to="faq" smooth={true} duration={500} onSetActive={handleCloseDrawer}>
                    <Button color="inherit" sx={linkButtonMobile}>{t('faq')}</Button>
                </ScrollLink>
            </ListItem>

            <Box
                sx={{
                    position: 'absolute',
                    color: '#185D8E',
                    fontFamily: 'Roboto, sans-serif',
                    paddingTop: '30rem',
                    fontSize: '10px',
                }}
            >
                © 2024 Vocco. Todos os direitos reservados.
            </Box>
        </List>
    );

    return (
        <AppBar style={{ backgroundColor: '#F3F3F3', boxShadow: 'none' }}>
            <Container maxWidth={isMobile ? 'md' : 'xl'}>
                <Toolbar sx={{ justifyContent: 'space-between', height: '100px' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <ScrollLink to="home" smooth={true} duration={500}>
                            <Typography
                                variant="h5"
                                noWrap
                                component="a"
                                href="/pagina-inicial"
                                sx={logo}
                            >
                                VOCCO
                            </Typography>
                        </ScrollLink>
                    </Box>

                    {isMobile ? (
                        <>
                            <Box sx={{ display: 'flex', alignItems: 'center', marginRight: '8px', maxWidth: '100%' }}>
                                <LanguageMenu />
                                <IconButton
                                    edge="end"
                                    aria-label="menu"
                                    onClick={toggleDrawer(true)}
                                    sx={{ marginLeft: '5px', color: '#185D8E' }}
                                >
                                    <MenuIcon />
                                </IconButton>
                            </Box>
                            <Drawer
                                anchor="right"
                                open={drawerOpen}
                                onClose={toggleDrawer(false)}
                                sx={{ '& .MuiDrawer-paper': { backgroundColor: '#D9EEFF', width: '250px', padding: '2rem 0.5rem'} }}
                            >
                                {menuItems}
                            </Drawer>
                        </>
                    ) : (
                        <>
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                            }}>
                                <ScrollLink to="about" smooth={true} duration={500}>
                                    <Button color="inherit" sx={linkButton}>{t('about')}</Button>
                                </ScrollLink>
                                <ScrollLink to="testInformation" smooth={true} duration={500}>
                                    <Button color="inherit" sx={linkButton}>{t('testInformation')}</Button>
                                </ScrollLink>
                                <ScrollLink to="sources" smooth={true} duration={500}>
                                    <Button color="inherit" sx={linkButton}>{t('sources')}</Button>
                                </ScrollLink>
                                <ScrollLink to="faq" smooth={true} duration={500}>
                                    <Button color="inherit" sx={linkButton}>{t('faq')}</Button>
                                </ScrollLink>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <LanguageMenu />
                                <Button type="button" variant="outlined" onClick={handleLogin} sx={LoginText}>
                                    {t('login')}
                                </Button>
                            </Box>
                        </>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default InitialPageHeader;
