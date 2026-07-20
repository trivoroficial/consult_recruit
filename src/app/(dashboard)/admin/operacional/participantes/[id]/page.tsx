'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { SidebarAdmin } from '@/components/dashboard/SidebarAdmin'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import { 
  User, Phone, MapPin, Briefcase, Save, ArrowLeft, 
  CheckCircle, Clock, XCircle, Award, Calendar,
  School, Building2, DollarSign, FileText, Edit,
  Trash2, Mail, Link2, Download, Printer
} from 'lucide-react'

export default function DetalhesParticipanteOperacional() {
  const router = useRouter()
  const params = useParams()
  const [loading, setLoading] = useState(true)
  const [editando, setEditando] = useState(false)
  
  // DADOS DE EXEMPLO
  const participante = {
    id: params.id,
    nome: 'João Silva',
    telefone: '(34) 99999-9999',
    cpf: '123.456.789-00',
    cidade: 'Uberlândia/MG',
    bairro: 'Centro',
    cargo: 'Operador de Produção',
    escolaridade: 'Ensino Médio Completo',
    experiencia: '5 anos como operador de produção na Indústria ABC',
    empresaAtual: 'Indústria ABC',
    ultimoSalario: 'R$ 2.500,00',
    disponibilidade: 'Imediata',
    origem: 'Site',
    status: 'aprovado',
    dataCadastro: '15/07/2026',
    observacoes: 'Bom desempenho na entrevista, disponível para início imediato.',
    processos: [
      { id: 1, nome: 'Operador de Produção', empresa: 'Indústria ABC', status: 'aprovado', data: '15/07/2026' },
      { id: 2, nome: 'Auxiliar de Produção', empresa: 'Indústria ABC', status: 'pendente', data: '10/07/2026' },
    ],
    entrevistas: [
      { id: 1, data: '20/07/2026', hora: '09:00', tipo: 'Entrevista RH', resultado: 'Aprovado' },
      { id: 2, data: '18/07/2026', hora: '14:00', tipo: 'Triagem', resultado: 'Aprovado' },
    ]
  }

  const statusConfig = {
    aprovado: { label: 'Aprovado', color: 'bg-green-100 text-green-700', icon: CheckCircle },
    pendente: { label: 'Pendente', color: 'bg-yellow-100 text-yellow-700', icon: Clock },
    banco: { label: 'Banco de Talentos', color: 'bg-purple-100 text-purple-700', icon: Award },
    reprovado: { label: 'Reprovado', color: 'bg-red-100 text-red-700', icon: XCircle },
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

  const status = statusConfig[participante.status as keyof typeof statusConfig]
  const Icon = status?.icon || Clock

  return (
    <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
      <SidebarAdmin />
      
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <header className="bg-white border-b border-[#E8EAE0] px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => router.push('/admin/operacional/participantes')} className="p-2 hover:bg-[#F8F4E6] rounded-lg transition">
              <ArrowLeft className="h-5 w-5 text-[#708090]" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-[#2D343A]">{participante.nome}</h1>
              <p className="text-sm text-[#708090]">Detalhes do participante</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => setEditando(!editando)}
              className="px-4 py-2 border border-[#8B0000] text-[#8B0000] rounded-lg hover:bg-[#8B0000] hover:text-white transition font-medium flex items-center gap-2"
            >
              <Edit className="h-4 w-4" />
              {editando ? 'Cancelar' : 'Editar'}
            </button>
            <button className="px-4 py-2 bg-[#8B0000] text-white rounded-lg hover:bg-[#700000] transition font-medium flex items-center gap-2">
              <Download className="h-4 w-4" />
              Currículo
            </button>
          </div>
        </header>

        <div className="flex-1 p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* COLUNA ESQUERDA - INFORMAÇÕES PESSOAIS */}
            <div className="lg:col-span-2 space-y-6">
              {/* PERFIL */}
              <div className="bg-white rounded-xl shadow-sm border border-[#E8EAE0] p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-[#8B0000]/10 rounded-full flex items-center justify-center text-[#8B0000] text-3xl font-bold">
                      {participante.nome.charAt(0)}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-[#2D343A]">{participante.nome}</h2>
                      <p className="text-[#708090]">{participante.cargo}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${status?.color} flex items-center gap-1`}>
                          <Icon className="h-3 w-3" />
                          {status?.label}
                        </span>
                        <span className="text-xs text-[#708090]">Cadastrado em {participante.dataCadastro}</span>
                      </div>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-[#F8F4E6] rounded-lg transition">
                    <Printer className="h-5 w-5 text-[#708090]" />
                  </button>
                </div>
              </div>

              {/* DETALHES PESSOAIS */}
              <div className="bg-white rounded-xl shadow-sm border border-[#E8EAE0] p-6">
                <h3 className="text-lg font-semibold text-[#2D343A] mb-4 flex items-center gap-2 border-b border-[#E8EAE0] pb-3">
                  <User className="h-5 w-5 text-[#8B0000]" />
                  Dados Pessoais
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-[#F8F4E6] rounded-lg">
                    <Phone className="h-5 w-5 text-[#8B0000]" />
                    <div>
                      <p className="text-xs text-[#708090]">Telefone</p>
                      <p className="font-medium text-[#2D343A]">{participante.telefone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-[#F8F4E6] rounded-lg">
                    <User className="h-5 w-5 text-[#8B0000]" />
                    <div>
                      <p className="text-xs text-[#708090]">CPF</p>
                      <p className="font-medium text-[#2D343A]">{participante.cpf}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-[#F8F4E6] rounded-lg">
                    <MapPin className="h-5 w-5 text-[#8B0000]" />
                    <div>
                      <p className="text-xs text-[#708090]">Cidade</p>
                      <p className="font-medium text-[#2D343A]">{participante.cidade}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-[#F8F4E6] rounded-lg">
                    <MapPin className="h-5 w-5 text-[#8B0000]" />
                    <div>
                      <p className="text-xs text-[#708090]">Bairro</p>
                      <p className="font-medium text-[#2D343A]">{participante.bairro}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* INFORMAÇÕES PROFISSIONAIS */}
              <div className="bg-white rounded-xl shadow-sm border border-[#E8EAE0] p-6">
                <h3 className="text-lg font-semibold text-[#2D343A] mb-4 flex items-center gap-2 border-b border-[#E8EAE0] pb-3">
                  <Briefcase className="h-5 w-5 text-[#8B0000]" />
                  Informações Profissionais
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 bg-[#F8F4E6] rounded-lg">
                    <p className="text-xs text-[#708090]">Cargo Pretendido</p>
                    <p className="font-medium text-[#2D343A]">{participante.cargo}</p>
                  </div>
                  <div className="p-3 bg-[#F8F4E6] rounded-lg">
                    <p className="text-xs text-[#708090]">Escolaridade</p>
                    <p className="font-medium text-[#2D343A]">{participante.escolaridade}</p>
                  </div>
                  <div className="p-3 bg-[#F8F4E6] rounded-lg">
                    <p className="text-xs text-[#708090]">Empresa Atual</p>
                    <p className="font-medium text-[#2D343A]">{participante.empresaAtual}</p>
                  </div>
                  <div className="p-3 bg-[#F8F4E6] rounded-lg">
                    <p className="text-xs text-[#708090]">Último Salário</p>
                    <p className="font-medium text-[#2D343A]">{participante.ultimoSalario}</p>
                  </div>
                  <div className="p-3 bg-[#F8F4E6] rounded-lg">
                    <p className="text-xs text-[#708090]">Disponibilidade</p>
                    <p className="font-medium text-[#2D343A]">{participante.disponibilidade}</p>
                  </div>
                  <div className="p-3 bg-[#F8F4E6] rounded-lg">
                    <p className="text-xs text-[#708090]">Origem</p>
                    <p className="font-medium text-[#2D343A]">{participante.origem}</p>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-[#F8F4E6] rounded-lg">
                  <p className="text-xs text-[#708090]">Experiência</p>
                  <p className="font-medium text-[#2D343A]">{participante.experiencia}</p>
                </div>
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-xs text-yellow-600">Observações</p>
                  <p className="font-medium text-[#2D343A]">{participante.observacoes}</p>
                </div>
              </div>
            </div>

            {/* COLUNA DIREITA */}
            <div className="space-y-6">
              {/* PROCESSOS */}
              <div className="bg-white rounded-xl shadow-sm border border-[#E8EAE0] p-6">
                <h3 className="text-lg font-semibold text-[#2D343A] mb-4 flex items-center gap-2 border-b border-[#E8EAE0] pb-3">
                  <Briefcase className="h-5 w-5 text-[#8B0000]" />
                  Processos
                </h3>
                <div className="space-y-3">
                  {participante.processos.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 border border-[#E8EAE0] rounded-lg">
                      <div>
                        <p className="font-medium text-[#2D343A]">{item.nome}</p>
                        <p className="text-xs text-[#708090]">{item.empresa}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item.status === 'aprovado' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {item.status === 'aprovado' ? 'Aprovado' : 'Pendente'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ENTREVISTAS */}
              <div className="bg-white rounded-xl shadow-sm border border-[#E8EAE0] p-6">
                <h3 className="text-lg font-semibold text-[#2D343A] mb-4 flex items-center gap-2 border-b border-[#E8EAE0] pb-3">
                  <Calendar className="h-5 w-5 text-[#8B0000]" />
                  Entrevistas
                </h3>
                <div className="space-y-3">
                  {participante.entrevistas.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 border border-[#E8EAE0] rounded-lg">
                      <div>
                        <p className="font-medium text-[#2D343A]">{item.tipo}</p>
                        <p className="text-xs text-[#708090]">{item.data} às {item.hora}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item.resultado === 'Aprovado' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {item.resultado}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* AÇÕES RÁPIDAS */}
              <div className="bg-white rounded-xl shadow-sm border border-[#E8EAE0] p-6">
                <h3 className="text-lg font-semibold text-[#2D343A] mb-4 flex items-center gap-2 border-b border-[#E8EAE0] pb-3">
                  <Link2 className="h-5 w-5 text-[#8B0000]" />
                  Ações Rápidas
                </h3>
                <div className="space-y-2">
                  <button className="w-full py-2.5 bg-[#8B0000] text-white rounded-lg hover:bg-[#700000] transition font-medium flex items-center justify-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Nova Entrevista
                  </button>
                  <button className="w-full py-2.5 border border-[#8B0000] text-[#8B0000] rounded-lg hover:bg-[#8B0000] hover:text-white transition font-medium flex items-center justify-center gap-2">
                    <FileText className="h-4 w-4" />
                    Gerar Relatório
                  </button>
                  <button className="w-full py-2.5 border border-[#E8EAE0] rounded-lg hover:bg-[#F8F4E6] transition text-[#708090] flex items-center justify-center gap-2">
                    <Mail className="h-4 w-4" />
                    Enviar Mensagem
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <DashboardFooter />
      </div>
    </div>
  )
}
