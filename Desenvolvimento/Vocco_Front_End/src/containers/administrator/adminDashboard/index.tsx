import { useState, useEffect } from 'react';
import { Subtitle, SquareDisplay, SquareButton, TextButton } from './styles';
import { Grid, Box } from '@mui/material';
import AdminHeader from '../../../components/adminHeader';
import Footer from '../../../components/adminFooter';
import { Link } from 'react-router-dom';

const MyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg"
        height="80px" viewBox="0 -960 960 960" width="80px" fill="#1b1f27">
        <path d="M480-120 200-272v-240L40-600l440-240 440 240v320h-80v-276l-80 44v240L480-120Zm0-332
            274-148-274-148-274 148 274 148Zm0 241 200-108v-151L480-360 280-470v151l200 108Zm0-241Zm0 90Zm0 0Z"/>
    </svg>
);

const apiUrl = import.meta.env.VITE_API_URL;

const QuantidadesCadastradas = () => {
    const [quantidades, setQuantidades] = useState({
        instituicoes: '-',
        cursos: '-',
        estudantes: '-'
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
        }
    };

    return (
        <Box sx={{ marginTop: '20px' }}>
            <Grid container justifyContent="center">
                <Subtitle>
                    Quantidades Cadastradas
                </Subtitle>
                <Grid container spacing={4} justifyContent="center" alignItems="center" textAlign={'center'}>
                    <Grid item>
                        <SquareDisplay>
                            Instituições
                            <b>{quantidades.instituicoes}</b>
                        </SquareDisplay>
                    </Grid>
                    <Grid item>
                        <SquareDisplay>
                            Cursos
                            <b>{quantidades.cursos}</b>
                        </SquareDisplay>
                    </Grid>
                    <Grid item>
                        <SquareDisplay>
                            Estudantes
                            <b>-</b>
                        </SquareDisplay>
                    </Grid>
                    <Grid item>
                        <SquareDisplay>
                            Testes Realizados
                            <b>-</b>
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
            <AdminHeader />
            <QuantidadesCadastradas />
            <Box sx={{ marginTop: '40px' }}>
                <Grid container justifyContent="center">
                    <Subtitle>
                        Ferramentas de Gerenciamento
                    </Subtitle>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item>
                            <Link to="/gerenciamento-instituicao" style={{ textDecoration: 'none' }}>
                                <SquareButton>
                                    <TextButton>
                                        Instituições
                                    </TextButton>
                                    <MyIcon />
                                </SquareButton>
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link to="/gerenciamento-curso" style={{ textDecoration: 'none' }}>
                                <SquareButton>
                                    <TextButton>
                                    Cursos
                                    </TextButton>
                                    <MyIcon />
                                </SquareButton>
                            </Link>
                        </Grid>
                        <Grid item>
                            <SquareButton href="/page3">
                                <TextButton>
                                    Teste Vocacional
                                </TextButton>
                                <MyIcon />
                            </SquareButton>
                        </Grid>
                    </Grid>
                </Grid>
                <Footer />
            </Box>
        </>
    );
};

export default Dashboard;
