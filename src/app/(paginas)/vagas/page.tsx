'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Briefcase, MapPin, Building2, Search, 
  ArrowRight, TrendingUp, Clock
} from 'lucide-react'
import { listarVagas } from '@/actions/vagas'

export default function VagasPage() {
  const [vagas, setVagas] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filtro, setFiltro] = useState('Todas')

  useEffect(() => {
    carregarVagas()
  }, [])

  const carregarVagas = async () => {
    try {
      const result = await listarVagas()
      if (result.success) {
        setVagas(result.data || [])
      }
    } catch (error) {
      console.error('Erro ao carregar vagas:', error)
    } finally {
      setLoading(false)
    }
  }

  const vagasFiltradas = vagas.filter(v => {
    const matchSearch = v.titulo?.toLowerCase().includes(search.toLowerCase()) ||
                        v.empresa?.toLowerCase().includes(search.toLowerCase()) ||
                        v.local?.toLowerCase().includes(search.toLowerCase())
    const matchFiltro = filtro === 'Todas' || v.status === filtro
    return matchSearch && matchFiltro
  })

  const statusCount = {
    total: vagas.length,
    abertas: vagas.filter(v => v.status === 'Aberta').length,
    fechadas: vagas.filter(v => v.status === 'Fechada').length,
  }

  const whatsappNumber = "5534991850735"

  if (loading) {
    return (
      <div className="flex-1 py-16 bg-[#FAFAFA]">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-[#E5E7EB] rounded w-48 mx-auto mb-4" />
            <div className="h-4 bg-[#E5E7EB] rounded w-64 mx-auto" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1">
      {/* Hero da página */}
      <section className="relative overflow-hidden py-16 md:py-20 bg-gradient-to-br from-[#8B1A2A] to-[#6B0A1A]">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#E3C9A8] rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#E3C9A8] rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm mb-6 border border-white/20">
              <Briefcase className="h-4 w-4 text-[#E3C9A8]" />
              <span>{vagas.length} vagas disponíveis</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Encontre a vaga
              <br />
              <span className="text-[#E3C9A8]">que vai mudar sua vida</span>
            </h1>

            <p className="text-lg text-white/80 mt-4 max-w-2xl mx-auto">
              Explore nossas oportunidades exclusivas e dê o próximo passo na sua carreira.
            </p>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 40L60 35C120 30 240 20 360 20C480 20 600 30 720 35C840 40 960 40 1080 35C1200 30 1320 20 1380 15L1440 10V60H0V40Z" fill="#FAFAFA" />
          </svg>
        </div>
      </section>

      {/* Busca e Filtros */}
      <section className="py-8 bg-white border-b border-[#E5E7EB]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#6B7280]" />
              <input
                type="text"
                placeholder="Buscar vagas por título, empresa ou local..."
                className="w-full pl-10 pr-4 py-3 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1A2A] transition"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setFiltro('Todas')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  filtro === 'Todas' ? 'bg-[#8B1A2A] text-white' : 'bg-[#F8F4E6] text-[#6B7280] hover:bg-[#E5E7EB]'
                }`}
              >
                Todas ({statusCount.total})
              </button>
              <button
                onClick={() => setFiltro('Aberta')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  filtro === 'Aberta' ? 'bg-green-600 text-white' : 'bg-[#F8F4E6] text-[#6B7280] hover:bg-[#E5E7EB]'
                }`}
              >
                Abertas ({statusCount.abertas})
              </button>
              <button
                onClick={() => setFiltro('Fechada')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  filtro === 'Fechada' ? 'bg-red-600 text-white' : 'bg-[#F8F4E6] text-[#6B7280] hover:bg-[#E5E7EB]'
                }`}
              >
                Fechadas ({statusCount.fechadas})
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Lista de Vagas */}
      <section className="py-12 md:py-16 bg-[#FAFAFA]">
        <div className="container mx-auto px-4">
          {vagasFiltradas.length === 0 ? (
            <div className="text-center py-16">
              <Briefcase className="h-16 w-16 text-[#6B7280] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#1A1A2E]">Nenhuma vaga encontrada</h3>
              <p className="text-[#6B7280] mt-2">Tente ajustar os filtros ou buscar por outro termo.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {vagasFiltradas.map((vaga, index) => (
                  <motion.div
                    key={vaga.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
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
                      <h3 className="text-xl font-bold text-[#1A1A2E] group-hover:text-[#8B1A2A] transition">
                        {vaga.titulo}
                      </h3>

                      <div className="space-y-2 text-sm text-[#6B7280] mt-3">
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
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-[#8B1A2A]" />
                          <span>{vaga.status || 'Aberta'}</span>
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
                  </motion.div>
                ))}
              </div>

              <div className="text-center mt-12">
                <p className="text-[#6B7280]">
                  Mostrando <span className="font-medium text-[#8B1A2A]">{vagasFiltradas.length}</span> de{' '}
                  <span className="font-medium text-[#8B1A2A]">{vagas.length}</span> vagas
                </p>
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-12 bg-white border-t border-[#E5E7EB]">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-[#1A1A2E]">
              Não encontrou a vaga ideal?
              <br />
              <span className="text-[#8B1A2A]">Crie seu perfil e receba oportunidades exclusivas</span>
            </h3>
            <Link href="/cadastro">
              <button className="group mt-6 px-8 py-3.5 bg-[#8B1A2A] text-white font-semibold rounded-lg hover:bg-[#6B0A1A] transition-all flex items-center gap-2 mx-auto">
                Criar Meu Perfil
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition" />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
