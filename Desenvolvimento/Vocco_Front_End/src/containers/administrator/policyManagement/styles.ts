import styled from 'styled-components';
import { FormControl } from '@mui/material';

export const Subtitle = styled.h1`
    font-size: 25px;
    margin-bottom: 20px;
`;

export const TextButton = styled.p`
    font-size: 20px;
    color: black;
    margin: 0px;
    text-align: center;
`;

export const SquareDisplay = styled.p`
    width: 180px;
    height: 100px;
    border-radius: 50px;
    text-decoration: none;
    background-color: #DFDFE6; 
    font-size: 16px;
    color: #3E3E40;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const SquareButton = styled.a`
    width: 300px;
    height: 200px;
    border-radius: 10px;
    padding: 20px;
    text-decoration: none;
    border: 2px solid #BABABF;
    background-color: transparent; 
    font-size: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &:hover {
        background-color: #f0f0f0;
        transition: 0.5s;
    }

    &:hover ${TextButton} {
        color: #3E3E40;
    }
`;

export const StyledFormControl = styled(FormControl)`
    width: 100%;
`;
