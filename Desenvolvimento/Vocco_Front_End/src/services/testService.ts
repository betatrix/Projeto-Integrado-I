import { TestForm, TestFormCad } from '../types/testTypes';
import { buscarEntidadePorId, excluirEntidade, substituirEntidade, cadastrarEntidade, buscarPerguntaPorId, buscarEntidade } from './apiService';

export const buscaPerguntaPorTeste = async (id: number) => {
    return await buscarPerguntaPorId('pergunta', id);
};

export const detalharPerguntaPorId = async (id: number) => {
    return await buscarEntidadePorId('pergunta', id);
};

export const listarPergunta = async () => {
    return await buscarEntidade('pergunta');
};

export const excluirPergunta = async (id:number) => {
    return await excluirEntidade('pergunta', id);
};

export const editarPergunta = async (testData: TestForm) => {
    return await substituirEntidade('pergunta', testData);
};

export const cadastrarPergunta = async (testData: TestFormCad ) => {
    return await cadastrarEntidade('pergunta', testData);
};

export const buscaPerfil = async () => {
    const response = await buscarEntidade('perfil');
    return response;
};

