import { LoginForm } from '../types/loginTypes';
import { adicionarImagem, loginConta } from './apiService';

export const loginAdministrador = async (administradorData:LoginForm) => {
    const response = await loginConta('administrador', administradorData);
    return response;
};

export const fotoAdministrador = async (administradorId:number, arquivo: FormData) => {
    const response = await adicionarImagem('administrador', administradorId, arquivo );
    return response;
};

