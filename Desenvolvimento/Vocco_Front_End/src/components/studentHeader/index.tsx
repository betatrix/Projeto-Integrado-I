import React, { useContext, useState } from 'react';
import {
    AppBar,
    Box,
    Typography,
    Button,
    IconButton,
    Drawer,
    Tooltip,
    Menu,
    MenuItem,
    List,
    ListItem,
    Container,
    Toolbar,

} from '@mui/material';
import LocalLibraryRoundedIcon from '@mui/icons-material/LocalLibraryRounded';
import {
    Menu as MenuIcon,
    DashboardOutlined,
    AssignmentOutlined,
    AccountBoxOutlined,
    SchoolOutlined,
    LogoutOutlined,
    Close as CloseIcon,
} from '@mui/icons-material';
import { AuthContext } from '../../contexts/auth';
import { useMediaQuery } from '@mui/material';
import LanguageMenu from '../translationButton';
import { Link as ScrollLink } from 'react-scroll';
import { linkButtonMobile, logo } from './styles';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import AvatarUserStudent from '../avatarUser/indexStudent';
import { decryptData } from '../../services/encryptionService';

const styles = {
    logo: {
        mr: 2,
        fontFamily: 'monospace',
        fontWeight: 700,
        letterSpacing: '.3rem',
        color: 'inherit',
        textDecoration: 'none',
    },
    avatarButton: {
        p: 0,
    },
    menu: {
        mt: '50px',
    },
    welcomeText: {
        mr: 2,
        color: 'black',
        fontFamily: 'Poppins, sans-serif',
    },
    linkButton: {
        color: 'white',
        textDecoration: 'none',
        marginRight: '20px',
    },
};

function StudentHeader() {
    const { t } = useTranslation();
    const isMobile = useMediaQuery('(max-width:600px)');
    const [drawerOpen, setDrawerOpen] = useState(false);

    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const authContext = useContext(AuthContext);

    if (!authContext) {
        return null;
    }
    const { logout } = authContext;

    const studentData = authContext.student ? decryptData(authContext.student) : null;
    const student = studentData ? JSON.parse(studentData) : null;

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleMenuItemClick = () => {
        setAnchorElUser(null);
        logout();
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
                <IconButton disabled sx={styles.avatarButton}>
                    <AvatarUserStudent
                        sx={{
                            width: '40px',
                            height: '40px',
                            overflow: 'hidden',
                            objectFit: 'cover'
                        }}
                    />
                    <Typography
                        sx={{
                            marginLeft: '0.7rem',
                            fontFamily: 'Poppins, sans-serif',
                            color: '#185D8E',
                            fontWeight: 700,
                        }}
                    >
                            Hey, {student ? student.nome.split(' ')[0] : 'usuário'}!
                    </Typography>
                </IconButton>
            </ListItem>

            <List sx={{ paddingLeft: '0.5rem' }}>
                <ListItem>
                    <DashboardOutlined style={{ color: '#185D8E' }} />
                    <Link to="/estudante" onClick={toggleDrawer(false)}>
                        <Button color="inherit" sx={linkButtonMobile}>{t('dashboard')}</Button>
                    </Link>
                </ListItem>
                <ListItem>
                    <AssignmentOutlined style={{ color: '#185D8E' }} />
                    <Link to="/teste-vocacional" onClick={toggleDrawer(false)}>
                        <Button color="inherit" sx={linkButtonMobile}>{t('test')}</Button>
                    </Link>
                </ListItem>
                <ListItem>
                    <AccountBoxOutlined style={{ color: '#185D8E' }} />
                    <Link to="/minha-conta" onClick={toggleDrawer(false)}>
                        <Button color="inherit" sx={linkButtonMobile}>{t('myAccount')}</Button>
                    </Link>
                </ListItem>
                <ListItem>
                    <LocalLibraryRoundedIcon style={{ color: '#185D8E' }} />
                    <Link to="/curso" onClick={toggleDrawer(false)}>
                        <Button color="inherit" sx={linkButtonMobile}>{t('courses')}</Button>
                    </Link>
                </ListItem>
                <ListItem>
                    <SchoolOutlined style={{ color: '#185D8E' }} />
                    <Link to="/instituicao" onClick={toggleDrawer(false)}>
                        <Button color="inherit" sx={linkButtonMobile}>{t('institution')}</Button>
                    </Link>
                </ListItem>
                <ListItem>
                    <LogoutOutlined style={{ color: '#185D8E' }} />
                    <ScrollLink onClick={handleMenuItemClick} onSetActive={handleCloseDrawer}>
                        <Button color="inherit" sx={linkButtonMobile}>{t('logout')}</Button>
                    </ScrollLink>
                </ListItem>

            </List>

            <Box
                sx={{
                    position: 'absolute',
                    color: '#185D8E',
                    fontFamily: 'Roboto, sans-serif',
                    paddingTop: '20rem',
                    paddingBottom: '2rem',
                    fontSize: '10px',
                }}
            >
                © 2024 Vocco. Todos os direitos reservados.
            </Box>
        </List>
    );

    return (
        <>
            <AppBar style={{ backgroundColor: 'white', boxShadow: 'none'}}>
                <Container maxWidth={isMobile ? 'md' : 'xl'} disableGutters>
                    <Toolbar sx={{ display: 'flex', justifyContent: isMobile ? 'space-between' : 'flex-end', width: '100%'}}>
                        {isMobile && (
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
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
                        )}

                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                            <LanguageMenu />

                            {isMobile ? (
                                <>
                                    <IconButton
                                        edge="end"
                                        aria-label="menu"
                                        onClick={toggleDrawer(true)}
                                        sx={{ marginLeft: '5px', color: '#185D8E' }}
                                    >
                                        <MenuIcon />
                                    </IconButton>

                                    {/* Drawer (menu lateral) para mobile */}
                                    <Drawer
                                        anchor="right"
                                        open={drawerOpen}
                                        onClose={toggleDrawer(false)}
                                        sx={{ '& .MuiDrawer-paper': { backgroundColor: '#D9EEFF', width: '250px', padding: '2rem 1rem' } }}
                                    >
                                        {menuItems}
                                    </Drawer>
                                </>
                            ) : (
                                <>
                                    <Typography
                                        sx={{
                                            marginRight: '0.7rem',
                                            fontFamily: 'Poppins, sans-serif',
                                            color: '#185D8E',
                                            fontWeight: 600,
                                        }}
                                    >
                                        Hey, {student ? student.nome.split(' ')[0] : 'usuário'}!
                                    </Typography>

                                    {/* Menu de Logout e Avatar para telas maiores */}
                                    <Tooltip title="Opções de Perfil">
                                        <IconButton onClick={handleOpenUserMenu} sx={styles.avatarButton}>
                                            <AvatarUserStudent
                                                sx={{
                                                    width: '50px',
                                                    height: '50px',
                                                    overflow: 'hidden',
                                                    objectFit: 'cover'
                                                }}
                                            />
                                        </IconButton>
                                    </Tooltip>

                                    <Menu
                                        sx={styles.menu}
                                        id="menu-appbar"
                                        anchorEl={anchorElUser}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        open={Boolean(anchorElUser)}
                                        onClose={handleCloseUserMenu}
                                    >
                                        {/* Opção de Logout */}
                                        <MenuItem>
                                            <Typography
                                                component={Link}
                                                to="/minha-conta"
                                                textAlign="center"
                                                sx={{ fontFamily: 'Roboto, monospace', textDecoration: 'none', color: 'inherit' }}
                                            >
                                                {t('myAccount')}
                                            </Typography>
                                        </MenuItem>
                                        <MenuItem onClick={handleMenuItemClick}>
                                            <Typography textAlign="center" sx={{ fontFamily: 'Roboto, monospace' }}>{t('logout')}</Typography>
                                        </MenuItem>
                                    </Menu>
                                </>
                            )}
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    );
}

export default StudentHeader;
