import { SxProps, Theme } from '@mui/material';
import backgroundImage2 from '../../../assets/img/background.png';

const globalBoxStyles: SxProps<Theme> = (theme) => ({
    minHeight: '100vh',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundColor: '#FFFFFF',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: '6rem',
    paddingRight: '7rem',
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
    ...globalBoxStyles(theme),
});

export const container: SxProps<Theme> = (theme) => ({
    display: 'flex',
    flexDirection: 'grid',
    alignItems: 'center',
    marginBottom: '1rem',
    [theme.breakpoints.down('sm')]: {
        marginBottom: '0rem',
    },
});

export const gridIndexContainerStyles: SxProps<Theme> = (theme) => ({
    width: '100%',
    textAlign: 'left',
    padding: '15px',
    marginTop: '10rem',
    [theme.breakpoints.down('sm')]: {
        marginTop: '4rem',
        textAlign: 'center',
        padding: '10px',
        height: '100%',
    },
});

export const typographyTitleStyles: SxProps<Theme> = (theme) => ({
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 800,
    fontSize: '2.4rem',
    color: '#1b1f27',
    [theme.breakpoints.down('lg')]: {
        fontSize: '1.6rem',
    },
    [theme.breakpoints.down('sm')]: {
        margin: '0.4rem 1rem',
        fontSize: '1.6rem',
        textAlign: 'justify',
    },
});

export const typographySubtitleStyles: SxProps<Theme> = (theme) => ({
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 300,
    fontSize: '1.4rem',
    mb: '1rem',
    color: '#1b1f27',
    [theme.breakpoints.down('lg')]: {
        fontSize: '1.1rem',
    },
    [theme.breakpoints.down('sm')]: {
        margin: '1.5rem 1rem',
        fontSize: '1rem',
        textAlign: 'justify',
    },
});

export const buttonStyles: SxProps<Theme> = (theme) => ({
    mr: 2,
    fontFamily: 'Roboto, monospace',
    fontSize: '1.3rem',
    padding: '0.4rem 13.5rem',
    backgroundColor: '#D9EEFF',
    color: '#185D8E',
    fontWeight: 700,
    borderColor: '#185D8E',
    borderRadius: '7px',
    borderWidth: '2px',
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
        padding: '0.3rem 10rem',
        fontSize: '1rem',
        minWidth: '200px',
    },
    [theme.breakpoints.down('md')]: {
        padding: '0.3rem 15rem',
        fontSize: '1rem',
        minWidth: '200px',
    },
    [theme.breakpoints.down('sm')]: {
        padding: '0.4rem 8.1rem',
        marginLeft:'0.6rem',
        fontSize: '1.2rem',
        minWidth: '200px',
    },
});

export const arrowUpIconStyles: SxProps<Theme> = (theme) => ({
    color: '#185D8E',
    fontSize: '4rem',
    [theme.breakpoints.down('sm')]: {
        fontSize: '1rem',
    },
});

// Style About-----------------------------------------------------
export const aboutBoxStyles: SxProps<Theme> = (theme) => ({
    ...globalBoxStyles(theme),
    backgroundImage: `url(${backgroundImage2})`,
});

export const containerAbout: SxProps<Theme> = () => ({
    display: 'flex',
    flexDirection: 'grid',
    alignItems: 'center',
});

export const gridAboutContainerStyles: SxProps<Theme> = (theme) => ({
    width: '70%',
    textAlign: 'left',
    [theme.breakpoints.down('md')]: {
        alignItems: 'center',
        padding: '0rem 1.5rem',
        width: '100%',
    },
});

export const gridItemTextStyles: SxProps<Theme> = (theme) => ({
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 300,
    color: '#1b1f27',
    [theme.breakpoints.down('sm')]: {
        margin: '14px',
        fontSize: '1rem',
        textAlign: 'left',
    },
    [theme.breakpoints.down('lg')]: {
        fontSize: '1rem',
    },
});

export const typographyAboutTitleStyles: SxProps<Theme> = (theme) => ({
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 800,
    fontSize: '2.4rem',
    color: '#1b1f27',
    [theme.breakpoints.down('sm')]: {
        fontSize: '1.4rem',
        marginBottom: '1rem',
    },
    [theme.breakpoints.down('lg')]: {
        fontSize: '1.8rem',
    },
});

export const typographyBodyStyles: SxProps<Theme> = (theme) => ({
    fontFamily: 'Poppins, sans-serif',
    color: '#1b1f27',
    paddingTop: '10px',
    paddingBottom: '10px',
    textAlign: 'justify',
    fontSize: '1.3rem',
    lineHeight: '140%',
    [theme.breakpoints.down('sm')]: {
        fontSize: '1rem',
    },
});

// Style FAQ-------------------------------------------------------
export const faqBoxStyles: SxProps<Theme> = (theme) => ({
    ...globalBoxStyles(theme),
    backgroundImage: `url(${backgroundImage2})`,
    paddingTop: '3rem',
    paddingBottom: '5rem',
});

export const innerBoxStyles: SxProps<Theme> = (theme) => ({
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    flexDirection: 'column',
    width: '100%',
    padding:'0rem 7rem',
    [theme.breakpoints.down('md')]: {
        width: '100%',
        padding:'0rem 4rem',
    },
    [theme.breakpoints.down('sm')]: {
        width: '100%',
        padding:'0rem 1.2rem',
    },
});

export const listStyles: SxProps<Theme> = (theme) => ({
    backgroundColor: '#D9EEFF',
    borderRadius: '0.5rem',
    border: '3px solid #185D8E',
    boxShadow: '4px 4px 0px 1px rgba(0, 111, 255, 0.2)',
    padding: '0.5rem',
    marginTop: '1.4rem',
    [theme.breakpoints.down('sm')]: {
        fontSize: '0.4rem',
        padding: '0.1rem',
    },
    [theme.breakpoints.down('lg')]: {
        fontSize: '0.4rem',
        padding: '0.1rem',
    },
});

export const listItemIconStyles: SxProps<Theme> = (theme) => ({
    color: '#185D8E',
    fontSize: '1.25rem',
    [theme.breakpoints.down('sm')]: {
        fontSize: '1rem',
    },
});

export const listItemTextStyles: SxProps<Theme> = (theme) => ({
    fontSize: '1.2rem',
    fontFamily: 'Poppins, sans-serif',
    [theme.breakpoints.down('sm')]: {
        fontSize: '1rem',
    },
});

export const FaqTitle: SxProps<Theme> = (theme) => ({
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 800,
    fontSize: '2.4rem',
    color: '#1b1f27',
    marginBottom: '2rem',
    [theme.breakpoints.down('sm')]: {
        textAlign: 'center',
        fontSize: '1.8rem',
    },
});

// Style testInf-------------------------------------------------------

export const testInfBoxStyles: SxProps<Theme> = (theme) => ({
    ...globalBoxStyles(theme),
    backgroundColor: '#BCD7EB',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: '100vh',
});

export const TestInfoContent: SxProps<Theme> = (theme) => ({
    fontFamily: 'Poppins, sans-serif',
    color: '#1b1f27',
    paddingTop: '10px',
    textAlign: 'justify',
    fontSize: '1.25rem',
    [theme.breakpoints.down('md')]: {
        textAlign: 'justify',
        fontSize: '1rem',
    },
    [theme.breakpoints.down('sm')]: {
        textAlign: 'justify',
        fontSize: '1rem',
    },
});

export const TestInfoTitle: SxProps<Theme> = (theme) => ({
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 800,
    fontSize: '2.4rem',
    color: '#1b1f27',
    [theme.breakpoints.down('sm')]: {
        fontSize: '1.4rem',
    },
    [theme.breakpoints.down('lg')]: {
        fontSize: '1.8rem',
    },
});

export const BoxCardHollandStyles: SxProps<Theme> = (theme) => ({
    backgroundColor: 'white',
    borderRadius: '2rem',
    border: '3px solid #185D8E',
    boxShadow: '4px 4px 0px 1px rgba(0, 111, 255, 0.2)',
    padding: '4rem 3rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '70rem',
    height: '40rem',
    overflow: 'hidden',
    [theme.breakpoints.down('lg')]: {
        width: '55rem',
        height: '40rem',
    },
    [theme.breakpoints.down('md')]: {
        width: '35rem',
        height: '37rem',
        padding: '1rem 1rem',
    },
    [theme.breakpoints.down('sm')]: {
        width: '21rem',
        height: '37rem',
        padding: '1rem 1rem',
    },
});

export const TestInfoContainerStyles: SxProps<Theme> = (theme) => ({
    width: '100%',
    textAlign: 'left',
    paddingLeft: '25px',
    [theme.breakpoints.down('md')]: {
        textAlign: 'center',
        paddingLeft: '0px',
    },
    [theme.breakpoints.down('sm')]: {
        textAlign: 'center',
        paddingLeft: '0px',
    },
});

export const IndicatorContainerStyles = {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '16px',
};

export const IndicatorStyles = {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: 'white',
    margin: '0 5px',
    transition: 'background-color 0.3s',
};

export const ActiveIndicatorStyles = {
    ...IndicatorStyles,
    backgroundColor: '#185D8E',
};

// Style Source -------------------------------------------------------
export const SourceBoxStyles: SxProps<Theme> = (theme) => ({
    ...globalBoxStyles(theme),
    backgroundColor: '#FFFFFF',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: '100vh',
});

export const typographySourceTitle: SxProps<Theme> = (theme) => ({
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 800,
    fontSize: '2.4rem',
    color: '#1b1f27',
    [theme.breakpoints.down('lg')]: {
        fontSize: '1.8rem',
    },
    [theme.breakpoints.down('sm')]: {
        fontSize: '1.6rem',
        padding: '1rem 1.5rem',
        textAlign: 'center',
    },
});

export const typographySourceBody1: SxProps<Theme> = (theme) => ({
    fontFamily: 'Poppins, sans-serif',
    color: '#1b1f27',
    paddingTop: '4rem',
    paddingBottom: '4rem',
    textAlign: 'center',
    fontSize: '1.3rem',
    lineHeight: '140%',
    [theme.breakpoints.down('sm')]: {
        fontSize: '1rem',
        padding: '1rem 1.5rem',
        textAlign: 'justify',
    },
});

export const typographySourceBody2: SxProps<Theme> = (theme) => ({
    fontFamily: 'Poppins, sans-serif',
    color: '#1b1f27',
    paddingTop: '4rem',
    textAlign: 'center',
    fontSize: '1.3rem',
    lineHeight: '140%',
    [theme.breakpoints.down('sm')]: {
        fontSize: '1rem',
        padding: '2rem 1.5rem',
        textAlign: 'justify',
    },
});

export const typographySourceTitleGrid: SxProps<Theme> = (theme) => ({
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 700,
    fontSize: '1.3rem',
    color: '#1b1f27',
    [theme.breakpoints.down('lg')]: {
        fontSize: '1.8rem',
    },
    [theme.breakpoints.down('sm')]: {
        fontSize: '1.2rem',
        textAlign: 'center',
    },
});

export const typographySourceBodyGrid: SxProps<Theme> = (theme) => ({
    fontFamily: 'Poppins, sans-serif',
    color: '#1b1f27',
    paddingTop: '10px',
    paddingBottom: '10px',
    textAlign: 'justify',
    fontSize: '1.3rem',
    lineHeight: '140%',
    [theme.breakpoints.down('sm')]: {
        fontSize: '1rem',
        textAlign: 'center',
    },
});

// Style Parceiros -------------------------------------------------------
export const BoxCarouselStyles: SxProps<Theme> = (theme) => ({
    backgroundColor: 'white',
    maxWidth: '100%',
    border: '3px solid #185D8E',
    marginTop: '7rem',
    borderRadius: '2rem',
    boxShadow: '4px 4px 0px 1px rgba(0, 111, 255, 0.2)',
    padding: '1.5rem',
    [theme.breakpoints.down('sm')]: {
        maxWidth: '90%',
        marginTop: '4rem',
        padding: '0.1rem',
    },
    [theme.breakpoints.down('md')]: {
        maxWidth: '90%',
        padding: '0.1rem',
    },
    [theme.breakpoints.down('lg')]: {
        marginTop: '4rem',
        padding: '0.1rem',
    },
    [theme.breakpoints.up('xl')]: {
        marginTop: '4rem',
        padding: '0.1rem',
    },
});

export const CarouselTitle: SxProps<Theme> = (theme) => ({
    marginTop: '1rem',
    marginBottom: '1rem',
    textAlign: 'center',
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 600,
    color: '#185D8E',
    [theme.breakpoints.down('sm')]: {
        textAlign: 'center',
    },
});