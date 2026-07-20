'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { SidebarAdmin } from '@/components/dashboard/SidebarAdmin'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import { 
  Calendar, Plus, Search, Filter, Eye, Edit, Trash2,
  User, Briefcase, Clock, CheckCircle, XCircle, Video,
  Phone, MapPin, Users, ArrowUpDown
} from 'lucide-react'

export default function OperacionalEntrevistas() {
  const router = useRouter()
  const [search, setSearch] = useState('')

  const entrevistas = [
    { 
      id: 1, 
      participante: 'João Silva', 
      cargo: 'Operador de Produção',
      processo: 'Produção - Indústria ABC',
      data: '20/07/2026',
      hora: '09:00',
      modalidade: 'presencial',
      status: 'concluida'
    },
    { 
      id: 2, 
      participante: 'Maria Santos', 
      cargo: 'Auxiliar de Logística',
      processo: 'Logística - Grupo Logística',
      data: '20/07/2026',
      hora: '14:00',
      modalidade: 'presencial',
      status: 'pendente'
    },
    { 
      id: 3, 
      participante: 'Pedro Costa', 
      cargo: 'Soldador',
      processo: 'Metalúrgica XYZ',
      data: '21/07/2026',
      hora: '10:30',
      modalidade: 'online',
      status: 'concluida'
    },
    { 
      id: 4, 
      participante: 'Ana Oliveira', 
      cargo: 'Motorista',
      processo: 'Transportadora Express',
      data: '21/07/2026',
      hora: '16:00',
      modalidade: 'presencial',
      status: 'cancelada'
    },
  ]

  const statusConfig = {
    concluida: { label: 'Concluída', color: 'bg-green-100 text-green-700', icon: CheckCircle },
    pendente: { label: 'Pendente', color: 'bg-yellow-100 text-yellow-700', icon: Clock },
    cancelada: { label: 'Cancelada', color: 'bg-red-100 text-red-700', icon: XCircle },
  }

  const modalidadeConfig = {
    presencial: { label: 'Presencial', icon: MapPin },
    online: { label: 'Online', icon: Video },
    telefone: { label: 'Telefone', icon: Phone },
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
          {/* FILTROS */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#708090]" />
              <input 
                type="text" 
                placeholder="Buscar entrevistas por participante, cargo ou processo..." 
                className="w-full pl-10 pr-4 py-2 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button className="px-4 py-2 border border-[#E8EAE0] rounded-lg hover:bg-[#F8F4E6] transition flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filtrar
            </button>
            <button className="px-4 py-2 border border-[#E8EAE0] rounded-lg hover:bg-[#F8F4E6] transition flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Hoje
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
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {entrevistas.map((item) => {
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
                        </td>
                        <td className="py-3 px-4 text-[#708090]">{item.cargo}</td>
                        <td className="py-3 px-4 text-[#708090]">{item.processo}</td>
                        <td className="py-3 px-4 text-[#708090]">{item.data} às {item.hora}</td>
                        <td className="py-3 px-4">
                          <span className="flex items-center gap-1 text-sm text-[#708090]">
                            <ModalIcon className="h-3 w-3" />
                            {modalidade?.label}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${status?.color} flex items-center gap-1 w-fit`}>
                            <Icon className="h-3 w-3" />
                            {status?.label}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <button className="p-1 hover:bg-[#F8F4E6] rounded" title="Visualizar">
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
              <p>Mostrando {entrevistas.length} entrevistas</p>
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
