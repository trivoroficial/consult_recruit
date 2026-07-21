'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { 
  ArrowLeft, Building2, MapPin, Briefcase, Clock, 
  Calendar, Users, CheckCircle, XCircle, Star,
  Share2, Bookmark, Eye, Mail, Phone, Globe
} from 'lucide-react'

export default function DetalhesVaga() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const [vaga, setVaga] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [candidatou, setCandidatou] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('zenthos_vagas')
    if (saved) {
      const vagas = JSON.parse(saved)
      const found = vagas.find((v: any) => v.id === parseInt(id))
      setVaga(found || null)
    }
    setLoading(false)
  }, [id])

  const handleCandidatar = () => {
    setCandidatou(true)
    // Incrementar contador de candidatos
    const saved = localStorage.getItem('zenthos_vagas')
    if (saved) {
      const vagas = JSON.parse(saved)
      const updated = vagas.map((v: any) => {
        if (v.id === parseInt(id)) {
          return { ...v, candidatos: (v.candidatos || 0) + 1 }
        }
        return v
      })
      localStorage.setItem('zenthos_vagas', JSON.stringify(updated))
    }
    setTimeout(() => {
      alert('✅ Candidatura realizada com sucesso!')
    }, 500)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F4E6] flex items-center justify-center">
        <div className="text-[#8B0000] text-xl">Carregando vaga...</div>
      </div>
    )
  }

  if (!vaga) {
    return (
      <div className="min-h-screen bg-[#F8F4E6] flex flex-col items-center justify-center p-4">
        <Briefcase className="h-16 w-16 text-[#708090] mb-4" />
        <h2 className="text-2xl font-bold text-[#2D343A]">Vaga não encontrada</h2>
        <p className="text-[#708090]">A vaga que você está procurando não existe.</p>
        <Link 
          href="/vagas"
          className="mt-4 px-6 py-2 bg-[#8B0000] text-white rounded-lg hover:bg-[#700000] transition flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para Vagas
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8F4E6]">
      {/* HEADER SIMPLES */}
      <div className="bg-white border-b border-[#E8EAE0] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/vagas" className="flex items-center gap-2 text-[#708090] hover:text-[#8B0000] transition">
              <ArrowLeft className="h-5 w-5" />
              <span>Voltar para vagas</span>
            </Link>
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-[#F8F4E6] rounded-lg transition" title="Compartilhar">
                <Share2 className="h-5 w-5 text-[#708090]" />
              </button>
              <button className="p-2 hover:bg-[#F8F4E6] rounded-lg transition" title="Salvar">
                <Bookmark className="h-5 w-5 text-[#708090]" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CONTEÚDO */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* COLUNA PRINCIPAL */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-6 md:p-8">
              
              {/* CABEÇALHO DA VAGA */}
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 bg-[#8B0000]/10 rounded-2xl flex items-center justify-center text-[#8B0000] text-2xl font-bold flex-shrink-0">
                  {vaga.titulo.charAt(0)}
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl md:text-3xl font-bold text-[#2D343A]">{vaga.titulo}</h1>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <span className="flex items-center gap-1 text-[#708090] text-sm">
                      <Building2 className="h-4 w-4" />
                      {vaga.confidencial ? 'Confidencial' : vaga.empresa}
                    </span>
                    <span className="text-[#708090]">•</span>
                    <span className="flex items-center gap-1 text-[#708090] text-sm">
                      <MapPin className="h-4 w-4" />
                      {vaga.local || 'Não informado'}
                    </span>
                    {vaga.badge && (
                      <span className={`px-2 py-0.5 rounded-full text-xs text-white ${vaga.corBadge || 'bg-purple-500'}`}>
                        {vaga.badge}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* INFO RÁPIDA */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-[#F8F4E6] rounded-xl mb-6">
                <div className="text-center">
                  <p className="text-xs text-[#708090]">Tipo</p>
                  <p className="font-semibold text-[#2D343A]">{vaga.tipo || 'CLT'}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-[#708090]">Status</p>
                  <p className="font-semibold text-green-600">{vaga.status || 'Aberta'}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-[#708090]">Candidatos</p>
                  <p className="font-semibold text-[#2D343A]">{vaga.candidatos || 0}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-[#708090]">Publicada</p>
                  <p className="font-semibold text-[#2D343A]">{new Date().toLocaleDateString('pt-BR')}</p>
                </div>
              </div>

              {/* DESCRIÇÃO */}
              <div className="mb-6">
                <h2 className="text-lg font-bold text-[#2D343A] mb-3">Descrição da Vaga</h2>
                <p className="text-[#708090] leading-relaxed">
                  {vaga.descricao || 'Nenhuma descrição cadastrada para esta vaga.'}
                </p>
              </div>

              {/* REQUISITOS */}
              <div className="mb-6">
                <h2 className="text-lg font-bold text-[#2D343A] mb-3">Requisitos</h2>
                <p className="text-[#708090] leading-relaxed">
                  {vaga.requisitos || 'Nenhum requisito cadastrado.'}
                </p>
              </div>

              {/* BENEFÍCIOS */}
              <div>
                <h2 className="text-lg font-bold text-[#2D343A] mb-3">Benefícios</h2>
                <div className="flex flex-wrap gap-2">
                  {vaga.beneficios ? (
                    vaga.beneficios.split(',').map((b: string, i: number) => (
                      <span key={i} className="px-3 py-1 bg-[#F8F4E6] rounded-full text-sm text-[#2D343A]">
                        {b.trim()}
                      </span>
                    ))
                  ) : (
                    <span className="text-[#708090]">Nenhum benefício listado.</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* SIDEBAR */}
          <div>
            <div className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-6 sticky top-24">
              
              {/* BOTÃO CANDIDATAR */}
              {candidatou ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center mb-4">
                  <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <p className="font-semibold text-green-700">Candidatura realizada!</p>
                  <p className="text-sm text-green-600">Boa sorte! 🍀</p>
                </div>
              ) : (
                <button
                  onClick={handleCandidatar}
                  className="w-full py-3 bg-[#8B0000] text-white rounded-xl hover:bg-[#700000] transition font-semibold flex items-center justify-center gap-2"
                >
                  <CheckCircle className="h-5 w-5" />
                  Candidatar-se
                </button>
              )}

              <div className="mt-6 pt-6 border-t border-[#E8EAE0] space-y-4">
                <h3 className="font-semibold text-[#2D343A]">Informações da Empresa</h3>
                
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3 text-[#708090]">
                    <Building2 className="h-4 w-4" />
                    <span>{vaga.confidencial ? 'Confidencial' : vaga.empresa}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[#708090]">
                    <MapPin className="h-4 w-4" />
                    <span>{vaga.local || 'Não informado'}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[#708090]">
                    <Globe className="h-4 w-4" />
                    <span>www.empresa.com.br</span>
                  </div>
                </div>

                <button className="w-full py-2 border border-[#E8EAE0] rounded-lg hover:bg-[#F8F4E6] transition text-sm text-[#708090]">
                  Ver perfil da empresa
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-[#E8EAE0]">
                <h3 className="font-semibold text-[#2D343A] mb-3">Compartilhar</h3>
                <div className="flex gap-3">
                  <button className="p-2 bg-[#F8F4E6] rounded-lg hover:bg-[#E8EAE0] transition">
                    <Mail className="h-5 w-5 text-[#708090]" />
                  </button>
                  <button className="p-2 bg-[#F8F4E6] rounded-lg hover:bg-[#E8EAE0] transition">
                    <Phone className="h-5 w-5 text-[#708090]" />
                  </button>
                  <button className="p-2 bg-[#F8F4E6] rounded-lg hover:bg-[#E8EAE0] transition">
                    <Share2 className="h-5 w-5 text-[#708090]" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
