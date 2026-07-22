'use client'

import { useState, useEffect } from 'react'
import { SidebarAdmin } from '@/components/dashboard/SidebarAdmin'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import { 
  Shield, User, Building2, Users, Briefcase, 
  CreditCard, Settings, Database, QrCode, Calendar,
  FileText, BarChart3, Home, Lock, Unlock,
  CheckCircle, XCircle, AlertTriangle, Save,
  Eye, EyeOff, UserCog, Key
} from 'lucide-react'

// MÓDULOS DO SISTEMA
const MODULOS = [
  { id: 'dashboard', nome: 'Dashboard', icon: Home, descricao: 'Visão geral do sistema' },
  { id: 'empresas', nome: 'Empresas', icon: Building2, descricao: 'Gerenciamento de empresas' },
  { id: 'candidatos', nome: 'Candidatos', icon: Users, descricao: 'Gerenciamento de candidatos' },
  { id: 'vagas', nome: 'Vagas', icon: Briefcase, descricao: 'Gerenciamento de vagas' },
  { id: 'processos', nome: 'Processos', icon: FileText, descricao: 'Processos seletivos' },
  { id: 'relatorios', nome: 'Relatórios', icon: BarChart3, descricao: 'Relatórios e análises' },
  { id: 'financeiro', nome: 'Financeiro', icon: CreditCard, descricao: 'Gestão financeira' },
  { id: 'qrcode', nome: 'QR Code', icon: QrCode, descricao: 'Central de QR Codes' },
  { id: 'agenda', nome: 'Agenda', icon: Calendar, descricao: 'Agenda de compromissos' },
  { id: 'backup', nome: 'Backup', icon: Database, descricao: 'Backup e restauração' },
  { id: 'configuracoes', nome: 'Configurações', icon: Settings, descricao: 'Configurações do sistema' },
  { id: 'acessos', nome: 'Acessos', icon: Shield, descricao: 'Controle de acessos' },
]

const PERFIS = [
  { id: 'admin', nome: 'Administrador', icon: UserCog, cor: 'bg-red-100 text-red-700' },
  { id: 'empresa', nome: 'Empresa', icon: Building2, cor: 'bg-blue-100 text-blue-700' },
  { id: 'candidato', nome: 'Candidato', icon: User, cor: 'bg-green-100 text-green-700' },
]

export default function AdminAcessos() {
  const [loading, setLoading] = useState(true)
  const [permissoes, setPermissoes] = useState<any>({})
  const [perfilSelecionado, setPerfilSelecionado] = useState('admin')
  const [salvando, setSalvando] = useState(false)
  const [mostrarSenha, setMostrarSenha] = useState(false)
  const [senhaConfirmacao, setSenhaConfirmacao] = useState('')

  // CARREGAR PERMISSÕES
  useEffect(() => {
    const saved = localStorage.getItem('zenthos_permissoes')
    if (saved) {
      setPermissoes(JSON.parse(saved))
    } else {
      // PERMISSÕES PADRÃO
      const defaultPermissoes = {
        admin: MODULOS.reduce((acc, m) => ({ ...acc, [m.id]: true }), {}),
        empresa: {
          dashboard: true,
          empresas: false,
          candidatos: true,
          vagas: true,
          processos: true,
          relatorios: true,
          financeiro: true,
          qrcode: false,
          agenda: true,
          backup: false,
          configuracoes: true,
          acessos: false,
        },
        candidato: {
          dashboard: true,
          empresas: false,
          candidatos: false,
          vagas: true,
          processos: false,
          relatorios: false,
          financeiro: false,
          qrcode: false,
          agenda: false,
          backup: false,
          configuracoes: true,
          acessos: false,
        }
      }
      setPermissoes(defaultPermissoes)
      localStorage.setItem('zenthos_permissoes', JSON.stringify(defaultPermissoes))
    }
    setLoading(false)
  }, [])

  const togglePermissao = (perfil: string, modulo: string) => {
    if (perfil === 'admin') {
      alert('O perfil Administrador tem acesso total ao sistema e não pode ser modificado.')
      return
    }

    setPermissoes((prev: any) => ({
      ...prev,
      [perfil]: {
        ...prev[perfil],
        [modulo]: !prev[perfil]?.[modulo]
      }
    }))
  }

  const salvarPermissoes = () => {
    if (senhaConfirmacao !== 'admin123') {
      alert('❌ Senha de confirmação incorreta. Use "admin123" para confirmar.')
      return
    }

    setSalvando(true)
    setTimeout(() => {
      localStorage.setItem('zenthos_permissoes', JSON.stringify(permissoes))
      setSalvando(false)
      setSenhaConfirmacao('')
      alert('✅ Permissões salvas com sucesso!')
    }, 1500)
  }

  const resetarPermissoes = () => {
    if (!confirm('Tem certeza que deseja resetar todas as permissões para o padrão?')) return
    
    const defaultPermissoes = {
      admin: MODULOS.reduce((acc, m) => ({ ...acc, [m.id]: true }), {}),
      empresa: {
        dashboard: true,
        empresas: false,
        candidatos: true,
        vagas: true,
        processos: true,
        relatorios: true,
        financeiro: true,
        qrcode: false,
        agenda: true,
        backup: false,
        configuracoes: true,
        acessos: false,
      },
      candidato: {
        dashboard: true,
        empresas: false,
        candidatos: false,
        vagas: true,
        processos: false,
        relatorios: false,
        financeiro: false,
        qrcode: false,
        agenda: false,
        backup: false,
        configuracoes: true,
        acessos: false,
      }
    }
    setPermissoes(defaultPermissoes)
    localStorage.setItem('zenthos_permissoes', JSON.stringify(defaultPermissoes))
    alert('✅ Permissões resetadas para o padrão!')
  }

  const getPermissao = (perfil: string, modulo: string) => {
    return permissoes[perfil]?.[modulo] ?? false
  }

  const contarPermissoesAtivas = (perfil: string) => {
    if (!permissoes[perfil]) return 0
    return Object.values(permissoes[perfil]).filter(v => v === true).length
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
        <SidebarAdmin />
        <div className="flex-1 ml-64 flex items-center justify-center">
          <div className="text-[#8B0000] text-xl">Carregando...</div>
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
              <Shield className="h-6 w-6 text-[#8B0000]" />
              Controle de Acessos
            </h1>
            <p className="text-sm text-[#708090]">Gerencie quais módulos cada perfil pode acessar</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={resetarPermissoes}
              className="px-4 py-2 border border-yellow-500 text-yellow-600 rounded-lg hover:bg-yellow-50 transition font-medium flex items-center gap-2"
            >
              <AlertTriangle className="h-4 w-4" />
              Resetar
            </button>
            <button
              onClick={salvarPermissoes}
              disabled={salvando}
              className="px-4 py-2 bg-[#8B0000] text-white rounded-lg hover:bg-[#700000] transition font-medium flex items-center gap-2 disabled:opacity-50"
            >
              {salvando ? (
                <>
                  <Save className="h-4 w-4 animate-spin" />
                  Salvando...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Salvar Permissões
                </>
              )}
            </button>
          </div>
        </header>

        <div className="flex-1 p-8">
          {/* PERFIS */}
          <div className="flex flex-wrap gap-3 mb-8">
            {PERFIS.map((perfil) => {
              const Icon = perfil.icon
              const total = contarPermissoesAtivas(perfil.id)
              const totalModulos = MODULOS.length
              const isAdmin = perfil.id === 'admin'

              return (
                <button
                  key={perfil.id}
                  onClick={() => setPerfilSelecionado(perfil.id)}
                  className={`flex items-center gap-3 px-6 py-3 rounded-xl border transition ${
                    perfilSelecionado === perfil.id
                      ? 'border-[#8B0000] bg-[#8B0000]/5 shadow-md'
                      : 'border-[#E8EAE0] hover:border-[#8B0000]/30 hover:bg-[#F8F4E6]'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${perfil.cor}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-[#2D343A]">{perfil.nome}</p>
                    <p className="text-xs text-[#708090]">
                      {isAdmin ? 'Acesso total' : `${total}/${totalModulos} módulos`}
                    </p>
                  </div>
                  {isAdmin && (
                    <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full text-xs">
                      Fixo
                    </span>
                  )}
                </button>
              )
            })}
          </div>

          {/* TABELA DE PERMISSÕES */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-[#2D343A] flex items-center gap-2">
                <UserCog className="h-5 w-5 text-[#8B0000]" />
                Módulos - {PERFIS.find(p => p.id === perfilSelecionado)?.nome}
              </h2>
              <div className="flex items-center gap-2 text-sm text-[#708090]">
                <span className="flex items-center gap-1">
                  <Lock className="h-4 w-4 text-green-600" />
                  Liberado
                </span>
                <span className="flex items-center gap-1">
                  <Unlock className="h-4 w-4 text-red-600" />
                  Bloqueado
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {MODULOS.map((modulo) => {
                const Icon = modulo.icon
                const isAdmin = perfilSelecionado === 'admin'
                const ativo = getPermissao(perfilSelecionado, modulo.id)

                return (
                  <div
                    key={modulo.id}
                    onClick={() => togglePermissao(perfilSelecionado, modulo.id)}
                    className={`flex items-center gap-3 p-4 rounded-xl border transition cursor-pointer ${
                      isAdmin
                        ? 'bg-gray-50 border-gray-200 cursor-not-allowed opacity-75'
                        : ativo
                        ? 'border-green-200 bg-green-50 hover:bg-green-100'
                        : 'border-red-200 bg-red-50 hover:bg-red-100'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${
                      isAdmin ? 'bg-gray-200 text-gray-500' :
                      ativo ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                    }`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-[#2D343A]">{modulo.nome}</p>
                      <p className="text-xs text-[#708090]">{modulo.descricao}</p>
                    </div>
                    <div>
                      {isAdmin ? (
                        <Lock className="h-5 w-5 text-gray-400" />
                      ) : ativo ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-600" />
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* CONFIRMAÇÃO DE SENHA */}
            {perfilSelecionado !== 'admin' && (
              <div className="mt-6 pt-6 border-t border-[#E8EAE0]">
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                      Confirme com a senha de administrador para salvar
                    </label>
                    <div className="relative">
                      <input
                        type={mostrarSenha ? 'text' : 'password'}
                        className="w-full px-4 py-2 pr-12 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
                        placeholder="Digite a senha de administrador..."
                        value={senhaConfirmacao}
                        onChange={(e) => setSenhaConfirmacao(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => setMostrarSenha(!mostrarSenha)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#708090] hover:text-[#2D343A]"
                      >
                        {mostrarSenha ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    <p className="text-xs text-[#708090] mt-1">Senha padrão: admin123</p>
                  </div>
                  <button
                    onClick={salvarPermissoes}
                    disabled={salvando}
                    className="px-6 py-2.5 bg-[#8B0000] text-white rounded-lg hover:bg-[#700000] transition font-medium flex items-center gap-2 disabled:opacity-50 whitespace-nowrap"
                  >
                    {salvando ? (
                      <>
                        <Save className="h-4 w-4 animate-spin" />
                        Salvando...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        Salvar Alterações
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* LEGENDA */}
          <div className="mt-6 p-4 bg-white rounded-xl border border-[#E8EAE0]">
            <h4 className="text-sm font-semibold text-[#2D343A] mb-2">📌 Como funciona</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-[#708090]">
              <div className="flex items-start gap-2">
                <span className="text-green-600">✅</span>
                <span>Módulo liberado para o perfil</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-red-600">❌</span>
                <span>Módulo bloqueado para o perfil</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-gray-400">🔒</span>
                <span>Administrador tem acesso total (fixo)</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-yellow-600">⚠️</span>
                <span>Alterações exigem senha de admin</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-600">🔄</span>
                <span>Resetar volta às configurações padrão</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-purple-600">💾</span>
                <span>Salve para aplicar as mudanças</span>
              </div>
            </div>
          </div>
        </div>

        <DashboardFooter />
      </div>
    </div>
  )
}
