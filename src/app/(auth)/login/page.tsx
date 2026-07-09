'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Eye, EyeOff } from 'lucide-react'

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Login realizado com sucesso!')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-purple-50 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-purple-600">TRIVOR</h1>
            <h2 className="mt-2 text-xl font-semibold">Bem-vindo de volta</h2>
            <p className="text-gray-500 text-sm">Entre com suas credenciais</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                required
                className="input-default"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Senha</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="input-default pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-gray-600">
                <input type="checkbox" /> Lembrar-me
              </label>
              <Link href="/recuperar-senha" className="text-sm text-purple-600 hover:text-purple-700">
                Esqueceu a senha?
              </Link>
            </div>

            <button type="submit" className="btn-primary btn-full">
              Entrar
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Não tem uma conta?{' '}
            <Link href="/cadastro" className="text-purple-600 font-medium hover:text-purple-700">
              Cadastre-se
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
