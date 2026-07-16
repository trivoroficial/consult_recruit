'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  Users, Building2, Briefcase, TrendingUp, 
  Eye, Settings, UserPlus, Bell, Calendar, CheckCircle, Clock, XCircle,
  LogOut, Home, BarChart3, FileText, CreditCard
} from 'lucide-react'

// DADOS DE EXEMPLO
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
    const userData = localStorage.getItem('zenthos_user')
    if (!userData) {
      router.push('/login')
      return
    }
    setUser(JSON.parse(userData))
    setLoading(false)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('zenthos_user')
    document.cookie = 'zenthos_user=; path=/; max-age=0'
    router.push('/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F4E6]">
        <div className="text-[#8B0000] text-xl">Carregando...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8F4E6] flex">
      {/* SIDEBAR ADMIN */}
      <aside className="w-64 bg-white border-r border-[#E8EAE0] min-h-screen flex flex-col fixed left-0 top-20">
        <div className="p-4 border-b border-[#E8EAE0]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#8B0000] rounded-full flex items-center justify-center text-white font-bold text-sm">
              {user?.name?.charAt(0) || 'A'}
            </div>
            <div>
              <p className="font-semibold text-sm">{user?.name || 'Admin'}</p>
              <p className="text-xs text-[#708090]">Master</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <Link href="/admin/dashboard" className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-[#8B0000]/10 text-[#8B0000] font-medium">
            <Home className="h-5 w-5" />
            <span className="text-sm">Dashboard</span>
          </Link>
          <Link href="/admin/empresas" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-[#708090] hover:bg-[#F8F4E6] transition">
            <Building2 className="h-5 w-5" />
            <span className="text-sm">Empresas</span>
          </Link>
          <Link href="/admin/candidatos" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-[#708090] hover:bg-[#F8F4E6] transition">
            <Users className="h-5 w-5" />
            <span className="text-sm">Candidatos</span>
          </Link>
          <Link href="/admin/vagas" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-[#708090] hover:bg-[#F8F4E6] transition">
            <Briefcase className="h-5 w-5" />
            <span className="text-sm">Vagas</span>
          </Link>
          <Link href="/admin/relatorios" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-[#708090] hover:bg-[#F8F4E6] transition">
            <FileText className="h-5 w-5" />
            <span className="text-sm">Relatórios</span>
          </Link>
          <Link href="/admin/financeiro" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-[#708090] hover:bg-[#F8F4E6] transition">
            <CreditCard className="h-5 w-5" />
            <span className="text-sm">Financeiro</span>
          </Link>
          <Link href="/admin/configuracoes" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-[#708090] hover:bg-[#F8F4E6] transition">
            <Settings className="h-5 w-5" />
            <span className="text-sm">Configurações</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-[#E8EAE0]">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2.5 text-red-600 hover:bg-red-50 rounded-lg transition w-full"
          >
            <LogOut className="h-5 w-5" />
            <span className="text-sm font-medium">Sair</span>
          </button>
        </div>
      </aside>

      {/* CONTEÚDO */}
      <div className="flex-1 ml-64 p-8">
        {/* CABEÇALHO */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#2D343A]">
              Painel <span className="text-[#8B0000]">Administrativo</span>
            </h1>
            <p className="text-[#708090] text-sm mt-1">
              Bem-vindo, {user?.name || 'Administrador'}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 text-sm font-medium text-[#708090] border border-[#E8EAE0] rounded-lg hover:bg-[#F8F4E6] transition">
              <Bell className="h-4 w-4 inline mr-2" />
              Notificações
            </button>
          </div>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E8EAE0] hover:shadow-md transition">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#8B0000]/10 rounded-lg">
                <Users className="h-6 w-6 text-[#8B0000]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#2D343A]">{dadosAdmin.usuarios}</p>
                <p className="text-sm text-[#708090]">Usuários</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E8EAE0] hover:shadow-md transition">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#8B0000]/10 rounded-lg">
                <Building2 className="h-6 w-6 text-[#8B0000]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#2D343A]">{dadosAdmin.empresas}</p>
                <p className="text-sm text-[#708090]">Empresas</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E8EAE0] hover:shadow-md transition">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#8B0000]/10 rounded-lg">
                <Briefcase className="h-6 w-6 text-[#8B0000]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#2D343A]">{dadosAdmin.vagas}</p>
                <p className="text-sm text-[#708090]">Vagas</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E8EAE0] hover:shadow-md transition">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#8B0000]/10 rounded-lg">
                <TrendingUp className="h-6 w-6 text-[#8B0000]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#2D343A]">R$ {dadosAdmin.receita.toLocaleString()}</p>
                <p className="text-sm text-[#708090]">Receita</p>
              </div>
            </div>
          </div>
        </div>

        {/* PROCESSOS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-[#E8EAE0]">
            <h2 className="text-lg font-semibold text-[#2D343A] mb-4">Processos Seletivos</h2>
            <div className="space-y-3">
              {dadosAdmin.processos.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 border border-[#E8EAE0] rounded-lg hover:bg-[#F8F4E6] transition">
                  <div>
                    <p className="font-semibold text-[#2D343A]">{item.vaga}</p>
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

          <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E8EAE0]">
            <h2 className="text-lg font-semibold text-[#2D343A] mb-4">Ações Rápidas</h2>
            <div className="space-y-3">
              <button className="w-full py-2.5 bg-[#8B0000] text-white rounded-lg hover:bg-[#700000] transition font-medium flex items-center justify-center gap-2">
                <Building2 className="h-4 w-4" /> Nova Empresa
              </button>
              <button className="w-full py-2.5 border-2 border-[#8B0000] text-[#8B0000] rounded-lg hover:bg-[#8B0000] hover:text-white transition font-medium flex items-center justify-center gap-2">
                <Users className="h-4 w-4" /> Novo Candidato
              </button>
              <button className="w-full py-2.5 bg-[#E3C9A8] text-[#2D343A] rounded-lg hover:bg-[#D4B894] transition font-medium flex items-center justify-center gap-2">
                <Briefcase className="h-4 w-4" /> Nova Vaga
              </button>
            </div>
          </div>
        </div>

        {/* ATIVIDADES */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E8EAE0]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-[#2D343A]">Atividades Recentes</h2>
            <span className="text-sm text-[#708090]">Últimas 24h</span>
          </div>
          <div className="space-y-3">
            {dadosAdmin.atividades.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 border-b border-[#E8EAE0] last:border-0 hover:bg-[#F8F4E6] transition">
                <div>
                  <p className="font-semibold text-sm text-[#2D343A]">{item.usuario}</p>
                  <p className="text-sm text-[#708090]">{item.acao}</p>
                </div>
                <span className="text-xs text-[#708090]">{item.data}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
