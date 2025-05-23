'use client';

import ProductCard from "@/components/ProductCard/ProductCard";
import { useState } from "react";
import { useProdutos } from "@/hooks/useBuscarTodosProdutos";

export const dynamic = 'force-dynamic';

function Products() {
    const { produtos, loading, error } = useProdutos();
    const [busca, setBusca] = useState<string>('');

    // Função para remover acentos e caracteres especiais
    const normalizarTexto = (texto: string): string => {
        return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    };

    // Filtra os produtos com base no termo de busca
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