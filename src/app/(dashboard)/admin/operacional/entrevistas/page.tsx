'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { SidebarAdmin } from '@/components/dashboard/SidebarAdmin'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import {
  Calendar, Plus, Search, Edit, Trash2, Eye, RefreshCw,
  Clock, Users, MapPin, CheckCircle, XCircle,
  Filter, User, FileText, Building2, MessageCircle
} from 'lucide-react'
import { listarEntrevistasOperacionais, excluirEntrevistaOperacional } from '@/actions/operacional'

export default function AdminEntrevistasOperacionais() {
  const router = useRouter()
  const [entrevistas, setEntrevistas] = useState<any[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filtroStatus, setFiltroStatus] = useState('')
  const [filtroResultado, setFiltroResultado] = useState('')

  useEffect(() => {
    carregarEntrevistas()
  }, [])

  const carregarEntrevistas = async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await listarEntrevistasOperacionais()
      if (result.success) {
        setEntrevistas(result.data || [])
      } else {
        setError(result.error || 'Erro ao carregar entrevistas')
      }
    } catch (err) {
      setError('Erro ao carregar entrevistas')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir esta entrevista?')) return

    try {
      const result = await excluirEntrevistaOperacional(id)
      if (result.success) {
        await carregarEntrevistas()
      } else {
        alert(result.error || 'Erro ao excluir entrevista')
      }
    } catch (error) {
      alert('Erro ao excluir entrevista')
    }
  }

  const getStatusConfig = (status: string) => {
    const configs: Record<string, { label: string; color: string; icon: any }> = {
      'agendada': { label: 'Agendada', color: 'bg-blue-100 text-blue-700', icon: Clock },
      'realizada': { label: 'Realizada', color: 'bg-green-100 text-green-700', icon: CheckCircle },
      'cancelada': { label: 'Cancelada', color: 'bg-red-100 text-red-700', icon: XCircle },
      'pendente': { label: 'Pendente', color: 'bg-yellow-100 text-yellow-700', icon: Clock }
    }
    return configs[status] || configs['pendente']
  }

  const getResultadoConfig = (resultado: string) => {
    const configs: Record<string, { label: string; color: string }> = {
      'aprovado': { label: 'Aprovado', color: 'bg-green-100 text-green-700' },
      'reprovado': { label: 'Reprovado', color: 'bg-red-100 text-red-700' },
      'banco_talentos': { label: 'Banco de Talentos', color: 'bg-yellow-100 text-yellow-700' },
      'aguardando': { label: 'Aguardando', color: 'bg-gray-100 text-gray-700' }
    }
    return configs[resultado] || configs['aguardando']
  }

  const filtered = entrevistas.filter(e =>
    e.titulo?.toLowerCase().includes(search.toLowerCase()) ||
    e.entrevistador?.toLowerCase().includes(search.toLowerCase()) ||
    e.local?.toLowerCase().includes(search.toLowerCase()) ||
    e.participantes?.nome?.toLowerCase().includes(search.toLowerCase())
  ).filter(e => filtroStatus ? e.status === filtroStatus : true)
   .filter(e => filtroResultado ? e.resultado === filtroResultado : true)

  const statusCounts = {
    total: entrevistas.length,
    agendada: entrevistas.filter(e => e.status === 'agendada').length,
    realizada: entrevistas.filter(e => e.status === 'realizada').length,
    aprovados: entrevistas.filter(e => e.resultado === 'aprovado').length
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
        <SidebarAdmin />
        <div className="flex-1 ml-64 flex items-center justify-center">
          <div className="text-center">
            <Calendar className="h-12 w-12 text-[#6B1A2A] animate-pulse mx-auto mb-4" />
            <p className="text-[#708090]">Carregando entrevistas...</p>
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
              Entrevistas Operacionais
            </h1>
            <p className="text-sm text-[#708090]">{entrevistas.length} entrevistas realizadas</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={carregarEntrevistas}
              className="px-4 py-2 border border-[#E8EAE0] rounded-lg hover:bg-[#F8F4E6] transition flex items-center gap-2 text-[#708090]"
            >
              <RefreshCw className="h-4 w-4" />
              Atualizar
            </button>
            <button 
              onClick={() => router.push('/admin/operacional/entrevistas/nova')}
              className="px-4 py-2 bg-[#6B1A2A] text-white rounded-lg hover:bg-[#4A0E1A] transition font-medium flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Nova Entrevista
            </button>
          </div>
        </header>

        <div className="flex-1 p-8">
          {/* CARDS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E8EAE0] text-center">
              <p className="text-2xl font-bold text-[#2D343A]">{statusCounts.total}</p>
              <p className="text-xs text-[#708090]">Total</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E8EAE0] text-center">
              <p className="text-2xl font-bold text-blue-600">{statusCounts.agendada}</p>
              <p className="text-xs text-[#708090]">Agendadas</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E8EAE0] text-center">
              <p className="text-2xl font-bold text-green-600">{statusCounts.realizada}</p>
              <p className="text-xs text-[#708090]">Realizadas</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E8EAE0] text-center">
              <p className="text-2xl font-bold text-green-600">{statusCounts.aprovados}</p>
              <p className="text-xs text-[#708090]">Aprovados</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-[#E8EAE0] p-6">
            <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
              <div className="flex-1 relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#708090]" />
                <input 
                  type="text" 
                  placeholder="Buscar entrevistas..." 
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
                <option value="agendada">Agendada</option>
                <option value="realizada">Realizada</option>
                <option value="cancelada">Cancelada</option>
                <option value="pendente">Pendente</option>
              </select>
              <select
                className="px-4 py-2 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A] bg-white"
                value={filtroResultado}
                onChange={(e) => setFiltroResultado(e.target.value)}
              >
                <option value="">Todos os resultados</option>
                <option value="aprovado">Aprovado</option>
                <option value="reprovado">Reprovado</option>
                <option value="banco_talentos">Banco de Talentos</option>
                <option value="aguardando">Aguardando</option>
              </select>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
                {error}
              </div>
            )}

            {entrevistas.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="h-12 w-12 text-[#708090] mx-auto mb-4" />
                <p className="text-[#708090]">Nenhuma entrevista cadastrada.</p>
                <button 
                  onClick={() => router.push('/admin/operacional/entrevistas/nova')}
                  className="mt-4 px-4 py-2 bg-[#6B1A2A] text-white rounded-lg hover:bg-[#4A0E1A] transition"
                >
                  Agendar primeira entrevista
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {filtered.map((item) => {
                  const statusConfig = getStatusConfig(item.status)
                  const StatusIcon = statusConfig.icon
                  const resultadoConfig = getResultadoConfig(item.resultado)
                  return (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-4 border border-[#E8EAE0] rounded-lg hover:bg-[#F8F4E6] transition"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-lg ${statusConfig.color}`}>
                          <StatusIcon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium text-[#2D343A]">{item.titulo}</p>
                          <div className="flex flex-wrap items-center gap-2 text-xs text-[#708090]">
                            <span>{item.participantes?.nome || 'Sem participante'}</span>
                            <span>•</span>
                            <span>{new Date(item.data).toLocaleDateString('pt-BR')}</span>
                            <span>•</span>
                            <span>{item.hora?.substring(0, 5) || '09:00'}</span>
                            <span>•</span>
                            <span>{item.entrevistador || '-'}</span>
                            <span className={`px-1.5 py-0.5 rounded-full text-xs ${statusConfig.color}`}>
                              {statusConfig.label}
                            </span>
                            {item.resultado && item.resultado !== 'aguardando' && (
                              <span className={`px-1.5 py-0.5 rounded-full text-xs ${resultadoConfig.color}`}>
                                {resultadoConfig.label}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => router.push(`/admin/operacional/entrevistas/${item.id}`)}
                          className="p-1.5 hover:bg-[#E8EAE0] rounded-lg transition"
                          title="Visualizar"
                        >
                          <Eye className="h-4 w-4 text-[#708090]" />
                        </button>
                        <button 
                          onClick={() => router.push(`/admin/operacional/entrevistas/${item.id}/editar`)}
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
