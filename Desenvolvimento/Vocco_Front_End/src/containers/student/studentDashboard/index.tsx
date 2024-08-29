import React, { useEffect, useState, useContext } from 'react';
import { Grid, Box, Typography, Paper, Button, Tooltip, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import StudentHeader from '../../../components/studentHeader';
import AnnouncementBar from './announcement';
import { IconStyle, TestButton, content0Style, contentStyle, gridStyles, homePageBoxStyles, numberStyle, paperStyles, titleMainStyle, titleStyle } from './styles';
import StudentFooter from '../../../components/studentFooter';
import QuizIcon from '@mui/icons-material/Quiz';
import PersonIcon from '@mui/icons-material/Person';
import InfoIcon from '@mui/icons-material/Info';
import { contarTeste, buscarTestesDeEstudante, buscarPerfisRecorrentes } from '../../../services/apiService';
import { AuthContext } from '../../../contexts/auth';
import { decryptData } from '../../../services/encryptionService';
import { useTranslation } from 'react-i18next';

const StudentDashboard: React.FC = () => {
    const{ t } = useTranslation();
    
    const [showAnnouncement, setShowAnnouncement] = useState(true);
    const [testCount, setTestCount] = useState(0);
    const [testHistory, setTestHistory] = useState<{ date: string, tipo: string, result: string[] }[]>([]);
    const [recorrentes, setRecorrentes] = useState<string[]>([]);

    const authContext = useContext(AuthContext);
    const userData = authContext?.user ? decryptData(authContext.user) : null;
    const user = userData ? JSON.parse(userData) : null;

    useEffect(() => {
        const fetchTestCount = async () => {
            try {
                if (user?.id) {
                    const count = await contarTeste(user.id);
                    setTestCount(count);
                }
            } catch (error) {
                console.error('Erro ao buscar contagem de testes:', error);
            }
        };

        const fetchTestHistory = async () => {
            try {
                if (user?.id) {
                    const tests = await buscarTestesDeEstudante(user.id);
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const formattedTests = tests.map((test: any) => ({
                        date: new Date(test.data).toLocaleDateString('pt-BR'),
                        tipo: test.teste,
                        result: test.perfis,
                    }));
                    setTestHistory(formattedTests);
                }
            } catch (error) {
                console.error('Erro ao buscar histórico de testes:', error);
            }
        };

        const fetchPerfisRecorrentes = async () => {
            try {
                if (user?.id) {
                    const profiles = await buscarPerfisRecorrentes(user.id);
                    setRecorrentes(profiles);
                }
            } catch (error) {
                console.error('Erro ao buscar perfis recorrentes:', error);
            }
        };

        fetchTestCount();
        fetchTestHistory();
        fetchPerfisRecorrentes();
    }, [user?.id]);

    const handleCloseAnnouncement = () => {
        setShowAnnouncement(false);
    };

    const carouselSettings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 3000,
    };

    const profileDescriptions: Record<string, string> = {
        Investigativo: 'Pessoas com este perfil são curiosas, analíticas e gostam de resolver problemas.',
        Convencional: 'Pessoas com este perfil são organizadas, metódicas e preferem trabalhar com dados e detalhes.',
        Empreendedor: 'Pessoas com este perfil são líderes naturais, gostam de persuadir e influenciar os outros.',
        Realista: 'Pessoas com este perfil são práticas, gostam de trabalhar com as mãos e preferem atividades físicas e mecânicas.',
        Artistico: 'Pessoas com este perfil são criativas, gostam de se expressar através de diferentes formas de arte.',
        Social: 'Pessoas com este perfil são comunicativas, gostam de ajudar os outros e preferem atividades que envolvem interação interpessoal.'
    };

    if (!authContext) {
        return <div>Não conseguiu pegar o contexto.</div>;
    }

    return (
        <>
            <StudentHeader />
            {showAnnouncement && (
                <AnnouncementBar
                    imageUrl="URL_DA_IMAGEM"
                    onClose={handleCloseAnnouncement}
                />
            )}
            <Box sx={homePageBoxStyles}>
                <Grid container sx={{ justifyContent: 'center', display: 'flex' }}>
                    <Box>
                        <Typography sx={titleMainStyle}>
                            {t('dashboardTitle')}
                        </Typography>
                    </Box>
                </Grid>
                <Grid container sx={gridStyles} spacing={2}>
                    <Grid item xs={12} md={6} display="flex" justifyContent="center">
                        <Paper sx={paperStyles}>
                            <Typography sx={numberStyle} component="div">
                                {testCount}
                            </Typography>
                            <Typography sx={titleStyle}>
                                {t('dashboardCard1')}
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6} display="flex" justifyContent="center">
                        <Paper sx={paperStyles}>
                            <Typography sx={titleStyle} component="div">
                                {t('dashboardCard2')}
                            </Typography>
                            {recorrentes.length > 0 ? (
                                recorrentes.map((profile, index) => (
                                    <Box key={index} display="flex" alignItems="center" justifyContent="center" marginTop="0.5rem">
                                        <PersonIcon style={{ marginRight: '8px', color: '#1b1f27' }} />
                                        <Typography sx={contentStyle}>
                                            {profile}
                                        </Typography>
                                        <Tooltip title={profileDescriptions[profile] || 'Descrição não disponível'}>
                                            <IconButton sx={{ padding: 0, marginLeft: '8px' }}>
                                                <InfoIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                ))
                            ) : (
                                <Typography sx={content0Style}>
                                    {t('dashboardCard2Text')}
                                </Typography>
                            )}
                        </Paper>
                    </Grid>
                </Grid>
                <Grid container justifyContent="center" alignItems="center" display="flex" spacing={2}>
                    <Grid item xs={12} md={6} display="flex" justifyContent="center">
                        <Paper sx={paperStyles}>
                            <QuizIcon sx={IconStyle} />
                            <Box sx={{ mt: '20px', textAlign: 'center' }} component="div">
                                <Link to="/teste-vocacional" style={{ textDecoration: 'none' }}>
                                    <Button variant="contained" size="large" sx={TestButton}>
                                        {testCount === 0 ? t('dashboardTest1') : t('dashboardTest2')}
                                    </Button>
                                </Link>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6} display="flex" justifyContent="center">
                        <Paper sx={paperStyles}>
                            <Typography sx={titleStyle} component="div">
                                {t('dashboardCard3')}
                            </Typography>
                            {testHistory.length > 1 ? (
                                <Slider {...carouselSettings}>
                                    {testHistory.map((test, index) => (
                                        <Box key={index} sx={{ padding: '1%' }}>
                                            <Typography sx={contentStyle}>
                                                Teste: {test.tipo}
                                            </Typography>
                                            <Typography sx={contentStyle}>
                                                Data: {test.date}
                                            </Typography>
                                            <Typography sx={contentStyle}>
                                                Perfis: {test.result.join(', ')}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Slider>
                            ) : testHistory.length === 1 ? (
                                <Box sx={{ padding: '1%' }}>
                                    <Typography sx={contentStyle}>
                                        Data: {testHistory[0].date}
                                    </Typography>
                                    <Typography sx={contentStyle}>
                                        Teste: {testHistory[0].tipo}
                                    </Typography>
                                    <Typography sx={contentStyle}>
                                        Resultado: {testHistory[0].result.join(', ')}
                                    </Typography>
                                </Box>
                            ) : (
                                <Typography sx={content0Style}>
                                    {t('dashboardCard3Text')}
                                </Typography>
                            )}
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
            <StudentFooter />
        </>
    );
};

export default StudentDashboard;
