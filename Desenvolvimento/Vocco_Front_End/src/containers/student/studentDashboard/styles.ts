import { Box, IconButton, SxProps, TextField, Theme } from '@mui/material';
import styled, { keyframes } from 'styled-components';
//import { Button } from '@mui/material';
import pageDashboard from '../../../assets/img/pageDashboard.png';

const globalBoxStyles: SxProps<Theme> = (theme) => ({
    minHeight: '100vh',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundColor: '#caddff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: '10%',
    paddingRight: '10%',
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        alignItems: 'center',
        backgroundAttachment: 'local',
        paddingLeft: '0px',
        paddingRight: '0px',
    },
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        alignItems: 'center',
        backgroundAttachment: 'local',
        paddingLeft: '0px',
        paddingRight: '0px',
    },
});

// Style Index
export const homePageBoxStyles: SxProps<Theme> = (theme) => ({
    // backgroundImage: `url(${pageFour})`,
    backgroundImage: `url(${pageDashboard}), linear-gradient(to bottom,  #99b9ff 50%, #caddff 0%, #caddff 50%)`,
    width: '100%',
    // height: '10rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    ...globalBoxStyles(theme),
});

export const gridStyles: SxProps<Theme> = (theme) => ({
    justifyContent:'center',
    alignItems:'center',
    display:'flex',
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        alignItems: 'center',
        backgroundAttachment: 'local',
    },
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        alignItems: 'center',
        backgroundAttachment: 'local',
    },
});

export const titleMainStyle: SxProps<Theme> =(theme) => ({
    textAlign: 'center',
    fontFamily: 'Poppins',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '2.5rem',
    marginBottom: '5%',
    paddingTop: '5%',
    textShadow: '1px 1px 2px #000000',
    [theme.breakpoints.down('sm')]: {
        textAlign: 'center',
        fontSize: '1.8rem',
        marginTop:'5rem',
    },
    [theme.breakpoints.down('md')]: {
        textAlign: 'center',
        fontSize: '1.8rem',
        marginTop:'5rem',
    },

});

export const titleStyle: SxProps<Theme> =(theme) => ({
    textAlign: 'center',
    fontFamily: 'Exo 2',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '1.5rem',
    [theme.breakpoints.down('sm')]: {
        textAlign: 'center',
        fontSize: '0.8rem',
    },
    [theme.breakpoints.down('md')]: {
        textAlign: 'center',
        fontSize: '0.8rem',
    },

});

export const numberStyle: SxProps<Theme> =(theme) => ({
    textAlign: 'center',
    fontFamily: 'Exo 2',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '3rem',
    [theme.breakpoints.down('sm')]: {
        textAlign: 'center',
        fontSize: '0.8rem',
    },
    [theme.breakpoints.down('md')]: {
        textAlign: 'center',
        fontSize: '0.8rem',
    },

});

export const contentStyle: SxProps<Theme> =(theme) => ({
    textAlign: 'center',
    fontFamily: 'Exo 2',
    color: '1b1f27',
    fontWeight: 'bold',
    fontSize: '1rem',
    [theme.breakpoints.down('sm')]: {
        textAlign: 'center',
        fontSize: '0.8rem',
    },
    [theme.breakpoints.down('md')]: {
        textAlign: 'center',
        fontSize: '0.8rem',
    },
});

export const content0Style: SxProps<Theme> =(theme) => ({
    textAlign: 'center',
    marginTop: '0.5rem',
    fontFamily: 'Exo 2',
    color: '#1b1f27',
    fontWeight: 'bold',
    fontSize: '1rem',
    [theme.breakpoints.down('sm')]: {
        textAlign: 'center',
        fontSize: '0.8rem',
    },
    [theme.breakpoints.down('md')]: {
        textAlign: 'center',
        fontSize: '0.8rem',
    },

});

export const boxStyles: SxProps<Theme> = (theme) => ({
    padding: '5%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    width: '100%',
    maxWidth: '50rem',
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        alignItems: 'center',
        backgroundAttachment: 'local',
    },
});

export const paperStyles: SxProps<Theme> = (theme) => ({
    backgroundColor: '#99b9ff',
    padding: '5%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    width: '20rem',
    height: '12rem',
    margin: '0.5rem',
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        alignItems: 'center',
        width: '15rem',
        height: '12rem',
    },
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        alignItems: 'center',
        width: '15rem',
        height: '12rem',
    },
});

export const IconStyle: SxProps<Theme> = (theme) => ({
    fontSize: '50px',
    color: 'white',
    background: 'linear-gradient(90deg, #302EB7, #040410)',
    borderRadius:'0.5rem',
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        alignItems: 'center',
        backgroundAttachment: 'local',
        borderRadius:'none',
        fontSize: '30px',
    },
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        alignItems: 'center',
        backgroundAttachment: 'local',
        borderRadius:'none',
        fontSize: '30px',
    },
});

export const TestButton: SxProps<Theme> = (theme) => ({
    fontFamily: 'Poppins',
    background: 'linear-gradient(90deg, rgba(53,51,205,1) 0%, rgba(16,24,64,1) 100%)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    borderRadius: '1rem',
    padding: '0.75rem 2.5rem',
    fontSize: '1rem',
    fontWeight: 'bold',
    color: 'white',
    '&:hover': {
        background: 'linear-gradient(269deg, #3533cd, #101840, #3533cd)',
        backgroundSize: '180% 180%',
        animation: 'gradient-animation 10s ease infinite',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
    },
    '@keyframes gradient-animation': {
        '0%': {
            backgroundPosition: '0% 50%',
        },
        '50%': {
            backgroundPosition: '100% 50%',
        },
        '100%': {
            backgroundPosition: '0% 50%',
        },
    },
    [theme.breakpoints.down('sm')]: {
        padding: '0.5rem 1.5rem',
        fontSize: '0.8rem',
    },
});

// Style Announcement
const slide = keyframes`
    0% {
        transform: translateX(100%);
    }
    100% {
        transform: translateX(-100%);
    }
`;

export const AnnouncementBarContainer = styled(Box)`
    width: 100%;
    background-color: #ff9800;
    color: #fff;
    text-align: center;
    padding: 0.5rem 0;  
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
`;

export const SlidingImage = styled.div`
    display: inline-block;
    white-space: nowrap;
    will-change: transform;
    animation: ${slide} 10s linear infinite;
`;

export const StyledImage = styled.img`
    max-width: none;
    max-height: 3.5rem;  
    width: auto;
    height: auto;
    display: block;
`;

export const CloseButton = styled(IconButton)`
    position: absolute;
    right: 15rem;  
    bottom: 1.25rem;  
`;

// Style SearchInstitution

export const StyledBox = styled(Box)`
    margin-bottom: 3rem;  
    display: flex;
    flex-direction: column;
    gap: 0.8rem;  
    max-width: 35rem;  
    margin: auto;
    margin-top: 1.6rem;  
`;

export const StyledTypography = styled(Box)`
    margin-bottom: 0.8rem;  
    text-align: center;
`;

export const SearchBox = styled(Box)`
    display: flex;
    justify-content: center;
`;

export const StyledTextField = styled(TextField)`
    width: 100%;
`;

export const ListBox = styled(Box)`
    padding-top: 0.4rem;  
`;

export const StyledModal = styled(Box)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    box-shadow: 1.2rem;  
    padding: 1.6rem;  
    width: 80%;
    max-width: 30rem;  
`;

export const DetailTypography = styled(Box)`
    margin-top: 0.8rem;  
    text-align: center;
    padding-left: 0.8rem;  
`;

export const GridContainer = styled(Box)`
    margin-top: 0.8rem;  
    display: flex;
    flex-direction: column;
    gap: 0.8rem;  
`;
