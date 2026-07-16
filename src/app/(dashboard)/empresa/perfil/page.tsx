'use client'

import { useState } from 'react'
import { Save, Building2, User, Mail, Phone, MapPin, Globe } from 'lucide-react'

export default function EmpresaPerfil() {
  const [form, setForm] = useState({
    nome: 'XPTO Tecnologia',
    cnpj: '12.345.678/0001-99',
    email: 'contato@xpto.com',
    telefone: '(34) 99999-9999',
    endereco: 'Rua Exemplo, 123 - Centro',
    cidade: 'Uberlândia',
    estado: 'MG',
    site: 'www.xpto.com.br',
    descricao: 'Empresa de tecnologia especializada em soluções digitais.'
  })

  return (
    <div className="min-h-screen bg-gray-50/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* ===== HEADER ===== */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Perfil da Empresa</h1>
          <p className="text-sm text-gray-500 mt-1">Gerencie as informações da sua empresa</p>
        </div>

        {/* ===== FORMULÁRIO ===== */}
        <div className="bg-white rounded-2xl border border-gray-100/80 p-6 shadow-sm">
          <div className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome da Empresa</label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 pl-10 border border-gray-200 rounded-xl focus:border-[#8B0000] focus:ring-2 focus:ring-[#8B0000]/20 outline-none transition"
                    value={form.nome}
                    onChange={(e) => setForm({...form, nome: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">CNPJ</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 pl-10 border border-gray-200 rounded-xl focus:border-[#8B0000] focus:ring-2 focus:ring-[#8B0000]/20 outline-none transition"
                    value={form.cnpj}
                    onChange={(e) => setForm({...form, cnpj: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    type="email"
                    className="w-full px-4 py-2.5 pl-10 border border-gray-200 rounded-xl focus:border-[#8B0000] focus:ring-2 focus:ring-[#8B0000]/20 outline-none transition"
                    value={form.email}
                    onChange={(e) => setForm({...form, email: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    type="tel"
                    className="w-full px-4 py-2.5 pl-10 border border-gray-200 rounded-xl focus:border-[#8B0000] focus:ring-2 focus:ring-[#8B0000]/20 outline-none transition"
                    value={form.telefone}
                    onChange={(e) => setForm({...form, telefone: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Endereço</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  className="w-full px-4 py-2.5 pl-10 border border-gray-200 rounded-xl focus:border-[#8B0000] focus:ring-2 focus:ring-[#8B0000]/20 outline-none transition"
                  value={form.endereco}
                  onChange={(e) => setForm({...form, endereco: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cidade</label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:border-[#8B0000] focus:ring-2 focus:ring-[#8B0000]/20 outline-none transition"
                  value={form.cidade}
                  onChange={(e) => setForm({...form, cidade: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:border-[#8B0000] focus:ring-2 focus:ring-[#8B0000]/20 outline-none transition"
                  value={form.estado}
                  onChange={(e) => setForm({...form, estado: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Site</label>
              <div className="relative">
                <Globe className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  className="w-full px-4 py-2.5 pl-10 border border-gray-200 rounded-xl focus:border-[#8B0000] focus:ring-2 focus:ring-[#8B0000]/20 outline-none transition"
                  value={form.site}
                  onChange={(e) => setForm({...form, site: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
              <textarea
                rows={4}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:border-[#8B0000] focus:ring-2 focus:ring-[#8B0000]/20 outline-none transition resize-none"
                value={form.descricao}
                onChange={(e) => setForm({...form, descricao: e.target.value})}
              />
            </div>

            <div className="flex justify-end pt-4 border-t border-gray-100">
              <button className="px-6 py-2.5 text-sm font-semibold text-white bg-[#8B0000] rounded-xl hover:bg-[#700000] transition shadow-md shadow-[#8B0000]/20 flex items-center gap-2">
                <Save className="h-4 w-4" />
                Salvar Alterações
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}
