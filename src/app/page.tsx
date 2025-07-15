'use client'

import { useProdutos } from "@/hooks/useBuscarTodosProdutos";
import { useAuth } from "@/contexts/AuthContext";
import ProductCard from '@/components/ProductCard/ProductCard';
import CarouselComponent from '@/components/CarouselComponent/CarouselComponent';
import MainBanner from "@/components/MainBanner/MainBanner";
import EmailForm from "@/components/EmailForm/EmailForm";

export default function Loja() {
  const { produtos, loading, error } = useProdutos();
  const { user } = useAuth();

  // Função para extrair o nome do email (antes do @)
  const getUserDisplayName = () => {
    if (!user) return null;
    
    // Se o usuário tem metadata com nome, usa ele
    if (user.user_metadata?.full_name) {
      return user.user_metadata.full_name;
    }
    
    // Caso contrário, extrai o nome do email (parte antes do @)
    if (user.email) {
      return user.email.split('@')[0];
    }
    
    return 'Usuário';
  };


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
      {/* Seção de boas-vindas para usuário logado */}
      {user && (
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-6 px-4 text-center">
          <h2 className="text-2xl font-bold mb-2">
            Olá, {getUserDisplayName()}! 👋
          </h2>
          <p className="text-blue-100">
            Bem-vindo(a) de volta à Salpatos! Encontre os melhores calçados para você.
          </p>
        </div>
      )}

      {/* Banner */}
      <div className="flex flex-col items-center gap-14">
        <MainBanner />

        {/* Cadastrar email para novidades */}
        {!user && <EmailForm />}

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