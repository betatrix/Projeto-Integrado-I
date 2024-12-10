import React, { useEffect, useState } from 'react';
import { Box,
    Button,
    Card,
    CardContent,
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    Modal,
    Pagination,
    Select,
    Skeleton,
    TextField,
    Typography
} from '@mui/material';
import Footer from '../../../components/homeFooter';
import StudentHeader from '../../../components/studentHeader';
import CustomDrawer from '../../../components/sidemenu/CustomDrawer';
import {
    Close,
    FilterList
} from '@mui/icons-material';
import {
    styledBox,
    searchBox,
    clearFilterButton,
    searchButton,
    styledModal,
    cardText,
    cardTitle,
    gridContainer,
    styledSelect,
    cardCourseContent,
} from './styles';
import SearchIcon from '@mui/icons-material/Search';
import { TipoInstituicaoCurso } from '../../../types/institutionTypes';
import { buscarEntidadePorId, buscarEntidadesAtivas } from '../../../services/apiService';
import { NivelEmpregabilidade } from '../../../types/courseTypes';
import * as changeCase from 'change-case';
import { useTranslation } from 'react-i18next';
import { deburr } from 'lodash';

interface Course {
    id: number;
    descricao: string;
    empregabilidade: NivelEmpregabilidade;
    possiveisCarreiras: string;
    tipo: TipoInstituicaoCurso;
    area: string;
    perfil: string;
}

const areaCourses = [
    { name: 'Artes' },
    { name: 'Ciências Agrárias' },
    { name: 'Ciências Biológicas' },
    { name: 'Ciências da Saúde' },
    { name: 'Ciências Exatas' },
    { name: 'Ciências Humanas' },
    { name: 'Ciências Naturais' },
    { name: 'Ciências Sociais' },
    { name: 'Engenharia' },
    { name: 'Letras' },
    { name: 'Linguística' },
    { name: 'Tecnologia' },
];

const perfilCourses = [
    { description: 'Artistico' },
    { description: 'Convencional' },
    { description: 'Empreendedor' },
    { description: 'Investigativo' },
    { description: 'Realista' },
    { description: 'Social' },
];

const CourseList: React.FC = () => {
    const { t } = useTranslation();
    const [courses, setCourses] = useState<Course[]>([]);
    const [searchValue, setSearchValue] = useState<string>('');
    const [empregabilidadeValue, setEmpregabilidadeValue] = useState<NivelEmpregabilidade | ''>('');
    const [possiveisCarreirasValue, setPossiveisCarreirasValue] = useState<string>('');
    const [tipoValue, setTipoValue] = useState<TipoInstituicaoCurso | ''>('');
    const [areaValue, setAreaValue] = useState<string>('');
    const [perfilValue, setPerfilValue] = useState<string>('');
    const [filterModalOpen, setFilterModalOpen] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    // Função para buscar todos os detalhes de um curso
    const fetchCourseDetails = async (cursoId: number) => {
        try {
            const cursoDetails = await buscarEntidadePorId('curso', cursoId);
            return cursoDetails;
        } catch (error) {
            console.error('Erro ao buscar detalhes do curso');
            throw error;
            return null;
        }
    };

    // Ao carregar a página, busca as instituições e seus detalhes
    useEffect(() => {
        const fetchCourses = async () => {
            setLoading(true);
            try {
                const courseList = await buscarEntidadesAtivas('curso');

                const coursesWithDetails = await Promise.all(
                    courseList.map(async (course: { id: number; }) => {
                        const courseDetails = await fetchCourseDetails(course.id);
                        return { ...courseDetails};
                    })
                );

                // Ordena os cursos em ordem alfabética pela descrição
                const sortedCourses = coursesWithDetails.sort((a, b) => {
                    const descricaoA = a.descricao?.toLowerCase() || '';
                    const descricaoB = b.descricao?.toLowerCase() || '';
                    return descricaoA.localeCompare(descricaoB);
                });

                setCourses(sortedCourses);
            } catch (error) {
                console.error('Erro ao buscar instituições');
                throw error;
            }
            finally{
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

    // Função de filtro
    const filteredCourses = courses.filter(course => {
        const matchesSearchValue = deburr(course.descricao ?? '').toLowerCase().includes(deburr(searchValue).toLowerCase());
        const matchesEmpregabilidade = empregabilidadeValue === '' ||course.empregabilidade.toLowerCase().includes(empregabilidadeValue.toLowerCase());
        const matchesPossiveisCarreiras = possiveisCarreirasValue === '' || course.possiveisCarreiras?.toLowerCase().includes(possiveisCarreirasValue.toLowerCase());
        const matchesTipo = tipoValue === '' || course.tipo === tipoValue;
        const matchesArea = areaValue === '' || (course.area && course.area.toLowerCase() === areaValue.toLowerCase());
        const matchesPerfil = perfilValue === '' || (course.perfil) && course.perfil.toLowerCase().includes(perfilValue.toLowerCase());

        return matchesSearchValue && matchesEmpregabilidade && matchesPossiveisCarreiras && matchesTipo && matchesArea && matchesPerfil;
    });

    // Funções para abrir/fechar o modal de filtros
    const handleFilterModalOpen = () => setFilterModalOpen(true);
    const handleFilterModalClose = () => setFilterModalOpen(false);

    // Estados temporários para os filtros no modal
    const [tempEmpregabilidadeValue, setTempEmpregabilidadeValue] = useState<NivelEmpregabilidade | ''>('');
    const [tempPossiveisCarreirasValue, setTempPossiveisCarreirasValue] = useState<string>('');
    const [tempTipoValue, setTempTipoValue] = useState<TipoInstituicaoCurso | ''>('');
    const [tempAreaValue, setTempAreaValue] = useState<string>('');
    const [tempPerfilValue, setTempPerfilValue] = useState<string>('');

    const handleApplyFilters = () => {
        setEmpregabilidadeValue(tempEmpregabilidadeValue);
        setPossiveisCarreirasValue(tempPossiveisCarreirasValue);
        setTipoValue(tempTipoValue);
        setAreaValue(tempAreaValue);
        setPerfilValue(tempPerfilValue);
        setCurrentPage(1);
        handleFilterModalClose();
    };

    // --------------------- Função para limpar os filtros ----------------------------
    const handleClearFilters = () => {
        setEmpregabilidadeValue('');
        setPossiveisCarreirasValue('');
        setTipoValue('');
        setAreaValue('');
        setPerfilValue('');

        setTempEmpregabilidadeValue('');
        setTempPossiveisCarreirasValue('');
        setTempTipoValue('');
        setTempAreaValue('');
        setTempPerfilValue('');
        handleFilterModalClose();
    };

    // ---------------------------- Paginação dos cards ----------------------------
    const [currentPage, setCurrentPage] = useState(1);
    const [coursesPerPage, setCoursesPerPage] = useState(6);

    useEffect(() => {
        const updateCoursesPerPage = () => {
            if (window.innerWidth < 600) {
                setCoursesPerPage(4);
            } else {
                setCoursesPerPage(6);
            }
        };

        updateCoursesPerPage();
        window.addEventListener('resize', updateCoursesPerPage);

        return () => {
            window.removeEventListener('resize', updateCoursesPerPage);
        };
    }, []);

    // Calcular índices de paginação
    const indexOfLastCourse = currentPage * coursesPerPage;
    const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
    const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);
    const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

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
                        {t('courseTitle')}
                    </Typography>
                    <Box sx={searchBox}>
                        <TextField
                            id='courseTitleSearch'
                            label={t('courseTitleSearch')}
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
                                {t('courseFilterTitle1')}
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
                                <Grid item xs={12}>
                                    <Typography variant="h5" sx={cardTitle}>{t('courseFilterTitle2')}</Typography>
                                    <FormControl variant='outlined' sx={styledSelect} fullWidth>
                                        <InputLabel
                                            sx={{
                                                color: '#185D8E',
                                                fontWeight: '600',
                                                fontFamily: 'Poppins, sans-serif'
                                            }}
                                        >
                                            {t('courseFilter1')}
                                        </InputLabel>
                                        <Select
                                            value={tempEmpregabilidadeValue}
                                            onChange={(e) => setTempEmpregabilidadeValue(e.target.value as NivelEmpregabilidade)}
                                        >
                                            <MenuItem value={''}>Todos</MenuItem>
                                            <MenuItem value={NivelEmpregabilidade.ALTA}>Alta</MenuItem>
                                            <MenuItem value={NivelEmpregabilidade.BAIXA}>Baixa</MenuItem>
                                            <MenuItem value={NivelEmpregabilidade.MEDIA}>Média</MenuItem>
                                            <MenuItem value={NivelEmpregabilidade.EM_QUEDA}>Em queda</MenuItem>
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
                                            {t('courseFilter2')}
                                        </InputLabel>
                                        <Select
                                            value={tempTipoValue}
                                            onChange={(e) => setTempTipoValue(e.target.value as TipoInstituicaoCurso)}
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
                                            }}>
                                            {t('courseFilter3')}
                                        </InputLabel>
                                        <Select
                                            value={tempAreaValue}
                                            onChange={(e) => setTempAreaValue(e.target.value)}
                                        >
                                            <MenuItem value={''}>Todos</MenuItem>
                                            {areaCourses.map(i => (
                                                <MenuItem key={i.name} value={i.name}>{i.name}</MenuItem>
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
                                            {t('courseFilter4')}
                                        </InputLabel>
                                        <Select
                                            value={tempPerfilValue}
                                            onChange={(e) => setTempPerfilValue(e.target.value)}
                                        >
                                            <MenuItem value={''}>Todos</MenuItem>
                                            {perfilCourses.map(i => (
                                                <MenuItem key={i.description} value={i.description}>{i.description}</MenuItem>
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
                                    <Button sx={clearFilterButton} onClick={handleClearFilters}>{t('courseFilterClean')}</Button>
                                    <Button sx={searchButton} onClick={handleApplyFilters}>{t('courseFilterSearch')}</Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Modal>
                </Box>

                {/* Cards Instituições */}
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
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
                            {currentCourses.length === 0 ? (
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
                                        Não há cursos disponíveis com esse filtro.
                                    </Typography>
                                </Box>
                            ) : (
                                currentCourses.map((course) => (
                                    <Grid item xs={12} sm={12} md={6} key={course.id}>
                                        <Card sx={cardCourseContent}>
                                            <CardContent>
                                                <Typography variant="h5" sx={cardTitle}>
                                                    {course.descricao ? changeCase.capitalCase(course.descricao) : 'Nome não disponível'}
                                                </Typography>

                                                <Typography variant="body2" sx={cardText}>
                                                    <b>{t('courseCardArea')}:</b> {course.area || 'Não disponível'}
                                                </Typography>
                                                <Typography variant="body2" sx={cardText}>
                                                    <b>{t('courseCardEmpregabilidade')}:</b> {course.empregabilidade
                                                        ? changeCase.capitalCase(course.empregabilidade) : 'Não disponível'}
                                                </Typography>
                                                <Typography variant="body2" sx={cardText}>
                                                    <b>{t('courseCardTipo')}:</b> {course.tipo ? changeCase.capitalCase(course.tipo) : 'Não disponível'}
                                                </Typography>
                                                <Typography variant="body2" sx={cardText}><b>{t('courseCardPerfil')}:</b> {course.perfil || 'Não disponível'}</Typography>
                                                <Typography variant="body2" sx={cardText}>
                                                    <b>{t('courseCardCarreiras')}: </b>
                                                    {Array.isArray(course.possiveisCarreiras) ? course.possiveisCarreiras.join(', ') : 'Não disponível'}
                                                </Typography>

                                            </CardContent>
                                        </Card>
                                    </Grid>

                                )))}
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
            </Box>
            <Footer />
        </>
    );
};

export default CourseList;