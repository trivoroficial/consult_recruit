'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('admin@zenthos.com')
  const [password, setPassword] = useState('admin@2026')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          const { data: userData } = await supabase
            .from('usuarios')
            .select('role')
            .eq('id', user.id)
            .single()
          
          const role = userData?.role || 'candidato'
          if (role === 'admin') {
            router.push('/admin/dashboard')
          } else if (role === 'empresa') {
            router.push('/empresa/dashboard')
          } else {
            router.push('/candidato/dashboard')
          }
        }
      } catch (err) {
        console.error('Erro ao verificar usuário:', err)
      } finally {
        setChecking(false)
      }
    }
    checkUser()
  }, [router])

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
        const { data: userData } = await supabase
          .from('usuarios')
          .select('role')
          .eq('id', data.user.id)
          .single()
        
        const role = userData?.role || 'candidato'
        
        localStorage.setItem('zenthos_user', JSON.stringify({
          email: data.user.email,
          name: data.user.email?.split('@')[0] || 'Usuário',
          role: role,
          id: data.user.id
        }))

        if (role === 'admin') {
          window.location.href = '/admin/dashboard'
        } else if (role === 'empresa') {
          window.location.href = '/empresa/dashboard'
        } else {
          window.location.href = '/candidato/dashboard'
        }
      }
    } catch (err: any) {
      setError(err.message || 'Erro ao fazer login')
    } finally {
      setLoading(false)
    }
  }

  if (checking) {
    return (
      <div className="min-h-screen bg-[#F8F4E6] flex items-center justify-center">
        <p className="text-[#708090]">Verificando...</p>
      </div>
    )
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
              <label className="block text-sm font-medium text-[#2D343A] mb-1.5">Senha</label>
              <input
                type="password"
                required
                className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A] transition"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-[#6B1A2A] hover:bg-[#4A0E1A] text-white font-semibold rounded-lg transition-all duration-300 shadow-md shadow-[#6B1A2A]/20 hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
