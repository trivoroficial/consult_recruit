'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { User, Mail, Phone, MapPin, Briefcase, Save, CheckCircle, XCircle, Award, GraduationCap, Upload } from 'lucide-react'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'

export default function CandidatoPerfil() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
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
    escolaridade: ''
  })

  useEffect(() => {
    const userData = localStorage.getItem('zenthos_user')
    if (userData) {
      try {
        const parsed = JSON.parse(userData)
        setForm(prev => ({
          ...prev,
          nome: parsed.name || '',
          email: parsed.email || ''
        }))
      } catch {}
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    try {
      // TODO: Integrar com Supabase
      await new Promise(resolve => setTimeout(resolve, 1500))
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err: any) {
      setError(err.message || 'Erro ao atualizar perfil')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
      <div className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#2D343A] flex items-center gap-2">
            <User className="h-6 w-6 text-[#6B1A2A]" />
            Meu Perfil
          </h1>
          <p className="text-sm text-[#708090]">Gerencie suas informações pessoais e profissionais</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-6 max-w-4xl">
          {/* Avatar */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 bg-[#6B1A2A]/10 rounded-full flex items-center justify-center text-[#6B1A2A] text-3xl font-bold">
              {form.nome.charAt(0).toUpperCase() || 'C'}
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#2D343A]">{form.nome || 'Candidato'}</h2>
              <p className="text-sm text-[#708090]">Candidato</p>
              <button className="mt-1 text-xs text-[#6B1A2A] hover:underline flex items-center gap-1">
                <Upload className="h-3 w-3" />
                Alterar foto
              </button>
            </div>
          </div>

          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4 text-sm flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Perfil atualizado com sucesso!
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm flex items-center gap-2">
              <XCircle className="h-4 w-4" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                  Nome Completo <span className="text-[#6B1A2A]">*</span>
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2.5 border border-[#E8EAE0] rounded-lg focus:ring-2 focus:ring-[#6B1A2A] focus:outline-none transition"
                  value={form.nome}
                  onChange={(e) => setForm({...form, nome: e.target.value})}
                  placeholder="Seu nome completo"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                  Email <span className="text-[#6B1A2A]">*</span>
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-2.5 border border-[#E8EAE0] rounded-lg focus:ring-2 focus:ring-[#6B1A2A] focus:outline-none transition"
                  value={form.email}
                  onChange={(e) => setForm({...form, email: e.target.value})}
                  placeholder="seu@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#2D343A] mb-1.5">Telefone</label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 border border-[#E8EAE0] rounded-lg focus:ring-2 focus:ring-[#6B1A2A] focus:outline-none transition"
                  value={form.telefone}
                  onChange={(e) => setForm({...form, telefone: e.target.value})}
                  placeholder="(00) 0000-0000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#2D343A] mb-1.5">WhatsApp</label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 border border-[#E8EAE0] rounded-lg focus:ring-2 focus:ring-[#6B1A2A] focus:outline-none transition"
                  value={form.whatsapp}
                  onChange={(e) => setForm({...form, whatsapp: e.target.value})}
                  placeholder="(00) 00000-0000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#2D343A] mb-1.5">Cidade</label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 border border-[#E8EAE0] rounded-lg focus:ring-2 focus:ring-[#6B1A2A] focus:outline-none transition"
                  value={form.cidade}
                  onChange={(e) => setForm({...form, cidade: e.target.value})}
                  placeholder="Sua cidade"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#2D343A] mb-1.5">Estado</label>
                <select
                  className="w-full px-4 py-2.5 border border-[#E8EAE0] rounded-lg focus:ring-2 focus:ring-[#6B1A2A] focus:outline-none transition"
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
              <div>
                <label className="block text-sm font-medium text-[#2D343A] mb-1.5">Cargo Pretendido</label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 border border-[#E8EAE0] rounded-lg focus:ring-2 focus:ring-[#6B1A2A] focus:outline-none transition"
                  value={form.cargo}
                  onChange={(e) => setForm({...form, cargo: e.target.value})}
                  placeholder="Ex: Analista Administrativo"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#2D343A] mb-1.5">Escolaridade</label>
                <select
                  className="w-full px-4 py-2.5 border border-[#E8EAE0] rounded-lg focus:ring-2 focus:ring-[#6B1A2A] focus:outline-none transition"
                  value={form.escolaridade}
                  onChange={(e) => setForm({...form, escolaridade: e.target.value})}
                >
                  <option value="">Selecione...</option>
                  <option value="Ensino Médio">Ensino Médio</option>
                  <option value="Graduação">Graduação</option>
                  <option value="Pós-Graduação">Pós-Graduação</option>
                  <option value="Mestrado">Mestrado</option>
                  <option value="Doutorado">Doutorado</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                  Experiência Profissional
                </label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-2.5 border border-[#E8EAE0] rounded-lg focus:ring-2 focus:ring-[#6B1A2A] focus:outline-none transition resize-none"
                  value={form.experiencia}
                  onChange={(e) => setForm({...form, experiencia: e.target.value})}
                  placeholder="Descreva sua experiência profissional..."
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                  Competências <span className="text-xs text-[#708090]">(separadas por vírgula)</span>
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 border border-[#E8EAE0] rounded-lg focus:ring-2 focus:ring-[#6B1A2A] focus:outline-none transition"
                  value={form.competencias}
                  onChange={(e) => setForm({...form, competencias: e.target.value})}
                  placeholder="React, TypeScript, Node.js, Gestão de Projetos"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#2D343A] mb-1.5">Resumo</label>
                <textarea
                  rows={2}
                  className="w-full px-4 py-2.5 border border-[#E8EAE0] rounded-lg focus:ring-2 focus:ring-[#6B1A2A] focus:outline-none transition resize-none"
                  value={form.resumo}
                  onChange={(e) => setForm({...form, resumo: e.target.value})}
                  placeholder="Breve resumo sobre você..."
                />
              </div>
            </div>

            <div className="flex items-center gap-4 mt-6 pt-6 border-t border-[#E8EAE0]">
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 bg-[#6B1A2A] text-white rounded-lg hover:bg-[#4A0E1A] transition font-medium flex items-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                    Salvando...
                  </>
                ) : (
                  <>
                    <Save className="h-5 w-5" />
                    Salvar Alterações
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      <DashboardFooter />
    </div>
  )
}
