'use client'

import { useEffect, useState } from 'react'
import { Briefcase, Users, DollarSign, Building2, Plus } from 'lucide-react'
import { SidebarEmpresa } from '@/components/layout/SidebarEmpresa'

// DADOS DE EXEMPLO DA EMPRESA
const dadosEmpresa = {
  nome: 'Empresa XPTO',
  vagasAbertas: 4,
  candidatosTotal: 28,
  investimento: 6300,
  contratacoes: 3,
  vagasLista: [
    { id: 1, titulo: 'Analista Administrativo', local: 'Uberlândia - MG', salario: 'R$ 3.500', status: 'Aberta', candidatos: 12 },
    { id: 2, titulo: 'Auxiliar de RH', local: 'Uberlândia - MG', salario: 'R$ 2.800', status: 'Em análise', candidatos: 8 },
    { id: 3, titulo: 'Assistente Financeiro', local: 'Uberlândia - MG', salario: 'R$ 3.200', status: 'Aberta', candidatos: 5 },
  ],
  candidatosRecentes: [
    { id: 1, nome: 'João Silva', cargo: 'Analista Administrativo', compatibilidade: 94, status: 'Em análise' },
    { id: 2, nome: 'Maria Santos', cargo: 'Auxiliar de RH', compatibilidade: 87, status: 'Entrevista' },
    { id: 3, nome: 'Pedro Costa', cargo: 'Assistente Financeiro', compatibilidade: 92, status: 'Em análise' },
  ]
}

export default function DashboardEmpresa() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => setLoading(false), 800)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-purple-600 text-xl">Carregando...</div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarEmpresa />
      <div className="flex-1 ml-64 p-8">
        {/* CABEÇALHO */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">
              Bem-vindo, <span className="text-purple-600">{dadosEmpresa.nome}</span>
            </h1>
            <p className="text-gray-500 text-sm mt-1">Gerencie suas vagas e candidatos</p>
          </div>
          <button className="flex items-center gap-2 btn-primary btn-sm">
            <Plus className="h-4 w-4" />
            Nova Vaga
          </button>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Briefcase className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{dadosEmpresa.vagasAbertas}</p>
                <p className="text-sm text-gray-500">Vagas Abertas</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{dadosEmpresa.candidatosTotal}</p>
                <p className="text-sm text-gray-500">Candidatos</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">R$ {dadosEmpresa.investimento}</p>
                <p className="text-sm text-gray-500">Investimento</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Building2 className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{dadosEmpresa.contratacoes}</p>
                <p className="text-sm text-gray-500">Contratações</p>
              </div>
            </div>
          </div>
        </div>

        {/* CONTEÚDO */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* VAGAS */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h2 className="text-lg font-semibold mb-4">Últimas Vagas</h2>
            <div className="space-y-3">
              {dadosEmpresa.vagasLista.map((vaga) => (
                <div key={vaga.id} className="p-3 border rounded-lg hover:bg-gray-50 transition">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">{vaga.titulo}</p>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      vaga.status === 'Aberta' ? 'bg-green-100 text-green-700' :
                      vaga.status === 'Em análise' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {vaga.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">{vaga.local}</p>
                  <p className="text-sm text-gray-500">{vaga.salario} • {vaga.candidatos} candidatos</p>
                </div>
              ))}
            </div>
          </div>

          {/* CANDIDATOS RECENTES */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h2 className="text-lg font-semibold mb-4">Candidatos Recentes</h2>
            <div className="space-y-3">
              {dadosEmpresa.candidatosRecentes.map((candidato) => (
                <div key={candidato.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition">
                  <div>
                    <p className="font-semibold">{candidato.nome}</p>
                    <p className="text-sm text-gray-500">{candidato.cargo}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                      {candidato.compatibilidade}%
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      candidato.status === 'Entrevista' ? 'bg-blue-100 text-blue-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {candidato.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
