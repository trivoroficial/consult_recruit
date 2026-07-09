'use client'

import { SidebarAdmin } from '@/components/layout/SidebarAdmin'
import { Shield, Lock, Key, UserCheck, AlertTriangle, Save, RefreshCw } from 'lucide-react'
import { useState } from 'react'

export default function AdminSeguranca() {
  const [config, setConfig] = useState({
    doisFatores: true,
    bloqueioTentativas: 5,
    sessaoExpiracao: 60,
    logsRetencao: 90,
    notificarLogin: true,
  })

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarAdmin />
      <div className="flex-1 ml-64 p-8">
        <div className="flex items-center gap-3 mb-8">
          <Shield className="h-8 w-8 text-purple-600" />
          <h1 className="text-3xl font-bold">
            <span className="text-purple-600">Segurança</span>
          </h1>
        </div>

        <div className="space-y-6">
          {/* Autenticação */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Lock className="h-5 w-5 text-purple-600" /> Autenticação
            </h2>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                  checked={config.doisFatores}
                  onChange={(e) => setConfig({...config, doisFatores: e.target.checked})}
                />
                <span className="text-sm text-gray-700">Exigir autenticação de dois fatores (2FA)</span>
              </label>
              <div>
                <label className="block text-sm font-medium text-gray-700">Tentativas de login antes do bloqueio</label>
                <input
                  type="number"
                  className="input-default w-24"
                  value={config.bloqueioTentativas}
                  onChange={(e) => setConfig({...config, bloqueioTentativas: parseInt(e.target.value)})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Tempo de expiração da sessão (minutos)</label>
                <input
                  type="number"
                  className="input-default w-24"
                  value={config.sessaoExpiracao}
                  onChange={(e) => setConfig({...config, sessaoExpiracao: parseInt(e.target.value)})}
                />
              </div>
            </div>
          </div>

          {/* Logs e Auditoria */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Key className="h-5 w-5 text-purple-600" /> Logs e Auditoria
            </h2>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                  checked={config.notificarLogin}
                  onChange={(e) => setConfig({...config, notificarLogin: e.target.checked})}
                />
                <span className="text-sm text-gray-700">Notificar sobre novos logins</span>
              </label>
              <div>
                <label className="block text-sm font-medium text-gray-700">Retenção de logs (dias)</label>
                <input
                  type="number"
                  className="input-default w-24"
                  value={config.logsRetencao}
                  onChange={(e) => setConfig({...config, logsRetencao: parseInt(e.target.value)})}
                />
              </div>
              <button className="btn-outline btn-sm flex items-center gap-2">
                <RefreshCw className="h-4 w-4" />
                Limpar Cache
              </button>
            </div>
          </div>

          {/* Aviso */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-yellow-800">⚠️ Atenção</h4>
              <p className="text-sm text-yellow-700">
                Alterações nas configurações de segurança afetam toda a plataforma. 
                Recomendamos revisar com cuidado antes de salvar.
              </p>
            </div>
          </div>

          <button className="w-full btn-primary justify-center py-3 text-base">
            <Save className="h-5 w-5" />
            Salvar Configurações de Segurança
          </button>
        </div>
      </div>
    </div>
  )
}
