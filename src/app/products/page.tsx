'use client';

import ProductCard from "@/components/ProductCard/ProductCard";
import { useEffect, useState } from "react";
import { Product } from '@/types/types'
import { supabase } from '@/lib/supabase';

function Products() {
    const [produtos, setProdutos] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [busca, setBusca] = useState<string>('');



    // Busca os produtos na API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Verificar se as credenciais estão configuradas
                console.log("Verificando configuração Supabase:");
                console.log("URL definida:", !!process.env.NEXT_PUBLIC_SUPABASE_URL);
                console.log("Chave definida:", !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

                // Buscar todos os produtos
                console.log("Tentando buscar produtos...");
                const { data, error } = await supabase
                    .from('produtos')  // Use o nome exato da sua tabela aqui
                    .select('*');

                if (error) {
                    console.error('Erro ao buscar produtos:', error);
                    return null;
                }

                console.log('Produtos encontrados:', data);

                if (data === null) {
                    console.error('Nenhum produto encontrado');
                    return;
                }

                // Adaptar os nomes dos campos da API para os nomes usados na aplicação
                const produtosAdaptados: Product[] = data.map((product: Product) => ({
                    id: product.id,
                    nome: product.nome,
                    preco: product.preco,
                    descricao: product.descricao,
                    imagem: product.imagem,
                    estrelas: product.estrelas,
                    frete_gratis: product.frete_gratis,
                    desconto: product.desconto,
                    cores: product.cores,
                    preco_anterior: product.preco_anterior,
                    estoque: product.estoque,
                    categoria: product.categoria,
                    genero: product.genero,
                    marca: product.marca,
                    tamanhos: product.tamanhos,
                    data_cadastro: product.data_cadastro,
                }));

                setProdutos(produtosAdaptados);
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Função para remover acentos e caracteres especiais
    const normalizarTexto = (texto: string): string => {
        return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    };


    // Filtrar produtos pela busca
    const produtosFiltrados = busca.trim() === ''
        ? produtos
        : produtos.filter(produto =>
            normalizarTexto(produto.nome).includes(normalizarTexto(busca))
        );

    return (
        <>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6 text-center">Todos os Produtos</h1>

                {/* Campo de busca */}
                <div className="max-w-md mx-auto mb-8">
                    <input
                        type="text"
                        placeholder="Buscar produtos..."
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
                        <p>Erro ao carregar produtos: {error}</p>
                        <p className="text-sm mt-2">Tente novamente mais tarde ou contate o suporte.</p>
                    </div>
                )}

                {!loading && !error && (
                    <>
                        {produtos.length === 0 ? (
                            <p className="text-center py-8 text-gray-500">Nenhum produto encontrado com este termo de busca.</p>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-fit mx-auto">
                                {produtosFiltrados.map((produto) => (
                                    <ProductCard
                                        key={produto.id}
                                        produto={produto}
                                        favoritado={Math.random() > 0.7}
                                    />
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </>
    );
}

export default Products;