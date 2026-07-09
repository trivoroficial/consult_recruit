'use client'

import { SidebarCandidato } from '@/components/layout/SidebarCandidato'
import { User, Mail, Phone, MapPin, Briefcase, Edit, Save } from 'lucide-react'
import { useState } from 'react'

export default function PerfilCandidato() {
  const [editando, setEditando] = useState(false)
  const [perfil, setPerfil] = useState({
    nome: 'João Silva',
    email: 'joao.silva@email.com',
    telefone: '(34) 99117-7058',
    cidade: 'Uberlândia',
    estado: 'MG',
    cargo: 'Analista Administrativo',
    resumo: 'Profissional com 5 anos de experiência em rotinas administrativas, gestão documental e atendimento ao cliente.'
  })

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarCandidato />
      <div className="flex-1 ml-64 p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">
            Meu <span className="text-purple-600">Perfil</span>
          </h1>
          <button
            onClick={() => setEditando(!editando)}
            className="btn-primary btn-sm flex items-center gap-2"
          >
            {editando ? <Save className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
            {editando ? 'Salvar' : 'Editar'}
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center gap-6 mb-6">
            <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center text-3xl text-purple-600">
              👤
            </div>
            <div>
              <h2 className="text-xl font-semibold">{perfil.nome}</h2>
              <p className="text-gray-500">{perfil.cargo}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <User className="h-5 w-5 text-purple-600" />
              <div className="flex-1">
                <p className="text-xs text-gray-500">Nome</p>
                {editando ? (
                  <input
                    type="text"
                    className="w-full border rounded px-2 py-1 text-sm"
                    value={perfil.nome}
                    onChange={(e) => setPerfil({...perfil, nome: e.target.value})}
                  />
                ) : (
                  <p className="font-medium">{perfil.nome}</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Mail className="h-5 w-5 text-purple-600" />
              <div className="flex-1">
                <p className="text-xs text-gray-500">Email</p>
                {editando ? (
                  <input
                    type="email"
                    className="w-full border rounded px-2 py-1 text-sm"
                    value={perfil.email}
                    onChange={(e) => setPerfil({...perfil, email: e.target.value})}
                  />
                ) : (
                  <p className="font-medium">{perfil.email}</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Phone className="h-5 w-5 text-purple-600" />
              <div className="flex-1">
                <p className="text-xs text-gray-500">Telefone</p>
                {editando ? (
                  <input
                    type="text"
                    className="w-full border rounded px-2 py-1 text-sm"
                    value={perfil.telefone}
                    onChange={(e) => setPerfil({...perfil, telefone: e.target.value})}
                  />
                ) : (
                  <p className="font-medium">{perfil.telefone}</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <MapPin className="h-5 w-5 text-purple-600" />
              <div className="flex-1">
                <p className="text-xs text-gray-500">Localização</p>
                {editando ? (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      className="flex-1 border rounded px-2 py-1 text-sm"
                      value={perfil.cidade}
                      onChange={(e) => setPerfil({...perfil, cidade: e.target.value})}
                      placeholder="Cidade"
                    />
                    <input
                      type="text"
                      className="w-12 border rounded px-2 py-1 text-sm"
                      value={perfil.estado}
                      onChange={(e) => setPerfil({...perfil, estado: e.target.value})}
                      placeholder="UF"
                    />
                  </div>
                ) : (
                  <p className="font-medium">{perfil.cidade}/{perfil.estado}</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg col-span-2">
              <Briefcase className="h-5 w-5 text-purple-600" />
              <div className="flex-1">
                <p className="text-xs text-gray-500">Cargo desejado</p>
                {editando ? (
                  <input
                    type="text"
                    className="w-full border rounded px-2 py-1 text-sm"
                    value={perfil.cargo}
                    onChange={(e) => setPerfil({...perfil, cargo: e.target.value})}
                  />
                ) : (
                  <p className="font-medium">{perfil.cargo}</p>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold mb-2">Resumo Profissional</h3>
            {editando ? (
              <textarea
                className="w-full border rounded p-3 text-sm min-h-[100px]"
                value={perfil.resumo}
                onChange={(e) => setPerfil({...perfil, resumo: e.target.value})}
              />
            ) : (
              <p className="text-gray-600 text-sm">{perfil.resumo}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
