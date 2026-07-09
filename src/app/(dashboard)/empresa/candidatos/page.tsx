'use client'

import { SidebarEmpresa } from '@/components/layout/SidebarEmpresa'
import { Search, User, Mail, Phone, MapPin, Star, Eye, Calendar, Check, X } from 'lucide-react'
import { useState } from 'react'

const candidatos = [
  { id: 1, nome: 'João Silva', cargo: 'Analista Administrativo', local: 'Uberlândia - MG', email: 'joao@email.com', telefone: '(34) 99999-9999', compatibilidade: 94, status: 'Em análise', vaga: 'Analista Administrativo' },
  { id: 2, nome: 'Maria Santos', cargo: 'Auxiliar de RH', local: 'Uberlândia - MG', email: 'maria@email.com', telefone: '(34) 88888-8888', compatibilidade: 87, status: 'Entrevista', vaga: 'Auxiliar de RH' },
  { id: 3, nome: 'Pedro Costa', cargo: 'Assistente Financeiro', local: 'Uberlândia - MG', email: 'pedro@email.com', telefone: '(34) 77777-7777', compatibilidade: 92, status: 'Em análise', vaga: 'Assistente Financeiro' },
]

export default function CandidatosEmpresa() {
  const [busca, setBusca] = useState('')

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarEmpresa />
      <div className="flex-1 ml-64 p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">
            <span className="text-purple-600">Candidatos</span> Recebidos
          </h1>
          <span className="text-sm text-gray-500">Total: {candidatos.length}</span>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar candidatos por nome, cargo ou local..."
            className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>

        <div className="space-y-4">
          {candidatos.map((candidato) => (
            <div key={candidato.id} className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-xl text-purple-600 flex-shrink-0">
                    👤
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold">{candidato.nome}</h2>
                    <p className="text-gray-600">{candidato.cargo}</p>
                    <div className="mt-1 flex flex-wrap gap-3 text-sm text-gray-500">
                      <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {candidato.local}</span>
                      <span className="flex items-center gap-1"><Mail className="h-4 w-4" /> {candidato.email}</span>
                      <span className="flex items-center gap-1"><Phone className="h-4 w-4" /> {candidato.telefone}</span>
                    </div>
                    <p className="text-sm text-gray-400 mt-1">Vaga: {candidato.vaga}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    <Star className="h-4 w-4 fill-green-600" /> {candidato.compatibilidade}%
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    candidato.status === 'Entrevista' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {candidato.status}
                  </span>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <button className="flex items-center gap-1 px-3 py-1.5 text-sm btn-primary">
                  <Eye className="h-4 w-4" /> Ver Perfil
                </button>
                <button className="flex items-center gap-1 px-3 py-1.5 text-sm btn-secondary">
                  <Calendar className="h-4 w-4" /> Agendar
                </button>
                <button className="flex items-center gap-1 px-3 py-1.5 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                  <Check className="h-4 w-4" /> Aprovar
                </button>
                <button className="flex items-center gap-1 px-3 py-1.5 text-sm border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition">
                  <X className="h-4 w-4" /> Recusar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
