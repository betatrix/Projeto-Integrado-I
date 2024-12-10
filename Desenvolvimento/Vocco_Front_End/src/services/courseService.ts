import { CourseForm, CourseFormCad } from '../types/courseTypes';
import { buscarEntidadesAtivas, buscarEntidadePorId, excluirEntidade, substituirEntidade, cadastrarEntidade, buscarEntidades } from './apiService';

export const buscarCursos = async () => {
    const response = await buscarEntidadesAtivas('curso');
    return response;
};

export const buscarCursosListaCompleta = async () => {
    const response = await buscarEntidades('curso');
    return response;
};

export const buscarCursoPorId = async (id: number) => {
    return await buscarEntidadePorId('curso', id);
};

export const excluirCurso = async (id:number) => {
    return await excluirEntidade('curso', id);
};

export const editarCurso = async (courseData: CourseForm) => {
    return await substituirEntidade('curso', courseData);
};

export const cadastrarCurso = async (courseData: CourseFormCad ) => {
    return await cadastrarEntidade('curso', courseData);
};

export const buscarAreas = async () => {
    const response = await buscarEntidadesAtivas('area');
    return response;
};
