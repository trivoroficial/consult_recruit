'use client'

import { SidebarEmpresa } from '@/components/layout/SidebarEmpresa'
import { Building2, Mail, Phone, MapPin, User, Save, Globe } from 'lucide-react'
import { useState } from 'react'

export default function ConfiguracoesEmpresa() {
  const [config, setConfig] = useState({
    nome: 'Empresa XPTO',
    email: 'contato@empresaxpto.com',
    telefone: '(34) 99117-7058',
    cidade: 'Uberlândia',
    estado: 'MG',
    site: 'www.empresaxpto.com.br',
    segmento: 'Tecnologia',
    porte: 'Médio'
  })

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarEmpresa />
      <div className="flex-1 ml-64 p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">
            <span className="text-purple-600">Configurações</span> da Empresa
          </h1>
          <button className="btn-primary btn-sm flex items-center gap-2">
            <Save className="h-4 w-4" />
            Salvar
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nome da Empresa</label>
              <input
                type="text"
                className="input-default"
                value={config.nome}
                onChange={(e) => setConfig({...config, nome: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Segmento</label>
              <input
                type="text"
                className="input-default"
                value={config.segmento}
                onChange={(e) => setConfig({...config, segmento: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                className="input-default"
                value={config.email}
                onChange={(e) => setConfig({...config, email: e.target.value})}
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

            <div>
              <label className="block text-sm font-medium text-gray-700">Cidade</label>
              <input
                type="text"
                className="input-default"
                value={config.cidade}
                onChange={(e) => setConfig({...config, cidade: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Estado</label>
              <input
                type="text"
                className="input-default"
                value={config.estado}
                onChange={(e) => setConfig({...config, estado: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Site</label>
              <input
                type="text"
                className="input-default"
                value={config.site}
                onChange={(e) => setConfig({...config, site: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Porte</label>
              <select
                className="input-default"
                value={config.porte}
                onChange={(e) => setConfig({...config, porte: e.target.value})}
              >
                <option>Pequeno</option>
                <option>Médio</option>
                <option>Grande</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
