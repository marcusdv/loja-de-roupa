"use client";

import { useState, useEffect } from "react";
import { useCart } from './contexts/CartContext'
import { Product, ProductAPIResponse } from '../types/types'
import ProductCard from "../components/ProductCard";
import Header from "../components/Header/Header";
import Footer from "@/components/Footer";
import Image from 'next/image'


const API_URL = "https://fakestoreapi.com/products";


export default function Loja() {
  const [produtos, setProdutos] = useState<Product[]>([]);
  // const [message, setMessage] = useState<string>("");
  // const [foiAdicionado, setFoiAdicionado] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { cart, /*addToCart,*/ removeFromCart, updateQuantity, clearCart, /*totalItems,*/ totalPrice } = useCart();



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
        console.log('data => ', data)
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


  if (error) {
    console.log('error => ', error)
  }

  return (<>
    {loading
      ?
      // Site carregando
      <h1 className="text-6xl text-center ">Loading...</h1>
      :
      // Site carregado
      <>
        {/* Titulo e produtos */}

        <Header />

        <div className="w-full h-screen">
          <div className="relative w-full h-full">
            <Image
              src="/modelo-home.jpg"
              alt="Lojas Paraibanas"
              fill
              priority
              className="object-cover"
              quality={85}
              sizes="100vw"
            />
          </div>
        </div>

        {/* Produtos */}
        <div className="w-fit mx-auto">
          <div className="grid grid-cols-4">
            {produtos.map((produto) => {
              return (
                <ProductCard key={produto.id} produto={produto} promocao={33} estrelas={4.3} precoAntigo={220.43434} favoritado={true} freteGratis={true} />
              )
            }
            )}
          </div>

          {/* Carrinho e total*/}
          <div className="grid grid-cols-4 gap-20 mt-5 ">
            <ul className="flex flex-col gap-2 col-span-3">
              {cart.map((item) => (
                <li key={item.id} className="flex gap-4 bg-gray-100 p-2 rounded-md shadow-gray-400 shadow-xs ">
                  {item.name} - R$ {item.price.toFixed(2)}
                  <ul className="flex gap-2 items-center justify-center">
                    <li
                      className="border px-2 bg-green-500 text-slate-900 border-green-900 rounded-full cursor-pointer hover:bg-slate-900 hover:text-white select-none"
                      onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}>
                      -
                    </li>
                    <li>{item.quantity}</li>
                    <li
                      className="border px-2 bg-green-500 text-slate-900 border-green-900 rounded-full cursor-pointer hover:bg-slate-900 hover:text-white select-none"
                      onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}>
                      +
                    </li>
                  </ul>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded cursor-pointer"
                  >
                    Remover
                  </button>
                </li>
              ))}
            </ul>

            {/* Total, finalizar e limpar*/}
            <div className="flex flex-col gap-2 text-right justify-end">
              <h3 className="text-2xl text-green-400 rounded-md p-2 ">Total: R$ {totalPrice.toFixed(2)}</h3>

              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded cursor-pointer w-full ml-auto ">Finalizar Compra</button>
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded cursor-pointer w-full ml-auto " onClick={clearCart}>Limpar Carrinho</button>
            </div>
          </div>


          {/* Mensagens de sucesso e erro */}
          {/* {message && (
        <div
          role="alert"
          className={`fixed right-10 top-10 border px-2 py-1 text-2xl rounded-md border-black text-white ${foiAdicionado ? "bg-green-500" : "bg-red-500"
            }`}
        >
          {message}
        </div>
      )} */}


        </div >
        <Footer />
      </>}
  </>
  );
}
