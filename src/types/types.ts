export type Product = {
  id: number;
  nome: string;
  preco: number;
  descricao: string;
  imagem: string | null;
  estrelas: number | null;
  frete_gratis: boolean | null;
  desconto: number | null;
  cores: string[];
  preco_anterior: number | null;
  estoque: number;
  categoria: string[];
  genero: string[];
  marca: string;
  tamanhos: string[];
  data_cadastro: Date;
};
