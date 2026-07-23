'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Eye, EyeOff, LogIn, CheckSquare, Square } from 'lucide-react'
import { supabase } from '@/lib/supabase/client'

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [aceitouLGPD, setAceitouLGPD] = useState(false)
  const [mostrarLGPD, setMostrarLGPD] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

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
        else router.push('/admin/dashboard')
      }
    }
    checkUser()
  }, [router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!aceitouLGPD) {
      setError('Você precisa aceitar os termos da LGPD para continuar.')
      return
    }

    setLoading(true)
    setError('')

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      if (data.user) {
        const { data: userData } = await supabase
          .from('usuarios')
          .select('role')
          .eq('id', data.user.id)
          .single()

        const role = userData?.role || 'admin'
        
        localStorage.setItem('zenthos_user', JSON.stringify({
          email: data.user.email,
          name: data.user.email?.split('@')[0] || 'Usuário',
          role: role,
          id: data.user.id
        }))

        if (role === 'admin') router.push('/admin/dashboard')
        else if (role === 'empresa') router.push('/empresa/dashboard')
        else if (role === 'candidato') router.push('/candidato/dashboard')
        else router.push('/admin/dashboard')
      }
    } catch (err: any) {
      setError(err.message || 'Erro ao fazer login. Verifique suas credenciais.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-[#E8EAE0]">
        {/* LOGO */}
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
              className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-sm font-medium text-[#2D343A]">Senha</label>
              <Link href="/recuperar-senha" className="text-xs text-[#8B0000] hover:underline">
                Esqueceu a senha?
              </Link>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition pr-12"
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

          {/* LGPD CHECKBOX */}
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
                  <p>A ZENTHOS coleta e armazena seus dados pessoais para fins de recrutamento e seleção. Seus dados serão utilizados exclusivamente para:</p>
                  <ul className="list-disc pl-4 mt-1 space-y-0.5">
                    <li>Processos seletivos e candidaturas</li>
                    <li>Comunicação sobre vagas e oportunidades</li>
                    <li>Análise de perfil e compatibilidade</li>
                    <li>Melhoria dos serviços da plataforma</li>
                  </ul>
                  <p className="mt-1">Você tem direito a acessar, corrigir ou excluir seus dados a qualquer momento.</p>
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

          {/* REMEMBER ME */}
          <div className="flex items-center gap-2 px-1">
            <button
              type="button"
              onClick={() => setRememberMe(!rememberMe)}
              className="flex items-center gap-2 text-sm text-[#708090] hover:text-[#2D343A] transition"
            >
              {rememberMe ? (
                <CheckSquare className="h-4 w-4 text-[#8B0000]" />
              ) : (
                <Square className="h-4 w-4 text-[#708090]" />
              )}
              Lembrar-me
            </button>
          </div>

          <button
            type="submit"
            disabled={loading || !aceitouLGPD}
            className="w-full py-3.5 bg-[#8B0000] hover:bg-[#700000] text-white font-semibold rounded-lg transition-all duration-300 shadow-md shadow-[#8B0000]/20 hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            {loading ? 'Entrando...' : (
              <>
                <LogIn className="h-5 w-5" />
                Entrar
              </>
            )}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-[#E8EAE0] text-center">
          <Link href="/cadastro" className="text-[#8B0000] hover:underline text-sm font-medium">
            Não tem uma conta? Cadastre-se
          </Link>
        </div>

        <div className="mt-4 text-center text-xs text-[#708090]">
          <p>Credenciais de teste:</p>
          <p className="mt-0.5">admin@zenthos.com / Admin@123456</p>
        </div>
      </div>
    </div>
  )
}
