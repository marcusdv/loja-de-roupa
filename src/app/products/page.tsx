'use client';

import ProductCard from "@/components/ProductCard";
import { useEffect, useState } from "react";
import { Product, ProductAPIResponse } from '@/types/types'

const API_URL = "https://fakestoreapi.com/products";

function Products() {
    const [produtos, setProdutos] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [busca, setBusca] = useState<string>('');

    // Busca os produtos na API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) {
                    throw new Error(`Erro ao buscar produtos: ${response.status}`);
                }
                const data = await response.json();
                if (!data) {
                    throw new Error('Erro ao buscar produtos');
                }
                // Adaptar os nomes dos campos da API para os nomes usados na aplicação
                const produtosAdaptados: Product[] = data.map((item: ProductAPIResponse) => ({
                    id: item.id,
                    name: item.title,
                    price: item.price,
                    description: item.description,
                    image: item.image
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

    // Filtrar produtos pela busca
    const produtosFiltrados = busca.trim() === '' 
        ? produtos 
        : produtos.filter(produto => 
            produto.name.toLowerCase().includes(busca.toLowerCase())
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
                        {produtosFiltrados.length === 0 ? (
                            <p className="text-center py-8 text-gray-500">Nenhum produto encontrado com este termo de busca.</p>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-fit gap-2 mx-auto">
                                {produtosFiltrados.map((produto) => (
                                    <ProductCard 
                                        key={produto.id} 
                                        produto={produto} 
                                        promocao={Math.random() > 0.5 ? 15 : 0} 
                                        estrelas={3 + Math.random() * 2} 
                                        precoAntigo={Math.random() > 0.5 ? produto.price * 1.2 : null} 
                                        favoritado={Math.random() > 0.7} 
                                        freteGratis={Math.random() > 0.6} 
                                        cores={['red', 'blue', 'green', 'yellow', 'purple']} 
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