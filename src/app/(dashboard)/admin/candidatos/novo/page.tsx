'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { SidebarAdmin } from '@/components/dashboard/SidebarAdmin'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import { User, Mail, Phone, MapPin, Briefcase, Save, ArrowLeft, CheckCircle } from 'lucide-react'

// Importação centralizada da Action
import { salvarCandidatoNoBanco } from '@/actions/candidatos'

export default function NovoCandidato() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  
  const [form, setForm] = useState({
    nome: '',
    email: '',
    telefone: '',
    whatsapp: '',
    cidade: '',
    estado: '',
    cargo: '',
    experiencia: '',
    competencias: '',
    resumo: '',
    status: 'Disponível'
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const resultado = await salvarCandidatoNoBanco(form)
    
    setLoading(false)

    if (resultado.success) {
      setSuccess(true)
      setTimeout(() => router.push('/admin/candidatos'), 2000)
    } else {
      setError(resultado.message)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
        <SidebarAdmin />
        <div className="flex-1 ml-64 flex flex-col min-h-screen">
          <div className="flex-1 p-8 flex items-center justify-center">
            <div className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-12 text-center max-w-md w-full">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-[#2D343A]">Candidato cadastrado com sucesso!</h2>
              <p className="text-[#708090] mt-2">
                O candidato {form.nome} foi salvo no banco de dados.
              </p>
              <button
                onClick={() => router.push('/admin/candidatos')}
                className="mt-6 px-6 py-2 bg-[#8B0000] text-white rounded-lg hover:bg-[#700000] transition"
              >
                Voltar para Candidatos
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
      <SidebarAdmin />
      
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <header className="bg-white border-b border-[#E8EAE0] px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => router.push('/admin/candidatos')}
              className="p-2 hover:bg-[#F8F4E6] rounded-lg transition"
            >
              <ArrowLeft className="h-5 w-5 text-[#708090]" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-[#2D343A] flex items-center gap-2">
                <User className="h-6 w-6 text-[#8B0000]" />
                Novo Candidato
              </h1>
              <p className="text-sm text-[#708090]">Cadastre um novo candidato na plataforma</p>
            </div>
          </div>
        </header>

        <div className="flex-1 p-8">
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-8">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                Erro: {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                  Nome completo <span className="text-[#8B0000]">*</span>
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition"
                  value={form.nome}
                  onChange={(e) => setForm({...form, nome: e.target.value})}
                  placeholder="Nome completo"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                  Email <span className="text-[#8B0000]">*</span>
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition"
                  value={form.email}
                  onChange={(e) => setForm({...form, email: e.target.value})}
                  placeholder="candidato@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                  Telefone
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition"
                  value={form.telefone}
                  onChange={(e) => setForm({...form, telefone: e.target.value})}
                  placeholder="(00) 0000-0000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                  WhatsApp
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition"
                  value={form.whatsapp}
                  onChange={(e) => setForm({...form, whatsapp: e.target.value})}
                  placeholder="(00) 00000-0000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                  Cidade
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition"
                  value={form.cidade}
                  onChange={(e) => setForm({...form, cidade: e.target.value})}
                  placeholder="Uberlândia"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                  Estado
                </label>
                <select
                  className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition"
                  value={form.estado}
                  onChange={(e) => setForm({...form, estado: e.target.value})}
                >
                  <option value="">Selecione...</option>
                  <option value="MG">MG</option><option value="SP">SP</option>
                  <option value="RJ">RJ</option><option value="GO">GO</option>
                  <option value="PR">PR</option><option value="RS">RS</option>
                  <option value="SC">SC</option><option value="BA">BA</option>
                  <option value="PE">PE</option><option value="CE">CE</option>
                  <option value="DF">DF</option><option value="MT">MT</option>
                  <option value="MS">MS</option><option value="PA">PA</option>
                  <option value="AM">AM</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                  Cargo pretendido
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition"
                  value={form.cargo}
                  onChange={(e) => setForm({...form, cargo: e.target.value})}
                  placeholder="Analista Administrativo"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                  Experiência profissional
                </label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition resize-none"
                  value={form.experiencia}
                  onChange={(e) => setForm({...form, experiencia: e.target.value})}
                  placeholder="Descreva a experiência do candidato..."
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                  Competências
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition"
                  value={form.competencias}
                  onChange={(e) => setForm({...form, competencias: e.target.value})}
                  placeholder="Excel, Liderança, Comunicação, Gestão..."
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                  Resumo profissional
                </label>
                <textarea
                  rows={2}
                  className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition resize-none"
                  value={form.resumo}
                  onChange={(e) => setForm({...form, resumo: e.target.value})}
                  placeholder="Resumo sobre o candidato..."
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                  Status
                </label>
                <select
                  className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition"
                  value={form.status}
                  onChange={(e) => setForm({...form, status: e.target.value})}
                >
                  <option value="Disponível">Disponível</option>
                  <option value="Em processo">Em processo</option>
                  <option value="Contratado">Contratado</option>
                  <option value="Inativo">Inativo</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-4 mt-8 pt-6 border-t border-[#E8EAE0]">
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 bg-[#8B0000] text-white rounded-lg hover:bg-[#700000] transition font-medium flex items-center gap-2 disabled:opacity-50"
              >
                <Save className="h-5 w-5" />
                {loading ? 'Salvando no Banco...' : 'Cadastrar Candidato'}
              </button>
              <button
                type="button"
                onClick={() => router.push('/admin/candidatos')}
                className="px-8 py-3 border border-[#E8EAE0] rounded-lg hover:bg-[#F8F4E6] transition text-[#708090]"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>

        <DashboardFooter />
      </div>
    </div>
  )
}
