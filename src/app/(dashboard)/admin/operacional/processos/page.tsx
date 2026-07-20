'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { SidebarAdmin } from '@/components/dashboard/SidebarAdmin'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import { 
  Briefcase, Plus, Search, Filter, Eye, Edit, Trash2,
  Building2, Users, Calendar, MapPin, Clock, ArrowUpDown,
  CheckCircle, XCircle, Award, FileText
} from 'lucide-react'

export default function OperacionalProcessos() {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('todos')

  const processos = [
    { 
      id: 1, 
      nome: 'Operador de Produção', 
      empresa: 'Indústria ABC', 
      cidade: 'Uberlândia/MG',
      vagas: 15,
      candidatos: 48,
      status: 'ativo',
      data: '15/07/2026',
      responsavel: 'João Silva',
      descricao: 'Processo para contratação de operadores de produção'
    },
    { 
      id: 2, 
      nome: 'Auxiliar de Logística', 
      empresa: 'Grupo Logística', 
      cidade: 'Uberlândia/MG',
      vagas: 10,
      candidatos: 32,
      status: 'ativo',
      data: '12/07/2026',
      responsavel: 'Maria Santos',
      descricao: 'Processo para auxiliares de logística'
    },
    { 
      id: 3, 
      nome: 'Soldador', 
      empresa: 'Metalúrgica XYZ', 
      cidade: 'Uberlândia/MG',
      vagas: 8,
      candidatos: 25,
      status: 'concluido',
      data: '10/07/2026',
      responsavel: 'Pedro Costa',
      descricao: 'Processo para soldadores especializados'
    },
    { 
      id: 4, 
      nome: 'Motorista', 
      empresa: 'Transportadora Express', 
      cidade: 'Uberlândia/MG',
      vagas: 5,
      candidatos: 18,
      status: 'ativo',
      data: '08/07/2026',
      responsavel: 'Ana Oliveira',
      descricao: 'Processo para motoristas com CNH D'
    },
    { 
      id: 5, 
      nome: 'Auxiliar de Produção', 
      empresa: 'Indústria ABC', 
      cidade: 'Uberlândia/MG',
      vagas: 20,
      candidatos: 56,
      status: 'pausado',
      data: '05/07/2026',
      responsavel: 'João Silva',
      descricao: 'Processo para auxiliares de produção - pausado por demanda'
    },
  ]

  const statusColors = {
    ativo: 'bg-green-100 text-green-700',
    concluido: 'bg-blue-100 text-blue-700',
    pausado: 'bg-yellow-100 text-yellow-700',
  }

  const statusIcons = {
    ativo: CheckCircle,
    concluido: Award,
    pausado: Clock,
  }

  const filteredProcessos = processos.filter(item => {
    const matchSearch = item.nome.toLowerCase().includes(search.toLowerCase()) ||
                         item.empresa.toLowerCase().includes(search.toLowerCase()) ||
                         item.cidade.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'todos' || item.status === statusFilter
    return matchSearch && matchStatus
  })

  const stats = {
    total: processos.length,
    ativos: processos.filter(p => p.status === 'ativo').length,
    concluidos: processos.filter(p => p.status === 'concluido').length,
    pausados: processos.filter(p => p.status === 'pausado').length,
    totalCandidatos: processos.reduce((acc, p) => acc + p.candidatos, 0),
    totalVagas: processos.reduce((acc, p) => acc + p.vagas, 0),
  }

  return (
    <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
      <SidebarAdmin />
      
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <header className="bg-white border-b border-[#E8EAE0] px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#2D343A]">Processos Operacionais</h1>
            <p className="text-sm text-[#708090]">Gerencie todos os processos seletivos presenciais</p>
          </div>
          <button 
            onClick={() => router.push('/admin/operacional/processos/novo')}
            className="px-4 py-2 bg-[#8B0000] text-white rounded-lg hover:bg-[#700000] transition font-medium flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Novo Processo
          </button>
        </header>

        <div className="flex-1 p-8">
          {/* CARDS DE ESTATÍSTICAS */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E8EAE0] text-center">
              <p className="text-2xl font-bold text-[#2D343A]">{stats.total}</p>
              <p className="text-xs text-[#708090]">Total</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E8EAE0] text-center border-green-200">
              <p className="text-2xl font-bold text-green-600">{stats.ativos}</p>
              <p className="text-xs text-[#708090]">Ativos</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E8EAE0] text-center border-blue-200">
              <p className="text-2xl font-bold text-blue-600">{stats.concluidos}</p>
              <p className="text-xs text-[#708090]">Concluídos</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E8EAE0] text-center border-yellow-200">
              <p className="text-2xl font-bold text-yellow-600">{stats.pausados}</p>
              <p className="text-xs text-[#708090]">Pausados</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E8EAE0] text-center border-purple-200">
              <p className="text-2xl font-bold text-purple-600">{stats.totalCandidatos}</p>
              <p className="text-xs text-[#708090]">Candidatos</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E8EAE0] text-center border-indigo-200">
              <p className="text-2xl font-bold text-indigo-600">{stats.totalVagas}</p>
              <p className="text-xs text-[#708090]">Vagas</p>
            </div>
          </div>

          {/* FILTROS */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex-1 min-w-[200px] relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#708090]" />
              <input 
                type="text" 
                placeholder="Buscar processos por nome, empresa ou cidade..." 
                className="w-full pl-10 pr-4 py-2 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <select
              className="px-4 py-2 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] bg-white"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="todos">Todos os Status</option>
              <option value="ativo">Ativo</option>
              <option value="concluido">Concluído</option>
              <option value="pausado">Pausado</option>
            </select>
            <button className="px-4 py-2 border border-[#E8EAE0] rounded-lg hover:bg-[#F8F4E6] transition flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filtrar
            </button>
            <button className="px-4 py-2 border border-[#E8EAE0] rounded-lg hover:bg-[#F8F4E6] transition flex items-center gap-2">
              <ArrowUpDown className="h-4 w-4" />
              Ordenar
            </button>
          </div>

          {/* TABELA */}
          <div className="bg-white rounded-xl shadow-sm border border-[#E8EAE0} overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#F8F4E6]">
                  <tr>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Processo</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Empresa</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Local</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Vagas</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Candidatos</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Data</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProcessos.map((item) => {
                    const StatusIcon = statusIcons[item.status as keyof typeof statusIcons] || Briefcase
                    return (
                      <tr key={item.id} className="border-b border-[#E8EAE0] hover:bg-[#F8F4E6] transition">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Briefcase className="h-4 w-4 text-[#8B0000]" />
                            <span className="font-medium text-[#2D343A]">{item.nome}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-[#708090]">{item.empresa}</td>
                        <td className="py-3 px-4 text-[#708090]">{item.cidade}</td>
                        <td className="py-3 px-4 text-[#2D343A] font-medium">{item.vagas}</td>
                        <td className="py-3 px-4 text-[#2D343A] font-medium">{item.candidatos}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[item.status as keyof typeof statusColors]} flex items-center gap-1 w-fit`}>
                            <StatusIcon className="h-3 w-3" />
                            {item.status === 'ativo' ? 'Ativo' : item.status === 'concluido' ? 'Concluído' : 'Pausado'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-[#708090]">{item.data}</td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <button 
                              onClick={() => router.push(`/admin/operacional/processos/${item.id}`)}
                              className="p-1 hover:bg-[#F8F4E6] rounded" title="Visualizar"
                            >
                              <Eye className="h-4 w-4 text-[#708090]" />
                            </button>
                            <button className="p-1 hover:bg-[#F8F4E6] rounded" title="Editar">
                              <Edit className="h-4 w-4 text-[#708090]" />
                            </button>
                            <button className="p-1 hover:bg-[#F8F4E6] rounded" title="Excluir">
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

            <div className="flex items-center justify-between px-4 py-3 border-t border-[#E8EAE0] text-sm text-[#708090]">
              <p>Mostrando {filteredProcessos.length} de {processos.length} processos</p>
              <div className="flex gap-2">
                <button className="px-3 py-1 border border-[#E8EAE0] rounded hover:bg-[#F8F4E6]">Anterior</button>
                <button className="px-3 py-1 bg-[#8B0000] text-white rounded">1</button>
                <button className="px-3 py-1 border border-[#E8EAE0] rounded hover:bg-[#F8F4E6]">2</button>
                <button className="px-3 py-1 border border-[#E8EAE0] rounded hover:bg-[#F8F4E6]">3</button>
                <button className="px-3 py-1 border border-[#E8EAE0] rounded hover:bg-[#F8F4E6]">Próximo</button>
              </div>
            </div>
          </div>
        </div>

        <DashboardFooter />
      </div>
    </div>
  )
}
