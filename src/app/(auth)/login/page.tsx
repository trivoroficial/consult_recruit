'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Eye, EyeOff } from 'lucide-react'
import { autenticar } from '@/lib/auth'

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

    const result = autenticar(email, password)

    if (!result.success || !result.user) {
      setErro(result.error || 'Erro ao fazer login')
      setLoading(false)
      return
    }

    const user = result.user

    // 1. Salvar no localStorage (para os sidebars)
    localStorage.setItem('trivor_user', JSON.stringify(user))
    localStorage.setItem('trivor_role', user.role)

    // 2. Salvar em cookie (para o middleware proteger as rotas)
    const cookieData = JSON.stringify(user)
    document.cookie = `trivor_user=${encodeURIComponent(cookieData)}; path=/; max-age=604800`
    document.cookie = `trivor_role=${user.role}; path=/; max-age=604800`

    setLoading(false)

    // 3. Redirecionar conforme o perfil
    switch (user.role) {
      case 'admin':
        router.push('/admin/dashboard')
        break
      case 'empresa':
        router.push('/empresa/dashboard')
        break
      case 'candidato':
        router.push('/candidato/dashboard')
        break
      default:
        router.push('/')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F7F4] px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-[#F1F1EF]">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-[#0F172A]">TRIVOR</h1>
            <h2 className="mt-2 text-xl font-semibold">Welcome Back</h2>
            <p className="text-gray-500 text-sm">Sign in to your account</p>
          </div>

          {erro && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
              {erro}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                required
                className="input-default"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
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
                <input type="checkbox" /> Remember me
              </label>
              <Link href="/recuperar-senha" className="text-sm text-[#C9A84C] hover:text-[#B8963A]">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary btn-full"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">Test Accounts:</p>
            <div className="mt-2 text-xs text-gray-400 space-y-1">
              <p>👑 Admin: admin@trivor.com / trivor2026</p>
              <p>🏢 Company: empresa@trivor.com / trivor2026</p>
              <p>👤 Talent: candidato@trivor.com / trivor2026</p>
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link href="/cadastro" className="text-[#C9A84C] font-medium hover:text-[#B8963A]">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
