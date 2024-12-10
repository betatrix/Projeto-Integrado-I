import React, { useState, useContext } from 'react';
import {
    AppBar,
    Container,
    Toolbar,
    Box,
    IconButton,
    Typography,
    Tooltip,
    Avatar,
    Menu,
    MenuItem,
    Button, // Importando o Button correto do Material-UI
} from '@mui/material';
import { AuthContext } from '../../contexts/auth';
import { decryptData } from '../../services/encryptionService';
import { Link } from 'react-router-dom';
import { ButtonMenu } from './styles';

const styles = {
    logo: {
        fontFamily: 'Poppins, sans-serif',
        fontWeight: 700,
        letterSpacing: '.3rem',
        color: '#185D8E',
        textDecoration: 'none'
    },
    avatarButton: {
        p: 0,
    },
    menu: {
        mt: '45px',
    },
    welcomeText: {
        mr: 2,
        color: 'white',
    },
    linkButton: {
        color: 'white',
        textDecoration: 'none',
        marginRight: '20px',
    },
};

function AdminHeader() {
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const authContext = useContext(AuthContext);

    if (!authContext) {
        return null;
    }

    const { logout } = authContext;
    const adminData = authContext.admin ? decryptData(authContext.admin) : null;
    const admin = adminData ? JSON.parse(adminData) : null;

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

    return (
        <AppBar position="fixed" style={{ backgroundColor: '#F3F3F3', boxShadow: 'none' }}>
            <Container maxWidth="xl">
                <Toolbar sx={{ justifyContent: 'space-between', marginTop: '17px' }}>
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
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mr: '60px' }}>
                        <Link to="/admin" style={{ textDecoration: 'none' }}>
                            <Button sx={ButtonMenu}>DASHBOARD</Button>
                        </Link>
                        <Link to="/gerenciamento-instituicao" style={{ textDecoration: 'none' }}>
                            <Button sx={ButtonMenu}>INSTITUIÇÕES</Button>
                        </Link>
                        <Link to="/gerenciamento-curso" style={{ textDecoration: 'none' }}>
                            <Button sx={ButtonMenu}>CURSOS</Button>
                        </Link>
                        <Link to="/gerenciamento-teste" style={{ textDecoration: 'none' }}>
                            <Button sx={ButtonMenu}>TESTE</Button>
                        </Link>
                        <Link to="/gerenciamento-usuario" style={{ textDecoration: 'none' }}>
                            <Button sx={ButtonMenu}>USUÁRIOS</Button>
                        </Link>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>

                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={styles.avatarButton}>
                                <Avatar alt={admin ? admin.nome : 'User Avatar'} src="/static/images/avatar/2.jpg" />
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

                            <MenuItem onClick={handleMenuItemClick}>
                                <Typography textAlign="center" sx={{ fontFamily: 'Roboto, monospace' }}>Logout</Typography>
                            </MenuItem>

                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default AdminHeader;
