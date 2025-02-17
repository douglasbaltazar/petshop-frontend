import { Cliente } from "./cliente.type";
import { Raca } from "./raca.type";

export interface Pet { 
  id?: number;
  created_at?: Date;
  updated_at?: Date;
  cliente: Cliente;
  raca: Raca;
  nome: string;
  dataNascimento: Date;
}