'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { SidebarAdmin } from '@/components/dashboard/SidebarAdmin'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import {
  Calendar, ArrowLeft, Save, CheckCircle,
  Clock, MapPin, Users, FileText, User,
  Building2, MessageCircle, Briefcase, List
} from 'lucide-react'
import { criarEntrevistaOperacional, listarParticipantes, listarProcessosOperacionais } from '@/actions/operacional'

export default function NovaEntrevistaOperacional() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [participantes, setParticipantes] = useState<any[]>([])
  const [processos, setProcessos] = useState<any[]>([])
  const [form, setForm] = useState({
    participanteId: '',
    processoId: '',
    titulo: '',
    data: new Date().toISOString().split('T')[0],
    hora: '09:00',
    local: '',
    entrevistador: '',
    modelo: 'padrao',
    observacoes: ''
  })

  useEffect(() => {
    carregarDados()
  }, [])

  const carregarDados = async () => {
    try {
      const [participantesResult, processosResult] = await Promise.all([
        listarParticipantes(),
        listarProcessosOperacionais()
      ])
      if (participantesResult.success) {
        setParticipantes(participantesResult.data || [])
      }
      if (processosResult.success) {
        setProcessos(processosResult.data || [])
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const result = await criarEntrevistaOperacional(form)
      if (result.success) {
        setSuccess(true)
        setTimeout(() => {
          router.push('/admin/operacional/entrevistas')
        }, 2000)
      } else {
        setError(result.error || 'Erro ao agendar entrevista')
        setLoading(false)
      }
    } catch (err) {
      setError('Erro ao agendar entrevista')
      setLoading(false)
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
              <h2 className="text-2xl font-bold text-[#2D343A]">Entrevista agendada com sucesso!</h2>
              <p className="text-[#708090] mt-2">
                A entrevista {form.titulo} foi agendada.
              </p>
              <button
                onClick={() => router.push('/admin/operacional/entrevistas')}
                className="mt-6 px-6 py-2 bg-[#6B1A2A] text-white rounded-lg hover:bg-[#4A0E1A] transition"
              >
                Voltar para Entrevistas
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
              onClick={() => router.push('/admin/operacional/entrevistas')}
              className="p-2 hover:bg-[#F8F4E6] rounded-lg transition"
            >
              <ArrowLeft className="h-5 w-5 text-[#708090]" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-[#2D343A] flex items-center gap-2">
                <Calendar className="h-6 w-6 text-[#6B1A2A]" />
                Nova Entrevista
              </h1>
              <p className="text-sm text-[#708090]">Agende uma nova entrevista operacional</p>
            </div>
          </div>
        </header>

        <div className="flex-1 p-8">
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-8">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                  Participante <span className="text-[#6B1A2A]">*</span>
                </label>
                <select
                  required
                  className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A] transition"
                  value={form.participanteId}
                  onChange={(e) => setForm({...form, participanteId: e.target.value})}
                >
                  <option value="">Selecione um participante...</option>
                  {participantes.map((p) => (
                    <option key={p.id} value={p.id}>{p.nome}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#2D343A] mb-1.5">Processo</label>
                <select
                  className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A] transition"
                  value={form.processoId}
                  onChange={(e) => setForm({...form, processoId: e.target.value})}
                >
                  <option value="">Sem processo</option>
                  {processos.map((p) => (
                    <option key={p.id} value={p.id}>{p.nome}</option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                  Título da Entrevista <span className="text-[#6B1A2A]">*</span>
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A] transition"
                  value={form.titulo}
                  onChange={(e) => setForm({...form, titulo: e.target.value})}
                  placeholder="Entrevista - Operador de Produção"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                  Data <span className="text-[#6B1A2A]">*</span>
                </label>
                <input
                  type="date"
                  required
                  className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A] transition"
                  value={form.data}
                  onChange={(e) => setForm({...form, data: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                  Hora <span className="text-[#6B1A2A]">*</span>
                </label>
                <input
                  type="time"
                  required
                  className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A] transition"
                  value={form.hora}
                  onChange={(e) => setForm({...form, hora: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                  Local <span className="text-[#6B1A2A]">*</span>
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A] transition"
                  value={form.local}
                  onChange={(e) => setForm({...form, local: e.target.value})}
                  placeholder="Sala de Entrevistas, Online..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                  Entrevistador <span className="text-[#6B1A2A]">*</span>
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A] transition"
                  value={form.entrevistador}
                  onChange={(e) => setForm({...form, entrevistador: e.target.value})}
                  placeholder="Nome do entrevistador"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#2D343A] mb-1.5">Modelo</label>
                <select
                  className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A] transition"
                  value={form.modelo}
                  onChange={(e) => setForm({...form, modelo: e.target.value})}
                >
                  <option value="padrao">Padrão</option>
                  <option value="operacional">Operacional</option>
                  <option value="administrativa">Administrativa</option>
                  <option value="lideranca">Liderança</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#2D343A] mb-1.5">Observações</label>
                <textarea
                  rows={2}
                  className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A] transition resize-none"
                  value={form.observacoes}
                  onChange={(e) => setForm({...form, observacoes: e.target.value})}
                  placeholder="Observações adicionais..."
                />
              </div>
            </div>

            <div className="flex items-center gap-4 mt-8 pt-6 border-t border-[#E8EAE0]">
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 bg-[#6B1A2A] text-white rounded-lg hover:bg-[#4A0E1A] transition font-medium flex items-center gap-2 disabled:opacity-50"
              >
                <Save className="h-5 w-5" />
                {loading ? 'Agendando...' : 'Agendar Entrevista'}
              </button>
              <button
                type="button"
                onClick={() => router.push('/admin/operacional/entrevistas')}
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
