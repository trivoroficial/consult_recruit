'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { SidebarAdmin } from '@/components/dashboard/SidebarAdmin'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import { Calendar, ArrowLeft, Save, CheckCircle, XCircle } from 'lucide-react'
import { buscarEventoPorId, atualizarEvento } from '@/actions/agenda'

export default function EditarEvento() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState({
    titulo: '',
    descricao: '',
    data: '',
    hora_inicio: '',
    hora_fim: '',
    local: '',
    tipo: 'compromisso',
    status: 'pendente',
    responsavel: '',
    observacoes: ''
  })

  useEffect(() => {
    carregarEvento()
  }, [id])

  const carregarEvento = async () => {
    try {
      const result = await buscarEventoPorId(parseInt(id))
      if (result.success) {
        const data = result.data
        setForm({
          titulo: data.titulo || '',
          descricao: data.descricao || '',
          data: data.data || '',
          hora_inicio: data.hora_inicio || '',
          hora_fim: data.hora_fim || '',
          local: data.local || '',
          tipo: data.tipo || 'compromisso',
          status: data.status || 'pendente',
          responsavel: data.responsavel || '',
          observacoes: data.observacoes || ''
        })
      } else {
        setError(result.error || 'Erro ao carregar evento')
      }
    } catch (err) {
      setError('Erro ao carregar evento')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Validação
      if (!form.titulo.trim()) {
        setError('O título é obrigatório')
        setLoading(false)
        return
      }

      if (!form.data) {
        setError('A data é obrigatória')
        setLoading(false)
        return
      }

      const result = await atualizarEvento(parseInt(id), form)
      
      if (result.success) {
        setSuccess(true)
        setTimeout(() => {
          router.push('/admin/agenda')
        }, 2000)
      } else {
        setError(result.error || 'Erro ao atualizar evento')
        setLoading(false)
      }
    } catch (err: any) {
      console.error('Erro:', err)
      setError(err.message || 'Erro ao atualizar evento')
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
              <h2 className="text-2xl font-bold text-[#2D343A]">Evento atualizado com sucesso!</h2>
              <button
                onClick={() => router.push('/admin/agenda')}
                className="mt-6 px-6 py-2 bg-[#6B1A2A] text-white rounded-lg hover:bg-[#4A0E1A] transition"
              >
                Voltar para Agenda
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
              onClick={() => router.push('/admin/agenda')}
              className="p-2 hover:bg-[#F8F4E6] rounded-lg transition"
            >
              <ArrowLeft className="h-5 w-5 text-[#708090]" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-[#2D343A] flex items-center gap-2">
                <Calendar className="h-6 w-6 text-[#6B1A2A]" />
                Editar Evento
              </h1>
              <p className="text-sm text-[#708090]">Atualize os dados do evento</p>
            </div>
          </div>
        </header>

        <div className="flex-1 p-8">
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-8">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm flex items-center gap-2">
                <XCircle className="h-4 w-4 flex-shrink-0" />
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Título */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                  Título <span className="text-[#6B1A2A]">*</span>
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A] transition"
                  value={form.titulo}
                  onChange={(e) => setForm({...form, titulo: e.target.value})}
                  placeholder="Título do evento"
                />
              </div>

              {/* Descrição */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#2D343A] mb-1.5">Descrição</label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A] transition resize-none"
                  value={form.descricao}
                  onChange={(e) => setForm({...form, descricao: e.target.value})}
                  placeholder="Descrição do evento..."
                />
              </div>

              {/* Data */}
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

              {/* Hora Início */}
              <div>
                <label className="block text-sm font-medium text-[#2D343A] mb-1.5">Hora Início</label>
                <input
                  type="time"
                  className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A] transition"
                  value={form.hora_inicio}
                  onChange={(e) => setForm({...form, hora_inicio: e.target.value})}
                />
              </div>

              {/* Hora Fim */}
              <div>
                <label className="block text-sm font-medium text-[#2D343A] mb-1.5">Hora Fim</label>
                <input
                  type="time"
                  className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A] transition"
                  value={form.hora_fim}
                  onChange={(e) => setForm({...form, hora_fim: e.target.value})}
                />
              </div>

              {/* Local */}
              <div>
                <label className="block text-sm font-medium text-[#2D343A] mb-1.5">Local</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A] transition"
                  value={form.local}
                  onChange={(e) => setForm({...form, local: e.target.value})}
                  placeholder="Local do evento"
                />
              </div>

              {/* Tipo */}
              <div>
                <label className="block text-sm font-medium text-[#2D343A] mb-1.5">Tipo</label>
                <select
                  className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A] transition"
                  value={form.tipo}
                  onChange={(e) => setForm({...form, tipo: e.target.value})}
                >
                  <option value="compromisso">Compromisso</option>
                  <option value="entrevista">Entrevista</option>
                  <option value="reuniao">Reunião</option>
                  <option value="outro">Outro</option>
                </select>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-[#2D343A] mb-1.5">Status</label>
                <select
                  className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A] transition"
                  value={form.status}
                  onChange={(e) => setForm({...form, status: e.target.value})}
                >
                  <option value="pendente">Pendente</option>
                  <option value="confirmado">Confirmado</option>
                  <option value="cancelado">Cancelado</option>
                </select>
              </div>

              {/* Responsável */}
              <div>
                <label className="block text-sm font-medium text-[#2D343A] mb-1.5">Responsável</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A] transition"
                  value={form.responsavel}
                  onChange={(e) => setForm({...form, responsavel: e.target.value})}
                  placeholder="Nome do responsável"
                />
              </div>

              {/* Observações */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#2D343A] mb-1.5">Observações</label>
                <textarea
                  rows={3}
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
              <button
                type="button"
                onClick={() => router.push('/admin/agenda')}
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
