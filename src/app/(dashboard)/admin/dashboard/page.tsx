'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Users, Building2, Briefcase, TrendingUp, 
  Eye, Settings, UserPlus, Bell, Calendar, CheckCircle, Clock, XCircle
} from 'lucide-react'

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
  ],
  processos: [
    { id: 1, vaga: 'Analista Administrativo', empresa: 'XPTO', status: 'Entrevista', candidatos: 8 },
    { id: 2, vaga: 'Auxiliar de RH', empresa: 'ABC', status: 'Triagem', candidatos: 15 },
    { id: 3, vaga: 'Assistente Financeiro', empresa: 'Financeira', status: 'Aprovado', candidatos: 3 },
    { id: 4, vaga: 'Supervisor de Produção', empresa: 'Indústria', status: 'Encerrado', candidatos: 12 },
  ]
}

const statusColors = {
  'Entrevista': 'bg-blue-100 text-blue-700',
  'Triagem': 'bg-yellow-100 text-yellow-700',
  'Aprovado': 'bg-green-100 text-green-700',
  'Encerrado': 'bg-gray-100 text-gray-700',
}

export default function AdminDashboard() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    // VERIFICA SE O USUÁRIO ESTÁ LOGADO
    const userData = localStorage.getItem('zenthos_user')
    if (!userData) {
      router.push('/login')
      return
    }
    setUser(JSON.parse(userData))
    setLoading(false)
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F4E6]">
        <div className="text-[#8B0000] text-xl">Carregando...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8F4E6] py-8">
      <div className="container mx-auto px-4">
        {/* CABEÇALHO */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">
              Painel <span className="text-[#8B0000]">Administrativo</span>
            </h1>
            <p className="text-[#708090] text-sm mt-1">
              Bem-vindo, {user?.name || 'Administrador'}
            </p>
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
              <div className="p-3 bg-[#8B0000]/10 rounded-lg">
                <Users className="h-6 w-6 text-[#8B0000]" />
              </div>
              <div>
                <p className="text-2xl font-bold">{dadosAdmin.usuarios}</p>
                <p className="text-sm text-[#708090]">Usuários</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#8B0000]/10 rounded-lg">
                <Building2 className="h-6 w-6 text-[#8B0000]" />
              </div>
              <div>
                <p className="text-2xl font-bold">{dadosAdmin.empresas}</p>
                <p className="text-sm text-[#708090]">Empresas</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#8B0000]/10 rounded-lg">
                <Briefcase className="h-6 w-6 text-[#8B0000]" />
              </div>
              <div>
                <p className="text-2xl font-bold">{dadosAdmin.vagas}</p>
                <p className="text-sm text-[#708090]">Vagas</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#8B0000]/10 rounded-lg">
                <TrendingUp className="h-6 w-6 text-[#8B0000]" />
              </div>
              <div>
                <p className="text-2xl font-bold">R$ {dadosAdmin.receita.toLocaleString()}</p>
                <p className="text-sm text-[#708090]">Receita</p>
              </div>
            </div>
          </div>
        </div>

        {/* GRÁFICO DE PROCESSOS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border">
            <h2 className="text-lg font-semibold mb-4">Processos Seletivos</h2>
            <div className="space-y-3">
              {dadosAdmin.processos.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition">
                  <div>
                    <p className="font-semibold">{item.vaga}</p>
                    <p className="text-sm text-[#708090]">{item.empresa}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-[#708090]">{item.candidatos} candidatos</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[item.status as keyof typeof statusColors]}`}>
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h2 className="text-lg font-semibold mb-4">Ações Rápidas</h2>
            <div className="space-y-3">
              <button className="w-full btn-primary justify-center">
                <Building2 className="h-4 w-4" />
                Nova Empresa
              </button>
              <button className="w-full btn-secondary justify-center">
                <UserPlus className="h-4 w-4" />
                Novo Candidato
              </button>
              <button className="w-full btn-gold justify-center">
                <Briefcase className="h-4 w-4" />
                Nova Vaga
              </button>
              <button className="w-full btn-outline justify-center">
                <TrendingUp className="h-4 w-4" />
                Relatórios
              </button>
            </div>
          </div>
        </div>

        {/* ATIVIDADES RECENTES */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Atividades Recentes</h2>
            <span className="text-sm text-[#708090]">Últimas 24h</span>
          </div>
          <div className="space-y-3">
            {dadosAdmin.atividades.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 border-b last:border-0 hover:bg-gray-50 transition">
                <div>
                  <p className="font-semibold text-sm">{item.usuario}</p>
                  <p className="text-sm text-[#708090]">{item.acao}</p>
                </div>
                <span className="text-xs text-[#708090]">{item.data}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .btn-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.6rem 1.25rem;
          background-color: #8B0000;
          color: #ffffff;
          font-weight: 600;
          font-size: 0.875rem;
          border-radius: 0.5rem;
          transition: all 0.3s ease;
          cursor: pointer;
          border: none;
          text-decoration: none;
        }
        .btn-primary:hover {
          background-color: #700000;
          transform: translateY(-2px);
        }
        .btn-secondary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.6rem 1.25rem;
          background-color: transparent;
          color: #8B0000;
          font-weight: 600;
          font-size: 0.875rem;
          border-radius: 0.5rem;
          border: 2px solid #8B0000;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .btn-secondary:hover {
          background-color: #8B0000;
          color: #ffffff;
          transform: translateY(-2px);
        }
        .btn-gold {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.6rem 1.25rem;
          background-color: #E3C9A8;
          color: #2D343A;
          font-weight: 600;
          font-size: 0.875rem;
          border-radius: 0.5rem;
          transition: all 0.3s ease;
          cursor: pointer;
          border: none;
        }
        .btn-gold:hover {
          background-color: #D4B894;
          transform: translateY(-2px);
        }
        .btn-outline {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.6rem 1.25rem;
          background-color: transparent;
          color: #708090;
          font-weight: 600;
          font-size: 0.875rem;
          border-radius: 0.5rem;
          border: 2px solid #708090;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .btn-outline:hover {
          background-color: #708090;
          color: #ffffff;
          transform: translateY(-2px);
        }
        .btn-sm { padding: 0.4rem 0.8rem; font-size: 0.75rem; }
        .btn-full { width: 100%; justify-content: center; }
      `}</style>
    </div>
  )
}
