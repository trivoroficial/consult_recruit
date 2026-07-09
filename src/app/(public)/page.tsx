import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { 
  Users, Briefcase, TrendingUp, Shield, 
  ArrowRight, Star, Award, Crown, 
  Zap, BarChart3, Building2, CheckCircle 
} from 'lucide-react'

export default function Home() {
  return (
    <div>
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden section-purple-light py-20 md:py-32">
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
                  <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-200 hover:shadow-purple-300">
                    Solicitar Diagnóstico
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/servicos">
                  <Button size="lg" variant="outline" className="border-2 border-purple-600 text-purple-600 hover:bg-purple-50">
                    Conhecer Soluções
                  </Button>
                </Link>
              </div>

              {/* Stats */}
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
                    {[
                      { icon: Users, label: '+15.000 Candidatos', color: 'purple' },
                      { icon: Building2, label: '+200 Empresas', color: 'purple' },
                      { icon: Briefcase, label: '+500 Processos', color: 'gold' },
                    ].map((item, i) => (
                      <div key={i} className={`flex items-center gap-4 p-4 rounded-xl ${item.color === 'gold' ? 'bg-yellow-50 border border-yellow-200' : 'bg-purple-50'}`}>
                        <div className={`p-3 rounded-lg ${item.color === 'gold' ? 'bg-yellow-100 text-yellow-600' : 'bg-purple-100 text-purple-600'}`}>
                          <item.icon className="h-6 w-6" />
                        </div>
                        <span className="font-semibold text-gray-800">{item.label}</span>
                      </div>
                    ))}
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
            {[
              { icon: Users, title: 'Recrutamento & Seleção', desc: 'Busca de talentos alinhados ao perfil da sua organização.', color: 'purple' },
              { icon: BarChart3, title: 'Gestão de Pessoas', desc: 'Estratégias para desenvolver equipes e cultura.', color: 'purple' },
              { icon: TrendingUp, title: 'Consultoria Financeira', desc: 'Estruturação financeira para empresas competitivas.', color: 'gold' },
              { icon: Shield, title: 'Segurança dos Alimentos', desc: 'Processos seguros e eficientes para sua indústria.', color: 'purple' },
            ].map((item, index) => (
              <div key={index} className={`card-premium group ${item.color === 'gold' ? 'border-yellow-200 hover:border-yellow-400' : 'hover:border-purple-300'}`}>
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${item.color === 'gold' ? 'bg-yellow-100 text-yellow-600 group-hover:bg-yellow-200' : 'bg-purple-100 text-purple-600 group-hover:bg-purple-200'} transition`}>
                  <item.icon className="h-7 w-7" />
                </div>
                <h3 className="text-lg font-bold">{item.title}</h3>
                <p className="mt-2 text-sm text-gray-500">{item.desc}</p>
                <Link href="/servicos" className="mt-4 inline-flex items-center text-sm font-semibold text-purple-600 hover:text-purple-800 group-hover:gap-2 transition-all">
                  Saiba mais <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
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
            <div className="w-20 h-1 bg-yellow-400 rounded-full mx-auto mt-4"></div>
            <p className="mt-4 text-purple-200 max-w-2xl mx-auto">
              A inteligência artificial acelerando processos. A decisão continua sendo humana.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { icon: Zap, title: 'Análise de Currículos', desc: 'Leitura automática de PDFs e extração de informações' },
              { icon: Star, title: 'Matching Inteligente', desc: 'Compatibilidade entre candidatos e vagas com IA' },
              { icon: Award, title: 'Ranking de Talentos', desc: 'Classificação automática dos melhores candidatos' },
            ].map((item, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-purple-400 transition">
                <item.icon className="h-8 w-8 text-yellow-400 mb-4" />
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-purple-200">{item.desc}</p>
              </div>
            ))}
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
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 shadow-lg shadow-purple-300">
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
