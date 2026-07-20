'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { SidebarAdmin } from '@/components/dashboard/SidebarAdmin'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import { 
  Calendar, Plus, Search, Filter, Eye, Edit, Trash2,
  User, Briefcase, Clock, CheckCircle, XCircle, Video,
  Phone, MapPin, Users, ArrowUpDown, FileText,
  Calendar as CalendarIcon, Award, MoreVertical
} from 'lucide-react'

export default function OperacionalEntrevistas() {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('todos')
  const [modalidadeFilter, setModalidadeFilter] = useState('todas')

  const entrevistas = [
    { 
      id: 1, 
      participante: 'João Silva', 
      cargo: 'Operador de Produção',
      processo: 'Produção - Indústria ABC',
      data: '20/07/2026',
      hora: '09:00',
      modalidade: 'presencial',
      local: 'Av. Brasil, 1000 - Uberlândia/MG',
      tipo: 'Entrevista RH',
      status: 'concluida',
      entrevistador: 'Maria Santos',
      resultado: 'aprovado',
      duracao: '25 min'
    },
    { 
      id: 2, 
      participante: 'Maria Santos', 
      cargo: 'Auxiliar de Logística',
      processo: 'Logística - Grupo Logística',
      data: '20/07/2026',
      hora: '14:00',
      modalidade: 'presencial',
      local: 'Av. Amazonas, 500 - Uberlândia/MG',
      tipo: 'Entrevista RH',
      status: 'pendente',
      entrevistador: 'João Silva',
      resultado: null,
      duracao: null
    },
    { 
      id: 3, 
      participante: 'Pedro Costa', 
      cargo: 'Soldador',
      processo: 'Metalúrgica XYZ',
      data: '21/07/2026',
      hora: '10:30',
      modalidade: 'online',
      local: 'https://meet.google.com/abc-defg-hij',
      tipo: 'Entrevista Técnica',
      status: 'concluida',
      entrevistador: 'Ana Oliveira',
      resultado: 'aprovado',
      duracao: '35 min'
    },
    { 
      id: 4, 
      participante: 'Ana Oliveira', 
      cargo: 'Motorista',
      processo: 'Transportadora Express',
      data: '21/07/2026',
      hora: '16:00',
      modalidade: 'presencial',
      local: 'Av. Goiás, 200 - Uberlândia/MG',
      tipo: 'Entrevista Gestor',
      status: 'cancelada',
      entrevistador: 'Pedro Costa',
      resultado: null,
      duracao: null
    },
    { 
      id: 5, 
      participante: 'Carlos Santos', 
      cargo: 'Auxiliar de Produção',
      processo: 'Produção - Indústria ABC',
      data: '22/07/2026',
      hora: '08:30',
      modalidade: 'online',
      local: 'https://meet.google.com/xyz-abc-def',
      tipo: 'Triagem',
      status: 'agendada',
      entrevistador: 'Maria Santos',
      resultado: null,
      duracao: null
    },
  ]

  const statusConfig = {
    concluida: { label: 'Concluída', color: 'bg-green-100 text-green-700', icon: CheckCircle },
    pendente: { label: 'Pendente', color: 'bg-yellow-100 text-yellow-700', icon: Clock },
    agendada: { label: 'Agendada', color: 'bg-blue-100 text-blue-700', icon: CalendarIcon },
    cancelada: { label: 'Cancelada', color: 'bg-red-100 text-red-700', icon: XCircle },
  }

  const modalidadeConfig = {
    presencial: { label: 'Presencial', icon: MapPin, color: 'bg-purple-100 text-purple-700' },
    online: { label: 'Online', icon: Video, color: 'bg-blue-100 text-blue-700' },
    telefone: { label: 'Telefone', icon: Phone, color: 'bg-green-100 text-green-700' },
  }

  const filteredEntrevistas = entrevistas.filter(item => {
    const matchSearch = item.participante.toLowerCase().includes(search.toLowerCase()) ||
                         item.cargo.toLowerCase().includes(search.toLowerCase()) ||
                         item.processo.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'todos' || item.status === statusFilter
    const matchModalidade = modalidadeFilter === 'todas' || item.modalidade === modalidadeFilter
    return matchSearch && matchStatus && matchModalidade
  })

  const stats = {
    total: entrevistas.length,
    concluidas: entrevistas.filter(e => e.status === 'concluida').length,
    pendentes: entrevistas.filter(e => e.status === 'pendente').length,
    agendadas: entrevistas.filter(e => e.status === 'agendada').length,
    canceladas: entrevistas.filter(e => e.status === 'cancelada').length,
    hoje: entrevistas.filter(e => e.data === '20/07/2026').length,
  }

  return (
    <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
      <SidebarAdmin />
      
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <header className="bg-white border-b border-[#E8EAE0] px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#2D343A]">Entrevistas Operacionais</h1>
            <p className="text-sm text-[#708090]">Gerencie todas as entrevistas presenciais e online</p>
          </div>
          <button 
            onClick={() => router.push('/admin/operacional/entrevistas/nova')}
            className="px-4 py-2 bg-[#8B0000] text-white rounded-lg hover:bg-[#700000] transition font-medium flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Nova Entrevista
          </button>
        </header>

        <div className="flex-1 p-8">
          {/* CARDS DE ESTATÍSTICAS */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E8EAE0] text-center">
              <p className="text-2xl font-bold text-[#2D343A]">{stats.total}</p>
              <p className="text-xs text-[#708090]">Total</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E8EAE0] text-center border-blue-200">
              <p className="text-2xl font-bold text-blue-600">{stats.hoje}</p>
              <p className="text-xs text-[#708090]">Hoje</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E8EAE0] text-center border-green-200">
              <p className="text-2xl font-bold text-green-600">{stats.concluidas}</p>
              <p className="text-xs text-[#708090]">Concluídas</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E8EAE0] text-center border-yellow-200">
              <p className="text-2xl font-bold text-yellow-600">{stats.pendentes}</p>
              <p className="text-xs text-[#708090]">Pendentes</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E8EAE0] text-center border-blue-200">
              <p className="text-2xl font-bold text-blue-600">{stats.agendadas}</p>
              <p className="text-xs text-[#708090]">Agendadas</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E8EAE0] text-center border-red-200">
              <p className="text-2xl font-bold text-red-600">{stats.canceladas}</p>
              <p className="text-xs text-[#708090]">Canceladas</p>
            </div>
          </div>

          {/* FILTROS */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex-1 min-w-[200px] relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#708090]" />
              <input 
                type="text" 
                placeholder="Buscar entrevistas por participante, cargo ou processo..." 
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
              <option value="concluida">Concluída</option>
              <option value="pendente">Pendente</option>
              <option value="agendada">Agendada</option>
              <option value="cancelada">Cancelada</option>
            </select>
            <select
              className="px-4 py-2 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] bg-white"
              value={modalidadeFilter}
              onChange={(e) => setModalidadeFilter(e.target.value)}
            >
              <option value="todas">Todas as Modalidades</option>
              <option value="presencial">Presencial</option>
              <option value="online">Online</option>
              <option value="telefone">Telefone</option>
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
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Cargo</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Processo</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Data/Hora</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Modalidade</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Entrevistador</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEntrevistas.map((item) => {
                    const status = statusConfig[item.status as keyof typeof statusConfig]
                    const modalidade = modalidadeConfig[item.modalidade as keyof typeof modalidadeConfig]
                    const Icon = status?.icon || Clock
                    const ModalIcon = modalidade?.icon || MapPin
                    return (
                      <tr key={item.id} className="border-b border-[#E8EAE0] hover:bg-[#F8F4E6] transition">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-[#8B0000]" />
                            <span className="font-medium text-[#2D343A]">{item.participante}</span>
                          </div>
                          {item.resultado && (
                            <span className={`text-xs ${item.resultado === 'aprovado' ? 'text-green-600' : 'text-red-600'}`}>
                              {item.resultado === 'aprovado' ? '✅ Aprovado' : '❌ Reprovado'}
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-[#708090]">{item.cargo}</td>
                        <td className="py-3 px-4 text-[#708090]">{item.processo}</td>
                        <td className="py-3 px-4 text-[#708090]">
                          <div>{item.data}</div>
                          <div className="text-xs">{item.hora}</div>
                          {item.duracao && (
                            <div className="text-xs text-[#708090]">⏱ {item.duracao}</div>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`flex items-center gap-1 text-sm ${modalidade?.color || 'text-[#708090]'}`}>
                            <ModalIcon className="h-3 w-3" />
                            {modalidade?.label}
                          </span>
                          {item.modalidade === 'presencial' && item.local && (
                            <div className="text-xs text-[#708090] truncate max-w-[120px]">{item.local}</div>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${status?.color} flex items-center gap-1 w-fit`}>
                            <Icon className="h-3 w-3" />
                            {status?.label}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-[#708090] text-sm">{item.entrevistador}</td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <button 
                              onClick={() => router.push(`/admin/operacional/entrevistas/${item.id}`)}
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
              <p>Mostrando {filteredEntrevistas.length} de {entrevistas.length} entrevistas</p>
              <div className="flex gap-2">
                <button className="px-3 py-1 border border-[#E8EAE0] rounded hover:bg-[#F8F4E6]">Anterior</button>
                <button className="px-3 py-1 bg-[#8B0000] text-white rounded">1</button>
                <button className="px-3 py-1 border border-[#E8EAE0] rounded hover:bg-[#F8F4E6]">2</button>
                <button className="px-3 py-1 border border-[#E8EAE0] rounded hover:bg-[#F8F4E6]">3</button>
                <button className="px-3 py-1 border border-[#E8EAE0] rounded hover:bg-[#F8F4E6]">Próximo</button>
              </div>
            </div>
          </div>

          {/* LEGENDA */}
          <div className="mt-6 flex flex-wrap gap-4 text-sm text-[#708090]">
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 bg-green-100 rounded-full"></span> Concluída
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 bg-yellow-100 rounded-full"></span> Pendente
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 bg-blue-100 rounded-full"></span> Agendada
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 bg-red-100 rounded-full"></span> Cancelada
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3 text-purple-600" /> Presencial
            </span>
            <span className="flex items-center gap-1">
              <Video className="h-3 w-3 text-blue-600" /> Online
            </span>
          </div>
        </div>

        <DashboardFooter />
      </div>
    </div>
  )
}
