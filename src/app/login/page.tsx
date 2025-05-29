'use client' // Necessário para usar hooks e interatividade no Next.js (Client Component)

import { useState } from 'react'
import { supabase } from '@/lib/supabase' // Supabase já deve estar configurado no projeto
import { useRouter } from 'next/navigation' // Para redirecionar após login

export default function LoginCadastro() {
  const router = useRouter()

  // Estados para o formulário de login
  const [emailLogin, setEmailLogin] = useState('')
  const [senhaLogin, setSenhaLogin] = useState('')
  const [erroLogin, setErroLogin] = useState('')

  // Estados para o formulário de cadastro
  const [emailCadastro, setEmailCadastro] = useState('')
  const [senhaCadastro, setSenhaCadastro] = useState('')
  const [erroCadastro, setErroCadastro] = useState('')
  const [mensagemSucesso, setMensagemSucesso] = useState('')

  // Função para logar com email e senha
  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setErroLogin('')

    // Autenticação com Supabase
    const { error } = await supabase.auth.signInWithPassword({
      email: emailLogin,
      password: senhaLogin,
    })

    if (error) {
      setErroLogin(error.message) // Mostra erro
    } else {
      router.push('/') // Redireciona para a página principal
    }
  }

  // Função para cadastro de novo usuário
  async function handleCadastro(e: React.FormEvent) {
    e.preventDefault()
    setErroCadastro('')
    setMensagemSucesso('')

    // Cadastro via Supabase
    const { error } = await supabase.auth.signUp({
      email: emailCadastro,
      password: senhaCadastro,
    })

    if (error) {
      setErroCadastro(error.message) // Mostra erro
    } else {
      setMensagemSucesso('Cadastro realizado! Verifique seu email.') // Mensagem de sucesso
    }
  }

  // Login com Google
  async function loginComGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    })

    if (error) {
      alert('Erro ao fazer login com Google: ' + error.message)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">

      {/* Grid com formulários de Login e Cadastro */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">

        {/* Formulário de Login */}
        <form onSubmit={handleLogin} className="flex flex-col gap-4 border-r md:pr-6">
          <h2 className="text-2xl font-bold mb-2">Login</h2>
          <input
            type="email"
            placeholder="Email"
            value={emailLogin}
            onChange={(e) => setEmailLogin(e.target.value)}
            className="border p-2 rounded"
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={senhaLogin}
            onChange={(e) => setSenhaLogin(e.target.value)}
            className="border p-2 rounded"
            required
          />
          <button type="submit" className="bg-black text-white py-2 rounded">Entrar</button>
          {erroLogin && <p className="text-red-500 text-sm">{erroLogin}</p>}
        </form>

        {/* Formulário de Cadastro */}
        <form onSubmit={handleCadastro} className="flex flex-col gap-4 md:pl-6">
          <h2 className="text-2xl font-bold mb-2">Cadastro</h2>
          <input
            type="email"
            placeholder="Email"
            value={emailCadastro}
            onChange={(e) => setEmailCadastro(e.target.value)}
            className="border p-2 rounded"
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={senhaCadastro}
            onChange={(e) => setSenhaCadastro(e.target.value)}
            className="border p-2 rounded"
            required
          />
          <button type="submit" className="bg-green-600 text-white py-2 rounded">Cadastrar</button>
          {erroCadastro && <p className="text-red-500 text-sm">{erroCadastro}</p>}
          {mensagemSucesso && <p className="text-green-600 text-sm">{mensagemSucesso}</p>}
        </form>
      </div>

      {/* Login com Google (social) */}
      <div className="mt-8 bg-white shadow p-6 rounded-lg w-full max-w-md text-center">
        <p className="mb-4 font-semibold">Ou entre com</p>
        <button
          onClick={loginComGoogle}
          className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded w-full"
        >
          {/* Ícone do Google */}
          <svg className="w-5 h-5" viewBox="0 0 533.5 544.3" fill="white">
            <path d="M533.5 278.4c0-18.6-1.6-36.6-4.6-54H272v102h147.2c-6.4 35.3-25.8 65.2-55 85.3v70h88.8c52-47.8 80.5-118.3 80.5-203.3z" />
            <path d="M272 544.3c73.5 0 135.1-24.3 180.1-65.9l-88.8-70c-24.7 16.6-56.4 26.3-91.3 26.3-70 0-129.3-47.3-150.5-110.9h-89.6v69.6c44.9 88.4 136.9 150.9 240.1 150.9z" />
            <path d="M121.5 323.7c-10.2-30-10.2-62.5 0-92.5v-69.6H31.9c-42.3 83.9-42.3 181.4 0 265.3l89.6-69.6z" />
            <path d="M272 107.7c38.6 0 73.2 13.3 100.6 39.3l75.6-75.6C408.5 24.1 346.9 0 272 0 168.8 0 76.8 62.5 31.9 150.9l89.6 69.6C142.7 155 202 107.7 272 107.7z" />
          </svg>
          Entrar com Google
        </button>
      </div>
    </div>
  )
}
