'use client'

import { useCart } from './contexts/CartContext'
import Image from 'next/image'


export default function Loja() {

  const { cart, /*addToCart,*/ removeFromCart, updateQuantity, clearCart, /*totalItems,*/ totalPrice } = useCart();


  return (
    <>
      {/* Banner */}
      <div className="w-full h-screen" >
        <div className="relative w-full h-full">
          <Image
            src="/modelo-home.jpg"
            alt="Modelo"
            fill
            priority
            className="object-cover"
            quality={85}
            sizes="100vw"
          />
        </div>
      </div >

      <div className="w-fit mx-auto">

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
      </div >
    </>
  );
}
