'use client'

import { SidebarCandidato } from '@/components/layout/SidebarCandidato'
import { Search, MapPin, DollarSign, Briefcase, Star, Filter } from 'lucide-react'
import { useState } from 'react'

const vagas = [
  { id: 1, titulo: 'Analista Administrativo', empresa: 'Empresa XPTO', local: 'Uberlândia - MG', salario: 'R$ 3.500', tipo: 'Presencial', compatibilidade: 94, descricao: 'Atuação em rotinas administrativas, controle documental e suporte operacional.' },
  { id: 2, titulo: 'Auxiliar de RH', empresa: 'Indústria ABC', local: 'Uberlândia - MG', salario: 'R$ 2.800', tipo: 'Híbrido', compatibilidade: 87, descricao: 'Apoio aos processos de recrutamento, seleção e gestão de pessoas.' },
  { id: 3, titulo: 'Assistente Financeiro', empresa: 'Grupo Financeiro', local: 'Uberlândia - MG', salario: 'R$ 3.200', tipo: 'Presencial', compatibilidade: 92, descricao: 'Controle de fluxo de caixa, contas a pagar e receber, relatórios financeiros.' },
]

export default function VagasCandidato() {
  const [busca, setBusca] = useState('')

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarCandidato />
      <div className="flex-1 ml-64 p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">
            Buscar <span className="text-purple-600">Vagas</span>
          </h1>
          <button className="btn-outline btn-sm flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filtros
          </button>
        </div>

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
                <span className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  <Star className="h-4 w-4 fill-green-600" /> {vaga.compatibilidade}% compatível
                </span>
              </div>

              <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {vaga.local}</span>
                <span className="flex items-center gap-1"><DollarSign className="h-4 w-4" /> {vaga.salario}</span>
                <span className="flex items-center gap-1"><Briefcase className="h-4 w-4" /> {vaga.tipo}</span>
              </div>

              <p className="mt-3 text-sm text-gray-500">{vaga.descricao}</p>

              <button className="mt-4 py-2 px-6 btn-primary btn-sm">
                Candidatar-se
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
