import { supabase } from '@/lib/supabase';
import { Product } from '@/types/types';

export async function buscarProdutos() {
    try {
        const { data, error } = await supabase
            .from('produtos')
            .select('*');

        if (error) {
            throw new Error('Erro ao buscar produtos: ' + error.message);
        }

        if (!data?.length) {
            return [];
        }

        // Adaptar os dados com tipagem forte
        return data.map((product: Product) => ({
            id: product.id,
            nome: product.nome,
            preco: product.preco,
            descricao: product.descricao,
            imagem: product.imagem,
            estrelas: product.estrelas,
            frete_gratis: product.frete_gratis,
            desconto: product.desconto,
            cores: Array.isArray(product.cores) ? product.cores : [],
            preco_anterior: product.preco_anterior,
            estoque: product.estoque,
            categoria: Array.isArray(product.categoria) ? product.categoria : [],
            genero: Array.isArray(product.genero) ? product.genero : [],
            marca: product.marca,
            tamanhos: Array.isArray(product.tamanhos) ? product.tamanhos : [],
            data_cadastro: product.data_cadastro,
        }));
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        throw error;
    }
}

export async function buscarProdutoPorId(id: number) {
    try {
        const { data, error } = await supabase
            .from('produtos')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            throw new Error('Erro ao buscar produto: ' + error.message);
        }

        if (!data) {
            return null;
        }

        return data;
    } catch (error) {
        console.error('Erro ao buscar produto:', error);
        throw error;
    }
}

export async function buscarProdutosPorCategoria(categoria: string) {
    try {
        const { data, error } = await supabase
            .from('produtos')
            .select('*')
            .contains('categoria', [categoria]);

        if (error) {
            throw new Error('Erro ao buscar produtos por categoria: ' + error.message);
        }

        if (!data?.length) {
            return [];
        }

        return data;
    } catch (error) {
        console.error('Erro ao buscar produtos por categoria:', error);
        throw error;
    }
} 