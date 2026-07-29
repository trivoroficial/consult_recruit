'use client'

import { useState, useEffect } from 'react'
import { SidebarAdmin } from '@/components/dashboard/SidebarAdmin'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import { supabase } from '@/lib/supabase/client'
import { 
  Database, Users, Building2, Briefcase, 
  CheckCircle, XCircle, Activity, TrendingUp,
  BarChart3, Shield, HardDrive, Sun, Moon,
  User, Calendar, Clock
} from 'lucide-react'

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true)
  const [userName, setUserName] = useState('Administrador')
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

  useEffect(() => {
    // Buscar nome do usuário
    const userData = localStorage.getItem('zenthos_user')
    if (userData) {
      try {
        const parsed = JSON.parse(userData)
        setUserName(parsed.name || 'Administrador')
      } catch {
        setUserName('Administrador')
      }
    }

    // Definir saudação baseada na hora
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

      setStatus({
        conectado: true,
        mensagem: `✅ Conectado (${new Date().toLocaleString('pt-BR')})`
      })

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

  return (
    <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
      <SidebarAdmin />
      
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <header className="bg-white border-b border-[#E8EAE0] px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#2D343A] flex items-center gap-2">
              <User className="h-6 w-6 text-[#8B0000]" />
              {saudacao}, <span className="text-[#8B0000]">{userName}</span>
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

        <div className="flex-1 p-8">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <Database className="h-12 w-12 text-[#8B0000] animate-pulse mx-auto mb-4" />
                <p className="text-[#708090]">Carregando dados...</p>
              </div>
            </div>
          ) : (
            <>
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

              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E8EAE0] text-center hover:shadow-md transition">
                  <Building2 className="h-6 w-6 text-[#8B0000] mx-auto mb-2" />
                  <p className="text-2xl font-bold text-[#2D343A]">{stats.empresas}</p>
                  <p className="text-xs text-[#708090]">Empresas</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E8EAE0] text-center hover:shadow-md transition">
                  <Users className="h-6 w-6 text-[#8B0000] mx-auto mb-2" />
                  <p className="text-2xl font-bold text-[#2D343A]">{stats.candidatos}</p>
                  <p className="text-xs text-[#708090]">Candidatos</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E8EAE0] text-center hover:shadow-md transition">
                  <Briefcase className="h-6 w-6 text-[#8B0000] mx-auto mb-2" />
                  <p className="text-2xl font-bold text-[#2D343A]">{stats.vagas}</p>
                  <p className="text-xs text-[#708090]">Vagas</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E8EAE0] text-center hover:shadow-md transition">
                  <BarChart3 className="h-6 w-6 text-[#8B0000] mx-auto mb-2" />
                  <p className="text-2xl font-bold text-[#2D343A]">{stats.processos}</p>
                  <p className="text-xs text-[#708090]">Processos</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E8EAE0] text-center hover:shadow-md transition">
                  <TrendingUp className="h-6 w-6 text-[#8B0000] mx-auto mb-2" />
                  <p className="text-2xl font-bold text-[#2D343A]">{stats.transacoes}</p>
                  <p className="text-xs text-[#708090]">Transações</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E8EAE0] text-center hover:shadow-md transition">
                  <Shield className="h-6 w-6 text-[#8B0000] mx-auto mb-2" />
                  <p className="text-2xl font-bold text-[#2D343A]">{stats.usuarios}</p>
                  <p className="text-xs text-[#708090]">Usuários</p>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-[#E8EAE0] p-6">
                  <h3 className="font-semibold text-[#2D343A] mb-4 flex items-center gap-2">
                    <HardDrive className="h-5 w-5 text-[#8B0000]" />
                    Status do Banco de Dados
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-2 border-b border-[#E8EAE0]">
                      <span className="text-sm text-[#708090]">Conexão</span>
                      <span className={`text-sm font-medium ${status.conectado ? 'text-green-600' : 'text-red-600'}`}>
                        {status.conectado ? '✅ Conectado' : '❌ Desconectado'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-[#E8EAE0]">
                      <span className="text-sm text-[#708090]">Última atualização</span>
                      <span className="text-sm font-medium text-[#2D343A]">
                        {new Date().toLocaleString('pt-BR')}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-sm text-[#708090]">Total de registros</span>
                      <span className="text-sm font-medium text-[#2D343A]">
                        {stats.empresas + stats.candidatos + stats.vagas + stats.processos + stats.transacoes + stats.usuarios}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-[#E8EAE0] p-6">
                  <h3 className="font-semibold text-[#2D343A] mb-4 flex items-center gap-2">
                    <User className="h-5 w-5 text-[#8B0000]" />
                    Perfil Ativo
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 py-2 border-b border-[#E8EAE0]">
                      <div className="w-10 h-10 bg-[#8B0000]/10 rounded-full flex items-center justify-center text-[#8B0000] font-bold">
                        {userName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-[#2D343A]">{userName}</p>
                        <p className="text-sm text-[#708090]">Administrador Master</p>
                      </div>
                    </div>
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
              </div>
            </>
          )}
        </div>

        <DashboardFooter />
      </div>
    </div>
  )
}
