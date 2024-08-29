import { InstituicaoForm } from '../types/institutionTypes';
import { cadastrarEntidade } from './apiService';

export const cadastrarInstituicao = async (instituicaoData: InstituicaoForm) => {
    const response = await cadastrarEntidade('instituicao', instituicaoData);
    return response;
};

