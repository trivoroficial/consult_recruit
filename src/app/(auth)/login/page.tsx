'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Eye, EyeOff, LogIn, CheckSquare, Square,
  Building2, Users, Shield, Sparkles,
  ArrowRight, ChevronRight, Lock, Mail,
  Fingerprint, Globe, Award, TrendingUp
} from 'lucide-react'
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

  // STATS DA PLATAFORMA
  const stats = [
    { value: '500+', label: 'Empresas', icon: Building2 },
    { value: '10K+', label: 'Candidatos', icon: Users },
    { value: '96%', label: 'Satisfação', icon: TrendingUp },
    { value: '15+', label: 'Anos', icon: Award },
  ]

  return (
    <div className="min-h-screen bg-[#F8F4E6] flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* BACKGROUND DECORATIVO */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[#8B0000]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-[#E3C9A8]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
        
        {/* ===== LADO ESQUERDO - BRANDING ===== */}
        <motion.div 
          className="hidden lg:flex flex-col justify-center p-8 bg-gradient-to-br from-[#2D343A] via-[#1A1A2E] to-[#0F0F1A] rounded-3xl text-white shadow-2xl relative overflow-hidden"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#8B0000]/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#E3C9A8]/10 rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10">
            {/* LOGO */}
            <div className="flex items-center gap-3 mb-8">
              <img src="/logo.png" alt="ZENTHOS" className="h-12 w-auto object-contain brightness-0 invert" />
              <span className="text-xs text-[#E3C9A8] uppercase tracking-widest font-medium border border-[#E3C9A8]/30 px-3 py-1 rounded-full">
                Enterprise
              </span>
            </div>

            <motion.h1 
              className="font-serif text-4xl lg:text-5xl font-bold leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Plataforma de <br />
              <span className="text-[#E3C9A8]">Recrutamento</span> e <br />
              <span className="text-[#E3C9A8]">Gestão de Talentos</span>
            </motion.h1>

            <motion.p 
              className="mt-4 text-white/60 text-sm leading-relaxed max-w-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Conectamos empresas e talentos com inteligência, eficiência e transparência. 
              A plataforma que transforma o recrutamento.
            </motion.p>

            {/* STATS */}
            <motion.div 
              className="mt-8 grid grid-cols-2 gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-[#E3C9A8]/10 rounded-lg">
                        <Icon className="h-4 w-4 text-[#E3C9A8]" />
                      </div>
                      <div>
                        <p className="text-xl font-bold text-white">{stat.value}</p>
                        <p className="text-xs text-white/50">{stat.label}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </motion.div>

            {/* FEATURES */}
            <motion.div 
              className="mt-8 space-y-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center gap-3 text-sm text-white/50">
                <Shield className="h-4 w-4 text-[#E3C9A8]" />
                <span>Segurança e conformidade LGPD</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/50">
                <Globe className="h-4 w-4 text-[#E3C9A8]" />
                <span>Disponível em múltiplos idiomas</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/50">
                <Sparkles className="h-4 w-4 text-[#E3C9A8]" />
                <span>IA para matching de talentos</span>
              </div>
            </motion.div>

            {/* DECORATIVO - TECNOLOGIA */}
            <div className="mt-8 flex items-center gap-2">
              <span className="text-xs text-white/30">Powered by</span>
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-white/20">Supabase</span>
                <span className="text-xs font-mono text-white/20">Next.js</span>
                <span className="text-xs font-mono text-white/20">AI</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ===== LADO DIREITO - LOGIN ===== */}
        <motion.div 
          className="bg-white rounded-3xl shadow-2xl p-8 lg:p-10 border border-[#E8EAE0]"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* HEADER */}
          <div className="text-center mb-8">
            <div className="lg:hidden flex justify-center mb-4">
              <img src="/logo.png" alt="ZENTHOS" className="h-10 w-auto object-contain" />
            </div>
            <h2 className="text-2xl font-bold text-[#2D343A]">Bem-vindo de volta</h2>
            <p className="text-sm text-[#708090] mt-1">Acesse sua conta para continuar</p>
          </div>

          {/* ERROR */}
          {error && (
            <motion.div 
              className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 text-sm flex items-start gap-3"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
              {error}
            </motion.div>
          )}

          {/* FORM */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* EMAIL */}
            <div>
              <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#708090]" />
                <input
                  type="email"
                  required
                  className="w-full pl-10 pr-4 py-3.5 border border-[#E8EAE0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B0000] focus:border-transparent transition bg-[#F8F4E6]/50"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* SENHA */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-[#2D343A]">
                  Senha
                </label>
                <Link href="/recuperar-senha" className="text-xs text-[#8B0000] hover:underline font-medium">
                  Esqueceu a senha?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#708090]" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="w-full pl-10 pr-12 py-3.5 border border-[#E8EAE0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B0000] focus:border-transparent transition bg-[#F8F4E6]/50"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#708090] hover:text-[#2D343A] transition"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* LGPD + REMEMBER ME */}
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-[#F8F4E6]/70 rounded-xl border border-[#E8EAE0]">
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
                    <motion.div 
                      className="mt-2 p-3 bg-white rounded-xl border border-[#E8EAE0] text-xs text-[#708090] max-h-40 overflow-y-auto"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                    >
                      <p className="font-semibold text-[#2D343A] mb-1">TERMOS DE USO E POLÍTICA DE PRIVACIDADE</p>
                      <p>A ZENTHOS coleta e armazena seus dados pessoais para fins de recrutamento e seleção.</p>
                      <button
                        type="button"
                        onClick={() => setMostrarLGPD(false)}
                        className="mt-2 text-[#8B0000] hover:underline text-xs font-medium"
                      >
                        Fechar
                      </button>
                    </motion.div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3 px-1">
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
            </div>

            {/* BOTÃO ENTRAR */}
            <button
              type="submit"
              disabled={loading || !aceitouLGPD}
              className="w-full py-3.5 bg-[#8B0000] hover:bg-[#700000] text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-[#8B0000]/20 hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                  Autenticando...
                </span>
              ) : (
                <>
                  <LogIn className="h-5 w-5" />
                  Entrar
                </>
              )}
            </button>

            {/* DIVIDER */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#E8EAE0]"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-3 bg-white text-[#708090]">ou</span>
              </div>
            </div>

            {/* CADASTRO */}
            <div className="text-center">
              <p className="text-sm text-[#708090]">
                Ainda não tem uma conta?{' '}
                <Link href="/cadastro" className="text-[#8B0000] font-semibold hover:underline">
                  Cadastre-se
                </Link>
              </p>
            </div>

            {/* CREDENCIAIS DE TESTE */}
            <div className="mt-4 p-3 bg-[#F8F4E6]/70 rounded-xl border border-[#E8EAE0]">
              <p className="text-xs text-[#708090] text-center">
                <span className="font-medium text-[#2D343A]">🔑 Credenciais de teste:</span>
                <br />
                <span className="text-[#8B0000] font-mono">admin@zenthos.com</span> / <span className="font-mono">Admin@123456</span>
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}
