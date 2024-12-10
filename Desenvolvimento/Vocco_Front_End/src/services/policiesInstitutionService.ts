import { cadastrarEntidade, excluirEntidade } from './apiService';

export const cadastrarPoliticasInstituicao = async (instituicaoId: number, politicaId: number) => {
    const response = await cadastrarEntidade('politicaInstituicao', {
        instituicaoId,
        politicaId
    });
    return response;
};

export const excluirPoliticasInstituicao = async (id: number) => {
    return await excluirEntidade('politicaInstituicao', id );
};