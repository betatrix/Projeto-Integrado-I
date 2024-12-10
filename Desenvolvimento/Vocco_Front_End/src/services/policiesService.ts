import { PolicesInstitutionForm } from '../types/policiesTypes';
import { buscarEntidadesAtivas, buscarEntidadePorId, excluirEntidade, substituirEntidade } from './apiService';

export const buscarPoliticas = async () => {
    const response = await buscarEntidadesAtivas('politica');
    return response;
};

export const buscarpoliticaPorId = async (id: number) => {
    return await buscarEntidadePorId('politica', id);
};

export const excluirPolitica = async (id:number) => {
    return await excluirEntidade('politica', id);
};

export const editarPolitica = async (policyData: PolicesInstitutionForm) => {
    return await substituirEntidade('politica', policyData);
};