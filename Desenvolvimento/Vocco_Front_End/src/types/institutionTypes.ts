
export type Endereco = {
    logradouro: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
  };

export type InstituicaoForm = {
    nome: string;
    site: string;
    formaIngresso: string;
    notaMec: number | null;
    sigla: string;
    tipo: string;
    endereco: Endereco;

  };

export type InstituicaoUpdateForm = {
    id: string,
    nome: string;
    site: string;
    formaIngresso: string;
    notaMec: number | null;
    sigla: string;
    tipo: string;
    endereco: Endereco;

  };

export enum TipoInstituicaoCurso {
  SUPERIOR = 'SUPERIOR',
  TECNICO = 'TECNICO',
  AMBOS = 'AMBOS',
}