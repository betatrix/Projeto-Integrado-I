/* eslint-disable react-refresh/only-export-components */
import { SxProps, Theme } from '@mui/material';

export const logo: SxProps<Theme> = () => ({
    mr: 2,
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 700,
    letterSpacing: '.3rem',
    color: 'black',
    textDecoration: 'none',
});

export const LoginText: SxProps<Theme> = () => ({
    mr: 2,
    marginLeft: '10px',
    fontFamily: 'Roboto, monospace',
    fontSize: '15px',
    backgroundColor: '#D9EEFF',
    color: '#185D8E',
    fontWeight: 700,
    borderColor: '#185D8E',
    borderRadius: '7px',
    borderWidth: '2px',
    boxShadow: '4px 4px 0px 1px rgba(0, 111, 255, 0.2)',
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
        backgroundColor: '#C0E3FF',
        borderColor: '#185D8E',
        borderWidth: '2px',
        transform: 'scale(1.05)',

    },
});

export const menu: SxProps<Theme> = () => ({
    mt: '45px',
});

export const linkButton: SxProps<Theme> = () => ({
    fontFamily: 'Roboto, monospace',
    fontSize: '15px',
    color: '#232235',
    fontWeight: 700,
    textDecoration: 'none',
    marginRight: '10px',
    cursor: 'pointer',
});

export const linkButtonMobile: SxProps<Theme> = () => ({
    fontFamily: 'Roboto, monospace',
    fontSize: '15px',
    color: '#185D8E',
    fontWeight: 500,
    textDecoration: 'none',
    padding: '0.5rem',
    cursor: 'pointer',
});