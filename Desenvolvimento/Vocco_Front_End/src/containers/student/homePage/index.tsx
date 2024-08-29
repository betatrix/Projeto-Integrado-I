import { Grid, Box, Typography, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import InitialPageHeader from '../../../components/homeHeader';
import About from './about';
import Faq from './faq';
import {
    homePageBoxStyles,
    gridIndexContainerStyles,
    typographyTitleStyles,
    typographySubtitleStyles,
    buttonStyles,
    CarouselTitle,
} from './styles';
import TestInformation from './testInf';
import InitialPageFooter from '../../../components/homeFooter';
import LogoCarousel from './logoCarousel';
import { useTranslation } from 'react-i18next';

export const HomePage: React.FC = () => {
    const{ t } = useTranslation();
    
    return (
        <>
            <InitialPageHeader />
            <Box sx={homePageBoxStyles} id="home">
                <Grid spacing={4} alignItems="colum" justifyContent="flex-start" sx={gridIndexContainerStyles}>
                    <Typography sx={typographyTitleStyles}>
                        VOCCO
                    </Typography>
                    <Typography sx={typographySubtitleStyles}>
                        {t('welcomeText1')}<br />
                        {t('welcomeText2')}<br />
                        {t('welcomeText3')}
                    </Typography>
                    <Link to="/register" style={{ textDecoration: 'none' }}>
                        <Button variant="contained" size="large" sx={buttonStyles}>
                            {t('registerButton')}
                        </Button>
                    </Link>
                </Grid>
            </Box>
            <Container>
                <Typography sx={CarouselTitle}>
                    {t('partner')}
                </Typography>
                <LogoCarousel />
            </Container>
            <Box id="testInformation">
                <TestInformation />
            </Box>
            <Box id="about">
                <About />
            </Box>
            <Box id="faq">
                <Faq />
            </Box>
            <InitialPageFooter />
        </>
    );
};

export default HomePage;
