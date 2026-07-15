'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Eye, EyeOff } from 'lucide-react'

export default function Cadastro() {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState('')
  const [form, setForm] = useState({
    nome: '',
    email: '',
    empresa: '',
    telefone: '',
    password: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErro('')
    
    // SIMULAÇÃO DE CADASTRO
    setTimeout(() => {
      setLoading(false)
      alert('Solicitação enviada! Aguarde o contato do administrador.')
      setForm({ nome: '', email: '', empresa: '', telefone: '', password: '' })
    }, 1500)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F4E6] px-4 py-8">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-[#F8F4E6]">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-[#2D343A]">ZENTHOS</h1>
            <p className="text-xs font-light text-[#708090] tracking-wider uppercase mt-1">Gestão, Estratégia & Transformação</p>
            <h2 className="mt-4 text-xl font-semibold text-[#2D343A]">Solicitar Acesso</h2>
            <p className="text-sm text-[#708090]">Preencha o formulário para solicitar acesso à plataforma</p>
          </div>

          {erro && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
              {erro}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#2D343A]">Nome completo</label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 border border-[#F8F4E6] rounded-xl focus:border-[#8B0000] focus:ring-2 focus:ring-[#8B0000]/20 outline-none transition"
                value={form.nome}
                onChange={(e) => setForm({...form, nome: e.target.value})}
                placeholder="Seu nome"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#2D343A]">Email</label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 border border-[#F8F4E6] rounded-xl focus:border-[#8B0000] focus:ring-2 focus:ring-[#8B0000]/20 outline-none transition"
                value={form.email}
                onChange={(e) => setForm({...form, email: e.target.value})}
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#2D343A]">Empresa</label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 border border-[#F8F4E6] rounded-xl focus:border-[#8B0000] focus:ring-2 focus:ring-[#8B0000]/20 outline-none transition"
                value={form.empresa}
                onChange={(e) => setForm({...form, empresa: e.target.value})}
                placeholder="Nome da sua empresa"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#2D343A]">Telefone</label>
              <input
                type="tel"
                required
                className="w-full px-4 py-3 border border-[#F8F4E6] rounded-xl focus:border-[#8B0000] focus:ring-2 focus:ring-[#8B0000]/20 outline-none transition"
                value={form.telefone}
                onChange={(e) => setForm({...form, telefone: e.target.value})}
                placeholder="(00) 00000-0000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#2D343A]">Senha</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="w-full px-4 py-3 border border-[#F8F4E6] rounded-xl focus:border-[#8B0000] focus:ring-2 focus:ring-[#8B0000]/20 outline-none transition pr-10"
                  value={form.password}
                  onChange={(e) => setForm({...form, password: e.target.value})}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-[#708090]"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 text-white bg-[#8B0000] rounded-lg hover:bg-[#700000] transition font-semibold shadow-md shadow-[#8B0000]/20"
            >
              {loading ? 'Enviando...' : 'Solicitar Acesso'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[#708090]">
            Já tem acesso?{' '}
            <Link href="/login" className="text-[#8B0000] font-semibold hover:text-[#E3C9A8] transition">
              Entrar
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
