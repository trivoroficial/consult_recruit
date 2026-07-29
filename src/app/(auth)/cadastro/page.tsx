'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Eye, EyeOff, UserPlus, CheckSquare, Square } from 'lucide-react'
import { supabase } from '@/lib/supabase/client'

export default function Cadastro() {
  const router = useRouter()
  const [form, setForm] = useState({
    nome: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [aceitouLGPD, setAceitouLGPD] = useState(false)
  const [mostrarLGPD, setMostrarLGPD] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!aceitouLGPD) {
      setError('Você precisa aceitar os termos da LGPD para continuar.')
      return
    }

    if (form.password !== form.confirmPassword) {
      setError('As senhas não coincidem.')
      return
    }

    setLoading(true)
    setError('')

    try {
      const { data, error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          data: {
            name: form.nome,
            role: 'candidato',
          },
        },
      })

      if (error) throw error

      if (data?.user) {
        // Salvar na tabela usuarios
        await supabase.from('usuarios').insert([
          {
            id: data.user.id,
            email: form.email,
            name: form.nome,
            role: 'candidato',
          },
        ])

        localStorage.setItem('zenthos_user', JSON.stringify({
          email: form.email,
          name: form.nome,
          role: 'candidato',
          id: data.user.id,
        }))

        router.push('/candidato/dashboard')
      }
    } catch (err: any) {
      setError(err.message || 'Erro ao criar conta. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-[#E8EAE0]">
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
            <label className="block text-sm font-medium text-[#2D343A] mb-1.5">Confirmar senha</label>
            <input
              type={showPassword ? 'text' : 'password'}
              required
              className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition"
              placeholder="••••••••"
              value={form.confirmPassword}
              onChange={(e) => setForm({...form, confirmPassword: e.target.value})}
            />
          </div>

          <div className="flex items-start gap-3 p-3 bg-[#F8F4E6] rounded-lg border border-[#E8EAE0]">
            <button
              type="button"
              onClick={() => setAceitouLGPD(!aceitouLGPD)}
              className="mt-0.5 flex-shrink-0"
            >
              {aceitouLGPD ? (
                <CheckSquare className="h-5 w-5 text-[#8B0000]" />
              ) : (
                <Square className="h-5 w-5 text-[#708090]" />
              )}
            </button>
            <div className="text-sm text-[#2D343A]">
              <p>
                Li e aceito os{' '}
                <button
                  type="button"
                  onClick={() => setMostrarLGPD(!mostrarLGPD)}
                  className="text-[#8B0000] hover:underline font-medium"
                >
                  Termos de Uso e Política de Privacidade (LGPD)
                </button>
              </p>
              {mostrarLGPD && (
                <div className="mt-2 p-3 bg-white rounded-lg border border-[#E8EAE0] text-xs text-[#708090] max-h-40 overflow-y-auto">
                  <p className="font-semibold text-[#2D343A] mb-1">TERMOS DE USO E POLÍTICA DE PRIVACIDADE</p>
                  <p>A ZENTHOS coleta e armazena seus dados pessoais para fins de recrutamento e seleção.</p>
                  <button
                    type="button"
                    onClick={() => setMostrarLGPD(false)}
                    className="mt-2 text-[#8B0000] hover:underline text-xs font-medium"
                  >
                    Fechar
                  </button>
                </div>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !aceitouLGPD}
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
