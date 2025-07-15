'use client';
import {useCart} from '@/contexts/CartContext';
import { useToast } from '@/contexts/ToastContext';
import { useRouter } from 'next/navigation';


export default function CheckoutPage() {
    const { cart, clearCart } = useCart();
    const { showToast } = useToast();
    const router = useRouter();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        // Obter dados do formulário
        // const formData = new FormData(event.currentTarget);
        
        // Preparar dados para salvar no banco posteriormente
        // const orderData = {
        //     cliente: formData.get('nome') as string,
        //     email: formData.get('email') as string,
        //     endereco: formData.get('endereco') as string,
        //     itens: cart.items,
        //     total: cart.total,
        //     data: new Date().toISOString()
        // };
        
        // Aqui você implementaria a lógica para processar o pagamento
        // e salvar o pedido no banco de dados (tabela carrinhos do Supabase)
        
        // Em produção, seria algo como:
        // try {
        //   const { data, error } = await supabase.from('carrinhos').insert([orderData]);
        //   if (error) throw error;
        //   console.log('Pedido salvo:', data);
        // } catch (error) {
        //   console.error('Erro ao salvar pedido:', error);
        //   showToast('Erro ao processar pedido. Tente novamente.', 3000);
        //   return;
        // }
        
        // Simulando processamento
        showToast("Processando seu pedido...", 2000);
        
        // Redirecionar para a página de sucesso após um pequeno delay
        // para simular o processamento do pagamento
        setTimeout(() => {
            clearCart();
            router.push('/checkout/success');
        }, 1500);
    };

    return (
        <div className="p-4 w-8/12 mx-auto">
            <h2 className="text-2xl font-bold mb-4">Checkout</h2>

            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-xl font-semibold mb-4">Resumo do Pedido</h3>
                {cart.items.length === 0 ? (
                    <p className="text-gray-500">Seu carrinho está vazio.</p>
                ) : (
                    <ul className="space-y-4">
                        {cart.items.map((item) => (
                            <li key={item.id} className="flex justify-between items-center">
                                <span>{item.name} (x{item.quantity})</span>
                                <span>R$ {item.price.toFixed(2)}</span>
                            </li>
                        ))}
                    </ul>
                )}
                <div className="mt-4 font-semibold text-green-600">
                    Total: R$ {cart.total.toFixed(2)}
                </div>
            </div>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 bg-white rounded-lg shadow-md p-8 mt-6">
                <div>
                    <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">Nome completo</label>
                    <input
                        className="border border-slate-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                        type="text"
                        name="nome"
                        id="nome"
                        placeholder="Digite seu nome completo"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
                    <input
                        className="border border-slate-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                        type="email"
                        name="email"
                        id="email"
                        placeholder="seu@email.com"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="endereco" className="block text-sm font-medium text-gray-700 mb-1">Endereço</label>
                    <input
                        className="border border-slate-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                        type="text"
                        name="endereco"
                        id="endereco"
                        placeholder="Rua, número, bairro, cidade"
                        required
                    />
                </div>
                {/* ...outros campos... */}
                <button
                    type="submit"
                    className="bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition"
                >
                    Finalizar compra
                </button>
            </form>
        </div>
    )
}