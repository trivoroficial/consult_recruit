'use client'

import { SidebarCandidato } from '@/components/layout/SidebarCandidato'
import { Settings, User, Bell, Shield, Save, Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'

export default function ConfiguracoesCandidato() {
  const [config, setConfig] = useState({
    notificacoes: true,
    emailPromocoes: false,
    perfilPublico: true,
    mostrarEmail: true,
    mostrarTelefone: false,
  })

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarCandidato />
      <div className="flex-1 ml-64 p-8">
        <div className="flex items-center gap-3 mb-8">
          <Settings className="h-8 w-8 text-purple-600" />
          <h1 className="text-3xl font-bold">
            <span className="text-purple-600">Configurações</span>
          </h1>
        </div>

        <div className="space-y-6">
          {/* Preferências */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Bell className="h-5 w-5 text-purple-600" /> Preferências
            </h2>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                  checked={config.notificacoes}
                  onChange={(e) => setConfig({...config, notificacoes: e.target.checked})}
                />
                <span className="text-sm text-gray-700">Receber notificações por email</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                  checked={config.emailPromocoes}
                  onChange={(e) => setConfig({...config, emailPromocoes: e.target.checked})}
                />
                <span className="text-sm text-gray-700">Receber ofertas e promoções</span>
              </label>
            </div>
          </div>

          {/* Privacidade */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5 text-purple-600" /> Privacidade
            </h2>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                  checked={config.perfilPublico}
                  onChange={(e) => setConfig({...config, perfilPublico: e.target.checked})}
                />
                <span className="text-sm text-gray-700">Perfil público (visível para empresas)</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                  checked={config.mostrarEmail}
                  onChange={(e) => setConfig({...config, mostrarEmail: e.target.checked})}
                />
                <span className="text-sm text-gray-700">Mostrar email no perfil</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                  checked={config.mostrarTelefone}
                  onChange={(e) => setConfig({...config, mostrarTelefone: e.target.checked})}
                />
                <span className="text-sm text-gray-700">Mostrar telefone no perfil</span>
              </label>
            </div>
          </div>

          <button className="w-full btn-primary justify-center py-3 text-base">
            <Save className="h-5 w-5" />
            Salvar Configurações
          </button>
        </div>
      </div>
    </div>
  )
}
