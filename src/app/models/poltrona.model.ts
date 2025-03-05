import { Pessoa } from "./pessoa.model";

export enum TipoPoltrona {
  GRAVIDA = 'GRAVIDA',
  PCD = 'PCD',
  NORMAL = 'NORMAL'
}

export enum StatusPoltrona {
  ATIVO = 'ATIVO',
  INATIVO = 'INATIVO',
  RESERVADO = 'RESERVADO'
}

export interface Poltrona {
  codigoPoltrona: string;
  pessoa?: Pessoa;
  tipo?: TipoPoltrona;
  status?: StatusPoltrona;
  pessoaNome?: string;
  pessoaId?: number;
}
