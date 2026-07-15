'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Eye, EyeOff } from 'lucide-react'

export default function Login() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErro('')
    
    // SIMULAÇÃO DE LOGIN
    if (email === 'admin@zenthos.com' && password === 'admin123') {
      router.push('/admin/dashboard')
    } else {
      setErro('Email ou senha inválidos')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F4E6] px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-[#F8F4E6]">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-[#2D343A]">ZENTHOS</h1>
            <p className="text-xs font-light text-[#708090] tracking-wider uppercase mt-1">Gestão, Estratégia & Transformação</p>
            <h2 className="mt-4 text-xl font-semibold text-[#2D343A]">Bem-vindo</h2>
            <p className="text-sm text-[#708090]">Acesse sua conta</p>
          </div>

          {erro && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
              {erro}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#2D343A]">Email</label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 border border-[#F8F4E6] rounded-xl focus:border-[#8B0000] focus:ring-2 focus:ring-[#8B0000]/20 outline-none transition"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@zenthos.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#2D343A]">Senha</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="w-full px-4 py-3 border border-[#F8F4E6] rounded-xl focus:border-[#8B0000] focus:ring-2 focus:ring-[#8B0000]/20 outline-none transition pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-[#708090]"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 text-white bg-[#8B0000] rounded-lg hover:bg-[#700000] transition font-semibold shadow-md shadow-[#8B0000]/20"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[#708090]">
            Não tem uma conta?{' '}
            <Link href="/cadastro" className="text-[#8B0000] font-semibold hover:text-[#E3C9A8] transition">
              Solicitar acesso
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
