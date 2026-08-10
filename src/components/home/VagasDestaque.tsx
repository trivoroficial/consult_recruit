'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Briefcase, MapPin, Building2, ArrowRight, TrendingUp } from 'lucide-react'
import { listarVagas } from '@/actions/vagas'

export function VagasDestaque() {
  const [vagas, setVagas] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    carregarVagas()
  }, [])

  const carregarVagas = async () => {
    try {
      const result = await listarVagas()
      if (result.success) {
        const abertas = (result.data || []).filter((v: any) => v.status === 'Aberta')
        setVagas(abertas.slice(0, 3))
      }
    } catch (error) {
      console.error('Erro ao carregar vagas:', error)
    } finally {
      setLoading(false)
    }
  }

  const whatsappNumber = "5534991850735"

  if (loading) {
    return (
      <section className="py-16 md:py-24 bg-[#FAFAFA]">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-[#E5E7EB] rounded w-48 mx-auto mb-4" />
            <div className="h-4 bg-[#E5E7EB] rounded w-64 mx-auto" />
          </div>
        </div>
      </section>
    )
  }

  if (vagas.length === 0) {
    return null
  }

  return (
    <section className="py-16 md:py-24 bg-[#FAFAFA]">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#8B1A2A]/5 text-[#8B1A2A] rounded-full text-sm font-medium mb-4">
              <TrendingUp className="h-4 w-4" />
              Oportunidades em destaque
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A2E]">
              A vaga que vai mudar sua vida
              <br />
              <span className="text-[#8B1A2A]">pode estar aqui</span>
            </h2>
            <p className="text-[#6B7280] mt-4 text-lg">
              Essas oportunidades não vão esperar por você. Cada dia sem ação é uma chance que você perde.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vagas.map((vaga, index) => (
            <motion.div
              key={vaga.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-white rounded-2xl shadow-sm border border-[#E5E7EB] hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden relative"
            >
              {vaga.badge && (
                <div className="absolute top-4 right-4 z-10">
                  <span 
                    className="px-3 py-1 text-white text-xs font-bold rounded-full shadow-lg"
                    style={{ backgroundColor: vaga.cor_badge || '#8B1A2A' }}
                  >
                    {vaga.badge}
                  </span>
                </div>
              )}

              <div className="p-6">
                <h3 className="text-xl font-bold text-[#1A1A2E] group-hover:text-[#8B1A2A] transition mb-3">
                  {vaga.titulo}
                </h3>

                <div className="space-y-2 text-sm text-[#6B7280]">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-[#8B1A2A]" />
                    <span>{vaga.empresa}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-[#8B1A2A]" />
                    <span>{vaga.local || 'Remoto'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-[#8B1A2A]" />
                    <span>{vaga.tipo || 'CLT'}</span>
                  </div>
                  {(vaga.salario_inicial || vaga.salario_final) && (
                    <div className="flex items-center gap-2 text-[#8B1A2A] font-semibold">
                      <span>💰 R$ {vaga.salario_inicial || 0} - R$ {vaga.salario_final || 0}</span>
                    </div>
                  )}
                </div>

                <p className="text-sm text-[#6B7280] mt-4 line-clamp-2">
                  {vaga.descricao || 'Oportunidade imperdível para profissionais talentosos.'}
                </p>

                <div className="mt-6 pt-4 border-t border-[#E5E7EB] grid grid-cols-2 gap-3">
                  <a
                    href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Olá! Vi a vaga de ${vaga.titulo} na ZENTHOS e gostaria de saber mais.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-2.5 border border-[#8B1A2A] text-[#8B1A2A] rounded-lg hover:bg-[#8B1A2A] hover:text-white transition text-sm font-medium"
                  >
                    Saber Mais
                  </a>
                  <Link
                    href="/cadastro"
                    className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#8B1A2A] text-white rounded-lg hover:bg-[#6B0A1A] transition text-sm font-medium"
                  >
                    Inscrever-se
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              <div className="absolute inset-0 bg-gradient-to-tr from-[#8B1A2A]/0 via-[#8B1A2A]/0 to-[#E3C9A8]/0 group-hover:from-[#8B1A2A]/5 group-hover:via-[#E3C9A8]/5 group-hover:to-transparent transition-all duration-700 pointer-events-none" />
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-[#6B7280] mb-4">
            <span className="font-medium text-[#8B1A2A]">{vagas.length}+ vagas</span> esperando por você
          </p>
          <Link href="/vagas">
            <button className="group px-8 py-3.5 bg-white border-2 border-[#8B1A2A] text-[#8B1A2A] font-semibold rounded-lg hover:bg-[#8B1A2A] hover:text-white transition-all flex items-center gap-2 mx-auto">
              Ver Todas as Vagas
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}
