import styled, { createGlobalStyle } from 'styled-components';
import { Box, FilledInput, Button, InputLabel, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export const Global = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
    
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 100vh;
  }
`;

export const BackButton = styled(Button)`
  &.MuiButton-root {
    position: absolute;
    top: 20px;
    left: 20px;
    color: #b0a5ee;
    
    &:hover {
      background-color: rgba(132, 130, 240, 0.1) !important;
    }
  }
`;

export const LoginContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 7vi;
  margin-right: 15vi;
  max-width: 70vh;
  z-index: 1;
`;

export const FormContainer = styled.form`
  display: grid;
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #ffffff;
`;

export const RightPanel = styled.div`
  flex: 1;
  height: 100%;
  width: 100vh;
  background: #101840;
`;

export const Header = styled(Typography)`
  &.MuiTypography-root {
    font-weight: 700;
  }
`;

export const Paragraph = styled(Typography)`
  &.MuiTypography-root {
    font-weight: 400;
    margin-bottom: 30px;
  }
`;

export const SubText = styled(Typography)`
  &.MuiTypography-root {
    color: red;
    text-decoration: none;
  }
`;

export const CustomLink = styled(Link)`
  text-decoration: none;
  font-weight: 600;
  color: #b0a5ee;
  transition: 0.3s;

  &:hover {
    color: #ffffff;
  }
`;

export const CustomField = styled(FilledInput)`
  &.MuiFilledInput-root {
    background-color: #E6E6E6;
    border-radius: 10px;
    margin-bottom: 5px;

    &:hover {
      background-color: #edeff5; /* Cor de fundo ao passar o mouse */
    }

    &.Mui-focused {
      background-color: #edeff5; /* Cor de fundo ao focar */
    }

    &::before {
      border-bottom: none; /* Remove a borda inferior antes do foco */
    }

    &:hover::before {
      border-bottom: none !important; /* Remove a borda inferior ao passar o mouse */
    }

    &::after {
      border-bottom: none; /* Remove a borda inferior ao focar */
    }
  }
`;

export const CustomInputLabel = styled(InputLabel)`
  &.MuiInputLabel-root {
    color: #696f8c;

    &.Mui-focused {
      color: #696f8c;
    }
  }
`;

export const CustomButton = styled(Button)`
  &.MuiButton-root {
    background: linear-gradient(90deg, rgba(53,51,205,1) 0%, rgba(16,24,64,1) 100%);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    margin-top: 10px;
    margin-bottom: 10px;
    border-radius: 10px;
    height: 55px;

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

export const Image = styled.img`
  max-width: 600vh;
  margin-top: 8vh;
`;