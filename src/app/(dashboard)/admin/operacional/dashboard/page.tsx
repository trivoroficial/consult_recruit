'use client'

import { SidebarAdmin } from '@/components/dashboard/SidebarAdmin'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import { 
  Users, Briefcase, Calendar, TrendingUp, 
  CheckCircle, Clock, XCircle, UserPlus,
  FileText, Award, BarChart3, Building2
} from 'lucide-react'

export default function OperacionalDashboard() {
  // DADOS DE EXEMPLO
  const stats = {
    totalProcessos: 12,
    totalParticipantes: 347,
    entrevistasHoje: 8,
    contratacoes: 45,
    aprovados: 82,
    reprovados: 156,
    bancoTalentos: 64,
    pendentes: 45
  }

  const processosRecentes = [
    { id: 1, nome: 'Operador de Produção', empresa: 'Indústria ABC', candidatos: 48, status: 'ativo', data: '15/07/2026' },
    { id: 2, nome: 'Auxiliar de Logística', empresa: 'Grupo Logística', candidatos: 32, status: 'ativo', data: '12/07/2026' },
    { id: 3, nome: 'Soldador', empresa: 'Metalúrgica XYZ', candidatos: 25, status: 'concluido', data: '10/07/2026' },
    { id: 4, nome: 'Motorista', empresa: 'Transportadora Express', candidatos: 18, status: 'ativo', data: '08/07/2026' },
  ]

  const statusColors = {
    ativo: 'bg-green-100 text-green-700',
    concluido: 'bg-blue-100 text-blue-700',
    pausado: 'bg-yellow-100 text-yellow-700',
  }

  return (
    <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
      <SidebarAdmin />
      
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        {/* HEADER */}
        <header className="bg-white border-b border-[#E8EAE0] px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#2D343A]">Dashboard Operacional</h1>
            <p className="text-sm text-[#708090]">Gerencie processos seletivos presenciais e operacionais</p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 border border-[#8B0000] text-[#8B0000] rounded-lg hover:bg-[#8B0000] hover:text-white transition font-medium flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Relatórios
            </button>
            <button className="px-4 py-2 bg-[#8B0000] text-white rounded-lg hover:bg-[#700000] transition font-medium flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              Novo Processo
            </button>
          </div>
        </header>

        {/* CONTEÚDO */}
        <div className="flex-1 p-8">
          {/* CARDS PRINCIPAIS */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E8EAE0] hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-[#2D343A]">{stats.totalProcessos}</p>
                  <p className="text-sm text-[#708090]">Processos Ativos</p>
                </div>
                <div className="p-3 bg-[#8B0000]/10 rounded-lg">
                  <Briefcase className="h-6 w-6 text-[#8B0000]" />
                </div>
              </div>
              <div className="mt-2 text-xs text-green-600">↑ 12% este mês</div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E8EAE0] hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-[#2D343A]">{stats.totalParticipantes}</p>
                  <p className="text-sm text-[#708090]">Participantes</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-2 text-xs text-blue-600">↑ 8% este mês</div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E8EAE0] hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-[#2D343A]">{stats.entrevistasHoje}</p>
                  <p className="text-sm text-[#708090]">Entrevistas Hoje</p>
                </div>
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <Calendar className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
              <div className="mt-2 text-xs text-yellow-600">3 pendentes</div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E8EAE0] hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-[#2D343A]">{stats.contratacoes}</p>
                  <p className="text-sm text-[#708090]">Contratações</p>
                </div>
                <div className="p-3 bg-green-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div className="mt-2 text-xs text-green-600">↑ 22% este mês</div>
            </div>
          </div>

          {/* CARDS SECUNDÁRIOS */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E8EAE0] flex items-center gap-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-lg font-bold text-[#2D343A]">{stats.aprovados}</p>
                <p className="text-xs text-[#708090]">Aprovados</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E8EAE0] flex items-center gap-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <XCircle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-lg font-bold text-[#2D343A]">{stats.reprovados}</p>
                <p className="text-xs text-[#708090]">Reprovados</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E8EAE0] flex items-center gap-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Award className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-lg font-bold text-[#2D343A]">{stats.bancoTalentos}</p>
                <p className="text-xs text-[#708090]">Banco de Talentos</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E8EAE0] flex items-center gap-4">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-lg font-bold text-[#2D343A]">{stats.pendentes}</p>
                <p className="text-xs text-[#708090]">Pendentes</p>
              </div>
            </div>
          </div>

          {/* PROCESSOS RECENTES */}
          <div className="bg-white rounded-xl shadow-sm border border-[#E8EAE0] p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-[#2D343A]">Processos Ativos</h2>
              <button className="text-sm text-[#8B0000] hover:text-[#700000] font-medium">Ver todos</button>
            </div>
            <div className="space-y-3">
              {processosRecentes.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 border border-[#E8EAE0] rounded-lg hover:bg-[#F8F4E6] transition">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-[#8B0000]/10 rounded-lg">
                      <Briefcase className="h-5 w-5 text-[#8B0000]" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#2D343A]">{item.nome}</p>
                      <p className="text-sm text-[#708090]">{item.empresa} • {item.candidatos} candidatos</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[item.status as keyof typeof statusColors]}`}>
                      {item.status === 'ativo' ? 'Ativo' : item.status === 'concluido' ? 'Concluído' : 'Pausado'}
                    </span>
                    <span className="text-sm text-[#708090]">{item.data}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DashboardFooter />
      </div>
    </div>
  )
}
