'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import { FaCheckCircle, FaBoxOpen, FaHome } from 'react-icons/fa';

export default function CheckoutSuccess() {
  const { clearCart } = useCart();
  
  // Usamos useRef para rastrear se já limpamos o carrinho
  const hasCleanedCartRef = useRef(false);
  
  // Limpa o carrinho quando a página é carregada
  useEffect(() => {
    // Só limpa o carrinho se ainda não tivermos limpado
    if (!hasCleanedCartRef.current) {
      clearCart();
      // Marca que já limpamos o carrinho para evitar chamadas repetidas
      hasCleanedCartRef.current = true;
      // Aqui poderíamos salvar o pedido no histórico do usuário
    }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Intencionalmente omitindo clearCart das dependências para evitar loops

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-10">
          <FaCheckCircle className="mx-auto h-20 w-20 text-green-500 mb-4" />
          <h1 className="text-3xl font-extrabold text-gray-900">Pedido realizado com sucesso!</h1>
          <p className="mt-3 text-xl text-gray-600">
            Obrigado por sua compra! Estamos processando seu pedido.
          </p>
        </div>

        <div className="border-t border-b border-gray-200 py-6 my-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">O que acontece agora?</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <FaBoxOpen className="h-6 w-6 text-green-500" />
              </div>
              <div className="ml-3">
                <h3 className="text-md font-medium text-gray-900">Processamento do pedido</h3>
                <p className="text-sm text-gray-500">
                  Seu pedido será processado e preparado para envio em até 48 horas.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-md font-medium text-gray-900">Confirmação por e-mail</h3>
                <p className="text-sm text-gray-500">
                  Enviamos um e-mail com os detalhes da sua compra e atualizaremos você sobre o status do envio.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-lg font-medium text-gray-900 mb-4">
            Número do pedido: <span className="font-bold">#{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}</span>
          </p>
          <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center mt-6">
            <Link href="/perfil" 
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Minha conta
            </Link>
            <Link href="/" 
                  className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <FaHome className="mr-2" /> Voltar à loja
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
