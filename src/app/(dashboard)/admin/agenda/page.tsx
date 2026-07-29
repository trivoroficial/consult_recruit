'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { SidebarAdmin } from '@/components/dashboard/SidebarAdmin'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import {
  Calendar, Plus, Search, Edit, Trash2, Eye, RefreshCw,
  Clock, Users, MapPin, CheckCircle, XCircle,
  Filter, ChevronLeft, ChevronRight, FileText,
  User, Briefcase, Building2, MessageCircle
} from 'lucide-react'
import { listarEventos, excluirEvento } from '@/actions/agenda'

export default function AdminAgenda() {
  const router = useRouter()
  const [eventos, setEventos] = useState<any[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filtroStatus, setFiltroStatus] = useState('')
  const [dataAtual, setDataAtual] = useState(new Date())

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
    } catch (err) {
      setError('Erro ao carregar eventos')
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

  const getStatusConfig = (status: string) => {
    const configs: Record<string, { label: string; color: string; icon: any }> = {
      'confirmado': { label: 'Confirmado', color: 'bg-green-100 text-green-700', icon: CheckCircle },
      'pendente': { label: 'Pendente', color: 'bg-yellow-100 text-yellow-700', icon: Clock },
      'cancelado': { label: 'Cancelado', color: 'bg-red-100 text-red-700', icon: XCircle },
      'concluido': { label: 'Concluído', color: 'bg-blue-100 text-blue-700', icon: CheckCircle }
    }
    return configs[status] || configs['pendente']
  }

  const getTipoConfig = (tipo: string) => {
    const configs: Record<string, { label: string; color: string; icon: any }> = {
      'entrevista': { label: 'Entrevista', color: 'bg-purple-100 text-purple-700', icon: Users },
      'reuniao': { label: 'Reunião', color: 'bg-blue-100 text-blue-700', icon: Building2 },
      'compromisso': { label: 'Compromisso', color: 'bg-green-100 text-green-700', icon: Calendar },
      'avaliacao': { label: 'Avaliação', color: 'bg-yellow-100 text-yellow-700', icon: FileText }
    }
    return configs[tipo] || configs['compromisso']
  }

  const filtered = eventos.filter(e =>
    e.titulo?.toLowerCase().includes(search.toLowerCase()) ||
    e.responsavel?.toLowerCase().includes(search.toLowerCase()) ||
    e.local?.toLowerCase().includes(search.toLowerCase())
  ).filter(e => filtroStatus ? e.status === filtroStatus : true)

  const hoje = new Date()
  const eventosHoje = eventos.filter(e => {
    const dataEvento = new Date(e.data)
    return dataEvento.toDateString() === hoje.toDateString()
  })

  const eventosSemana = eventos.filter(e => {
    const dataEvento = new Date(e.data)
    const inicioSemana = new Date(hoje)
    inicioSemana.setDate(hoje.getDate() - hoje.getDay())
    const fimSemana = new Date(inicioSemana)
    fimSemana.setDate(inicioSemana.getDate() + 6)
    return dataEvento >= inicioSemana && dataEvento <= fimSemana
  })

  const statusCounts = {
    total: eventos.length,
    hoje: eventosHoje.length,
    semana: eventosSemana.length,
    confirmados: eventos.filter(e => e.status === 'confirmado').length,
    pendentes: eventos.filter(e => e.status === 'pendente').length
  }

  const mesAtual = dataAtual.toLocaleString('pt-BR', { month: 'long', year: 'numeric' })

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
        <SidebarAdmin />
        <div className="flex-1 ml-64 flex items-center justify-center">
          <div className="text-center">
            <Calendar className="h-12 w-12 text-[#6B1A2A] animate-pulse mx-auto mb-4" />
            <p className="text-[#708090]">Carregando agenda...</p>
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
            <h1 className="text-2xl font-bold text-[#2D343A] flex items-center gap-2">
              <Calendar className="h-6 w-6 text-[#6B1A2A]" />
              Agenda
            </h1>
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
          {/* CARDS DE STATUS */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E8EAE0] text-center">
              <p className="text-2xl font-bold text-[#2D343A]">{statusCounts.total}</p>
              <p className="text-xs text-[#708090]">Total</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E8EAE0] text-center">
              <p className="text-2xl font-bold text-[#6B1A2A]">{statusCounts.hoje}</p>
              <p className="text-xs text-[#708090]">Hoje</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E8EAE0] text-center">
              <p className="text-2xl font-bold text-blue-600">{statusCounts.semana}</p>
              <p className="text-xs text-[#708090]">Esta Semana</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E8EAE0] text-center">
              <p className="text-2xl font-bold text-green-600">{statusCounts.confirmados}</p>
              <p className="text-xs text-[#708090]">Confirmados</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E8EAE0] text-center">
              <p className="text-2xl font-bold text-yellow-600">{statusCounts.pendentes}</p>
              <p className="text-xs text-[#708090]">Pendentes</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-[#E8EAE0] p-6">
            <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
              <div className="flex-1 relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#708090]" />
                <input 
                  type="text" 
                  placeholder="Buscar eventos..." 
                  className="w-full pl-10 pr-4 py-2 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A]"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <select
                className="px-4 py-2 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A] bg-white"
                value={filtroStatus}
                onChange={(e) => setFiltroStatus(e.target.value)}
              >
                <option value="">Todos os status</option>
                <option value="confirmado">Confirmado</option>
                <option value="pendente">Pendente</option>
                <option value="cancelado">Cancelado</option>
                <option value="concluido">Concluído</option>
              </select>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
                {error}
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
              <div className="space-y-3">
                {filtered.map((item) => {
                  const statusConfig = getStatusConfig(item.status)
                  const StatusIcon = statusConfig.icon
                  const tipoConfig = getTipoConfig(item.tipo)
                  const TipoIcon = tipoConfig.icon
                  return (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-4 border border-[#E8EAE0] rounded-lg hover:bg-[#F8F4E6] transition"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-lg ${tipoConfig.color}`}>
                          <TipoIcon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium text-[#2D343A]">{item.titulo}</p>
                          <div className="flex flex-wrap items-center gap-2 text-xs text-[#708090]">
                            <span>{new Date(item.data).toLocaleDateString('pt-BR')}</span>
                            <span>•</span>
                            <span>{item.hora_inicio || '09:00'}</span>
                            <span>•</span>
                            <span>{item.local || 'Não informado'}</span>
                            <span>•</span>
                            <span className={`px-1.5 py-0.5 rounded-full text-xs ${statusConfig.color} flex items-center gap-1`}>
                              <StatusIcon className="h-3 w-3" />
                              {statusConfig.label}
                            </span>
                            <span className={`px-1.5 py-0.5 rounded-full text-xs ${tipoConfig.color}`}>
                              {tipoConfig.label}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => router.push(`/admin/agenda/${item.id}`)}
                          className="p-1.5 hover:bg-[#E8EAE0] rounded-lg transition"
                          title="Visualizar"
                        >
                          <Eye className="h-4 w-4 text-[#708090]" />
                        </button>
                        <button 
                          onClick={() => router.push(`/admin/agenda/${item.id}/editar`)}
                          className="p-1.5 hover:bg-[#E8EAE0] rounded-lg transition"
                          title="Editar"
                        >
                          <Edit className="h-4 w-4 text-[#708090]" />
                        </button>
                        <button 
                          onClick={() => handleDelete(item.id)}
                          className="p-1.5 hover:bg-red-50 rounded-lg transition"
                          title="Excluir"
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        <DashboardFooter />
      </div>
    </div>
  )
}
