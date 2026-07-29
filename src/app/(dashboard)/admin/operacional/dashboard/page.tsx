'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { SidebarAdmin } from '@/components/dashboard/SidebarAdmin'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import {
  UsersRound, ClipboardList, Calendar, FileText,
  TrendingUp, UserCheck, UserX, Clock,
  ArrowRight, Plus, Eye, BarChart3
} from 'lucide-react'
import { supabase } from '@/lib/supabase/client'

export default function OperacionalDashboard() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    participantes: 0,
    entrevistas: 0,
    processos: 0,
    aprovados: 0,
    reprovados: 0,
    bancoTalentos: 0
  })
  const [atividades, setAtividades] = useState<any[]>([])

  useEffect(() => {
    carregarDados()
  }, [])

  const carregarDados = async () => {
    setLoading(true)
    try {
      // Buscar participantes
      const { count: participantesCount } = await supabase
        .from('participantes')
        .select('*', { count: 'exact', head: true })

      // Buscar entrevistas
      const { count: entrevistasCount } = await supabase
        .from('entrevistas_operacionais')
        .select('*', { count: 'exact', head: true })

      // Buscar processos operacionais
      const { count: processosCount } = await supabase
        .from('processos_operacionais')
        .select('*', { count: 'exact', head: true })

      // Buscar resultados
      const { data: resultados } = await supabase
        .from('entrevistas_operacionais')
        .select('resultado')

      const aprovados = resultados?.filter(r => r.resultado === 'aprovado').length || 0
      const reprovados = resultados?.filter(r => r.resultado === 'reprovado').length || 0
      const bancoTalentos = resultados?.filter(r => r.resultado === 'banco_talentos').length || 0

      setStats({
        participantes: participantesCount || 0,
        entrevistas: entrevistasCount || 0,
        processos: processosCount || 0,
        aprovados,
        reprovados,
        bancoTalentos
      })

      // Atividades recentes
      const { data: recentes } = await supabase
        .from('participantes')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5)

      setAtividades(recentes || [])

    } catch (error) {
      console.error('Erro ao carregar dados:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
        <SidebarAdmin />
        <div className="flex-1 ml-64 flex items-center justify-center">
          <div className="text-center">
            <UsersRound className="h-12 w-12 text-[#6B1A2A] animate-pulse mx-auto mb-4" />
            <p className="text-[#708090]">Carregando dados operacionais...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
      <SidebarAdmin />
      
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <header className="bg-white border-b border-[#E8EAE0] px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#2D343A] flex items-center gap-2">
              <UsersRound className="h-6 w-6 text-[#6B1A2A]" />
              Dashboard Operacional
            </h1>
            <p className="text-sm text-[#708090]">Gestão de processos presenciais</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={carregarDados}
              className="px-4 py-2 border border-[#E8EAE0] rounded-lg hover:bg-[#F8F4E6] transition flex items-center gap-2 text-[#708090]"
            >
              <Clock className="h-4 w-4" />
              Atualizar
            </button>
            <button 
              onClick={() => router.push('/admin/operacional/participantes/novo')}
              className="px-4 py-2 bg-[#6B1A2A] text-white rounded-lg hover:bg-[#4A0E1A] transition font-medium flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Novo Participante
            </button>
          </div>
        </header>

        <div className="flex-1 p-8">
          {/* CARDS */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E8EAE0] text-center hover:shadow-md transition">
              <UsersRound className="h-6 w-6 text-[#6B1A2A] mx-auto mb-2" />
              <p className="text-2xl font-bold text-[#2D343A]">{stats.participantes}</p>
              <p className="text-xs text-[#708090]">Participantes</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E8EAE0] text-center hover:shadow-md transition">
              <ClipboardList className="h-6 w-6 text-[#6B1A2A] mx-auto mb-2" />
              <p className="text-2xl font-bold text-[#2D343A]">{stats.entrevistas}</p>
              <p className="text-xs text-[#708090]">Entrevistas</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E8EAE0] text-center hover:shadow-md transition">
              <FileText className="h-6 w-6 text-[#6B1A2A] mx-auto mb-2" />
              <p className="text-2xl font-bold text-[#2D343A]">{stats.processos}</p>
              <p className="text-xs text-[#708090]">Processos</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E8EAE0] text-center hover:shadow-md transition">
              <UserCheck className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-green-600">{stats.aprovados}</p>
              <p className="text-xs text-[#708090]">Aprovados</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E8EAE0] text-center hover:shadow-md transition">
              <UserX className="h-6 w-6 text-red-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-red-600">{stats.reprovados}</p>
              <p className="text-xs text-[#708090]">Reprovados</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E8EAE0] text-center hover:shadow-md transition">
              <BarChart3 className="h-6 w-6 text-yellow-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-yellow-600">{stats.bancoTalentos}</p>
              <p className="text-xs text-[#708090]">Banco de Talentos</p>
            </div>
          </div>

          {/* AÇÕES RÁPIDAS */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <button 
              onClick={() => router.push('/admin/operacional/participantes/novo')}
              className="bg-white p-4 rounded-xl shadow-sm border border-[#E8EAE0] hover:shadow-md transition flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#6B1A2A]/10 rounded-lg">
                  <UserPlus className="h-5 w-5 text-[#6B1A2A]" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-[#2D343A]">Cadastrar Participante</p>
                  <p className="text-xs text-[#708090]">Adicionar novo candidato</p>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-[#708090] group-hover:text-[#6B1A2A] transition" />
            </button>
            <button 
              onClick={() => router.push('/admin/operacional/entrevistas/nova')}
              className="bg-white p-4 rounded-xl shadow-sm border border-[#E8EAE0] hover:shadow-md transition flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Calendar className="h-5 w-5 text-blue-600" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-[#2D343A]">Nova Entrevista</p>
                  <p className="text-xs text-[#708090]">Agendar entrevista</p>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-[#708090] group-hover:text-blue-600 transition" />
            </button>
            <button 
              onClick={() => router.push('/admin/operacional/processos/novo')}
              className="bg-white p-4 rounded-xl shadow-sm border border-[#E8EAE0] hover:shadow-md transition flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <FileText className="h-5 w-5 text-green-600" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-[#2D343A]">Novo Processo</p>
                  <p className="text-xs text-[#708090]">Criar processo seletivo</p>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-[#708090] group-hover:text-green-600 transition" />
            </button>
            <button 
              onClick={() => router.push('/admin/operacional/relatorios')}
              className="bg-white p-4 rounded-xl shadow-sm border border-[#E8EAE0] hover:shadow-md transition flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <BarChart3 className="h-5 w-5 text-purple-600" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-[#2D343A]">Relatórios</p>
                  <p className="text-xs text-[#708090]">Análise de dados</p>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-[#708090] group-hover:text-purple-600 transition" />
            </button>
          </div>

          {/* ATIVIDADES RECENTES */}
          <div className="bg-white rounded-xl shadow-sm border border-[#E8EAE0] p-6">
            <h3 className="font-semibold text-[#2D343A] mb-4 flex items-center gap-2">
              <Clock className="h-5 w-5 text-[#6B1A2A]" />
              Atividades Recentes
            </h3>
            {atividades.length === 0 ? (
              <p className="text-center text-[#708090] py-4">Nenhuma atividade recente</p>
            ) : (
              <div className="space-y-3">
                {atividades.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-3 bg-[#F8F4E6] rounded-lg">
                    <div className="w-10 h-10 bg-[#6B1A2A]/10 rounded-full flex items-center justify-center text-[#6B1A2A]">
                      <UsersRound className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-[#2D343A]">{item.nome}</p>
                      <p className="text-xs text-[#708090]">Participante cadastrado</p>
                    </div>
                    <span className="text-xs text-[#708090]">
                      {new Date(item.created_at).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <DashboardFooter />
      </div>
    </div>
  )
}
