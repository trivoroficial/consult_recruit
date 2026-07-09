'use client'

import { useState } from 'react'
import { User, Mail, Phone, MapPin, Briefcase } from 'lucide-react'

export default function PerfilCandidato() {
  const [perfil, setPerfil] = useState({
    nome: 'João Silva',
    email: 'joao@email.com',
    telefone: '(34) 99999-9999',
    cidade: 'Uberlândia',
    estado: 'MG',
    cargo: 'Analista Administrativo',
    resumo: 'Profissional com experiência em rotinas administrativas...'
  })

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">
          Meu <span className="text-purple-600">Perfil</span>
        </h1>

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
              <div>
                <p className="text-xs text-gray-500">Nome</p>
                <p className="font-medium">{perfil.nome}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Mail className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-xs text-gray-500">Email</p>
                <p className="font-medium">{perfil.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Phone className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-xs text-gray-500">Telefone</p>
                <p className="font-medium">{perfil.telefone}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <MapPin className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-xs text-gray-500">Localização</p>
                <p className="font-medium">{perfil.cidade}/{perfil.estado}</p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold mb-2">Resumo Profissional</h3>
            <p className="text-gray-600 text-sm">{perfil.resumo}</p>
          </div>

          <button className="mt-6 w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
            Editar Perfil
          </button>
        </div>
      </div>
    </div>
  )
}
