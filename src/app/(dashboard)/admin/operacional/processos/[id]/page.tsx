'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { SidebarAdmin } from '@/components/dashboard/SidebarAdmin'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import { 
  Briefcase, Building2, MapPin, Users, Calendar, 
  ArrowLeft, Eye, Edit, Download, Printer,
  User, Clock, CheckCircle, XCircle, Award,
  BarChart3, PieChart, FileText, Plus
} from 'lucide-react'

export default function DetalhesProcessoOperacional() {
  const router = useRouter()
  const params = useParams()
  const [loading, setLoading] = useState(true)

  const processo = {
    id: params.id,
    nome: 'Operador de Produção',
    empresa: 'Indústria ABC',
    unidade: 'Unidade 1',
    cidade: 'Uberlândia/MG',
    responsavel: 'João Silva',
    consultor: 'Maria Santos',
    vagas: 15,
    cargo: 'Operador de Produção',
    tipoContratacao: 'CLT',
    data: '15/07/2026',
    status: 'ativo',
    observacoes: 'Processo em andamento, boas perspectivas de contratação.',
    participantes: [
      { id: 1, nome: 'João Silva', status: 'aprovado', data: '15/07/2026' },
      { id: 2, nome: 'Maria Santos', status: 'pendente', data: '14/07/2026' },
      { id: 3, nome: 'Pedro Costa', status: 'banco', data: '13/07/2026' },
      { id: 4, nome: 'Ana Oliveira', status: 'reprovado', data: '12/07/2026' },
    ],
    entrevistas: [
      { id: 1, participante: 'João Silva', data: '20/07/2026', hora: '09:00', status: 'concluida' },
      { id: 2, participante: 'Maria Santos', data: '20/07/2026', hora: '14:00', status: 'pendente' },
    ],
    stats: {
      total: 48,
      aprovados: 12,
      reprovados: 28,
      banco: 8,
      contratados: 5
    }
  }

  const statusConfig = {
    aprovado: { label: 'Aprovado', color: 'bg-green-100 text-green-700', icon: CheckCircle },
    pendente: { label: 'Pendente', color: 'bg-yellow-100 text-yellow-700', icon: Clock },
    banco: { label: 'Banco de Talentos', color: 'bg-purple-100 text-purple-700', icon: Award },
    reprovado: { label: 'Reprovado', color: 'bg-red-100 text-red-700', icon: XCircle },
    ativo: { label: 'Ativo', color: 'bg-green-100 text-green-700', icon: CheckCircle },
    concluida: { label: 'Concluída', color: 'bg-blue-100 text-blue-700', icon: CheckCircle },
  }

  useEffect(() => {
    setTimeout(() => setLoading(false), 800)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
        <SidebarAdmin />
        <div className="flex-1 ml-64 flex items-center justify-center">
          <div className="text-[#8B0000] text-xl">Carregando...</div>
        </div>
      </div>
    )
  }

  const status = statusConfig[processo.status as keyof typeof statusConfig]

  return (
    <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
      <SidebarAdmin />
      
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <header className="bg-white border-b border-[#E8EAE0] px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => router.push('/admin/operacional/processos')} className="p-2 hover:bg-[#F8F4E6] rounded-lg transition">
              <ArrowLeft className="h-5 w-5 text-[#708090]" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-[#2D343A]">{processo.nome}</h1>
              <p className="text-sm text-[#708090]">{processo.empresa}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 border border-[#E8EAE0] rounded-lg hover:bg-[#F8F4E6] transition flex items-center gap-2">
              <Edit className="h-4 w-4" />
              Editar
            </button>
            <button className="px-4 py-2 bg-[#8B0000] text-white rounded-lg hover:bg-[#700000] transition font-medium flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Novo Participante
            </button>
          </div>
        </header>

        <div className="flex-1 p-8">
          {/* INFO DO PROCESSO */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E8EAE0] flex items-center gap-3">
              <Building2 className="h-5 w-5 text-[#8B0000]" />
              <div>
                <p className="text-xs text-[#708090]">Empresa</p>
                <p className="font-medium text-[#2D343A]">{processo.empresa}</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E8EAE0] flex items-center gap-3">
              <MapPin className="h-5 w-5 text-[#8B0000]" />
              <div>
                <p className="text-xs text-[#708090]">Local</p>
                <p className="font-medium text-[#2D343A]">{processo.cidade}</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E8EAE0] flex items-center gap-3">
              <User className="h-5 w-5 text-[#8B0000]" />
              <div>
                <p className="text-xs text-[#708090]">Responsável</p>
                <p className="font-medium text-[#2D343A]">{processo.responsavel}</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E8EAE0] flex items-center gap-3">
              <Calendar className="h-5 w-5 text-[#8B0000]" />
              <div>
                <p className="text-xs text-[#708090]">Data</p>
                <p className="font-medium text-[#2D343A]">{processo.data}</p>
              </div>
            </div>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E8EAE0] text-center">
              <p className="text-2xl font-bold text-[#2D343A]">{processo.stats.total}</p>
              <p className="text-xs text-[#708090]">Total</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E8EAE0] text-center border-green-200">
              <p className="text-2xl font-bold text-green-600">{processo.stats.aprovados}</p>
              <p className="text-xs text-[#708090]">Aprovados</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E8EAE0] text-center border-red-200">
              <p className="text-2xl font-bold text-red-600">{processo.stats.reprovados}</p>
              <p className="text-xs text-[#708090]">Reprovados</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E8EAE0] text-center border-purple-200">
              <p className="text-2xl font-bold text-purple-600">{processo.stats.banco}</p>
              <p className="text-xs text-[#708090]">Banco</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E8EAE0] text-center border-blue-200">
              <p className="text-2xl font-bold text-blue-600">{processo.stats.contratados}</p>
              <p className="text-xs text-[#708090]">Contratados</p>
            </div>
          </div>

          {/* TABELA DE PARTICIPANTES */}
          <div className="bg-white rounded-xl shadow-sm border border-[#E8EAE0] overflow-hidden">
            <div className="px-6 py-4 border-b border-[#E8EAE0] flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[#2D343A] flex items-center gap-2">
                <Users className="h-5 w-5 text-[#8B0000]" />
                Participantes
              </h2>
              <span className="text-sm text-[#708090]">{processo.participantes.length} participantes</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#F8F4E6]">
                  <tr>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Nome</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Data</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {processo.participantes.map((item) => {
                    const status = statusConfig[item.status as keyof typeof statusConfig]
                    const Icon = status?.icon || Clock
                    return (
                      <tr key={item.id} className="border-b border-[#E8EAE0] hover:bg-[#F8F4E6] transition">
                        <td className="py-3 px-4 font-medium text-[#2D343A]">{item.nome}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${status?.color} flex items-center gap-1 w-fit`}>
                            <Icon className="h-3 w-3" />
                            {status?.label}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-[#708090]">{item.data}</td>
                        <td className="py-3 px-4">
                          <button className="p-1 hover:bg-[#F8F4E6] rounded">
                            <Eye className="h-4 w-4 text-[#708090]" />
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <DashboardFooter />
      </div>
    </div>
  )
}
