import { Typography, Menu } from '@mui/material';
import styled from 'styled-components';

export const HeaderStyle = styled.div`
    background-color: #1b1f27;
`;

export const Logo = styled(Typography)`
    flex-grow: 1;
    margin-right: 2;
    font-weight: 700;
    letter-spacing: '.3rem';
    color: 'inherit';
    text-decoration: 'none';
    font-family: 'Poppins', sans-serif;
`;

export const MenuStyle = styled(Menu)` 
    margin-top: '45px';
`;

export const WelcomeText = styled(Typography)` 
    margin-right: 2;
    color: 'white';
    font-family: 'Poppins', sans-serif;
`;
