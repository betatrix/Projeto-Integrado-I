import { styled, Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LocalLibraryRoundedIcon from '@mui/icons-material/LocalLibraryRounded';
import { Typography, Box } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
    DashboardOutlined,
    AssignmentOutlined,
    AccountBoxOutlined,
    SchoolOutlined,
    LogoutOutlined,
} from '@mui/icons-material';
import logo from '../../assets/img/logo-azul-claro.png';
import { useContext, useEffect, useRef } from 'react';
import { AuthContext } from '../../contexts/auth';

const drawerWidth = 265;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': {
                ...openedMixin(theme),
                backgroundColor: '#E3EDF4',
                maxHeight: '100vh',
                overflowY: 'auto',
            },
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': {
                ...closedMixin(theme),
                backgroundColor: '#E3EDF4',
                maxHeight: '100vh',
                overflowY: 'auto',
            },
        }),
    })
);

interface CustomDrawerProps {
    open: boolean;
    handleDrawerOpen: () => void;
    handleDrawerClose: () => void;
}

const CustomDrawer: React.FC<CustomDrawerProps> = ({ open, handleDrawerOpen, handleDrawerClose }) => {
    const isMobile = useMediaQuery('(max-width:600px)');
    const { t } = useTranslation();
    const drawerRef = useRef<HTMLDivElement | null>(null);
    const authContext = useContext(AuthContext);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
                handleDrawerClose();
            }
        };

        if (open) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [open, handleDrawerClose]);

    if (!authContext) {
        return null;
    }
    const { logout } = authContext;

    const handleLogout = () => {
        logout();
    };

    const iconMap: {
        [key: string]: { id: string; icon: React.ReactNode; link?: string; onClick?: () => void }
    } = {
        'dashboard': { id: 'dashboardButton', icon: <DashboardOutlined sx={{ fontSize: '1.8rem' }} />, link: '/estudante' },
        'test': { id: 'testButton', icon: <AssignmentOutlined sx={{ fontSize: '1.8rem' }} />, link: '/teste-vocacional' },
        'myAccount': { id: 'myAccountButton', icon: <AccountBoxOutlined sx={{ fontSize: '1.8rem' }} />, link: '/minha-conta' },
        'courses': { id: 'coursesButton', icon: <LocalLibraryRoundedIcon sx={{ fontSize: '1.8rem' }} />, link: '/curso' },
        'institution': { id: 'institutionButton', icon: <SchoolOutlined sx={{ fontSize: '1.8rem' }} />, link: '/instituicao' },
        'logout': { id: 'logoutButton', icon: <LogoutOutlined sx={{ fontSize: '1.8rem' }} />, onClick: handleLogout },
    };

    return (
        <>
            <Drawer
                ref={drawerRef}
                variant={isMobile ? 'temporary' : 'permanent'}
                open={open}
                onClose={handleDrawerClose}
                ModalProps={{
                    keepMounted: true,
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                    }}
                    onClick={open ? handleDrawerClose : handleDrawerOpen}
                >
                    {/* Itens normais do menu */}
                    <List
                        sx={{
                            backgroundColor: '#E3EDF4',
                            boxShadow: 'none',
                            flexGrow: 1,
                            '&:hover': {
                                cursor:'pointer',
                            },
                        }}
                    >
                        <ListItem disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 1.8,
                                }}
                                onClick={open ? handleDrawerClose : handleDrawerOpen}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        justifyContent: 'center',
                                        mr: open ? 2 : 'auto',
                                    }}
                                >
                                    <img
                                        src={logo}
                                        alt="Logo"
                                        style={{ width: '45px' }}
                                    />
                                </ListItemIcon>
                                <ListItemText
                                    primary={
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontFamily: 'Poppins',
                                                fontSize: '30px',
                                                fontWeight: 'bold',
                                                color: '#185D8E',
                                                opacity: open ? 1 : 0,
                                                transition: 'opacity 0.3s ease',
                                            }}
                                        >
                                            VOCCO
                                        </Typography>
                                    }
                                />
                            </ListItemButton>
                        </ListItem>
                        {Object.keys(iconMap).map((key) => (
                            key !== 'logout' && (
                                <ListItem key={key} disablePadding sx={{ display: 'block' }}>
                                    <ListItemButton
                                        id={iconMap[key].id}
                                        component={Link}
                                        to={iconMap[key]?.link || ''}
                                        sx={[
                                            { minHeight: 48, px: 2.5 },
                                            open ? { justifyContent: 'initial' } : { justifyContent: 'center' },
                                        ]}
                                    >
                                        <ListItemIcon
                                            sx={[{ minWidth: 0, justifyContent: 'center', color: '#185D8E' }, open ? { mr: 1.5 } : { mr: 'auto' }]}
                                        >
                                            {iconMap[key]?.icon}
                                        </ListItemIcon>
                                        <ListItemText

                                            primary={
                                                <Typography
                                                    sx={[{
                                                        fontFamily: 'Roboto, monospace',
                                                        color: '#185D8E', fontSize: '1.1rem'
                                                    }, open ? { opacity: 1 } : { opacity: 0 }]}
                                                >
                                                    {t(key)}
                                                </Typography>
                                            }
                                        />
                                    </ListItemButton>
                                </ListItem>
                            )
                        ))}
                    </List>
                    <List sx={{ backgroundColor: '#E3EDF4', boxShadow: 'none', color: '#185D8E' }}>
                        <ListItem disablePadding sx={{ marginTop: 'auto', marginBottom: '25px' }}>
                            <ListItemButton
                                id={iconMap['logout'].id}
                                onClick={iconMap['logout'].onClick}
                                sx={[
                                    { minHeight: 48, px: 2.5 },
                                    open ? { justifyContent: 'initial' } : { justifyContent: 'center' },
                                ]}
                            >
                                <ListItemIcon
                                    sx={[{ minWidth: 0, justifyContent: 'center', color: '#185D8E' }, open ? { mr: 1.5 } : { mr: 'auto' }]}
                                >
                                    {iconMap['logout']?.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={
                                        <Typography
                                            sx={[{
                                                fontFamily: 'Roboto, monospace',
                                                fontSize: '1.1rem',
                                                color: '#185D8E',
                                            }, open ? { opacity: 1 } : { opacity: 0 }]}
                                        >
                                            {t('logout')}
                                        </Typography>
                                    }
                                />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
        </>
    );
};

export default CustomDrawer;
