'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { SidebarAdmin } from '@/components/dashboard/SidebarAdmin'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import {
  Shield, Users, Search, RefreshCw, CheckCircle, XCircle,
  User, UserCog, Building2, Briefcase, Home,
  Lock, Unlock, Save, AlertTriangle, Eye, EyeOff,
  Key, LogIn, LogOut, UserCheck, UserX, Crown
} from 'lucide-react'
import { listarUsuarios, atualizarRoleUsuario, listarPermissoes, salvarPermissoes } from '@/actions/acessos'

// Módulos do sistema
const MODULOS = [
  { id: 'dashboard', nome: 'Dashboard', descricao: 'Visão geral do sistema' },
  { id: 'empresas', nome: 'Empresas', descricao: 'Gerenciamento de empresas' },
  { id: 'candidatos', nome: 'Candidatos', descricao: 'Gerenciamento de candidatos' },
  { id: 'vagas', nome: 'Vagas', descricao: 'Gerenciamento de vagas' },
  { id: 'processos', nome: 'Processos', descricao: 'Processos seletivos' },
  { id: 'relatorios', nome: 'Relatórios', descricao: 'Relatórios e análises' },
  { id: 'financeiro', nome: 'Financeiro', descricao: 'Gestão financeira' },
  { id: 'qrcode', nome: 'QR Code', descricao: 'Central de QR Codes' },
  { id: 'agenda', nome: 'Agenda', descricao: 'Agenda de compromissos' },
  { id: 'backup', nome: 'Backup', descricao: 'Backup e restauração' },
  { id: 'configuracoes', nome: 'Configurações', descricao: 'Configurações do sistema' },
  { id: 'acessos', nome: 'Acessos', descricao: 'Controle de acessos' },
  { id: 'operacional', nome: 'Operacional', descricao: 'Módulo operacional' },
]

const PERFIS = [
  { id: 'admin', nome: 'Administrador', descricao: 'Acesso total ao sistema' },
  { id: 'empresa', nome: 'Empresa', descricao: 'Acesso para empresas parceiras' },
  { id: 'candidato', nome: 'Candidato', descricao: 'Acesso para candidatos' },
]

export default function AdminAcessos() {
  const router = useRouter()
  const [usuarios, setUsuarios] = useState<any[]>([])
  const [permissoes, setPermissoes] = useState<any>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [perfilSelecionado, setPerfilSelecionado] = useState('admin')
  const [salvando, setSalvando] = useState(false)

  useEffect(() => {
    carregarDados()
  }, [])

  const carregarDados = async () => {
    setLoading(true)
    setError(null)
    try {
      const [usuariosResult, permissoesResult] = await Promise.all([
        listarUsuarios(),
        listarPermissoes()
      ])

      if (usuariosResult.success) {
        setUsuarios(usuariosResult.data || [])
      }

      if (permissoesResult.success) {
        const permissoesData = permissoesResult.data?.valor || {}
        setPermissoes(permissoesData)
      }
    } catch (err) {
      setError('Erro ao carregar dados')
    } finally {
      setLoading(false)
    }
  }

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

  const salvarPermissoesHandler = async () => {
    setSalvando(true)
    try {
      const result = await salvarPermissoes(permissoes)
      if (result.success) {
        alert('✅ Permissões salvas com sucesso!')
      } else {
        alert(result.error || 'Erro ao salvar permissões')
      }
    } catch (error) {
      alert('Erro ao salvar permissões')
    } finally {
      setSalvando(false)
    }
  }

  const getPermissao = (perfil: string, modulo: string) => {
    if (perfil === 'admin') return true
    return permissoes[perfil]?.[modulo] ?? false
  }

  const contarPermissoesAtivas = (perfil: string) => {
    if (perfil === 'admin') return MODULOS.length
    if (!permissoes[perfil]) return 0
    return Object.values(permissoes[perfil]).filter(v => v === true).length
  }

  const getRoleColor = (role: string) => {
    const colors: Record<string, string> = {
      'admin': 'bg-red-100 text-red-700',
      'empresa': 'bg-blue-100 text-blue-700',
      'candidato': 'bg-green-100 text-green-700'
    }
    return colors[role] || 'bg-gray-100 text-gray-700'
  }

  const getRoleIcon = (role: string) => {
    const icons: Record<string, any> = {
      'admin': Crown,
      'empresa': Building2,
      'candidato': User
    }
    return icons[role] || User
  }

  const filteredUsuarios = usuarios.filter(u =>
    u.email?.toLowerCase().includes(search.toLowerCase()) ||
    u.name?.toLowerCase().includes(search.toLowerCase()) ||
    u.role?.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
        <SidebarAdmin />
        <div className="flex-1 ml-64 flex items-center justify-center">
          <div className="text-center">
            <Shield className="h-12 w-12 text-[#6B1A2A] animate-pulse mx-auto mb-4" />
            <p className="text-[#708090]">Carregando controles de acesso...</p>
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
              <Shield className="h-6 w-6 text-[#6B1A2A]" />
              Controle de Acessos
            </h1>
            <p className="text-sm text-[#708090]">Gerencie permissões e usuários</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={carregarDados}
              className="px-4 py-2 border border-[#E8EAE0] rounded-lg hover:bg-[#F8F4E6] transition flex items-center gap-2 text-[#708090]"
            >
              <RefreshCw className="h-4 w-4" />
              Atualizar
            </button>
            <button
              onClick={salvarPermissoesHandler}
              disabled={salvando}
              className="px-4 py-2 bg-[#6B1A2A] text-white rounded-lg hover:bg-[#4A0E1A] transition font-medium flex items-center gap-2 disabled:opacity-50"
            >
              {salvando ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Salvando...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Salvar Acessos
                </>
              )}
            </button>
          </div>
        </header>

        <div className="flex-1 p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* PERFIS */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border border-[#E8EAE0] p-6">
                <h3 className="font-semibold text-[#2D343A] mb-4 flex items-center gap-2">
                  <UserCog className="h-5 w-5 text-[#6B1A2A]" />
                  Perfis
                </h3>

                <div className="space-y-2">
                  {PERFIS.map((perfil) => {
                    const Icon = perfil.id === 'admin' ? Crown : perfil.id === 'empresa' ? Building2 : User
                    const total = contarPermissoesAtivas(perfil.id)
                    const totalModulos = MODULOS.length
                    const isAdmin = perfil.id === 'admin'

                    return (
                      <button
                        key={perfil.id}
                        onClick={() => setPerfilSelecionado(perfil.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg border transition ${
                          perfilSelecionado === perfil.id
                            ? 'border-[#6B1A2A] bg-[#6B1A2A]/5'
                            : 'border-[#E8EAE0] hover:border-[#6B1A2A]/30 hover:bg-[#F8F4E6]'
                        }`}
                      >
                        <div className={`p-2 rounded-lg ${
                          perfil.id === 'admin' ? 'bg-red-100 text-red-700' :
                          perfil.id === 'empresa' ? 'bg-blue-100 text-blue-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1 text-left">
                          <p className="font-semibold text-[#2D343A]">{perfil.nome}</p>
                          <p className="text-xs text-[#708090]">
                            {isAdmin ? 'Acesso total' : `${total}/${totalModulos} módulos`}
                          </p>
                        </div>
                        {isAdmin && (
                          <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full text-[10px] font-medium">
                            Fixo
                          </span>
                        )}
                      </button>
                    )
                  })}
                </div>

                {/* USUÁRIOS */}
                <div className="mt-6 pt-6 border-t border-[#E8EAE0]">
                  <h4 className="font-semibold text-[#2D343A] mb-3 flex items-center gap-2">
                    <Users className="h-4 w-4 text-[#6B1A2A]" />
                    Usuários ({usuarios.length})
                  </h4>
                  
                  <div className="relative mb-3">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#708090]" />
                    <input
                      type="text"
                      placeholder="Buscar usuários..."
                      className="w-full pl-10 pr-4 py-2 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A] text-sm"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {filteredUsuarios.length === 0 ? (
                      <p className="text-center text-sm text-[#708090] py-4">Nenhum usuário encontrado</p>
                    ) : (
                      filteredUsuarios.map((user) => {
                        const RoleIcon = getRoleIcon(user.role || 'candidato')
                        return (
                          <div key={user.id} className="flex items-center gap-3 p-2 bg-[#F8F4E6] rounded-lg">
                            <div className="w-8 h-8 rounded-full bg-[#6B1A2A]/10 flex items-center justify-center text-[#6B1A2A] font-bold text-xs">
                              {user.name?.charAt(0) || user.email?.charAt(0) || 'U'}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-[#2D343A] truncate">{user.name || user.email}</p>
                              <p className="text-xs text-[#708090] truncate">{user.email}</p>
                            </div>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${getRoleColor(user.role || 'candidato')} flex items-center gap-1`}>
                              <RoleIcon className="h-3 w-3" />
                              {user.role || 'candidato'}
                            </span>
                          </div>
                        )
                      })
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* PERMISSÕES */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm border border-[#E8EAE0] p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-[#2D343A] flex items-center gap-2">
                    <Lock className="h-5 w-5 text-[#6B1A2A]" />
                    Módulos - {PERFIS.find(p => p.id === perfilSelecionado)?.nome}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-[#708090]">
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

                {perfilSelecionado === 'admin' && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4 text-sm text-yellow-800 flex items-start gap-2">
                    <Crown className="h-5 w-5 flex-shrink-0 mt-0.5" />
                    <p>O Administrador tem acesso total a todos os módulos do sistema.</p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {MODULOS.map((modulo) => {
                    const ativo = getPermissao(perfilSelecionado, modulo.id)
                    const isAdmin = perfilSelecionado === 'admin'

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
                          <Home className="h-5 w-5" />
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

                {perfilSelecionado !== 'admin' && (
                  <div className="mt-6 pt-6 border-t border-[#E8EAE0] flex justify-end">
                    <button
                      onClick={salvarPermissoesHandler}
                      disabled={salvando}
                      className="px-6 py-2 bg-[#6B1A2A] text-white rounded-lg hover:bg-[#4A0E1A] transition font-medium flex items-center gap-2 disabled:opacity-50"
                    >
                      {salvando ? (
                        <>
                          <RefreshCw className="h-4 w-4 animate-spin" />
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
                )}
              </div>
            </div>
          </div>

          {/* LEGENDA */}
          <div className="mt-6 p-4 bg-white rounded-xl border border-[#E8EAE0]">
            <h4 className="text-sm font-semibold text-[#2D343A] mb-2">📌 Como funciona</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm text-[#708090]">
              <div className="flex items-center gap-2">
                <span className="text-green-600">✅</span>
                <span>Módulo liberado</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-red-600">❌</span>
                <span>Módulo bloqueado</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-400">🔒</span>
                <span>Admin tem acesso total</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-yellow-600">⚠️</span>
                <span>Alterações exigem salvar</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-600">🔄</span>
                <span>Permissões por perfil</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-purple-600">💾</span>
                <span>Salve para aplicar</span>
              </div>
            </div>
          </div>
        </div>

        <DashboardFooter />
      </div>
    </div>
  )
}
