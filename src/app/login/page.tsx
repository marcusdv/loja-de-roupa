'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabase';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    // Função de tratamento de login assíncrona
    const handleLogin = async (e: React.FormEvent) => {
        // Previne o comportamento padrão de envio do formulário
        e.preventDefault();
        // Limpa qualquer mensagem de erro anterior
        setError('');
        // Tenta realizar o login com o e-mail e senha fornecidos
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        // Se o login falhar, exibe a mensagem de erro
        if (error) {
            setError(error.message);
        } else {
            // Se o login for bem-sucedido, redireciona para a página de dashboard
            router.push('/dashboard'); // Redireciona para a página desejada
        }
    };

    return (
        <form onSubmit={handleLogin} className="max-w-sm mx-auto mt-10 space-y-4">
            <input
                className="border w-full px-4 py-2"
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={e => setEmail(e.target.value)}
                autoComplete="email"
                required
            />
            <input
                className="border w-full px-4 py-2"
                type="password"
                placeholder="Senha"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
            />
            <button
                type="submit"
                className="w-full bg-black text-white py-2 hover:bg-gray-800"
            >
                Entrar
            </button>
            {error && <p className="text-red-500">{error}</p>}
        </form>
    );
}
