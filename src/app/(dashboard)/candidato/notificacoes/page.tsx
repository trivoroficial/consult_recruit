'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import { Bell, CheckCircle, Calendar, Briefcase, User, Trash2, AlertCircle, XCircle, ArrowRight } from 'lucide-react'

export default function CandidatoNotificacoes() {
  const router = useRouter()
  const [notificacoes, setNotificacoes] = useState([
    { 
      id: 1, 
      titulo: 'Atualização na sua candidatura', 
      descricao: 'Seu status para Analista Administrativo mudou para "Entrevista"',
      data: '10/07/2026', 
      lida: false,
      tipo: 'warning',
      link: '/candidato/candidaturas/1'
    },
    { 
      id: 2, 
      titulo: 'Nova vaga disponível', 
      descricao: 'A vaga Desenvolvedor Mobile foi publicada',
      data: '08/07/2026', 
      lida: true,
      tipo: 'info',
      link: '/candidato/vagas'
    },
    { 
      id: 3, 
      titulo: 'Entrevista agendada', 
      descricao: 'Sua entrevista para Desenvolvedor Full Stack está marcada para 20/07',
      data: '05/07/2026', 
      lida: false,
      tipo: 'success',
      link: '/candidato/entrevistas/1'
    },
    { 
      id: 4, 
      titulo: 'Resultado disponível', 
      descricao: 'O resultado da sua candidatura para Analista de RH já está disponível',
      data: '01/07/2026', 
      lida: false,
      tipo: 'error',
      link: '/candidato/candidaturas/3'
    },
  ])

  const marcarComoLida = (id: number) => {
    setNotificacoes(prev => 
      prev.map(n => n.id === id ? { ...n, lida: true } : n)
    )
  }

  const excluirNotificacao = (id: number) => {
    setNotificacoes(prev => prev.filter(n => n.id !== id))
  }

  const marcarTodasComoLidas = () => {
    setNotificacoes(prev => 
      prev.map(n => ({ ...n, lida: true }))
    )
  }

  const getTipoIcon = (tipo: string) => {
    const icons: Record<string, any> = {
      'info': Bell,
      'success': CheckCircle,
      'warning': AlertCircle,
      'error': XCircle
    }
    return icons[tipo] || Bell
  }

  const getTipoColor = (tipo: string) => {
    const colors: Record<string, string> = {
      'info': 'bg-blue-50 text-blue-600',
      'success': 'bg-green-50 text-green-600',
      'warning': 'bg-yellow-50 text-yellow-600',
      'error': 'bg-red-50 text-red-600'
    }
    return colors[tipo] || 'bg-[#F8F4E6] text-[#708090]'
  }

  const naoLidas = notificacoes.filter(n => !n.lida).length

  return (
    <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
      <div className="flex-1 p-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[#2D343A] flex items-center gap-2">
                <Bell className="h-6 w-6 text-[#6B1A2A]" />
                Notificações
              </h1>
              <p className="text-sm text-[#708090]">
                {naoLidas} não lidas • {notificacoes.length} no total
              </p>
            </div>
            <div className="flex gap-3">
              {naoLidas > 0 && (
                <button
                  onClick={marcarTodasComoLidas}
                  className="px-4 py-2 border border-[#E8EAE0] rounded-lg hover:bg-[#F8F4E6] transition text-sm text-[#708090]"
                >
                  Marcar todas como lidas
                </button>
              )}
              <button
                onClick={() => router.push('/candidato/dashboard')}
                className="px-4 py-2 bg-[#6B1A2A] text-white rounded-lg hover:bg-[#4A0E1A] transition text-sm flex items-center gap-2"
              >
                Voltar ao Dashboard
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {notificacoes.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-12 text-center">
            <Bell className="h-12 w-12 text-[#708090] mx-auto mb-4" />
            <p className="text-[#708090]">Nenhuma notificação</p>
            <button
              onClick={() => router.push('/candidato/dashboard')}
              className="mt-4 px-6 py-2 bg-[#6B1A2A] text-white rounded-lg hover:bg-[#4A0E1A] transition"
            >
              Voltar ao Dashboard
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {notificacoes.map((item) => {
              const Icon = getTipoIcon(item.tipo)
              const color = getTipoColor(item.tipo)
              return (
                <div 
                  key={item.id} 
                  className={`bg-white rounded-2xl shadow-sm border ${item.lida ? 'border-[#E8EAE0] opacity-70' : 'border-[#6B1A2A] border-l-4'} p-4 hover:shadow-md transition cursor-pointer`}
                  onClick={() => {
                    if (item.link) {
                      router.push(item.link)
                    }
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className={`font-medium ${item.lida ? 'text-[#708090]' : 'text-[#2D343A]'}`}>
                        {item.titulo}
                      </p>
                      <p className="text-sm text-[#708090]">{item.descricao}</p>
                      <p className="text-xs text-[#708090] mt-1">{item.data}</p>
                      {item.link && (
                        <button className="text-xs text-[#6B1A2A] hover:underline mt-1 flex items-center gap-1">
                          Ver detalhes
                          <ArrowRight className="h-3 w-3" />
                        </button>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      {!item.lida && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            marcarComoLida(item.id)
                          }}
                          className="p-1 hover:bg-[#F8F4E6] rounded-lg transition"
                          title="Marcar como lida"
                        >
                          <CheckCircle className="h-4 w-4 text-[#6B1A2A]" />
                        </button>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          excluirNotificacao(item.id)
                        }}
                        className="p-1 hover:bg-red-50 rounded-lg transition"
                        title="Excluir"
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
      <DashboardFooter />
    </div>
  )
}
