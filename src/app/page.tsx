'use client'

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useProdutos } from "@/hooks/useBuscarTodosProdutos";
import ProductCard from '@/components/ProductCard/ProductCard';
import CarouselComponent from '@/components/CarouselComponent/CarouselComponent';

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


  const produtosNaTela = () => {
    return (
      <>
        {/* Carregando */}
        {
          loading && (
            <div className="flex justify-center items-center py-12">
              <h2 className="text-2xl text-gray-600">Carregando produtos...</h2>
            </div>
          )
        }


        {/* Mensagem de erro */}
        {
          error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              <p>{error}</p>
            </div>
          )
        }

        {/* Produtos */}
        {
          !loading && !error && (
            <>
              {produtos.length === 0 ? (
                // Mensagem de nenhum produto encontrado
                <p className="text-center py-8 text-gray-500">
                  Nenhum produto encontrado.
                </p>
              ) : (
                // Lista de produtos
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
          )
        }
        )
      </>
    )
  }

  return (
    <>
      {/* Banner */}
      <div className="">
        <div className="relative w-full h-[600px] overflow-hidden">
          <div
            // Animação do banner
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
                // Animação das bolinhas
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

        {/* Cadastrar email para novidades */}
        <div className='flex flex-col gap-4 border border-gray-400 p-10'>
          <h2 className='text-2xl font-bold'>Cadastre-se para receber ofertas e descontos exclusivos</h2>
          <ul className='flex gap-4'>
            <li><input type="text" placeholder='Nome' className='' /></li>
            <li><input type="text" placeholder='Digite seu e-mail' /></li>
            <li><input type="text" placeholder='Categoria' /></li>
          </ul>
          <p>
            <input type="checkbox" name="concordo com os termos" id="concorco_politica_privacidade" />
            Concordo em receber <b>ofertas e novidades</b> da loja Salpatos por <b>e-mail</b> conforme a <span className='text-orange-400'>Política de privacidade</span>
          </p>
          <button className='rounded-lg text-white bg-orange-400 py-2 text-2xl'>Enviar</button>
        </div>

        {/* Quadrados de anuncios de promoções de calçados */}
        <div>
          <ul>
            <li>
              {/* <Image alt='banner de promocao de calçados' src='#' /> */}
              <div className='grid grid-cols-2 grid-rows-2'>
                <h3>Tênis</h3>
                <p>a partir de <span>R$99</span></p>
                <button className='bg-transparent text-white border border-white  py-2'>CONFIRA</button>
              </div>
            </li>
          </ul>
        </div>

        {/* Navegação carousel por categorias */}
        <div className='flex flex-col justify-center items-center'>
          <h2 className='text-4xl mb-4'>Navegue pelas categorias</h2>
          <CarouselComponent />
        </div>

        {/* Os 4 produtos que aparecem na tela */}
        {produtosNaTela()}
      </div>
    </>
  );
}
