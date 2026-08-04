'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  User, Briefcase, FileText, Calendar, 
  Clock, Star, ArrowRight, Heart, Bell, 
  CheckCircle, AlertCircle, XCircle, TrendingUp
} from 'lucide-react'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'

export default function CandidatoDashboard() {
  const router = useRouter()
  const [userName, setUserName] = useState('Candidato')
  const [loading, setLoading] = useState(true)

  // Dados mockados - depois conectar com Supabase
  const [stats] = useState({
    candidaturas: 3,
    favoritas: 2,
    entrevistas: 1,
    processos: 1
  })

  const [favoritas] = useState([
    { id: 1, titulo: 'Analista Administrativo', empresa: 'ZENTHOS', local: 'Uberlândia - MG' },
    { id: 2, titulo: 'Desenvolvedor Full Stack', empresa: 'Tech Corp', local: 'Remoto' }
  ])

  const [notificacoes] = useState([
    { 
      id: 1, 
      titulo: 'Atualização na sua candidatura', 
      descricao: 'Seu status para Analista Administrativo mudou para "Entrevista"',
      data: '10/07/2026', 
      lida: false,
      tipo: 'warning',
      candidaturaId: 1
    },
    { 
      id: 2, 
      titulo: 'Nova vaga disponível', 
      descricao: 'A vaga Desenvolvedor Mobile foi publicada',
      data: '08/07/2026', 
      lida: true,
      tipo: 'info',
      candidaturaId: null
    }
  ])

  useEffect(() => {
    const userData = localStorage.getItem('zenthos_user')
    if (userData) {
      try {
        const parsed = JSON.parse(userData)
        const name = parsed.name || 'Candidato'
        const formattedName = name.split(' ').map((n: string) =>
          n.charAt(0).toUpperCase() + n.slice(1).toLowerCase()
        ).join(' ')
        setUserName(formattedName)
      } catch {
        setUserName('Candidato')
      }
    }
    setLoading(false)
  }, [])

  const notificacoesNaoLidas = notificacoes.filter(n => !n.lida)

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
        <div className="flex-1 p-8 flex items-center justify-center">
          <div className="text-center">
            <User className="h-12 w-12 text-[#6B1A2A] animate-pulse mx-auto mb-4" />
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
          <h1 className="text-2xl font-bold text-[#2D343A] flex items-center gap-2">
            Olá, {userName}! 👋
          </h1>
          <p className="text-[#708090]">Bem-vindo ao seu painel de candidato</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div 
            className="bg-white rounded-2xl p-6 shadow-sm border border-[#E8EAE0] hover:shadow-md transition cursor-pointer"
            onClick={() => router.push('/candidato/candidaturas')}
          >
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-3">
              <Briefcase className="h-6 w-6 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-[#2D343A]">{stats.candidaturas}</p>
            <p className="text-sm text-[#708090]">Candidaturas</p>
          </div>

          <div 
            className="bg-white rounded-2xl p-6 shadow-sm border border-[#E8EAE0] hover:shadow-md transition cursor-pointer"
            onClick={() => router.push('/candidato/vagas')}
          >
            <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mb-3">
              <Heart className="h-6 w-6 text-red-500" />
            </div>
            <p className="text-2xl font-bold text-[#2D343A]">{stats.favoritas}</p>
            <p className="text-sm text-[#708090]">Vagas Favoritas</p>
          </div>

          <div 
            className="bg-white rounded-2xl p-6 shadow-sm border border-[#E8EAE0] hover:shadow-md transition cursor-pointer"
            onClick={() => router.push('/candidato/entrevistas')}
          >
            <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center mb-3">
              <Calendar className="h-6 w-6 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-[#2D343A]">{stats.entrevistas}</p>
            <p className="text-sm text-[#708090]">Entrevistas</p>
          </div>

          <div 
            className="bg-white rounded-2xl p-6 shadow-sm border border-[#E8EAE0] hover:shadow-md transition cursor-pointer"
            onClick={() => router.push('/candidato/processos')}
          >
            <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mb-3">
              <FileText className="h-6 w-6 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-[#2D343A]">{stats.processos}</p>
            <p className="text-sm text-[#708090]">Processos Ativos</p>
          </div>
        </div>

        {/* NOTIFICAÇÕES - DESTAQUE NO DASHBOARD */}
        {notificacoesNaoLidas.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-[#2D343A] flex items-center gap-2">
                <Bell className="h-5 w-5 text-[#6B1A2A]" />
                Notificações ({notificacoesNaoLidas.length} não lidas)
              </h2>
              <button 
                onClick={() => router.push('/candidato/notificacoes')}
                className="text-sm text-[#6B1A2A] hover:underline flex items-center gap-1"
              >
                Ver todas
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3">
              {notificacoesNaoLidas.map((item) => {
                const Icon = item.tipo === 'warning' ? AlertCircle : 
                            item.tipo === 'success' ? CheckCircle : 
                            item.tipo === 'error' ? XCircle : Bell
                const borderColor = item.tipo === 'warning' ? 'border-yellow-500' :
                                   item.tipo === 'success' ? 'border-green-500' :
                                   item.tipo === 'error' ? 'border-red-500' : 'border-[#6B1A2A]'
                
                return (
                  <div 
                    key={item.id} 
                    className={`bg-white rounded-2xl shadow-sm border-l-4 ${borderColor} border border-[#E8EAE0] p-4 hover:shadow-md transition cursor-pointer`}
                    onClick={() => {
                      if (item.candidaturaId) {
                        router.push(`/candidato/candidaturas/${item.candidaturaId}`)
                      } else {
                        router.push('/candidato/notificacoes')
                      }
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        item.tipo === 'warning' ? 'bg-yellow-50' :
                        item.tipo === 'success' ? 'bg-green-50' :
                        item.tipo === 'error' ? 'bg-red-50' : 'bg-[#6B1A2A]/10'
                      }`}>
                        <Icon className={`h-5 w-5 ${
                          item.tipo === 'warning' ? 'text-yellow-600' :
                          item.tipo === 'success' ? 'text-green-600' :
                          item.tipo === 'error' ? 'text-red-600' : 'text-[#6B1A2A]'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-[#2D343A]">{item.titulo}</p>
                        <p className="text-sm text-[#708090]">{item.descricao}</p>
                        <p className="text-xs text-[#708090] mt-1">{item.data}</p>
                      </div>
                      {!item.lida && (
                        <span className="w-2 h-2 bg-[#6B1A2A] rounded-full flex-shrink-0 mt-2"></span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Vagas Favoritas */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-[#2D343A] flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
              Vagas Favoritas
            </h2>
            <button 
              onClick={() => router.push('/candidato/vagas')}
              className="text-sm text-[#6B1A2A] hover:underline flex items-center gap-1"
            >
              Ver todas
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {favoritas.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-8 text-center">
              <p className="text-[#708090]">Nenhuma vaga favorita. <button className="text-[#6B1A2A] hover:underline" onClick={() => router.push('/candidato/vagas')}>Buscar vagas</button></p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {favoritas.map((vaga) => (
                <div key={vaga.id} className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-4 hover:shadow-md transition">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-[#2D343A]">{vaga.titulo}</h3>
                      <p className="text-sm text-[#708090]">{vaga.empresa}</p>
                      <p className="text-xs text-[#708090]">{vaga.local}</p>
                    </div>
                    <button 
                      onClick={() => router.push(`/candidato/vagas/${vaga.id}`)}
                      className="px-3 py-1 bg-[#6B1A2A] text-white rounded-lg hover:bg-[#4A0E1A] transition text-xs"
                    >
                      Ver vaga
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Atividades Recentes */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-6">
          <h3 className="font-semibold text-[#2D343A] mb-4 flex items-center gap-2">
            <Clock className="h-5 w-5 text-[#6B1A2A]" />
            Atividades Recentes
          </h3>
          <div className="space-y-3">
            {notificacoes.slice(0, 3).map((item) => (
              <div key={item.id} className="flex items-center gap-4 p-3 bg-[#F8F4E6] rounded-lg">
                <div className="w-10 h-10 bg-[#6B1A2A]/10 rounded-full flex items-center justify-center text-[#6B1A2A]">
                  <Bell className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-[#2D343A]">{item.titulo}</p>
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
