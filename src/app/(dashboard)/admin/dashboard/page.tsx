'use client'

import { useEffect, useState } from 'react'
import { Users, Building2, Briefcase, TrendingUp, Eye, Settings, UserPlus } from 'lucide-react'

// DADOS DE EXEMPLO DO ADMIN
const dadosAdmin = {
  usuarios: 245,
  empresas: 32,
  vagas: 18,
  receita: 98500,
  atividades: [
    { id: 1, usuario: 'Empresa XPTO', acao: 'Publicou nova vaga: Analista Administrativo', data: 'Há 5 minutos' },
    { id: 2, usuario: 'João Silva', acao: 'Se candidatou a vaga de Auxiliar de RH', data: 'Há 15 minutos' },
    { id: 3, usuario: 'Empresa ABC', acao: 'Contratou 2 novos funcionários', data: 'Há 1 hora' },
    { id: 4, usuario: 'Maria Santos', acao: 'Atualizou seu perfil profissional', data: 'Há 2 horas' },
    { id: 5, usuario: 'Sistema', acao: 'Backup diário realizado com sucesso', data: 'Há 3 horas' },
  ]
}

export default function DashboardAdmin() {
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
              Painel <span className="text-purple-600">Administrativo</span>
            </h1>
            <p className="text-gray-500 text-sm mt-1">Visão geral da plataforma</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="btn-outline btn-sm flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Configurações
            </button>
            <button className="btn-primary btn-sm flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              Novo Usuário
            </button>
          </div>
        </div>

        {/* CARDS DE INDICADORES */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{dadosAdmin.usuarios}</p>
                <p className="text-sm text-gray-500">Usuários</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Building2 className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{dadosAdmin.empresas}</p>
                <p className="text-sm text-gray-500">Empresas</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 rounded-lg">
                <Briefcase className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{dadosAdmin.vagas}</p>
                <p className="text-sm text-gray-500">Vagas</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">R$ {dadosAdmin.receita.toLocaleString()}</p>
                <p className="text-sm text-gray-500">Receita</p>
              </div>
            </div>
          </div>
        </div>

        {/* CONTEÚDO PRINCIPAL */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* ATIVIDADES RECENTES */}
          <div className="col-span-2 bg-white p-6 rounded-xl shadow-sm border">
            <h2 className="text-lg font-semibold mb-4">Atividades Recentes</h2>
            {dadosAdmin.atividades.length === 0 ? (
              <p className="text-gray-500 text-center py-8">Nenhuma atividade recente.</p>
            ) : (
              <div className="space-y-3">
                {dadosAdmin.atividades.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 border-b last:border-0 hover:bg-gray-50 transition">
                    <div>
                      <p className="font-semibold text-sm">{item.usuario}</p>
                      <p className="text-sm text-gray-500">{item.acao}</p>
                    </div>
                    <span className="text-xs text-gray-400">{item.data}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* AÇÕES RÁPIDAS */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h2 className="text-lg font-semibold mb-4">Ações Rápidas</h2>
            <div className="space-y-3">
              <button className="w-full btn-primary justify-center">
                <Users className="h-4 w-4" />
                Gerenciar Usuários
              </button>
              <button className="w-full btn-secondary justify-center">
                <Building2 className="h-4 w-4" />
                Ver Empresas
              </button>
              <button className="w-full btn-gold justify-center">
                <TrendingUp className="h-4 w-4" />
                Relatórios
              </button>
              <button className="w-full btn-outline justify-center">
                <Settings className="h-4 w-4" />
                Configurações
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
