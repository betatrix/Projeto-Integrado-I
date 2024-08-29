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
    Button,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth';
import { decryptData } from '../../services/encryptionService';

const settings = ['Account', 'Dashboard', 'Logout'];

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

    const handleCloseUserMenu = (_event: {}, _reason: "backdropClick" | "escapeKeyDown") => {
        setAnchorElUser(null);
    };

    const handleMenuItemClick = (setting: string) => {
        if (setting === 'Logout') {
            logout();
        }
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static" style={{ backgroundColor: '#1b1f27' }}>
            <Container maxWidth="xl">
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={styles.logo}
                        >
                            VOCCO
                        </Typography>
                    </Box>
                    <Box sx={{marginLeft: '900px' }}>
                        <Link to="/pagina-inicial" style={styles.linkButton}>
                            <Button color="inherit">Home</Button>
                        </Link>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography sx={styles.welcomeText}>
                            Bem vindo de volta, {admin ? admin.nome : 'usuário'}!
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
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={() => handleMenuItemClick(setting)}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default AdminHeader;
