import { Subtitle, SquareButton } from './styles';
import { Typography, Grid, Box } from '@mui/material';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

// const MyIcon = () => (
//     <img src='../assets/icon-school.svg' alt="Ícone Escola" style={{ width: '24px', height: '24px' }} />
// );

const MyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" 
        height="80px" viewBox="0 -960 960 960" width="80px" fill="#1b1f27">
        <path d="M480-120 200-272v-240L40-600l440-240 440 240v320h-80v-276l-80 44v240L480-120Zm0-332 274-148-274-148-274 148 274 148Zm0 241 200-108v-151L480-360 280-470v151l200 108Zm0-241Zm0 90Zm0 0Z"/>
    </svg>
);

const Dashboard = () => {
    return (
        <>
            <Header />
            <Box sx={{ marginTop: '20px' }}>
                <Grid container justifyContent="center">
                    <Subtitle>
                        Quantidades Cadastradas
                    </Subtitle>
                    <Grid container spacing={4} justifyContent="center" alignItems="center" textAlign={'center'}>
                        <Grid item>
                            <Typography variant="subtitle1">
                                Instituições
                            </Typography>
                            <Typography variant="h4">-</Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="subtitle1" gutterBottom>
                                Cursos
                            </Typography>
                            <Typography variant="h4">-</Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="subtitle1" gutterBottom>
                                Estudantes
                            </Typography>
                            <Typography variant="h4">-</Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="subtitle1" gutterBottom>
                                Testes Realizados
                            </Typography>
                            <Typography variant="h4">-</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ marginTop: '40px' }}>
                <Grid container spacing={2} justifyContent="center">
                    <Grid item>
                        <SquareButton href="/page1">
                            Instituições
                            <MyIcon />
                        </SquareButton>
                    </Grid>
                    <Grid item>
                        <SquareButton href="/page2">
                            Cursos
                            <MyIcon />
                        </SquareButton>
                    </Grid>
                    <Grid item>
                        <SquareButton href="/page3">
                            Teste Vocacional
                            <MyIcon />
                        </SquareButton>
                    </Grid>
                </Grid> 
            </Box>
            <Footer />
        </>
    );
};

export default Dashboard;