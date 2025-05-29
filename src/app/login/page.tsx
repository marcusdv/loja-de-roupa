'use client'; // Habilita o uso de hooks do React neste componente, obrigatório para usar useState e useRouter no App Router do Next.js

import { useState } from 'react'; // Importa o hook para gerenciar estado local
import { useRouter } from 'next/navigation'; // Importa o hook para redirecionamento de rotas
import { supabase } from '../../lib/supabase'; // Importa a instância configurada do Supabase

// Componente principal da página de login
export default function LoginPage() {
  // Estados para armazenar os dados do formulário e mensagens de erro
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter(); // Hook para navegação de páginas

  // Função executada quando o formulário é enviado
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Impede o recarregamento da página ao enviar o formulário
    setError(''); // Limpa mensagens de erro anteriores

    // Realiza a autenticação com o Supabase usando e-mail e senha
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    // Se houver erro, exibe a mensagem para o usuário
    if (error) {
      setError(error.message);
    } else {
      // Se o login for bem-sucedido, redireciona para a dashboard
      router.push('/dashboard');
    }
  };

  return (
    // Container que centraliza o formulário na tela
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      {/* Cartão branco com sombra e cantos arredondados */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6">
        <h1 className="text-center text-2xl font-semibold">Bem-vindo de volta</h1>
        <p className="text-center text-gray-500">Faça login na sua conta</p>

        {/* Formulário de login */}
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Campo de e-mail */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)} // Atualiza o estado com o valor digitado
              autoComplete="email"
              required
              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Campo de senha */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Senha
            </label>
            <input
              id="password"
              type="password"
              placeholder="********"
              value={password}
              onChange={e => setPassword(e.target.value)} // Atualiza o estado com a senha digitada
              required
              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Mensagem de erro, se houver */}
          {error && <p className="text-sm text-red-600 text-center">{error}</p>}

          {/* Botão de envio */}
          <button
            type="submit"
            className="w-full bg-black text-white rounded-lg py-2 font-semibold hover:bg-gray-800 transition-colors"
          >
            Entrar
          </button>
        </form>

        {/* Links adicionais: esqueceu senha e criar conta */}
        <div className="flex justify-between text-sm">
          <a href="/forgot-password" className="text-blue-600 hover:underline">
            Esqueceu a senha?
          </a>
          <a href="/signup" className="text-blue-600 hover:underline">
            Criar conta
          </a>
        </div>
      </div>
    </div>
  );
}
