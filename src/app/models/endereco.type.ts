export interface Endereco { 
  id?: number;
  created_at?: Date;
  updated_at?: Date;
  logradouro: string;
  cidade: string;
  bairro: string;
  complemento: string;
  tag: string;
}