import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const cadastrarEntidade = async (entidade: string, data: object) => {
    const response = await axios.post(`${API_URL}/${entidade}`, data);
    return response.data;
};

export const buscarEntidadesAtivas = async (entidade: string) => {
    const response = await axios.get(`${API_URL}/${entidade}/ativos`);
    return response.data;
};

export const buscarEntidades = async (entidade: string) => {
    const response = await axios.get(`${API_URL}/${entidade}`);
    return response.data;
};

export const buscarEntidadePorId = async (entidade: string, id: number) => {
    const response = await axios.get(`${API_URL}/${entidade}/${id}`);
    return response.data;
};

export const buscarEntidade = async (entidade: string) => {
    const response = await axios.get(`${API_URL}/${entidade}`);
    return response.data;
};

export const atualizarEntidade = async (entidade: string, id: number, data: object) => {
    const response = await axios.put(`${API_URL}/${entidade}/${id}`, data);
    return response.data;
};

export const substituirEntidade = async (entidade: string, data: object) => {
    const response = await axios.put(`${API_URL}/${entidade}`, data);
    return response.data;
};

export const excluirEntidade = async (entidade: string, id: number) => {
    const response = await axios.delete(`${API_URL}/${entidade}/${id}`);
    return response.data;
};

export const buscarPerguntaPorId = async (entidade: string, id: number) => {
    const response = await axios.get(`${API_URL}/${entidade}/teste/${id}`);
    return response.data;
};

export const buscarCursosPorInstituicao = async (instituicaoId: number) => {
    const response = await axios.get(`${API_URL}/cursoInstituicao/instituicao/${instituicaoId}`);
    return response.data;
};

export const buscarPoliticasPorInstituicao = async (instituicaoId: number) => {
    const response = await axios.get(`${API_URL}/politicaInstituicao/instituicao/${instituicaoId}`);
    return response.data;
};

// Função para buscar a lista de testes de um estudante
export const buscarTestesDeEstudante = async (estudanteId: number) => {
    const response = await axios.get(`${API_URL}/estudanteTeste/teste/${estudanteId}`);
    return response.data;
};

//contar quantos testes o estudante fez
export const contarTeste = async(estudanteId: number) => {
    const response = await axios.get(`${API_URL}/estudanteTeste/contagem/${estudanteId}`);
    return response.data;
};

// Nova função para buscar perfis recorrentes
export const buscarPerfisRecorrentes = async (estudanteId: number) => {
    const response = await axios.get(`${API_URL}/estudanteTeste/teste/perfis/${estudanteId}`);
    return response.data;
};

export const buscarPerfilEstudante = async (estudanteId: number) => {
    const response = await axios.get(`${API_URL}/estudantePerfil/estudante/${estudanteId}`);
    return response.data;
};

// Cadastrar estudante
export const cadastrarEstudante = async (entidade: string, data: object) => {
    const response = await axios.post(`${API_URL}/${entidade}/cadastro`, data);
    return { data: response.data, status: response.status };
};

// Deletar estudante
export const deletarEstudante = async (entidade: string, estudanteId: number) => {
    const response = await axios.delete(`${API_URL}/${entidade}/${estudanteId}`);
    return { data: response.data, status: response.status };
};

// Atualizar estudante
export const atualizarEstudante = async (entidade: string, data: object) => {
    const response = await axios.put(`${API_URL}/${entidade}`, data);
    return { data: response.data, status: response.status };
};

// Enviar email para recuperação de senha
export const recuperarSenha = async (email: string) => {
    const response = await axios.post(`${API_URL}/auth/esqueceuSenha?email=${encodeURIComponent(email)}`);
    return response.data, response.status;
};

// Redefinir senha do estudante
export const redefinirSenha = async (token: string, senha:string) => {
    const response = await axios.post(`${API_URL}/auth/redefinirSenha?token=${encodeURIComponent(token)}&novaSenha=${encodeURIComponent(senha)}`);
    return response.data, response.status;
};

// Fazer o login
export const loginConta = async (entidade: string, data: object) => {
    const response = await axios.post(`${API_URL}/auth/${entidade}/login`, data);
    return { data: response.data, status: response.status };
};

// Fazer o upload de foto
export const adicionarImagem = async (entidade: string, estudanteId:number, arquivo: FormData) => {
    const response = await axios.post(`${API_URL}/${entidade}/adicionarFoto?id=${encodeURIComponent(estudanteId)}`, arquivo, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return { data: response.data, status: response.status };
};

// Recuperar foto
export const recuperarImagem = async (nomeArquivo: string) => {
    const response = await axios.get(`${API_URL}/arquivos/download/${nomeArquivo}`, { responseType: 'blob' });
    const imageUrl = URL.createObjectURL(new Blob([response.data]));
    return imageUrl;
};