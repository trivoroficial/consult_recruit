'use client'

import { useState } from 'react'
import { Search, MapPin, DollarSign, Briefcase } from 'lucide-react'

const vagas = [
  {
    id: 1,
    titulo: 'Analista Administrativo',
    empresa: 'Empresa XYZ',
    local: 'Uberlândia - MG',
    salario: 'R$ 3.500',
    tipo: 'Presencial',
    compatibilidade: 94
  },
  {
    id: 2,
    titulo: 'Auxiliar de RH',
    empresa: 'Indústria ABC',
    local: 'Uberlândia - MG',
    salario: 'R$ 2.800',
    tipo: 'Híbrido',
    compatibilidade: 87
  }
]

export default function VagasCandidato() {
  const [busca, setBusca] = useState('')

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">
          Buscar <span className="text-purple-600">Vagas</span>
        </h1>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar vagas por cargo, empresa ou local..."
            className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>

        <div className="space-y-4">
          {vagas.map((vaga) => (
            <div key={vaga.id} className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h2 className="text-xl font-semibold">{vaga.titulo}</h2>
                  <p className="text-gray-600">{vaga.empresa}</p>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  {vaga.compatibilidade}% compatível
                </span>
              </div>

              <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" /> {vaga.local}
                </span>
                <span className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4" /> {vaga.salario}
                </span>
                <span className="flex items-center gap-1">
                  <Briefcase className="h-4 w-4" /> {vaga.tipo}
                </span>
              </div>

              <button className="mt-4 py-2 px-6 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-sm">
                Candidatar-se
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
