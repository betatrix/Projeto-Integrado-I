import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Box } from '@mui/material';
import poliedro from '../../../assets/img/poliedro.png';
import objetivo from '../../../assets/img/objetivo.png';
import stoodi from '../../../assets/img/stoodi.png';
import hexag from '../../../assets/img/hexag.png';
import descomplica from '../../../assets/img/descomplica.png';

const LogoCarousel: React.FC = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    };

    const logos = [
        poliedro,
        objetivo,
        stoodi,
        hexag,
        descomplica,
    ];

    return (
        <Box sx={{ maxWidth: '100%', padding: '2rem',}}>
            <Slider {...settings}>
                {logos.map((logo, index) => (
                    <Box key={index} sx={{ display: 'flex', justifyContent: 'center'}}>
                        <img src={logo} alt={`Logo ${index + 1}`} style={{ maxWidth: '100%', maxHeight: '100%' }} />
                    </Box>
                ))}
            </Slider>
        </Box>
    );
};

export default LogoCarousel;
