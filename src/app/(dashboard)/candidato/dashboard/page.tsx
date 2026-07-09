'use client'

import { useEffect, useState } from 'react'
import { User, Briefcase, FileText, Bell, MapPin, Mail, Phone } from 'lucide-react'

// DADOS DE EXEMPLO DO CANDIDATO
const dadosCandidato = {
  nome: 'João Silva',
  email: 'joao.silva@email.com',
  telefone: '(34) 99117-7058',
  cidade: 'Uberlândia',
  estado: 'MG',
  cargo: 'Analista Administrativo',
  resumo: 'Profissional com 5 anos de experiência em rotinas administrativas, gestão documental e atendimento ao cliente.',
  candidaturas: 12,
  vagasRecomendadas: 8,
  perfilCompleto: 87,
  notificacoes: 3,
  candidaturasLista: [
    { id: 1, vaga: 'Analista Administrativo', empresa: 'Empresa XPTO', status: 'Entrevista', data: '09/07/2026' },
    { id: 2, vaga: 'Auxiliar de RH', empresa: 'Indústria ABC', status: 'Análise', data: '08/07/2026' },
    { id: 3, vaga: 'Assistente Financeiro', empresa: 'Grupo Financeiro', status: 'Aprovado', data: '05/07/2026' },
  ]
}

export default function DashboardCandidato() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simula carregamento
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
              Olá, <span className="text-purple-600">{dadosCandidato.nome}</span>
            </h1>
            <p className="text-gray-500 text-sm mt-1">Bem-vindo ao seu dashboard</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Bell className="h-5 w-5 text-purple-600" />
            <span className="bg-purple-600 text-white text-xs rounded-full px-2 py-0.5">{dadosCandidato.notificacoes}</span>
          </div>
        </div>

        {/* CARDS DE INDICADORES */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 rounded-lg">
                <FileText className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{dadosCandidato.candidaturas}</p>
                <p className="text-sm text-gray-500">Candidaturas</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Briefcase className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{dadosCandidato.vagasRecomendadas}</p>
                <p className="text-sm text-gray-500">Vagas Recomendadas</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 rounded-lg">
                <User className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{dadosCandidato.perfilCompleto}%</p>
                <p className="text-sm text-gray-500">Perfil Completo</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Bell className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{dadosCandidato.notificacoes}</p>
                <p className="text-sm text-gray-500">Notificações</p>
              </div>
            </div>
          </div>
        </div>

        {/* CONTEÚDO PRINCIPAL */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* CANDIDATURAS */}
          <div className="col-span-2 bg-white p-6 rounded-xl shadow-sm border">
            <h2 className="text-lg font-semibold mb-4">Suas Candidaturas</h2>
            {dadosCandidato.candidaturasLista.length === 0 ? (
              <p className="text-gray-500 text-center py-8">Você ainda não se candidatou a nenhuma vaga.</p>
            ) : (
              <div className="space-y-3">
                {dadosCandidato.candidaturasLista.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition">
                    <div>
                      <p className="font-semibold">{item.vaga}</p>
                      <p className="text-sm text-gray-500">{item.empresa}</p>
                      <p className="text-xs text-gray-400">Candidatado em {item.data}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      item.status === 'Entrevista' ? 'bg-blue-100 text-blue-700' :
                      item.status === 'Análise' ? 'bg-yellow-100 text-yellow-700' :
                      item.status === 'Aprovado' ? 'bg-green-100 text-green-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* PERFIL */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h2 className="text-lg font-semibold mb-4">Perfil</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <span className="text-gray-500">Nome:</span>
                <span className="font-medium">{dadosCandidato.nome}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="text-gray-500">Email:</span>
                <span className="font-medium">{dadosCandidato.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="text-gray-500">Telefone:</span>
                <span className="font-medium">{dadosCandidato.telefone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="text-gray-500">Localização:</span>
                <span className="font-medium">{dadosCandidato.cidade}/{dadosCandidato.estado}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="text-gray-500">Cargo:</span>
                <span className="font-medium">{dadosCandidato.cargo}</span>
              </div>
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">{dadosCandidato.resumo}</p>
              </div>
              <button className="w-full mt-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
                Completar Perfil
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
