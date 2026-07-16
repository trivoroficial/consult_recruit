import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Users, Building2, Briefcase, TrendingUp, ArrowRight } from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-screen pt-20">
      
      {/* ===== HERO ===== */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-purple-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h1 className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
                Recrutamento & Seleção de{' '}
                <span className="text-[#8B0000]">Alta Performance</span>
              </h1>
              <p className="mt-6 text-lg text-gray-600">
                Conectamos os melhores talentos às melhores empresas. Processos seletivos 
                ágeis, inteligentes e eficientes.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link href="/cadastro">
                  <Button className="bg-[#8B0000] hover:bg-[#700000] text-white px-8 py-3 rounded-lg flex items-center gap-2">
                    Solicitar Diagnóstico <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/servicos">
                  <Button variant="outline" className="border-[#8B0000] text-[#8B0000] hover:bg-[#8B0000] hover:text-white px-8 py-3 rounded-lg">
                    Conhecer Serviços
                  </Button>
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <div className="w-12 h-12 bg-[#8B0000]/10 rounded-lg flex items-center justify-center text-[#8B0000]">
                  <Building2 className="h-6 w-6" />
                </div>
                <p className="mt-3 text-2xl font-bold text-gray-900">+200</p>
                <p className="text-sm text-gray-500">Empresas Atendidas</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <div className="w-12 h-12 bg-[#8B0000]/10 rounded-lg flex items-center justify-center text-[#8B0000]">
                  <Users className="h-6 w-6" />
                </div>
                <p className="mt-3 text-2xl font-bold text-gray-900">+5.000</p>
                <p className="text-sm text-gray-500">Candidatos Cadastrados</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <div className="w-12 h-12 bg-[#8B0000]/10 rounded-lg flex items-center justify-center text-[#8B0000]">
                  <Briefcase className="h-6 w-6" />
                </div>
                <p className="mt-3 text-2xl font-bold text-gray-900">+800</p>
                <p className="text-sm text-gray-500">Vagas Publicadas</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <div className="w-12 h-12 bg-[#8B0000]/10 rounded-lg flex items-center justify-center text-[#8B0000]">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <p className="mt-3 text-2xl font-bold text-gray-900">92%</p>
                <p className="text-sm text-gray-500">Satisfação</p>
              </div>
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
              <Button className="bg-white text-[#8B0000] hover:bg-gray-100 px-8 py-3 rounded-lg">
                Solicitar Diagnóstico
              </Button>
            </Link>
            <Link href="/contato">
              <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-3 rounded-lg">
                Falar com Especialista
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}
