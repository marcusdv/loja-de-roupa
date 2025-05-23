'use client';

import ProductCard from "@/components/ProductCard/ProductCard";
import { useEffect, useState } from "react";
import { Product } from '@/types/types'
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

function Products() {
    const [produtos, setProdutos] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [busca, setBusca] = useState<string>('');

    // Busca os produtos na API
    useEffect(() => {

        // 1. Componente monta → isMounted = true
        // 2. Requisição começa
        // 3a. Se usuário sair da página:
        //   3.1. Função de cleanup roda → isMounted = false 
        //   3.2. Quando resposta chegar, if (isMounted) será false
        //   3.3. Nenhuma atualização de estado acontece
        // 3b. Se usuário continuar na página:
        //   3.1. isMounted continua true
        //   3.2. Atualizações de estado acontecem normalmente
        let isMounted = true;

        const fetchProducts = async () => {
            try {
                if (typeof window === 'undefined') return;

                const { data, error } = await supabase
                    .from('produtos')
                    .select('*');

                // Verifica se o componente ainda está montado
                if (isMounted === false) return;

                if (error) {
                    setError('Erro ao carregar produtos. Por favor, tente novamente.');
                    return;
                }

                if (!data?.length) {
                    setError('Nenhum produto encontrado.');
                    return;
                }

                // Adaptar os dados com tipagem forte
                const produtosAdaptados = data.map((product: Product) => ({
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

                setProdutos(produtosAdaptados);
            } catch (error) {
                if (!isMounted) return;
                setError('Ocorreu um erro inesperado. Por favor, tente novamente.');
                console.log(error);
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchProducts();

        // Cleanup function para evitar memory leaks
        return () => {
            isMounted = false;
        };
    }, []);

    // Função para remover acentos e caracteres especiais
    const normalizarTexto = (texto: string): string => {
        return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    };

    // Filtra os produtos com base no termo de busca:
    // - Se houver um termo de busca, filtra os produtos que correspondem ao termo
    //   verificando se o termo está presente no nome do produto, marca ou categoria
    //   (ignorando acentos e maiúsculas/minúsculas)
    // *
    // - trim() retorna a string sem espaços no início e no fim
    // logo se for igual a '' retorna todos os produtos
    // se a busca estiver vazia, retorna todos os produtos
    const produtosFiltrados = busca.trim() === ''
        ? produtos
        : produtos.filter(produto =>
            normalizarTexto(produto.nome).includes(normalizarTexto(busca)) ||
            normalizarTexto(produto.marca).includes(normalizarTexto(busca)) ||
            produto.categoria.some(cat => normalizarTexto(cat).includes(normalizarTexto(busca)))
        );

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-center">Todos os Produtos</h1>

            {/* Campo de busca */}
            <div className="max-w-md mx-auto mb-8">
                <input
                    type="text"
                    placeholder="Busque por nome, marca ou categoria..."
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                    className="p-2 border border-gray-300 rounded-md w-full"
                />
            </div>

            {loading && (
                <div className="flex justify-center items-center py-12">
                    <h2 className="text-2xl text-gray-600">Carregando produtos...</h2>
                </div>
            )}

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                    <p>{error}</p>
                </div>
            )}

            {!loading && !error && (
                <>
                    {produtosFiltrados.length === 0 ? (
                        <p className="text-center py-8 text-gray-500">
                            Nenhum produto encontrado com este termo de busca.
                        </p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-fit mx-auto gap-4">
                            {produtosFiltrados.map((produto) => (
                                <ProductCard
                                    key={produto.id}
                                    produto={produto}
                                    favoritado={Math.random() > 0.6}
                                />
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default Products;