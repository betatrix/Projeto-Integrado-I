import { LoginForm } from '../types/loginTypes';
import { loginConta } from './apiService';

export const loginAdministrador = async (administradorData:LoginForm) => {
    const response = await loginConta('administrador', administradorData);
    return response;
};