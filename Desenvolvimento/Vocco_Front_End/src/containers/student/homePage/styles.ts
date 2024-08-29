import { SxProps, Theme } from '@mui/material';
import pageThree from '../../../assets/img/pageThree.png';
import pageOne from '../../../assets/img/pageOne.png';
import pageTwo from '../../../assets/img/pageTwo.png';
import pageFour from '../../../assets/img/pageFour.png';

const globalBoxStyles: SxProps<Theme> = (theme) => ({
    minHeight: '100vh',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundColor: '#caddff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: '200px',
    paddingRight: '200px',
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

// Style Index-------------------------------------------------------
export const homePageBoxStyles: SxProps<Theme> = (theme) => ({
    backgroundImage: `url(${pageOne})`,
    ...globalBoxStyles(theme),
});

export const gridIndexContainerStyles: SxProps<Theme> = (theme) => ({
    height: '100%',
    textAlign: 'center',
    padding: '5%',
    [theme.breakpoints.down('sm')]: {
        height: '100%',
    },
});

export const typographyTitleStyles: SxProps<Theme> = (theme) => ({
    fontFamily: 'Exo 2',
    fontSize: '2.4rem',
    fontWeight: 700,
    color: '#1b1f27',
    [theme.breakpoints.down('sm')]: {
        fontSize: '1.8rem',
    },
});

export const typographySubtitleStyles: SxProps<Theme> = (theme) => ({
    fontFamily: 'Poppins',
    fontSize: '1.4rem',
    mb: '1rem',
    color: '#1b1f27',
    [theme.breakpoints.down('sm')]: {
        fontSize: '1rem',
        textAlign: 'justify',
    },
});

export const buttonStyles: SxProps<Theme> = (theme) => ({
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

// Style About-----------------------------------------------------
export const aboutBoxStyles: SxProps<Theme> = (theme) => ({
    ...globalBoxStyles(theme),
    backgroundImage: `url(${pageThree})`,
    backgroundColor: 'white',
});

export const gridAboutContainerStyles: SxProps<Theme> = (theme) => ({
    height: '100%',
    [theme.breakpoints.down('sm')]: {
        alignItems: 'center',
    },
});

export const gridItemImageStyles: SxProps<Theme> = (theme) => ({
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
        width: '100%',
        maxWidth: '25rem',
    },
});

export const imageStyles: React.CSSProperties = {
    width: '100%',
    maxWidth: '25rem',
    borderRadius:'1rem',

};

export const gridItemTextStyles: SxProps<Theme> = (theme) => ({
    color: '#1b1f27',
    [theme.breakpoints.down('sm')]: {
        fontSize: '1rem',
        padding: '5%',
    },
});

export const typographyAboutTitleStyles: SxProps<Theme> = (theme) => ({
    color: '#1b1f27',
    fontFamily:'Exo 2',
    fontSize: '2.3rem',
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
        fontSize: '1.8rem',
        textAlign: 'center',
    },
});

export const typographyBodyStyles: SxProps<Theme> = (theme) => ({
    fontFamily: 'Poppins',
    color: '#1b1f27',
    textAlign: 'justify',
    fontSize: '1.25rem',
    lineHeight: '140%',
    [theme.breakpoints.down('sm')]: {
        fontSize: '1rem',
    },
});

// Style FAQ-------------------------------------------------------
export const faqBoxStyles: SxProps<Theme> = (theme) => ({
    ...globalBoxStyles(theme),
    backgroundImage: `url(${pageFour})`,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh',
});

export const innerBoxStyles: SxProps<Theme> = (theme) => ({
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    flexDirection: 'column',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
        width: '100%',
        paddingLeft:'1rem',
        paddingRight: '1rem',
    },
    [theme.breakpoints.down('md')]: {
        width: '100%',
        paddingLeft:'1rem',
        paddingRight: '1rem',
    },
});

export const listStyles: SxProps<Theme> = (theme) => ({
    backgroundColor: 'white',
    borderRadius: '0.5rem',
    marginTop: '0.4rem',
    [theme.breakpoints.down('sm')]: {
        fontSize: '0.5rem',
    },
});

export const listItemIconStyles: SxProps<Theme> = (theme) => ({
    color: 'black',
    fontSize: '1.25rem',
    [theme.breakpoints.down('sm')]: {
        fontSize: '1rem',
    },
});

export const listItemTextStyles: SxProps<Theme> = (theme) => ({
    fontSize: '1.2rem',
    fontFamily: 'Poppins',
    [theme.breakpoints.down('sm')]: {
        fontSize: '1rem',
    },
});

export const FaqTitle: SxProps<Theme> = (theme) => ({
    color: '#1b1f27',
    textAlign: 'center',
    fontFamily: 'Exo 2',
    fontSize: '2.3rem',
    [theme.breakpoints.down('sm')]: {
        textAlign: 'center',
        fontSize: '1.8rem',
    },
});

// Style testInf-------------------------------------------------------

export const testInfBoxStyles: SxProps<Theme> = (theme) => ({
    ...globalBoxStyles(theme),
    backgroundImage: `url(${pageTwo})`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
});

export const TestInfoContent: SxProps<Theme> = (theme) => ({
    fontFamily: 'Poppins',
    color: '#1b1f27',
    textAlign: 'justify',
    fontSize: '1.2rem',
    lineHeight: '140%',
    [theme.breakpoints.down('sm')]: {
        fontSize: '1rem',
        padding: '5%',
    },
});

export const TestInfoTitle: SxProps<Theme> = (theme) => ({
    color: '#1b1f27',
    fontFamily: 'Exo 2',
    fontSize: '2.3rem',
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
        textAlign: 'center',
        fontSize: '1.8rem',
    },
});

export const BoxCardHollandStyles: SxProps<Theme> = (theme) => ({
    backgroundColor: '#99b9ff',
    borderRadius:'0.5rem',
    paddingTop:'2rem',
    paddingBottom: '2rem',
    display: 'flex',
    gap: '0.5rem',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
        textAlign: 'center',
    },
});

export const CardStyle: SxProps<Theme> = (theme) => ({
    flex: '0 0 auto',
    transition: 'transform 0.3s ease',
    [theme.breakpoints.down('sm')]: {
        textAlign: 'center',
    },
});

export const GridItemText: SxProps<Theme> = (theme) => ({
    [theme.breakpoints.down('sm')]: {
        textAlign: 'center',
    },
});

export const GridItemCards: SxProps<Theme> = (theme) => ({
    [theme.breakpoints.down('sm')]: {
        textAlign: 'center',
    },
});

// Style Parceiros-------------------------------------------------------
export const CarouselTitle: SxProps<Theme> = (theme) => ({
    marginTop: '0.8rem',
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    color: '#1b1f27',
    [theme.breakpoints.down('sm')]: {
        textAlign: 'center',
    },
});