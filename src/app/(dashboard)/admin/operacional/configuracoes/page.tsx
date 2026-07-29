'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { SidebarAdmin } from '@/components/dashboard/SidebarAdmin'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import {
  Settings, Save, RefreshCw, CheckCircle, XCircle,
  Clock, Shield, Bell, User, Mail, Phone,
  Globe, Database, HardDrive, Activity,
  AlertTriangle, Zap, Award, Users
} from 'lucide-react'
import { supabase } from '@/lib/supabase/client'

export default function ConfiguracoesOperacionais() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [config, setConfig] = useState({
    notificacoes: true,
    backup_automatico: true,
    horario_backup: '03:00',
    dias_retencao: '30',
    max_participantes: '1000',
    entrevistas_por_dia: '20',
    modo_manutencao: false,
    logs_ativo: true
  })

  useEffect(() => {
    carregarConfiguracoes()
  }, [])

  const carregarConfiguracoes = async () => {
    setLoading(true)
    setError(null)
    try {
      const { data, error } = await supabase
        .from('configuracoes')
        .select('*')
        .eq('chave', 'operacional')
        .single()

      if (error && error.code !== 'PGRST116') throw error

      if (data) {
        setConfig({
          ...config,
          ...data.valor
        })
      }
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar configurações')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)

    try {
      const { error } = await supabase
        .from('configuracoes')
        .upsert({
          chave: 'operacional',
          valor: config,
          descricao: 'Configurações do módulo operacional'
        })

      if (error) throw error

      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err: any) {
      setError(err.message || 'Erro ao salvar configurações')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
        <SidebarAdmin />
        <div className="flex-1 ml-64 flex items-center justify-center">
          <div className="text-center">
            <Settings className="h-12 w-12 text-[#6B1A2A] animate-pulse mx-auto mb-4" />
            <p className="text-[#708090]">Carregando configurações...</p>
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
              <Settings className="h-6 w-6 text-[#6B1A2A]" />
              Configurações Operacionais
            </h1>
            <p className="text-sm text-[#708090]">Gerencie as configurações do módulo operacional</p>
          </div>
        </header>

        <div className="flex-1 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Configurações salvas com sucesso!
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* BACKUP */}
              <div className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-6">
                <h3 className="font-semibold text-[#2D343A] mb-4 flex items-center gap-2">
                  <Database className="h-5 w-5 text-[#6B1A2A]" />
                  Backup
                </h3>
                <div className="space-y-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={config.backup_automatico}
                      onChange={(e) => setConfig({...config, backup_automatico: e.target.checked})}
                      className="rounded border-[#E8EAE0] text-[#6B1A2A]"
                    />
                    <span className="text-sm text-[#2D343A]">Backup Automático</span>
                  </label>
                  <div>
                    <label className="block text-sm font-medium text-[#2D343A] mb-1.5">Horário do Backup</label>
                    <input
                      type="time"
                      className="w-full px-4 py-2 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A]"
                      value={config.horario_backup}
                      onChange={(e) => setConfig({...config, horario_backup: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              {/* LIMITES */}
              <div className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-6">
                <h3 className="font-semibold text-[#2D343A] mb-4 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-[#6B1A2A]" />
                  Limites
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                      Máximo de Participantes
                    </label>
                    <input
                      type="number"
                      className="w-full px-4 py-2 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A]"
                      value={config.max_participantes}
                      onChange={(e) => setConfig({...config, max_participantes: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                      Entrevistas por Dia
                    </label>
                    <input
                      type="number"
                      className="w-full px-4 py-2 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A]"
                      value={config.entrevistas_por_dia}
                      onChange={(e) => setConfig({...config, entrevistas_por_dia: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              {/* SISTEMA */}
              <div className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-6">
                <h3 className="font-semibold text-[#2D343A] mb-4 flex items-center gap-2">
                  <Activity className="h-5 w-5 text-[#6B1A2A]" />
                  Sistema
                </h3>
                <div className="space-y-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={config.modo_manutencao}
                      onChange={(e) => setConfig({...config, modo_manutencao: e.target.checked})}
                      className="rounded border-[#E8EAE0] text-[#6B1A2A]"
                    />
                    <span className="text-sm text-[#2D343A]">Modo de Manutenção</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={config.logs_ativo}
                      onChange={(e) => setConfig({...config, logs_ativo: e.target.checked})}
                      className="rounded border-[#E8EAE0] text-[#6B1A2A]"
                    />
                    <span className="text-sm text-[#2D343A]">Logs Ativos</span>
                  </label>
                  <div>
                    <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                      Dias de Retenção
                    </label>
                    <input
                      type="number"
                      className="w-full px-4 py-2 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A]"
                      value={config.dias_retencao}
                      onChange={(e) => setConfig({...config, dias_retencao: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              {/* NOTIFICAÇÕES */}
              <div className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-6">
                <h3 className="font-semibold text-[#2D343A] mb-4 flex items-center gap-2">
                  <Bell className="h-5 w-5 text-[#6B1A2A]" />
                  Notificações
                </h3>
                <div className="space-y-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={config.notificacoes}
                      onChange={(e) => setConfig({...config, notificacoes: e.target.checked})}
                      className="rounded border-[#E8EAE0] text-[#6B1A2A]"
                    />
                    <span className="text-sm text-[#2D343A]">Ativar Notificações</span>
                  </label>
                  <div className="bg-[#F8F4E6] rounded-lg p-3 text-sm text-[#708090]">
                    <p>🔔 Você receberá notificações sobre:</p>
                    <ul className="list-disc pl-4 mt-1 space-y-0.5">
                      <li>Novos participantes cadastrados</li>
                      <li>Entrevistas agendadas</li>
                      <li>Resultados registrados</li>
                      <li>Backups realizados</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                type="submit"
                disabled={saving}
                className="px-8 py-3 bg-[#6B1A2A] text-white rounded-lg hover:bg-[#4A0E1A] transition font-medium flex items-center gap-2 disabled:opacity-50"
              >
                <Save className="h-5 w-5" />
                {saving ? 'Salvando...' : 'Salvar Configurações'}
              </button>
              <button
                type="button"
                onClick={carregarConfiguracoes}
                className="px-8 py-3 border border-[#E8EAE0] rounded-lg hover:bg-[#F8F4E6] transition text-[#708090] flex items-center gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Descartar
              </button>
            </div>
          </form>
        </div>

        <DashboardFooter />
      </div>
    </div>
  )
}
