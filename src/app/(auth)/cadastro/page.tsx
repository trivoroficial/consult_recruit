// src/app/(auth)/cadastro/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Eye, EyeOff, UserPlus, CheckCircle } from 'lucide-react'
import { supabase } from '@/lib/supabase/client'

export default function Cadastro() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({
    nome: '',
    email: '',
    password: '',
    role: 'candidato'
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // 1. Criar usuário no Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          data: {
            name: form.nome,
            role: form.role
          }
        }
      })

      if (error) throw error

      if (data.user) {
        // 2. Salvar no localStorage para compatibilidade
        localStorage.setItem('zenthos_user', JSON.stringify({
          email: form.email,
          name: form.nome,
          role: form.role,
          id: data.user.id
        }))

        // 3. Redirecionar baseado no role
        setSuccess(true)
        setTimeout(() => {
          if (form.role === 'candidato') {
            router.push('/candidato/completar-perfil')
          } else if (form.role === 'empresa') {
            router.push('/empresa/dashboard')
          } else {
            router.push('/admin/dashboard')
          }
        }, 2000)
      }
    } catch (err: any) {
      setError(err.message || 'Erro ao criar conta. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-[#E8EAE0] text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-[#2D343A]">Conta criada com sucesso!</h2>
          <p className="text-[#708090] mt-2">
            Bem-vindo(a) à ZENTHOS! Você será redirecionado(a) em instantes.
          </p>
          <div className="mt-4 animate-pulse text-[#8B0000]">Aguarde...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-[#E8EAE0]">
        {/* LOGO */}
        <div className="text-center mb-8">
          <img src="/logo.png" alt="ZENTHOS" className="h-[1.5cm] w-auto mx-auto object-contain" />
          <h2 className="text-2xl font-bold text-[#2D343A] mt-4">Crie sua conta</h2>
          <p className="text-sm text-[#708090] mt-1">Comece sua jornada na ZENTHOS</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#2D343A] mb-1.5">Nome completo</label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition"
              placeholder="Seu nome completo"
              value={form.nome}
              onChange={(e) => setForm({...form, nome: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2D343A] mb-1.5">Email</label>
            <input
              type="email"
              required
              className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition"
              placeholder="seu@email.com"
              value={form.email}
              onChange={(e) => setForm({...form, email: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2D343A] mb-1.5">Senha</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                minLength={6}
                className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition pr-12"
                placeholder="•••••••• (mínimo 6 caracteres)"
                value={form.password}
                onChange={(e) => setForm({...form, password: e.target.value})}
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

          <div>
            <label className="block text-sm font-medium text-[#2D343A] mb-1.5">Tipo de conta</label>
            <select
              className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition"
              value={form.role}
              onChange={(e) => setForm({...form, role: e.target.value})}
            >
              <option value="candidato">👤 Candidato</option>
              <option value="empresa">🏢 Empresa</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-[#8B0000] hover:bg-[#700000] text-white font-semibold rounded-lg transition-all duration-300 shadow-md shadow-[#8B0000]/20 hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? 'Criando conta...' : (
              <>
                <UserPlus className="h-5 w-5" />
                Criar conta
              </>
            )}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-[#E8EAE0] text-center">
          <Link href="/login" className="text-[#8B0000] hover:underline text-sm font-medium">
            Já tem uma conta? Faça login
          </Link>
        </div>
      </div>
    </div>
  )
}
