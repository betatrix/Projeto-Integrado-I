import { useState, useEffect } from 'react';
import { SquareDisplay, SquareButton, TextButton } from './styles';
import { Grid, Box, Typography } from '@mui/material';
// import AdminHeader from '../../../components/adminHeader';
import Footer from '../../../components/homeFooter';
import { Link } from 'react-router-dom';
import LocalLibraryRoundedIcon from '@mui/icons-material/LocalLibraryRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import AdminHeaderMenu from '../../../components/adminMenuHeader';

// const MyIcon = () => (
//     <svg xmlns="http://www.w3.org/2000/svg"
//         height="80px" viewBox="0 -960 960 960" width="80px" fill="#1b1f27">
//         <path d="M480-120 200-272v-240L40-600l440-240 440 240v320h-80v-276l-80 44v240L480-120Zm0-332
//             274-148-274-148-274 148 274 148Zm0 241 200-108v-151L480-360 280-470v151l200 108Zm0-241Zm0 90Zm0 0Z"/>
//     </svg>
// );

const apiUrl = import.meta.env.VITE_API_URL;

const QuantidadesCadastradas = () => {
    const [quantidades, setQuantidades] = useState({
        instituicoes: '-',
        cursos: '-',
        estudantes: '-',
    });

    useEffect(() => {
        fetchQuantidades();
    }, []);

    const fetchQuantidades = async () => {
        try {
            const instituicoesResponse = await fetch(`${apiUrl}/instituicao/ativos/contagem`);
            const cursosResponse = await fetch(`${apiUrl}/curso/ativos/contagem`);
            const estudantesResponse = await fetch(`${apiUrl}/estudante/ativos/contagem`);

            const instituicoesData = await instituicoesResponse.json();
            const cursosData = await cursosResponse.json();
            const estudantesData = await estudantesResponse.json();

            setQuantidades({
                instituicoes: instituicoesData,
                cursos: cursosData,
                estudantes: estudantesData,
            });
        } catch (error) {
            console.error('Erro ao buscar quantidades:', error);
            throw error;
        }
    };

    return (
        <Box sx={{ marginTop: '5px' }}>
            <Grid container justifyContent="center">
                <Typography sx={{
                    fontFamily: 'Poppins, monospace',
                    fontSize: '1.5rem',
                    color: '#1b1f27',
                    fontWeight: 'bold',
                    mb: '2rem'
                }}>
                    Quantidades Cadastradas
                </Typography>
                <Grid container spacing={6} justifyContent="center" alignItems="center" textAlign={'center'}>
                    <Grid item>
                        <SquareDisplay>
                            <Typography sx={{
                                fontFamily: 'Roboto, monospace',
                                fontSize: '1.2rem',
                                color: '#1b1f27',
                                fontWeight: 'bold',
                            }}>
                                Instituições
                            </Typography>
                            <Typography sx={{
                                fontFamily: 'Roboto, monospace',
                                fontSize: '1.2rem',
                                color: '#1b1f27',
                                fontWeight: 'bold',
                            }}>
                                <b>{quantidades.instituicoes}</b>
                            </Typography>
                        </SquareDisplay>
                    </Grid>
                    <Grid item>
                        <SquareDisplay>
                            <Typography sx={{
                                fontFamily: 'Roboto, monospace',
                                fontSize: '1.2rem',
                                color: '#1b1f27',
                                fontWeight: 'bold',
                            }}>
                                Cursos
                            </Typography>
                            <Typography sx={{
                                fontFamily: 'Roboto, monospace',
                                fontSize: '1.2rem',
                                color: '#1b1f27',
                                fontWeight: 'bold',
                            }}>
                                <b>{quantidades.cursos}</b>
                            </Typography>
                        </SquareDisplay>
                    </Grid>
                    <Grid item>
                        <SquareDisplay>
                            <Typography sx={{
                                fontFamily: 'Roboto, monospace',
                                fontSize: '1.2rem',
                                color: '#1b1f27',
                                fontWeight: 'bold',
                            }}>
                                Estudantes
                            </Typography>
                            <Typography sx={{
                                fontFamily: 'Roboto, monospace',
                                fontSize: '1.2rem',
                                color: '#1b1f27',
                                fontWeight: 'bold',
                            }}>
                                <b>{quantidades.estudantes}</b>
                            </Typography>
                        </SquareDisplay>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};

const Dashboard = () => {
    return (
        <>
            <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#F3F3F3' }}>
                <AdminHeaderMenu />
                <Box sx={{ height: 90 }}></Box>
                <QuantidadesCadastradas />
                <Box sx={{ marginTop: '80px' }}>
                    <Grid container justifyContent="center">
                        <Typography sx={{
                            fontFamily: 'Poppins, monospace',
                            fontSize: '1.5rem',
                            color: '#1b1f27',
                            fontWeight: 'bold',
                            mb: '2rem'
                        }}>
                            Ferramentas de Gerenciamento
                        </Typography>

                        <Grid container spacing={2} justifyContent="center">
                            <Grid item>
                                <Link to="/gerenciamento-instituicao" style={{ textDecoration: 'none' }}>
                                    <SquareButton>
                                        <TextButton>
                                            <Typography sx={{
                                                fontFamily: 'Roboto, monospace',
                                                fontSize: '1.5rem',
                                                color: '#1b1f27',
                                                fontWeight: 'bold',
                                            }}>
                                                Instituições
                                            </Typography>
                                        </TextButton>
                                        <SchoolRoundedIcon sx={{ height: '90px', width: '90px', color: '#1b1f27', mt: '1rem' }} />
                                    </SquareButton>
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link to="/gerenciamento-curso" style={{ textDecoration: 'none' }}>
                                    <SquareButton>
                                        <TextButton>
                                            <Typography sx={{
                                                fontFamily: 'Roboto, monospace',
                                                fontSize: '1.5rem',
                                                color: '#1b1f27',
                                                fontWeight: 'bold',
                                            }}>
                                                Cursos
                                            </Typography>
                                        </TextButton>
                                        <LocalLibraryRoundedIcon sx={{ height: '90px', width: '90px', color: '#1b1f27', mt: '1rem' }} />
                                    </SquareButton>
                                </Link>
                            </Grid>
                            <Grid item>
                                <SquareButton href="/gerenciamento-teste">
                                    <TextButton>
                                        <Typography sx={{
                                            fontFamily: 'Roboto, monospace',
                                            fontSize: '1.5rem',
                                            color: '#1b1f27',
                                            fontWeight: 'bold',
                                        }}>
                                            Teste Vocacional
                                        </Typography>
                                    </TextButton>
                                    <AssignmentRoundedIcon sx={{ height: '90px', width: '90px', color: '#1b1f27', mt: '1rem' }} />
                                </SquareButton>
                            </Grid>
                            <Grid item>
                                <SquareButton href="/gerenciamento-usuario">
                                    <TextButton>
                                        <Typography sx={{
                                            fontFamily: 'Roboto, monospace',
                                            fontSize: '1.5rem',
                                            color: '#1b1f27',
                                            fontWeight: 'bold',
                                        }}>
                                            Usuários
                                        </Typography>
                                    </TextButton>
                                    <GroupRoundedIcon sx={{ height: '90px', width: '90px', color: '#1b1f27', mt: '1rem' }} />
                                </SquareButton>
                            </Grid>
                        </Grid>
                    </Grid>

                </Box>
            </Box>
            <Footer />
        </>
    );
};

export default Dashboard;
