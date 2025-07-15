import { supabase } from "@/lib/supabase";
import { Product } from "@/types/product";

/**
 * Busca todos os produtos na tabela 'produtos'.
 * @returns {Promise<Product[]>} Uma lista de produtos.
 * @throws {Error} Se ocorrer um erro ao buscar os produtos.
 */

// Interface para os dados brutos vindos do banco de dados
interface ProdutoRaw {
  id: number;
  nome: string;
  preco: number;
  descricao: string;
  imagem: string | null;
  estrelas: number | null;
  frete_gratis: boolean | null;
  desconto: number | null;
  cores: string[] | null;
  preco_anterior: number | null;
  estoque: number;
  categoria: string[] | null;
  genero: string[] | null;
  marca: string;
  tamanhos: string[] | null;
  data_cadastro: string | Date; // Pode vir como string do banco
}

// Função auxiliar para adaptar dados ao tipo Product
function adaptarProduto(data: ProdutoRaw): Product {
  return {
    id: data.id,
    nome: data.nome,
    preco: data.preco,
    descricao: data.descricao,
    imagem: data.imagem,
    estrelas: data.estrelas,
    frete_gratis: data.frete_gratis,
    desconto: data.desconto,
    cores: Array.isArray(data.cores) ? data.cores : [],
    preco_anterior: data.preco_anterior,
    estoque: data.estoque,
    categoria: Array.isArray(data.categoria) ? data.categoria : [],
    genero: Array.isArray(data.genero) ? data.genero : [],
    marca: data.marca,
    tamanhos: Array.isArray(data.tamanhos) ? data.tamanhos : [],
    data_cadastro: data.data_cadastro instanceof Date ? data.data_cadastro : new Date(data.data_cadastro),
  };
}

export async function buscarProdutos() {
  try {
    const { data, error } = await supabase.from("produtos").select("*");

    if (error) {
      throw new Error("Erro ao buscar produtos: " + error.message);
    }

    if (!data?.length) {
      return [];
    }

    return data.map(adaptarProduto);
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    throw error;
  }
}

/**
 * Busca um produto específico pelo ID.
 * @param {number} id - O ID do produto.
 * @returns {Promise<Product | null>} O produto encontrado ou null se não for encontrado.
 * @throws {Error} Se ocorrer um erro ao buscar o produto.
 */
export async function buscarProdutoPorId(id: number) {
  try {
    const { data, error } = await supabase
      .from("produtos")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      throw new Error("Erro ao buscar produto: " + error.message);
    }

    if (!data) {
      return null;
    }

    return adaptarProduto(data);
  } catch (error) {
    console.error("Erro ao buscar produto:", error);
    throw error;
  }
}

/**
 * Busca produtos por categoria.
 * @param {string} categoria - A categoria dos produtos.
 * @returns {Promise<Product[]>} Uma lista de produtos da categoria especificada.
 * @throws {Error} Se ocorrer um erro ao buscar os produtos por categoria.
 */
export async function buscarProdutosPorCategoria(categoria: string) {
  try {
    const { data, error } = await supabase
      .from("produtos")
      .select("*")
      .contains("categoria", [categoria]);

    if (error) {
      throw new Error(
        "Erro ao buscar produtos por categoria: " + error.message
      );
    }

    if (!data?.length) {
      return [];
    }

    if (!data?.length) {
      return [];
    }

    return data.map(adaptarProduto);
  } catch (error) {
    console.error("Erro ao buscar produtos por categoria:", error);
    throw error;
  }
}
