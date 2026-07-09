'use client'

import { useState } from 'react'
import { Plus, Edit, Trash2, Eye, MapPin, DollarSign, Briefcase } from 'lucide-react'

const vagas = [
  {
    id: 1,
    titulo: 'Analista Administrativo',
    local: 'Uberlândia - MG',
    salario: 'R$ 3.500',
    tipo: 'Presencial',
    status: 'Aberta',
    candidatos: 12
  },
  {
    id: 2,
    titulo: 'Auxiliar de RH',
    local: 'Uberlândia - MG',
    salario: 'R$ 2.800',
    tipo: 'Híbrido',
    status: 'Em análise',
    candidatos: 8
  }
]

export default function VagasEmpresa() {
  const [mostrarForm, setMostrarForm] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">
            Minhas <span className="text-purple-600">Vagas</span>
          </h1>
          <button
            onClick={() => setMostrarForm(!mostrarForm)}
            className="flex items-center gap-2 py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          >
            <Plus className="h-5 w-5" />
            Nova Vaga
          </button>
        </div>

        {/* Formulário de nova vaga */}
        {mostrarForm && (
          <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">Nova Vaga</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Título da vaga</label>
                <input type="text" className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none" placeholder="Ex: Analista Administrativo" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Local</label>
                <input type="text" className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none" placeholder="Uberlândia - MG" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Salário</label>
                <input type="text" className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none" placeholder="R$ 3.500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Tipo</label>
                <select className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none">
                  <option>Presencial</option>
                  <option>Híbrido</option>
                  <option>Remoto</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">Descrição</label>
                <textarea rows={3} className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none" placeholder="Descreva a vaga, requisitos e benefícios..." />
              </div>
            </div>
            <div className="mt-4 flex gap-3">
              <button className="py-2 px-6 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
                Publicar Vaga
              </button>
              <button
                onClick={() => setMostrarForm(false)}
                className="py-2 px-6 border rounded-lg hover:bg-gray-50 transition"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}

        {/* Lista de vagas */}
        <div className="space-y-4">
          {vagas.map((vaga) => (
            <div key={vaga.id} className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h2 className="text-xl font-semibold">{vaga.titulo}</h2>
                  <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {vaga.local}</span>
                    <span className="flex items-center gap-1"><DollarSign className="h-4 w-4" /> {vaga.salario}</span>
                    <span className="flex items-center gap-1"><Briefcase className="h-4 w-4" /> {vaga.tipo}</span>
                    <span className="flex items-center gap-1">👥 {vaga.candidatos} candidatos</span>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  vaga.status === 'Aberta' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {vaga.status}
                </span>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <button className="flex items-center gap-1 px-3 py-1.5 text-sm border rounded-lg hover:bg-gray-50 transition">
                  <Eye className="h-4 w-4" /> Ver
                </button>
                <button className="flex items-center gap-1 px-3 py-1.5 text-sm border rounded-lg hover:bg-gray-50 transition">
                  <Edit className="h-4 w-4" /> Editar
                </button>
                <button className="flex items-center gap-1 px-3 py-1.5 text-sm border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition">
                  <Trash2 className="h-4 w-4" /> Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
