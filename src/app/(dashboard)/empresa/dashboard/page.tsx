'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Building2, Briefcase, Users, FileText, 
  TrendingUp, Clock, ArrowRight, Eye,
  Calendar, DollarSign, UserCheck, UserX, Bell
} from 'lucide-react'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'

export default function EmpresaDashboard() {
  const router = useRouter()
  const [userName, setUserName] = useState('Empresa')
  const [loading, setLoading] = useState(true)
  const [notificacoesNaoLidas, setNotificacoesNaoLidas] = useState(0)

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

  const stats = [
    { icon: Briefcase, label: 'Vagas', value: 5, color: 'bg-blue-50 text-blue-600', link: '/empresa/vagas' },
    { icon: Users, label: 'Candidatos', value: 12, color: 'bg-green-50 text-green-600', link: '/empresa/candidatos' },
    { icon: FileText, label: 'Processos', value: 3, color: 'bg-purple-50 text-purple-600', link: '/empresa/processos' },
    { icon: DollarSign, label: 'Financeiro', value: 'R$ 45K', color: 'bg-yellow-50 text-yellow-600', link: '/empresa/financeiro' },
    { icon: Calendar, label: 'Entrevistas', value: 4, color: 'bg-red-50 text-red-600', link: '/empresa/entrevistas' },
    { icon: Eye, label: 'Visualizações', value: 156, color: 'bg-indigo-50 text-indigo-600', link: '/empresa/vagas' },
  ]

  const atividades = [
    { id: 1, descricao: 'Novo candidato se inscreveu para Analista Administrativo', data: '10/07/2026', tipo: 'candidato' },
    { id: 2, descricao: 'Entrevista agendada para Desenvolvedor Full Stack', data: '09/07/2026', tipo: 'entrevista' },
    { id: 3, descricao: 'Processo Analista de RH foi concluído', data: '08/07/2026', tipo: 'processo' },
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
              <p className="text-[#708090]">Bem-vindo ao seu painel empresarial</p>
            </div>
            <button 
              onClick={() => router.push('/empresa/notificacoes')}
              className="relative p-2 hover:bg-[#F8F4E6] rounded-lg transition"
            >
              <Bell className="h-5 w-5 text-[#708090]" />
              {notificacoesNaoLidas > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#6B1A2A] text-white text-[10px] rounded-full flex items-center justify-center">
                  {notificacoesNaoLidas}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
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

        {/* Atividades Recentes */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-[#2D343A] flex items-center gap-2">
              <Clock className="h-5 w-5 text-[#6B1A2A]" />
              Atividades Recentes
            </h3>
            <button className="text-sm text-[#6B1A2A] hover:underline flex items-center gap-1">
              Ver todas
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {atividades.length === 0 ? (
            <p className="text-center text-[#708090] py-4">Nenhuma atividade recente</p>
          ) : (
            <div className="space-y-3">
              {atividades.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-3 bg-[#F8F4E6] rounded-lg">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    item.tipo === 'candidato' ? 'bg-green-100 text-green-600' :
                    item.tipo === 'entrevista' ? 'bg-blue-100 text-blue-600' :
                    'bg-purple-100 text-purple-600'
                  }`}>
                    {item.tipo === 'candidato' ? <Users className="h-5 w-5" /> :
                     item.tipo === 'entrevista' ? <Calendar className="h-5 w-5" /> :
                     <FileText className="h-5 w-5" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#2D343A]">{item.descricao}</p>
                    <p className="text-xs text-[#708090]">{item.data}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <DashboardFooter />
    </div>
  )
}
