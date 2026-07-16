'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  ArrowRight, Users, Building2, Briefcase, TrendingUp,
  ChevronLeft, ChevronRight, MapPin, DollarSign, Clock
} from 'lucide-react'

// ===== DADOS DO CARROSSEL =====
const vagasDestaque = [
  {
    id: 1,
    titulo: 'Desenvolvedor Full Stack',
    empresa: 'XPTO Tecnologia',
    local: 'Remoto',
    salario: 'R$ 8.000 - R$ 12.000',
    tipo: 'CLT',
    badge: 'Urgente',
    cor: 'bg-red-500'
  },
  {
    id: 2,
    titulo: 'UX Designer Sênior',
    empresa: 'XPTO Tecnologia',
    local: 'Híbrido - Uberlândia',
    salario: 'R$ 7.000 - R$ 10.000',
    tipo: 'PJ',
    badge: 'Destaque',
    cor: 'bg-blue-500'
  },
  {
    id: 3,
    titulo: 'Product Owner',
    empresa: 'XPTO Tecnologia',
    local: 'Presencial - Uberlândia',
    salario: 'R$ 9.000 - R$ 14.000',
    tipo: 'CLT',
    badge: 'Premium',
    cor: 'bg-purple-500'
  },
  {
    id: 4,
    titulo: 'Analista de Dados',
    empresa: 'XPTO Tecnologia',
    local: 'Remoto',
    salario: 'R$ 6.000 - R$ 9.000',
    tipo: 'CLT',
    badge: 'Novo',
    cor: 'bg-green-500'
  },
  {
    id: 5,
    titulo: 'DevOps Engineer',
    empresa: 'XPTO Tecnologia',
    local: 'Híbrido - Uberlândia',
    salario: 'R$ 10.000 - R$ 15.000',
    tipo: 'PJ',
    badge: 'Urgente',
    cor: 'bg-red-500'
  }
]

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const nextSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev + 1) % vagasDestaque.length)
    setTimeout(() => setIsAnimating(false), 500)
  }

  const prevSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev - 1 + vagasDestaque.length) % vagasDestaque.length)
    setTimeout(() => setIsAnimating(false), 500)
  }

  // Auto-play
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [])

  const vaga = vagasDestaque[currentIndex]

  return (
    <main className="min-h-screen pt-20 bg-[#F8F4E6]">
      
      {/* ===== HERO ===== */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-[#F8F4E6] via-white to-[#F8F4E6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h1 className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl text-[#2D343A]">
                Recrutamento & Seleção de{' '}
                <span className="text-[#8B0000]">Alta Performance</span>
              </h1>
              <p className="mt-6 text-lg text-[#708090]">
                Conectamos os melhores talentos às melhores empresas. Processos seletivos 
                ágeis, inteligentes e eficientes.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link href="/cadastro">
                  <button className="px-8 py-3 text-sm font-semibold text-white bg-[#8B0000] rounded-xl hover:bg-[#700000] transition shadow-md shadow-[#8B0000]/20 flex items-center gap-2">
                    Solicitar Diagnóstico <ArrowRight className="h-4 w-4" />
                  </button>
                </Link>
                <Link href="/servicos">
                  <button className="px-8 py-3 text-sm font-semibold text-[#8B0000] border-2 border-[#8B0000]/30 rounded-xl hover:bg-[#8B0000] hover:text-white transition">
                    Conhecer Serviços
                  </button>
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-[#E3C9A8]/30">
                <div className="w-12 h-12 bg-[#8B0000]/10 rounded-xl flex items-center justify-center text-[#8B0000]">
                  <Building2 className="h-6 w-6" />
                </div>
                <p className="mt-3 text-2xl font-bold text-[#2D343A]">+200</p>
                <p className="text-sm text-[#708090]">Empresas Atendidas</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-[#E3C9A8]/30">
                <div className="w-12 h-12 bg-[#8B0000]/10 rounded-xl flex items-center justify-center text-[#8B0000]">
                  <Users className="h-6 w-6" />
                </div>
                <p className="mt-3 text-2xl font-bold text-[#2D343A]">+5.000</p>
                <p className="text-sm text-[#708090]">Candidatos Cadastrados</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-[#E3C9A8]/30">
                <div className="w-12 h-12 bg-[#8B0000]/10 rounded-xl flex items-center justify-center text-[#8B0000]">
                  <Briefcase className="h-6 w-6" />
                </div>
                <p className="mt-3 text-2xl font-bold text-[#2D343A]">+800</p>
                <p className="text-sm text-[#708090]">Vagas Publicadas</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-[#E3C9A8]/30">
                <div className="w-12 h-12 bg-[#8B0000]/10 rounded-xl flex items-center justify-center text-[#8B0000]">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <p className="mt-3 text-2xl font-bold text-[#2D343A]">92%</p>
                <p className="text-sm text-[#708090]">Satisfação</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CARROSSEL DE VAGAS ===== */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-[#2D343A]">Vagas em Destaque</h2>
              <p className="text-sm text-[#708090] mt-1">Oportunidades imperdíveis</p>
            </div>
            <Link href="/candidato/vagas">
              <button className="text-sm font-semibold text-[#8B0000] hover:text-[#700000] transition flex items-center gap-1">
                Ver todas <ArrowRight className="h-4 w-4" />
              </button>
            </Link>
          </div>

          <div className="relative bg-[#F8F4E6] rounded-2xl p-6 md:p-8 overflow-hidden">
            {/* SLIDE */}
            <div className="flex items-center justify-between gap-6">
              <button 
                onClick={prevSlide}
                className="hidden md:flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl hover:bg-[#F8F4E6] transition-all flex-shrink-0 border border-[#E3C9A8]/30"
              >
                <ChevronLeft className="h-6 w-6 text-[#8B0000]" />
              </button>

              <div className="flex-1">
                <div className={`transition-opacity duration-500 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
                  <div className="flex items-start gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`${vaga.cor} text-white text-xs font-bold px-3 py-1 rounded-full`}>
                          {vaga.badge}
                        </span>
                        <span className="text-xs text-[#708090]">{vaga.tipo}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-[#2D343A]">{vaga.titulo}</h3>
                      <p className="text-lg text-[#708090] mt-1">{vaga.empresa}</p>
                      <div className="flex flex-wrap items-center gap-4 mt-3">
                        <span className="flex items-center gap-1 text-sm text-[#708090]">
                          <MapPin className="h-4 w-4" /> {vaga.local}
                        </span>
                        <span className="flex items-center gap-1 text-sm font-semibold text-[#8B0000]">
                          <DollarSign className="h-4 w-4" /> {vaga.salario}
                        </span>
                      </div>
                      <div className="mt-4 flex items-center gap-3">
                        <Link href="/candidato/vagas">
                          <button className="px-6 py-2.5 text-sm font-semibold text-white bg-[#8B0000] rounded-xl hover:bg-[#700000] transition shadow-md shadow-[#8B0000]/20">
                            Candidatar-se
                          </button>
                        </Link>
                        <button className="px-6 py-2.5 text-sm font-semibold text-[#8B0000] border border-[#8B0000]/30 rounded-xl hover:bg-[#8B0000] hover:text-white transition">
                          Ver Detalhes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <button 
                onClick={nextSlide}
                className="hidden md:flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl hover:bg-[#F8F4E6] transition-all flex-shrink-0 border border-[#E3C9A8]/30"
              >
                <ChevronRight className="h-6 w-6 text-[#8B0000]" />
              </button>
            </div>

            {/* INDICADORES */}
            <div className="flex justify-center gap-2 mt-6">
              {vagasDestaque.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index)
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'w-8 bg-[#8B0000]' 
                      : 'w-2 bg-[#E3C9A8] hover:bg-[#8B0000]/50'
                  }`}
                />
              ))}
            </div>

            {/* CONTADOR */}
            <div className="absolute bottom-6 right-6 text-xs text-[#708090]">
              {currentIndex + 1} / {vagasDestaque.length}
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-16 bg-[#8B0000]">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white">Pronto para encontrar os melhores talentos?</h2>
          <p className="mt-4 text-white/80 max-w-2xl mx-auto">
            Solicite um diagnóstico e descubra como podemos transformar seu recrutamento.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/cadastro">
              <button className="px-8 py-3 text-sm font-semibold text-[#8B0000] bg-white rounded-xl hover:bg-gray-100 transition shadow-lg">
                Solicitar Diagnóstico
              </button>
            </Link>
            <Link href="/contato">
              <button className="px-8 py-3 text-sm font-semibold text-white border-2 border-white/40 rounded-xl hover:bg-white/10 transition">
                Falar com Especialista
              </button>
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}
