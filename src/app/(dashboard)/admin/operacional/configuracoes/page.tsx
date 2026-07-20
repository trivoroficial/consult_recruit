'use client'

import { useState } from 'react'
import { SidebarAdmin } from '@/components/dashboard/SidebarAdmin'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import { 
  Settings, Save, Globe, Shield, Bell, FileText,
  Users, Briefcase, Calendar, Database, RefreshCw,
  CheckCircle, Eye, EyeOff
} from 'lucide-react'

export default function OperacionalConfiguracoes() {
  const [config, setConfig] = useState({
    notificacoes: true,
    emailCandidato: true,
    confirmacao: false,
    duplicarCPF: true,
    importarExcel: true,
    exportarPDF: true,
    darkMode: false,
    cache: true
  })

  return (
    <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
      <SidebarAdmin />
      
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <header className="bg-white border-b border-[#E8EAE0] px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#2D343A]">Configurações</h1>
            <p className="text-sm text-[#708090]">Configure o módulo operacional</p>
          </div>
          <button className="px-4 py-2 bg-[#8B0000] text-white rounded-lg hover:bg-[#700000] transition font-medium flex items-center gap-2">
            <Save className="h-4 w-4" />
            Salvar Configurações
          </button>
        </header>

        <div className="flex-1 p-8">
          <div className="space-y-6">
            {/* GERAL */}
            <div className="bg-white rounded-xl shadow-sm border border-[#E8EAE0] p-6">
              <h2 className="text-lg font-semibold text-[#2D343A] mb-4 flex items-center gap-2">
                <Globe className="h-5 w-5 text-[#8B0000]" />
                Geral
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                    Nome do Módulo
                  </label>
                  <input type="text" className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg" value="Operacional" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                    Descrição
                  </label>
                  <input type="text" className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg" value="Processos seletivos presenciais" />
                </div>
              </div>
            </div>

            {/* NOTIFICAÇÕES */}
            <div className="bg-white rounded-xl shadow-sm border border-[#E8EAE0] p-6">
              <h2 className="text-lg font-semibold text-[#2D343A] mb-4 flex items-center gap-2">
                <Bell className="h-5 w-5 text-[#8B0000]" />
                Notificações
              </h2>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="rounded border-[#E8EAE0] text-[#8B0000] focus:ring-[#8B0000]" checked={config.notificacoes} onChange={(e) => setConfig({...config, notificacoes: e.target.checked})} />
                  <span className="text-sm text-[#2D343A]">Receber notificações de novos participantes</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="rounded border-[#E8EAE0] text-[#8B0000] focus:ring-[#8B0000]" checked={config.emailCandidato} onChange={(e) => setConfig({...config, emailCandidato: e.target.checked})} />
                  <span className="text-sm text-[#2D343A]">Enviar notificações por email</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="rounded border-[#E8EAE0] text-[#8B0000] focus:ring-[#8B0000]" checked={config.confirmacao} onChange={(e) => setConfig({...config, confirmacao: e.target.checked})} />
                  <span className="text-sm text-[#2D343A]">Confirmar ações importantes</span>
                </label>
              </div>
            </div>

            {/* SEGURANÇA */}
            <div className="bg-white rounded-xl shadow-sm border border-[#E8EAE0] p-6">
              <h2 className="text-lg font-semibold text-[#2D343A] mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5 text-[#8B0000]" />
                Segurança
              </h2>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="rounded border-[#E8EAE0] text-[#8B0000] focus:ring-[#8B0000]" checked={config.duplicarCPF} onChange={(e) => setConfig({...config, duplicarCPF: e.target.checked})} />
                  <span className="text-sm text-[#2D343A]">Bloquear CPF duplicado</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="rounded border-[#E8EAE0] text-[#8B0000] focus:ring-[#8B0000]" checked={config.importarExcel} onChange={(e) => setConfig({...config, importarExcel: e.target.checked})} />
                  <span className="text-sm text-[#2D343A]">Permitir importação de Excel</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="rounded border-[#E8EAE0] text-[#8B0000] focus:ring-[#8B0000]" checked={config.exportarPDF} onChange={(e) => setConfig({...config, exportarPDF: e.target.checked})} />
                  <span className="text-sm text-[#2D343A]">Permitir exportação de PDF</span>
                </label>
              </div>
            </div>

            {/* AVANÇADO */}
            <div className="bg-white rounded-xl shadow-sm border border-[#E8EAE0] p-6">
              <h2 className="text-lg font-semibold text-[#2D343A] mb-4 flex items-center gap-2">
                <Database className="h-5 w-5 text-[#8B0000]" />
                Avançado
              </h2>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="rounded border-[#E8EAE0] text-[#8B0000] focus:ring-[#8B0000]" checked={config.cache} onChange={(e) => setConfig({...config, cache: e.target.checked})} />
                  <span className="text-sm text-[#2D343A]">Ativar cache de dados</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="rounded border-[#E8EAE0] text-[#8B0000] focus:ring-[#8B0000]" checked={config.darkMode} onChange={(e) => setConfig({...config, darkMode: e.target.checked})} />
                  <span className="text-sm text-[#2D343A]">Modo escuro</span>
                </label>
              </div>
            </div>

            {/* BOTÃO SALVAR */}
            <button className="w-full py-4 bg-[#8B0000] text-white rounded-lg hover:bg-[#700000] transition font-semibold flex items-center justify-center gap-2 text-lg">
              <Save className="h-5 w-5" />
              Salvar Configurações
            </button>
          </div>
        </div>

        <DashboardFooter />
      </div>
    </div>
  )
}
