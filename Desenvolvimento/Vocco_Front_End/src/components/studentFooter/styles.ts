import { SxProps, Theme } from '@mui/material';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const footerContainer: SxProps<Theme> = () => ({
    backgroundColor: '#0B2A40',
    color: '#A4BFD2',
    padding: '40px 0',
});

export const footerContent: SxProps<Theme> = (theme) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
    flexWrap: 'wrap',
    [theme.breakpoints.down('sm')]: {
        padding: '0 2rem',
    },
    [theme.breakpoints.down('md')]: {
        padding: '0 rem',
    },
});

export const footerColumn: SxProps<Theme> = (theme) => ({
    flex: '1',
    minWidth: '250px',
    marginBottom: '20px',
    [theme.breakpoints.down('sm')]: {
        marginBottom: '10px',
        minWidth: '150px'
    },
    [theme.breakpoints.down('md')]: {
        marginBottom: '10px',
        minWidth: '150px'
    },
});

export const footerTitle: SxProps<Theme> = (theme) => ({
    marginBottom: '10px',
    fontWeight: 'bold',
    [theme.breakpoints.down('sm')]: {
        fontSize: '12px',
    },
    [theme.breakpoints.down('md')]: {
        fontSize: '12px',
    },
});

export const footerLink: SxProps<Theme> = (theme) => ({
    color: '#6B9ABC',
    textDecoration: 'none',
    transition: '0.3s ease-in-out',
    '&:hover': {
        color: 'white',
    },
    [theme.breakpoints.down('sm')]: {
        fontSize: '12px',
    },
    [theme.breakpoints.down('md')]: {
        fontSize: '12px',
    },
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const socialIcons: SxProps<Theme> = () => ({
    display: 'flex',
    gap: '10px',
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const footerBottom: SxProps<Theme> = () => ({
    textAlign: 'right',
    padding: '20px 20px 0px',
    color: '#6B9ABC',
    fontSize: '12px',
});
