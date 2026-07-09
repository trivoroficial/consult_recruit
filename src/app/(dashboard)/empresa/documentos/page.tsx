'use client'

import { SidebarEmpresa } from '@/components/layout/SidebarEmpresa'
import { FileText, Upload, Download, Trash2, FolderOpen, Plus, Search } from 'lucide-react'
import { useState } from 'react'

const documentos = [
  { id: 1, nome: 'Contrato_TRIVOR_2026.pdf', tipo: 'Contrato', data: '01/07/2026', tamanho: '245 KB' },
  { id: 2, nome: 'Proposta_Recrutamento.pdf', tipo: 'Proposta', data: '03/07/2026', tamanho: '180 KB' },
  { id: 3, nome: 'Relatorio_Mensal_JUNHO.pdf', tipo: 'Relatório', data: '05/07/2026', tamanho: '1.2 MB' },
]

export default function DocumentosEmpresa() {
  const [busca, setBusca] = useState('')

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarEmpresa />
      <div className="flex-1 ml-64 p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">
            <span className="text-purple-600">Documentos</span>
          </h1>
          <button className="btn-primary btn-sm flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Upload
          </button>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar documentos..."
            className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {documentos.map((doc) => (
            <div key={doc.id} className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition group">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <FileText className="h-6 w-6 text-purple-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{doc.nome}</p>
                  <p className="text-sm text-gray-500">{doc.tipo}</p>
                  <p className="text-xs text-gray-400">{doc.data} • {doc.tamanho}</p>
                </div>
              </div>
              <div className="mt-4 flex gap-2 border-t pt-4">
                <button className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 text-sm border rounded-lg hover:bg-gray-50 transition">
                  <Download className="h-4 w-4" /> Baixar
                </button>
                <button className="flex items-center justify-center gap-1 px-3 py-1.5 text-sm border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-800">📁 Dica</h4>
          <p className="text-sm text-blue-700">
            Mantenha todos os documentos organizados. Contratos, propostas e relatórios são importantes para o histórico da sua empresa.
          </p>
        </div>
      </div>
    </div>
  )
}
