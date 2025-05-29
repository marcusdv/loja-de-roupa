'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabase';

export default function SignupPage() {
  // Estados para armazenar os dados do formulário
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [erro, setErro] = useState('');
  const router = useRouter();

  // Função executada ao enviar o formulário
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');

    // Converte o valor de idade para número
    const idadeNumerica = parseInt(idade);

    // Verifica se a idade é um número válido e se é pelo menos 18
    if (isNaN(idadeNumerica) || idadeNumerica < 18) {
      setErro('Você precisa ter pelo menos 18 anos para se cadastrar.');
      return; // Interrompe o fluxo para não continuar com o cadastro
    }

    // Verifica se as senhas coincidem
    if (senha !== confirmarSenha) {
      setErro('As senhas não coincidem');
      return;
    }

    // Realiza o cadastro com o Supabase, passando nome e idade como dados adicionais
    const { error } = await supabase.auth.signUp({
      email,
      password: senha,
      options: {
        data: { nome, idade: idadeNumerica },
      },
    });

    // Trata erros ou redireciona
    if (error) {
      setErro(error.message);
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <div className="flex justify-center md:py-20 bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6">
        <h1 className="text-center text-2xl font-semibold">Criar conta</h1>
        <form onSubmit={handleSignup} className="space-y-4">
          
          {/* Campo Nome */}
          <div>
            <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
              Nome completo
            </label>
            <input
              id="nome"
              type="text"
              value={nome}
              onChange={e => setNome(e.target.value)}
              required
              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>

          {/* Campo Idade */}
          <div>
            <label htmlFor="idade" className="block text-sm font-medium text-gray-700">
              Idade
            </label>
            <input
              id="idade"
              type="number"
              value={idade}
              onChange={e => setIdade(e.target.value)}
              required
              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2"
              min={18} // opcional: já limita o input para no mínimo 18
            />
          </div>

          {/* Campo E-mail */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="email"
              required
              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>

          {/* Campo Senha */}
          <div>
            <label htmlFor="senha" className="block text-sm font-medium text-gray-700">
              Senha
            </label>
            <input
              id="senha"
              type="password"
              value={senha}
              onChange={e => setSenha(e.target.value)}
              required
              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>

          {/* Campo Confirmar Senha */}
          <div>
            <label htmlFor="confirmarSenha" className="block text-sm font-medium text-gray-700">
              Confirmar senha
            </label>
            <input
              id="confirmarSenha"
              type="password"
              value={confirmarSenha}
              onChange={e => setConfirmarSenha(e.target.value)}
              required
              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>

          {/* Exibe erro se houver */}
          {erro && <p className="text-sm text-red-600 text-center">{erro}</p>}

          {/* Botão de criar conta */}
          <button
            type="submit"
            className="w-full bg-black text-white rounded-lg py-2 font-semibold hover:bg-gray-800 transition-colors"
          >
            Criar conta
          </button>
        </form>

        {/* Link para login */}
        <div className="text-center text-sm">
          Já tem uma conta?{' '}
          <a href="/login" className="text-blue-600 hover:underline">
            Entrar
          </a>
        </div>
      </div>
    </div>
  );
}
