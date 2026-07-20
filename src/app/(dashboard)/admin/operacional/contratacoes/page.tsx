'use client'

import { useState } from 'react'
import { SidebarAdmin } from '@/components/dashboard/SidebarAdmin'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import { 
  Users, Search, Filter, Eye, Download, 
  Building2, Briefcase, Calendar, CheckCircle,
  FileText, User, TrendingUp, Award
} from 'lucide-react'

export default function OperacionalContratacoes() {
  const [search, setSearch] = useState('')

  const contratacoes = [
    { 
      id: 1, 
      nome: 'João Silva', 
      cargo: 'Operador de Produção',
      empresa: 'Indústria ABC',
      data: '15/07/2026',
      status: 'efetivado',
      salario: 'R$ 2.500,00',
      processo: 'Operador de Produção'
    },
    { 
      id: 2, 
      nome: 'Carlos Santos', 
      cargo: 'Auxiliar de Logística',
      empresa: 'Grupo Logística',
      data: '12/07/2026',
      status: 'experiencia',
      salario: 'R$ 2.200,00',
      processo: 'Auxiliar de Logística'
    },
    { 
      id: 3, 
      nome: 'Mariana Lima', 
      cargo: 'Soldador',
      empresa: 'Metalúrgica XYZ',
      data: '10/07/2026',
      status: 'efetivado',
      salario: 'R$ 3.000,00',
      processo: 'Soldador'
    },
    { 
      id: 4, 
      nome: 'Ana Oliveira', 
      cargo: 'Motorista',
      empresa: 'Transportadora Express',
      data: '08/07/2026',
      status: 'experiencia',
      salario: 'R$ 2.800,00',
      processo: 'Motorista'
    },
  ]

  const totalContratacoes = contratacoes.length
  const efetivados = contratacoes.filter(c => c.status === 'efetivado').length
  const experiencia = contratacoes.filter(c => c.status === 'experiencia').length

  return (
    <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
      <SidebarAdmin />
      
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <header className="bg-white border-b border-[#E8EAE0] px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#2D343A]">Contratações</h1>
            <p className="text-sm text-[#708090]">Histórico de contratações realizadas</p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 border border-[#E8EAE0] rounded-lg hover:bg-[#F8F4E6] transition flex items-center gap-2">
              <Download className="h-4 w-4" />
              Exportar
            </button>
            <button className="px-4 py-2 bg-[#8B0000] text-white rounded-lg hover:bg-[#700000] transition font-medium flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Gerar Relatório
            </button>
          </div>
        </header>

        <div className="flex-1 p-8">
          {/* STATS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E8EAE0]">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#2D343A]">{totalContratacoes}</p>
                  <p className="text-sm text-[#708090]">Total de Contratações</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E8EAE0]">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-100 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#2D343A]">{efetivados}</p>
                  <p className="text-sm text-[#708090]">Efetivados</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E8EAE0]">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <Award className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#2D343A]">{experiencia}</p>
                  <p className="text-sm text-[#708090]">Em Experiência</p>
                </div>
              </div>
            </div>
          </div>

          {/* TABELA */}
          <div className="bg-white rounded-xl shadow-sm border border-[#E8EAE0] overflow-hidden">
            <div className="flex items-center gap-4 px-6 py-4 border-b border-[#E8EAE0]">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#708090]" />
                <input 
                  type="text" 
                  placeholder="Buscar contratações..." 
                  className="w-full pl-10 pr-4 py-2 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
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
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Profissional</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Cargo</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Empresa</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Data</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Salário</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {contratacoes.map((item) => (
                    <tr key={item.id} className="border-b border-[#E8EAE0] hover:bg-[#F8F4E6] transition">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-[#8B0000]" />
                          <span className="font-medium text-[#2D343A]">{item.nome}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-[#708090]">{item.cargo}</td>
                      <td className="py-3 px-4 text-[#708090]">{item.empresa}</td>
                      <td className="py-3 px-4 text-[#708090]">{item.data}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item.status === 'efetivado' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {item.status === 'efetivado' ? 'Efetivado' : 'Em Experiência'}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-medium text-[#2D343A]">{item.salario}</td>
                      <td className="py-3 px-4">
                        <button className="p-1 hover:bg-[#F8F4E6] rounded">
                          <Eye className="h-4 w-4 text-[#708090]" />
                        </button>
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
