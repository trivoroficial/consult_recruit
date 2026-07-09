'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Eye, EyeOff } from 'lucide-react'

export default function Cadastro() {
  const [showPassword, setShowPassword] = useState(false)
  const [tipo, setTipo] = useState('candidato')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Cadastro realizado com sucesso!')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-purple-50 px-4 py-8">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-purple-600">TRIVOR</h1>
            <h2 className="mt-2 text-xl font-semibold">Crie sua conta</h2>
            <p className="text-gray-500 text-sm">Comece sua jornada conosco</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nome completo</label>
              <input
                type="text"
                required
                className="input-default"
                placeholder="Seu nome"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                required
                className="input-default"
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

            <div>
              <label className="block text-sm font-medium text-gray-700">Sou</label>
              <div className="mt-1 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className={`py-2 rounded-lg border transition ${
                    tipo === 'candidato'
                      ? 'border-purple-600 bg-purple-50 text-purple-600'
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                  onClick={() => setTipo('candidato')}
                >
                  Candidato
                </button>
                <button
                  type="button"
                  className={`py-2 rounded-lg border transition ${
                    tipo === 'empresa'
                      ? 'border-purple-600 bg-purple-50 text-purple-600'
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                  onClick={() => setTipo('empresa')}
                >
                  Empresa
                </button>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <input type="checkbox" required className="mt-1" />
              <span className="text-sm text-gray-600">
                Li e aceito os{' '}
                <Link href="/termos" className="text-purple-600 hover:text-purple-700">
                  Termos de Uso
                </Link>
                {' e '}
                <Link href="/privacidade" className="text-purple-600 hover:text-purple-700">
                  Política de Privacidade
                </Link>
              </span>
            </div>

            <button type="submit" className="btn-primary btn-full">
              Criar conta
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Já tem uma conta?{' '}
            <Link href="/login" className="text-purple-600 font-medium hover:text-purple-700">
              Faça login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
