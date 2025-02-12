import { Contato } from "./contato.type";
import { Endereco } from "./endereco.type";
import { Pet } from "./pet.type";

export interface Cliente {
  id?: number;
  usuario?: number;
  contatos: Contato[];
  enderecos: Endereco[];
  pets: Pet[];
  created_at?: Date;
  updated_at?: Date;
}