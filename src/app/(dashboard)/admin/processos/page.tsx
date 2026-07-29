'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { SidebarAdmin } from '@/components/dashboard/SidebarAdmin'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import { 
  FileText, Plus, Search, Edit, Trash2, Eye, RefreshCw,
  Clock, Users, Building2, Briefcase, CheckCircle, XCircle,
  Filter, Calendar, UserCheck
} from 'lucide-react'
import { listarProcessos, excluirProcesso } from '@/actions/processos'

export default function AdminProcessos() {
  const router = useRouter()
  const [processos, setProcessos] = useState<any[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filtroStatus, setFiltroStatus] = useState('')

  useEffect(() => {
    carregarProcessos()
  }, [])

  const carregarProcessos = async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await listarProcessos()
      if (result.success) {
        setProcessos(result.data || [])
      } else {
        setError(result.error || 'Erro ao carregar processos')
      }
    } catch (err) {
      setError('Erro ao carregar processos')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir este processo?')) return

    try {
      const result = await excluirProcesso(id)
      if (result.success) {
        await carregarProcessos()
      } else {
        alert(result.error || 'Erro ao excluir processo')
      }
    } catch (error) {
      alert('Erro ao excluir processo')
    }
  }

  const getStatusConfig = (status: string) => {
    const configs: Record<string, { label: string; color: string; icon: any }> = {
      'triagem': { label: 'Triagem', color: 'bg-yellow-100 text-yellow-700', icon: Clock },
      'entrevista': { label: 'Entrevista', color: 'bg-blue-100 text-blue-700', icon: Users },
      'aprovado': { label: 'Aprovado', color: 'bg-green-100 text-green-700', icon: CheckCircle },
      'encerrado': { label: 'Encerrado', color: 'bg-gray-100 text-gray-700', icon: XCircle }
    }
    return configs[status] || configs['triagem']
  }

  const filtered = processos.filter(p =>
    p.vaga?.toLowerCase().includes(search.toLowerCase()) ||
    p.empresa?.toLowerCase().includes(search.toLowerCase()) ||
    p.responsavel?.toLowerCase().includes(search.toLowerCase())
  ).filter(p => filtroStatus ? p.status === filtroStatus : true)

  const statusCounts = {
    total: processos.length,
    triagem: processos.filter(p => p.status === 'triagem').length,
    entrevista: processos.filter(p => p.status === 'entrevista').length,
    aprovado: processos.filter(p => p.status === 'aprovado').length,
    encerrado: processos.filter(p => p.status === 'encerrado').length
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
        <SidebarAdmin />
        <div className="flex-1 ml-64 flex items-center justify-center">
          <div className="text-center">
            <FileText className="h-12 w-12 text-[#6B1A2A] animate-pulse mx-auto mb-4" />
            <p className="text-[#708090]">Carregando processos...</p>
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
              <FileText className="h-6 w-6 text-[#6B1A2A]" />
              Processos Seletivos
            </h1>
            <p className="text-sm text-[#708090]">{processos.length} processos cadastrados</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={carregarProcessos}
              className="px-4 py-2 border border-[#E8EAE0] rounded-lg hover:bg-[#F8F4E6] transition flex items-center gap-2 text-[#708090]"
            >
              <RefreshCw className="h-4 w-4" />
              Atualizar
            </button>
            <button 
              onClick={() => router.push('/admin/processos/novo')}
              className="px-4 py-2 bg-[#6B1A2A] text-white rounded-lg hover:bg-[#4A0E1A] transition font-medium flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Novo Processo
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
              <p className="text-2xl font-bold text-yellow-600">{statusCounts.triagem}</p>
              <p className="text-xs text-[#708090]">Triagem</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E8EAE0] text-center">
              <p className="text-2xl font-bold text-blue-600">{statusCounts.entrevista}</p>
              <p className="text-xs text-[#708090]">Entrevista</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E8EAE0] text-center">
              <p className="text-2xl font-bold text-green-600">{statusCounts.aprovado}</p>
              <p className="text-xs text-[#708090]">Aprovados</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E8EAE0] text-center">
              <p className="text-2xl font-bold text-gray-600">{statusCounts.encerrado}</p>
              <p className="text-xs text-[#708090]">Encerrados</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-[#E8EAE0] p-6">
            <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
              <div className="flex-1 relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#708090]" />
                <input 
                  type="text" 
                  placeholder="Buscar processos por vaga, empresa ou responsável..." 
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
                <option value="triagem">Triagem</option>
                <option value="entrevista">Entrevista</option>
                <option value="aprovado">Aprovado</option>
                <option value="encerrado">Encerrado</option>
              </select>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
                {error}
              </div>
            )}

            {processos.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-[#708090] mx-auto mb-4" />
                <p className="text-[#708090]">Nenhum processo cadastrado.</p>
                <button 
                  onClick={() => router.push('/admin/processos/novo')}
                  className="mt-4 px-4 py-2 bg-[#6B1A2A] text-white rounded-lg hover:bg-[#4A0E1A] transition"
                >
                  Criar primeiro processo
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#F8F4E6]">
                    <tr>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Vaga</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Empresa</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Status</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Candidatos</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Responsável</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((item) => {
                      const statusConfig = getStatusConfig(item.status)
                      const StatusIcon = statusConfig.icon
                      return (
                        <tr key={item.id} className="border-b border-[#E8EAE0] hover:bg-[#F8F4E6] transition">
                          <td className="py-3 px-4 font-medium text-[#2D343A]">{item.vaga}</td>
                          <td className="py-3 px-4 text-[#708090]">{item.empresa}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusConfig.color} flex items-center gap-1 w-fit`}>
                              <StatusIcon className="h-3 w-3" />
                              {statusConfig.label}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-[#708090]">{item.candidatos || 0}</td>
                          <td className="py-3 px-4 text-[#708090]">{item.responsavel || '-'}</td>
                          <td className="py-3 px-4">
                            <div className="flex gap-2">
                              <button 
                                onClick={() => router.push(`/admin/processos/${item.id}`)}
                                className="p-1 hover:bg-[#F8F4E6] rounded" title="Visualizar"
                              >
                                <Eye className="h-4 w-4 text-[#708090]" />
                              </button>
                              <button 
                                onClick={() => router.push(`/admin/processos/${item.id}/editar`)}
                                className="p-1 hover:bg-[#F8F4E6] rounded" title="Editar"
                              >
                                <Edit className="h-4 w-4 text-[#708090]" />
                              </button>
                              <button 
                                onClick={() => handleDelete(item.id)}
                                className="p-1 hover:bg-[#F8F4E6] rounded" title="Excluir"
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
