
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
    endereco: Endereco;

  };
