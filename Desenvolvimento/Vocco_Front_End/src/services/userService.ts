import { buscarEntidade, buscarEntidadePorId, cadastrarEntidade, excluirEntidade, substituirEntidade} from './apiService';
import { AdmForm, AdmRegister, UserForm} from '../../src/types/userTypes';

export const buscarUsuarios = async () => {
    const response = await buscarEntidade('estudante');
    return response;
};

export const buscarUsuarioPorId = async (id: number) => {
    return await buscarEntidadePorId('estudante', id);
};

export const excluirUsuario = async (id: number) => {
    return await excluirEntidade('estudante', id);
};

export const editarUsuario = async (userData: UserForm) => {
    return await substituirEntidade('estudante', userData);
};

export const buscarAdministrador = async () => {
    const response = await buscarEntidade('administrador');
    return response;
};

export const buscarAdministradorPorId = async (id: number) => {
    try {
        const response = await buscarEntidadePorId('administrador', id);
        return response;
    } catch (error) {
        console.error('Erro ao buscar administrador por ID:', error);
        throw error;
    }
};

export const excluirAdministrador = async (id: number) => {
    return await excluirEntidade('administrador', id);
};

export const editarAdministrador = async (userData: AdmForm) => {
    return await substituirEntidade('administrador', userData);
};

export const cadastrarAdministrador = async (admData: AdmRegister) => {
    const response = await cadastrarEntidade('administrador/cadastro', admData);
    return response;
};
