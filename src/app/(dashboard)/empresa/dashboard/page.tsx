'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Building2, Briefcase, Users, FileText, 
  TrendingUp, Clock, ArrowRight, Eye,
  Calendar, DollarSign, UserCheck, UserX, Bell,
  AlertCircle, CheckCircle, XCircle
} from 'lucide-react'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'

export default function EmpresaDashboard() {
  const router = useRouter()
  const [userName, setUserName] = useState('Empresa')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const userData = localStorage.getItem('zenthos_user')
    if (userData) {
      try {
        const parsed = JSON.parse(userData)
        const name = parsed.name || 'Empresa'
        const formattedName = name.split(' ').map((n: string) =>
          n.charAt(0).toUpperCase() + n.slice(1).toLowerCase()
        ).join(' ')
        setUserName(formattedName)
      } catch {
        setUserName('Empresa')
      }
    }
    setLoading(false)
  }, [])

  // Dados mockados - depois conectar com Supabase
  const stats = [
    { icon: Briefcase, label: 'Total Vagas', value: 8, color: 'bg-blue-50 text-blue-600', link: '/empresa/vagas' },
    { icon: Users, label: 'Candidatos Inscritos', value: 24, color: 'bg-green-50 text-green-600', link: '/empresa/vagas' },
    { icon: FileText, label: 'Processos Ativos', value: 3, color: 'bg-purple-50 text-purple-600', link: '/empresa/vagas' },
    { icon: UserCheck, label: 'Contratações', value: 2, color: 'bg-yellow-50 text-yellow-600', link: '/empresa/vagas' },
  ]

  const vagasRecentes = [
    { id: 1, titulo: 'Analista Administrativo', status: 'Aberta', candidatos: 8, data: '10/07/2026', origem: 'Admin' },
    { id: 2, titulo: 'Mecânico de Motos', status: 'Em andamento', candidatos: 4, data: '08/07/2026', origem: 'Operacional' },
    { id: 3, titulo: 'Desenvolvedor Full Stack', status: 'Finalizada', candidatos: 12, data: '01/07/2026', origem: 'Admin' },
  ]

  const pendentesFinanceiro = [
    { id: 1, descricao: 'Assinatura Plano Premium', valor: 299.90, data_vencimento: '15/07/2026', status: 'Pendente' },
    { id: 2, descricao: 'Consultoria RH', valor: 1500.00, data_vencimento: '20/07/2026', status: 'Pendente' },
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
        <div className="flex-1 p-8 flex items-center justify-center">
          <div className="text-center">
            <Building2 className="h-12 w-12 text-[#6B1A2A] animate-pulse mx-auto mb-4" />
            <p className="text-[#708090]">Carregando...</p>
          </div>
        </div>
        <DashboardFooter />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[#2D343A] flex items-center gap-2">
                Olá, {userName}! 👋
              </h1>
              <p className="text-[#708090]">Bem-vindo ao seu painel de acompanhamento</p>
            </div>
            <button 
              onClick={() => router.push('/empresa/notificacoes')}
              className="relative p-2 hover:bg-[#F8F4E6] rounded-lg transition"
            >
              <Bell className="h-5 w-5 text-[#708090]" />
              {pendentesFinanceiro.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">
                  {pendentesFinanceiro.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div 
                key={index}
                onClick={() => router.push(stat.link)}
                className="bg-white rounded-2xl p-4 shadow-sm border border-[#E8EAE0] text-center hover:shadow-md transition cursor-pointer"
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 ${stat.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <p className="text-xl font-bold text-[#2D343A]">{stat.value}</p>
                <p className="text-xs text-[#708090]">{stat.label}</p>
              </div>
            )
          })}
        </div>

        {/* Vagas Recentes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-[#2D343A] flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-[#6B1A2A]" />
                Vagas Recentes
              </h3>
              <button 
                onClick={() => router.push('/empresa/vagas')}
                className="text-sm text-[#6B1A2A] hover:underline flex items-center gap-1"
              >
                Ver todas
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            {vagasRecentes.length === 0 ? (
              <p className="text-center text-[#708090] py-4">Nenhuma vaga cadastrada</p>
            ) : (
              <div className="space-y-3">
                {vagasRecentes.map((vaga) => (
                  <div 
                    key={vaga.id} 
                    className="flex items-center justify-between p-3 bg-[#F8F4E6] rounded-lg cursor-pointer hover:bg-[#E8EAE0] transition"
                    onClick={() => router.push(`/empresa/vagas/${vaga.id}`)}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-[#2D343A]">{vaga.titulo}</p>
                        <span className={`px-2 py-0.5 rounded-full text-xs ${
                          vaga.status === 'Aberta' ? 'bg-green-100 text-green-700' :
                          vaga.status === 'Em andamento' ? 'bg-yellow-100 text-yellow-700' :
                          vaga.status === 'Finalizada' ? 'bg-blue-100 text-blue-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {vaga.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-xs text-[#708090]">
                        <span>{vaga.candidatos} candidatos</span>
                        <span>•</span>
                        <span>{vaga.data}</span>
                        <span>•</span>
                        <span className={`px-2 py-0.5 rounded-full ${
                          vaga.origem === 'Operacional' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                          {vaga.origem}
                        </span>
                      </div>
                    </div>
                    <Eye className="h-4 w-4 text-[#708090]" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Financeiro - Pendências */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-[#2D343A] flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-[#6B1A2A]" />
                Pendências Financeiras
              </h3>
              <button 
                onClick={() => router.push('/empresa/financeiro')}
                className="text-sm text-[#6B1A2A] hover:underline flex items-center gap-1"
              >
                Ver todas
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            {pendentesFinanceiro.length === 0 ? (
              <div className="text-center py-8">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-2" />
                <p className="text-[#708090]">Tudo em dia! ✅</p>
                <p className="text-sm text-[#708090]">Nenhuma pendência financeira</p>
              </div>
            ) : (
              <div className="space-y-3">
                {pendentesFinanceiro.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-[#F8F4E6] rounded-lg">
                    <div>
                      <p className="font-medium text-[#2D343A]">{item.descricao}</p>
                      <div className="flex items-center gap-3 mt-1 text-xs text-[#708090]">
                        <span>Vence: {item.data_vencimento}</span>
                        <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded-full">
                          {item.status}
                        </span>
                      </div>
                    </div>
                    <p className="font-bold text-red-600">R$ {item.valor.toFixed(2)}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Atividades Recentes */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-6">
          <h3 className="font-semibold text-[#2D343A] mb-4 flex items-center gap-2">
            <Clock className="h-5 w-5 text-[#6B1A2A]" />
            Atividades Recentes
          </h3>
          <div className="space-y-3">
            {[
              { id: 1, descricao: 'Novo candidato se inscreveu para Analista Administrativo', data: '10/07/2026', tipo: 'candidato' },
              { id: 2, descricao: 'Vaga Mecânico de Motos foi criada no Operacional', data: '09/07/2026', tipo: 'vaga' },
              { id: 3, descricao: 'Processo Desenvolvedor Full Stack foi finalizado', data: '08/07/2026', tipo: 'processo' },
            ].map((item) => (
              <div key={item.id} className="flex items-center gap-4 p-3 bg-[#F8F4E6] rounded-lg">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  item.tipo === 'candidato' ? 'bg-green-100 text-green-600' :
                  item.tipo === 'vaga' ? 'bg-blue-100 text-blue-600' :
                  'bg-purple-100 text-purple-600'
                }`}>
                  {item.tipo === 'candidato' ? <Users className="h-5 w-5" /> :
                   item.tipo === 'vaga' ? <Briefcase className="h-5 w-5" /> :
                   <FileText className="h-5 w-5" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-[#2D343A]">{item.descricao}</p>
                  <p className="text-xs text-[#708090]">{item.data}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-[#708090]" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <DashboardFooter />
    </div>
  )
}
