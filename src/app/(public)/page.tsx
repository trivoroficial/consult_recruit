import Link from 'next/link'
import { ArrowRight, Shield, TrendingUp, Users, Zap, Building2, Award, Crown, CheckCircle, BarChart3, Briefcase, Sparkles } from 'lucide-react'

export default function Home() {
  return (
    <div>
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden bg-[#FDFCFB] py-24 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-[#8E7AB5]/5 via-transparent to-[#5C6347]/5"></div>
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[#8E7AB5]/5 rounded-full blur-3xl"></div>
        <div className="container mx-auto px-4 relative">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#5C6347] text-white rounded-full text-sm font-medium mb-6">
                <Sparkles className="h-4 w-4 text-[#B8A9D4]" />
                Estratégia & Inteligência
              </div>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-[#2D3121]">
                Transforme seu negócio com{' '}
                <span className="text-[#8E7AB5]">inteligência estratégica</span>
              </h1>
              <p className="mt-6 text-lg text-[#5C6347] leading-relaxed max-w-lg">
                A TRIVOR conecta gestão estratégica, tecnologia e inteligência humana 
                para construir organizações mais eficientes, preparadas e competitivas.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/cadastro">
                  <button className="btn-primary btn-lg">
                    Comece Agora
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </Link>
                <Link href="/servicos">
                  <button className="btn-outline btn-lg">
                    Conheça Mais
                  </button>
                </Link>
              </div>

              <div className="mt-12 grid grid-cols-3 gap-6">
                <div>
                  <p className="text-3xl font-bold text-[#2D3121]">15+</p>
                  <p className="text-sm text-[#5C6347]">Anos de Experiência</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-[#2D3121]">1.000+</p>
                  <p className="text-sm text-[#5C6347]">Executivos Impactados</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-[#8E7AB5]">96%</p>
                  <p className="text-sm text-[#5C6347]">Taxa de Satisfação</p>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute -inset-6 bg-gradient-to-r from-[#8E7AB5]/20 to-[#5C6347]/20 rounded-2xl blur-3xl"></div>
                <div className="relative bg-white rounded-2xl shadow-2xl p-8 border border-[#F0F0ED]">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-[#F5F2FA] border border-[#EBE5F4]">
                      <div className="p-3 bg-[#8E7AB5] text-white rounded-lg">
                        <Users className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-semibold text-[#2D3121]">+15.000</p>
                        <p className="text-sm text-[#5C6347]">Talentos Cadastrados</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-[#F4F5F0] border border-[#E8EAE0]">
                      <div className="p-3 bg-[#5C6347] text-white rounded-lg">
                        <Building2 className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-semibold text-[#2D3121]">+200</p>
                        <p className="text-sm text-[#5C6347]">Empresas Atendidas</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-[#FDF6E3] border border-[#8E7AB5]/30">
                      <div className="p-3 bg-[#8E7AB5] text-white rounded-lg">
                        <Briefcase className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-semibold text-[#2D3121]">+500</p>
                        <p className="text-sm text-[#5C6347]">Projetos Realizados</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== POR QUE TRIVOR ===== */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-sm font-semibold text-[#8E7AB5] uppercase tracking-wider">Por que TRIVOR</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mt-2 text-[#2D3121]">
              Excelência <span className="text-[#5C6347]">Estratégica</span>
            </h2>
            <div className="divider-lilas mt-4"></div>
            <p className="subtitle mt-4">
              Combinamos consultoria estratégica, insights de IA e expertise humana 
              para entregar resultados mensuráveis para organizações globais.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            <div className="text-center p-8">
              <div className="w-16 h-16 bg-[#5C6347] rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[#2D3121]">Liderança Estratégica</h3>
              <p className="mt-3 text-[#5C6347] text-sm">
                Decisões baseadas em dados para executivos e estratégia de alto nível.
              </p>
            </div>

            <div className="text-center p-8 border-x border-[#F0F0ED]">
              <div className="w-16 h-16 bg-[#8E7AB5] rounded-2xl flex items-center justify-center mx-auto mb-6">
                <BarChart3 className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[#2D3121]">Inteligência Artificial</h3>
              <p className="mt-3 text-[#5C6347] text-sm">
                Análises avançadas e machine learning para vantagem competitiva.
              </p>
            </div>

            <div className="text-center p-8">
              <div className="w-16 h-16 bg-[#2D3121] rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Award className="h-8 w-8 text-[#8E7AB5]" />
              </div>
              <h3 className="text-xl font-semibold text-[#2D3121]">Excelência Global</h3>
              <p className="mt-3 text-[#5C6347] text-sm">
                Padrões internacionais e melhores práticas para crescimento empresarial.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SERVIÇOS ===== */}
      <section className="py-24 bg-[#FDFCFB]">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-sm font-semibold text-[#8E7AB5] uppercase tracking-wider">Serviços</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mt-2 text-[#2D3121]">
              Soluções <span className="text-[#5C6347]">Executivas</span>
            </h2>
            <div className="divider-lilas mt-4"></div>
            <p className="subtitle mt-4">
              Serviços abrangentes projetados para organizações que buscam vantagem competitiva.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="card-premium group">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 bg-[#5C6347] text-white transition group-hover:bg-[#8E7AB5]">
                <Users className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-bold text-[#2D3121]">Executive Search</h3>
              <p className="mt-2 text-sm text-[#5C6347]">
                Aquisição de talentos C-level para organizações globais.
              </p>
              <Link href="/servicos" className="mt-4 inline-flex items-center text-sm font-semibold text-[#8E7AB5] hover:text-[#726191] transition-all">
                Saiba Mais <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>

            <div className="card-premium group">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 bg-[#5C6347] text-white transition group-hover:bg-[#8E7AB5]">
                <TrendingUp className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-bold text-[#2D3121]">Estratégia de Pessoas</h3>
              <p className="mt-2 text-sm text-[#5C6347]">
                Cultura organizacional, desenvolvimento de liderança e retenção de talentos.
              </p>
              <Link href="/servicos" className="mt-4 inline-flex items-center text-sm font-semibold text-[#8E7AB5] hover:text-[#726191] transition-all">
                Saiba Mais <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>

            <div className="card-premium group">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 bg-[#5C6347] text-white transition group-hover:bg-[#8E7AB5]">
                <BarChart3 className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-bold text-[#2D3121]">Consultoria Financeira</h3>
              <p className="mt-2 text-sm text-[#5C6347]">
                Planejamento financeiro estratégico e otimização de performance.
              </p>
              <Link href="/servicos" className="mt-4 inline-flex items-center text-sm font-semibold text-[#8E7AB5] hover:text-[#726191] transition-all">
                Saiba Mais <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>

            <div className="card-premium group">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 bg-[#5C6347] text-white transition group-hover:bg-[#8E7AB5]">
                <Shield className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-bold text-[#2D3121]">Risco & Compliance</h3>
              <p className="mt-2 text-sm text-[#5C6347]">
                Gerenciamento de riscos empresariais e soluções de conformidade.
              </p>
              <Link href="/servicos" className="mt-4 inline-flex items-center text-sm font-semibold text-[#8E7AB5] hover:text-[#726191] transition-all">
                Saiba Mais <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TECNOLOGIA ===== */}
      <section className="py-24 bg-[#2D3121] text-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <Crown className="h-10 w-10 text-[#8E7AB5] mx-auto mb-4" />
            <h2 className="font-serif text-3xl md:text-4xl font-bold">
              Inteligência <span className="text-[#8E7AB5]">Impulsionada por IA</span>
            </h2>
            <div className="w-16 h-0.5 bg-[#8E7AB5] rounded-full mx-auto mt-4"></div>
            <p className="mt-4 text-[#B8A9D4] max-w-2xl mx-auto">
              A tecnologia acelera processos. As decisões humanas conduzem a estratégia.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:border-[#8E7AB5]/50 transition">
              <Zap className="h-8 w-8 text-[#8E7AB5] mb-4" />
              <h3 className="text-lg font-semibold">Análise de Currículos</h3>
              <p className="mt-2 text-sm text-[#B8A9D4]">
                Extração e avaliação automática de currículos com IA.
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:border-[#8E7AB5]/50 transition">
              <CheckCircle className="h-8 w-8 text-[#8E7AB5] mb-4" />
              <h3 className="text-lg font-semibold">Matching Inteligente</h3>
              <p className="mt-2 text-sm text-[#B8A9D4]">
                Pontuação de compatibilidade entre candidatos e vagas.
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:border-[#8E7AB5]/50 transition">
              <Award className="h-8 w-8 text-[#8E7AB5] mb-4" />
              <h3 className="text-lg font-semibold">Insights Executivos</h3>
              <p className="mt-2 text-sm text-[#B8A9D4]">
                Dashboards para tomada de decisão estratégica.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA FINAL ===== */}
      <section className="py-20 bg-gradient-to-r from-[#5C6347] to-[#4A5039]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white">
            Pronto para Transformar sua Organização?
          </h2>
          <p className="mt-4 text-[#D1D5C1] max-w-2xl mx-auto">
            Junte-se aos executivos que confiam na TRIVOR para excelência estratégica.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/cadastro">
              <button className="btn-lilas btn-lg">
                Comece Agora
              </button>
            </Link>
            <Link href="/contato">
              <button className="btn-outline btn-lg border-white text-white hover:bg-white hover:text-[#2D3121]">
                Fale Conosco
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
