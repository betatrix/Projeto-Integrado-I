import React, { useState, useEffect } from 'react';
import {
    Typography,
    List,
    ListItem,
    ListItemText,
    TextField,
    Modal,
    Grid,
    Box,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Button,
    IconButton,
    InputAdornment,
    Card,
    CardContent,
    CardActions,
    Pagination,
    Tabs,
    Tab,
    ListItemIcon,
    Stack,
    Skeleton
} from '@mui/material';
import {
    BookOutlined,
    Circle,
    Close,
    FilterList,
    InfoOutlined,
    MapOutlined,
    PolicyOutlined
} from '@mui/icons-material';
import Footer from '../../../components/homeFooter';
import { Endereco, TipoInstituicaoCurso } from '../../../types/institutionTypes';
import {
    buscarEntidadesAtivas,
    buscarEntidadePorId,
    buscarCursosPorInstituicao,
    buscarPoliticasPorInstituicao
} from '../../../services/apiService';
import {
    clearFilterButton,
    searchButton,
    styledModal,
    styledInput,
    styledSelect,
    gridContainer,
    cardContent,
    cardTitle,
    cardText,
    searchBox,
    styledBox,
    tabContent,
    tabTitle,
    styledModalDetails,
    tabText,
    tabSubTitle1,
    tabSubTitle2,
    tabStyle,
    detailsButton,
} from './styles';
import { useTranslation } from 'react-i18next';
import CustomDrawer from '../../../components/sidemenu/CustomDrawer';
import StudentHeader from '../../../components/studentHeader';
import SearchIcon from '@mui/icons-material/Search';
import * as changeCase from 'change-case';
import { deburr } from 'lodash';

interface Curso {
    curso: {
        id: number;
        descricao: string;
    }
}

interface Politica {
    politica: {
        id: number;
        descricao: string;
        tipo: string;
    }
}
interface Institution {
    id: number;
    nome: string;
    ativo: boolean;
    formaIngresso: string;
    tipo: TipoInstituicaoCurso;
    sigla: string;
    notaMec: number;
    site: string;
    endereco: Endereco;
    cursos: Curso[];
    politicas: Politica[]
}

const brasilStates = [
    { sigla: 'AC', nome: 'Acre' },
    { sigla: 'AL', nome: 'Alagoas' },
    { sigla: 'AP', nome: 'Amapá' },
    { sigla: 'AM', nome: 'Amazonas' },
    { sigla: 'BA', nome: 'Bahia' },
    { sigla: 'CE', nome: 'Ceará' },
    { sigla: 'DF', nome: 'Distrito Federal' },
    { sigla: 'ES', nome: 'Espírito Santo' },
    { sigla: 'GO', nome: 'Goiás' },
    { sigla: 'MA', nome: 'Maranhão' },
    { sigla: 'MT', nome: 'Mato Grosso' },
    { sigla: 'MS', nome: 'Mato Grosso do Sul' },
    { sigla: 'MG', nome: 'Minas Gerais' },
    { sigla: 'PA', nome: 'Pará' },
    { sigla: 'PB', nome: 'Paraíba' },
    { sigla: 'PR', nome: 'Paraná' },
    { sigla: 'PE', nome: 'Pernambuco' },
    { sigla: 'PI', nome: 'Piauí' },
    { sigla: 'RJ', nome: 'Rio de Janeiro' },
    { sigla: 'RN', nome: 'Rio Grande do Norte' },
    { sigla: 'RS', nome: 'Rio Grande do Sul' },
    { sigla: 'RO', nome: 'Rondônia' },
    { sigla: 'RR', nome: 'Roraima' },
    { sigla: 'SC', nome: 'Santa Catarina' },
    { sigla: 'SP', nome: 'São Paulo' },
    { sigla: 'SE', nome: 'Sergipe' },
    { sigla: 'TO', nome: 'Tocantins' },
];

const entryMethods = [
    { description: 'SISU e ENEM' },
    { description: 'SISU e PAS' },
    { description: 'SISU e PAVE' },
    { description: 'SISU e Pism' },
    { description: 'SISU e Prosel' },
    { description: 'SISU e PSC' },
    { description: 'SISU e PSVO' },
    { description: 'SISU e Vagas Olímpicas' },
    { description: 'SISU e Vestibular próprio' },
    { description: 'SISU, ENEM e Vestibular próprio' },
    { description: 'SISU, PAS e Vestibular próprio' },
    { description: 'SISU, Vestibular próprio e PASSE' },
    { description: 'SISU, Vestibular próprio e PSS' },
    { description: 'SISU, Vestibular próprio, PSEnem e PSAC' },
    { description: 'SISU' },
    { description: 'Vestibular próprio e PSS' },
    { description: 'Vestibular próprio' },
    { description: 'Vestibulinho' },
];

const InstitutionList: React.FC = () => {
    const { t } = useTranslation();
    const [institutions, setInstitutions] = useState<Institution[]>([]);
    const [searchValue, setSearchValue] = useState<string>('');
    const [notaMecValue, setNotaMecValue] = useState<number | null>(null);
    const [formaIngressoValue, setFormaIngressoValue] = useState<string>('');
    const [tipoInstituicaoValue, setTipoInstituicaoValue] = useState<TipoInstituicaoCurso | ''>('');
    const [estadoValue, setEstadoValue] = useState<string>('');
    const [cursoValue, setCursoValue] = useState<string>('');
    const [filterModalOpen, setFilterModalOpen] = useState(false);
    const [detailModalOpen, setDetailModalOpen] = useState(false);
    const [selectedInstitution, setSelectedInstitution] = useState<Institution | null>(null);
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    // Função para buscar todos os detalhes de uma instituição
    const fetchInstitutionDetails = async (institutionId: number) => {
        try {
            const institutionDetails = await buscarEntidadePorId('instituicao', institutionId);
            return institutionDetails;
        } catch (error) {
            console.error('Erro ao buscar detalhes da instituição');
            throw error;
        }
    };

    // Ao carregar a página, busca as instituições e seus detalhes
    useEffect(() => {
        const fetchInstitutions = async () => {
            setLoading(true);
            try {
                const institutionList = await buscarEntidadesAtivas('instituicao');

                const institutionsWithDetails = await Promise.all(
                    institutionList.map(async (institution: { id: number; }) => {
                        const institutionDetails = await fetchInstitutionDetails(institution.id);
                        const institutionCourses = await buscarCursosPorInstituicao(institution.id);
                        return { ...institutionDetails, cursos: institutionCourses };
                    })
                );

                console.log(institutionsWithDetails);

                setInstitutions(institutionsWithDetails);
            } catch (error) {
                console.error('Erro ao buscar instituições');
                throw error;
            }
            finally{
                setLoading(false);
            }
        };
        fetchInstitutions();
    }, []);

    // Função de filtro
    const filteredInstitutions = institutions.filter(institution => {
        const matchesSearchValue = deburr(institution.nome ?? '')
            .toLowerCase().includes(deburr(searchValue.toLowerCase())) || institution.sigla?.toLowerCase().includes(searchValue.toLowerCase());
        const matchesNotaMec = notaMecValue === null || institution.notaMec === notaMecValue;
        const matchesFormaIngresso = formaIngressoValue === '' || institution.formaIngresso?.toLowerCase().includes(formaIngressoValue.toLowerCase());
        const matchesTipo = tipoInstituicaoValue === '' || institution.tipo === tipoInstituicaoValue;
        const matchesEstado = estadoValue === '' || (institution.endereco?.estado && institution.endereco.estado.toUpperCase() === estadoValue.toUpperCase());
        const matchesCurso = cursoValue === '' || Array.isArray(institution.cursos) && institution.cursos.some(cursoInstituicao =>
            deburr(cursoInstituicao.curso.descricao).toLowerCase().includes(deburr(cursoValue.toLowerCase()))
        );

        return matchesSearchValue && matchesNotaMec && matchesFormaIngresso && matchesTipo && matchesEstado && matchesCurso;
    });

    // Funções para abrir/fechar o modal de filtros
    const handleFilterModalOpen = () => setFilterModalOpen(true);
    const handleFilterModalClose = () => setFilterModalOpen(false);

    // Estados temporários para os filtros no modal
    const [tempNotaMecValue, setTempNotaMecValue] = useState<number | null>(null);
    const [tempFormaIngressoValue, setTempFormaIngressoValue] = useState<string>('');
    const [tempTipoInstituicaoValue, setTempTipoInstituicaoValue] = useState<TipoInstituicaoCurso | ''>('');
    const [tempEstadoValue, setTempEstadoValue] = useState<string>('');
    const [tempCursoValue, setTempCursoValue] = useState<string>('');

    const handleApplyFilters = () => {
        setNotaMecValue(tempNotaMecValue);
        setFormaIngressoValue(tempFormaIngressoValue);
        setTipoInstituicaoValue(tempTipoInstituicaoValue);
        setEstadoValue(tempEstadoValue);
        setCursoValue(tempCursoValue);
        setCurrentPage(1);
        handleFilterModalClose();
    };

    // --------------------- Função para limpar os filtros ----------------------------
    const handleClearFilters = () => {
        setNotaMecValue(null);
        setFormaIngressoValue('');
        setTipoInstituicaoValue('');
        setEstadoValue('');
        setCursoValue('');

        setTempNotaMecValue(null);
        setTempFormaIngressoValue('');
        setTempTipoInstituicaoValue('');
        setTempEstadoValue('');
        setTempCursoValue('');
        handleFilterModalClose();
    };

    const handleDetailModalOpen = async (institution: Institution) => {
        try {
            const institutionDetails = await buscarEntidadePorId('instituicao', institution.id);
            const institutionCourses = await buscarCursosPorInstituicao(institution.id);
            const institutionPolicies = await buscarPoliticasPorInstituicao(institution.id);
            setSelectedInstitution({ ...institutionDetails, cursos: institutionCourses, politicas: institutionPolicies });
            setDetailModalOpen(true);
        } catch (error) {
            console.error('Erro ao obter detalhes da instituição');
            throw error;
        }
    };

    const handleDetailModalClose = () => {
        setDetailModalOpen(false);
        setSelectedInstitution(null);
    };

    const [activeTab, setActiveTab] = useState(0);
    const handleTabChange = (_event: unknown, newValue: React.SetStateAction<number>) => {
        setActiveTab(newValue);
    };

    // ---------------------------- Paginação dos cards ----------------------------
    const [currentPage, setCurrentPage] = useState(1);
    const [institutionsPerPage, setInstitutionsPerPage] = useState(6);

    useEffect(() => {
        const updateInstitutionsPerPage = () => {
            if (window.innerWidth < 600) {
                setInstitutionsPerPage(4);
            } else {
                setInstitutionsPerPage(6);
            }
        };

        updateInstitutionsPerPage();
        window.addEventListener('resize', updateInstitutionsPerPage);

        return () => {
            window.removeEventListener('resize', updateInstitutionsPerPage);
        };
    }, []);

    // Calcular índices de paginação
    const indexOfLastInstitution = currentPage * institutionsPerPage;
    const indexOfFirstInstitution = indexOfLastInstitution - institutionsPerPage;
    const currentInstitutions = filteredInstitutions.slice(indexOfFirstInstitution, indexOfLastInstitution);
    const totalPages = Math.ceil(filteredInstitutions.length / institutionsPerPage);

    // Funções de navegação
    const handleChangePage = (_event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };

    return (
        <>
            <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: 'white', minHeight: '100vh' }}>
                <CustomDrawer open={open} handleDrawerOpen={handleDrawerOpen} handleDrawerClose={handleDrawerClose} />
                <StudentHeader />
                <Box sx={styledBox}>
                    <Typography sx={{
                        fontFamily: 'Poppins, sans-serif',
                        fontWeight: 800,
                        fontSize: '2.4rem',
                        color: '#1b1f27',
                        margin: '6rem 0rem 0rem 18.5rem',
                        '@media (max-width: 1200px)': {
                            fontSize: '2rem',
                            margin: '4rem 0rem 0rem 6rem',
                        },
                        '@media (max-width: 900px)': {
                            fontSize: '2rem',
                            margin: '4rem 0rem 0rem 5rem',
                        },
                        '@media (max-width: 600px)': {
                            fontSize: '2rem',
                            margin: '4rem 0rem 0rem 0rem',
                        },
                    }}>
                        {t('institutionTitle')}
                    </Typography>
                    <Box sx={searchBox}>
                        <TextField
                            id='institutionTitleSearch'
                            label={t('institutionTitleSearch')}
                            variant='outlined'
                            onChange={(e) => setSearchValue(e.target.value)}
                            sx={{width:'100%'}}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Button onClick={handleFilterModalOpen}>
                            <FilterList sx={{ color: '#185D8E' }} />
                            <Typography
                                variant="h6"
                                sx={{
                                    color: '#185D8E',
                                    fontWeight: '500',
                                    marginLeft: '0.5rem',
                                    fontFamily: 'Poppins, sans-serif'
                                }}>
                                {t('institutionFilterTitle1')}
                            </Typography>
                        </Button>
                    </Box>

                    {/* Modal de Filtros */}
                    <Modal
                        open={filterModalOpen}
                        onClose={handleFilterModalClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={styledModal}>
                            <IconButton
                                aria-label="close"
                                onClick={handleFilterModalClose}
                                sx={{
                                    position: 'absolute',
                                    top: 8,
                                    right: 8,
                                    color: '#0B2A40',
                                }}
                            >
                                <Close />
                            </IconButton>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sx={{marginTop: 4}}>
                                    <Typography variant="h5" sx={cardTitle}>{t('institutionFilterTitle2')}</Typography>
                                    <TextField
                                        label={t('institutionFilter1')}
                                        type="number"
                                        fullWidth
                                        variant='outlined'
                                        sx={styledInput}
                                        value={tempNotaMecValue || ''}
                                        onChange={(e) => setTempNotaMecValue(e.target.value ? Math.min(Math.max(parseFloat(e.target.value), 1), 6) : null)}
                                        inputProps={{
                                            min: 1,
                                            max: 6,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label={t('institutionFilter2')}
                                        fullWidth
                                        variant='outlined'
                                        sx={styledInput}
                                        value={tempCursoValue || ''}
                                        onChange={(e) => setTempCursoValue(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl variant='outlined' sx={styledSelect} fullWidth>
                                        <InputLabel
                                            sx={{
                                                color: '#185D8E',
                                                fontWeight: '600',
                                                fontFamily: 'Poppins, sans-serif'
                                            }}
                                        >
                                            {t('institutionFilter3')}
                                        </InputLabel>
                                        <Select
                                            value={tempFormaIngressoValue}
                                            onChange={(e) => setTempFormaIngressoValue(e.target.value)}
                                        >
                                            <MenuItem value={''}>Todos</MenuItem>
                                            {entryMethods.map(i => (
                                                <MenuItem key={i.description} value={i.description}>{i.description}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl variant='outlined' sx={styledSelect} fullWidth>
                                        <InputLabel
                                            sx={{
                                                color: '#185D8E',
                                                fontWeight: '600',
                                                fontFamily: 'Poppins, sans-serif'
                                            }}
                                        >
                                            {t('institutionFilter4')}
                                        </InputLabel>
                                        <Select
                                            value={tempTipoInstituicaoValue}
                                            onChange={(e) => setTempTipoInstituicaoValue(e.target.value as TipoInstituicaoCurso)}
                                        >
                                            <MenuItem value={''}>Todos</MenuItem>
                                            <MenuItem value={TipoInstituicaoCurso.SUPERIOR}>Superior</MenuItem>
                                            <MenuItem value={TipoInstituicaoCurso.TECNICO}>Técnico</MenuItem>
                                            <MenuItem value={TipoInstituicaoCurso.AMBOS}>Ambos</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl variant='outlined' sx={styledSelect} fullWidth>
                                        <InputLabel
                                            sx={{
                                                color: '#185D8E',
                                                fontWeight: '600',
                                                fontFamily: 'Poppins, sans-serif'
                                            }}
                                        >
                                            {t('institutionFilter5')}
                                        </InputLabel>
                                        <Select
                                            value={tempEstadoValue}
                                            onChange={(e) => setTempEstadoValue(e.target.value)}
                                        >
                                            <MenuItem value={''}>Todos</MenuItem>
                                            {brasilStates.map(estado => (
                                                <MenuItem key={estado.sigla} value={estado.sigla}>{estado.nome}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between'
                                    }}
                                >
                                    <Button sx={clearFilterButton} onClick={handleClearFilters}>{t('institutionFilterClean')}</Button>
                                    <Button sx={searchButton} onClick={handleApplyFilters}>{t('institutionFilterSearch')}</Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Modal>
                </Box>

                {/* Cards Instituições */}
                {loading ? (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            mt: 5
                        }}
                    >
                        <Box sx={gridContainer}>
                            <Grid container spacing={4}>
                                <Grid item xs={12} sm={12} md={6}>
                                    <Skeleton
                                        variant="rectangular"
                                        sx={{
                                            borderRadius: '14px',
                                            width: '600px',
                                            height:'290px',
                                            '@media (max-width: 1700px)': {
                                                width: '450px',
                                                height:'290px',
                                            },
                                            '@media (max-width: 600px)': {
                                                width: '360px',
                                                height:'400px',
                                            }
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={6}>
                                    <Skeleton
                                        variant="rectangular"
                                        sx={{
                                            borderRadius: '14px',
                                            width: '600px',
                                            height:'290px',
                                            '@media (max-width: 1700px)': {
                                                width: '450px',
                                                height:'290px',
                                            },
                                            '@media (max-width: 600px)': {
                                                width: '360px',
                                                height:'400px',
                                            }
                                        }}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={4} sx={{ marginTop: '1rem' }}>
                                <Grid item xs={12} sm={12} md={6}>
                                    <Skeleton
                                        variant="rectangular"
                                        sx={{
                                            borderRadius: '14px',
                                            width: '600px',
                                            height:'290px',
                                            '@media (max-width: 1700px)': {
                                                width: '450px',
                                                height:'290px',
                                            },
                                            '@media (max-width: 600px)': {
                                                width: '360px',
                                                height:'400px',
                                            }
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={6}>
                                    <Skeleton
                                        variant="rectangular"
                                        sx={{
                                            borderRadius: '14px',
                                            width: '600px',
                                            height:'290px',
                                            '@media (max-width: 1700px)': {
                                                width: '450px',
                                                height:'290px',
                                            },
                                            '@media (max-width: 600px)': {
                                                width: '360px',
                                                height:'400px',
                                            }
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                ) : (
                    <Box sx={gridContainer}>
                        <Grid container spacing={4}>
                            {currentInstitutions.length === 0 ? (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        width: '100%',
                                        height: '100%',
                                        textAlign: 'center',
                                        padding: 4,
                                    }}
                                >
                                    <Typography variant="body2" color="textSecondary">
                                        Não há instituições disponíveis com esse filtro.
                                    </Typography>
                                </Box>
                            ) : (
                                currentInstitutions.map((institution) => (
                                    <Grid item xs={12} sm={12} md={6} key={institution.id}>
                                        <Card sx={cardContent}>
                                            <CardContent>
                                                <Typography variant="h5" sx={cardTitle}>
                                                    {institution.nome ? changeCase.capitalCase(institution.nome) : 'Nome não disponível'}
                                                </Typography>
                                                <Typography variant="body2" sx={cardText}>
                                                    <b>{t('institutionCardSigla')}:</b> {institution.sigla || 'Não disponível'}
                                                </Typography>
                                                <Typography variant="body2" sx={cardText}>
                                                    <b>{t('institutionCardSite')}:</b> {institution.site || 'Não disponível'}
                                                </Typography>
                                                <Typography variant="body2" sx={cardText}>
                                                    <b>{t('institutionCardNota')}:</b> {institution.notaMec || 'Não disponível'}
                                                </Typography>
                                                <Typography variant="body2" sx={cardText}>
                                                    <b>{t('institutionCardTipo')}:</b> {institution.tipo ? changeCase.capitalCase(institution.tipo) : 'Não disponível'}
                                                </Typography>
                                                <Typography variant="body2" sx={cardText}>
                                                    <b>{t('institutionCardIngresso')}:</b> {institution.formaIngresso || 'Não disponível'}
                                                </Typography>
                                            </CardContent>
                                            <CardActions
                                                sx={{
                                                    justifyContent: 'flex-end'
                                                }}
                                            >
                                                <Button sx={detailsButton} onClick={() => handleDetailModalOpen(institution)}>{t('institutionFilterDetails')}</Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                ))
                            )}
                        </Grid>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                marginTop: 7
                            }}
                        >
                            <Pagination
                                count={totalPages}
                                page={currentPage}
                                onChange={handleChangePage}
                                sx={{
                                    '& .MuiPaginationItem-root': {
                                        color: '#0B2A40',
                                    },
                                    '& .Mui-selected': {
                                        backgroundColor: '#0B2A40',
                                        color: '#FFFFFF'
                                    },
                                    '& .MuiPaginationItem-root.Mui-selected:hover': {
                                        backgroundColor: '#A4BFD2',
                                    },
                                    '& .MuiPaginationItem-root:hover': {
                                        backgroundColor: '#E0E9F0',
                                    },
                                    '@media (max-width: 600px)': {
                                        '& .MuiPaginationItem-root': {
                                            margin: '0 2px',
                                            fontSize: '0.75rem',
                                        },
                                    },
                                }}
                            />
                        </Box>
                    </Box>
                )}

                {/* Details Modal */}
                <Modal
                    open={detailModalOpen}
                    onClose={handleDetailModalClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={styledModalDetails}>
                        <IconButton
                            aria-label="close"
                            onClick={handleDetailModalClose}
                            sx={{
                                position: 'absolute',
                                top: 8,
                                right: 8,
                                color: '#0B2A40',
                            }}
                        >
                            <Close fontSize="large" />
                        </IconButton>
                        <Typography variant="h6" sx={tabTitle}>{selectedInstitution?.nome}</Typography>
                        <Box sx={tabContent}>
                            <Tabs
                                value={activeTab}
                                onChange={handleTabChange}
                                centered
                                variant="scrollable"
                                scrollButtons
                                allowScrollButtonsMobile
                                sx={{
                                    '@media (min-width: 900px)': {
                                        padding: '0rem 3rem',
                                    },
                                    '& .MuiTabs-indicator': {
                                        backgroundColor: '#0B2A40',
                                        height: '4px',
                                    },
                                    borderBottom: '2px solid #6B9ABC',
                                    '@media (max-width: 600px)': {
                                        '& .MuiTabs-scrollButtons': {
                                            display: 'block', // Exibe os botões de rolagem no mobile
                                        },
                                    },
                                    '@media (min-width: 601px)': {
                                        '& .MuiTabs-scrollButtons': {
                                            display: 'none', // Esconde os botões de rolagem em telas maiores
                                        },
                                    },
                                }}
                            >
                                <Tab sx={tabStyle} label={t('institutionCardInformacoes')} />
                                <Tab sx={tabStyle} label={t('institutionCardCursos')} />
                                <Tab sx={tabStyle} label={t('institutionCardPoliticas')} />
                            </Tabs>

                            {selectedInstitution && (
                                <Box sx={{ marginTop: '2rem', alignItems: 'center' }}>

                                    {/* Dados Gerais */}
                                    {activeTab === 0 && (
                                        <Grid
                                            container
                                            spacing={3}
                                            sx={{ margin: '0rem 0.5rem' }}
                                        >
                                            <Grid item xs={12} sm={6}>
                                                <Stack direction="row" alignItems="center" spacing={1}>
                                                    <InfoOutlined fontSize="small" sx={{ color: '#0B2A40' }} />
                                                    <Typography variant="subtitle1" sx={tabSubTitle1} gutterBottom>{t('institutionCardDados')}</Typography>
                                                </Stack>
                                                <Box
                                                    sx={{
                                                        margin: '0.5rem 2rem',
                                                        '@media (max-width: 600px)': {
                                                            margin: '0.2rem 0rem',
                                                        },
                                                    }}>
                                                    <Typography variant="body2" sx={tabText}>
                                                        <b>{t('institutionCardSigla')}:</b> {selectedInstitution.sigla}
                                                    </Typography>
                                                    <Typography variant="body2" sx={tabText}><b>{t('institutionCardSite')}:
                                                    </b> {selectedInstitution.site || 'Não disponível'}
                                                    </Typography>
                                                    <Typography variant="body2" sx={tabText}>
                                                        <b>{t('institutionCardNota')}:</b> {selectedInstitution.notaMec || 'Não disponível'}
                                                    </Typography>
                                                    <Typography variant="body2" sx={tabText}>
                                                        <b>{t('institutionCardTipo')}:</b> {selectedInstitution.tipo
                                                            ? changeCase.capitalCase(selectedInstitution.tipo) : 'Não disponível'}
                                                    </Typography>
                                                    <Typography variant="body2" sx={tabText}>
                                                        <b>{t('institutionCardIngresso')}:</b> {selectedInstitution.formaIngresso || 'Não disponível'}
                                                    </Typography>
                                                </Box>
                                            </Grid>

                                            <Grid item xs={12} sm={6}>
                                                <Stack direction="row" alignItems="center" spacing={1}>
                                                    <MapOutlined fontSize="small" sx={{ color: '#0B2A40' }} />
                                                    <Typography variant="subtitle1" sx={tabSubTitle1} gutterBottom>{t('institutionCardEndereco')}</Typography>
                                                </Stack>
                                                <Box
                                                    sx={{
                                                        margin: '0.5rem 2rem',
                                                        '@media (max-width: 600px)': {
                                                            margin: '0.2rem 0rem',
                                                            maxHeight: 400,
                                                        },
                                                    }}>
                                                    <Typography variant="body2" sx={tabText}>
                                                        <b>{t('institutionCardRua')}:</b> {selectedInstitution.endereco?.logradouro || 'Não disponível'}
                                                    </Typography>
                                                    <Typography variant="body2" sx={tabText}>
                                                        <b>{t('institutionCardNumero')}:</b> {selectedInstitution.endereco?.numero || 'Não disponível'}
                                                    </Typography>
                                                    <Typography variant="body2" sx={tabText}>
                                                        <b>{t('institutionCardCidade')}:</b> {selectedInstitution.endereco?.cidade || 'Não disponível'}
                                                    </Typography>
                                                    <Typography variant="body2" sx={tabText}>
                                                        <b>{t('institutionCardEstado')}:</b> {selectedInstitution.endereco?.estado || 'Não disponível'}
                                                    </Typography>
                                                    <Typography variant="body2" sx={tabText}>
                                                        <b>{t('institutionCardCep')}:</b> {selectedInstitution.endereco?.cep || 'Não disponível'}
                                                    </Typography>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    )}

                                    {/* Cursos */}
                                    {activeTab === 1 && (
                                        <Grid container>
                                            <Grid item xs={12}>
                                                <Stack direction="row" alignItems="center" spacing={1}>
                                                    <BookOutlined fontSize="small" sx={{color: '#0B2A40'}} />
                                                    <Typography variant="subtitle1" sx={tabSubTitle1} gutterBottom>{t('institutionCardCursos')}</Typography>
                                                </Stack>
                                                <Grid
                                                    container
                                                    columns={{
                                                        xs: 1,
                                                        sm: 2,
                                                        md: 2,
                                                        lg: 2
                                                    }}
                                                    sx={{
                                                        maxHeight: 300,
                                                        overflow: 'auto',
                                                        margin:'0.5rem 1rem',
                                                        '@media (max-width: 600px)': {
                                                            margin: '0.2rem 0rem',
                                                            maxHeight: 390,
                                                        },
                                                    }}
                                                >
                                                    {selectedInstitution.cursos?.length > 0 ? (
                                                        selectedInstitution.cursos.map((cursoInstituicao) => (
                                                            <Grid item xs={0.9} key={cursoInstituicao.curso.id}>
                                                                <List disablePadding>
                                                                    <ListItem alignItems="flex-start">
                                                                        <ListItemIcon sx={{ minWidth: '24px', marginTop: '0.7rem' }}>
                                                                            <Circle sx={{ fontSize: '7px', color: '#185D8E' }} />
                                                                        </ListItemIcon>
                                                                        <ListItemText sx={tabText} primary={cursoInstituicao.curso.descricao} />
                                                                    </ListItem>
                                                                </List>
                                                            </Grid>
                                                        ))
                                                    ) : (
                                                        <Typography variant="body2" color="textSecondary">
                                                            {t('institutionCardCursosError')}
                                                        </Typography>
                                                    )}
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    )}

                                    {/* Políticas Públicas  */}
                                    {activeTab === 2 && (
                                        <Grid container spacing={3}>
                                            <Grid item xs={12}>
                                                <Stack direction="row" alignItems="center" spacing={1}>
                                                    <PolicyOutlined fontSize="small" sx={{color: '#0B2A40'}} />
                                                    <Typography variant="subtitle1" sx={tabSubTitle1} gutterBottom>{t('institutionCardPoliticas')}</Typography>
                                                </Stack>
                                            </Grid>
                                            <Grid
                                                container
                                                sx={{
                                                    margin:'0.5rem 2rem',
                                                    gap: '3rem',
                                                    '@media (max-width: 600px)': {
                                                        margin: '0.3rem 0rem 0rem 2rem',
                                                        gap: '2rem',
                                                        maxHeight: 400,
                                                        overflow: 'auto',
                                                    },
                                                }}
                                            >
                                                <Grid item xs={12} sm={6} md={7} lg={7}>
                                                    <Typography variant="subtitle1" sx={tabSubTitle2} gutterBottom>{t('institutionCardPoliticasEntrada')}</Typography>
                                                    <List
                                                        sx={{
                                                            maxHeight: 270,
                                                            overflow: 'auto',
                                                            '@media (max-width: 600px)': {
                                                                maxHeight: 180,
                                                            }
                                                        }}
                                                    >
                                                        {selectedInstitution.politicas?.filter((politicaInstituicao) =>
                                                            politicaInstituicao.politica.tipo === 'POLITICA_ENTRADA').length > 0 ? (
                                                                selectedInstitution.politicas
                                                                    .filter((politicaInstituicao) => politicaInstituicao.politica.tipo === 'POLITICA_ENTRADA')
                                                                    .map((politicaInstituicao) => (
                                                                        <ListItem key={politicaInstituicao.politica.id} alignItems="flex-start">
                                                                            <ListItemIcon
                                                                                sx={{
                                                                                    minWidth: '24px',
                                                                                    marginTop: '0.8rem'
                                                                                }}
                                                                            >
                                                                                <Circle
                                                                                    sx={{
                                                                                        fontSize:'7px',
                                                                                        color:'#185D8E'
                                                                                    }}
                                                                                />
                                                                            </ListItemIcon>
                                                                            <ListItemText sx={tabText} primary={politicaInstituicao.politica.descricao} />
                                                                        </ListItem>
                                                                    ))
                                                            ) : (
                                                                <Typography variant="body2" color="textSecondary">
                                                                    {t('institutionCardPoliticasError')}
                                                                </Typography>
                                                            )}
                                                    </List>
                                                </Grid>
                                                <Grid item xs={12} sm={5} md={4} lg={4}>
                                                    <Typography variant="subtitle1" sx={tabSubTitle2} gutterBottom>{t('institutionCardPoliticasPermanencia')}</Typography>
                                                    <List
                                                        sx={{
                                                            maxHeight: 270,
                                                            overflow: 'auto',
                                                            '@media (max-width: 600px)': {
                                                                maxHeight: 180,
                                                            }
                                                        }}
                                                    >
                                                        {selectedInstitution.politicas?.filter((politicaInstituicao) =>
                                                            politicaInstituicao.politica.tipo === 'POLITICA_PERMANENCIA').length > 0 ? (
                                                                selectedInstitution.politicas
                                                                    .filter((politicaInstituicao) => politicaInstituicao.politica.tipo === 'POLITICA_PERMANENCIA')
                                                                    .map((politicaInstituicao) => (
                                                                        <ListItem key={politicaInstituicao.politica.id}>
                                                                            <ListItemIcon sx={{ minWidth: '24px'}}>
                                                                                <Circle sx={{fontSize:'7px', color:'#185D8E'}}/>
                                                                            </ListItemIcon>
                                                                            <ListItemText sx={tabText} primary={politicaInstituicao.politica.descricao} />
                                                                        </ListItem>
                                                                    ))
                                                            ) : (
                                                                <Typography variant="body2" color="textSecondary">
                                                                    {t('institutionCardPoliticasError')}
                                                                </Typography>
                                                            )}
                                                    </List>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    )}
                                </Box>
                            )}

                        </Box>
                    </Box>
                </Modal>
            </Box>
            <Footer />
        </>
    );
};

export default InstitutionList;
