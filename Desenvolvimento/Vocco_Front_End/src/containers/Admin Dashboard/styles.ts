import styled from 'styled-components';

export const Subtitle = styled.h1 `
    text-align: center;
`;

export const SquareButton = styled.a`
    width: 300px;
    height: 250px;
    border-radius: 10px;
    padding: 20px;

    text-decoration: none;
    border: 2px solid #000;
    background-color: transparent; 
    font-size: 16px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &:hover {
        background-color: #f0f0f0;
    }
`;

