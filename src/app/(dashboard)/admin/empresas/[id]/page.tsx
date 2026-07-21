'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { SidebarAdmin } from '@/components/dashboard/SidebarAdmin'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import { 
  ArrowLeft, Building2, MapPin, Calendar, Users, Briefcase, 
  CreditCard, Edit, Trash2, Mail, Phone, Globe, Shield,
  CheckCircle, XCircle, Clock
} from 'lucide-react'

export default function VisualizarEmpresa() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const [empresa, setEmpresa] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem('zenthos_empresas')
    if (saved) {
      const empresas = JSON.parse(saved)
      const found = empresas.find((e: any) => e.id === parseInt(id))
      setEmpresa(found || null)
    }
    setLoading(false)
  }, [id])

  const handleDelete = () => {
    if (confirm('Tem certeza que deseja excluir esta empresa?')) {
      const saved = localStorage.getItem('zenthos_empresas')
      if (saved) {
        const empresas = JSON.parse(saved)
        const updated = empresas.filter((e: any) => e.id !== parseInt(id))
        localStorage.setItem('zenthos_empresas', JSON.stringify(updated))
        router.push('/admin/empresas')
      }
    }
  }

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

  if (!empresa) {
    return (
      <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
        <SidebarAdmin />
        <div className="flex-1 ml-64 flex flex-col items-center justify-center">
          <Building2 className="h-16 w-16 text-[#708090] mb-4" />
          <h2 className="text-2xl font-bold text-[#2D343A]">Empresa não encontrada</h2>
          <p className="text-[#708090]">A empresa que você está procurando não existe.</p>
          <button 
            onClick={() => router.push('/admin/empresas')}
            className="mt-4 px-6 py-2 bg-[#8B0000] text-white rounded-lg hover:bg-[#700000] transition flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para Empresas
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
      <SidebarAdmin />
      
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        {/* HEADER */}
        <header className="bg-white border-b border-[#E8EAE0] px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => router.push('/admin/empresas')}
              className="p-2 hover:bg-[#F8F4E6] rounded-lg transition"
            >
              <ArrowLeft className="h-5 w-5 text-[#708090]" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-[#2D343A]">{empresa.nome}</h1>
              <p className="text-sm text-[#708090]">Detalhes da empresa</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => router.push(`/admin/empresas/${id}/editar`)}
              className="px-4 py-2 border border-[#8B0000] text-[#8B0000] rounded-lg hover:bg-[#8B0000] hover:text-white transition flex items-center gap-2"
            >
              <Edit className="h-4 w-4" />
              Editar
            </button>
            <button 
              onClick={handleDelete}
              className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition flex items-center gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Excluir
            </button>
          </div>
        </header>

        {/* CONTEÚDO */}
        <div className="flex-1 p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* CARD PRINCIPAL */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-20 h-20 bg-[#8B0000]/10 rounded-2xl flex items-center justify-center text-[#8B0000] text-3xl font-bold">
                    {empresa.nome.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[#2D343A]">{empresa.nome}</h2>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        empresa.status === 'Ativo' ? 'bg-green-100 text-green-700' :
                        empresa.status === 'Inativo' ? 'bg-red-100 text-red-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {empresa.status || 'Ativo'}
                      </span>
                      <span className="text-sm text-[#708090]">• CNPJ: {empresa.cnpj || 'Não informado'}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-[#F8F4E6] rounded-lg">
                    <MapPin className="h-5 w-5 text-[#8B0000]" />
                    <div>
                      <p className="text-sm text-[#708090]">Localização</p>
                      <p className="font-medium text-[#2D343A]">{empresa.cidade || 'Não informado'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-[#F8F4E6] rounded-lg">
                    <Calendar className="h-5 w-5 text-[#8B0000]" />
                    <div>
                      <p className="text-sm text-[#708090]">Cadastro</p>
                      <p className="font-medium text-[#2D343A]">{new Date().toLocaleDateString('pt-BR')}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-[#F8F4E6] rounded-lg">
                    <Users className="h-5 w-5 text-[#8B0000]" />
                    <div>
                      <p className="text-sm text-[#708090]">Funcionários</p>
                      <p className="font-medium text-[#2D343A]">{empresa.funcionarios || '0'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-[#F8F4E6] rounded-lg">
                    <Briefcase className="h-5 w-5 text-[#8B0000]" />
                    <div>
                      <p className="text-sm text-[#708090]">Vagas Ativas</p>
                      <p className="font-medium text-[#2D343A]">{empresa.vagasAtivas || '0'}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 border border-[#E8EAE0] rounded-lg">
                  <h3 className="font-semibold text-[#2D343A] mb-2">Descrição</h3>
                  <p className="text-[#708090] text-sm">
                    {empresa.descricao || 'Nenhuma descrição cadastrada para esta empresa.'}
                  </p>
                </div>
              </div>
            </div>

            {/* SIDEBAR */}
            <div>
              <div className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-6">
                <h3 className="font-semibold text-[#2D343A] mb-4">Informações</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="h-4 w-4 text-[#708090]" />
                    <span className="text-[#708090]">email@empresa.com.br</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="h-4 w-4 text-[#708090]" />
                    <span className="text-[#708090]">(00) 0000-0000</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Globe className="h-4 w-4 text-[#708090]" />
                    <span className="text-[#708090]">www.empresa.com.br</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Shield className="h-4 w-4 text-[#708090]" />
                    <span className="text-[#708090]">Plano: {empresa.plano || 'Básico'}</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-[#E8EAE0]">
                  <h4 className="text-sm font-semibold text-[#2D343A] mb-2">Atividades Recentes</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-[#708090]">
                      <Clock className="h-3 w-3" />
                      <span>Empresa cadastrada</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#708090]">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      <span>Perfil atualizado</span>
                    </div>
                  </div>
                </div>

                <button className="w-full mt-6 px-4 py-2 bg-[#8B0000] text-white rounded-lg hover:bg-[#700000] transition flex items-center justify-center gap-2">
                  <Building2 className="h-4 w-4" />
                  Ver Vagas da Empresa
                </button>
              </div>
            </div>
          </div>
        </div>

        <DashboardFooter />
      </div>
    </div>
  )
}
