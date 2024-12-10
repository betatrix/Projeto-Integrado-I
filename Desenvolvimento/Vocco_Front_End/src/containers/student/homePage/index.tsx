import { Grid, Box, Typography, Button, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import InitialPageHeader from '../../../components/homeHeader';
import About from './about';
import Faq from './faq';
import Sources from './sources';
import TestInformation from './testInf';
import {
    homePageBoxStyles,
    gridIndexContainerStyles,
    typographyTitleStyles,
    typographySubtitleStyles,
    buttonStyles,
    CarouselTitle,
    BoxCarouselStyles,
    container,
    arrowUpIconStyles,
} from './styles';
import initialImage from '../../../assets/img/imagem-principal.png';
import InitialPageFooter from '../../../components/homeFooter';
import LogoCarousel from './logoCarousel';
import { useTranslation } from 'react-i18next';
import { ArrowCircleUp } from '@mui/icons-material';

export const HomePage: React.FC = () => {
    const{ t } = useTranslation();
    const navigate = useNavigate();
    const isMobile = useMediaQuery('(max-width:600px)');

    const handleRegister = () => {
        navigate('/register');
    };

    return (
        <>
            <InitialPageHeader />
            <Box sx={homePageBoxStyles} id="home">
                <Box sx={container}>
                    <Box
                        sx={{
                            position: 'fixed',
                            bottom: 16,
                            right: 16,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor:'pointer',
                            '@keyframes float': {
                                '0%': { transform: 'translateY(0)' },
                                '50%': { transform: 'translateY(-10px)' },
                                '100%': { transform: 'translateY(0)' },
                            },
                            animation: 'float 3s ease-in-out infinite',
                        }}
                    >
                        <ArrowCircleUp
                            sx={arrowUpIconStyles}
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        />
                    </Box>

                    <Grid container spacing={1} alignItems="center" justifyContent="space-between" sx={gridIndexContainerStyles}>
                        <Grid item xs={12} md={6}>
                            <Typography sx={typographyTitleStyles}>
                                {t('welcomeText1')}
                            </Typography>
                            <Typography sx={typographySubtitleStyles}>
                                {t('welcomeText2')}
                            </Typography>
                            <Button type="button" id='loginHomePageButton' onClick={handleRegister} variant="outlined" sx={buttonStyles}>
                                {t('registerButton')}
                            </Button>
                        </Grid>
                        {!isMobile && (
                            <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                                <img
                                    src={initialImage}
                                    alt="Imagem ilustrativa"
                                    style={{ width: '100%', maxWidth: '47rem', height: 'auto', marginLeft:'7.5rem' }}
                                />
                            </Grid>
                        )}
                    </Grid>
                </Box>
                <Box sx={BoxCarouselStyles}>
                    <Typography sx={CarouselTitle}>
                        {t('partner')}
                    </Typography>
                    <LogoCarousel />
                </Box>
            </Box>
            <Box id="about">
                <About />
            </Box>
            <Box id="testInformation">
                <TestInformation />
            </Box>
            <Box
                sx={{
                    '@media (max-width: 600px)': {
                        padding: '20rem 0rem'
                    }
                }}
                id="sources"
            >
                <Sources />
            </Box>
            <Box id="faq">
                <Faq />
            </Box>
            <InitialPageFooter />
        </>
    );
};

export default HomePage;
