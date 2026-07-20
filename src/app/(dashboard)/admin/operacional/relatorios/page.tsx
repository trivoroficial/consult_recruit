'use client'

import { useState } from 'react'
import { SidebarAdmin } from '@/components/dashboard/SidebarAdmin'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import { 
  FileText, Download, Search, Filter, Calendar,
  Building2, Briefcase, Users, TrendingUp,
  BarChart3, PieChart, Printer, Eye
} from 'lucide-react'

export default function OperacionalRelatorios() {
  const [tipo, setTipo] = useState('processo')

  const relatorios = [
    { id: 1, nome: 'Relatório de Processos', descricao: 'Visão geral de todos os processos', tipo: 'processo', atualizado: '20/07/2026' },
    { id: 2, nome: 'Relatório de Participantes', descricao: 'Análise de participantes por processo', tipo: 'participante', atualizado: '20/07/2026' },
    { id: 3, nome: 'Relatório de Resultados', descricao: 'Resumo de aprovações e reprovações', tipo: 'resultado', atualizado: '19/07/2026' },
    { id: 4, nome: 'Relatório de Contratações', descricao: 'Contratações realizadas por processo', tipo: 'contratacao', atualizado: '19/07/2026' },
    { id: 5, nome: 'Relatório de Banco de Talentos', descricao: 'Participantes em banco de talentos', tipo: 'banco', atualizado: '18/07/2026' },
    { id: 6, nome: 'Relatório de Entrevistas', descricao: 'Entrevistas realizadas e agendadas', tipo: 'entrevista', atualizado: '18/07/2026' },
  ]

  return (
    <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
      <SidebarAdmin />
      
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <header className="bg-white border-b border-[#E8EAE0] px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#2D343A]">Relatórios Operacionais</h1>
            <p className="text-sm text-[#708090]">Gere e exporte relatórios completos</p>
          </div>
          <button className="px-4 py-2 bg-[#8B0000] text-white rounded-lg hover:bg-[#700000] transition font-medium flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Novo Relatório
          </button>
        </header>

        <div className="flex-1 p-8">
          {/* FILTROS */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#708090]" />
              <input 
                type="text" 
                placeholder="Buscar relatórios..." 
                className="w-full pl-10 pr-4 py-2 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
              />
            </div>
            <button className="px-4 py-2 border border-[#E8EAE0] rounded-lg hover:bg-[#F8F4E6] transition flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filtrar
            </button>
            <button className="px-4 py-2 border border-[#E8EAE0] rounded-lg hover:bg-[#F8F4E6] transition flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Período
            </button>
          </div>

          {/* RELATÓRIOS DISPONÍVEIS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatorios.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-sm border border-[#E8EAE0] p-6 hover:shadow-lg transition hover:-translate-y-1">
                <div className="flex items-start justify-between">
                  <div className="p-3 bg-[#8B0000]/10 rounded-lg">
                    <FileText className="h-6 w-6 text-[#8B0000]" />
                  </div>
                  <span className="text-xs text-[#708090]">Atualizado: {item.atualizado}</span>
                </div>
                <h3 className="text-lg font-bold text-[#2D343A] mt-4">{item.nome}</h3>
                <p className="text-sm text-[#708090] mt-1">{item.descricao}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button className="flex-1 px-3 py-1.5 text-sm bg-[#8B0000] text-white rounded-lg hover:bg-[#700000] transition flex items-center justify-center gap-1">
                    <Eye className="h-4 w-4" />
                    Visualizar
                  </button>
                  <button className="flex-1 px-3 py-1.5 text-sm border border-[#8B0000] text-[#8B0000] rounded-lg hover:bg-[#8B0000] hover:text-white transition flex items-center justify-center gap-1">
                    <Download className="h-4 w-4" />
                    PDF
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* RELATÓRIOS RÁPIDOS */}
          <div className="mt-8 bg-white rounded-xl shadow-sm border border-[#E8EAE0] p-6">
            <h2 className="text-lg font-semibold text-[#2D343A] mb-4 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-[#8B0000]" />
              Relatórios Rápidos
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button className="p-4 border border-[#E8EAE0] rounded-lg hover:border-[#8B0000] hover:bg-[#F8F4E6] transition text-center">
                <Building2 className="h-8 w-8 text-[#8B0000] mx-auto mb-2" />
                <p className="text-sm font-medium text-[#2D343A]">Por Empresa</p>
              </button>
              <button className="p-4 border border-[#E8EAE0] rounded-lg hover:border-[#8B0000] hover:bg-[#F8F4E6] transition text-center">
                <Briefcase className="h-8 w-8 text-[#8B0000] mx-auto mb-2" />
                <p className="text-sm font-medium text-[#2D343A]">Por Cargo</p>
              </button>
              <button className="p-4 border border-[#E8EAE0] rounded-lg hover:border-[#8B0000] hover:bg-[#F8F4E6] transition text-center">
                <Users className="h-8 w-8 text-[#8B0000] mx-auto mb-2" />
                <p className="text-sm font-medium text-[#2D343A]">Por Cidade</p>
              </button>
              <button className="p-4 border border-[#E8EAE0] rounded-lg hover:border-[#8B0000] hover:bg-[#F8F4E6] transition text-center">
                <TrendingUp className="h-8 w-8 text-[#8B0000] mx-auto mb-2" />
                <p className="text-sm font-medium text-[#2D343A]">Por Resultado</p>
              </button>
            </div>
          </div>
        </div>

        <DashboardFooter />
      </div>
    </div>
  )
}
