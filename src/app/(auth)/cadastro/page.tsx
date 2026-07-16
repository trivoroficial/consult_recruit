'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Eye, EyeOff, ArrowRight, UserPlus } from 'lucide-react'

export default function Cadastro() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState('')
  const [form, setForm] = useState({
    nome: '',
    email: '',
    password: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErro('')
    
    // SIMULAÇÃO DE CADASTRO
    setTimeout(() => {
      setLoading(false)
      
      // VALIDAÇÃO BÁSICA
      if (!form.nome || !form.email || !form.password) {
        setErro('Preencha todos os campos')
        return
      }

      // CRIA CONTA E FAZ LOGIN AUTOMÁTICO
      localStorage.setItem('zenthos_user', JSON.stringify({ 
        name: form.nome, 
        email: form.email, 
        role: 'candidato',
        perfilCompleto: false,
        isNew: true
      }))

      // REDIRECIONA PARA COMPLETAR PERFIL
      router.push('/candidato/completar-perfil')
      
    }, 1500)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F4E6] px-4 py-8">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-[#E8EAE0]">
          
          {/* LOGO */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <img 
                src="/logo-zenthos.png" 
                alt="ZENTHOS" 
                className="h-12 w-auto object-contain"
              />
              <div className="flex flex-col text-left">
                <div className="flex items-center gap-1">
                  <span className="text-xl font-bold tracking-tight">
                    <span className="text-[#8B4513]">ZEN</span><span className="text-[#708090]">THOS</span>
                  </span>
                  <span className="text-[8px] font-light text-[#8B0000] align-top mt-[-2px]">™</span>
                </div>
                <span className="text-[9px] font-light text-[#708090] tracking-[0.15em] uppercase whitespace-nowrap">
                  Gestão, Estratégia & Transformación
                </span>
              </div>
            </Link>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-[#2D343A]">Crie sua conta</h2>
            <p className="text-sm text-[#708090] mt-1">Cadastre-se e comece sua jornada</p>
          </div>

          {erro && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{erro}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                Nome completo
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] focus:border-transparent transition-all duration-200 bg-[#F8F4E6]/50"
                value={form.nome}
                onChange={(e) => setForm({...form, nome: e.target.value})}
                placeholder="Seu nome completo"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                Email
              </label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] focus:border-transparent transition-all duration-200 bg-[#F8F4E6]/50"
                value={form.email}
                onChange={(e) => setForm({...form, email: e.target.value})}
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
                  value={form.password}
                  onChange={(e) => setForm({...form, password: e.target.value})}
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

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-[#8B0000] hover:bg-[#700000] text-white font-semibold rounded-lg transition-all duration-300 shadow-md shadow-[#8B0000]/20 hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Criando conta...' : 'Criar conta'}
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-[#708090]">
              Já tem uma conta?{' '}
              <Link href="/login" className="text-[#8B0000] hover:text-[#700000] font-medium transition-colors">
                Faça login
              </Link>
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-[#E8EAE0]">
            <p className="text-xs text-[#708090] text-center">
              ✅ Após o cadastro, você será redirecionado para completar seu perfil.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
