import Link from 'next/link'
import { Users, Briefcase, TrendingUp, Shield, ArrowRight, Zap, Building2, Crown, BarChart3 } from 'lucide-react'

export default function Home() {
  return (
    <div>
      {/* ===== HERO ===== */}
      <section className="section-purple-light py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
                <Zap className="h-4 w-4" />
                Plataforma Inteligente
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
                Transformamos desafios em{' '}
                <span className="text-purple-600">estratégias de crescimento</span>
              </h1>
              <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                A TRIVOR conecta gestão estratégica, tecnologia e conhecimento humano 
                para desenvolver negócios mais eficientes, preparados e competitivos.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/cadastro">
                  <button className="btn-primary text-base">
                    Solicitar Diagnóstico
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </Link>
                <Link href="/servicos">
                  <button className="btn-secondary text-base">
                    Conhecer Soluções
                  </button>
                </Link>
              </div>

              <div className="mt-12 grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-purple-600">15+</p>
                  <p className="text-sm text-gray-500">Anos de Experiência</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-purple-600">1000+</p>
                  <p className="text-sm text-gray-500">Profissionais Impactados</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-purple-600">90%</p>
                  <p className="text-sm text-gray-500">Satisfação</p>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-200 to-yellow-200 rounded-2xl blur-2xl opacity-50"></div>
                <div className="relative bg-white rounded-2xl shadow-2xl p-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-purple-50">
                      <div className="p-3 bg-purple-100 text-purple-600 rounded-lg">
                        <Users className="h-6 w-6" />
                      </div>
                      <span className="font-semibold text-gray-800">+15.000 Candidatos</span>
                    </div>
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-purple-50">
                      <div className="p-3 bg-purple-100 text-purple-600 rounded-lg">
                        <Building2 className="h-6 w-6" />
                      </div>
                      <span className="font-semibold text-gray-800">+200 Empresas</span>
                    </div>
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-yellow-50 border border-yellow-200">
                      <div className="p-3 bg-yellow-100 text-yellow-600 rounded-lg">
                        <Briefcase className="h-6 w-6" />
                      </div>
                      <span className="font-semibold text-gray-800">+500 Processos</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SERVIÇOS ===== */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <span className="text-sm font-semibold text-purple-600 uppercase tracking-wider">Soluções</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">
              Nossos <span className="text-purple-600">Serviços</span>
            </h2>
            <div className="divider-gold mt-4"></div>
            <p className="subtitle mt-4">
              Serviços estratégicos para transformar sua empresa
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="card-premium hover:border-purple-300">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 bg-purple-100 text-purple-600 group-hover:bg-purple-200 transition">
                <Users className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-bold">Recrutamento & Seleção</h3>
              <p className="mt-2 text-sm text-gray-500">Busca de talentos alinhados ao perfil da sua organização.</p>
              <Link href="/servicos" className="mt-4 inline-flex items-center text-sm font-semibold text-purple-600 hover:text-purple-800 transition-all">
                Saiba mais <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>

            <div className="card-premium hover:border-purple-300">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 bg-purple-100 text-purple-600 transition">
                <BarChart3 className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-bold">Gestão de Pessoas</h3>
              <p className="mt-2 text-sm text-gray-500">Estratégias para desenvolver equipes e cultura.</p>
              <Link href="/servicos" className="mt-4 inline-flex items-center text-sm font-semibold text-purple-600 hover:text-purple-800 transition-all">
                Saiba mais <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>

            <div className="card-premium hover:border-yellow-400 border-yellow-200">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 bg-yellow-100 text-yellow-600 transition">
                <TrendingUp className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-bold">Consultoria Financeira</h3>
              <p className="mt-2 text-sm text-gray-500">Estruturação financeira para empresas competitivas.</p>
              <Link href="/servicos" className="mt-4 inline-flex items-center text-sm font-semibold text-yellow-600 hover:text-yellow-800 transition-all">
                Saiba mais <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>

            <div className="card-premium hover:border-purple-300">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 bg-purple-100 text-purple-600 transition">
                <Shield className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-bold">Segurança dos Alimentos</h3>
              <p className="mt-2 text-sm text-gray-500">Processos seguros e eficientes para sua indústria.</p>
              <Link href="/servicos" className="mt-4 inline-flex items-center text-sm font-semibold text-purple-600 hover:text-purple-800 transition-all">
                Saiba mais <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== IA TRIVOR ===== */}
      <section className="py-20 bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <Crown className="h-10 w-10 text-yellow-400 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold">
              Tecnologia <span className="text-yellow-400">Inteligente</span>
            </h2>
            <div className="divider-gold mt-4"></div>
            <p className="mt-4 text-purple-200 max-w-2xl mx-auto">
              A inteligência artificial acelerando processos. A decisão continua sendo humana.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-purple-400 transition">
              <Zap className="h-8 w-8 text-yellow-400 mb-4" />
              <h3 className="text-lg font-semibold">Análise de Currículos</h3>
              <p className="mt-2 text-sm text-purple-200">Leitura automática de PDFs e extração de informações</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-purple-400 transition">
              <BarChart3 className="h-8 w-8 text-yellow-400 mb-4" />
              <h3 className="text-lg font-semibold">Matching Inteligente</h3>
              <p className="mt-2 text-sm text-purple-200">Compatibilidade entre candidatos e vagas com IA</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-purple-400 transition">
              <Crown className="h-8 w-8 text-yellow-400 mb-4" />
              <h3 className="text-lg font-semibold">Ranking de Talentos</h3>
              <p className="mt-2 text-sm text-purple-200">Classificação automática dos melhores candidatos</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA FINAL ===== */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-purple-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Sua empresa está pronta para o próximo nível?
          </h2>
          <p className="mt-4 text-purple-200 max-w-2xl mx-auto">
            Conte com a TRIVOR para transformar desafios em oportunidades de crescimento.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/cadastro">
              <button className="bg-white text-purple-600 hover:bg-gray-100 font-semibold px-8 py-3 rounded-lg shadow-lg shadow-purple-300 transition-all hover:shadow-xl hover:-translate-y-1">
                Solicitar Diagnóstico
              </button>
            </Link>
            <Link href="/contato">
              <button className="border-2 border-white text-white hover:bg-purple-700 font-semibold px-8 py-3 rounded-lg transition-all hover:-translate-y-1">
                Falar com Especialista
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
