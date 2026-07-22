'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Building2, MapPin, Briefcase, Clock, ChevronRight, ArrowRight, Users } from 'lucide-react'

export function VagasDestaque() {
  const [vagas, setVagas] = useState<any[]>([])
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loading, setLoading] = useState(true)

  // DADOS DE EXEMPLO (CASO NÃO HAJA NADA NO LOCALSTORAGE)
  const vagasExemplo = [
    {
      id: 1,
      titulo: 'Analista Administrativo',
      empresa: 'Empresa XPTO',
      local: 'Uberlândia/MG',
      tipo: 'Presencial',
      badge: 'Urgente',
      badgeColor: 'bg-red-500',
      descricao: 'Atuação em rotinas administrativas, controle documental e suporte operacional.',
      candidatos: 12
    },
    {
      id: 2,
      titulo: 'Auxiliar de RH',
      empresa: 'Indústria ABC',
      local: 'Uberlândia/MG',
      tipo: 'Híbrido',
      badge: 'Destaque',
      badgeColor: 'bg-yellow-500',
      descricao: 'Apoio aos processos de recrutamento, seleção e gestão de pessoas.',
      candidatos: 8
    },
    {
      id: 3,
      titulo: 'Assistente Financeiro',
      empresa: 'Grupo Financeiro',
      local: 'Uberlândia/MG',
      tipo: 'Presencial',
      badge: 'Novo',
      badgeColor: 'bg-green-500',
      descricao: 'Controle de fluxo de caixa, contas a pagar e receber, relatórios financeiros.',
      candidatos: 5
    },
    {
      id: 4,
      titulo: 'Supervisor de Produção',
      empresa: 'Indústria XYZ',
      local: 'Uberlândia/MG',
      tipo: 'Presencial',
      badge: 'Premium',
      badgeColor: 'bg-purple-500',
      descricao: 'Liderança de equipe, planejamento de produção e controle de qualidade.',
      candidatos: 3
    },
  ]

  useEffect(() => {
    const saved = localStorage.getItem('zenthos_vagas')
    if (saved) {
      const allVagas = JSON.parse(saved)
      const destaques = allVagas.filter((v: any) => v.exibirCarrossel && v.status === 'Aberta')
      if (destaques.length > 0) {
        // Mapear para o formato do carrossel
        const mapped = destaques.slice(0, 6).map((v: any) => ({
          id: v.id,
          titulo: v.titulo,
          empresa: v.empresa,
          local: v.local || 'Não informado',
          tipo: v.tipo || 'Presencial',
          badge: v.badge || 'Destaque',
          badgeColor: v.corBadge || 'bg-purple-500',
          descricao: v.descricao || 'Oportunidade em destaque',
          candidatos: v.candidatos || 0
        }))
        setVagas(mapped)
        setLoading(false)
        return
      }
    }
    // Usar dados de exemplo
    setVagas(vagasExemplo)
    setLoading(false)
  }, [])

  // AUTO-SLIDE
  useEffect(() => {
    if (vagas.length === 0) return
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % vagas.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [vagas.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % vagas.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + vagas.length) % vagas.length)
  }

  if (loading) {
    return (
      <section className="py-16 bg-white border-y border-[#E8EAE0]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <div className="animate-pulse text-[#708090]">Carregando vagas...</div>
          </div>
        </div>
      </section>
    )
  }

  if (vagas.length === 0) {
    return null
  }

  const currentVaga = vagas[currentSlide]

  return (
    <section className="py-16 bg-white border-y border-[#E8EAE0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[#8B0000] uppercase tracking-wider">Oportunidades</span>
              <span className="h-px w-12 bg-[#8B0000]"></span>
            </div>
            <h2 className="text-3xl font-bold text-[#2D343A] mt-1">
              Vagas em <span className="text-[#8B0000]">Destaque</span>
            </h2>
            <p className="text-sm text-[#708090] mt-1">Oportunidades estratégicas para sua carreira</p>
          </div>
          <Link href="/cadastro" className="group flex items-center gap-2 text-sm font-medium text-[#8B0000] hover:text-[#700000] transition">
            Ver todas as vagas
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* CARROSSEL PREMIUM */}
        <div className="relative">
          <div className="overflow-hidden rounded-2xl">
            <div 
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {vagas.map((vaga) => (
                <div key={vaga.id} className="w-full flex-shrink-0 px-1">
                  <div className="relative bg-gradient-to-br from-white to-[#F8F4E6] rounded-2xl p-8 border border-[#E8EAE0] shadow-sm hover:shadow-xl transition-all duration-500 group">
                    {/* BADGE */}
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white shadow-lg ${vaga.badgeColor || 'bg-purple-500'}`}>
                        {vaga.badge || 'Destaque'}
                      </span>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-2 bg-[#8B0000]/10 rounded-lg">
                            <Briefcase className="h-5 w-5 text-[#8B0000]" />
                          </div>
                          <h3 className="text-2xl font-bold text-[#2D343A] group-hover:text-[#8B0000] transition">
                            {vaga.titulo}
                          </h3>
                        </div>
                        
                        <p className="text-lg font-semibold text-[#2D343A]">{vaga.empresa}</p>
                        
                        <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-[#708090]">
                          <span className="flex items-center gap-1.5">
                            <MapPin className="h-4 w-4" />
                            {vaga.local}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock className="h-4 w-4" />
                            {vaga.tipo}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Users className="h-4 w-4" />
                            {vaga.candidatos || 0} candidatos
                          </span>
                        </div>

                        <p className="mt-3 text-sm text-[#708090] leading-relaxed max-w-2xl">
                          {vaga.descricao}
                        </p>
                      </div>

                      <div className="flex-shrink-0">
                        <Link href="/cadastro">
                          <button className="group/btn relative px-8 py-3.5 bg-[#8B0000] text-white font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5">
                            <span className="relative z-10 flex items-center gap-2">
                              Candidatar-se
                              <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                            </span>
                            <span className="absolute inset-0 bg-[#E3C9A8] transform translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></span>
                          </button>
                        </Link>
                      </div>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8B0000] via-[#E3C9A8] to-[#8B0000] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* NAVEGAÇÃO */}
          <button 
            onClick={prevSlide}
            className="absolute -left-4 top-1/2 -translate-y-1/2 p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-[#F8F4E6] border border-[#E8EAE0] hover:border-[#8B0000] group"
          >
            <svg className="h-5 w-5 text-[#2D343A] group-hover:text-[#8B0000] transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={nextSlide}
            className="absolute -right-4 top-1/2 -translate-y-1/2 p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-[#F8F4E6] border border-[#E8EAE0] hover:border-[#8B0000] group"
          >
            <svg className="h-5 w-5 text-[#2D343A] group-hover:text-[#8B0000] transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* INDICADORES */}
          <div className="flex justify-center gap-2 mt-6">
            {vagas.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  currentSlide === index 
                    ? 'w-10 bg-[#8B0000] shadow-md shadow-[#8B0000]/30' 
                    : 'w-3 bg-[#E8EAE0] hover:bg-[#8B0000]/40'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-4">
          <span className="text-xs text-[#708090]">
            {currentSlide + 1} de {vagas.length} vagas em destaque
          </span>
        </div>

        {/* MENSAGEM PARA QUEM JÁ TEM CONTA */}
        <div className="text-center mt-8">
          <p className="text-sm text-[#708090]">
            Já possui uma conta?{' '}
            <Link href="/login" className="text-[#8B0000] font-semibold hover:underline">
              Faça login para acessar suas candidaturas
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}
