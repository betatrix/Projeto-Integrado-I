import { cadastrarEntidade, excluirEntidade } from './apiService';

export const cadastrarCursoInstituicao = async (instituicaoId: number, notaMec: number | null, cursoId: number) => {
    const response = await cadastrarEntidade('cursoInstituicao', {
        instituicaoId,
        notaMec,
        cursoId
    });
    return response;

};

export const excluirCursoInstituicao = async (id: number) => {
    return await excluirEntidade('cursoInstituicao', id );
};
