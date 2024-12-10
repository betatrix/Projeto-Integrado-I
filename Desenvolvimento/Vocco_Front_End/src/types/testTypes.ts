export type TestForm = {
    id: number;
    texto: string;
    textoIngles: string;
    ativo: boolean;
    perfil: Perfil;
  };

export type TestFormCad = {
    texto: string;
    textoIngles: string;
    testeId: number;
    perfilId?: number;
  };

export type Perfil = {
    id:number;
    descricao: string;
  };