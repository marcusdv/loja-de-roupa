'use client'

import { useProdutos } from "@/hooks/useBuscarTodosProdutos";
import ProductCard from '@/components/ProductCard/ProductCard';
import CarouselComponent from '@/components/CarouselComponent/CarouselComponent';
import MainBanner from "@/components/MainBanner/MainBanner";
import EmailForm from "@/components/EmailForm/EmailForm";

export default function Loja() {
  const { produtos, loading, error } = useProdutos();


  const produtosNaTela = () => {
    return (
      <div>
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
                <div className="grid mt-6 grid-cols-2 px-4 md:gap-10 lg:grid-cols-4 w-fit mx-auto gap-4">
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
      </div>
    )
  }

  return (
    <>
      {/* Banner */}
      <div className="flex flex-col items-center gap-14">
        <MainBanner />

        {/* Cadastrar email para novidades */}
        <EmailForm />

        {/* Navegação carousel por categorias */}
        <div className='flex flex-col justify-center w-screen items-center'>
          <h2 className='text-2xl md:text-4xl mb-4'>Navegue pelas categorias</h2>
          <CarouselComponent />
        </div>

        {/* Os 4 produtos que aparecem na tela */}
        {produtosNaTela()}
      </div>
    </>
  );
}
