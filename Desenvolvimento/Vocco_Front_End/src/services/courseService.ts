import { CourseForm } from '../types/courseTypes';
import { buscarEntidades, buscarEntidadePorId, excluirEntidade, substituirEntidade, cadastrarEntidade } from './apiService';

export const buscarCursos = async () => {
    const response = await buscarEntidades('curso/ativos');
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

export const cadastrarCurso = async (courseData: CourseForm) => {
    return await cadastrarEntidade('curso', courseData);
};

export const buscarAreas = async () => {
    const response = await buscarEntidades('area');
    return response;
};
