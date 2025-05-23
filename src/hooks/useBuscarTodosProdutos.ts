import { useState, useEffect } from 'react';
import { Product } from '@/types/types';
import { buscarProdutos } from '@/services/produtos';

// Hook personalizado para gerenciar o estado e carregamento dos produtos
export function useProdutos() {
    // Estado para armazenar a lista de produtos
    const [produtos, setProdutos] = useState<Product[]>([]);
    // Estado para controlar o loading durante o carregamento
    const [loading, setLoading] = useState(true);
    // Estado para armazenar possíveis erros
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Flag para evitar memory leaks em caso de desmontagem do componente
        let isMounted = true;

        // Função assíncrona para carregar os produtos da API
        async function carregarProdutos() {
            try {
                // Busca os produtos do serviço
                const data = await buscarProdutos();
                // Só atualiza o estado se o componente ainda estiver montado
                if (isMounted) {
                    setProdutos(data);
                }
            } catch (error) {
                console.log('erro em carregarProdutos: ', error);
                if (isMounted) {
                    setError('Falha ao carregar produtos. Por favor, tente novamente.');
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        carregarProdutos();

        // Cleanup function para evitar memory leaks
        return () => {
            isMounted = false;
        };
    }, []); 

    return { produtos, loading, error };
} 