'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { SidebarAdmin } from '@/components/dashboard/SidebarAdmin'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import { Calendar, Plus, Search, Edit, Trash2, Eye, RefreshCw, Clock, MapPin, User } from 'lucide-react'
import { listarEventos, excluirEvento } from '@/actions/agenda'

export default function AdminAgenda() {
  const router = useRouter()
  const [eventos, setEventos] = useState<any[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    carregarEventos()
  }, [])

  const carregarEventos = async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await listarEventos()
      if (result.success) {
        setEventos(result.data || [])
      } else {
        setError(result.error || 'Erro ao carregar eventos')
      }
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar eventos')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir este evento?')) return
    try {
      const result = await excluirEvento(id)
      if (result.success) {
        await carregarEventos()
      } else {
        alert(result.error || 'Erro ao excluir evento')
      }
    } catch (error) {
      alert('Erro ao excluir evento')
    }
  }

  const getTipoLabel = (tipo: string) => {
    const labels: Record<string, { label: string; color: string }> = {
      'compromisso': { label: 'Compromisso', color: 'bg-blue-100 text-blue-700' },
      'entrevista': { label: 'Entrevista', color: 'bg-green-100 text-green-700' },
      'reuniao': { label: 'Reunião', color: 'bg-purple-100 text-purple-700' },
      'outro': { label: 'Outro', color: 'bg-gray-100 text-gray-700' }
    }
    return labels[tipo] || { label: tipo, color: 'bg-gray-100 text-gray-700' }
  }

  const filtered = eventos.filter((e) =>
    e.titulo?.toLowerCase().includes(search.toLowerCase()) ||
    e.responsavel?.toLowerCase().includes(search.toLowerCase()) ||
    e.local?.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
        <SidebarAdmin />
        <div className="flex-1 ml-64 flex items-center justify-center">
          <div className="text-center">
            <Calendar className="h-12 w-12 text-[#6B1A2A] animate-pulse mx-auto mb-4" />
            <p className="text-[#708090]">Carregando eventos...</p>
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
          <div>
            <h1 className="text-2xl font-bold text-[#2D343A]">Agenda</h1>
            <p className="text-sm text-[#708090]">{eventos.length} eventos agendados</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={carregarEventos}
              className="px-4 py-2 border border-[#E8EAE0] rounded-lg hover:bg-[#F8F4E6] transition flex items-center gap-2 text-[#708090]"
            >
              <RefreshCw className="h-4 w-4" />
              Atualizar
            </button>
            <button
              onClick={() => router.push('/admin/agenda/novo')}
              className="px-4 py-2 bg-[#6B1A2A] text-white rounded-lg hover:bg-[#4A0E1A] transition font-medium flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Novo Evento
            </button>
          </div>
        </header>

        <div className="flex-1 p-8">
          <div className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#708090]" />
                <input
                  type="text"
                  placeholder="Buscar eventos por título, responsável ou local..."
                  className="w-full pl-10 pr-4 py-2 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A] transition"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
                ❌ {error}
              </div>
            )}

            {eventos.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="h-12 w-12 text-[#708090] mx-auto mb-4" />
                <p className="text-[#708090]">Nenhum evento agendado.</p>
                <button
                  onClick={() => router.push('/admin/agenda/novo')}
                  className="mt-4 px-4 py-2 bg-[#6B1A2A] text-white rounded-lg hover:bg-[#4A0E1A] transition"
                >
                  Criar primeiro evento
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#F8F4E6]">
                    <tr>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Título</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Data</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Horário</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Tipo</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Responsável</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Status</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((item) => {
                      const tipoInfo = getTipoLabel(item.tipo)
                      return (
                        <tr key={item.id} className="border-b border-[#E8EAE0] hover:bg-[#F8F4E6] transition">
                          <td className="py-3 px-4 font-medium text-[#2D343A]">{item.titulo}</td>
                          <td className="py-3 px-4 text-[#708090]">
                            {new Date(item.data).toLocaleDateString('pt-BR')}
                          </td>
                          <td className="py-3 px-4 text-[#708090]">
                            {item.hora_inicio || '-'}
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${tipoInfo.color}`}>
                              {tipoInfo.label}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-[#708090]">{item.responsavel || '-'}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              item.status === 'confirmado' ? 'bg-green-100 text-green-700' :
                              item.status === 'cancelado' ? 'bg-red-100 text-red-700' :
                              'bg-yellow-100 text-yellow-700'
                            }`}>
                              {item.status || 'Pendente'}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex gap-2">
                              <button
                                onClick={() => router.push(`/admin/agenda/${item.id}`)}
                                className="p-1 hover:bg-[#F8F4E6] rounded"
                                title="Visualizar"
                              >
                                <Eye className="h-4 w-4 text-[#708090]" />
                              </button>
                              <button
                                onClick={() => router.push(`/admin/agenda/${item.id}/editar`)}
                                className="p-1 hover:bg-[#F8F4E6] rounded"
                                title="Editar"
                              >
                                <Edit className="h-4 w-4 text-[#708090]" />
                              </button>
                              <button
                                onClick={() => handleDelete(item.id)}
                                className="p-1 hover:bg-[#F8F4E6] rounded"
                                title="Excluir"
                              >
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        <DashboardFooter />
      </div>
    </div>
  )
}
