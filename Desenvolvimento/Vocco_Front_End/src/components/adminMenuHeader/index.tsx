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
} from '@mui/material';
import { AuthContext } from '../../contexts/auth';
import { decryptData } from '../../services/encryptionService';

const styles = {
    logo: {
        mr: 2,
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

function AdminHeaderMenu() {
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
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <Typography
                            sx={{
                                marginRight: '0.7rem',
                                fontFamily: 'Poppins, sans-serif',
                                color: '#185D8E',
                                fontWeight: 600,
                                mb:'0.4rem'
                            }}
                        >
                            Olá, {admin ? admin.nome.split(' ')[0] : 'usuário'}!
                        </Typography>

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

export default AdminHeaderMenu;
