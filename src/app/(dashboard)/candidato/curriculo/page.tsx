'use client'

import { useState } from 'react'
import { Upload, FileText, Trash2 } from 'lucide-react'

export default function CurriculoCandidato() {
  const [curriculo, setCurriculo] = useState(null)

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-3xl font-bold mb-8">
          Meu <span className="text-purple-600">Currículo</span>
        </h1>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          {!curriculo ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="h-10 w-10 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold">Nenhum currículo enviado</h3>
              <p className="text-gray-500 text-sm">Envie seu currículo em PDF ou DOCX</p>
              
              <div className="mt-6">
                <label className="cursor-pointer">
                  <span className="inline-block py-2 px-6 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
                    Enviar Currículo
                  </span>
                  <input type="file" className="hidden" accept=".pdf,.docx" />
                </label>
              </div>
              <p className="mt-4 text-xs text-gray-400">Formatos aceitos: PDF, DOCX (máx. 5MB)</p>
            </div>
          ) : (
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <FileText className="h-8 w-8 text-purple-600" />
                <div>
                  <p className="font-medium">curriculo.pdf</p>
                  <p className="text-sm text-gray-500">Enviado em 09/07/2026</p>
                </div>
              </div>
              <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition">
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>

        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-800">💡 Dica</h4>
          <p className="text-sm text-blue-700">
            Mantenha seu currículo atualizado para aumentar suas chances de ser encontrado pelas empresas.
          </p>
        </div>
      </div>
    </div>
  )
}
