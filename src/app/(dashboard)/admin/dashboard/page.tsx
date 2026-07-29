'use client'

import { useState, useEffect } from 'react'
import { SidebarAdmin } from '@/components/dashboard/SidebarAdmin'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import { supabase } from '@/lib/supabase/client'
import { 
  Users, Building2, Briefcase, TrendingUp,
  CheckCircle, Activity, Zap, Shield, BarChart3,
  Database, HardDrive, User, Clock, Calendar,
  ArrowUpRight, ArrowDownRight, CircleDollarSign,
  FileText, UserCheck, UserPlus, BriefcaseIcon
} from 'lucide-react'

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true)
  const [userName, setUserName] = useState('Emerson Divino')
  const [saudacao, setSaudacao] = useState('Bom dia')
  const [status, setStatus] = useState({
    conectado: false,
    mensagem: 'Verificando conexão...'
  })
  const [stats, setStats] = useState({
    empresas: 0,
    candidatos: 0,
    vagas: 0,
    processos: 0,
    transacoes: 0,
    usuarios: 0
  })
  const [atividades, setAtividades] = useState<any[]>([])
  const [bancoUso, setBancoUso] = useState({
    percentual: 0,
    usado: '0 MB',
    total: '500 MB',
    tabelas: 11
  })

  useEffect(() => {
    const userData = localStorage.getItem('zenthos_user')
    if (userData) {
      try {
        const parsed = JSON.parse(userData)
        const name = parsed.name || 'Emerson Divino'
        const formattedName = name.split(' ').map((n: string) => 
          n.charAt(0).toUpperCase() + n.slice(1).toLowerCase()
        ).join(' ')
        setUserName(formattedName)
      } catch {
        setUserName('Emerson Divino')
      }
    }

    const hora = new Date().getHours()
    if (hora >= 5 && hora < 12) setSaudacao('Bom dia 🌅')
    else if (hora >= 12 && hora < 18) setSaudacao('Boa tarde ☀️')
    else if (hora >= 18 && hora < 24) setSaudacao('Boa noite 🌙')
    else setSaudacao('Boa madrugada 🌃')

    carregarDados()
  }, [])

  const carregarDados = async () => {
    setLoading(true)
    
    try {
      const { data: testData, error: testError } = await supabase
        .from('empresas')
        .select('id')
        .limit(1)

      if (testError) {
        setStatus({
          conectado: false,
          mensagem: `Erro de conexão: ${testError.message}`
        })
        setLoading(false)
        return
      }

      const [
        { count: empresasCount },
        { count: candidatosCount },
        { count: vagasCount },
        { count: processosCount },
        { count: transacoesCount },
        { count: usuariosCount }
      ] = await Promise.all([
        supabase.from('empresas').select('*', { count: 'exact', head: true }),
        supabase.from('candidatos').select('*', { count: 'exact', head: true }),
        supabase.from('vagas').select('*', { count: 'exact', head: true }),
        supabase.from('processos').select('*', { count: 'exact', head: true }),
        supabase.from('transacoes').select('*', { count: 'exact', head: true }),
        supabase.from('usuarios').select('*', { count: 'exact', head: true })
      ])

      setStats({
        empresas: empresasCount || 0,
        candidatos: candidatosCount || 0,
        vagas: vagasCount || 0,
        processos: processosCount || 0,
        transacoes: transacoesCount || 0,
        usuarios: usuariosCount || 0
      })

      const totalRegistros = (empresasCount || 0) + (candidatosCount || 0) + (vagasCount || 0) + 
                           (processosCount || 0) + (transacoesCount || 0) + (usuariosCount || 0)
      
      const percentual = Math.min(Math.round((totalRegistros / 100) * 10), 100)
      const usadoMB = Math.round((totalRegistros * 0.5) / 1024 * 100) / 100

      setBancoUso({
        percentual: percentual,
        usado: `${usadoMB} MB`,
        total: '500 MB',
        tabelas: 11
      })

      setStatus({
        conectado: true,
        mensagem: `✅ Conectado (${new Date().toLocaleString('pt-BR')})`
      })

      // Atividades simuladas
      setAtividades([
        { id: 1, tipo: 'candidato', descricao: 'Novo candidato cadastrado', nome: 'João Silva', hora: 'Há 2 minutos', icon: UserPlus },
        { id: 2, tipo: 'vaga', descricao: 'Nova vaga publicada', nome: 'Analista Administrativo', hora: 'Há 15 minutos', icon: BriefcaseIcon },
        { id: 3, tipo: 'empresa', descricao: 'Empresa cadastrada', nome: 'Indústria ABC', hora: 'Há 1 hora', icon: Building2 },
        { id: 4, tipo: 'candidatura', descricao: 'Nova candidatura', nome: 'Maria Santos → Auxiliar RH', hora: 'Há 2 horas', icon: UserCheck },
      ])

    } catch (error: any) {
      console.error('Erro ao carregar dados:', error)
      setStatus({
        conectado: false,
        mensagem: `❌ Erro: ${error.message || 'Falha na conexão'}`
      })
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
            <Database className="h-12 w-12 text-[#6B1A2A] animate-pulse mx-auto mb-4" />
            <p className="text-[#708090]">Carregando dados...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
      <SidebarAdmin />
      
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        {/* HEADER */}
        <header className="bg-white border-b border-[#E8EAE0] px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#2D343A] flex items-center gap-2">
              <User className="h-6 w-6 text-[#6B1A2A]" />
              {saudacao}, <span className="text-[#6B1A2A]">{userName}</span>
            </h1>
            <p className="text-sm text-[#708090]">Visão geral da plataforma</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-[#F8F4E6] text-[#708090]">
              <Clock className="h-4 w-4" />
              {new Date().toLocaleDateString('pt-BR', { 
                day: '2-digit', 
                month: 'long', 
                year: 'numeric' 
              })}
            </div>
            <button 
              onClick={carregarDados}
              className="px-4 py-2 text-sm border border-[#E8EAE0] rounded-lg hover:bg-[#F8F4E6] transition flex items-center gap-2"
            >
              <Activity className="h-4 w-4" />
              Atualizar
            </button>
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${
              status.conectado ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {status.conectado ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
              {status.conectado ? 'Online' : 'Offline'}
            </div>
          </div>
        </header>

        {/* CONTEÚDO */}
        <div className="flex-1 p-8">
          {/* STATUS CONEXÃO */}
          <div className={`mb-6 p-4 rounded-xl border ${
            status.conectado ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
          }`}>
            <div className="flex items-center gap-3">
              {status.conectado ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <XCircle className="h-5 w-5 text-red-600" />
              )}
              <span className={`text-sm ${status.conectado ? 'text-green-700' : 'text-red-700'}`}>
                {status.mensagem}
              </span>
            </div>
          </div>

          {/* STATS PRINCIPAIS */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E8EAE0] text-center hover:shadow-md transition">
              <Building2 className="h-6 w-6 text-[#6B1A2A] mx-auto mb-2" />
              <p className="text-2xl font-bold text-[#2D343A]">{stats.empresas}</p>
              <p className="text-xs text-[#708090]">Empresas</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E8EAE0] text-center hover:shadow-md transition">
              <Users className="h-6 w-6 text-[#6B1A2A] mx-auto mb-2" />
              <p className="text-2xl font-bold text-[#2D343A]">{stats.candidatos}</p>
              <p className="text-xs text-[#708090]">Candidatos</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E8EAE0] text-center hover:shadow-md transition">
              <Briefcase className="h-6 w-6 text-[#6B1A2A] mx-auto mb-2" />
              <p className="text-2xl font-bold text-[#2D343A]">{stats.vagas}</p>
              <p className="text-xs text-[#708090]">Vagas</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E8EAE0] text-center hover:shadow-md transition">
              <BarChart3 className="h-6 w-6 text-[#6B1A2A] mx-auto mb-2" />
              <p className="text-2xl font-bold text-[#2D343A]">{stats.processos}</p>
              <p className="text-xs text-[#708090]">Processos</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E8EAE0] text-center hover:shadow-md transition">
              <CircleDollarSign className="h-6 w-6 text-[#6B1A2A] mx-auto mb-2" />
              <p className="text-2xl font-bold text-[#2D343A]">{stats.transacoes}</p>
              <p className="text-xs text-[#708090]">Transações</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E8EAE0] text-center hover:shadow-md transition">
              <Shield className="h-6 w-6 text-[#6B1A2A] mx-auto mb-2" />
              <p className="text-2xl font-bold text-[#2D343A]">{stats.usuarios}</p>
              <p className="text-xs text-[#708090]">Usuários</p>
            </div>
          </div>

          {/* PERFIL E BANCO DE DADOS */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* PERFIL */}
            <div className="bg-white rounded-xl shadow-sm border border-[#E8EAE0] p-6">
              <h3 className="font-semibold text-[#2D343A] mb-4 flex items-center gap-2">
                <User className="h-5 w-5 text-[#6B1A2A]" />
                Perfil Ativo
              </h3>
              <div className="flex items-center gap-4 py-3 border-b border-[#E8EAE0]">
                <div className="w-14 h-14 bg-[#6B1A2A] rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {userName.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-[#2D343A] text-lg">{userName}</p>
                  <p className="text-sm text-[#6B1A2A] font-medium">Administrador Master</p>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between py-2 border-b border-[#E8EAE0]">
                  <span className="text-sm text-[#708090]">Sessão</span>
                  <span className="text-sm font-medium text-green-600">Ativa</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-[#708090]">Último acesso</span>
                  <span className="text-sm font-medium text-[#2D343A]">Agora</span>
                </div>
              </div>
            </div>

            {/* BANCO DE DADOS */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-[#E8EAE0] p-6">
              <h3 className="font-semibold text-[#2D343A] mb-4 flex items-center gap-2">
                <Database className="h-5 w-5 text-[#6B1A2A]" />
                Banco de Dados
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-[#F8F4E6] rounded-lg text-center">
                  <p className="text-2xl font-bold text-[#6B1A2A]">{bancoUso.percentual}%</p>
                  <p className="text-xs text-[#708090]">Uso</p>
                  <div className="w-full bg-white rounded-full h-2 mt-2">
                    <div 
                      className="h-2 rounded-full bg-[#6B1A2A] transition-all duration-1000"
                      style={{ width: `${bancoUso.percentual}%` }}
                    ></div>
                  </div>
                </div>
                <div className="p-4 bg-[#F8F4E6] rounded-lg text-center">
                  <HardDrive className="h-6 w-6 text-[#6B1A2A] mx-auto mb-1" />
                  <p className="text-sm font-medium text-[#2D343A]">{bancoUso.usado}</p>
                  <p className="text-xs text-[#708090]">Usado</p>
                </div>
                <div className="p-4 bg-[#F8F4E6] rounded-lg text-center">
                  <Database className="h-6 w-6 text-[#6B1A2A] mx-auto mb-1" />
                  <p className="text-sm font-medium text-[#2D343A]">{bancoUso.tabelas} tabelas</p>
                  <p className="text-xs text-[#708090]">Ativas</p>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-[#708090]">
                <span>Limite: {bancoUso.total}</span>
                <span className={status.conectado ? 'text-green-600' : 'text-red-600'}>
                  {status.conectado ? '🟢 Conectado' : '🔴 Desconectado'}
                </span>
              </div>
            </div>
          </div>

          {/* ATIVIDADES RECENTES */}
          <div className="bg-white rounded-xl shadow-sm border border-[#E8EAE0] p-6">
            <h3 className="font-semibold text-[#2D343A] mb-4 flex items-center gap-2">
              <Activity className="h-5 w-5 text-[#6B1A2A]" />
              Atividades Recentes
            </h3>
            <div className="space-y-3">
              {atividades.map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.id} className="flex items-center gap-4 p-3 bg-[#F8F4E6] rounded-lg hover:bg-[#F8F4E6]/70 transition">
                    <div className="w-10 h-10 bg-[#6B1A2A]/10 rounded-full flex items-center justify-center text-[#6B1A2A]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-[#2D343A]">{item.descricao}</p>
                      <p className="text-xs text-[#708090]">{item.nome}</p>
                    </div>
                    <span className="text-xs text-[#708090]">{item.hora}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <DashboardFooter />
      </div>
    </div>
  )
}
