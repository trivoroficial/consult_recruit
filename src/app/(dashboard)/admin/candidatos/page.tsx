'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { SidebarAdmin } from '@/components/dashboard/SidebarAdmin'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import { 
  Users, Plus, Search, Edit, Trash2, Eye, RefreshCw, 
  Upload, UserCheck, UserX, Shield, CheckCircle, XCircle,
  Clock, Filter, ExternalLink
} from 'lucide-react'
import { 
  listarCandidatos, 
  excluirCandidato,
  ativarAcessoDashboard,
  enviarParaOperacional
} from '@/actions/candidatos'

export default function AdminCandidatos() {
  const router = useRouter()
  const [candidatos, setCandidatos] = useState<any[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filtro, setFiltro] = useState('Todos')
  const [showActions, setShowActions] = useState<number | null>(null)

  useEffect(() => {
    carregarCandidatos()
  }, [])

  const carregarCandidatos = async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await listarCandidatos()
      if (result.success) {
        setCandidatos(result.data || [])
      } else {
        setError(result.error || 'Erro ao carregar candidatos')
      }
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar candidatos')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir este candidato?')) return
    try {
      const result = await excluirCandidato(id)
      if (result.success) {
        await carregarCandidatos()
      } else {
        alert(result.error || 'Erro ao excluir candidato')
      }
    } catch (error) {
      alert('Erro ao excluir candidato')
    }
  }

  const handleAtivarAcesso = async (id: number) => {
    if (!confirm('Ativar acesso ao Dashboard para este candidato?')) return
    try {
      const result = await ativarAcessoDashboard(id)
      if (result.success) {
        await carregarCandidatos()
        alert('✅ Acesso ativado com sucesso!')
      } else {
        alert(result.error || 'Erro ao ativar acesso')
      }
    } catch (error) {
      alert('Erro ao ativar acesso')
    }
  }

  const handleEnviarOperacional = async (id: number) => {
    if (!confirm('Enviar este candidato para o Módulo Operacional?')) return
    try {
      const result = await enviarParaOperacional(id)
      if (result.success) {
        await carregarCandidatos()
        alert('✅ Candidato enviado para Operacional!')
      } else {
        alert(result.error || 'Erro ao enviar para operacional')
      }
    } catch (error) {
      alert('Erro ao enviar para operacional')
    }
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'Disponível': 'bg-green-100 text-green-700',
      'Em processo': 'bg-yellow-100 text-yellow-700',
      'Contratado': 'bg-blue-100 text-blue-700',
      'Inativo': 'bg-gray-100 text-gray-700'
    }
    return colors[status] || 'bg-gray-100 text-gray-700'
  }

  const getTipoBadge = (tipo: string, acesso: boolean) => {
    if (tipo === 'operacional') {
      return { label: '🔧 Operacional', color: 'bg-purple-100 text-purple-700' }
    }
    if (acesso) {
      return { label: '✅ Ativo', color: 'bg-green-100 text-green-700' }
    }
    return { label: '⏳ Pendente', color: 'bg-yellow-100 text-yellow-700' }
  }

  const statusCounts = {
    total: candidatos.length,
    disponivel: candidatos.filter(c => c.status === 'Disponível').length,
    processo: candidatos.filter(c => c.status === 'Em processo').length,
    contratado: candidatos.filter(c => c.status === 'Contratado').length,
    operacional: candidatos.filter(c => c.tipo === 'operacional').length,
    ativos: candidatos.filter(c => c.acesso_dashboard === true).length,
  }

  const filtered = candidatos.filter(c => {
    const matchSearch = c.nome?.toLowerCase().includes(search.toLowerCase()) ||
                        c.email?.toLowerCase().includes(search.toLowerCase()) ||
                        c.cidade?.toLowerCase().includes(search.toLowerCase()) ||
                        c.cargo?.toLowerCase().includes(search.toLowerCase())
    
    if (filtro === 'Todos') return matchSearch
    if (filtro === 'Operacional') return matchSearch && c.tipo === 'operacional'
    if (filtro === 'Ativos') return matchSearch && c.acesso_dashboard === true
    if (filtro === 'Pendentes') return matchSearch && c.acesso_dashboard === false && c.tipo !== 'operacional'
    return matchSearch && c.status === filtro
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
        <SidebarAdmin />
        <div className="flex-1 ml-64 flex items-center justify-center">
          <div className="text-center">
            <Users className="h-12 w-12 text-[#6B1A2A] animate-pulse mx-auto mb-4" />
            <p className="text-[#708090]">Carregando candidatos...</p>
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
            <h1 className="text-2xl font-bold text-[#2D343A]">Candidatos</h1>
            <p className="text-sm text-[#708090]">{candidatos.length} candidatos cadastrados</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={carregarCandidatos}
              className="px-4 py-2 border border-[#E8EAE0] rounded-lg hover:bg-[#F8F4E6] transition flex items-center gap-2 text-[#708090]"
            >
              <RefreshCw className="h-4 w-4" />
              Atualizar
            </button>
            <button
              onClick={() => router.push('/admin/candidatos/novo')}
              className="px-4 py-2 bg-[#6B1A2A] text-white rounded-lg hover:bg-[#4A0E1A] transition font-medium flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Novo Candidato
            </button>
          </div>
        </header>

        <div className="flex-1 p-8">
          {/* Cards de Status */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
            <div className="bg-white p-3 rounded-xl shadow-sm border border-[#E8EAE0] text-center">
              <p className="text-xl font-bold text-[#2D343A]">{statusCounts.total}</p>
              <p className="text-xs text-[#708090]">Total</p>
            </div>
            <div className="bg-white p-3 rounded-xl shadow-sm border border-[#E8EAE0] text-center">
              <p className="text-xl font-bold text-green-600">{statusCounts.disponivel}</p>
              <p className="text-xs text-[#708090]">Disponíveis</p>
            </div>
            <div className="bg-white p-3 rounded-xl shadow-sm border border-[#E8EAE0] text-center">
              <p className="text-xl font-bold text-yellow-600">{statusCounts.processo}</p>
              <p className="text-xs text-[#708090]">Em processo</p>
            </div>
            <div className="bg-white p-3 rounded-xl shadow-sm border border-[#E8EAE0] text-center">
              <p className="text-xl font-bold text-blue-600">{statusCounts.contratado}</p>
              <p className="text-xs text-[#708090]">Contratados</p>
            </div>
            <div className="bg-white p-3 rounded-xl shadow-sm border border-[#E8EAE0] text-center bg-purple-50 border-purple-200">
              <p className="text-xl font-bold text-purple-600">{statusCounts.operacional}</p>
              <p className="text-xs text-[#708090]">Operacional</p>
            </div>
            <div className="bg-white p-3 rounded-xl shadow-sm border border-[#E8EAE0] text-center bg-green-50 border-green-200">
              <p className="text-xl font-bold text-green-600">{statusCounts.ativos}</p>
              <p className="text-xs text-[#708090]">Ativos</p>
            </div>
          </div>

          {/* Filtros e Busca */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#708090]" />
                <input
                  type="text"
                  placeholder="Buscar por nome, email, cidade ou cargo..."
                  className="w-full pl-10 pr-4 py-2 border border-[#E8EAE0] rounded-lg focus:ring-2 focus:ring-[#6B1A2A] focus:outline-none"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                <button 
                  onClick={() => setFiltro('Todos')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                    filtro === 'Todos' ? 'bg-[#6B1A2A] text-white' : 'bg-[#F8F4E6] text-[#708090] hover:bg-[#E8EAE0]'
                  }`}
                >
                  Todos
                </button>
                <button 
                  onClick={() => setFiltro('Disponível')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                    filtro === 'Disponível' ? 'bg-green-600 text-white' : 'bg-[#F8F4E6] text-[#708090] hover:bg-[#E8EAE0]'
                  }`}
                >
                  Disponível
                </button>
                <button 
                  onClick={() => setFiltro('Em processo')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                    filtro === 'Em processo' ? 'bg-yellow-600 text-white' : 'bg-[#F8F4E6] text-[#708090] hover:bg-[#E8EAE0]'
                  }`}
                >
                  Em processo
                </button>
                <button 
                  onClick={() => setFiltro('Ativos')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                    filtro === 'Ativos' ? 'bg-green-600 text-white' : 'bg-[#F8F4E6] text-[#708090] hover:bg-[#E8EAE0]'
                  }`}
                >
                  Ativos
                </button>
                <button 
                  onClick={() => setFiltro('Operacional')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                    filtro === 'Operacional' ? 'bg-purple-600 text-white' : 'bg-[#F8F4E6] text-[#708090] hover:bg-[#E8EAE0]'
                  }`}
                >
                  Operacional
                </button>
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          {candidatos.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-12 text-center">
              <Users className="h-12 w-12 text-[#708090] mx-auto mb-4" />
              <p className="text-[#708090]">Nenhum candidato cadastrado.</p>
              <button
                onClick={() => router.push('/admin/candidatos/novo')}
                className="mt-4 px-4 py-2 bg-[#6B1A2A] text-white rounded-lg hover:bg-[#4A0E1A] transition"
              >
                Cadastrar primeiro candidato
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#F8F4E6]">
                    <tr>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Nome</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Email</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Tipo</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Status</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((item) => {
                      const tipoInfo = getTipoBadge(item.tipo, item.acesso_dashboard)
                      return (
                        <tr key={item.id} className="border-b border-[#E8EAE0] hover:bg-[#F8F4E6] transition">
                          <td className="py-3 px-4 font-medium text-[#2D343A]">{item.nome}</td>
                          <td className="py-3 px-4 text-[#708090]">{item.email}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${tipoInfo.color}`}>
                              {tipoInfo.label}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                              {item.status || 'Disponível'}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex gap-1 flex-wrap">
                              <button
                                onClick={() => router.push(`/admin/candidatos/${item.id}`)}
                                className="p-1.5 hover:bg-[#F8F4E6] rounded transition"
                                title="Visualizar"
                              >
                                <Eye className="h-4 w-4 text-[#708090]" />
                              </button>
                              <button
                                onClick={() => router.push(`/admin/candidatos/${item.id}/editar`)}
                                className="p-1.5 hover:bg-[#F8F4E6] rounded transition"
                                title="Editar"
                              >
                                <Edit className="h-4 w-4 text-[#708090]" />
                              </button>
                              {/* Botões de Ação Rápida */}
                              {item.tipo !== 'operacional' && !item.acesso_dashboard && (
                                <button
                                  onClick={() => handleAtivarAcesso(item.id)}
                                  className="p-1.5 hover:bg-green-50 rounded transition"
                                  title="Ativar Acesso ao Dashboard"
                                >
                                  <UserCheck className="h-4 w-4 text-green-600" />
                                </button>
                              )}
                              {item.tipo !== 'operacional' && (
                                <button
                                  onClick={() => handleEnviarOperacional(item.id)}
                                  className="p-1.5 hover:bg-purple-50 rounded transition"
                                  title="Enviar para Operacional"
                                >
                                  <Shield className="h-4 w-4 text-purple-600" />
                                </button>
                              )}
                              <button
                                onClick={() => handleDelete(item.id)}
                                className="p-1.5 hover:bg-red-50 rounded transition"
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
            </div>
          )}
        </div>

        <DashboardFooter />
      </div>
    </div>
  )
}
