'use client'

import { SidebarCandidato } from '@/components/layout/SidebarCandidato'
import { Upload, FileText, Trash2, Download, Plus } from 'lucide-react'
import { useState } from 'react'

export default function CurriculoCandidato() {
  const [curriculos, setCurriculos] = useState([
    { id: 1, nome: 'Curriculo_Joao_Silva.pdf', data: '09/07/2026', tamanho: '245 KB', principal: true },
    { id: 2, nome: 'Curriculo_Joao_Silva_2025.pdf', data: '15/01/2025', tamanho: '230 KB', principal: false },
  ])

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarCandidato />
      <div className="flex-1 ml-64 p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">
            Meu <span className="text-purple-600">Currículo</span>
          </h1>
          <button className="btn-primary btn-sm flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Enviar Novo
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Currículos Enviados</h2>
          {curriculos.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="h-10 w-10 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold">Nenhum currículo enviado</h3>
              <p className="text-gray-500 text-sm">Envie seu currículo em PDF ou DOCX</p>
              <button className="mt-4 btn-primary">
                Enviar Currículo
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {curriculos.map((curriculo) => (
                <div key={curriculo.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition">
                  <div className="flex items-center gap-3">
                    <FileText className="h-8 w-8 text-purple-600" />
                    <div>
                      <p className="font-medium">{curriculo.nome}</p>
                      <p className="text-sm text-gray-500">Enviado em {curriculo.data} • {curriculo.tamanho}</p>
                      {curriculo.principal && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Principal</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition" title="Download">
                      <Download className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition" title="Excluir">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-800">💡 Dica</h4>
          <p className="text-sm text-blue-700">
            Mantenha seu currículo atualizado para aumentar suas chances de ser encontrado pelas empresas.
            Currículos atualizados nos últimos 30 dias têm 3x mais visualizações.
          </p>
        </div>
      </div>
    </div>
  )
}
