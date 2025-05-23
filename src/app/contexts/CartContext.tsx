'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '../../types/types';

type CartContextType = {
    cart: Product[], // Array de produtos no carrinho
    addToCart: (product: Product) => void, // Função para adicionar um produto no carrinho
    removeFromCart: (productId: number) => void, // Função para remover um produto do carrinho
    updateQuantity: (productId: number, newQuantity: number) => void, // Função para atualizar a quantidade de um produto no carrinho
    clearCart: () => void,
    totalItems: number,
    totalPrice: number,
}

const CartContext = createContext<CartContextType | undefined>(undefined); // Cria um contexto global para o carrinho

// Provider do contexto
export function CartProvider({ children }: { children: ReactNode }) {

    const [cart, setCart] = useState<Product[]>(() => {
        if (typeof window === "undefined") return []; // Garante que só execute no cliente
        const storedCart = localStorage.getItem("cart"); // Lê o carrinho do localStorage
        return storedCart ? JSON.parse(storedCart) : [];
    });


    // Persiste o carrinho no localStorage
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);


    // adiciona ou incrimenta um produto no carrinho
    const addToCart = (product: Product) => {
        console.log('addToCart => ', product)
        setCart(prevCart => {
            const existingProduct = prevCart.find(item => item.id === product.id); // Verifica se o produto já está no carrinho returnando o índice do produto se existir ou -1 se não existir

            if (existingProduct) { // Se o produto já estiver no carrinho, atualiza a quantidade
                return prevCart.map(item =>
                    item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item // Atualiza a quantidade do produto. O fallback (que está entre parenteses) [é para evitar erros.
                )
            }
            return [...prevCart, { ...product, product, quantity: 1 }] // Se o produto não estiver no carrinho, adiciona-o com a quantidade 1
        })
    }

    // Remove um produto
    const removeFromCart = (productId: number) => {
        setCart(prevCart => prevCart.filter(item => item.id !== productId))
    }

    // Atualiza a quantidade de um produto
    const updateQuantity = (productId: number, newQuantity: number) => {
        if (newQuantity < 1) return; // prvine que a quantidade não seja menor que 1

        setCart(prevCart =>
            prevCart.map(item => item.id === productId ? { ...item, quantity: newQuantity } : item)
        )

    }

    // Limpa o carrinho
    const clearCart = () => { setCart([]) }

    // Calcula totais
    const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0)  // Soma a quantidade de itens no carrinho
    const totalPrice = cart.reduce((sum, item) =>
        sum + item.price * (item.quantity || 1) // total + preço do produto * quantidade 
        , 0
    )

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                totalItems,
                totalPrice,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error('useCart must be used within a CartProvider')
    }

    return context
}