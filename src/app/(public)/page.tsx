import Link from 'next/link'
import { ArrowRight, Shield, TrendingUp, Users, Zap, Building2, Award, Crown, CheckCircle, BarChart3, Briefcase } from 'lucide-react'

export default function Home() {
  return (
    <div>
      {/* ===== HERO PREMIUM ===== */}
      <section className="relative overflow-hidden bg-[#F8F7F4] py-24 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A]/5 via-transparent to-[#C9A84C]/5"></div>
        <div className="container mx-auto px-4 relative">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            {/* LADO ESQUERDO */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#0F172A] text-white rounded-full text-sm font-medium mb-6">
                <Zap className="h-4 w-4 text-[#C9A84C]" />
                Executive Strategy Platform
              </div>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-[#0F172A]">
                Transform Your Business{' '}
                <span className="text-[#C9A84C]">with Strategic Intelligence</span>
              </h1>
              <p className="mt-6 text-lg text-[#334155] leading-relaxed max-w-lg">
                TRIVOR connects strategic management, technology, and human intelligence 
                to build more efficient, prepared, and competitive organizations.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/cadastro">
                  <button className="btn-primary btn-lg">
                    Get Started
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </Link>
                <Link href="/servicos">
                  <button className="btn-outline-gold btn-lg">
                    Learn More
                  </button>
                </Link>
              </div>

              {/* STATS */}
              <div className="mt-12 grid grid-cols-3 gap-6">
                <div>
                  <p className="text-3xl font-bold text-[#0F172A]">15+</p>
                  <p className="text-sm text-[#334155]">Years Experience</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-[#0F172A]">1,000+</p>
                  <p className="text-sm text-[#334155]">Executives Impacted</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-[#C9A84C]">96%</p>
                  <p className="text-sm text-[#334155]">Satisfaction Rate</p>
                </div>
              </div>
            </div>

            {/* LADO DIREITO */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute -inset-6 bg-gradient-to-r from-[#C9A84C]/20 to-[#0F172A]/20 rounded-2xl blur-3xl"></div>
                <div className="relative bg-white rounded-2xl shadow-2xl p-8 border border-[#F1F1EF]">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-[#F8F7F4] border border-[#F1F1EF]">
                      <div className="p-3 bg-[#0F172A] text-[#C9A84C] rounded-lg">
                        <Users className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-semibold text-[#0F172A]">+15,000</p>
                        <p className="text-sm text-[#334155]">Talents Registered</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-[#F8F7F4] border border-[#F1F1EF]">
                      <div className="p-3 bg-[#0F172A] text-[#C9A84C] rounded-lg">
                        <Building2 className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-semibold text-[#0F172A]">+200</p>
                        <p className="text-sm text-[#334155]">Companies Served</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-[#FDF6E3] border border-[#C9A84C]/30">
                      <div className="p-3 bg-[#C9A84C] text-white rounded-lg">
                        <Briefcase className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-semibold text-[#0F172A]">+500</p>
                        <p className="text-sm text-[#334155]">Projects Delivered</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHY TRIVOR ===== */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-sm font-semibold text-[#C9A84C] uppercase tracking-wider">Why TRIVOR</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mt-2 text-[#0F172A]">
              Built for <span className="text-[#C9A84C]">Executive Excellence</span>
            </h2>
            <div className="divider-gold mt-4"></div>
            <p className="subtitle mt-4">
              We combine strategic consulting, AI-driven insights, and human expertise 
              to deliver measurable results for global organizations.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            <div className="text-center p-8">
              <div className="w-16 h-16 bg-[#0F172A] rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-[#C9A84C]" />
              </div>
              <h3 className="text-xl font-semibold text-[#0F172A]">Strategic Leadership</h3>
              <p className="mt-3 text-[#334155] text-sm">
                Data-driven decisions for C-suite executives and board-level strategy.
              </p>
            </div>

            <div className="text-center p-8 border-x border-[#F1F1EF]">
              <div className="w-16 h-16 bg-[#0F172A] rounded-2xl flex items-center justify-center mx-auto mb-6">
                <BarChart3 className="h-8 w-8 text-[#C9A84C]" />
              </div>
              <h3 className="text-xl font-semibold text-[#0F172A]">AI Intelligence</h3>
              <p className="mt-3 text-[#334155] text-sm">
                Advanced analytics and machine learning for competitive advantage.
              </p>
            </div>

            <div className="text-center p-8">
              <div className="w-16 h-16 bg-[#0F172A] rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Award className="h-8 w-8 text-[#C9A84C]" />
              </div>
              <h3 className="text-xl font-semibold text-[#0F172A]">Global Excellence</h3>
              <p className="mt-3 text-[#334155] text-sm">
                International standards and best practices for enterprise growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section className="py-24 bg-[#F8F7F4]">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-sm font-semibold text-[#C9A84C] uppercase tracking-wider">Services</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mt-2 text-[#0F172A]">
              Executive <span className="text-[#C9A84C]">Solutions</span>
            </h2>
            <div className="divider-gold mt-4"></div>
            <p className="subtitle mt-4">
              Comprehensive services designed for organizations seeking competitive advantage.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="card-premium group">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 bg-[#0F172A] text-[#C9A84C] transition group-hover:bg-[#C9A84C] group-hover:text-white">
                <Users className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-bold text-[#0F172A]">Executive Search</h3>
              <p className="mt-2 text-sm text-[#334155]">
                C-suite and board-level talent acquisition for global organizations.
              </p>
              <Link href="/servicos" className="mt-4 inline-flex items-center text-sm font-semibold text-[#C9A84C] hover:text-[#B8963A] transition-all">
                Learn More <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>

            <div className="card-premium group">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 bg-[#0F172A] text-[#C9A84C] transition group-hover:bg-[#C9A84C] group-hover:text-white">
                <TrendingUp className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-bold text-[#0F172A]">People Strategy</h3>
              <p className="mt-2 text-sm text-[#334155]">
                Organizational culture, leadership development, and talent retention.
              </p>
              <Link href="/servicos" className="mt-4 inline-flex items-center text-sm font-semibold text-[#C9A84C] hover:text-[#B8963A] transition-all">
                Learn More <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>

            <div className="card-premium group">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 bg-[#0F172A] text-[#C9A84C] transition group-hover:bg-[#C9A84C] group-hover:text-white">
                <BarChart3 className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-bold text-[#0F172A]">Financial Advisory</h3>
              <p className="mt-2 text-sm text-[#334155]">
                Strategic financial planning, M&A support, and performance optimization.
              </p>
              <Link href="/servicos" className="mt-4 inline-flex items-center text-sm font-semibold text-[#C9A84C] hover:text-[#B8963A] transition-all">
                Learn More <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>

            <div className="card-premium group">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 bg-[#0F172A] text-[#C9A84C] transition group-hover:bg-[#C9A84C] group-hover:text-white">
                <Shield className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-bold text-[#0F172A]">Risk & Compliance</h3>
              <p className="mt-2 text-sm text-[#334155]">
                Enterprise risk management and regulatory compliance solutions.
              </p>
              <Link href="/servicos" className="mt-4 inline-flex items-center text-sm font-semibold text-[#C9A84C] hover:text-[#B8963A] transition-all">
                Learn More <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TECHNOLOGY ===== */}
      <section className="py-24 bg-[#0F172A] text-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <Crown className="h-10 w-10 text-[#C9A84C] mx-auto mb-4" />
            <h2 className="font-serif text-3xl md:text-4xl font-bold">
              AI-Powered <span className="text-[#C9A84C]">Intelligence</span>
            </h2>
            <div className="w-16 h-0.5 bg-[#C9A84C] rounded-full mx-auto mt-4"></div>
            <p className="mt-4 text-[#94A3B8] max-w-2xl mx-auto">
              Technology accelerates processes. Human decisions drive strategy.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:border-[#C9A84C]/50 transition">
              <Zap className="h-8 w-8 text-[#C9A84C] mb-4" />
              <h3 className="text-lg font-semibold">Resume Intelligence</h3>
              <p className="mt-2 text-sm text-[#94A3B8]">
                AI-powered resume parsing and candidate evaluation.
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:border-[#C9A84C]/50 transition">
              <CheckCircle className="h-8 w-8 text-[#C9A84C] mb-4" />
              <h3 className="text-lg font-semibold">Smart Matching</h3>
              <p className="mt-2 text-sm text-[#94A3B8]">
                Intelligent candidate-job compatibility scoring.
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:border-[#C9A84C]/50 transition">
              <Award className="h-8 w-8 text-[#C9A84C] mb-4" />
              <h3 className="text-lg font-semibold">Executive Insights</h3>
              <p className="mt-2 text-sm text-[#94A3B8]">
                Data-driven dashboards for strategic decision-making.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA FINAL ===== */}
      <section className="py-20 bg-gradient-to-r from-[#0F172A] to-[#1E293B]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white">
            Ready to Transform Your Organization?
          </h2>
          <p className="mt-4 text-[#94A3B8] max-w-2xl mx-auto">
            Join leading executives who trust TRIVOR for strategic excellence.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/cadastro">
              <button className="btn-gold btn-lg">
                Start Your Journey
              </button>
            </Link>
            <Link href="/contato">
              <button className="btn-outline btn-lg border-white text-white hover:bg-white hover:text-[#0F172A]">
                Contact Us
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
