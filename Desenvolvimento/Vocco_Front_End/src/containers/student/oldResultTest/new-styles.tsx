import { Container, Typography, ListItem, Box, Button } from '@mui/material';
import styled, { createGlobalStyle } from 'styled-components';
import { Link } from 'react-router-dom';
import { createTheme } from '@mui/material/styles';

// eslint-disable-next-line react-refresh/only-export-components
export const componentTheme = createTheme({
    typography: {
        fontFamily: '\'Poppins\', sans-serif',
    },
});

export const Global = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap');

  body {
    background-color: #fcfbfb;
    font-family: 'Inter', sans-serif;
  }
`;

export const ResultContainer = styled(Container)`
  margin-top: 5%;
  flex-direction: column;
  align-items: center;
  max-width: 100%; 
  padding-left: 0; 
  padding-right: 0; 
`;

export const CourseCard = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #F6F6F6;
  padding: 27px;
  padding-left: 35px;
  padding-right: 40px;
  border-radius: 23px;
  box-shadow: 10px 10px 1px #B9D4F8;
  text-align: center;
  height: 560px;
  width: 100%;
  max-width: 400px;
  border: solid #185D8E; 

  @media (max-width: 600px) {
    padding: 10px;
    max-width: 100%;
    font-size: 14px;
  }
`;

// TITLES ****************************************************************************************************
export const PageTile = styled(Typography)`
  text-align: center;
  font-family: 'Inter', sans-serif;
  font-weight: bolder;
  color: #185D8E;
  margin-bottom: 20px;
`;

export const PerfilTitle = styled(Typography)`
  text-align: center;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.5);
  margin-bottom: 7px;
`;

export const CourseTitle = styled(Typography)`
  margin-bottom: 17px;
  text-align: center;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.5);
  font-size: 18px;

  @media (max-width: 600px) {
    font-size: 16px;
    margin-bottom: 15px;
  }
`;

export const DetailsResult = styled(Typography)`
  margin-bottom: 7px;
  color: rgba(0, 0, 0, 0.7);

  @media (max-width: 600px) {
    font-size: 14px;
    margin-bottom: 8px;
  }
`;

export const CareerListItem = styled(ListItem)`
  color: rgba(0, 0, 0, 0.5);
  margin-left: 15px;
`;

export const BackButton = styled(Button)`
  &.MuiButton-root {
    position: absolute;
    left: 5%;
    color: #185D8E;
    padding: 5px 15px;
    font-weight: 600;
    width: 150px;
    font-size: 18px;

    &:hover {
      color: #0B2A40;
      background-color: #D9EEFF !important;
    }
  }
`;

export const MobileBackButton = styled(Button)`
  &.MuiButton-root {
    position: absolute;
    left: 5%;
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

// SCROLLBAR

export const ScrollableList = styled.div`
  max-height: 170px;
  overflow-y: auto;
  overflow-x: hidden;
  
  /* Custom scrollbar styles */
  &::-webkit-scrollbar {
    width: 7px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #185D8E;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-track {
    background-color: #e2dddd;
    border-radius: 4px;
  }
`;

// MODAL
export const ModalContent = styled(Box)`
  /* Custom scrollbar styles */
  &::-webkit-scrollbar {
    width: 8px;
    
  }

  &::-webkit-scrollbar-thumb {
    background-color: #185D8E;
    border-radius: 23px;
  }

  &::-webkit-scrollbar-track {
    background-color: #e2dddd;
    border-radius: 23px;
    width: 10px;
    max-height: 200px;
  }
`;

