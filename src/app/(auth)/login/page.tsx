'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Eye, EyeOff, LogIn, CheckSquare, Square, ArrowLeft } from 'lucide-react'
import { supabase } from '@/lib/supabase/client'

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('')  // ✅ VAZIO - SEGURO
  const [password, setPassword] = useState('')  // ✅ VAZIO - SEGURO
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [aceitouLGPD, setAceitouLGPD] = useState(false)
  const [mostrarLGPD, setMostrarLGPD] = useState(false)

  // Verificar se já está logado
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data: userData } = await supabase
          .from('usuarios')
          .select('role')
          .eq('id', user.id)
          .single()

        const role = userData?.role || 'admin'
        if (role === 'admin') router.push('/admin/dashboard')
        else if (role === 'empresa') router.push('/empresa/dashboard')
        else if (role === 'candidato') router.push('/candidato/dashboard')
      }
    }
    checkUser()
  }, [router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    // ✅ VALIDAÇÃO DE LGPD MANTIDA
    if (!aceitouLGPD) {
      setError('Você precisa aceitar os termos da LGPD para continuar.')
      return
    }

    // ✅ VALIDAÇÃO DE CAMPOS VAZIOS (NOVA)
    if (!email || !password) {
      setError('Preencha todos os campos.')
      return
    }

    setLoading(true)
    setError('')

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      // ✅ TRATAMENTO DE ERRO ESPECÍFICO
      if (error) {
        if (error.message === 'Invalid login credentials') {
          setError('Email ou senha inválidos. Tente novamente.')
        } else {
          setError(error.message || 'Erro ao fazer login.')
        }
        setLoading(false)
        return
      }

      if (data?.user) {
        // ✅ BUSCAR ROLE DO USUÁRIO
        const { data: userData } = await supabase
          .from('usuarios')
          .select('role')
          .eq('id', data.user.id)
          .single()

        const role = userData?.role || 'admin'
        
        // ✅ SALVAR APENAS INFORMAÇÕES BÁSICAS (SEM SENHA!)
        localStorage.setItem('zenthos_user', JSON.stringify({
          email: data.user.email,
          name: data.user.email?.split('@')[0] || 'Usuário',
          role: role,
          id: data.user.id
        }))

        // ✅ REDIRECIONAMENTO POR ROLE
        if (role === 'admin') router.push('/admin/dashboard')
        else if (role === 'empresa') router.push('/empresa/dashboard')
        else if (role === 'candidato') router.push('/candidato/dashboard')
        else router.push('/admin/dashboard')
      }
    } catch (err: any) {
      setError('Erro ao fazer login. Tente novamente.')
      console.error('Erro no login:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-[#E8EAE0]">
        {/* BOTÃO VOLTAR */}
        <div className="mb-6">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-sm text-[#708090] hover:text-[#6B1A2A] transition"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para o site
          </Link>
        </div>

        <div className="text-center mb-8">
          <img src="/logo.png" alt="ZENTHOS" className="h-[1.5cm] w-auto mx-auto object-contain" />
          <h2 className="text-2xl font-bold text-[#2D343A] mt-4">Acesse sua conta</h2>
          <p className="text-sm text-[#708090] mt-1">Entre com suas credenciais</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm flex items-start gap-2">
            <span className="text-red-500 text-lg">⚠️</span>
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
              autoComplete="off"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2D343A] mb-1.5">Senha</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A] transition pr-12"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="off"
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

          {/* ✅ LGPD MANTIDO */}
          <div className="flex items-start gap-3 p-3 bg-[#F8F4E6] rounded-lg border border-[#E8EAE0]">
            <button
              type="button"
              onClick={() => setAceitouLGPD(!aceitouLGPD)}
              className="mt-0.5 flex-shrink-0"
            >
              {aceitouLGPD ? (
                <CheckSquare className="h-5 w-5 text-[#6B1A2A]" />
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
                  className="text-[#6B1A2A] hover:underline font-medium"
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
                    className="mt-2 text-[#6B1A2A] hover:underline text-xs font-medium"
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
            className="w-full py-3.5 bg-[#6B1A2A] hover:bg-[#4A0E1A] text-white font-semibold rounded-lg transition-all duration-300 shadow-md shadow-[#6B1A2A]/20 hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-50 disabled:hover:translate-y-0"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                Entrando...
              </span>
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

        {/* ✅ CREDENCIAIS REMOVIDAS - SEGURANÇA */}
        <div className="mt-4 text-center text-xs text-[#708090]">
          <p className="text-[#708090]/50">🔒 Ambiente seguro com criptografia</p>
        </div>
      </div>
    </div>
  )
}
