'use client'

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useProdutos } from "@/hooks/useBuscarTodosProdutos";
import ProductCard from '@/components/ProductCard/ProductCard';

export default function Loja() {
  const [bannerAtual, setBannerAtual] = useState(1);
  const { produtos, loading, error } = useProdutos();

  useEffect(() => {
    // Cria um novo intervalo sempre que bannerAtual mudar
    const interval = setInterval(() => {
      setBannerAtual(atual => atual === 3 ? 1 : atual + 1);
    }, 5000);

    // Limpa o intervalo quando bannerAtual mudar ou componente desmontar
    return () => clearInterval(interval);
  }, [bannerAtual]); // Dependência no bannerAtual


  return (
    <>
      {/* Banner */}
      <div className="">
        <div className="relative w-full h-[600px] overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${(bannerAtual - 1) * 100}%)` }}
          >
            <div className="min-w-full relative h-[600px]">
              <Image
                src="/banner-1.png"
                alt="banner de promoção 1"
                fill
                priority
                className="object-cover"
                quality={85}
              />
            </div>
            <div className="min-w-full relative h-[600px]">
              <Image
                src="/banner-2.png"
                alt="banner de promoção 2"
                fill
                priority
                className="object-cover"
                quality={85}
              />
            </div>
            <div className="min-w-full relative h-[600px]">
              <Image
                src="/banner-3.png"
                alt="banner de promoção 3"
                fill
                priority
                className="object-cover"
                quality={85}
              />
            </div>
          </div>

          {/* Bolinhas de navegação */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {[1, 2, 3].map((numero) => (
              <button
                key={numero}
                disabled={bannerAtual === numero}
                className={`w-3 h-3 rounded-full  transition-colors ${bannerAtual === numero ? 'bg-white cursor-default' : 'bg-white/50 cursor-pointer'
                  }`}
                onClick={() => setBannerAtual(numero)}
                aria-label={`Ver banner ${numero}`}
              />
            ))}
          </div>
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

        {
          !loading && !error && (
            <>
              {produtos.length === 0 ? (
                <p className="text-center py-8 text-gray-500">
                  Nenhum produto encontrado.
                </p>
              ) : (
                <div className="grid mt-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-fit mx-auto gap-4">
                  {
                    produtos.slice(0, 4).map((produto, index) => {
                      return (
                        <ProductCard
                          key={produto.id}
                          produto={produto}
                          favoritado={index % 3 === 2}
                        />
                      )
                    })}
                </div>
              )}
            </>
          )}
      </div>
    </>
  );
}
