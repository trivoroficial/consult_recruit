'use client'

import { useState } from 'react'
import { Download, FileText, BarChart3, Users, Building2, Briefcase, TrendingUp, Calendar } from 'lucide-react'

const relatorios = [
  { id: 1, titulo: 'Relatório de Empresas', descricao: 'Lista completa de todas as empresas cadastradas', icone: <Building2 className="h-5 w-5" />, cor: 'bg-blue-500' },
  { id: 2, titulo: 'Relatório de Candidatos', descricao: 'Todos os candidatos cadastrados na plataforma', icone: <Users className="h-5 w-5" />, cor: 'bg-green-500' },
  { id: 3, titulo: 'Relatório de Vagas', descricao: 'Todas as vagas publicadas e seus status', icone: <Briefcase className="h-5 w-5" />, cor: 'bg-purple-500' },
  { id: 4, titulo: 'Relatório de Contratações', descricao: 'Contratações realizadas por período', icone: <TrendingUp className="h-5 w-5" />, cor: 'bg-orange-500' },
  { id: 5, titulo: 'Relatório de Processos', descricao: 'Processos seletivos por status e etapa', icone: <BarChart3 className="h-5 w-5" />, cor: 'bg-red-500' },
  { id: 6, titulo: 'Relatório de Entrevistas', descricao: 'Entrevistas realizadas e resultados', icone: <Calendar className="h-5 w-5" />, cor: 'bg-yellow-500' }
]

export default function AdminRelatorios() {
  const [periodo, setPeriodo] = useState('30')

  return (
    <div className="min-h-screen bg-gray-50/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* ===== HEADER ===== */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Central de Relatórios</h1>
            <p className="text-sm text-gray-500 mt-1">Gere relatórios completos da plataforma</p>
          </div>
          <div className="flex items-center gap-3">
            <select 
              className="px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:border-[#8B0000] focus:ring-2 focus:ring-[#8B0000]/20 outline-none transition bg-white"
              value={periodo}
              onChange={(e) => setPeriodo(e.target.value)}
            >
              <option value="7">Últimos 7 dias</option>
              <option value="30">Últimos 30 dias</option>
              <option value="90">Últimos 90 dias</option>
              <option value="365">Último ano</option>
            </select>
            <button className="px-4 py-2.5 text-sm font-semibold text-white bg-[#8B0000] rounded-xl hover:bg-[#700000] transition shadow-md shadow-[#8B0000]/20 flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Gerar Relatório
            </button>
          </div>
        </div>

        {/* ===== CARDS DE RELATÓRIOS ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatorios.map((relatorio) => (
            <div key={relatorio.id} className="group bg-white rounded-2xl border border-gray-100/80 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className={`${relatorio.cor} rounded-xl p-3 text-white shadow-lg`}>
                  {relatorio.icone}
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-gray-900">{relatorio.titulo}</h3>
                  <p className="text-sm text-gray-500 mt-1">{relatorio.descricao}</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs text-gray-400">Última atualização: 15/07/2026</span>
                <button className="text-sm font-medium text-[#8B0000] hover:text-[#700000] transition flex items-center gap-1">
                  <Download className="h-4 w-4" />
                  Exportar
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ===== GRÁFICOS ===== */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-gray-100/80 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contratações por Mês</h3>
            <div className="h-48 flex items-end gap-4">
              {['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'].map((mes, i) => {
                const altura = [60, 45, 80, 70, 55, 90][i]
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <div 
                      className="w-full bg-[#8B0000]/20 rounded-t-lg hover:bg-[#8B0000]/40 transition-all duration-300 relative group"
                      style={{ height: altura }}
                    >
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                        {altura} contratados
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">{mes}</span>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100/80 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Status das Vagas</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Ativas</span>
                  <span className="font-semibold text-gray-900">12</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full mt-1 overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: '48%' }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Em andamento</span>
                  <span className="font-semibold text-gray-900">8</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full mt-1 overflow-hidden">
                  <div className="h-full bg-yellow-500 rounded-full" style={{ width: '32%' }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Pausadas</span>
                  <span className="font-semibold text-gray-900">3</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full mt-1 overflow-hidden">
                  <div className="h-full bg-orange-500 rounded-full" style={{ width: '12%' }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Encerradas</span>
                  <span className="font-semibold text-gray-900">2</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full mt-1 overflow-hidden">
                  <div className="h-full bg-gray-400 rounded-full" style={{ width: '8%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
