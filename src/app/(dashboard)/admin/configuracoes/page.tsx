'use client'

import { useState } from 'react'
import { Settings, Globe, Mail, Shield, Palette, Database, Save } from 'lucide-react'

export default function AdminConfiguracoes() {
  const [config, setConfig] = useState({
    nomeSite: 'TRIVOR',
    emailContato: 'contato@trivor.com.br',
    telefone: '(34) 99999-9999',
    corPrimaria: '#7C3AED',
    manutencao: false,
    registro: true
  })

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
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
                  className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
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
                    className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
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
                  className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                  value={config.emailContato}
                  onChange={(e) => setConfig({...config, emailContato: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Telefone</label>
                <input
                  type="text"
                  className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
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
                  checked={config.manutencao}
                  onChange={(e) => setConfig({...config, manutencao: e.target.checked})}
                />
                <span className="text-sm text-gray-700">Modo manutenção</span>
              </label>
            </div>
          </div>

          <button className="w-full py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition flex items-center justify-center gap-2">
            <Save className="h-5 w-5" />
            Salvar Configurações
          </button>
        </div>
      </div>
    </div>
  )
}
