// estilização do componente botão de voltar para a página anterior
import styled from 'styled-components';

export const BackPageButton = styled.button `
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    background-color: #d3d3d3;
    color: white;
    margin: 40px;

    &:hover {
        background-color: #a9a9a9;
        transition: 0.3s all;
    }
`;
