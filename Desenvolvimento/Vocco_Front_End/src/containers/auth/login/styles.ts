import { SxProps, Theme } from '@mui/material';
import backgorundImage from '../../../assets/img/background.png';
import backgroundImage2 from '../../../assets/img/background2.png';

export const globalStyle: SxProps<Theme> = () => ({
    body: {
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
        fontFamily: 'Poppins, sans-serif',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: '100vh',
    },
});

export const headerLogin: SxProps<Theme> = (theme) => ({
    position: 'absolute',
    top: '5rem',
    left: '6rem',
    [theme.breakpoints.down('lg')]: {
        top: '4rem',
        left: '2rem',
    },
    [theme.breakpoints.down('sm')]: {
        top: '4rem',
        left: '2rem',
    },
});

export const backButton: SxProps<Theme> = (theme) => ({
    color: '#185D8E',
    marginRight: '20px',
    '&:hover': {
        color: '#0B2A40',
        backgroundColor: '#D9EEFF !important',
    },
    [theme.breakpoints.down('lg')]: {
        marginRight: '2rem',
    },
    [theme.breakpoints.down('sm')]: {
        marginRight: '4rem',
    },
});

export const loginContainer: SxProps<Theme> = (theme) => ({
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: '7vi',
    marginRight: '19vi',
    maxWidth: '70vh',
    zIndex: 1,
    [theme.breakpoints.down('lg')]: {
        marginRight: '3rem',
        marginLeft: '3rem',
    },
    [theme.breakpoints.down('sm')]: {
        marginRight: '3rem',
        marginLeft: '3rem',
    },
});

export const formContainer: SxProps<Theme> = {
    display: 'grid',
};

export const container: SxProps<Theme> = (theme) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    [theme.breakpoints.down('md')]: {
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundImage: `url(${backgorundImage})`,
    },
});

export const header: SxProps<Theme> = (theme) => ({
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 800,
    fontSize: '2.4rem',
    color: '#1b1f27',
    [theme.breakpoints.down('lg')]: {
        fontSize: '2rem',
    },
    [theme.breakpoints.down('sm')]: {
        fontSize: '1.8rem',
    },
});

export const paragraph: SxProps<Theme> = (theme) => ({
    fontFamily: 'Poppins, sans-serif',
    color: '#1b1f27',
    padding: '10px 0 ',
    fontSize: '1.1rem',
    [theme.breakpoints.down('md')]: {
        fontSize: '1rem',
    },
    [theme.breakpoints.down('sm')]: {
        fontSize: '0.9rem',
    },
});

export const subText: SxProps<Theme> = (theme) => ({
    color: '#474d66',
    textDecoration: 'none',
    textAlign: 'right',
    marginTop: '5px',
    [theme.breakpoints.down('sm')]: {
        fontSize: '0.9rem',
    },
});

export const customLink: SxProps<Theme> = (theme) => ({
    fontFamily: 'Poppins, sans-serif',
    fontWeight: '600',
    textDecoration: 'none',
    color: '#185D8E',
    transition: '0.3s',
    '&:hover': {
        color: '#0B2A40',
    },
    [theme.breakpoints.down('sm')]: {
        fontSize: '0.9rem',
    },
});

export const customField: SxProps<Theme> = {
    backgroundColor: '#E6E6E6',
    borderRadius: '10px',
    marginBottom: '6px',
    '&:hover': {
        backgroundColor: '#edeff5',
    },
    '&.Mui-focused': {
        backgroundColor: '#edeff5',
    },
    '&::before': {
        borderBottom: 'none',
    },
    '&:hover::before': {
        borderBottom: 'none !important',
    },
    '&::after': {
        borderBottom: 'none',
    },
};

export const customInputLabel: SxProps<Theme> = {
    color: '#696f8c',
    fontFamily: 'Poppins, sans-serif',
    '&.Mui-focused': {
        color: '#696f8c',
    },
};

export const loginButton: SxProps<Theme> = (theme) => ({
    mr: 0,
    margin: '1rem 0',
    fontFamily: 'Roboto, monospace',
    fontSize: '1.3rem',
    padding: '0.4rem 13.5rem',
    backgroundColor: '#D9EEFF',
    color: '#185D8E',
    fontWeight: 700,
    border: 'solid 2px #185D8E',
    borderRadius: '7px',
    boxShadow: '4px 4px 0px 1px rgba(0, 111, 255, 0.2)',
    textAlign: 'center',
    maxWidth: '100%',
    minWidth: '250px',
    whiteSpace: 'nowrap',
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
        backgroundColor: '#C0E3FF',
        borderColor: '#185D8E',
        borderWidth: '2px',
        transform: 'scale(1.02)',
    },
    [theme.breakpoints.down('lg')]: {
        padding: '0.5rem 8rem',
        fontSize: '1rem',
        minWidth: '200px',
    },
    [theme.breakpoints.down('md')]: {
        padding: '0.5rem 8rem',
        fontSize: '1rem',
        minWidth: '200px',
    },
    [theme.breakpoints.down('sm')]: {
        padding: '0.5rem 8rem',
        fontSize: '1rem',
        minWidth: '200px',
    },
});

export const sidePanel: SxProps<Theme> = (theme) => ({
    width: '50%',
    height: '100%',
    backgroundImage: `url(${backgroundImage2})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
        display: 'none',
    },
});