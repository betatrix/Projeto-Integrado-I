import { Box, Card, CardMedia, Grid, IconButton, Typography } from '@mui/material';
import React, { useState } from 'react';
import Realista from '../../../assets/img/Realista.png';
import Investigativo from '../../../assets/img/Investigativo.png';
import Artistico from '../../../assets/img/Artistico.png';
import Social from '../../../assets/img/Social.png';
import Empreendedor from '../../../assets/img/Empreendedor.png';
import Convencional from '../../../assets/img/Convencional.png';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {
    BoxCardHollandStyles,
    CardStyle,
    GridItemCards,
    GridItemText,
    TestInfoContent,
    TestInfoTitle,
    testInfBoxStyles,
} from './styles';
import { useTranslation } from 'react-i18next';

const data = [
    {
        src: Realista,
        title: 'Realista',
    },
    {
        src: Investigativo,
        title: 'Investigativo',
    },
    {
        src: Artistico,
        title: 'Artístico',
    },
    {
        src: Social,
        title: 'Social',
    },
    {
        src: Empreendedor,
        title: 'Empreendedor',
    },
    {
        src: Convencional,
        title: 'Convencional',
    },
];

export const TestInformation: React.FC = () => {
    const{ t } = useTranslation();
    const [index, setIndex] = useState(0);

    const handlePrevClick = () => {
        setIndex((prevIndex) => (prevIndex === 0 ? data.length - 1 : prevIndex - 1));
    };

    const handleNextClick = () => {
        setIndex((prevIndex) => (prevIndex === data.length - 1 ? 0 : prevIndex + 1));
    };

    const getVisibleData = () => {
        const items = [];
        for (let i = -1; i <= 1; i++) {
            items.push(data[(index + i + data.length) % data.length]);
        }
        return items;
    };

    const visibleData = getVisibleData();

    return (
        <Box sx={testInfBoxStyles}>
            <Grid container spacing={4} alignItems="center" justifyContent="center">
                <Grid item xs={12} md={6} sx={GridItemText}>
                    <Box>
                        <Typography sx={TestInfoTitle}>{t('informationTitle')}</Typography>
                    </Box>
                    <Typography sx={TestInfoContent}>
                        {t('informationText')}
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6} sx={GridItemCards}>
                    <Box sx={BoxCardHollandStyles}>
                        <IconButton onClick={handlePrevClick}>
                            <ArrowBackIosNewIcon />
                        </IconButton>
                        {visibleData.map((item, idx) => (
                            <Card key={item.title} variant="outlined" sx={{ ...CardStyle, transform: idx === 1 ? 'scale(1.1)' : 'scale(0.8)', transition: 'transform 1.0s ease' }}>
                                <CardMedia
                                    component="img"
                                    height="auto"
                                    image={item.src}
                                    alt={item.title}
                                />
                                <Box sx={{ whiteSpace: 'nowrap', padding: '1rem', textAlign: 'center' }}>
                                    <Typography sx={{fontFamily:'Poppins', fontSize:'0.8rem', fontWeight: 'bold', color:'#1b1f27'}}>{item.title}</Typography>
                                </Box>
                            </Card>
                        ))}
                        <IconButton onClick={handleNextClick}>
                            <ArrowForwardIosIcon />
                        </IconButton>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default TestInformation;
