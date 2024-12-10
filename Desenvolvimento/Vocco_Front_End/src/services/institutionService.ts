import { InstituicaoForm } from '../types/institutionTypes';
import { buscarEntidadePorId, buscarEntidadesAtivas, cadastrarEntidade, excluirEntidade, substituirEntidade } from './apiService';

// Cadastrar uma nova instituição
export const cadastrarInstituicao = async (instituicaoData: InstituicaoForm) => {
    const response = await cadastrarEntidade('instituicao', instituicaoData);
    return response;
};

// Buscar todas as instituições ativas
export const buscarInstituicoes = async () => {
    const response = await buscarEntidadesAtivas('instituicao/ativas');
    return response;
};

// Buscar instituições por nome
export const buscarInstituicoesPorNome = async (nome: string) => {
    const response = await buscarEntidadesAtivas(`instituicao?nome=${nome}`);
    return response;
};

// Buscar uma instituição por ID
export const buscarInstituicaoPorId = async (id: number) => {
    return await buscarEntidadePorId('instituicao', id);
};

// Editar uma instituição existente
export const editarInstituicao = async ( institutionData: InstituicaoForm) => {
    return await substituirEntidade('instituicao', institutionData);
};

// Excluir uma instituição
export const excluirInstituicao = async (id: number) => {
    return await excluirEntidade('instituicao', id);
};

// Excluir múltiplas instituições
export const excluirInstituicoesEmMassa = async (ids: number[]) => {
    try {
        await Promise.all(ids.map(async (id) => {
            await excluirEntidade('instituicao', id);
        }));
    } catch (error) {
        console.error('Erro ao excluir instituições em massa');
        throw error;
    }
};
