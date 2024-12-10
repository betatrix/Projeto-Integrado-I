/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import React, { useState } from 'react';
import { Grid, CardContent, List, Box, Button, Typography, Modal, TextField, IconButton, ListItem, useMediaQuery, ThemeProvider } from '@mui/material';
import Header from '../../../components/resultTestHeader';
import { DetailsResult, Global, CourseTitle, CareerListItem, PageTile, CourseCard, BackButton, CustomLink, ScrollableList, ModalContent, MobileBackButton, componentTheme } from './new-styles';
// import { useLocation } from 'react-router-dom';
import Footer from '../../../components/homeFooter';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import PaidIcon from '@mui/icons-material/Paid';
import BookIcon from '@mui/icons-material/Book';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PolvoVoquinho from '../../../assets/img/polvo_voquinho.png';
import { useTranslation } from 'react-i18next';

interface ResultData {
    id: number;
    mensagem: string;
    mensagemIngles: string;
    cursos: {
        cursosPerfilPrimario: Array<{
            id: number;
            descricao: string;
            ativo: boolean;
            area: string;
            empregabilidade: string;
            possiveisCarreiras: string[];
            tipo: string;
        }>;
        cursosPerfilSecundario: Array<{
            id: number;
            descricao: string;
            ativo: boolean;
            area: string;
            empregabilidade: string;
            possiveisCarreiras: string[];
            tipo: string;
        }>;
    };
    perfis: Array<{
        id: number;
        descricao: string;
        descricaoIngles: string;
    }>;
    instituicao: {
      id: number,
      nome: string;
      sigla: string;
      site: string;
      ativo: true;
      notaMec: number;
    }
}

const ResultScreen: React.FC = () => {
    const apiUrl = import.meta.env.VITE_API_URL;

    // const location = useLocation();
    // const { resultado } = location.state as { resultado: ResultData };
    const isMobile = useMediaQuery('(max-width:600px)');
    const{ t, i18n } = useTranslation();

    const [openModal, setOpenModal] = useState(false);
    const [institutions, setInstitutions] = useState<ResultData['instituicao'][]>([]);
    const [selectedCourse, setSelectedCourse] = useState<{ id: number, descricao: string, tipo: string } | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredInstitutions, setFilteredInstitutions] = useState<ResultData['instituicao'][]>([]);

    const handleOpenModal = async (cursoId: number, descricao: string, tipo: string ) => {
        setSelectedCourse({ id: cursoId, descricao, tipo });
        try {
            const response = await fetch(`${apiUrl}/cursoInstituicao/curso/mec/${cursoId}`);
            const data: ResultData['instituicao'][] = await response.json();
            const institutionData = data.map((item: any) => item.instituicao);

            setInstitutions(institutionData);
            setFilteredInstitutions(institutionData);
            setOpenModal(true);
        } catch (error) {
            console.error('Erro ao buscar instituições');
            throw error;
        }
    };

    const handleCloseModal = () => {
        setSearchTerm('');
        setOpenModal(false);
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const removeDiacritics = (text: string) =>
            text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

        const term = removeDiacritics(event.target.value.toLowerCase());
        setSearchTerm(term);

        setFilteredInstitutions(
            institutions.filter(inst =>
                removeDiacritics(inst.nome.toLowerCase()).includes(term) ||
                removeDiacritics(inst.sigla.toLowerCase()).includes(term)
            )
        );
    };

    const [previousResults, setPreviousResults] = useState<ResultData | null>(null);

    const handleFetchWithTestId = async () => {
        try {
            const testId = localStorage.getItem('testId');
            if (!testId) throw new Error('Nenhum testId encontrado no localStorage');

            const response = await fetch(`${apiUrl}/resultado/estudanteTeste/${testId}`);
            if (!response.ok) throw new Error('Erro ao buscar resultado do teste');

            const data: ResultData = await response.json();
            setPreviousResults(data); // Atualiza o estado com os dados recuperados
        } catch (error) {
            console.error('ERRO', error);
        }
    };

    React.useEffect(() => {
        handleFetchWithTestId();
    }, []);

    const handleEnterSearch = () => {
        setFilteredInstitutions(institutions.filter(inst =>
            inst.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
            inst.sigla.toLowerCase().includes(searchTerm.toLowerCase())
        ));
    };

    const portugueseMessage = previousResults?.mensagem.replace('Abaixo listamos alguns cursos que podem te interessar, boa sorte!', '');
    const englishMessage = previousResults?.mensagemIngles.replace('Below, we have listed some courses that may interest you. Good luck!', '');

    const formattedMessage3 = i18n.language === 'en' ? englishMessage : portugueseMessage;

    // count words in title course
    const countWords = (str: string) => {
        return str.trim().split(/\s+/).length;
    };

    const getFontSize = (descricao: string) => {
        const wordCount = countWords(descricao);
        return wordCount >= 5 ? (isMobile ? '14px' : '18px') : (isMobile ? '18px' : '20px');
    };

    const savedDate = localStorage.getItem('testDate');
    console.log('Data salva:', savedDate);

    const formatString = (input: string): string => {
        return input
            .replace(/_/g, ' ')
            .toLowerCase()
            .replace(/^\w|\s\w/g, (match) => match.toUpperCase());
    };

    return (
        <>
            <Global />
            <Header />

            {isMobile ? (
                <MobileBackButton startIcon={<ArrowCircleLeftIcon style={{ width: '30px', height: '30px' }} />}>
                    <CustomLink to="/estudante">{t('resultTestBackButton')}</CustomLink>
                </MobileBackButton>
            ) : (
                <BackButton startIcon={<ArrowBackIcon />}>
                    <CustomLink to="/estudante">{t('resultTestBackButton')}</CustomLink>
                </BackButton>
            )}

            <Box
                display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}
                flexDirection={'column'}
                marginTop={isMobile ? '12%' : '5%'}
                marginBottom={isMobile ? '12%' : '5%'}
                width={'100%'}>
                <ThemeProvider theme={componentTheme}>
                    <PageTile variant="h4" gutterBottom
                        style={{ fontWeight: 'bold' }}
                        fontSize={isMobile ? '20px' : '30px'}
                        marginTop={isMobile ? '12%' : '3%'}
                        marginBottom={isMobile ? '8%' : '0'}
                    >
                        {t('resultTestTitle')}
                    </PageTile>
                    <Typography style={{marginTop: '10px', fontSize: '20px', fontWeight: 'bold', color: '#8fb9d6'}}>
                    • {savedDate} •
                    </Typography>
                </ThemeProvider>

                {/* Grid para o texto e a imagem */}
                <Grid container spacing={2} style={{ maxWidth: '80%', alignItems: 'center', marginBottom: '2%' }}>
                    <Grid item xs={12} md={9} style={{width: '100%'}}
                        maxWidth={isMobile ? '90%' : '75%'}
                    >
                        <ThemeProvider theme={componentTheme}>
                            <Typography component="div" style={{ fontSize: isMobile ? '14px' : '20px', lineHeight: '1.8' }} textAlign={isMobile ? 'justify' : 'left'}>
                                {formattedMessage3?.split(' ').map((word, index) => {
                                    if (index === 11 || index === 16) {
                                        return (
                                            <span key={index} style={{ fontWeight: 'bold', color: '#185D8E', fontSize: isMobile ? '16px' : '22px' }}>
                                                {word}{' '}
                                            </span>
                                        );
                                    } else if (word === ':') {
                                        return null;
                                    } else if (index === formattedMessage3.split(' ').length - 1) {
                                        return (
                                            <span key={index} style={{ marginTop: '20px', display: 'inline-block' }}>
                                                {word}
                                            </span>
                                        );
                                    } else {
                                        return word + ' ';
                                    }
                                })}
                            </Typography>
                            <Typography
                                style={{
                                    fontSize: isMobile ? '14px' : '20px',
                                    lineHeight: '1.8',
                                    marginTop: '30px',
                                    display: 'inline-block'
                                }}
                                marginBottom={isMobile ? '40px' : '0'}
                            >{t('resultTestGoodLuckPhrase')}</Typography>
                        </ThemeProvider>

                    </Grid>
                    {!isMobile && (
                        <Grid item xs={12} md={3} >
                            <Box display="flex" justifyContent="center">
                                <img
                                    src={PolvoVoquinho}
                                    alt="Polvo Voquinho"
                                    style={{
                                        marginLeft: '70px',
                                        height: '380px',
                                    }}
                                />
                            </Box>
                        </Grid>
                    )}

                </Grid>

                {/* Cursos para o perfil primário */}
                <Box display="flex" justifyContent="flex-start" width="80%" marginBottom="2%">
                    <ThemeProvider theme={componentTheme}>
                        <Typography variant="h5" style={{ fontWeight: 'bold', color: '#185D8E' }}
                            fontSize={isMobile ? '19px' : '25px'}
                            marginBottom={isMobile ? '5%' : '0'}
                        >
                            {t('resultTestRecomendationTitle')} {i18n.language === 'en' ? previousResults?.perfis[0].descricaoIngles.toLowerCase() : previousResults?.perfis[0].descricao.toLowerCase()}
                        </Typography>
                    </ThemeProvider>

                </Box>

                <Grid container spacing={6}
                    style={{
                        maxWidth: '80%',
                        alignItems: 'center' }}
                    justifyContent="center">
                    {previousResults?.cursos.cursosPerfilPrimario.map((curso, index) => (
                        <Grid item lg={4} key={index}>
                            <CourseCard
                                style={{ display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between' }}>
                                <CardContent>
                                    <ThemeProvider theme={componentTheme}>
                                        <CourseTitle
                                            style={{
                                                fontSize: getFontSize(curso.descricao),
                                                color: '#185D8E',
                                                fontWeight: 'bold',
                                                marginBottom: '25px'
                                            }}>
                                            {curso.descricao}
                                        </CourseTitle>
                                    </ThemeProvider>

                                    <ThemeProvider theme={componentTheme}>
                                        <DetailsResult
                                            style={{
                                                fontSize: '18px',
                                                color: 'black',
                                                textAlign: 'left',
                                                marginBottom: '12px'
                                            }}>
                                            <strong
                                                style={{
                                                    fontSize: '20px',
                                                    fontWeight: 'bold',
                                                    color: 'black',
                                                    marginBottom: '17px'
                                                }}>

                                                <BookIcon style={{
                                                    width: '20px',
                                                    height: '20px',
                                                    marginRight: '8px',
                                                    color: '#185D8E'
                                                }}></BookIcon>
                                                {t('resultTestArea')}
                                            </strong> {curso.area}
                                        </DetailsResult>
                                    </ThemeProvider>

                                    <ThemeProvider theme={componentTheme}>
                                        <DetailsResult
                                            style={{
                                                fontSize: '18px',
                                                color: 'black',
                                                textAlign: 'left',
                                                marginBottom: '12px'
                                            }}>
                                            <strong
                                                style={{
                                                    fontSize: '20px',
                                                    fontWeight: 'bold',
                                                    color: 'black'
                                                }}>
                                                <PaidIcon style={{
                                                    width: '20px',
                                                    height: '20px',
                                                    marginRight: '8px',
                                                    color: '#185D8E'
                                                }}></PaidIcon>

                                                {t('resultTestEmployability')}
                                            </strong> {formatString(curso.empregabilidade)}
                                        </DetailsResult>
                                    </ThemeProvider>

                                    <ThemeProvider theme={componentTheme}>
                                        <DetailsResult
                                            style={{
                                                fontSize: '18px',
                                                color: 'black',
                                                textAlign: 'left',
                                                marginBottom: '10px'
                                            }}>
                                            <strong
                                                style={{
                                                    fontSize: '20px',
                                                    fontWeight: 'bold',
                                                    color: 'black'
                                                }}>
                                                <BusinessCenterIcon style={{
                                                    width: '20px',
                                                    height: '20px',
                                                    marginRight: '8px',
                                                    color: '#185D8E'
                                                }}></BusinessCenterIcon>

                                                {t('resultTestPossibleCareers')}
                                            </strong>
                                        </DetailsResult>

                                        <ScrollableList>
                                            <List>
                                                {curso.possiveisCarreiras.map((carreira, i) => (
                                                    <CareerListItem style={{
                                                        fontSize: '18px',
                                                        color: 'black',
                                                        textAlign: 'left',
                                                    }} key={i}>
                                                        <strong style={{
                                                            fontSize: '20px',
                                                            fontWeight: 'bold',
                                                            color: 'black',

                                                        }}> •<strong style={{fontWeight: 'normal', textAlign: 'left'}} > { formatString(carreira) }</strong></strong>
                                                    </CareerListItem>
                                                ))}
                                            </List>
                                        </ScrollableList>
                                    </ThemeProvider>

                                </CardContent>
                                <Box display="flex" justifyContent="center" marginTop="1rem">
                                    <Button onClick={() => handleOpenModal(curso.id, curso.descricao, curso.tipo)}
                                        sx={{
                                            color: '#185D8E',
                                            border: 'solid',
                                            fontWeight: 'bold',
                                            backgroundColor: '#D9EEFF',
                                            padding: '0.7rem 1.05rem',
                                            borderRadius: '10px',
                                            boxShadow: '5px 5px 0px 1px #B9D4F8',
                                            width: '300px',
                                            transition: 'transform 0.8s ease',
                                            '&:hover': {
                                                backgroundColor: '#a7cae3',
                                                transform: 'scale(1.1)',
                                            } }}>
                                        {t('resultTestInstitutionsButton')}
                                    </Button>
                                </Box>
                            </CourseCard>
                        </Grid>
                    ))}
                </Grid>

                {/* Cursos recomendados para o perfil secundario */}
                <Box display="flex" justifyContent="flex-start" width="80%" marginBottom="2%" marginTop='6%'>
                    <ThemeProvider theme={componentTheme}>
                        <Typography variant="h5" style={{ fontWeight: 'bold', color: '#185D8E' }}
                            fontSize={isMobile ? '19px' : '25px'}
                            marginBottom={isMobile ? '5%' : '0'}
                            marginTop={isMobile ? '5%' : '0'}
                        >
                            {t('resultTestRecomendationTitle')} {i18n.language === 'en' ? previousResults?.perfis[1].descricaoIngles.toLowerCase() : previousResults?.perfis[1].descricao.toLowerCase()}
                        </Typography>
                    </ThemeProvider>
                </Box>

                <Grid container spacing={6}
                    style={{
                        maxWidth: '80%',
                        alignItems: 'center' }}
                    justifyContent="center">
                    {previousResults?.cursos.cursosPerfilSecundario.map((curso, index) => (
                        <Grid item lg={4} key={index}>
                            <CourseCard
                                style={{ display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between' }}>
                                <CardContent>
                                    <ThemeProvider theme={componentTheme}>
                                        <CourseTitle
                                            style={{
                                                fontSize: getFontSize(curso.descricao),
                                                color: '#185D8E',
                                                fontWeight: 'bold',
                                                marginBottom: '25px'
                                            }}>
                                            {curso.descricao}
                                        </CourseTitle>
                                    </ThemeProvider>

                                    <ThemeProvider theme={componentTheme}>
                                        <DetailsResult
                                            style={{
                                                fontSize: '18px',
                                                color: 'black',
                                                textAlign: 'left',
                                                marginBottom: '12px'
                                            }}>
                                            <strong
                                                style={{
                                                    fontSize: '20px',
                                                    fontWeight: 'bold',
                                                    color: 'black',
                                                    marginBottom: '17px'
                                                }}>
                                                <BookIcon style={{
                                                    width: '20px',
                                                    height: '20px',
                                                    marginRight: '8px',
                                                    color: '#185D8E'
                                                }}></BookIcon>
                                                {t('resultTestArea')}
                                            </strong> {curso.area}
                                        </DetailsResult>
                                        <DetailsResult
                                            style={{
                                                fontSize: '18px',
                                                color: 'black',
                                                textAlign: 'left',
                                                marginBottom: '12px'
                                            }}>
                                            <strong
                                                style={{
                                                    fontSize: '20px',
                                                    fontWeight: 'bold',
                                                    color: 'black'
                                                }}>
                                                <PaidIcon style={{
                                                    width: '20px',
                                                    height: '20px',
                                                    marginRight: '8px',
                                                    color: '#185D8E'
                                                }}></PaidIcon>
                                                {t('resultTestEmployability')}
                                            </strong> {formatString(curso.empregabilidade)}
                                        </DetailsResult>
                                        <DetailsResult
                                            style={{
                                                fontSize: '18px',
                                                color: 'black',
                                                textAlign: 'left',
                                                marginBottom: '10px'
                                            }}>
                                            <strong
                                                style={{
                                                    fontSize: '20px',
                                                    fontWeight: 'bold',
                                                    color: 'black'
                                                }}>
                                                <BusinessCenterIcon style={{
                                                    width: '20px',
                                                    height: '20px',
                                                    marginRight: '8px',
                                                    color: '#185D8E'
                                                }}></BusinessCenterIcon>
                                                {t('resultTestPossibleCareers')}
                                            </strong>
                                        </DetailsResult>

                                        <ScrollableList>
                                            <List>
                                                {curso.possiveisCarreiras.map((carreira, i) => (
                                                    <CareerListItem style={{
                                                        fontSize: '18px',
                                                        color: 'black',
                                                        textAlign: 'left',
                                                    }} key={i}>
                                                        <strong style={{
                                                            fontSize: '20px',
                                                            fontWeight: 'bold',
                                                            color: 'black',

                                                        }}> •<strong style={{fontWeight: 'normal', textAlign: 'left'}} > { formatString(carreira) }</strong></strong>
                                                    </CareerListItem>
                                                ))}
                                            </List>
                                        </ScrollableList>
                                    </ThemeProvider>

                                </CardContent>
                                <Box display="flex" justifyContent="center" marginTop="1rem">
                                    <Button onClick={() => handleOpenModal(curso.id, curso.descricao, curso.tipo)}
                                        sx={{
                                            color: '#185D8E',
                                            border: 'solid',
                                            fontWeight: 'bold',
                                            backgroundColor: '#D9EEFF',
                                            padding: '0.7rem 1.05rem',
                                            borderRadius: '10px',
                                            boxShadow: '5px 5px 0px 1px #B9D4F8',
                                            width: '300px',
                                            transition: 'transform 0.8s ease',
                                            '&:hover': {
                                                backgroundColor: '#a7cae3',
                                                transform: 'scale(1.1)',
                                            } }}>
                                        {t('resultTestInstitutionsButton')}
                                    </Button>
                                </Box>
                            </CourseCard>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            {/*Modal de instituições*/}
            <Modal open={openModal} onClose={handleCloseModal}>
                <ModalContent
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '80%',
                        maxWidth: '600px',
                        maxHeight: '60vh',
                        overflowY: 'auto',
                        bgcolor: 'background.paper',
                        borderRadius: '20px',
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <IconButton
                        onClick={handleCloseModal}
                        sx={{
                            position: 'absolute',
                            top: 15,
                            right: 15,
                            color: '#185D8E',
                        }}
                    >
                        <CloseIcon />
                    </IconButton>

                    <ThemeProvider theme={componentTheme}>
                        <Typography variant="h6" gutterBottom style={{textAlign: 'center', fontWeight: 'bold', color: '#185D8E', marginTop: '15px', marginBottom: '15px'}}>
                            {t('resultTestModalTitle')} {selectedCourse?.descricao}
                        </Typography>
                    </ThemeProvider>

                    <TextField
                        variant="outlined"
                        placeholder={t('resultTestModalField')}
                        fullWidth
                        style={{ marginBottom: '15px' }}
                        InputProps={{
                            endAdornment: (
                                <IconButton>
                                    <SearchIcon />
                                </IconButton>
                            ),
                        }}
                        value={searchTerm}
                        onChange={handleSearch}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                event.preventDefault();
                                handleEnterSearch();
                            }
                        }}
                    />
                    {institutions.length > 0 ? (
                        <List>
                            <ThemeProvider theme={componentTheme}>
                                {filteredInstitutions.map((inst) => (
                                    <ListItem key={inst.id}>
                                        <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                                            <Typography variant="body1" style={{ fontWeight: 'bold', color: '#185D8E' }}>
                                                {inst.nome}
                                                {selectedCourse?.tipo === 'SUPERIOR' && ` (${inst.sigla})` || selectedCourse?.tipo === 'TECNICO' && ' '}
                                            </Typography>
                                            <Typography variant="body2" style={{ marginLeft: '8px' }}>
                                                <strong>Site:</strong> {inst.site}
                                            </Typography>
                                            <Typography variant="body2" style={{ marginLeft: '8px' }}>
                                                <strong>{t('resultTestModalRatingMEC')}</strong> {inst.notaMec}
                                            </Typography>
                                        </div>
                                    </ListItem>
                                ))}
                            </ThemeProvider>

                        </List>
                    ) : (
                        <ThemeProvider theme={componentTheme}>
                            <Typography variant="body1" style={{textAlign: 'center', marginTop: '20px'}}>{t('resultTestZeroInstitutions')}</Typography>

                        </ThemeProvider>
                    )}
                </ModalContent>
            </Modal>
            <Footer/>
        </>
    );
};

export default ResultScreen;
