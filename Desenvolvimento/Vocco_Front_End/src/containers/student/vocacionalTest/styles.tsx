import styled, { createGlobalStyle } from 'styled-components';
import { LinearProgress, Button, Typography, SxProps, Theme} from '@mui/material';
import vocacionalTestImg from '../../../assets/img/test-background.png';
import { Link } from 'react-router-dom';
import { createTheme } from '@mui/material/styles';

// eslint-disable-next-line react-refresh/only-export-components
export const componentTheme = createTheme({
    typography: {
        fontFamily: '\'Poppins\', sans-serif',
    },
});

export const Global = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

  body, html, #root {
    height: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }

  body {
    color: #030140;
    font-weight: 400;
    font-style: normal;
    font-family: 'Poppins', sans-serif;
    background-image: url(${vocacionalTestImg});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  * {
    font-family: 'Poppins', sans-serif;
  }
`;

export const IntroText = styled(Typography)`
  font-size: 0.8rem;
  color: rgba(0, 0, 0, 0.6); 
  text-align: center;
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
  text-align: center;
  font-size: 20px;

  @media (max-width: 600px) {
    font-size: 14px;
  }
  margin-top: 15px;
  margin-bottom: 10px;
`;

export const CenteredDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 90%;
    max-width: 1200px;
    min-height: 50vh;
    max-height: 83vh;
    background-color: white;
    border-radius: 20px; 
    padding: 20px; 
    margin: auto;
    border: solid #185D8E; 
    position: relative;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    img {
    max-width: 550px;
    height: auto;
    border-radius: 20px;

    @media (max-width: 400px) {
      width: 290px;
      max-width: 290px;
    }
  }

    @media (max-width: 630px) {
        width: 95%;
        min-height: 60vh;
        padding: 15px;
    }

    @media (max-width: 400px) {
        padding: 10px;
        border-radius: 10px;
    }
`;

export const CountDisplay = styled.div`
    position: absolute;
    top: 18px;
    right: 18px;
    /* background-color: #A4BFD2; */
    color: #A4BFD2;
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 16px;
    font-weight: bold;
    z-index: 10;
`;

export const ButtonGroup = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 100%;

  @media (max-width: 530px) {
    flex-direction: column;
    width: auto;
    gap: 10px;
  }
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
    
    & .MuiLinearProgress-barColorPrimary {
        background: linear-gradient(90deg, #A4BFD2 0%, #185D8E 100%);
        height: 20px;
    }
    
    &.MuiLinearProgress-colorPrimary {
        background-color: #e6e4e4;
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
    background: #D9EEFF;
    box-shadow: 5px 5px 0px 1px #B9D4F8;
    border-radius: 10px;
    height: 40px;
    color: #185D8E;
    border: solid;
    font-weight: bold;
    width: 200px;
    padding: 0.7rem 1.05rem;
    /* margin-top: 5px; */
    align-self: center;
    transition: transform 0.8s ease;

    &:hover {
      background-color: #a7cae3;
      transform: scale(1.1);
    }
  }
`;

export const CourseCustomButton = styled(Button)<{ selected?: boolean }>`
  &.MuiButton-root {
    background: #f7fbff;
    box-shadow: 3px 3px 0px 1px #B9D4F8;
    border-radius: 10px;
    height: 90px;
    color: #185D8E;
    border: solid;
    font-weight: bold;
    width: 200px;
    padding: 0.7rem 1.05rem;
    margin-top: 8px;
    transition: transform 0.3s ease;

    &:hover {
      background-color: #a7cae3;
      transform: scale(1.1);
    }

    ${({ selected }) => selected && `
      background-color: #a7cae3;
      transform: scale(1.1);
    `}

    @media (max-width: 530px) {
      margin: 0;
    }
  }
`;
// Background -------------------------------------------------------
const globalBoxStyles: SxProps<Theme> = (theme) => ({
    minHeight: '90vh',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundColor: '#0b2e6a',
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

// export const BackButton = styled(Button)`
//   &.MuiButton-root {
//     position: absolute;
//     top: 80px;
//     left: 2%;
//     color: #185D8E;
//     padding: 5px;
//     padding-left: 10px;
//     padding-right: 15px;
//     font-weight: 600;
//     width: 125px;
//     font-size: 18px;
//     cursor: pointer;

//     &:hover {
//       color: #0B2A40;
//       background-color: #D9EEFF !important;
//     }

//     @media (max-width: 768px) {
//       top: 60px;
//       left: 3%;
//       width: 120px;
//       font-size: 16px;
//       padding: 5px 10px;
//     }
//   }
// `;

// export const BackButton = styled(Button)`
//   &.MuiButton-root {
//     position: absolute;
//     left: 2%;
//     top: 80px;
//     color: #185D8E;
//     padding: 5px 15px;
//     font-weight: 600;
//     width: 150px;
//     font-size: 18px;

//     &:hover {
//       color: #0B2A40;
//       background-color: #D9EEFF !important;
//     }
//   }
// `;

// export const CustomLink = styled(Link)`
//   text-decoration: none;
//   color: #185D8E;
// `;

export const BackButton = styled(Button)`
  &.MuiButton-root {
    position: absolute;
    left: 2%;
    top: 80px;
    color: #185D8E;
    padding: 5px 15px;
    font-weight: 600;
    width: 140px;
    font-size: 16px;
    cursor: pointer;

    &:hover {
      color: #0B2A40;
      background-color: #D9EEFF !important;
    }
  }
`;

export const MobileBackButton = styled(Button)`
  &.MuiButton-root {
    position: absolute;
    left: 2%;
    color: #185D8E;
    padding: 10px 25px;
    font-weight: bold;

    &:hover {
      background-color: rgba(89, 87, 230, 0.1) !important;
    }
  }
`;

export const CustomLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: flex;
  align-items: center;
`;

export const AINotice = styled.div`
  position: absolute;
  bottom: 10px;
  right: 15px;
  font-size: 12px;
  color: gray;
  text-align: right;
  opacity: 0.8;

  @media (max-width: 630px) {
    font-size: 10;
  }
`;
