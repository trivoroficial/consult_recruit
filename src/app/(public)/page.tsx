import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Users, Briefcase, TrendingUp, Shield, ArrowRight } from 'lucide-react'

export default function Home() {
  return (
    <div>
      {/* ========== SEÇÃO HERO ========== */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-purple-50 via-white to-purple-50">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2">
            
            {/* LADO ESQUERDO - TEXTO */}
            <div>
              <h1 className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
                Transformamos desafios em{' '}
                <span className="text-purple-600">estratégias de crescimento</span>
              </h1>
              <p className="mt-6 text-lg text-gray-600">
                A TRIVOR conecta gestão estratégica, tecnologia e conhecimento humano 
                para desenvolver negócios mais eficientes, preparados e competitivos.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link href="/cadastro">
                  <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                    Solicitar Diagnóstico
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/servicos">
                  <Button size="lg" variant="outline">
                    Conhecer Soluções
                  </Button>
                </Link>
              </div>

              {/* ESTATÍSTICAS */}
              <div className="mt-12 grid grid-cols-3 gap-4">
                <div>
                  <p className="text-2xl font-bold text-purple-600">15+</p>
                  <p className="text-sm text-gray-500">Anos de Experiência</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-purple-600">1000+</p>
                  <p className="text-sm text-gray-500">Profissionais Impactados</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-purple-600">90%</p>
                  <p className="text-sm text-gray-500">Satisfação</p>
                </div>
              </div>
            </div>

            {/* LADO DIREITO - IMAGEM/ILUSTRAÇÃO */}
            <div className="flex items-center justify-center">
              <div className="rounded-2xl bg-white p-8 shadow-xl">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 rounded-lg bg-purple-50 p-4">
                    <Users className="h-6 w-6 text-purple-600" />
                    <div>
                      <p className="font-semibold">+15.000</p>
                      <p className="text-sm text-gray-500">Candidatos Cadastrados</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-lg bg-purple-50 p-4">
                    <Briefcase className="h-6 w-6 text-purple-600" />
                    <div>
                      <p className="font-semibold">+500</p>
                      <p className="text-sm text-gray-500">Processos Realizados</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-lg bg-purple-50 p-4">
                    <TrendingUp className="h-6 w-6 text-purple-600" />
                    <div>
                      <p className="font-semibold">+200</p>
                      <p className="text-sm text-gray-500">Empresas Atendidas</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========== SEÇÃO SERVIÇOS ========== */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl font-bold">
            Nossas <span className="text-purple-600">Soluções</span>
          </h2>
          <p className="mt-4 text-center text-gray-600">
            Serviços estratégicos para transformar sua empresa
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            
            {/* CARD 1 - RECRUTAMENTO */}
            <div className="group rounded-xl border bg-white p-6 shadow-sm transition-all hover:shadow-lg hover:border-purple-200">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 text-purple-600 transition-colors group-hover:bg-purple-600 group-hover:text-white">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="font-semibold">Recrutamento & Seleção</h3>
              <p className="mt-2 text-sm text-gray-500">
                Busca de talentos alinhados ao perfil técnico e comportamental da sua organização.
              </p>
              <Link href="/servicos/recrutamento" className="mt-4 inline-flex items-center text-sm font-medium text-purple-600 hover:text-purple-700">
                Saiba mais <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            {/* CARD 2 - GESTÃO DE PESSOAS */}
            <div className="group rounded-xl border bg-white p-6 shadow-sm transition-all hover:shadow-lg hover:border-purple-200">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 text-purple-600 transition-colors group-hover:bg-purple-600 group-hover:text-white">
                <TrendingUp className="h-6 w-6" />
              </div>
              <h3 className="font-semibold">Gestão de Pessoas</h3>
              <p className="mt-2 text-sm text-gray-500">
                Estratégias para desenvolver equipes e fortalecer a cultura organizacional.
              </p>
              <Link href="/servicos/gestao-pessoas" className="mt-4 inline-flex items-center text-sm font-medium text-purple-600 hover:text-purple-700">
                Saiba mais <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            {/* CARD 3 - CONSULTORIA FINANCEIRA */}
            <div className="group rounded-xl border bg-white p-6 shadow-sm transition-all hover:shadow-lg hover:border-purple-200">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 text-purple-600 transition-colors group-hover:bg-purple-600 group-hover:text-white">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="font-semibold">Consultoria Financeira</h3>
              <p className="mt-2 text-sm text-gray-500">
                Estruturação financeira para empresas mais saudáveis e competitivas.
              </p>
              <Link href="/servicos/financeiro" className="mt-4 inline-flex items-center text-sm font-medium text-purple-600 hover:text-purple-700">
                Saiba mais <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            {/* CARD 4 - SEGURANÇA DOS ALIMENTOS */}
            <div className="group rounded-xl border bg-white p-6 shadow-sm transition-all hover:shadow-lg hover:border-purple-200">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 text-purple-600 transition-colors group-hover:bg-purple-600 group-hover:text-white">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="font-semibold">Segurança dos Alimentos</h3>
              <p className="mt-2 text-sm text-gray-500">
                Implementação de processos seguros e eficientes para sua indústria.
              </p>
              <Link href="/servicos/seguranca-alimentos" className="mt-4 inline-flex items-center text-sm font-medium text-purple-600 hover:text-purple-700">
                Saiba mais <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ========== SEÇÃO CTA FINAL ========== */}
      <section className="bg-purple-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white">
            Sua empresa está pronta para o próximo nível?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-purple-100">
            Conte com a TRIVOR para transformar desafios em oportunidades de crescimento.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/cadastro">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                Solicitar Diagnóstico
              </Button>
            </Link>
            <Link href="/contato">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-purple-700">
                Falar com Especialista
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
