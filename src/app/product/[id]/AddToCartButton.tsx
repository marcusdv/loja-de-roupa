"use client";
import { useCart } from "@/contexts/CartContext";

export default function AddToCartButton({ produto }: { produto: { id: number; nome: string; preco: number } }) {
  const { addItem } = useCart();

  return (
    <button
      onClick={() => addItem({ id: produto.id.toString(), name: produto.nome, price: produto.preco, quantity: 1 })}
      className="mt-6 bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition cursor-pointer "
    >
      Adicionar ao carrinho
    </button>
  );
}