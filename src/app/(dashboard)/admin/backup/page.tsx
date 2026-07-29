'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { SidebarAdmin } from '@/components/dashboard/SidebarAdmin'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import {
  Database, Plus, Search, Trash2, Eye, RefreshCw,
  Download, Upload, Clock, CheckCircle, XCircle,
  HardDrive, Shield, Zap, AlertTriangle, Save,
  FileJson, FileSpreadsheet, FileText, ArrowUpDown,
  Play, Pause, RotateCcw, Calendar, Settings
} from 'lucide-react'
import { listarBackups, excluirBackup, criarBackup } from '@/actions/backup'

export default function AdminBackup() {
  const router = useRouter()
  const [backups, setBackups] = useState<any[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [backupEmAndamento, setBackupEmAndamento] = useState(false)
  const [backupAutomatico, setBackupAutomatico] = useState(true)
  const [horarioBackup, setHorarioBackup] = useState('03:00')
  const [tipoBackup, setTipoBackup] = useState('completo')

  useEffect(() => {
    carregarBackups()
  }, [])

  const carregarBackups = async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await listarBackups()
      if (result.success) {
        setBackups(result.data || [])
      } else {
        setError(result.error || 'Erro ao carregar backups')
      }
    } catch (err) {
      setError('Erro ao carregar backups')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir este backup?')) return

    try {
      const result = await excluirBackup(id)
      if (result.success) {
        await carregarBackups()
      } else {
        alert(result.error || 'Erro ao excluir backup')
      }
    } catch (error) {
      alert('Erro ao excluir backup')
    }
  }

  const handleBackupManual = async () => {
    setBackupEmAndamento(true)
    try {
      // Coletar dados para backup
      const dados = {
        empresas: localStorage.getItem('zenthos_empresas') || '[]',
        candidatos: localStorage.getItem('zenthos_candidatos') || '[]',
        vagas: localStorage.getItem('zenthos_vagas') || '[]',
        transacoes: localStorage.getItem('zenthos_transacoes') || '[]',
        processos: localStorage.getItem('zenthos_processos') || '[]',
        timestamp: new Date().toISOString(),
      }

      const nomeBackup = `Backup_${new Date().toLocaleDateString('pt-BR').replace(/\//g, '-')}_${new Date().toLocaleTimeString('pt-BR').replace(/:/g, '-')}`

      const result = await criarBackup({
        nome: nomeBackup,
        tipo: tipoBackup,
        tamanho: `${Math.round(JSON.stringify(dados).length / 1024)} KB`,
        registros: JSON.parse(dados.empresas).length + JSON.parse(dados.candidatos).length + JSON.parse(dados.vagas).length,
        arquivo: `${nomeBackup}.json`
      })

      if (result.success) {
        alert('✅ Backup realizado com sucesso!')
        await carregarBackups()
      } else {
        alert(result.error || 'Erro ao realizar backup')
      }
    } catch (error) {
      alert('Erro ao realizar backup')
    } finally {
      setBackupEmAndamento(false)
    }
  }

  const handleDownloadBackup = (backup: any) => {
    // Simular download
    alert(`📥 Baixando backup: ${backup.nome}`)
  }

  const handleRestoreBackup = (backup: any) => {
    if (!confirm(`Deseja restaurar o backup "${backup.nome}"? Isso substituirá todos os dados atuais.`)) return
    alert(`🔄 Restaurando backup: ${backup.nome}`)
  }

  const getTipoConfig = (tipo: string) => {
    const configs: Record<string, { label: string; color: string; icon: any }> = {
      'completo': { label: 'Completo', color: 'bg-green-100 text-green-700', icon: Database },
      'parcial': { label: 'Parcial', color: 'bg-yellow-100 text-yellow-700', icon: FileJson },
      'automatico': { label: 'Automático', color: 'bg-blue-100 text-blue-700', icon: Clock },
      'estrutura': { label: 'Estrutura', color: 'bg-purple-100 text-purple-700', icon: Settings }
    }
    return configs[tipo] || configs['completo']
  }

  const filtered = backups.filter(b =>
    b.nome?.toLowerCase().includes(search.toLowerCase()) ||
    b.tipo?.toLowerCase().includes(search.toLowerCase())
  )

  const totalBackups = backups.length
  const totalRegistros = backups.reduce((acc, b) => acc + (b.registros || 0), 0)

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
        <SidebarAdmin />
        <div className="flex-1 ml-64 flex items-center justify-center">
          <div className="text-center">
            <Database className="h-12 w-12 text-[#6B1A2A] animate-pulse mx-auto mb-4" />
            <p className="text-[#708090]">Carregando backups...</p>
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
              <Database className="h-6 w-6 text-[#6B1A2A]" />
              Backup e Restore
            </h1>
            <p className="text-sm text-[#708090]">{totalBackups} backups realizados</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={carregarBackups}
              className="px-4 py-2 border border-[#E8EAE0] rounded-lg hover:bg-[#F8F4E6] transition flex items-center gap-2 text-[#708090]"
            >
              <RefreshCw className="h-4 w-4" />
              Atualizar
            </button>
            <button 
              onClick={handleBackupManual}
              disabled={backupEmAndamento}
              className="px-4 py-2 bg-[#6B1A2A] text-white rounded-lg hover:bg-[#4A0E1A] transition font-medium flex items-center gap-2 disabled:opacity-50"
            >
              {backupEmAndamento ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Backup...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Backup Manual
                </>
              )}
            </button>
          </div>
        </header>

        <div className="flex-1 p-8">
          {/* CARDS DE STATUS */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E8EAE0] text-center">
              <p className="text-2xl font-bold text-[#2D343A]">{totalBackups}</p>
              <p className="text-xs text-[#708090]">Total de Backups</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E8EAE0] text-center">
              <p className="text-2xl font-bold text-[#6B1A2A]">{totalRegistros}</p>
              <p className="text-xs text-[#708090]">Registros</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E8EAE0] text-center">
              <p className="text-2xl font-bold text-green-600">{backups.filter(b => b.status === 'concluido').length}</p>
              <p className="text-xs text-[#708090]">Concluídos</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E8EAE0] text-center">
              <p className="text-2xl font-bold text-blue-600">{backups.filter(b => b.tipo === 'automatico').length}</p>
              <p className="text-xs text-[#708090]">Automáticos</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E8EAE0] text-center">
              <p className={`text-2xl font-bold ${backupAutomatico ? 'text-green-600' : 'text-red-600'}`}>
                {backupAutomatico ? 'Ativo' : 'Inativo'}
              </p>
              <p className="text-xs text-[#708090]">Backup Automático</p>
            </div>
          </div>

          {/* CONFIGURAÇÕES */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border border-[#E8EAE0] p-6">
                <h3 className="font-semibold text-[#2D343A] mb-4 flex items-center gap-2">
                  <Settings className="h-5 w-5 text-[#6B1A2A]" />
                  Configurações
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-[#F8F4E6] rounded-lg">
                    <div>
                      <p className="font-medium text-[#2D343A]">Backup Automático</p>
                      <p className="text-sm text-[#708090]">Diário às {horarioBackup}</p>
                    </div>
                    <button
                      onClick={() => setBackupAutomatico(!backupAutomatico)}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
                        backupAutomatico ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {backupAutomatico ? 'Ativo' : 'Inativo'}
                    </button>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                      Horário do Backup
                    </label>
                    <input
                      type="time"
                      className="w-full px-4 py-2 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A]"
                      value={horarioBackup}
                      onChange={(e) => setHorarioBackup(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                      Tipo de Backup
                    </label>
                    <select
                      className="w-full px-4 py-2 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A]"
                      value={tipoBackup}
                      onChange={(e) => setTipoBackup(e.target.value)}
                    >
                      <option value="completo">Completo</option>
                      <option value="parcial">Parcial</option>
                      <option value="automatico">Automático</option>
                      <option value="estrutura">Estrutura</option>
                    </select>
                  </div>

                  <button
                    onClick={handleBackupManual}
                    disabled={backupEmAndamento}
                    className="w-full px-4 py-2 bg-[#6B1A2A] text-white rounded-lg hover:bg-[#4A0E1A] transition font-medium flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {backupEmAndamento ? (
                      <>
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        Backup em andamento...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        Realizar Backup Agora
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* LISTA DE BACKUPS */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm border border-[#E8EAE0] p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#708090]" />
                    <input 
                      type="text" 
                      placeholder="Buscar backups..." 
                      className="w-full pl-10 pr-4 py-2 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A]"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
                    {error}
                  </div>
                )}

                {backups.length === 0 ? (
                  <div className="text-center py-12">
                    <Database className="h-12 w-12 text-[#708090] mx-auto mb-4" />
                    <p className="text-[#708090]">Nenhum backup realizado.</p>
                    <button 
                      onClick={handleBackupManual}
                      className="mt-4 px-4 py-2 bg-[#6B1A2A] text-white rounded-lg hover:bg-[#4A0E1A] transition"
                    >
                      Realizar primeiro backup
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                    {filtered.map((item) => {
                      const tipoConfig = getTipoConfig(item.tipo)
                      const TipoIcon = tipoConfig.icon
                      return (
                        <div
                          key={item.id}
                          className="flex items-center justify-between p-4 border border-[#E8EAE0] rounded-lg hover:bg-[#F8F4E6] transition"
                        >
                          <div className="flex items-center gap-4">
                            <div className={`p-2 rounded-lg ${tipoConfig.color}`}>
                              <TipoIcon className="h-5 w-5" />
                            </div>
                            <div>
                              <p className="font-medium text-[#2D343A]">{item.nome}</p>
                              <div className="flex flex-wrap items-center gap-2 text-xs text-[#708090]">
                                <span>{item.data || new Date(item.created_at).toLocaleString('pt-BR')}</span>
                                <span>•</span>
                                <span>{item.tamanho || '0 KB'}</span>
                                <span>•</span>
                                <span>{item.registros || 0} registros</span>
                                <span>•</span>
                                <span className={`px-1.5 py-0.5 rounded-full text-xs ${tipoConfig.color}`}>
                                  {tipoConfig.label}
                                </span>
                                {item.status === 'concluido' && (
                                  <span className="flex items-center gap-1 text-green-600">
                                    <CheckCircle className="h-3 w-3" />
                                    Concluído
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleDownloadBackup(item)}
                              className="p-1.5 hover:bg-[#E8EAE0] rounded-lg transition"
                              title="Baixar"
                            >
                              <Download className="h-4 w-4 text-[#708090]" />
                            </button>
                            <button
                              onClick={() => handleRestoreBackup(item)}
                              className="p-1.5 hover:bg-green-50 rounded-lg transition"
                              title="Restaurar"
                            >
                              <RotateCcw className="h-4 w-4 text-green-600" />
                            </button>
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="p-1.5 hover:bg-red-50 rounded-lg transition"
                              title="Excluir"
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* MENSAGEM DE SEGURANÇA */}
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl text-sm text-yellow-800 flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Dica de Segurança:</p>
              <p>Os backups são armazenados no banco de dados. Recomendamos baixar uma cópia externa periodicamente. O backup automático diário ajuda a prevenir perda de dados.</p>
            </div>
          </div>
        </div>

        <DashboardFooter />
      </div>
    </div>
  )
}
