'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { SidebarAdmin } from '@/components/dashboard/SidebarAdmin'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import { 
  Users, Plus, Search, Filter, Eye, Edit, Trash2,
  User, Phone, MapPin, Briefcase, Upload, Download,
  CheckCircle, Clock, XCircle, Award, Calendar,
  FileText, MoreVertical, ArrowUpDown
} from 'lucide-react'

export default function OperacionalParticipantes() {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('todos')

  const participantes = [
    { 
      id: 1, 
      nome: 'João Silva', 
      telefone: '(34) 99999-9999', 
      cidade: 'Uberlândia/MG',
      cargo: 'Operador de Produção',
      status: 'aprovado',
      data: '15/07/2026',
      processos: 2,
      competencias: ['Produção', 'Segurança', 'Trabalho em equipe']
    },
    { 
      id: 2, 
      nome: 'Maria Santos', 
      telefone: '(34) 88888-8888', 
      cidade: 'Uberlândia/MG',
      cargo: 'Auxiliar de Logística',
      status: 'pendente',
      data: '14/07/2026',
      processos: 1,
      competencias: ['Logística', 'Organização', 'Comunicação']
    },
    { 
      id: 3, 
      nome: 'Pedro Costa', 
      telefone: '(34) 77777-7777', 
      cidade: 'Uberlândia/MG',
      cargo: 'Soldador',
      status: 'banco',
      data: '13/07/2026',
      processos: 3,
      competencias: ['Soldagem MIG', 'Leitura de projetos', 'Segurança']
    },
    { 
      id: 4, 
      nome: 'Ana Oliveira', 
      telefone: '(34) 66666-6666', 
      cidade: 'Uberlândia/MG',
      cargo: 'Motorista',
      status: 'reprovado',
      data: '12/07/2026',
      processos: 1,
      competencias: ['CNH D', 'Rotas', 'Manutenção básica']
    },
    { 
      id: 5, 
      nome: 'Carlos Santos', 
      telefone: '(34) 55555-5555', 
      cidade: 'Uberlândia/MG',
      cargo: 'Auxiliar de Produção',
      status: 'aprovado',
      data: '10/07/2026',
      processos: 2,
      competencias: ['Linha de produção', 'Controle de qualidade', 'Boa comunicação']
    },
  ]

  const statusConfig = {
    aprovado: { label: 'Aprovado', color: 'bg-green-100 text-green-700', icon: CheckCircle },
    pendente: { label: 'Pendente', color: 'bg-yellow-100 text-yellow-700', icon: Clock },
    banco: { label: 'Banco de Talentos', color: 'bg-purple-100 text-purple-700', icon: Award },
    reprovado: { label: 'Reprovado', color: 'bg-red-100 text-red-700', icon: XCircle },
  }

  const filteredParticipantes = participantes.filter(item => {
    const matchSearch = item.nome.toLowerCase().includes(search.toLowerCase()) ||
                         item.cargo.toLowerCase().includes(search.toLowerCase()) ||
                         item.cidade.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'todos' || item.status === statusFilter
    return matchSearch && matchStatus
  })

  const stats = {
    total: participantes.length,
    aprovados: participantes.filter(p => p.status === 'aprovado').length,
    pendentes: participantes.filter(p => p.status === 'pendente').length,
    banco: participantes.filter(p => p.status === 'banco').length,
    reprovados: participantes.filter(p => p.status === 'reprovado').length,
  }

  return (
    <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
      <SidebarAdmin />
      
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <header className="bg-white border-b border-[#E8EAE0] px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#2D343A]">Participantes Operacionais</h1>
            <p className="text-sm text-[#708090]">Gerencie todos os participantes dos processos presenciais</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="px-4 py-2 border border-[#E8EAE0] rounded-lg hover:bg-[#F8F4E6] transition flex items-center gap-2">
              <Download className="h-4 w-4" />
              Exportar
            </button>
            <button className="px-4 py-2 border border-[#E8EAE0] rounded-lg hover:bg-[#F8F4E6] transition flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Importar
            </button>
            <button 
              onClick={() => router.push('/admin/operacional/participantes/novo')}
              className="px-4 py-2 bg-[#8B0000] text-white rounded-lg hover:bg-[#700000] transition font-medium flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Novo Participante
            </button>
          </div>
        </header>

        <div className="flex-1 p-8">
          {/* CARDS DE ESTATÍSTICAS */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E8EAE0] text-center">
              <p className="text-2xl font-bold text-[#2D343A]">{stats.total}</p>
              <p className="text-xs text-[#708090]">Total</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E8EAE0] text-center border-green-200">
              <p className="text-2xl font-bold text-green-600">{stats.aprovados}</p>
              <p className="text-xs text-[#708090]">Aprovados</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E8EAE0] text-center border-yellow-200">
              <p className="text-2xl font-bold text-yellow-600">{stats.pendentes}</p>
              <p className="text-xs text-[#708090]">Pendentes</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E8EAE0] text-center border-purple-200">
              <p className="text-2xl font-bold text-purple-600">{stats.banco}</p>
              <p className="text-xs text-[#708090]">Banco de Talentos</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E8EAE0] text-center border-red-200">
              <p className="text-2xl font-bold text-red-600">{stats.reprovados}</p>
              <p className="text-xs text-[#708090]">Reprovados</p>
            </div>
          </div>

          {/* FILTROS */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex-1 min-w-[200px] relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#708090]" />
              <input 
                type="text" 
                placeholder="Buscar participantes por nome, cargo ou cidade..." 
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
              <option value="aprovado">Aprovado</option>
              <option value="pendente">Pendente</option>
              <option value="banco">Banco de Talentos</option>
              <option value="reprovado">Reprovado</option>
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
          <div className="bg-white rounded-xl shadow-sm border border-[#E8EAE0] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#F8F4E6]">
                  <tr>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Participante</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Contato</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Cidade</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Cargo</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Data</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredParticipantes.map((item) => {
                    const status = statusConfig[item.status as keyof typeof statusConfig]
                    const Icon = status?.icon || Clock
                    return (
                      <tr key={item.id} className="border-b border-[#E8EAE0] hover:bg-[#F8F4E6] transition">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-[#8B0000]" />
                            <span className="font-medium text-[#2D343A]">{item.nome}</span>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {item.competencias.slice(0, 2).map((comp, i) => (
                              <span key={i} className="px-1.5 py-0.5 bg-[#F8F4E6] rounded text-xs text-[#708090]">
                                {comp}
                              </span>
                            ))}
                            {item.competencias.length > 2 && (
                              <span className="px-1.5 py-0.5 text-xs text-[#708090]">
                                +{item.competencias.length - 2}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-[#708090]">{item.telefone}</td>
                        <td className="py-3 px-4 text-[#708090]">{item.cidade}</td>
                        <td className="py-3 px-4 text-[#708090]">{item.cargo}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${status?.color} flex items-center gap-1 w-fit`}>
                            <Icon className="h-3 w-3" />
                            {status?.label}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-[#708090]">{item.data}</td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <button 
                              onClick={() => router.push(`/admin/operacional/participantes/${item.id}`)}
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
              <p>Mostrando {filteredParticipantes.length} de {participantes.length} participantes</p>
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
