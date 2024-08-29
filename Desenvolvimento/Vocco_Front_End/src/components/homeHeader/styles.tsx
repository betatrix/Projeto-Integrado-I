import { Typography, Menu} from '@mui/material';
import styled from 'styled-components';

export const HeaderStyle = styled.div`
    background-color: #1b1f27;
`;

export const Logo = styled(Typography)`
    flex-grow: 1;
    mr: 2;
    font-weight: 700;
    letter-spacing: '.3rem';
    color: 'inherit';
    text-decoration: 'none';
`;

export const MenuStyle = styled(Menu)` 
    mt: '45px';
`;

export const LoginText = styled(Typography)` 
    mr: 2;
    color: 'white';
`;
