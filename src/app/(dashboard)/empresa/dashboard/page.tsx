'use client'

import { useEffect, useState } from 'react'
import { Building2, Briefcase, Users, DollarSign, Plus } from 'lucide-react'

// DADOS DE EXEMPLO DA EMPRESA
const dadosEmpresa = {
  nome: 'Empresa XPTO',
  email: 'contato@empresaxpto.com',
  telefone: '(34) 99117-7058',
  cidade: 'Uberlândia',
  estado: 'MG',
  vagasAbertas: 4,
  candidatosTotal: 28,
  investimento: 6300,
  contratacoes: 3,
  vagasLista: [
    { id: 1, titulo: 'Analista Administrativo', local: 'Uberlândia - MG', salario: 'R$ 3.500', tipo: 'Presencial', status: 'Aberta', candidatos: 12 },
    { id: 2, titulo: 'Auxiliar de RH', local: 'Uberlândia - MG', salario: 'R$ 2.800', tipo: 'Híbrido', status: 'Em análise', candidatos: 8 },
    { id: 3, titulo: 'Assistente Financeiro', local: 'Uberlândia - MG', salario: 'R$ 3.200', tipo: 'Presencial', status: 'Aberta', candidatos: 5 },
    { id: 4, titulo: 'Supervisor de Produção', local: 'Uberlândia - MG', salario: 'R$ 5.500', tipo: 'Presencial', status: 'Fechada', candidatos: 3 },
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
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

        {/* CARDS DE INDICADORES */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition">
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

          <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition">
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

          <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition">
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

          <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition">
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

        {/* CONTEÚDO PRINCIPAL */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* VAGAS */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h2 className="text-lg font-semibold mb-4">Últimas Vagas</h2>
            {dadosEmpresa.vagasLista.length === 0 ? (
              <p className="text-gray-500 text-center py-8">Nenhuma vaga publicada ainda.</p>
            ) : (
              <div className="space-y-3">
                {dadosEmpresa.vagasLista.slice(0, 3).map((vaga) => (
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
            )}
          </div>

          {/* CANDIDATOS RECENTES */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h2 className="text-lg font-semibold mb-4">Candidatos Recentes</h2>
            {dadosEmpresa.candidatosRecentes.length === 0 ? (
              <p className="text-gray-500 text-center py-8">Nenhum candidato recebido.</p>
            ) : (
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
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
