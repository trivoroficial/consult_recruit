'use client'

import { SidebarEmpresa } from '@/components/layout/SidebarEmpresa'
import { DollarSign, FileText, Calendar, TrendingUp, CreditCard, Download } from 'lucide-react'

const historico = [
  { id: 1, descricao: 'Recrutamento - Analista Administrativo', valor: 3500, data: '01/07/2026', status: 'Pago' },
  { id: 2, descricao: 'Consultoria - Gestão de Pessoas', valor: 2800, data: '01/07/2026', status: 'Pago' },
  { id: 3, descricao: 'Recrutamento - Auxiliar de RH', valor: 2800, data: '15/07/2026', status: 'Pendente' },
]

export default function FinanceiroEmpresa() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarEmpresa />
      <div className="flex-1 ml-64 p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">
            <span className="text-purple-600">Financeiro</span>
          </h1>
          <button className="btn-outline btn-sm flex items-center gap-2">
            <Download className="h-4 w-4" />
            Exportar
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">R$ 6.300</p>
                <p className="text-sm text-gray-500">Total Investido</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">2</p>
                <p className="text-sm text-gray-500">Serviços Contratados</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Calendar className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">15/07</p>
                <p className="text-sm text-gray-500">Próximo Vencimento</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Histórico de Pagamentos</h2>
            <span className="text-sm text-gray-500">Total: {historico.length}</span>
          </div>
          <div className="space-y-3">
            {historico.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition">
                <div>
                  <p className="font-medium">{item.descricao}</p>
                  <p className="text-sm text-gray-500">{item.data}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    item.status === 'Pago' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {item.status}
                  </span>
                  <span className={`font-semibold ${item.status === 'Pago' ? 'text-green-600' : 'text-yellow-600'}`}>
                    R$ {item.valor.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-800">💡 Próximos passos</h4>
          <p className="text-sm text-blue-700">Mantenha seus pagamentos em dia para garantir a continuidade dos serviços TRIVOR.</p>
        </div>
      </div>
    </div>
  )
}
