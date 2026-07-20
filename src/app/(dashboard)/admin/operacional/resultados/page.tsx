'use client'

import { useState } from 'react'
import { SidebarAdmin } from '@/components/dashboard/SidebarAdmin'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import { 
  TrendingUp, Users, CheckCircle, XCircle, Clock, Award,
  Search, Filter, Download, Eye, BarChart3, PieChart,
  Building2, Briefcase, Calendar
} from 'lucide-react'

export default function OperacionalResultados() {
  const [periodo, setPeriodo] = useState('mes')

  const stats = {
    total: 347,
    aprovados: 82,
    reprovados: 156,
    bancoTalentos: 64,
    pendentes: 45,
    contratados: 32
  }

  const resultadosPorProcesso = [
    { processo: 'Operador de Produção', total: 48, aprovados: 12, reprovados: 28, banco: 8, contratados: 5 },
    { processo: 'Auxiliar de Logística', total: 32, aprovados: 8, reprovados: 18, banco: 6, contratados: 3 },
    { processo: 'Soldador', total: 25, aprovados: 6, reprovados: 15, banco: 4, contratados: 2 },
    { processo: 'Motorista', total: 18, aprovados: 4, reprovados: 10, banco: 4, contratados: 1 },
  ]

  return (
    <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
      <SidebarAdmin />
      
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <header className="bg-white border-b border-[#E8EAE0] px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#2D343A]">Resultados Operacionais</h1>
            <p className="text-sm text-[#708090]">Análise de resultados dos processos seletivos</p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 border border-[#E8EAE0] rounded-lg hover:bg-[#F8F4E6] transition flex items-center gap-2">
              <Download className="h-4 w-4" />
              Exportar
            </button>
            <button className="px-4 py-2 border border-[#8B0000] text-[#8B0000] rounded-lg hover:bg-[#8B0000] hover:text-white transition flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Relatórios
            </button>
          </div>
        </header>

        <div className="flex-1 p-8">
          {/* FILTRO DE PERÍODO */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex bg-white border border-[#E8EAE0] rounded-lg overflow-hidden">
              <button 
                onClick={() => setPeriodo('semana')}
                className={`px-4 py-2 text-sm font-medium transition ${periodo === 'semana' ? 'bg-[#8B0000] text-white' : 'text-[#708090] hover:bg-[#F8F4E6]'}`}
              >
                Semana
              </button>
              <button 
                onClick={() => setPeriodo('mes')}
                className={`px-4 py-2 text-sm font-medium transition ${periodo === 'mes' ? 'bg-[#8B0000] text-white' : 'text-[#708090] hover:bg-[#F8F4E6]'}`}
              >
                Mês
              </button>
              <button 
                onClick={() => setPeriodo('trimestre')}
                className={`px-4 py-2 text-sm font-medium transition ${periodo === 'trimestre' ? 'bg-[#8B0000] text-white' : 'text-[#708090] hover:bg-[#F8F4E6]'}`}
              >
                Trimestre
              </button>
              <button 
                onClick={() => setPeriodo('ano')}
                className={`px-4 py-2 text-sm font-medium transition ${periodo === 'ano' ? 'bg-[#8B0000] text-white' : 'text-[#708090] hover:bg-[#F8F4E6]'}`}
              >
                Ano
              </button>
            </div>
            <div className="flex-1"></div>
            <button className="px-4 py-2 border border-[#E8EAE0] rounded-lg hover:bg-[#F8F4E6] transition flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filtrar
            </button>
          </div>

          {/* CARDS PRINCIPAIS */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-8">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E8EAE0] text-center">
              <p className="text-2xl font-bold text-[#2D343A]">{stats.total}</p>
              <p className="text-xs text-[#708090]">Total</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E8EAE0] text-center border-green-200">
              <p className="text-2xl font-bold text-green-600">{stats.aprovados}</p>
              <p className="text-xs text-[#708090]">Aprovados</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E8EAE0] text-center border-red-200">
              <p className="text-2xl font-bold text-red-600">{stats.reprovados}</p>
              <p className="text-xs text-[#708090]">Reprovados</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E8EAE0] text-center border-purple-200">
              <p className="text-2xl font-bold text-purple-600">{stats.bancoTalentos}</p>
              <p className="text-xs text-[#708090]">Banco</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E8EAE0] text-center border-yellow-200">
              <p className="text-2xl font-bold text-yellow-600">{stats.pendentes}</p>
              <p className="text-xs text-[#708090]">Pendentes</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E8EAE0] text-center border-blue-200">
              <p className="text-2xl font-bold text-blue-600">{stats.contratados}</p>
              <p className="text-xs text-[#708090]">Contratados</p>
            </div>
          </div>

          {/* TAXA DE CONVERSÃO */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-[#E8EAE0] p-6">
              <h3 className="text-sm font-medium text-[#708090]">Taxa de Aprovação</h3>
              <p className="text-3xl font-bold text-[#2D343A] mt-2">
                {Math.round((stats.aprovados / stats.total) * 100)}%
              </p>
              <div className="w-full bg-[#E8EAE0] rounded-full h-2 mt-3">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: `${(stats.aprovados / stats.total) * 100}%` }}></div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-[#E8EAE0] p-6">
              <h3 className="text-sm font-medium text-[#708090]">Taxa de Contratação</h3>
              <p className="text-3xl font-bold text-[#2D343A] mt-2">
                {Math.round((stats.contratados / stats.total) * 100)}%
              </p>
              <div className="w-full bg-[#E8EAE0] rounded-full h-2 mt-3">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${(stats.contratados / stats.total) * 100}%` }}></div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-[#E8EAE0] p-6">
              <h3 className="text-sm font-medium text-[#708090]">Banco de Talentos</h3>
              <p className="text-3xl font-bold text-[#2D343A] mt-2">{stats.bancoTalentos}</p>
              <p className="text-sm text-[#708090] mt-1">Participantes em banco</p>
            </div>
          </div>

          {/* RESULTADOS POR PROCESSO */}
          <div className="bg-white rounded-xl shadow-sm border border-[#E8EAE0] overflow-hidden">
            <div className="px-6 py-4 border-b border-[#E8EAE0] flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[#2D343A]">Resultados por Processo</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#F8F4E6]">
                  <tr>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Processo</th>
                    <th className="text-center py-3 px-4 text-sm font-semibold text-[#2D343A]">Total</th>
                    <th className="text-center py-3 px-4 text-sm font-semibold text-[#2D343A] text-green-600">Aprovados</th>
                    <th className="text-center py-3 px-4 text-sm font-semibold text-[#2D343A] text-red-600">Reprovados</th>
                    <th className="text-center py-3 px-4 text-sm font-semibold text-[#2D343A] text-purple-600">Banco</th>
                    <th className="text-center py-3 px-4 text-sm font-semibold text-[#2D343A] text-blue-600">Contratados</th>
                    <th className="text-center py-3 px-4 text-sm font-semibold text-[#2D343A]">Conversão</th>
                  </tr>
                </thead>
                <tbody>
                  {resultadosPorProcesso.map((item, index) => (
                    <tr key={index} className="border-b border-[#E8EAE0] hover:bg-[#F8F4E6] transition">
                      <td className="py-3 px-4 font-medium text-[#2D343A]">{item.processo}</td>
                      <td className="py-3 px-4 text-center">{item.total}</td>
                      <td className="py-3 px-4 text-center text-green-600 font-medium">{item.aprovados}</td>
                      <td className="py-3 px-4 text-center text-red-600 font-medium">{item.reprovados}</td>
                      <td className="py-3 px-4 text-center text-purple-600 font-medium">{item.banco}</td>
                      <td className="py-3 px-4 text-center text-blue-600 font-medium">{item.contratados}</td>
                      <td className="py-3 px-4 text-center">
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                          {Math.round((item.contratados / item.total) * 100)}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <DashboardFooter />
      </div>
    </div>
  )
}
