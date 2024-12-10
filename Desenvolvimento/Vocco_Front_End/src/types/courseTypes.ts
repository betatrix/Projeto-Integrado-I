
export type Area = {
  id:number;
  descricao: string;
};
// export type Perfil ={
//   id?: number;
//   descricao: string;
// }

export type CourseForm = {
    descricao: string;
    empregabilidade: NivelEmpregabilidade;
    tipo: TipoInstituicaoCurso;
    possiveisCarreiras?: string[];
    area?: Area;
    // perfil?: string;
    // perfilId?: number;
    id: number;
    ativo?: string | boolean | number;
  };

export type CourseFormCad = {
    descricao: string;
    empregabilidade: string;
    tipo: TipoInstituicaoCurso;
    possiveisCarreiras?: string[];
    area?: Area;
    areaId?:number;
    perfil?: string;
    perfilId?: number;
    ativo?: string | boolean;
  };

export enum NivelEmpregabilidade {
    INDEFINIDO = 'Selecione a empregabilidade',
    ALTA = 'Alta',
    MEDIA = 'Media',
    BAIXA = 'Baixa',
    EM_QUEDA = 'Em_Queda',
}

export enum TipoInstituicaoCurso {
  INDEFINIDO = 'Selecione o Tipo de Ensino',
  SUPERIOR = 'SUPERIOR',
  TECNICO = 'TECNICO',
  AMBOS = 'AMBOS',
}