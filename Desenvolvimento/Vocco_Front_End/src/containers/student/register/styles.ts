import styled, { createGlobalStyle } from 'styled-components';
import { Box, FilledInput, Button, InputLabel, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { ErrorMessage } from 'formik';

export const Global = createGlobalStyle`
  body {
    font-family: 'Roboto', sans-serif;
  }
`;

export const BackButton = styled(Button)`
  &.MuiButton-root {
    position: absolute;
    top: 20px;
    left: 20px;
    color: #3533cd;
    
    &:hover {
      background-color: rgba(89,87,230,0.1) !important;
    }
  }
`;

export const LoginContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  background-color: #f5f5f5;
`;

export const FormContainer = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  width: 100%;
  max-width: 700px;
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const Header = styled(Typography)`
  &.MuiTypography-root {
    font-weight: 700;
    margin-bottom: 10px;
  }
`;

export const SubText = styled(Typography)`
  &.MuiTypography-root {
    color: #474d66;
    text-decoration: none;
    text-align: left;
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

export const CustomField = styled(FilledInput)`
  &.MuiFilledInput-root {
    background-color: #E6E6E6;
    border-radius: 10px;

    &:hover {
      background-color: #edeff5;
    }

    &.Mui-focused {
      background-color: #edeff5;
    }

    &::before {
      border-bottom: none;
    }

    &:hover::before {
      border-bottom: none !important; 
    }

    &::after {
      border-bottom: none; 
    }

    &.Mui-error {
      background-color: #F9DADA; 
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
    margin-top: 5px;
    margin-bottom: 2px;
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

export const MessageError = styled(ErrorMessage)`
  color: red;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;
