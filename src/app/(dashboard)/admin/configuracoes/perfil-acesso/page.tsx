'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { SidebarAdmin } from '@/components/dashboard/SidebarAdmin'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import { 
  Users, Shield, Settings, Save, Plus, Trash2, Edit, X,
  CheckCircle, AlertCircle, Search, Filter, UserPlus,
  Lock, Unlock, Eye, EyeOff, User, Briefcase, Building2,
  BarChart3, CreditCard, QrCode, Calendar, FileText,
  UsersRound, Award, TrendingUp, Home, ArrowLeft
} from 'lucide-react'

// MÓDULOS DISPONÍVEIS EM ORDEM ALFABÉTICA
const MODULOS_DISPONIVEIS = [
  { id: 'agenda', label: 'Agenda', icon: Calendar },
  { id: 'banco-talentos', label: 'Banco de Talentos', icon: Award },
  { id: 'candidatos', label: 'Candidatos', icon: Users },
  { id: 'configuracoes', label: 'Configurações', icon: Settings },
  { id: 'contratacoes', label: 'Contratações', icon: TrendingUp },
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'empresas', label: 'Empresas', icon: Building2 },
  { id: 'entrevistas', label: 'Entrevistas', icon: FileText },
  { id: 'financeiro', label: 'Financeiro', icon: CreditCard },
  { id: 'operacional', label: 'Operacional', icon: UsersRound },
  { id: 'participantes', label: 'Participantes', icon: Users },
  { id: 'processos', label: 'Processos', icon: Briefcase },
  { id: 'qrcode', label: 'QR Code Center', icon: QrCode },
  { id: 'relatorios', label: 'Relatórios', icon: BarChart3 },
  { id: 'vagas', label: 'Vagas', icon: Briefcase },
]

// PERFIS PADRÃO
const PERFIS_PADRAO = [
  { id: 'admin', label: 'Administrador Master', descricao: 'Acesso total a todos os módulos', cor: 'bg-purple-600' },
  { id: 'gestor', label: 'Gestor', descricao: 'Acesso gerencial a todos os módulos', cor: 'bg-blue-600' },
  { id: 'consultor', label: 'Consultor', descricao: 'Acesso operacional a módulos específicos', cor: 'bg-green-600' },
  { id: 'visualizador', label: 'Visualizador', descricao: 'Apenas visualização de dados', cor: 'bg-gray-600' },
]

// DADOS INICIAIS DE PERMISSÕES
const permissoesIniciais = {
  admin: MODULOS_DISPONIVEIS.map(m => ({ moduloId: m.id, permissao: 'total' })),
  gestor: MODULOS_DISPONIVEIS.map(m => ({ moduloId: m.id, permissao: 'visualizar' })),
  consultor: MODULOS_DISPONIVEIS.map(m => ({ moduloId: m.id, permissao: 'nenhum' })),
  visualizador: MODULOS_DISPONIVEIS.map(m => ({ moduloId: m.id, permissao: 'visualizar' })),
}

// USUÁRIOS DA EQUIPE
const usuariosIniciais = [
  { id: 1, nome: 'Ana Silva', email: 'ana@zenthos.com', perfil: 'gestor', ativo: true },
  { id: 2, nome: 'Carlos Santos', email: 'carlos@zenthos.com', perfil: 'consultor', ativo: true },
  { id: 3, nome: 'Mariana Oliveira', email: 'mariana@zenthos.com', perfil: 'visualizador', ativo: false },
]

export default function PerfilAcesso() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'usuarios' | 'perfis'>('usuarios')
  const [usuarios, setUsuarios] = useState(usuariosIniciais)
  const [permissoes, setPermissoes] = useState(permissoesIniciais)
  const [search, setSearch] = useState('')
  const [editandoUsuario, setEditandoUsuario] = useState<number | null>(null)
  const [novoUsuario, setNovoUsuario] = useState({ nome: '', email: '', perfil: 'consultor' })
  const [mostrarNovo, setMostrarNovo] = useState(false)
  const [editandoPermissao, setEditandoPermissao] = useState<string | null>(null)

  // Carregar dados do localStorage
  useEffect(() => {
    const savedUsuarios = localStorage.getItem('zenthos_usuarios')
    if (savedUsuarios) setUsuarios(JSON.parse(savedUsuarios))
    
    const savedPermissoes = localStorage.getItem('zenthos_permissoes')
    if (savedPermissoes) setPermissoes(JSON.parse(savedPermissoes))
  }, [])

  // Salvar dados
  const saveUsuarios = (data: typeof usuarios) => {
    setUsuarios(data)
    localStorage.setItem('zenthos_usuarios', JSON.stringify(data))
  }

  const savePermissoes = (data: typeof permissoes) => {
    setPermissoes(data)
    localStorage.setItem('zenthos_permissoes', JSON.stringify(data))
  }

  // Usuários
  const handleAddUsuario = () => {
    if (!novoUsuario.nome || !novoUsuario.email) return
    const newUser = {
      id: Date.now(),
      ...novoUsuario,
      ativo: true
    }
    const updated = [...usuarios, newUser]
    saveUsuarios(updated)
    setNovoUsuario({ nome: '', email: '', perfil: 'consultor' })
    setMostrarNovo(false)
  }

  const handleDeleteUsuario = (id: number) => {
    if (confirm('Tem certeza que deseja remover este usuário?')) {
      saveUsuarios(usuarios.filter(u => u.id !== id))
    }
  }

  const handleToggleAtivo = (id: number) => {
    const updated = usuarios.map(u => 
      u.id === id ? { ...u, ativo: !u.ativo } : u
    )
    saveUsuarios(updated)
  }

  const handleEditPerfil = (id: number, perfil: string) => {
    const updated = usuarios.map(u => 
      u.id === id ? { ...u, perfil } : u
    )
    saveUsuarios(updated)
    setEditandoUsuario(null)
  }

  // Permissões
  const handlePermissaoChange = (perfilId: string, moduloId: string, permissao: string) => {
    const updated = { ...permissoes }
    const perfilPermissoes = updated[perfilId as keyof typeof updated] || []
    const index = perfilPermissoes.findIndex(p => p.moduloId === moduloId)
    if (index !== -1) {
      perfilPermissoes[index].permissao = permissao
    } else {
      perfilPermissoes.push({ moduloId, permissao })
    }
    savePermissoes(updated)
  }

  const getPermissao = (perfilId: string, moduloId: string): string => {
    const perfilPermissoes = permissoes[perfilId as keyof typeof permissoes] || []
    const found = perfilPermissoes.find(p => p.moduloId === moduloId)
    return found ? found.permissao : 'nenhum'
  }

  const filteredUsuarios = usuarios.filter(u =>
    u.nome.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  )

  const getPerfilLabel = (id: string) => {
    const found = PERFIS_PADRAO.find(p => p.id === id)
    return found ? found.label : id
  }

  const getPerfilCor = (id: string) => {
    const found = PERFIS_PADRAO.find(p => p.id === id)
    return found ? found.cor : 'bg-gray-500'
  }

  return (
    <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
      <SidebarAdmin />
      
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <header className="bg-white border-b border-[#E8EAE0] px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => router.push('/admin/configuracoes')} className="p-2 hover:bg-[#F8F4E6] rounded-lg transition">
              <ArrowLeft className="h-5 w-5 text-[#708090]" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-[#2D343A]">Perfil de Acesso</h1>
              <p className="text-sm text-[#708090]">Gerencie perfis e permissões da equipe</p>
            </div>
          </div>
        </header>

        <div className="flex-1 p-8">
          {/* TABS */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setActiveTab('usuarios')}
              className={`px-6 py-2.5 rounded-lg font-medium transition ${
                activeTab === 'usuarios' 
                  ? 'bg-[#8B0000] text-white' 
                  : 'bg-white text-[#708090] hover:bg-[#F8F4E6] border border-[#E8EAE0]'
              }`}
            >
              <Users className="h-4 w-4 inline mr-2" />
              Usuários
            </button>
            <button
              onClick={() => setActiveTab('perfis')}
              className={`px-6 py-2.5 rounded-lg font-medium transition ${
                activeTab === 'perfis' 
                  ? 'bg-[#8B0000] text-white' 
                  : 'bg-white text-[#708090] hover:bg-[#F8F4E6] border border-[#E8EAE0]'
              }`}
            >
              <Shield className="h-4 w-4 inline mr-2" />
              Perfis e Permissões
            </button>
          </div>

          {/* TAB USUÁRIOS */}
          {activeTab === 'usuarios' && (
            <div className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex-1 relative max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#708090]" />
                  <input 
                    type="text" 
                    placeholder="Buscar usuários..." 
                    className="w-full pl-10 pr-4 py-2 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <button 
                  onClick={() => setMostrarNovo(!mostrarNovo)}
                  className="px-4 py-2 bg-[#8B0000] text-white rounded-lg hover:bg-[#700000] transition font-medium flex items-center gap-2"
                >
                  <UserPlus className="h-4 w-4" />
                  Novo Usuário
                </button>
              </div>

              {/* Formulário Novo Usuário */}
              {mostrarNovo && (
                <div className="mb-6 p-4 border border-[#E8EAE0] rounded-lg bg-[#F8F4E6]">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input 
                      type="text" 
                      placeholder="Nome" 
                      className="px-4 py-2 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
                      value={novoUsuario.nome}
                      onChange={(e) => setNovoUsuario({...novoUsuario, nome: e.target.value})}
                    />
                    <input 
                      type="email" 
                      placeholder="Email" 
                      className="px-4 py-2 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
                      value={novoUsuario.email}
                      onChange={(e) => setNovoUsuario({...novoUsuario, email: e.target.value})}
                    />
                    <div className="flex gap-2">
                      <select 
                        className="flex-1 px-4 py-2 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
                        value={novoUsuario.perfil}
                        onChange={(e) => setNovoUsuario({...novoUsuario, perfil: e.target.value})}
                      >
                        {PERFIS_PADRAO.map(p => (
                          <option key={p.id} value={p.id}>{p.label}</option>
                        ))}
                      </select>
                      <button 
                        onClick={handleAddUsuario}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                      >
                        <CheckCircle className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => setMostrarNovo(false)}
                        className="px-4 py-2 border border-[#E8EAE0] rounded-lg hover:bg-[#F8F4E6] transition"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Tabela de Usuários */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#F8F4E6]">
                    <tr>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Usuário</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Perfil</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Status</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsuarios.map((user) => (
                      <tr key={user.id} className="border-b border-[#E8EAE0] hover:bg-[#F8F4E6] transition">
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium text-[#2D343A]">{user.nome}</p>
                            <p className="text-sm text-[#708090]">{user.email}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          {editandoUsuario === user.id ? (
                            <select 
                              className="px-3 py-1 border border-[#E8EAE0] rounded-lg"
                              defaultValue={user.perfil}
                              onChange={(e) => handleEditPerfil(user.id, e.target.value)}
                            >
                              {PERFIS_PADRAO.map(p => (
                                <option key={p.id} value={p.id}>{p.label}</option>
                              ))}
                            </select>
                          ) : (
                            <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getPerfilCor(user.perfil)}`}>
                              {getPerfilLabel(user.perfil)}
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            user.ativo ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                          }`}>
                            {user.ativo ? 'Ativo' : 'Inativo'}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <button 
                              onClick={() => setEditandoUsuario(editandoUsuario === user.id ? null : user.id)}
                              className="p-1 hover:bg-[#F8F4E6] rounded"
                              title="Editar perfil"
                            >
                              <Edit className="h-4 w-4 text-[#708090]" />
                            </button>
                            <button 
                              onClick={() => handleToggleAtivo(user.id)}
                              className="p-1 hover:bg-[#F8F4E6] rounded"
                              title={user.ativo ? 'Desativar' : 'Ativar'}
                            >
                              {user.ativo ? <Lock className="h-4 w-4 text-yellow-600" /> : <Unlock className="h-4 w-4 text-green-600" />}
                            </button>
                            <button 
                              onClick={() => handleDeleteUsuario(user.id)}
                              className="p-1 hover:bg-[#F8F4E6] rounded"
                              title="Excluir"
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredUsuarios.length === 0 && (
                <div className="text-center py-8 text-[#708090]">
                  Nenhum usuário encontrado.
                </div>
              )}
            </div>
          )}

          {/* TAB PERFIS E PERMISSÕES */}
          {activeTab === 'perfis' && (
            <div className="space-y-6">
              {/* Perfis Disponíveis */}
              <div className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-6">
                <h2 className="text-lg font-semibold text-[#2D343A] mb-4 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-[#8B0000]" />
                  Perfis Disponíveis
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {PERFIS_PADRAO.map((perfil) => (
                    <div key={perfil.id} className={`p-4 rounded-xl border border-[#E8EAE0] ${editandoPermissao === perfil.id ? 'border-[#8B0000] bg-[#8B0000]/5' : ''}`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${perfil.cor}`}></div>
                        <h3 className="font-semibold text-[#2D343A]">{perfil.label}</h3>
                      </div>
                      <p className="text-sm text-[#708090] mt-1">{perfil.descricao}</p>
                      <button 
                        onClick={() => setEditandoPermissao(editandoPermissao === perfil.id ? null : perfil.id)}
                        className="mt-3 text-sm text-[#8B0000] hover:text-[#700000] font-medium"
                      >
                        {editandoPermissao === perfil.id ? 'Fechar' : 'Configurar permissões'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Permissões do Perfil Selecionado */}
              {editandoPermissao && (
                <div className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-[#2D343A] flex items-center gap-2">
                      <Settings className="h-5 w-5 text-[#8B0000]" />
                      Permissões - {getPerfilLabel(editandoPermissao)}
                    </h2>
                    <button 
                      onClick={() => setEditandoPermissao(null)}
                      className="text-sm text-[#708090] hover:text-[#8B0000]"
                    >
                      Fechar
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-[#F8F4E6]">
                        <tr>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Módulo</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Permissão</th>
                        </tr>
                      </thead>
                      <tbody>
                        {MODULOS_DISPONIVEIS.map((modulo) => {
                          const Icon = modulo.icon
                          const permissaoAtual = getPermissao(editandoPermissao, modulo.id)
                          return (
                            <tr key={modulo.id} className="border-b border-[#E8EAE0] hover:bg-[#F8F4E6] transition">
                              <td className="py-3 px-4">
                                <div className="flex items-center gap-2">
                                  <Icon className="h-4 w-4 text-[#8B0000]" />
                                  <span className="font-medium text-[#2D343A]">{modulo.label}</span>
                                </div>
                              </td>
                              <td className="py-3 px-4">
                                <select 
                                  className="px-3 py-1 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
                                  value={permissaoAtual}
                                  onChange={(e) => handlePermissaoChange(editandoPermissao, modulo.id, e.target.value)}
                                >
                                  <option value="nenhum">Nenhum</option>
                                  <option value="visualizar">Visualizar</option>
                                  <option value="editar">Editar</option>
                                  <option value="total">Total</option>
                                </select>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-700">
                    <p className="font-medium">Legenda de Permissões:</p>
                    <ul className="mt-1 space-y-1">
                      <li>🔴 <strong>Nenhum</strong> - Sem acesso ao módulo</li>
                      <li>🔵 <strong>Visualizar</strong> - Pode ver dados, mas não modificar</li>
                      <li>🟡 <strong>Editar</strong> - Pode visualizar e modificar dados</li>
                      <li>🟢 <strong>Total</strong> - Acesso completo (criar, editar, excluir)</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <DashboardFooter />
      </div>
    </div>
  )
}
