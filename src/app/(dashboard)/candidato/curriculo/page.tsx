'use client'

import { useState } from 'react'
import { Upload, FileText, CheckCircle, X, Download, Eye } from 'lucide-react'

export default function CandidatoCurriculo() {
  const [file, setFile] = useState<File | null>(null)
  const [uploaded, setUploaded] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      setUploaded(false)
    }
  }

  const handleUpload = () => {
    if (file) {
      setUploaded(true)
    }
  }

  const handleRemove = () => {
    setFile(null)
    setUploaded(false)
  }

  return (
    <div className="min-h-screen bg-gray-50/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* ===== HEADER ===== */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Meu Currículo</h1>
          <p className="text-sm text-gray-500 mt-1">Mantenha seu currículo atualizado</p>
        </div>

        {/* ===== UPLOAD ===== */}
        <div className="bg-white rounded-2xl border border-gray-100/80 p-8 shadow-sm">
          
          {!uploaded ? (
            <div className="text-center">
              <div className="w-20 h-20 bg-[#8B0000]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="h-10 w-10 text-[#8B0000]" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Faça upload do seu currículo</h3>
              <p className="text-sm text-gray-500 mt-1">PDF, DOC, DOCX - Máx. 5MB</p>
              
              <div className="mt-6">
                <label className="cursor-pointer">
                  <div className="px-6 py-3 text-sm font-semibold text-[#8B0000] border-2 border-dashed border-[#8B0000]/30 rounded-xl hover:border-[#8B0000] hover:bg-[#8B0000]/5 transition-all">
                    Escolher arquivo
                  </div>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              </div>

              {file && (
                <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-[#8B0000]" />
                    <span className="text-sm text-gray-700">{file.name}</span>
                    <span className="text-xs text-gray-400">({(file.size / 1024).toFixed(1)} KB)</span>
                  </div>
                  <button onClick={handleRemove} className="p-1 text-gray-400 hover:text-red-600 transition">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}

              {file && (
                <button 
                  onClick={handleUpload}
                  className="mt-4 px-6 py-2.5 text-sm font-semibold text-white bg-[#8B0000] rounded-xl hover:bg-[#700000] transition shadow-md shadow-[#8B0000]/20"
                >
                  Enviar Currículo
                </button>
              )}
            </div>
          ) : (
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-green-600">Currículo enviado!</h3>
              <p className="text-sm text-gray-500 mt-1">Seu currículo foi atualizado com sucesso</p>
              
              <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
                <button className="px-6 py-2.5 text-sm font-semibold text-[#8B0000] border border-[#8B0000]/30 rounded-xl hover:bg-[#8B0000] hover:text-white transition flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  Visualizar
                </button>
                <button className="px-6 py-2.5 text-sm font-semibold text-[#8B0000] border border-[#8B0000]/30 rounded-xl hover:bg-[#8B0000] hover:text-white transition flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Baixar
                </button>
                <button onClick={handleRemove} className="px-6 py-2.5 text-sm font-semibold text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition">
                  Enviar novo
                </button>
              </div>
            </div>
          )}

        </div>

        {/* ===== VERSÕES ANTERIORES ===== */}
        <div className="mt-8 bg-white rounded-2xl border border-gray-100/80 p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Versões anteriores</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
              <div className="flex items-center gap-3">
                <FileText className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">curriculo_v2.pdf</span>
                <span className="text-xs text-gray-400">15/07/2026</span>
              </div>
              <button className="text-sm text-[#8B0000] hover:text-[#700000] transition">
                Baixar
              </button>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
              <div className="flex items-center gap-3">
                <FileText className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">curriculo_v1.pdf</span>
                <span className="text-xs text-gray-400">10/07/2026</span>
              </div>
              <button className="text-sm text-[#8B0000] hover:text-[#700000] transition">
                Baixar
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
