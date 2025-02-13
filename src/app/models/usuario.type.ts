export interface Usuario { 
  id?: number;
  created_at?: Date;
  updated_at?: Date;
  cpf: string;
  nome: string;
  senha?: string;
  perfil: string;
}