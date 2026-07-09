'use client'

import { SidebarAdmin } from '@/components/layout/SidebarAdmin'
import { Settings, Globe, Mail, Shield, Palette, Database, Save, User, Lock } from 'lucide-react'
import { useState } from 'react'

export default function AdminConfiguracoes() {
  const [config, setConfig] = useState({
    nomeSite: 'TRIVOR',
    emailContato: 'contato@trivor.com.br',
    telefone: '(34) 99117-7058',
    corPrimaria: '#7C3AED',
    manutencao: false,
    registro: true,
    autoAprovacao: false,
  })

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarAdmin />
      <div className="flex-1 ml-64 p-8">
        <div className="flex items-center gap-3 mb-8">
          <Settings className="h-8 w-8 text-purple-600" />
          <h1 className="text-3xl font-bold">
            <span className="text-purple-600">Configurações</span>
          </h1>
        </div>

        <div className="space-y-6">
          {/* Geral */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Globe className="h-5 w-5 text-purple-600" /> Geral
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nome do Site</label>
                <input
                  type="text"
                  className="input-default"
                  value={config.nomeSite}
                  onChange={(e) => setConfig({...config, nomeSite: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Cor Primária</label>
                <div className="flex gap-2 mt-1">
                  <input
                    type="color"
                    className="w-12 h-12 rounded-lg border cursor-pointer"
                    value={config.corPrimaria}
                    onChange={(e) => setConfig({...config, corPrimaria: e.target.value})}
                  />
                  <input
                    type="text"
                    className="flex-1 input-default"
                    value={config.corPrimaria}
                    onChange={(e) => setConfig({...config, corPrimaria: e.target.value})}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Contato */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Mail className="h-5 w-5 text-purple-600" /> Contato
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Email de Contato</label>
                <input
                  type="email"
                  className="input-default"
                  value={config.emailContato}
                  onChange={(e) => setConfig({...config, emailContato: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Telefone</label>
                <input
                  type="text"
                  className="input-default"
                  value={config.telefone}
                  onChange={(e) => setConfig({...config, telefone: e.target.value})}
                />
              </div>
            </div>
          </div>

          {/* Segurança */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5 text-purple-600" /> Segurança
            </h2>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                  checked={config.registro}
                  onChange={(e) => setConfig({...config, registro: e.target.checked})}
                />
                <span className="text-sm text-gray-700">Permitir novos cadastros</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                  checked={config.autoAprovacao}
                  onChange={(e) => setConfig({...config, autoAprovacao: e.target.checked})}
                />
                <span className="text-sm text-gray-700">Aprovação automática de empresas</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                  checked={config.manutencao}
                  onChange={(e) => setConfig({...config, manutencao: e.target.checked})}
                />
                <span className="text-sm text-gray-700">Modo manutenção</span>
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
