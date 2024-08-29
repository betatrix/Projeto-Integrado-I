import { cadastrarEntidade } from './apiService';

export const cadastrarPoliticasInstituicao = async (instituicaoId: number, politicaId: number) => {
    const response = await cadastrarEntidade('politicaInstituicao', {
        instituicaoId,
        politicaId
    });
    console.log(response);
    return response;

};