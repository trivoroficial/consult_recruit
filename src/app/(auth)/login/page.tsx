'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Eye, EyeOff, ArrowRight } from 'lucide-react'

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
    
    setTimeout(() => {
      setLoading(false)
      
      // ADMIN
      if (email === 'admin@zenthos.com' && password === 'admin123') {
        const userData = JSON.stringify({ 
          name: 'Administrador', 
          email, 
          role: 'admin',
          perfilCompleto: true 
        })
        localStorage.setItem('zenthos_user', userData)
        // SALVAR COOKIE PARA O MIDDLEWARE
        document.cookie = `zenthos_user=${encodeURIComponent(userData)}; path=/; max-age=86400`
        router.push('/admin/dashboard')
        return
      } 
      
      // EMPRESA
      if (email === 'empresa@zenthos.com' && password === 'empresa123') {
        const userData = JSON.stringify({ 
          name: 'Empresa XPTO', 
          email, 
          role: 'empresa',
          perfilCompleto: true 
        })
        localStorage.setItem('zenthos_user', userData)
        document.cookie = `zenthos_user=${encodeURIComponent(userData)}; path=/; max-age=86400`
        router.push('/empresa/dashboard')
        return
      } 
      
      // CANDIDATO
      if (email === 'candidato@zenthos.com' && password === 'candidato123') {
        const userData = JSON.stringify({ 
          name: 'João Silva', 
          email, 
          role: 'candidato',
          perfilCompleto: true 
        })
        localStorage.setItem('zenthos_user', userData)
        document.cookie = `zenthos_user=${encodeURIComponent(userData)}; path=/; max-age=86400`
        router.push('/candidato/dashboard')
        return
      }
      
      setErro('Email ou senha inválidos')
    }, 1500)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F4E6] px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-[#E8EAE0]">
          
          {/* LOGO */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="relative h-[1.5cm] w-auto">
                <img 
                  src="/logo.png" 
                  alt="ZENTHOS" 
                  className="h-full w-auto object-contain"
                />
              </div>
              <div className="flex flex-col text-left">
                <div className="flex items-center gap-1">
                  <span className="text-xl font-bold tracking-tight">
                    <span className="text-[#8B4513]">ZEN</span><span className="text-[#708090]">THOS</span>
                  </span>
                  <span className="text-[8px] font-light text-[#8B0000] align-top mt-[-2px]">™</span>
                </div>
                <span className="text-[9px] font-light text-[#708090] tracking-[0.15em] uppercase whitespace-nowrap">
                  Gestão, Estratégia & Transformação
                </span>
              </div>
            </Link>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-[#2D343A]">Bem-vindo de volta</h2>
            <p className="text-sm text-[#708090] mt-1">Acesse sua conta ZENTHOS</p>
          </div>

          {erro && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{erro}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                Email
              </label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] focus:border-transparent transition-all duration-200 bg-[#F8F4E6]/50"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                Senha
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] focus:border-transparent transition-all duration-200 bg-[#F8F4E6]/50 pr-12"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#708090] hover:text-[#2D343A] transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-[#708090] cursor-pointer">
                <input type="checkbox" className="rounded border-[#E8EAE0] text-[#8B0000] focus:ring-[#8B0000]" />
                Lembrar-me
              </label>
              <Link href="/recuperar-senha" className="text-[#8B0000] hover:text-[#700000] transition-colors font-medium">
                Esqueceu a senha?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-[#8B0000] hover:bg-[#700000] text-white font-semibold rounded-lg transition-all duration-300 shadow-md shadow-[#8B0000]/20 hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-[#708090]">
              Não tem uma conta?{' '}
              <Link href="/cadastro" className="text-[#8B0000] hover:text-[#700000] font-medium transition-colors">
                Cadastre-se
              </Link>
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-[#E8EAE0]">
            <p className="text-xs text-[#708090] text-center mb-3">🔑 Credenciais de teste</p>
            <div className="grid grid-cols-1 gap-1.5 text-xs text-[#708090]">
              <p><span className="font-medium text-[#2D343A]">Admin:</span> admin@zenthos.com / admin123</p>
              <p><span className="font-medium text-[#2D343A]">Empresa:</span> empresa@zenthos.com / empresa123</p>
              <p><span className="font-medium text-[#2D343A]">Candidato:</span> candidato@zenthos.com / candidato123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
