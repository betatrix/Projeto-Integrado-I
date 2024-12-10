import { Box, Grid, Typography, useMediaQuery } from '@mui/material';
import React from 'react';
import {
    aboutBoxStyles,
    gridItemTextStyles,
    typographyBodyStyles,
    typographyAboutTitleStyles,
    gridAboutContainerStyles,
    containerAbout,
} from './styles';
import aboutImage from '../../../assets/img/menino-sobre-nos.png';
import { useTranslation } from 'react-i18next';

export const About: React.FC = () => {
    const{ t } = useTranslation();
    const isMobile = useMediaQuery('(max-width:600px)');

    return (
        <>
            <Box sx={aboutBoxStyles}>
                <Box sx={containerAbout}>
                    <Box>
                        <Grid alignItems="left" justifyContent="left" sx={gridAboutContainerStyles}>
                            <Grid item xs={12} md={5} sx={gridItemTextStyles}>
                                <Typography sx={typographyAboutTitleStyles}>
                                    {t('aboutTitle')}
                                </Typography>
                                <Typography sx={typographyBodyStyles}>
                                    {t('aboutText1')}
                                </Typography>
                                <Typography sx={typographyBodyStyles}>
                                    {t('aboutText2')}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                    {!isMobile && (
                        <Box sx={{ marginRight:'5rem' }}>
                            <img src={aboutImage} alt="Imagem ilustrativa" style={{ width: '90%' }} />
                        </Box>
                    )
                    }
                </Box>
            </Box>
        </>
    );
};

export default About;
