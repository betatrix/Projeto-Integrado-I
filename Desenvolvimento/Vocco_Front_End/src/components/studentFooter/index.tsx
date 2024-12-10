/* eslint-disable max-len */
import { Box, Typography, Link, IconButton, useMediaQuery } from '@mui/material';
import { YouTube, GitHub, Article } from '@mui/icons-material';
import {
    footerContainer,
    footerContent,
    footerColumn,
    footerTitle,
    footerLink,
    socialIcons,
    footerBottom
} from './styles';

function Footer() {
    const isMobile = useMediaQuery('(max-width:600px)');

    const handleDownloadTerms = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const link = document.createElement('a');
        link.href = 'src/assets/termos-de-uso_vocco.pdf';
        link.download = 'termos-de-uso_vocco.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleDownloadPolicies = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const link = document.createElement('a');
        link.href = 'src/assets/politica-de-privacidade_vocco.pdf';
        link.download = 'politica-de-privacidade_vocco.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <Box component="footer" sx={footerContainer}>
            <Box sx={footerContent}>
                {/* Coluna de Contato */}
                <Box sx={footerColumn}>
                    <Typography variant="h6" sx={footerTitle}>
                        Contato
                    </Typography>
                    <Typography>
                        <Link href="tel:+5511912345678" target="_blank" sx={footerLink}>
                            +55 11 91234-5678
                        </Link>
                    </Typography>
                    <Typography>
                        <Link href={`mailto:voccosupp@gmail.com?subject=%5BEscreva%20o%20assunto!%5D&body=Oi%2C%20galera!%20Tudo%20certo%3F
  %0A%0AT%C3%B4%20passando%20por%20aqui%20porque%20queria%20falar%20com%20voc%C3%AAs%20sobre%20a%20plataforma.%20Tenho%20%5Buma%20d%C3%BAvida%20
  %2F%20sugest%C3%A3o%20%2F%20elogio%5D%20que%20gostaria%20de%20compartilhar%3A%0A%0A-%20%5BDescreva%20sua%20d%C3%BAvida%2C%20sugest%C3%A3o%20
  ou%20elogio%20aqui.%5D%0A%0AFico%20no%20aguardo%20e%20j%C3%A1%20agrade%C3%A7o%20pela%20aten%C3%A7%C3%A3o!%20%F0%9F%98%84%0A%0AAbra%C3%A7o%2C
  %0A%5BSeu%20Nome%5D`}
                        target="_blank" sx={footerLink}>
                            voccosupp@gmail.com
                        </Link>
                    </Typography>
                </Box>

                {/* Coluna de Recursos */}
                <Box sx={footerColumn}>
                    <Typography variant="h6" sx={footerTitle}>
                        Recursos
                    </Typography>
                    <Typography>
                        <Link href="#" sx={footerLink} onClick={handleDownloadTerms}>
                            Termos e condições
                        </Link>
                    </Typography>
                    <Typography>
                        <Link href="#" sx={footerLink} onClick={handleDownloadPolicies}>
                            Política de Privacidade
                        </Link>
                    </Typography>
                </Box>

                {!isMobile && (
                    <Box sx={footerColumn}>
                        <Typography variant="h6" sx={footerTitle}>
                            Segue a gente!
                        </Typography>
                        <Box sx={socialIcons}>
                            <IconButton
                                href="https://www.youtube.com/@AdasTechIFSP"
                                target="_blank"
                                sx={{
                                    color: '#6B9ABC',
                                    transition: '0.3s ease-in-out',
                                    '&:hover': { color: 'white' }
                                }}
                            >
                                <YouTube />
                            </IconButton>

                            <IconButton
                                href="http://adastech.wordpress.com/"
                                target="_blank"
                                sx={{
                                    color: '#6B9ABC',
                                    transition: '0.3s ease-in-out',
                                    '&:hover': { color: 'white' }
                                }}
                            >
                                <Article />
                            </IconButton>

                            <IconButton
                                href="https://github.com/betatrix/Projeto-Integrado-I"
                                target="_blank"
                                sx={{
                                    color: '#6B9ABC',
                                    transition: '0.3s ease-in-out',
                                    '&:hover': { color: 'white' }
                                }}
                            >
                                <GitHub />
                            </IconButton>
                        </Box>

                    </Box>
                )}
            </Box>

            {/* Direitos Reservados */}
            <Box sx={footerBottom}>
                <Typography sx={footerBottom}>© 2024 Vocco. Todos os direitos reservados.</Typography>
            </Box>
        </Box>
    );
}

export default Footer;
