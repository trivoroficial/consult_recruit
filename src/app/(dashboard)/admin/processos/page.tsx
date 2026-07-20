'use client'

import { SidebarAdmin } from '@/components/dashboard/SidebarAdmin'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import { 
  Briefcase, Building2, Users, Calendar, 
  Eye, Edit, CheckCircle, Clock, XCircle,
  Search, Filter, ArrowUpDown
} from 'lucide-react'

export default function AdminProcessos() {
  // DADOS DE EXEMPLO
  const processos = [
    { 
      id: 1, 
      vaga: 'Analista Administrativo', 
      empresa: 'Empresa XPTO', 
      status: 'entrevista', 
      candidatos: 8,
      inicio: '01/07/2026',
      responsavel: 'João Silva'
    },
    { 
      id: 2, 
      vaga: 'Auxiliar de RH', 
      empresa: 'Indústria ABC', 
      status: 'triagem', 
      candidatos: 15,
      inicio: '05/07/2026',
      responsavel: 'Maria Santos'
    },
    { 
      id: 3, 
      vaga: 'Assistente Financeiro', 
      empresa: 'Grupo Financeiro', 
      status: 'aprovado', 
      candidatos: 3,
      inicio: '10/07/2026',
      responsavel: 'Pedro Costa'
    },
    { 
      id: 4, 
      vaga: 'Supervisor de Produção', 
      empresa: 'Indústria XYZ', 
      status: 'encerrado', 
      candidatos: 12,
      inicio: '20/06/2026',
      responsavel: 'Ana Oliveira'
    },
  ]

  const statusConfig = {
    triagem: { label: 'Triagem', color: 'bg-yellow-100 text-yellow-700', icon: Clock },
    entrevista: { label: 'Entrevista', color: 'bg-blue-100 text-blue-700', icon: Users },
    aprovado: { label: 'Aprovado', color: 'bg-green-100 text-green-700', icon: CheckCircle },
    encerrado: { label: 'Encerrado', color: 'bg-gray-100 text-gray-700', icon: XCircle },
  }

  const totalProcessos = processos.length
  const triagem = processos.filter(p => p.status === 'triagem').length
  const entrevista = processos.filter(p => p.status === 'entrevista').length
  const aprovado = processos.filter(p => p.status === 'aprovado').length

  return (
    <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
      <SidebarAdmin />
      
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <header className="bg-white border-b border-[#E8EAE0] px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#2D343A]">Processos Seletivos</h1>
            <p className="text-sm text-[#708090]">Acompanhe todos os processos em andamento</p>
          </div>
          <button className="px-4 py-2 bg-[#8B0000] text-white rounded-lg hover:bg-[#700000] transition font-medium flex items-center gap-2">
            <Briefcase className="h-4 w-4" />
            Novo Processo
          </button>
        </header>

        <div className="flex-1 p-8">
          {/* CARDS DE RESUMO */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E8EAE0] text-center">
              <p className="text-2xl font-bold text-[#8B0000]">{totalProcessos}</p>
              <p className="text-sm text-[#708090]">Total de Processos</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E8EAE0] text-center">
              <p className="text-2xl font-bold text-[#D97706]">{triagem}</p>
              <p className="text-sm text-[#708090]">Em Triagem</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E8EAE0] text-center">
              <p className="text-2xl font-bold text-[#2563EB]">{entrevista}</p>
              <p className="text-sm text-[#708090]">Em Entrevista</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E8EAE0] text-center">
              <p className="text-2xl font-bold text-[#16A34A]">{aprovado}</p>
              <p className="text-sm text-[#708090]">Aprovados</p>
            </div>
          </div>

          {/* TABELA DE PROCESSOS */}
          <div className="bg-white rounded-xl shadow-sm border border-[#E8EAE0] p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#708090]" />
                <input 
                  type="text" 
                  placeholder="Buscar processos por vaga, empresa ou responsável..." 
                  className="w-full pl-10 pr-4 py-2 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
                />
              </div>
              <button className="px-4 py-2 border border-[#E8EAE0] rounded-lg hover:bg-[#F8F4E6] transition flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filtrar
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#F8F4E6]">
                  <tr>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Vaga</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Empresa</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Candidatos</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Início</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Responsável</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {processos.map((item) => {
                    const status = statusConfig[item.status as keyof typeof statusConfig]
                    const Icon = status?.icon || Clock
                    return (
                      <tr key={item.id} className="border-b border-[#E8EAE0] hover:bg-[#F8F4E6] transition">
                        <td className="py-3 px-4 font-medium text-[#2D343A]">{item.vaga}</td>
                        <td className="py-3 px-4 text-[#708090]">{item.empresa}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${status?.color} flex items-center gap-1 w-fit`}>
                            <Icon className="h-3 w-3" />
                            {status?.label}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-[#708090]">{item.candidatos}</td>
                        <td className="py-3 px-4 text-[#708090]">{item.inicio}</td>
                        <td className="py-3 px-4 text-[#708090]">{item.responsavel}</td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <button className="p-1 hover:bg-[#F8F4E6] rounded" title="Visualizar">
                              <Eye className="h-4 w-4 text-[#708090]" />
                            </button>
                            <button className="p-1 hover:bg-[#F8F4E6] rounded" title="Editar">
                              <Edit className="h-4 w-4 text-[#708090]" />
                            </button>
                            <button className="p-1 hover:bg-[#F8F4E6] rounded" title="Avançar etapa">
                              <ArrowUpDown className="h-4 w-4 text-[#8B0000]" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between mt-4 text-sm text-[#708090]">
              <p>Mostrando {processos.length} processos</p>
              <div className="flex gap-2">
                <button className="px-3 py-1 border border-[#E8EAE0] rounded hover:bg-[#F8F4E6]">Anterior</button>
                <button className="px-3 py-1 bg-[#8B0000] text-white rounded">1</button>
                <button className="px-3 py-1 border border-[#E8EAE0] rounded hover:bg-[#F8F4E6]">Próximo</button>
              </div>
            </div>
          </div>

          {/* LEGENDA */}
          <div className="mt-6 flex flex-wrap gap-4 text-sm text-[#708090]">
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 bg-yellow-100 rounded-full"></span> Triagem
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 bg-blue-100 rounded-full"></span> Entrevista
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 bg-green-100 rounded-full"></span> Aprovado
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 bg-gray-100 rounded-full"></span> Encerrado
            </span>
          </div>
        </div>

        <DashboardFooter />
      </div>
    </div>
  )
}
