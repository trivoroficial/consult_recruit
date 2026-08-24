'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, LogIn, Loader2 } from 'lucide-react'
import { supabase } from '@/lib/supabase/client'

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      if (data?.user) {
        // 🔧 FIX: Tentar buscar role, mas se falhar, usar 'candidato' como fallback
        let role = 'candidato'
        let name = email.split('@')[0] || 'Usuário'

        try {
          const { data: userData } = await supabase
            .from('usuarios')
            .select('role, name')
            .eq('id', data.user.id)
            .single()
          
          if (userData) {
            role = userData.role || 'candidato'
            name = userData.name || name
          }
        } catch (err) {
          console.warn('Erro ao buscar role, usando fallback:', err)
        }

        // Salvar no localStorage
        localStorage.setItem('zenthos_user', JSON.stringify({
          email: data.user.email,
          name: name,
          role: role,
          id: data.user.id
        }))

        // Salvar cookie
        document.cookie = `zenthos_user=${JSON.stringify({
          email: data.user.email,
          role: role,
          id: data.user.id
        })}; path=/; max-age=86400`

        // Redirecionar baseado no role
        if (role === 'admin') {
          window.location.href = '/admin/dashboard'
        } else if (role === 'empresa') {
          window.location.href = '/empresa/dashboard'
        } else {
          window.location.href = '/candidato/dashboard'
        }
      }
    } catch (err: any) {
      console.error('Erro no login:', err)
      setError(err.message || 'Erro ao fazer login.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F8F4E6] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-[#E8EAE0]">
          <div className="text-center mb-8">
            <img src="/logo.png" alt="ZENTHOS" className="h-[1.5cm] w-auto mx-auto object-contain" />
            <h2 className="text-2xl font-bold text-[#2D343A] mt-4">Acesse sua conta</h2>
            <p className="text-sm text-[#708090] mt-1">Entre com suas credenciais</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#2D343A] mb-1.5">Email</label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A] transition"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-[#2D343A]">Senha</label>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A] transition pr-12"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#708090] hover:text-[#2D343A]"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-[#6B1A2A] hover:bg-[#4A0E1A] text-white font-semibold rounded-lg transition-all duration-300 shadow-md shadow-[#6B1A2A]/20 hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Entrando...
                </>
              ) : (
                <>
                  <LogIn className="h-5 w-5" />
                  Entrar
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-[#E8EAE0] text-center">
            <Link href="/cadastro" className="text-[#6B1A2A] hover:underline text-sm font-medium">
              Não tem uma conta? Cadastre-se
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
