import styled, { createGlobalStyle } from 'styled-components';
import { LinearProgress, Button, Typography, SxProps, Theme} from '@mui/material';
import vocacionalTestImg from '../../../assets/img/vocacionaTest.png';
import { Link } from 'react-router-dom';

export const Global = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Exo:wght@400;600&display=swap');

  body {
    color: #030140;
    font-weight: 400;
    font-style: normal;
}
`;

export const IntroText = styled(Typography)`
  font-size: 0.8rem;
  color: rgba(0, 0, 0, 0.6); 
  margin-bottom: 20px;
  text-align: center;
  font-family: 'Exo', sans-serif;
`;

export const ModalText = styled(Typography)`
  font-size: 10rem;
  color: rgba(0, 0, 0, 0.6); 
  margin-bottom: 20px;
  text-align: center;
  font-family: 'Exo', sans-serif;
  text-align: justify;
`;

export const StyledTypography = styled(Typography)`
  font-family: 'Exo', sans-serif;
  text-align: center;
`;

export const CenteredDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 70vh;
    width: 90%; 
    max-width: 800px;
    background-color: white;
    border-radius: 10px; 
    padding: 20px; 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
    margin: auto;
    max-height: 450px;
`;

export const ButtonGroup = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    width: 300px;
`;

export const RadioContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 10px;
    margin-top: 30px;
    margin-bottom: 15px;
`;

export const StyledLinearProgress = styled(LinearProgress)`
    width: 70%;
    margin-bottom: 70px;
    
    & .MuiLinearProgress-barColorPrimary {
        background: linear-gradient(90deg, #312ef4 0%, #0f1c5c 100%); /* Cor da barra de progresso */
        height: 20px;
    }
    
    &.MuiLinearProgress-colorPrimary {
        background-color: #d3d3d3; /* Cor de fundo da barra */
    }
`;

export const StyledButton = styled(Button)`
  background: linear-gradient(90deg, #004281 0%, #0f1c5c 100%);
  color: white;
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 5px;
  transition: background 0.3s, transform 0.3s;

  &:hover {
    /* background: linear-gradient(90deg, #0f1c5c 0%, #312ef4 100%); */
    transform: translateY(-2px);
  }

  &:active {
    background: linear-gradient(90deg, #0a1350 0%, #004281 100%);
    transform: translateY(0);
  }

  &:disabled {
    background: #d3d3d3;
    color: #a0a0a0;
  }
`;

export const CustomButton = styled(Button)`
  &.MuiButton-root {
    background: linear-gradient(90deg, rgba(53,51,205,1) 0%, rgba(16,24,64,1) 100%);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    margin-top: 5px;
    margin-bottom: 2px;
    border-radius: 10px;
    height: 55px;
    color: #fff;

    &:hover {
        background: linear-gradient(269deg,#3533cd,#101840,#3533cd);
        background-size: 180% 180%;
        animation: gradient-animation 10s ease infinite;
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
      
      @keyframes gradient-animation {
        0% {
          background-position: 0% 50%;
        }
        50% {
          background-position: 100% 50%;
        }
        100% {
          background-position: 0% 50%;
        }
      }
    }
  }
`;

// Background -------------------------------------------------------
const globalBoxStyles: SxProps<Theme> = (theme) => ({
    minHeight: '90vh',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundColor: '#caddff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        alignItems: 'center',
        backgroundAttachment: 'local',
    },
});

// eslint-disable-next-line react-refresh/only-export-components
export const homePageBoxStyles: SxProps<Theme> = (theme) => ({
    backgroundImage: `url(${vocacionalTestImg})`,
    ...globalBoxStyles(theme),
});

export const BackButton = styled(Button)`
  &.MuiButton-root {
    position: absolute;
    top: 80px;
    left: 20px;
    color: #3533cd;
    
    &:hover {
      background-color: rgba(89,87,230,0.1) !important;
    }
  }
`;

export const CustomLink = styled(Link)`
  text-decoration: none;
  font-weight: 600;
  color: #735FE4;
  transition: 0.3s;

  &:hover {
    color: #452DCB;
  }
`;