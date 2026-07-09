'use client'

import { SidebarAdmin } from '@/components/layout/SidebarAdmin'
import { BarChart3, Users, Building2, Briefcase, TrendingUp, Download, Calendar, Filter } from 'lucide-react'

const relatorios = [
  { id: 1, titulo: 'Relatório de Usuários', descricao: 'Total de usuários cadastrados por período', icon: Users, cor: 'bg-purple-100 text-purple-600' },
  { id: 2, titulo: 'Relatório de Empresas', descricao: 'Empresas ativas e crescimento mensal', icon: Building2, cor: 'bg-blue-100 text-blue-600' },
  { id: 3, titulo: 'Relatório de Vagas', descricao: 'Vagas publicadas e taxa de ocupação', icon: Briefcase, cor: 'bg-green-100 text-green-600' },
  { id: 4, titulo: 'Relatório Financeiro', descricao: 'Receitas, despesas e margem de lucro', icon: TrendingUp, cor: 'bg-yellow-100 text-yellow-600' },
]

export default function AdminRelatorios() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarAdmin />
      <div className="flex-1 ml-64 p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">
            <span className="text-purple-600">Relatórios</span>
          </h1>
          <div className="flex gap-2">
            <button className="btn-outline btn-sm flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Julho 2026
            </button>
            <button className="btn-outline btn-sm flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filtrar
            </button>
            <button className="btn-primary btn-sm flex items-center gap-2">
              <Download className="h-4 w-4" />
              Exportar
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {relatorios.map((item) => {
            const Icon = item.icon
            return (
              <div key={item.id} className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition cursor-pointer group">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl ${item.cor}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold group-hover:text-purple-600 transition">{item.titulo}</h3>
                    <p className="text-sm text-gray-500">{item.descricao}</p>
                    <div className="mt-4 flex items-center gap-4 text-sm">
                      <span className="text-purple-600 font-medium">Gerar Relatório →</span>
                      <span className="text-gray-400">Último: 08/07/2026</span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-800">📊 Dica</h4>
          <p className="text-sm text-blue-700">
            Os relatórios podem ser exportados em PDF, Excel ou CSV para análise externa.
          </p>
        </div>
      </div>
    </div>
  )
}
