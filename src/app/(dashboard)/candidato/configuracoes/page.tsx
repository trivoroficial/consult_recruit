'use client'

import { useState } from 'react'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import { Settings, Bell, Lock, Moon, Globe, Save, Shield, User, Mail } from 'lucide-react'

export default function CandidatoConfiguracoes() {
  const [config, setConfig] = useState({
    notificacoes: true,
    darkMode: false,
    idioma: 'pt-BR',
    emailPromocional: false,
    notificacoesEmail: true
  })

  return (
    <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
      <div className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#2D343A] flex items-center gap-2">
            <Settings className="h-6 w-6 text-[#6B1A2A]" />
            Configurações
          </h1>
          <p className="text-sm text-[#708090]">Gerencie suas preferências</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-6 max-w-2xl">
          <div className="space-y-6">
            {/* Notificações */}
            <div className="flex items-center justify-between p-4 bg-[#F8F4E6] rounded-lg">
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-[#6B1A2A]" />
                <div>
                  <p className="font-medium text-[#2D343A]">Notificações</p>
                  <p className="text-sm text-[#708090]">Receber alertas sobre vagas e entrevistas</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.notificacoes}
                  onChange={(e) => setConfig({...config, notificacoes: e.target.checked})}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-[#E8EAE0] peer-focus:ring-2 peer-focus:ring-[#6B1A2A] rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#6B1A2A]"></div>
              </label>
            </div>

            {/* Notificações por Email */}
            <div className="flex items-center justify-between p-4 bg-[#F8F4E6] rounded-lg">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-[#6B1A2A]" />
                <div>
                  <p className="font-medium text-[#2D343A]">Notificações por Email</p>
                  <p className="text-sm text-[#708090]">Receber atualizações por email</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.notificacoesEmail}
                  onChange={(e) => setConfig({...config, notificacoesEmail: e.target.checked})}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-[#E8EAE0] peer-focus:ring-2 peer-focus:ring-[#6B1A2A] rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#6B1A2A]"></div>
              </label>
            </div>

            {/* Modo Escuro */}
            <div className="flex items-center justify-between p-4 bg-[#F8F4E6] rounded-lg">
              <div className="flex items-center gap-3">
                <Moon className="h-5 w-5 text-[#6B1A2A]" />
                <div>
                  <p className="font-medium text-[#2D343A]">Modo Escuro</p>
                  <p className="text-sm text-[#708090]">Alterar tema do sistema</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.darkMode}
                  onChange={(e) => setConfig({...config, darkMode: e.target.checked})}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-[#E8EAE0] peer-focus:ring-2 peer-focus:ring-[#6B1A2A] rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#6B1A2A]"></div>
              </label>
            </div>

            {/* Idioma */}
            <div className="flex items-center justify-between p-4 bg-[#F8F4E6] rounded-lg">
              <div className="flex items-center gap-3">
                <Globe className="h-5 w-5 text-[#6B1A2A]" />
                <div>
                  <p className="font-medium text-[#2D343A]">Idioma</p>
                  <p className="text-sm text-[#708090]">Selecione o idioma do sistema</p>
                </div>
              </div>
              <select
                className="px-4 py-2 border border-[#E8EAE0] rounded-lg focus:ring-2 focus:ring-[#6B1A2A] focus:outline-none"
                value={config.idioma}
                onChange={(e) => setConfig({...config, idioma: e.target.value})}
              >
                <option value="pt-BR">Português (BR)</option>
                <option value="en-US">English (US)</option>
                <option value="es-ES">Español</option>
              </select>
            </div>

            <button className="w-full py-3 bg-[#6B1A2A] text-white rounded-lg hover:bg-[#4A0E1A] transition font-medium flex items-center justify-center gap-2">
              <Save className="h-5 w-5" />
              Salvar Configurações
            </button>
          </div>
        </div>
      </div>
      <DashboardFooter />
    </div>
  )
}
