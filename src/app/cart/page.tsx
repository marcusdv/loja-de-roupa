'use client'
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Trash2, Plus, Minus } from 'lucide-react';
import Image from 'next/image';

export default function Cart() {
  const { cart, removeItem, updateQuantity } = useCart();

  if (cart.items.length === 0) {
    return (
      <div className="p-4 text-center">
        <p>Seu carrinho está vazio</p>
      </div>
    );
  }

  return (
    <div className="p-4 w-8/12 mx-auto">
      <h2 className="text-2xl font-bold mb-4">Carrinho de Compras</h2>
      <div className="space-y-4">
        {cart.items.map((item) => (
          <div key={item.id} className="flex items-center justify-between border-b pb-4">
            <div className="flex items-center space-x-4">
              {item.image && (
                <div className="relative w-16 h-16">
                  <Image
                    src={'https://placehold.co/500x500.png'}
                    alt={item.name}
                    fill
                    sizes="64px"
                    className="object-cover rounded"
                    priority={true}
                    loading="eager"
                  />
                </div>
              )}
              <div>
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm text-gray-500">
                  R$ {item.price.toFixed(2)}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center">{item.quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeItem(item.id)}
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t">
        <div className="flex justify-between items-center">
          <span className="font-bold">Total:</span>
          <span className="font-bold">R$ {cart.total.toFixed(2)}</span>
        </div>
        {/* 
        O prop `asChild` permite que o componente Button use outro elemento (como <a>) como seu filho direto,
        mantendo os estilos e comportamentos do Button. Assim, o <a> recebe as propriedades do Button.
        */}
        <Button className="w-full mt-4" asChild>
          <a href="/checkout">Finalizar Compra</a>
        </Button>
      </div>
    </div>
  );
} 