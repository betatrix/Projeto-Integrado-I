export type UserForm = {
  id: number;
  nome: string;
  email: string;
  dataNascimento: string;
  celular: string;
  ativo: boolean;
  nivelEscolar: string;
  fotoPerfil?: string;
};

export type AdmForm = {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  cargo: string;
  celular: string;
  ativo: boolean;
  endereco: Endereco;
};

export type Endereco = {
  cep: string;
  logradouro: string;
  estado: string;
  cidade: string;
  numero: string;
  complemento: string;
  bairro: string;
};

export type AdmRegister = {
  nome: string;
  cpf: string;
  email: string;
  cargo: string;
  celular: string;
  endereco: Endereco;
};