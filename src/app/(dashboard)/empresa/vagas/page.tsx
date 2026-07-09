'use client'

import { SidebarEmpresa } from '@/components/layout/SidebarEmpresa'
import { Briefcase, MapPin, DollarSign, Plus, Edit, Trash2, Eye, Clock } from 'lucide-react'
import { useState } from 'react'

const vagas = [
  { id: 1, titulo: 'Analista Administrativo', local: 'Uberlândia - MG', salario: 'R$ 3.500', tipo: 'Presencial', status: 'Aberta', candidatos: 12, data: '01/07/2026' },
  { id: 2, titulo: 'Auxiliar de RH', local: 'Uberlândia - MG', salario: 'R$ 2.800', tipo: 'Híbrido', status: 'Em análise', candidatos: 8, data: '03/07/2026' },
  { id: 3, titulo: 'Assistente Financeiro', local: 'Uberlândia - MG', salario: 'R$ 3.200', tipo: 'Presencial', status: 'Aberta', candidatos: 5, data: '05/07/2026' },
  { id: 4, titulo: 'Supervisor de Produção', local: 'Uberlândia - MG', salario: 'R$ 5.500', tipo: 'Presencial', status: 'Fechada', candidatos: 3, data: '20/06/2026' },
]

export default function VagasEmpresa() {
  const [mostrarForm, setMostrarForm] = useState(false)

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarEmpresa />
      <div className="flex-1 ml-64 p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">
            Minhas <span className="text-purple-600">Vagas</span>
          </h1>
          <button
            onClick={() => setMostrarForm(!mostrarForm)}
            className="btn-primary btn-sm flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Nova Vaga
          </button>
        </div>

        {mostrarForm && (
          <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">Nova Vaga</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Título da vaga</label>
                <input type="text" className="input-default" placeholder="Ex: Analista Administrativo" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Local</label>
                <input type="text" className="input-default" placeholder="Uberlândia - MG" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Salário</label>
                <input type="text" className="input-default" placeholder="R$ 3.500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Tipo</label>
                <select className="input-default">
                  <option>Presencial</option>
                  <option>Híbrido</option>
                  <option>Remoto</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">Descrição</label>
                <textarea rows={3} className="input-default" placeholder="Descreva a vaga, requisitos e benefícios..." />
              </div>
            </div>
            <div className="mt-4 flex gap-3">
              <button className="btn-primary">Publicar Vaga</button>
              <button
                onClick={() => setMostrarForm(false)}
                className="btn-outline"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Vaga</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Local</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Candidatos</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Ações</th>
              </tr>
            </thead>
            <tbody>
              {vagas.map((vaga) => (
                <tr key={vaga.id} className="border-b hover:bg-gray-50 transition">
                  <td className="py-3 px-4">
                    <div>
                      <p className="font-medium">{vaga.titulo}</p>
                      <p className="text-sm text-gray-500">{vaga.salario}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {vaga.local}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      vaga.status === 'Aberta' ? 'bg-green-100 text-green-700' :
                      vaga.status === 'Em análise' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {vaga.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-500">{vaga.candidatos}</td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <button className="p-1 hover:bg-gray-100 rounded transition" title="Visualizar">
                        <Eye className="h-4 w-4 text-blue-600" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded transition" title="Editar">
                        <Edit className="h-4 w-4 text-purple-600" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded transition" title="Excluir">
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
