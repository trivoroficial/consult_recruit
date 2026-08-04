'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { SidebarAdmin } from '@/components/dashboard/SidebarAdmin'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import { supabase } from '@/lib/supabase/client'
import {
  Users, Building2, Briefcase, TrendingUp,
  CheckCircle, Activity, Zap, Shield, BarChart3,
  Database, HardDrive, User, Clock, Calendar,
  ArrowUpRight, ArrowDownRight, CircleDollarSign,
  FileText, UserCheck, UserPlus, BriefcaseIcon,
  Download, Printer, Filter, RefreshCw,
  Bell, BellRing, Eye, EyeOff, Menu as MenuIcon,
  AlertTriangle, XCircle, AlertCircle, ShieldAlert
} from 'lucide-react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler
} from 'chart.js'
import { Bar, Pie, Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler
)

export default function AdminDashboard() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [userName, setUserName] = useState('Emerson Divino')
  const [saudacao, setSaudacao] = useState('Bom dia')
  const [error, setError] = useState<string | null>(null)
  const [notificacoes, setNotificacoes] = useState<any[]>([])
  const [notificacoesNaoLidas, setNotificacoesNaoLidas] = useState(0)
  const [mostrarNotificacoes, setMostrarNotificacoes] = useState(false)
  const [mostrarAlertas, setMostrarAlertas] = useState(true)

  // ============================================
  // ALERTAS DE SEGURANÇA - ADMIN
  // ============================================
  const [alertasSeguranca, setAlertasSeguranca] = useState<any[]>([])
  const [alertasNaoLidos, setAlertasNaoLidos] = useState(0)

  const [stats, setStats] = useState({
    empresas: 0,
    candidatos: 0,
    vagas: 0,
    processos: 0,
    transacoes: 0,
    usuarios: 0,
    empresasAtivas: 0,
    vagasAbertas: 0,
    candidatosDisponiveis: 0,
    contratacoes: 0,
    receitaTotal: 0,
    despesaTotal: 0,
    saldo: 0
  })

  const [bancoUso, setBancoUso] = useState({
    percentual: 0,
    usado: '0 MB',
    total: '500 MB',
    tabelas: 11,
    registros: 0
  })

  const [status, setStatus] = useState({
    conectado: false,
    mensagem: 'Verificando conexão...'
  })

  const [atividades, setAtividades] = useState<any[]>([])
  const [filtroPeriodo, setFiltroPeriodo] = useState('mes')
  const [ultimaAtualizacao, setUltimaAtualizacao] = useState<string>('')

  const [chartDataVagas, setChartDataVagas] = useState({ labels: [], datasets: [] })
  const [chartDataCandidatos, setChartDataCandidatos] = useState({ labels: [], datasets: [] })
  const [chartDataContratacoes, setChartDataContratacoes] = useState({ labels: [], datasets: [] })
  const [chartDataFinanceiro, setChartDataFinanceiro] = useState({ labels: [], datasets: [] })

  // ============================================
  // BUSCAR ALERTAS DE SEGURANÇA
  // ============================================
  const buscarAlertasSeguranca = useCallback(async () => {
    try {
      // Buscar logs de acesso admin nas últimas 24h
      // Simulação - depois conectar com tabela real de logs
      const alertas = [
        { 
          id: 1, 
          usuario: 'emerson@zenthos.com', 
          ip: '189.6.XXX.XXX', 
          data: new Date().toLocaleString('pt-BR'), 
          status: 'Acesso permitido',
          tipo: 'admin'
        },
        { 
          id: 2, 
          usuario: 'admin@zenthos.com', 
          ip: '189.6.XXX.XXX', 
          data: new Date(Date.now() - 3600000).toLocaleString('pt-BR'), 
          status: 'Acesso permitido',
          tipo: 'admin'
        },
        { 
          id: 3, 
          usuario: 'usuario_teste@email.com', 
          ip: '201.20.XXX.XXX', 
          data: new Date(Date.now() - 7200000).toLocaleString('pt-BR'), 
          status: 'Tentativa falha',
          tipo: 'suspeito'
        },
      ]
      
      setAlertasSeguranca(alertas)
      setAlertasNaoLidos(alertas.filter(a => a.status === 'Tentativa falha' || a.status === 'Acesso suspeito').length)
    } catch (error) {
      console.error('Erro ao buscar alertas de segurança:', error)
    }
  }, [])

  const carregarDados = useCallback(async (showRefresh = false) => {
    if (showRefresh) setRefreshing(true)
    setLoading(true)
    setError(null)

    try {
      // Testar conexão
      const { error: testError } = await supabase
        .from('empresas')
        .select('id')
        .limit(1)

      if (testError) {
        setStatus({
          conectado: false,
          mensagem: `Erro de conexão: ${testError.message}`
        })
        setLoading(false)
        setRefreshing(false)
        return
      }

      setStatus({ conectado: true, mensagem: '✅ Conectado' })

      // ============================================
      // 1. BUSCAR ESTATÍSTICAS PRINCIPAIS
      // ============================================
      const [
        { count: empresasCount },
        { count: candidatosCount },
        { count: vagasCount },
        { count: processosCount },
        { count: transacoesCount },
        { count: usuariosCount },
        { count: empresasAtivasCount },
        { count: vagasAbertasCount },
        { count: candidatosDisponiveisCount },
        { data: transacoesData }
      ] = await Promise.all([
        supabase.from('empresas').select('*', { count: 'exact', head: true }),
        supabase.from('candidatos').select('*', { count: 'exact', head: true }),
        supabase.from('vagas').select('*', { count: 'exact', head: true }),
        supabase.from('processos').select('*', { count: 'exact', head: true }),
        supabase.from('transacoes').select('*', { count: 'exact', head: true }),
        supabase.from('usuarios').select('*', { count: 'exact', head: true }),
        supabase.from('empresas').select('*', { count: 'exact', head: true })
          .eq('status', 'Ativo'),
        supabase.from('vagas').select('*', { count: 'exact', head: true })
          .eq('status', 'Aberta'),
        supabase.from('candidatos').select('*', { count: 'exact', head: true })
          .eq('status', 'Disponível'),
        supabase.from('transacoes').select('*')
      ])

      let receitaTotal = 0
      let despesaTotal = 0
      let contratacoes = 0

      if (transacoesData) {
        transacoesData.forEach((t: any) => {
          if (t.tipo === 'receita') receitaTotal += t.valor
          else despesaTotal += t.valor
          if (t.categoria === 'contratacao') contratacoes++
        })
      }

      setStats({
        empresas: empresasCount || 0,
        candidatos: candidatosCount || 0,
        vagas: vagasCount || 0,
        processos: processosCount || 0,
        transacoes: transacoesCount || 0,
        usuarios: usuariosCount || 0,
        empresasAtivas: empresasAtivasCount || 0,
        vagasAbertas: vagasAbertasCount || 0,
        candidatosDisponiveis: candidatosDisponiveisCount || 0,
        contratacoes: contratacoes || 0,
        receitaTotal: receitaTotal || 0,
        despesaTotal: despesaTotal || 0,
        saldo: receitaTotal - despesaTotal
      })

      // ============================================
      // 2. DADOS PARA GRÁFICOS
      // ============================================

      const { data: vagasPorStatus } = await supabase
        .from('vagas')
        .select('status')
      const statusCounts = vagasPorStatus?.reduce((acc: any, v: any) => {
        acc[v.status] = (acc[v.status] || 0) + 1
        return acc
      }, {})

      setChartDataVagas({
        labels: Object.keys(statusCounts || {}),
        datasets: [{
          label: 'Vagas por Status',
          data: Object.values(statusCounts || {}),
          backgroundColor: ['#6B1A2A', '#E3C9A8', '#2D343A', '#708090'],
          borderColor: '#FFFFFF',
          borderWidth: 2
        }]
      })

      const { data: candidatosPorStatus } = await supabase
        .from('candidatos')
        .select('status')
      const candidatosStatusCounts = candidatosPorStatus?.reduce((acc: any, c: any) => {
        acc[c.status] = (acc[c.status] || 0) + 1
        return acc
      }, {})

      setChartDataCandidatos({
        labels: Object.keys(candidatosStatusCounts || {}),
        datasets: [{
          label: 'Candidatos por Status',
          data: Object.values(candidatosStatusCounts || {}),
          backgroundColor: ['#6B1A2A', '#E3C9A8', '#2D343A', '#708090'],
          borderColor: '#FFFFFF',
          borderWidth: 2
        }]
      })

      const { data: contratacoesData } = await supabase
        .from('transacoes')
        .select('data')
        .eq('categoria', 'contratacao')

      const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
      const contratacoesPorMes = Array(12).fill(0)

      contratacoesData?.forEach((c: any) => {
        const mes = new Date(c.data).getMonth()
        contratacoesPorMes[mes]++
      })

      setChartDataContratacoes({
        labels: meses,
        datasets: [{
          label: 'Contratações por Mês',
          data: contratacoesPorMes,
          backgroundColor: '#6B1A2A',
          borderColor: '#6B1A2A',
          borderWidth: 2,
          fill: true
        }]
      })

      const { data: transacoesFinanceiro } = await supabase
        .from('transacoes')
        .select('data, tipo, valor')

      const receitasPorMes = Array(12).fill(0)
      const despesasPorMes = Array(12).fill(0)

      transacoesFinanceiro?.forEach((t: any) => {
        const mes = new Date(t.data).getMonth()
        if (t.tipo === 'receita') {
          receitasPorMes[mes] += t.valor
        } else {
          despesasPorMes[mes] += t.valor
        }
      })

      setChartDataFinanceiro({
        labels: meses,
        datasets: [
          {
            label: 'Receitas',
            data: receitasPorMes,
            backgroundColor: 'rgba(16, 185, 129, 0.5)',
            borderColor: '#10B981',
            borderWidth: 2
          },
          {
            label: 'Despesas',
            data: despesasPorMes,
            backgroundColor: 'rgba(239, 68, 68, 0.5)',
            borderColor: '#EF4444',
            borderWidth: 2
          }
        ]
      })

      // ============================================
      // 3. ATIVIDADES RECENTES
      // ============================================
      const [novasEmpresas, novosCandidatos, novasVagas, novosProcessos] = await Promise.all([
        supabase.from('empresas').select('id, nome, created_at').order('created_at', { ascending: false }).limit(3),
        supabase.from('candidatos').select('id, nome, created_at').order('created_at', { ascending: false }).limit(3),
        supabase.from('vagas').select('id, titulo, created_at').order('created_at', { ascending: false }).limit(3),
        supabase.from('processos').select('id, vaga, created_at').order('created_at', { ascending: false }).limit(3)
      ])

      const atividadesList = [
        ...(novasEmpresas.data || []).map((e: any) => ({
          tipo: 'empresa',
          descricao: 'Nova empresa cadastrada',
          nome: e.nome,
          hora: new Date(e.created_at).toLocaleString('pt-BR'),
          icon: Building2
        })),
        ...(novosCandidatos.data || []).map((c: any) => ({
          tipo: 'candidato',
          descricao: 'Novo candidato cadastrado',
          nome: c.nome,
          hora: new Date(c.created_at).toLocaleString('pt-BR'),
          icon: UserPlus
        })),
        ...(novasVagas.data || []).map((v: any) => ({
          tipo: 'vaga',
          descricao: 'Nova vaga publicada',
          nome: v.titulo,
          hora: new Date(v.created_at).toLocaleString('pt-BR'),
          icon: BriefcaseIcon
        })),
        ...(novosProcessos.data || []).map((p: any) => ({
          tipo: 'processo',
          descricao: 'Novo processo iniciado',
          nome: p.vaga,
          hora: new Date(p.created_at).toLocaleString('pt-BR'),
          icon: FileText
        }))
      ]

      atividadesList.sort((a, b) => new Date(b.hora).getTime() - new Date(a.hora).getTime())
      setAtividades(atividadesList.slice(0, 8))

      // ============================================
      // 4. NOTIFICAÇÕES
      // ============================================
      const { data: notificacoesData } = await supabase
        .from('notificacoes')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10)

      setNotificacoes(notificacoesData || [])
      setNotificacoesNaoLidas((notificacoesData || []).filter((n: any) => !n.lida).length)

      // ============================================
      // 5. USO DO BANCO
      // ============================================
      const totalRegistros = (empresasCount || 0) + (candidatosCount || 0) + (vagasCount || 0) +
        (processosCount || 0) + (transacoesCount || 0) + (usuariosCount || 0)

      const percentual = Math.min(Math.round((totalRegistros / 100) * 10), 100)
      const usadoMB = Math.round((totalRegistros * 0.5) / 1024 * 100) / 100

      setBancoUso({
        percentual: percentual,
        usado: `${usadoMB} MB`,
        total: '500 MB',
        tabelas: 11,
        registros: totalRegistros
      })

      setUltimaAtualizacao(new Date().toLocaleString('pt-BR'))

      // ============================================
      // 6. ALERTAS DE SEGURANÇA
      // ============================================
      await buscarAlertasSeguranca()

    } catch (error: any) {
      console.error('Erro ao carregar dados:', error)
      setError(error.message || 'Falha na conexão com o banco de dados')
      setStatus({
        conectado: false,
        mensagem: `❌ Erro: ${error.message || 'Falha na conexão'}`
      })
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }, [buscarAlertasSeguranca])

  useEffect(() => {
    const userData = localStorage.getItem('zenthos_user')
    if (userData) {
      try {
        const parsed = JSON.parse(userData)
        const name = parsed.name || 'Emerson Divino'
        setUserName(name.split(' ').map((n: string) =>
          n.charAt(0).toUpperCase() + n.slice(1).toLowerCase()
        ).join(' '))
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

    const interval = setInterval(() => {
      carregarDados()
    }, 60000) // A cada 1 minuto

    return () => clearInterval(interval)
  }, [carregarDados])

  const handleMarcarNotificacaoLida = async (id: number) => {
    await supabase
      .from('notificacoes')
      .update({ lida: true, lida_em: new Date().toISOString() })
      .eq('id', id)

    setNotificacoes(notificacoes.map(n =>
      n.id === id ? { ...n, lida: true } : n
    ))
    setNotificacoesNaoLidas(notificacoesNaoLidas - 1)
  }

  const handleMarcarTodasLidas = async () => {
    await supabase
      .from('notificacoes')
      .update({ lida: true, lida_em: new Date().toISOString() })
      .eq('lida', false)

    setNotificacoes(notificacoes.map(n => ({ ...n, lida: true })))
    setNotificacoesNaoLidas(0)
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  if (loading && !refreshing) {
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
        <header className="bg-white border-b border-[#E8EAE0] px-8 py-4 flex items-center justify-between sticky top-0 z-40">
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
              {new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
            </div>

            <div className="relative">
              <button
                onClick={() => setMostrarNotificacoes(!mostrarNotificacoes)}
                className="p-2 rounded-lg hover:bg-[#F8F4E6] transition relative"
              >
                {notificacoesNaoLidas > 0 ? (
                  <BellRing className="h-5 w-5 text-[#6B1A2A]" />
                ) : (
                  <Bell className="h-5 w-5 text-[#708090]" />
                )}
                {notificacoesNaoLidas > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">
                    {notificacoesNaoLidas}
                  </span>
                )}
              </button>

              {mostrarNotificacoes && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-xl border border-[#E8EAE0] max-h-96 overflow-y-auto z-50">
                  <div className="p-3 border-b border-[#E8EAE0] flex items-center justify-between">
                    <span className="font-semibold text-[#2D343A] text-sm">Notificações</span>
                    {notificacoesNaoLidas > 0 && (
                      <button
                        onClick={handleMarcarTodasLidas}
                        className="text-xs text-[#6B1A2A] hover:underline"
                      >
                        Marcar todas como lidas
                      </button>
                    )}
                  </div>
                  {notificacoes.length === 0 ? (
                    <div className="p-4 text-center text-[#708090] text-sm">
                      Nenhuma notificação
                    </div>
                  ) : (
                    notificacoes.map((n) => (
                      <div
                        key={n.id}
                        className={`p-3 border-b border-[#E8EAE0] hover:bg-[#F8F4E6] transition cursor-pointer ${!n.lida ? 'bg-[#6B1A2A]/5' : ''}`}
                        onClick={() => handleMarcarNotificacaoLida(n.id)}
                      >
                        <p className="text-sm font-medium text-[#2D343A]">{n.titulo}</p>
                        <p className="text-xs text-[#708090]">{n.mensagem}</p>
                        <p className="text-[10px] text-[#708090] mt-1">
                          {new Date(n.created_at).toLocaleString('pt-BR')}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            <button
              onClick={() => carregarDados(true)}
              disabled={refreshing}
              className="p-2 rounded-lg hover:bg-[#F8F4E6] transition"
            >
              <RefreshCw className={`h-5 w-5 text-[#708090] ${refreshing ? 'animate-spin' : ''}`} />
            </button>

            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${status.conectado ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
              {status.conectado ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
              {status.conectado ? 'Online' : 'Offline'}
            </div>
          </div>
        </header>

        <div className="flex-1 p-8">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4 text-sm flex items-center gap-2">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              {error}
            </div>
          )}

          {/* ============================================
          ALERTA DE SEGURANÇA - ADMIN
          ============================================ */}
          {alertasNaoLidos > 0 && (
            <div className="mb-6">
              <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <ShieldAlert className="h-5 w-5 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-red-700 flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4" />
                        🔒 Alerta de Segurança
                      </h3>
                      <button
                        onClick={() => setMostrarAlertas(!mostrarAlertas)}
                        className="text-sm text-red-600 hover:underline"
                      >
                        {mostrarAlertas ? 'Ocultar' : 'Mostrar'}
                      </button>
                    </div>
                    <p className="text-sm text-red-600 mt-1">
                      {alertasNaoLidos} atividade(s) suspeita(s) detectada(s) nas últimas 24h
                    </p>
                    {mostrarAlertas && (
                      <div className="mt-3 space-y-2">
                        {alertasSeguranca.filter(a => a.status === 'Tentativa falha' || a.status === 'Acesso suspeito').map((alerta) => (
                          <div key={alerta.id} className="bg-white rounded-lg p-3 border border-red-200">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium text-[#2D343A]">
                                  {alerta.usuario}
                                </p>
                                <p className="text-xs text-[#708090]">
                                  IP: {alerta.ip} • {alerta.data}
                                </p>
                              </div>
                              <span className="px-2 py-0.5 rounded-full text-xs bg-red-100 text-red-700">
                                {alerta.status}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* FILTROS */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-sm text-[#708090]">Período:</span>
            <div className="flex gap-1 bg-white rounded-lg border border-[#E8EAE0] p-1">
              {['hoje', 'semana', 'mes'].map((periodo) => (
                <button
                  key={periodo}
                  onClick={() => setFiltroPeriodo(periodo)}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition ${filtroPeriodo === periodo ? 'bg-[#6B1A2A] text-white' : 'text-[#708090] hover:bg-[#F8F4E6]'
                    }`}
                >
                  {periodo === 'hoje' ? 'Hoje' : periodo === 'semana' ? 'Esta Semana' : 'Este Mês'}
                </button>
              ))}
            </div>
            <span className="text-xs text-[#708090] ml-auto">
              Última atualização: {ultimaAtualizacao}
            </span>
          </div>

          {/* ===== CARDS PRINCIPAIS ===== */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-6">
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
            <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E8EAE0] text-center hover:shadow-md transition">
              <TrendingUp className="h-6 w-6 text-[#6B1A2A] mx-auto mb-2" />
              <p className="text-2xl font-bold text-[#2D343A]">{stats.contratacoes}</p>
              <p className="text-xs text-[#708090]">Contratações</p>
            </div>
          </div>

          {/* ===== KPI EXECUTIVOS ===== */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E8EAE0]">
              <p className="text-xs text-[#708090]">Empresas Ativas</p>
              <p className="text-2xl font-bold text-[#2D343A]">{stats.empresasAtivas}</p>
              <span className="text-xs text-green-600">
                {stats.empresas > 0 ? Math.round((stats.empresasAtivas / stats.empresas) * 100) : 0}% do total
              </span>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E8EAE0]">
              <p className="text-xs text-[#708090]">Vagas Abertas</p>
              <p className="text-2xl font-bold text-[#2D343A]">{stats.vagasAbertas}</p>
              <span className="text-xs text-green-600">
                {stats.vagas > 0 ? Math.round((stats.vagasAbertas / stats.vagas) * 100) : 0}% do total
              </span>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E8EAE0]">
              <p className="text-xs text-[#708090]">Candidatos Disponíveis</p>
              <p className="text-2xl font-bold text-[#2D343A]">{stats.candidatosDisponiveis}</p>
              <span className="text-xs text-green-600">
                {stats.candidatos > 0 ? Math.round((stats.candidatosDisponiveis / stats.candidatos) * 100) : 0}% do total
              </span>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E8EAE0]">
              <p className="text-xs text-[#708090]">Ticket Médio</p>
              <p className="text-2xl font-bold text-[#2D343A]">
                {stats.contratacoes > 0 ? formatCurrency(stats.receitaTotal / stats.contratacoes) : 'R$ 0,00'}
              </p>
              <span className="text-xs text-[#708090]">Por contratação</span>
            </div>
          </div>

          {/* ===== GRÁFICOS ===== */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-xl shadow-sm border border-[#E8EAE0] p-6">
              <h3 className="font-semibold text-[#2D343A] mb-4">Vagas por Status</h3>
              <div className="h-64">
                <Bar
                  data={chartDataVagas}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { display: false }
                    }
                  }}
                />
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-[#E8EAE0] p-6">
              <h3 className="font-semibold text-[#2D343A] mb-4">Candidatos por Status</h3>
              <div className="h-64">
                <Pie
                  data={chartDataCandidatos}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { position: 'bottom' }
                    }
                  }}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-xl shadow-sm border border-[#E8EAE0] p-6">
              <h3 className="font-semibold text-[#2D343A] mb-4">Contratações por Mês</h3>
              <div className="h-64">
                <Line
                  data={chartDataContratacoes}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { display: false }
                    },
                    scales: {
                      y: { beginAtZero: true }
                    }
                  }}
                />
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-[#E8EAE0] p-6">
              <h3 className="font-semibold text-[#2D343A] mb-4">Receitas x Despesas</h3>
              <div className="h-64">
                <Bar
                  data={chartDataFinanceiro}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { position: 'bottom' }
                    },
                    scales: {
                      y: { beginAtZero: true }
                    }
                  }}
                />
              </div>
            </div>
          </div>

          {/* ===== BANCO DE DADOS ===== */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white rounded-xl shadow-sm border border-[#E8EAE0] p-6">
              <h3 className="font-semibold text-[#2D343A] mb-4 flex items-center gap-2">
                <Database className="h-5 w-5 text-[#6B1A2A]" />
                Banco de Dados
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#708090]">Conexão</span>
                  <span className={`text-sm font-medium ${status.conectado ? 'text-green-600' : 'text-red-600'}`}>
                    {status.conectado ? '✅ Conectado' : '❌ Desconectado'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#708090]">Registros</span>
                  <span className="text-sm font-medium text-[#2D343A]">{bancoUso.registros}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#708090]">Uso</span>
                  <span className="text-sm font-medium text-[#2D343A]">{bancoUso.percentual}%</span>
                </div>
                <div className="w-full bg-[#F8F4E6] rounded-full h-2">
                  <div
                    className="h-2 rounded-full bg-[#6B1A2A] transition-all duration-1000"
                    style={{ width: `${bancoUso.percentual}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-[#708090]">
                  <span>{bancoUso.usado} usado</span>
                  <span>Limite: {bancoUso.total}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-[#E8EAE0] p-6 md:col-span-2">
              <h3 className="font-semibold text-[#2D343A] mb-4 flex items-center gap-2">
                <Activity className="h-5 w-5 text-[#6B1A2A]" />
                Atividades Recentes
              </h3>
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {atividades.length === 0 ? (
                  <p className="text-center text-[#708090] py-4">Nenhuma atividade recente</p>
                ) : (
                  atividades.map((item, index) => {
                    const Icon = item.icon
                    return (
                      <div key={index} className="flex items-center gap-4 p-3 bg-[#F8F4E6] rounded-lg">
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
                  })
                )}
              </div>
            </div>
          </div>

          {/* ===== AÇÕES RÁPIDAS ===== */}
          <div className="bg-white rounded-xl shadow-sm border border-[#E8EAE0] p-6">
            <h3 className="font-semibold text-[#2D343A] mb-4 flex items-center gap-2">
              <Zap className="h-5 w-5 text-[#6B1A2A]" />
              Ações Rápidas
            </h3>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => router.push('/admin/empresas/nova')}
                className="px-4 py-2 bg-[#6B1A2A] text-white rounded-lg hover:bg-[#4A0E1A] transition text-sm flex items-center gap-2"
              >
                <Building2 className="h-4 w-4" />
                Nova Empresa
              </button>
              <button
                onClick={() => router.push('/admin/candidatos/novo')}
                className="px-4 py-2 bg-[#6B1A2A] text-white rounded-lg hover:bg-[#4A0E1A] transition text-sm flex items-center gap-2"
              >
                <UserPlus className="h-4 w-4" />
                Novo Candidato
              </button>
              <button
                onClick={() => router.push('/admin/vagas/nova')}
                className="px-4 py-2 bg-[#6B1A2A] text-white rounded-lg hover:bg-[#4A0E1A] transition text-sm flex items-center gap-2"
              >
                <Briefcase className="h-4 w-4" />
                Nova Vaga
              </button>
              <button
                onClick={() => router.push('/admin/processos/novo')}
                className="px-4 py-2 bg-[#6B1A2A] text-white rounded-lg hover:bg-[#4A0E1A] transition text-sm flex items-center gap-2"
              >
                <FileText className="h-4 w-4" />
                Novo Processo
              </button>
              <button
                onClick={() => router.push('/admin/financeiro/nova-transacao')}
                className="px-4 py-2 bg-[#6B1A2A] text-white rounded-lg hover:bg-[#4A0E1A] transition text-sm flex items-center gap-2"
              >
                <CircleDollarSign className="h-4 w-4" />
                Nova Transação
              </button>
              <button
                onClick={() => {
                  const blob = new Blob([JSON.stringify({ stats, bancoUso, atividades }, null, 2)], { type: 'application/json' })
                  const url = URL.createObjectURL(blob)
                  const a = document.createElement('a')
                  a.href = url
                  a.download = `dashboard_${new Date().toISOString().split('T')[0]}.json`
                  a.click()
                  URL.revokeObjectURL(url)
                }}
                className="px-4 py-2 border border-[#E8EAE0] rounded-lg hover:bg-[#F8F4E6] transition text-sm flex items-center gap-2 text-[#708090]"
              >
                <Download className="h-4 w-4" />
                Exportar Dados
              </button>
              <button
                onClick={() => window.print()}
                className="px-4 py-2 border border-[#E8EAE0] rounded-lg hover:bg-[#F8F4E6] transition text-sm flex items-center gap-2 text-[#708090]"
              >
                <Printer className="h-4 w-4" />
                Imprimir
              </button>
            </div>
          </div>
        </div>

        <DashboardFooter />
      </div>
    </div>
  )
}
