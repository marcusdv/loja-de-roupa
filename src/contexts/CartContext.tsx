'use client'
import { createContext, useContext, useState, ReactNode } from 'react';
import { Cart, CartItem, CartContextType } from '@/types/cart';

// Cria o contexto do carrinho
const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider que gerencia o estado do carrinho
export function CartProvider({ children }: { children: ReactNode }) {
    // Estado inicial do carrinho
    const [cart, setCart] = useState<Cart>({
        items: [],
        total: 0,
    });

    // Adiciona um item ao carrinho ou incrementa sua quantidade
    const addItem = (item: CartItem) => {
        setCart((prevCart) => {
            // Verifica se o item já existe no carrinho
            const existingItem = prevCart.items.find((i) => i.id === item.id);

            if (existingItem) {
                // Se existir, incrementa a quantidade
                const updatedItems = prevCart.items.map((i) =>
                    i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                );
                return {
                    items: updatedItems,
                    total: updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
                };
            }

            // Se não existir, adiciona como novo item
            const newItems = [...prevCart.items, { ...item, quantity: 1 }];
            return {
                items: newItems,
                total: newItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
            };
        });
    };

    // Remove um item do carrinho
    const removeItem = (itemId: string) => {
        setCart((prevCart) => {
            const updatedItems = prevCart.items.filter((item) => item.id !== itemId);
            return {
                items: updatedItems,
                total: updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
            };
        });
    };

    // Atualiza a quantidade de um item
    const updateQuantity = (itemId: string, quantity: number) => {
        if (quantity < 1) return; // Não permite quantidade negativa

        setCart((prevCart) => {
            const updatedItems = prevCart.items.map((item) =>
                item.id === itemId ? { ...item, quantity } : item
            );
            return {
                items: updatedItems,
                total: updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
            };
        });
    };

    // Limpa todo o carrinho
    const clearCart = () => {
        setCart({ items: [], total: 0 });
    };

    // Fornece o contexto para os componentes filhos
    return (
        <CartContext.Provider value={{ cart, addItem, removeItem, updateQuantity, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}

// Hook personalizado para usar o carrinho
export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}