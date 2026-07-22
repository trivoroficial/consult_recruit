'use client'

import { useState, useEffect } from 'react'
import { SidebarAdmin } from '@/components/dashboard/SidebarAdmin'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import { 
  Database, Download, Upload, Clock, Calendar, 
  CheckCircle, XCircle, AlertTriangle, RefreshCw,
  FileJson, FileSpreadsheet, FileText, Trash2,
  HardDrive, Shield, Zap, Settings, Plus,
  Play, Pause, RotateCcw, Save, ArrowUpDown
} from 'lucide-react'

export default function AdminBackup() {
  const [backups, setBackups] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [backupEmAndamento, setBackupEmAndamento] = useState(false)
  const [restaurando, setRestaurando] = useState(false)
  const [backupAutomatico, setBackupAutomatico] = useState(true)
  const [horarioBackup, setHorarioBackup] = useState('03:00')
  const [tipoBackup, setTipoBackup] = useState('completo')
  const [modoBackup, setModoBackup] = useState('manual')

  // CARREGAR BACKUPS DO LOCALSTORAGE
  useEffect(() => {
    const saved = localStorage.getItem('zenthos_backups')
    if (saved) {
      setBackups(JSON.parse(saved))
    } else {
      const initial = [
        { 
          id: 1, 
          nome: 'Backup_2026-07-20_03-00', 
          data: '2026-07-20 03:00:00', 
          tamanho: '2.4 MB',
          tipo: 'completo',
          status: 'concluido',
          registros: 47,
          arquivo: 'backup_2026-07-20.zip'
        },
        { 
          id: 2, 
          nome: 'Backup_2026-07-19_03-00', 
          data: '2026-07-19 03:00:00', 
          tamanho: '2.3 MB',
          tipo: 'completo',
          status: 'concluido',
          registros: 45,
          arquivo: 'backup_2026-07-19.zip'
        },
        { 
          id: 3, 
          nome: 'Backup_2026-07-18_03-00', 
          data: '2026-07-18 03:00:00', 
          tamanho: '2.2 MB',
          tipo: 'parcial',
          status: 'concluido',
          registros: 30,
          arquivo: 'backup_2026-07-18.zip'
        },
      ]
      setBackups(initial)
      localStorage.setItem('zenthos_backups', JSON.stringify(initial))
    }
    setLoading(false)
  }, [])

  const saveBackups = (data: typeof backups) => {
    setBackups(data)
    localStorage.setItem('zenthos_backups', JSON.stringify(data))
  }

  const realizarBackup = () => {
    setBackupEmAndamento(true)

    setTimeout(() => {
      // Coletar todos os dados do localStorage
      const dados = {
        empresas: localStorage.getItem('zenthos_empresas') || '[]',
        candidatos: localStorage.getItem('zenthos_candidatos') || '[]',
        vagas: localStorage.getItem('zenthos_vagas') || '[]',
        transacoes: localStorage.getItem('zenthos_transacoes') || '[]',
        processos: localStorage.getItem('zenthos_processos') || '[]',
        configuracoes: localStorage.getItem('zenthos_configuracoes') || '{}',
        usuarios: localStorage.getItem('zenthos_user') || '{}',
        timestamp: new Date().toISOString(),
      }

      // Salvar backup no localStorage
      const backupKey = `zenthos_backup_${new Date().toISOString().replace(/[:.]/g, '-')}`
      localStorage.setItem(backupKey, JSON.stringify(dados))

      // Adicionar à lista de backups
      const novoBackup = {
        id: Date.now(),
        nome: `Backup_${new Date().toLocaleDateString('pt-BR').replace(/\//g, '-')}_${new Date().toLocaleTimeString('pt-BR').replace(/:/g, '-')}`,
        data: new Date().toLocaleString('pt-BR'),
        tamanho: `${Math.round(JSON.stringify(dados).length / 1024)} KB`,
        tipo: tipoBackup,
        status: 'concluido',
        registros: JSON.parse(dados.empresas || '[]').length + 
                  JSON.parse(dados.candidatos || '[]').length + 
                  JSON.parse(dados.vagas || '[]').length,
        arquivo: `${backupKey}.json`,
        key: backupKey
      }

      const updated = [novoBackup, ...backups]
      saveBackups(updated)
      setBackupEmAndamento(false)
      
      alert('✅ Backup realizado com sucesso!')
    }, 3000)
  }

  const restaurarBackup = (backup: any) => {
    if (!confirm(`Deseja restaurar o backup "${backup.nome}"? Isso substituirá todos os dados atuais.`)) return

    setRestaurando(true)

    setTimeout(() => {
      try {
        const dados = localStorage.getItem(backup.key)
        if (dados) {
          const parsed = JSON.parse(dados)
          
          if (parsed.empresas) localStorage.setItem('zenthos_empresas', parsed.empresas)
          if (parsed.candidatos) localStorage.setItem('zenthos_candidatos', parsed.candidatos)
          if (parsed.vagas) localStorage.setItem('zenthos_vagas', parsed.vagas)
          if (parsed.transacoes) localStorage.setItem('zenthos_transacoes', parsed.transacoes)
          if (parsed.processos) localStorage.setItem('zenthos_processos', parsed.processos)
          if (parsed.configuracoes) localStorage.setItem('zenthos_configuracoes', parsed.configuracoes)
          if (parsed.usuarios) localStorage.setItem('zenthos_user', parsed.usuarios)

          alert('✅ Backup restaurado com sucesso! A página será recarregada.')
          window.location.reload()
        }
      } catch (error) {
        alert('❌ Erro ao restaurar backup. Verifique a integridade do arquivo.')
      }
      setRestaurando(false)
    }, 2000)
  }

  const excluirBackup = (id: number) => {
    if (!confirm('Tem certeza que deseja excluir este backup?')) return
    const updated = backups.filter(b => b.id !== id)
    saveBackups(updated)
  }

  const exportarBackup = (backup: any) => {
    const dados = localStorage.getItem(backup.key)
    if (dados) {
      const blob = new Blob([dados], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${backup.nome}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }
  }

  const baixarTodosDados = () => {
    const dados = {
      empresas: localStorage.getItem('zenthos_empresas') || '[]',
      candidatos: localStorage.getItem('zenthos_candidatos') || '[]',
      vagas: localStorage.getItem('zenthos_vagas') || '[]',
      transacoes: localStorage.getItem('zenthos_transacoes') || '[]',
      processos: localStorage.getItem('zenthos_processos') || '[]',
      configuracoes: localStorage.getItem('zenthos_configuracoes') || '{}',
      usuarios: localStorage.getItem('zenthos_user') || '{}',
      timestamp: new Date().toISOString(),
      exportacao: 'manual'
    }

    const blob = new Blob([JSON.stringify(dados, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `exportacao_zenthos_${new Date().toISOString().replace(/[:.]/g, '-')}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const importarDados = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const dados = JSON.parse(e.target?.result as string)
        
        if (dados.empresas) localStorage.setItem('zenthos_empresas', dados.empresas)
        if (dados.candidatos) localStorage.setItem('zenthos_candidatos', dados.candidatos)
        if (dados.vagas) localStorage.setItem('zenthos_vagas', dados.vagas)
        if (dados.transacoes) localStorage.setItem('zenthos_transacoes', dados.transacoes)
        if (dados.processos) localStorage.setItem('zenthos_processos', dados.processos)
        if (dados.configuracoes) localStorage.setItem('zenthos_configuracoes', dados.configuracoes)
        if (dados.usuarios) localStorage.setItem('zenthos_user', dados.usuarios)

        alert('✅ Dados importados com sucesso! A página será recarregada.')
        window.location.reload()
      } catch (error) {
        alert('❌ Erro ao importar dados. Verifique o formato do arquivo.')
      }
    }
    reader.readAsText(file)
  }

  // BACKUP AUTOMÁTICO DIÁRIO
  useEffect(() => {
    if (!backupAutomatico) return

    // Verificar se já foi feito hoje
    const hoje = new Date().toDateString()
    const ultimoBackup = localStorage.getItem('zenthos_ultimo_backup_automatico')

    if (ultimoBackup !== hoje) {
      // Verificar se já passou do horário
      const agora = new Date()
      const [hora, minuto] = horarioBackup.split(':').map(Number)
      const horarioBackupDate = new Date()
      horarioBackupDate.setHours(hora, minuto, 0, 0)

      if (agora >= horarioBackupDate) {
        // Realizar backup automático
        const dados = {
          empresas: localStorage.getItem('zenthos_empresas') || '[]',
          candidatos: localStorage.getItem('zenthos_candidatos') || '[]',
          vagas: localStorage.getItem('zenthos_vagas') || '[]',
          transacoes: localStorage.getItem('zenthos_transacoes') || '[]',
          processos: localStorage.getItem('zenthos_processos') || '[]',
          configuracoes: localStorage.getItem('zenthos_configuracoes') || '{}',
          usuarios: localStorage.getItem('zenthos_user') || '{}',
          timestamp: new Date().toISOString(),
        }

        const backupKey = `zenthos_backup_${new Date().toISOString().replace(/[:.]/g, '-')}`
        localStorage.setItem(backupKey, JSON.stringify(dados))
        localStorage.setItem('zenthos_ultimo_backup_automatico', hoje)

        const novoBackup = {
          id: Date.now(),
          nome: `Backup_Automatico_${new Date().toLocaleDateString('pt-BR').replace(/\//g, '-')}`,
          data: new Date().toLocaleString('pt-BR'),
          tamanho: `${Math.round(JSON.stringify(dados).length / 1024)} KB`,
          tipo: 'automatico',
          status: 'concluido',
          registros: JSON.parse(dados.empresas || '[]').length + 
                    JSON.parse(dados.candidatos || '[]').length + 
                    JSON.parse(dados.vagas || '[]').length,
          arquivo: `${backupKey}.json`,
          key: backupKey
        }

        const updated = [novoBackup, ...backups]
        saveBackups(updated)
      }
    }
  }, [backupAutomatico, horarioBackup, backups])

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
              <Database className="h-6 w-6 text-[#8B0000]" />
              Backup e Restore
            </h1>
            <p className="text-sm text-[#708090]">Gerencie backups da plataforma</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={realizarBackup}
              disabled={backupEmAndamento}
              className="px-4 py-2 bg-[#8B0000] text-white rounded-lg hover:bg-[#700000] transition font-medium flex items-center gap-2 disabled:opacity-50"
            >
              {backupEmAndamento ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Backup em andamento...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Backup Manual
                </>
              )}
            </button>
            <button
              onClick={baixarTodosDados}
              className="px-4 py-2 border border-[#8B0000] text-[#8B0000] rounded-lg hover:bg-[#8B0000] hover:text-white transition font-medium flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Exportar Tudo
            </button>
          </div>
        </header>

        <div className="flex-1 p-8">
          {/* CARDS DE STATUS */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E8EAE0]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#708090]">Total de Backups</p>
                  <p className="text-2xl font-bold text-[#2D343A]">{backups.length}</p>
                </div>
                <Database className="h-8 w-8 text-[#8B0000] opacity-50" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E8EAE0]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#708090]">Último Backup</p>
                  <p className="text-sm font-medium text-[#2D343A]">
                    {backups.length > 0 ? backups[0].data : 'Nenhum'}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-green-500 opacity-50" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E8EAE0]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#708090]">Backup Automático</p>
                  <p className={`text-sm font-medium ${backupAutomatico ? 'text-green-600' : 'text-red-600'}`}>
                    {backupAutomatico ? 'Ativo' : 'Inativo'}
                  </p>
                </div>
                <Shield className="h-8 w-8 text-[#8B0000] opacity-50" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E8EAE0]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#708090]">Total de Dados</p>
                  <p className="text-sm font-medium text-[#2D343A]">
                    {backups.reduce((acc, b) => acc + (b.registros || 0), 0)} registros
                  </p>
                </div>
                <HardDrive className="h-8 w-8 text-[#8B0000] opacity-50" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* CONFIGURAÇÕES */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-6">
                <h2 className="text-lg font-semibold text-[#2D343A] mb-4 flex items-center gap-2">
                  <Settings className="h-5 w-5 text-[#8B0000]" />
                  Configurações
                </h2>

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
                      Horário do Backup Automático
                    </label>
                    <input
                      type="time"
                      className="w-full px-4 py-2 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
                      value={horarioBackup}
                      onChange={(e) => setHorarioBackup(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                      Tipo de Backup
                    </label>
                    <select
                      className="w-full px-4 py-2 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
                      value={tipoBackup}
                      onChange={(e) => setTipoBackup(e.target.value)}
                    >
                      <option value="completo">Completo (Todos os dados)</option>
                      <option value="parcial">Parcial (Dados essenciais)</option>
                      <option value="estrutura">Estrutura (Configurações apenas)</option>
                    </select>
                  </div>

                  <div className="pt-4 border-t border-[#E8EAE0]">
                    <p className="text-sm font-medium text-[#2D343A] mb-3">Opções de Backup</p>
                    <div className="space-y-2">
                      <button
                        onClick={() => setModoBackup('manual')}
                        className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition flex items-center justify-center gap-2 ${
                          modoBackup === 'manual' 
                            ? 'bg-[#8B0000] text-white' 
                            : 'border border-[#E8EAE0] text-[#708090] hover:bg-[#F8F4E6]'
                        }`}
                      >
                        <Play className="h-4 w-4" />
                        Modo Manual
                      </button>
                      <button
                        onClick={() => setModoBackup('automatico')}
                        className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition flex items-center justify-center gap-2 ${
                          modoBackup === 'automatico' 
                            ? 'bg-[#8B0000] text-white' 
                            : 'border border-[#E8EAE0] text-[#708090] hover:bg-[#F8F4E6]'
                        }`}
                      >
                        <Zap className="h-4 w-4" />
                        Modo Automático
                      </button>
                      <button
                        onClick={() => setModoBackup('híbrido')}
                        className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition flex items-center justify-center gap-2 ${
                          modoBackup === 'híbrido' 
                            ? 'bg-[#8B0000] text-white' 
                            : 'border border-[#E8EAE0] text-[#708090] hover:bg-[#F8F4E6]'
                        }`}
                      >
                        <ArrowUpDown className="h-4 w-4" />
                        Modo Híbrido
                      </button>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#E8EAE0]">
                    <h4 className="text-sm font-medium text-[#2D343A] mb-2">Importar/Exportar</h4>
                    <div className="flex gap-2">
                      <label className="flex-1 cursor-pointer">
                        <div className="px-4 py-2 border border-[#8B0000] text-[#8B0000] rounded-lg hover:bg-[#8B0000] hover:text-white transition text-center text-sm">
                          <Upload className="h-4 w-4 inline mr-1" />
                          Importar
                        </div>
                        <input
                          type="file"
                          accept=".json"
                          className="hidden"
                          onChange={importarDados}
                        />
                      </label>
                      <button
                        onClick={baixarTodosDados}
                        className="flex-1 px-4 py-2 border border-[#E8EAE0] rounded-lg hover:bg-[#F8F4E6] transition text-sm flex items-center justify-center gap-1"
                      >
                        <Download className="h-4 w-4" />
                        Exportar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* LISTA DE BACKUPS */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-[#2D343A] flex items-center gap-2">
                    <Clock className="h-5 w-5 text-[#8B0000]" />
                    Histórico de Backups
                  </h2>
                  <span className="text-sm text-[#708090]">{backups.length} backups</span>
                </div>

                {backups.length === 0 ? (
                  <div className="text-center py-12 text-[#708090]">
                    <Database className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Nenhum backup realizado ainda.</p>
                    <p className="text-sm">Clique em "Backup Manual" para criar o primeiro.</p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                    {backups.map((backup) => (
                      <div
                        key={backup.id}
                        className="flex items-center justify-between p-4 border border-[#E8EAE0] rounded-lg hover:bg-[#F8F4E6] transition"
                      >
                        <div className="flex items-center gap-4">
                          <div className="p-2 bg-[#8B0000]/10 rounded-lg">
                            {backup.tipo === 'automatico' ? (
                              <Clock className="h-5 w-5 text-[#8B0000]" />
                            ) : backup.tipo === 'completo' ? (
                              <Database className="h-5 w-5 text-[#8B0000]" />
                            ) : backup.tipo === 'parcial' ? (
                              <FileJson className="h-5 w-5 text-[#8B0000]" />
                            ) : (
                              <FileText className="h-5 w-5 text-[#8B0000]" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-[#2D343A]">{backup.nome}</p>
                            <div className="flex flex-wrap items-center gap-2 text-xs text-[#708090]">
                              <span>{backup.data}</span>
                              <span>•</span>
                              <span>{backup.tamanho}</span>
                              <span>•</span>
                              <span>{backup.registros} registros</span>
                              <span>•</span>
                              <span className={`px-1.5 py-0.5 rounded-full text-xs ${
                                backup.tipo === 'automatico' ? 'bg-blue-100 text-blue-700' :
                                backup.tipo === 'completo' ? 'bg-green-100 text-green-700' :
                                backup.tipo === 'parcial' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-gray-100 text-gray-700'
                              }`}>
                                {backup.tipo}
                              </span>
                              {backup.status === 'concluido' && (
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
                            onClick={() => exportarBackup(backup)}
                            className="p-1.5 hover:bg-[#E8EAE0] rounded-lg transition"
                            title="Baixar"
                          >
                            <Download className="h-4 w-4 text-[#708090]" />
                          </button>
                          <button
                            onClick={() => restaurarBackup(backup)}
                            disabled={restaurando}
                            className="p-1.5 hover:bg-green-50 rounded-lg transition disabled:opacity-50"
                            title="Restaurar"
                          >
                            <RotateCcw className="h-4 w-4 text-green-600" />
                          </button>
                          <button
                            onClick={() => excluirBackup(backup.id)}
                            className="p-1.5 hover:bg-red-50 rounded-lg transition"
                            title="Excluir"
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* MENSAGEM DE SEGURANÇA */}
          <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-xl text-sm text-yellow-800 flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Dica de Segurança:</p>
              <p>Os backups são armazenados localmente no seu navegador. Recomendamos exportar e salvar uma cópia externa periodicamente. O backup automático diário ajuda a prevenir perda de dados.</p>
            </div>
          </div>
        </div>

        <DashboardFooter />
      </div>
    </div>
  )
}
