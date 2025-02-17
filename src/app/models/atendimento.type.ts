import { Pet } from "./pet.type";

export interface Atendimento {
  id?: number;
  created_at?: Date;
  updated_at?: Date;
  pet: Pet;
  descricao: string;
  valor: number;
  data: Date;
}