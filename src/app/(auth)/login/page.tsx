'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, LogIn, CheckSquare, Square, Key, Mail, X, ArrowLeft, Loader2 } from 'lucide-react'
import { supabase } from '@/lib/supabase/client'

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [aceitouLGDP, setAceitouLGDP] = useState(false)
  const [mostrarLGDP, setMostrarLGDP] = useState(false)
  const [mostrarRecuperar, setMostrarRecuperar] = useState(false)
  const [emailRecuperar, setEmailRecuperar] = useState('')
  const [recuperarLoading, setRecuperarLoading] = useState(false)
  const [recuperarStatus, setRecuperarStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [recuperarMensagem, setRecuperarMensagem] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!aceitouLGDP) {
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

      if (data?.user) {
        // 🔧 CORREÇÃO: Buscar o role do usuário no banco
        const { data: userData, error: userError } = await supabase
          .from('usuarios')
          .select('role, name')
          .eq('id', data.user.id)
          .single()

        if (userError) {
          console.error('Erro ao buscar role do usuário:', userError)
        }

        const role = userData?.role || 'candidato'
        const name = userData?.name || data.user.email?.split('@')[0] || 'Usuário'

        // Salvar no localStorage com o role correto
        localStorage.setItem('zenthos_user', JSON.stringify({
          email: data.user.email,
          name: name,
          role: role,
          id: data.user.id
        }))

        // Salvar cookie para o middleware
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
      setError(err.message || 'Erro ao fazer login. Verifique suas credenciais.')
    } finally {
      setLoading(false)
    }
  }

  const handleRecuperarSenha = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!emailRecuperar) {
      setRecuperarStatus('error')
      setRecuperarMensagem('Por favor, informe seu email.')
      return
    }

    setRecuperarLoading(true)
    setRecuperarStatus('idle')
    setRecuperarMensagem('')

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(emailRecuperar, {
        redirectTo: `${window.location.origin}/recuperar-senha`,
      })

      if (error) throw error

      setRecuperarStatus('success')
      setRecuperarMensagem(`Link de recuperação enviado para ${emailRecuperar}.`)
      setTimeout(() => {
        setMostrarRecuperar(false)
        setEmailRecuperar('')
        setRecuperarStatus('idle')
        setRecuperarMensagem('')
      }, 5000)
    } catch (err: any) {
      setRecuperarStatus('error')
      setRecuperarMensagem(err.message || 'Erro ao enviar email.')
    } finally {
      setRecuperarLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F8F4E6] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-[#E8EAE0]">
          {/* Botão Voltar */}
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
                <button
                  type="button"
                  onClick={() => setMostrarRecuperar(true)}
                  className="text-xs text-[#6B1A2A] hover:underline font-medium"
                >
                  Esqueci minha senha
                </button>
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

            {/* LGPD Checkbox */}
            <div className="flex items-start gap-3 p-3 bg-[#F8F4E6] rounded-lg border border-[#E8EAE0]">
              <button
                type="button"
                onClick={() => setAceitouLGDP(!aceitouLGDP)}
                className="mt-0.5 flex-shrink-0"
              >
                {aceitouLGDP ? (
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
                    onClick={() => setMostrarLGDP(!mostrarLGDP)}
                    className="text-[#6B1A2A] hover:underline font-medium"
                  >
                    Termos de Uso e Política de Privacidade (LGPD)
                  </button>
                </p>
                {mostrarLGDP && (
                  <div className="mt-2 p-3 bg-white rounded-lg border border-[#E8EAE0] text-xs text-[#708090] max-h-40 overflow-y-auto">
                    <p className="font-semibold text-[#2D343A] mb-1">TERMOS DE USO E POLÍTICA DE PRIVACIDADE</p>
                    <p>A ZENTHOS coleta e armazena seus dados pessoais para fins de recrutamento e seleção.</p>
                    <button
                      type="button"
                      onClick={() => setMostrarLGDP(false)}
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
              disabled={loading || !aceitouLGDP}
              className="w-full py-3.5 bg-[#6B1A2A] hover:bg-[#4A0E1A] text-white font-semibold rounded-lg transition-all duration-300 shadow-md shadow-[#6B1A2A]/20 hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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

        {/* Modal Recuperar Senha */}
        {mostrarRecuperar && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative border border-[#E8EAE0]">
              <button
                onClick={() => {
                  setMostrarRecuperar(false)
                  setEmailRecuperar('')
                  setRecuperarStatus('idle')
                  setRecuperarMensagem('')
                }}
                className="absolute top-4 right-4 p-2 hover:bg-[#F8F4E6] rounded-lg transition"
              >
                <X className="h-5 w-5 text-[#708090]" />
              </button>

              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-[#6B1A2A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Key className="h-8 w-8 text-[#6B1A2A]" />
                </div>
                <h2 className="text-2xl font-bold text-[#2D343A]">Recuperar Senha</h2>
                <p className="text-sm text-[#708090] mt-1">Digite seu email para receber o link</p>
              </div>

              {recuperarMensagem && (
                <div className={`p-3 rounded-lg mb-4 text-sm ${recuperarStatus === 'success' ? 'bg-green-50 border border-green-200 text-green-700' : 'bg-red-50 border border-red-200 text-red-700'}`}>
                  {recuperarMensagem}
                </div>
              )}

              <form onSubmit={handleRecuperarSenha}>
                <label className="block text-sm font-medium text-[#2D343A] mb-1.5">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#708090]" />
                  <input
                    type="email"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A] transition"
                    placeholder="seu@email.com"
                    value={emailRecuperar}
                    onChange={(e) => setEmailRecuperar(e.target.value)}
                  />
                </div>

                <div className="flex gap-3 mt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setMostrarRecuperar(false)
                      setEmailRecuperar('')
                      setRecuperarStatus('idle')
                      setRecuperarMensagem('')
                    }}
                    className="flex-1 py-3 border border-[#E8EAE0] rounded-lg hover:bg-[#F8F4E6] transition text-[#708090] font-medium"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={recuperarLoading}
                    className="flex-1 py-3 bg-[#6B1A2A] text-white rounded-lg hover:bg-[#4A0E1A] transition font-medium flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {recuperarLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        <Mail className="h-4 w-4" />
                        Enviar
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
