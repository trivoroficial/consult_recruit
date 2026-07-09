'use client'

import { DollarSign, FileText, Calendar, TrendingUp } from 'lucide-react'

export default function FinanceiroEmpresa() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        <h1 className="text-3xl font-bold mb-8">
          <span className="text-purple-600">Financeiro</span>
        </h1>

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
          <h2 className="text-lg font-semibold mb-4">Histórico de Pagamentos</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border-b">
              <div>
                <p className="font-medium">Recrutamento - Analista RH</p>
                <p className="text-sm text-gray-500">Pago em 01/07/2026</p>
              </div>
              <span className="text-green-600 font-semibold">R$ 3.500</span>
            </div>
            <div className="flex items-center justify-between p-3 border-b">
              <div>
                <p className="font-medium">Consultoria - Gestão de Pessoas</p>
                <p className="text-sm text-gray-500">Pago em 01/07/2026</p>
              </div>
              <span className="text-green-600 font-semibold">R$ 2.800</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
