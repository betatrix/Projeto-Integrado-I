/* eslint-disable @typescript-eslint/no-explicit-any */
import useMediaQuery from '@mui/material/useMediaQuery';
import { styled, useTheme } from '@mui/material/styles';
import React, { useEffect, useState, useContext } from 'react';
import { Grid, Box, Typography, Paper, Button, IconButton } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import { PieChart } from '@mui/x-charts/PieChart';
import {
    contentStyle, gridItem1Styles, titleResultStyle, TestButton,
    paperBannerStyles, paperTestStyles, paperPerfisStyles, paperResultStyles,
    paperImgStyles,
    gridContainerStyles,
    gridItem2Styles,
    titlePerfilStyle,
    cardTitleStyle,
    cardTitle2Style,
    boxResultStyles,
    contentPerfilStyle,
    contentResultStyle,
    IconStyles,
} from './styles';
import { buscarTestesDeEstudante, buscarPerfisRecorrentes, buscarPerfilEstudante, } from '../../../services/apiService';
import { AuthContext } from '../../../contexts/auth';
import { decryptData } from '../../../services/encryptionService';
import { useTranslation } from 'react-i18next';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import StudentHeader from '../../../components/studentHeader';
import LockIcon from '@mui/icons-material/Lock';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import CardTravelIcon from '@mui/icons-material/CardTravel';
import PsychologyIcon from '@mui/icons-material/Psychology';
import CustomDrawer from '../../../components/sidemenu/CustomDrawer';
import Footer from '../../../components/homeFooter';
import perfilArtistico from '../../../assets/img/perfil-artistico.png';
import Voquinho from '../../../assets/img/polvo-voquinho-de-oculos.png';

const PROFILE_DETAILS: { [key: string]: { color: string; icon: React.ReactNode } } = {
    'Artístico': { color: '#FF69B4', icon: <ColorLensIcon sx={IconStyles} /> },
    'Social': { color: '#7FFFD4', icon: <Diversity3Icon sx={IconStyles} /> },
    'Investigativo': { color: '#1E90FF', icon: <TravelExploreIcon sx={IconStyles} /> },
    'Empreendedor': { color: '#DC143C', icon: <PointOfSaleIcon sx={IconStyles} /> },
    'Convencional': { color: '#836FFF', icon: <CardTravelIcon sx={IconStyles} /> },
    'Realista': { color: '#D2691E', icon: <PsychologyIcon sx={IconStyles} /> },
};

const DrawerHeader = styled('div')(() => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    minHeight: '2rem',
}));

interface ResultItem {
    perfil: string;
    compatibilidade: number;
}

interface Profile {
    descricao: string;
    imagem: string;
}

const StudentDashboard: React.FC = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const isMediumScreen = useMediaQuery(theme.breakpoints.down(1400));
    const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));
    const [open, setOpen] = React.useState(false);
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const { t } = useTranslation();

    const [testHistory, setTestHistory] = useState<{ date: string, result: ResultItem[], id: any }[]>([]);
    const [recorrentes, setRecorrentes] = useState<string[]>([]);
    const [sliderRef, setSliderRef] = useState<Slider | null>(null);
    const [perfilImage, setPerfilImage] = useState<string | null>(null);
    const authContext = useContext(AuthContext);
    const userData = authContext?.user ? decryptData(authContext.user) : null;
    const user = userData ? JSON.parse(userData) : null;

    useEffect(() => {
        const fetchPerfilImage = async () => {
            try {
                if (user?.id) {
                    const perfilData = await buscarPerfilEstudante(user.id);
                    setPerfilImage(perfilData.imagem);
                }
            } catch (error) {
                console.error('Erro ao buscar imagem do perfil do estudante');
                throw error;
            }
        };
        fetchPerfilImage();
    }, [user?.id]);

    useEffect(() => {
        const fetchTestHistory = async () => {
            try {
                if (user?.id) {
                    const tests = await buscarTestesDeEstudante(user.id);
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const formattedTests = tests.map((test: any) => {
                        const date = new Date(test.data);
                        const utcDate = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
                        return {
                            id: test.id,
                            date: utcDate.toLocaleDateString('pt-BR'),
                            result: test.perfis,
                        };
                    }).reverse();
                    setTestHistory(formattedTests);
                }
            } catch (error) {
                console.error('Erro ao buscar histórico de testes');
                throw error;
            }

        };

        const fetchPerfisRecorrentes = async () => {
            try {
                if (user?.id) {
                    const profiles: Profile[] = await buscarPerfisRecorrentes(user.id);
                    const updatedProfiles = profiles.map((profile) => ({
                        descricao: profile.descricao,
                        imagem: `${import.meta.env.VITE_API_URL}/arquivos/download/test/${profile.imagem}`, // Adiciona o caminho completo
                    }));
                    const profilesDescription = updatedProfiles.map((profile) => profile.descricao);
                    setRecorrentes(profilesDescription);
                    if (updatedProfiles.length > 0) {
                        setPerfilImage(updatedProfiles[0].imagem);
                    }
                }
            } catch (error) {
                console.error('Erro ao buscar perfis recorrentes');
                throw error;
            }
        };

        fetchTestHistory();
        fetchPerfisRecorrentes();
    }, [user?.id]);

    const carouselSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 3000,
        arrows: false,
    };

    if (!authContext) {
        return <div>Não conseguiu pegar o contexto.</div>;
    }
    const showLockIcon = testHistory.length === 0;

    const legendStyle = {
        itemMarkHeight: isSmallScreen ? 13 : isMediumScreen ? 18 : 18,
        itemMarkWidth: isSmallScreen ? 13 : isMediumScreen ? 18 : 18,
        itemGap: isSmallScreen ? 5 : isMediumScreen ? 8 : 10,
        padding: isSmallScreen ? -55 : isMediumScreen ? -70 : -80,
        labelStyle: {
            fontFamily: 'Poppins, sans-serif',
            fontSize: isSmallScreen ? 14 : isMediumScreen ? 16 : 20,
            fontWeight: 'bold',
            fill: '#0B2A40',
        },
    };

    const chartConfig = {
        outerRadius: isSmallScreen ? 65 : isMediumScreen ? 83.125 : isLargeScreen ? 118.75 : 95,
        cx: isSmallScreen ? 18 : isMediumScreen ? 30 : isLargeScreen ? 80 : 180,
        cy: isSmallScreen ? 60 : isMediumScreen ? 79.45 : isLargeScreen ? 113.5 : 90,
        width: isSmallScreen ? 180 : isMediumScreen ? 227.5 : isLargeScreen ? 325 : 260,
        height: isSmallScreen ? 140 : isMediumScreen ? 175 : isLargeScreen ? 250 : 200,
        ArrowBackIosIcon: isSmallScreen ? 60 : isMediumScreen ? 83.125 : isLargeScreen ? 118.75 : 95,
    };

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const navigate = useNavigate();

    const handleClick = async (testId: string) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/resultado/estudanteTeste/${testId}`);
            if (!response.ok) {
                throw new Error('Erro ao buscar resultado do teste');
            }
            const data = await response.json();

            /// Encontrar a data do teste pelo testId
            const selectedTest = testHistory.find(test => test.id === testId);

            // Salvar o testId e a data no localStorage
            if (selectedTest) {
                localStorage.setItem('testId', testId);
                localStorage.setItem('testDate', selectedTest.date); // Salvar a data
            }
            navigate('/resultados-anteriores', { state: { testId, data } });
        } catch (error) {
            console.error('ERRO', error);
        }
    };

    return (
        <>
            <Box component="main" sx={{ flexGrow: 1, backgroundColor: 'white', minHeight: '80vh' }}>
                <DrawerHeader />
                <Box>
                    <CustomDrawer open={open} handleDrawerOpen={handleDrawerOpen} handleDrawerClose={handleDrawerClose} />
                </Box>
                <Box sx={{ paddingLeft: open ? { xs: '0px', sm: '215px' } : '0px' }} >
                    <StudentHeader />
                    <Grid display="flex" justifyContent="center">
                        <Paper sx={paperTestStyles}>
                            <Box sx={{ display: 'flex' }}>
                                <Box sx={{ flexGrow: 1 }}>
                                    <Typography sx={cardTitleStyle} component="div">
                                        {t('dashboardTitle')}
                                    </Typography>
                                    <Typography sx={cardTitle2Style} component="div">
                                        {t('dashboardCard1')}
                                    </Typography>
                                    <Link to="/teste-vocacional" style={{ textDecoration: 'none' }}>
                                        <Button id='testButton' variant="text" size="large" sx={TestButton} component="div">
                                            {t('dashboardTest1')}
                                        </Button>
                                    </Link>
                                </Box>
                                <Box sx={{ display: 'flex' }} ml={1} className="your-image-container">
                                    <img
                                        src={Voquinho}
                                        alt="Logo"
                                        style={{ width: '260px' }}
                                    />
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid container sx={gridContainerStyles}>
                        <Box>
                            <Typography sx={titlePerfilStyle} component="div">
                                {t('dashboardCard2')}
                            </Typography>
                            <Grid item sx={gridItem1Styles}>
                                <Paper sx={{
                                    ...paperImgStyles,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: '33vw',
                                    height: '22rem',
                                    borderRadius: '10px',
                                    backgroundColor: 'rgb(141, 169, 189)',
                                    [theme.breakpoints.down('md')]: {
                                        width: '26rem',
                                        height: '16rem',
                                        marginBottom: '2rem',
                                        borderRadius: '5px',
                                    },
                                    [theme.breakpoints.down('sm')]: {
                                        width: '21rem',
                                        height: '15rem',
                                        marginBottom: '2rem',
                                        borderRadius: '5px',
                                    }
                                }}>
                                    {showLockIcon ? (
                                        <Paper sx={{
                                            display: 'flex', justifyContent: 'center', alignItems: 'center',
                                            width: '33vw',
                                            height: '22rem',
                                            borderRadius: '10px',
                                            backgroundColor: ' rgb(141, 169, 189)', boxShadow: 'none', [theme.breakpoints.down('sm')]: {
                                                width: '95px',
                                                height: '11rem',
                                            }, [theme.breakpoints.down('md')]: {
                                                width: '95px',
                                                height: '11rem',
                                            },

                                        }}>
                                            <LockIcon sx={{
                                                fontSize: 125,
                                                color: '#0B2A40',
                                                [theme.breakpoints.down('sm')]: {
                                                    fontSize: 70,
                                                },
                                                [theme.breakpoints.down('md')]: {
                                                    fontSize: 70,
                                                },
                                            }} />
                                        </Paper>
                                    ) : (
                                        <>
                                            <Paper sx={paperImgStyles}>
                                                <Box
                                                    component="img"
                                                    src={perfilImage || perfilArtistico}
                                                    alt="Perfil do Estudante"
                                                    loading="lazy"
                                                    onError={(e) => {
                                                        e.currentTarget.src = perfilArtistico;
                                                    }}
                                                    sx={{
                                                        width: '125.25px',
                                                        marginTop:'8px',
                                                        marginRight:'10px',
                                                        [theme.breakpoints.down('md')]: {
                                                            width: '95px',
                                                        },
                                                        [theme.breakpoints.down('sm')]: {
                                                            width: '95px',
                                                        },
                                                    }}
                                                />
                                            </Paper>
                                            <Box>
                                                {recorrentes.map((profile, index) => (
                                                    <Paper key={index} sx={paperPerfisStyles}>
                                                        <Box display="flex" alignItems="center">
                                                            <Box sx={{ fontSize: 'small' }}>
                                                                {PROFILE_DETAILS[profile] ? PROFILE_DETAILS[profile].icon : null}
                                                            </Box>
                                                            <Typography sx={contentPerfilStyle(theme)}>
                                                                {profile}
                                                            </Typography>
                                                        </Box>
                                                    </Paper>
                                                ))}
                                            </Box>
                                        </>
                                    )}
                                </Paper>
                            </Grid>
                        </Box>
                        <Box
                            sx={{
                                width: showLockIcon ? '12vw' : '6vw',
                                transition: 'width 0.3s ease-in-out',
                                overflow: 'hidden',
                                [theme.breakpoints.down('sm')]: {
                                    width: showLockIcon ? '6vw' : '0px',
                                },
                                [theme.breakpoints.down('md')]: {
                                    width: showLockIcon ? '6vw' : '0px',
                                },
                            }}
                        >
                        </Box>
                        <Grid item sx={gridItem2Styles}>
                            <Box sx={{ alignItems: 'center', textAlign: 'center' }}>
                                <Typography sx={titleResultStyle} component="div">
                                    {t('dashboardCard3')}
                                </Typography>

                                <Paper sx={paperResultStyles}>
                                    {testHistory.length > 1 && (
                                        <IconButton onClick={() => sliderRef?.slickPrev()}>
                                            <ArrowBackIosIcon sx={{
                                                fontSize: 31.25,
                                                color: '#0B2A40',
                                                [theme.breakpoints.down('sm')]: { fontSize: 10 },
                                                [theme.breakpoints.down('md')]: { fontSize: 10 },
                                            }} />
                                        </IconButton>
                                    )}

                                    <Paper sx={boxResultStyles}>

                                        {testHistory.length > 0 ? (
                                            testHistory.length === 1 ? (
                                                <Box sx={{ textAlign: 'right' }} onClick={() => handleClick(testHistory[0].id)}>
                                                    <Typography sx={contentStyle}>
                                                        {testHistory[0].date}
                                                    </Typography>
                                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                        <PieChart
                                                            series={[{
                                                                data: testHistory[0].result.map(item => ({
                                                                    id: item.perfil,
                                                                    value: item.compatibilidade,
                                                                    label: item.perfil,
                                                                    color: PROFILE_DETAILS[item.perfil]?.color || '#CCCCCC',
                                                                })),
                                                                innerRadius: 3,
                                                                outerRadius: chartConfig.outerRadius,
                                                                paddingAngle: 5,
                                                                cornerRadius: 5,
                                                                startAngle: -360,
                                                                endAngle: 225,
                                                                cx: chartConfig.cx,
                                                                cy: chartConfig.cy,
                                                            }]}
                                                            width={chartConfig.width}
                                                            height={chartConfig.height}
                                                            tooltip={{ trigger: 'none' }}
                                                            slotProps={{
                                                                legend: {
                                                                    position: { vertical: 'middle', horizontal: 'right' },
                                                                    ...legendStyle,
                                                                },
                                                            }}
                                                        />
                                                    </Box>
                                                </Box>
                                            ) : (
                                                <Slider ref={setSliderRef} {...carouselSettings}>

                                                    {testHistory.map((test, index) => (
                                                        <Box key={index} sx={{ textAlign: 'right' }} onClick={() => handleClick(test.id)}>
                                                            <Typography sx={contentStyle}>
                                                                {test.date}
                                                            </Typography>
                                                            <Box sx={{ display: 'flex' }}>
                                                                <PieChart
                                                                    series={[{
                                                                        data: test.result.map(item => ({
                                                                            id: item.perfil,
                                                                            value: item.compatibilidade,
                                                                            label: item.perfil,
                                                                            color: PROFILE_DETAILS[item.perfil]?.color || '#CCCCCC',
                                                                        })),
                                                                        innerRadius: 3,
                                                                        outerRadius: chartConfig.outerRadius,
                                                                        paddingAngle: 5,
                                                                        cornerRadius: 5,
                                                                        startAngle: -360,
                                                                        endAngle: 225,
                                                                        cx: chartConfig.cx,
                                                                        cy: chartConfig.cy,
                                                                    }]}
                                                                    width={chartConfig.width}
                                                                    height={chartConfig.height}
                                                                    tooltip={{ trigger: 'none' }}
                                                                    slotProps={{
                                                                        legend: {
                                                                            position: { vertical: 'middle', horizontal: 'right' },
                                                                            ...legendStyle,
                                                                        },
                                                                    }}
                                                                />
                                                            </Box>
                                                        </Box>
                                                    ))}
                                                </Slider>
                                            )
                                        ) : (
                                            <Typography sx={contentResultStyle}>
                                                {t('dashboardCard3Text')}
                                            </Typography>

                                        )}

                                        {testHistory.length > 0 && (
                                            // eslint-disable-next-line max-len
                                            <Typography sx={{ textAlign: 'center', marginTop: isSmallScreen ? '0' : '10px', fontSize: isSmallScreen ? '9px' : '16px', color: '#185D8E', fontWeight: 'bold', opacity: 0.8, marginBottom: isSmallScreen ? '2px' : '0' }}>
                                                {t('dashboardCheckOldResults')}
                                            </Typography>
                                        )}
                                    </Paper>

                                    {testHistory.length > 1 && (
                                        <IconButton onClick={() => sliderRef?.slickNext()}>
                                            <ArrowForwardIosIcon sx={{
                                                fontSize: 31.25,
                                                color: '#0B2A40',
                                                [theme.breakpoints.down('sm')]: { fontSize: 10 },
                                                [theme.breakpoints.down('md')]: { fontSize: 10 },
                                            }} />
                                        </IconButton>
                                    )}
                                </Paper>

                            </Box>
                        </Grid>
                    </Grid>
                    <Grid display="flex" justifyContent="center">
                        <a href="https://www.curso-objetivo.br/vestibular/" target="_blank" rel="Objetivo Vestibulares" style={{ textDecoration: 'none' }}>
                            <Paper sx={paperBannerStyles}></Paper>
                        </a>
                    </Grid>
                    <Footer />
                </Box>
            </Box >

        </>
    );
};

export default StudentDashboard;