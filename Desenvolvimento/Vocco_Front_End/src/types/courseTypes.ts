export type Area = {
  id?:number;
  descricao: string;
};

export type CourseForm = {
    descricao: string;
    empregabilidade?: string;
    possiveisCarreiras?: string [];
    area?: Area;
    areaId?:number;
    id: number;
    ativo?: string | boolean;
  };