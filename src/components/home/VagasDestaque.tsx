'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Building2, MapPin, Briefcase, Clock, Star, Eye } from 'lucide-react'

export function VagasDestaque() {
  const [vagas, setVagas] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem('zenthos_vagas')
    if (saved) {
      const allVagas = JSON.parse(saved)
      // Filtrar apenas vagas com exibirCarrossel = true e status = Aberta
      const destaques = allVagas.filter((v: any) => v.exibirCarrossel && v.status === 'Aberta')
      setVagas(destaques.slice(0, 6))
    } else {
      // Dados de exemplo
      const exemplo = [
        { 
          id: 1, 
          titulo: 'Analista Administrativo', 
          empresa: 'Empresa XPTO', 
          local: 'Uberlândia/MG', 
          tipo: 'CLT',
          status: 'Aberta',
          exibirCarrossel: true,
          badge: 'Destaque',
          corBadge: 'bg-purple-500'
        },
        { 
          id: 2, 
          titulo: 'Auxiliar de RH', 
          empresa: 'Indústria ABC', 
          local: 'Uberlândia/MG', 
          tipo: 'CLT',
          status: 'Aberta',
          exibirCarrossel: true,
          badge: 'Novo',
          corBadge: 'bg-green-500'
        },
      ]
      setVagas(exemplo)
    }
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#2D343A] text-center mb-12">
            Vagas em Destaque
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-[#F8F4E6] rounded-xl p-6 animate-pulse h-64" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (vagas.length === 0) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-[#2D343A] mb-4">Vagas em Destaque</h2>
          <p className="text-[#708090]">Nenhuma vaga em destaque no momento.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold text-[#2D343A]">Vagas em Destaque</h2>
            <p className="text-[#708090] mt-1">Oportunidades que podem transformar sua carreira</p>
          </div>
          <Link 
            href="/vagas" 
            className="text-[#8B0000] hover:underline font-medium flex items-center gap-1"
          >
            Ver todas <span className="text-xl">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vagas.map((vaga) => (
            <Link 
              key={vaga.id} 
              href={`/vagas/${vaga.id}`}
              className="group bg-white border border-[#E8EAE0] rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 block"
            >
              {/* BADGE */}
              {vaga.badge && (
                <span className={`inline-block px-2 py-0.5 rounded-full text-xs text-white ${vaga.corBadge || 'bg-purple-500'} mb-3`}>
                  {vaga.badge}
                </span>
              )}

              {/* TÍTULO */}
              <h3 className="text-lg font-bold text-[#2D343A] group-hover:text-[#8B0000] transition">
                {vaga.titulo}
              </h3>

              {/* EMPRESA */}
              <div className="flex items-center gap-2 text-sm text-[#708090] mt-2">
                <Building2 className="h-4 w-4" />
                <span>{vaga.empresa}</span>
              </div>

              {/* LOCAL */}
              <div className="flex items-center gap-2 text-sm text-[#708090] mt-1">
                <MapPin className="h-4 w-4" />
                <span>{vaga.local || 'Não informado'}</span>
              </div>

              {/* TIPO E STATUS */}
              <div className="flex items-center gap-3 mt-4">
                <span className="flex items-center gap-1 text-xs text-[#708090] bg-[#F8F4E6] px-2 py-1 rounded-full">
                  <Briefcase className="h-3 w-3" />
                  {vaga.tipo || 'CLT'}
                </span>
                <span className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  <Clock className="h-3 w-3" />
                  {vaga.status || 'Aberta'}
                </span>
              </div>

              {/* FOOTER DO CARD */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#E8EAE0]">
                <span className="text-xs text-[#708090]">📍 {vaga.local || 'Remoto'}</span>
                <span className="text-[#8B0000] text-sm font-medium group-hover:underline">
                  Ver vaga →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
