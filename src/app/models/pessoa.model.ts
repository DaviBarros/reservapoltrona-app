import { Poltrona } from "./poltrona.model";

export interface Pessoa{
  id_pessoa?: number;
  nome?: string;
  poltrona?: Poltrona;
}
