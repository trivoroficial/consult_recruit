// src/app/(public)/page.tsx
'use client'

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, type FormEvent, useEffect } from "react";
import Link from 'next/link'
import { 
  ArrowRight, Users, TrendingUp, Target, Lightbulb, 
  CheckCircle, ChevronRight, Zap, BarChart3, Layers, Phone,
  DollarSign, Building2, Shield, Settings, Briefcase, ClipboardList, Rocket,
  ChevronLeft, ChevronRight as ChevronRightIcon, Briefcase as BriefcaseIcon,
  MapPin, Clock, Star, Building, Users as UsersIcon
} from 'lucide-react'

const whatsappNumber = "5537991177058";
const whatsappDisplay = "+55 37 99117-7058";
const whatsappMessage = "Olá! Gostaria de conhecer as soluções da ZENTHOS.";
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
const emailContato = "contato@zenthos.com.br";

// ===== VAGAS DESTAQUE =====
const vagasDestaque = [
  {
    id: 1,
    titulo: 'Analista Administrativo',
    empresa: 'Empresa XPTO',
    local: 'Uberlândia/MG',
    tipo: 'Presencial',
    badge: 'Urgente',
    badgeColor: 'bg-red-500',
    descricao: 'Atuação em rotinas administrativas, controle documental e suporte operacional.'
  },
  {
    id: 2,
    titulo: 'Auxiliar de RH',
    empresa: 'Indústria ABC',
    local: 'Uberlândia/MG',
    tipo: 'Híbrido',
    badge: 'Destaque',
    badgeColor: 'bg-yellow-500',
    descricao: 'Apoio aos processos de recrutamento, seleção e gestão de pessoas.'
  },
  {
    id: 3,
    titulo: 'Assistente Financeiro',
    empresa: 'Grupo Financeiro',
    local: 'Uberlândia/MG',
    tipo: 'Presencial',
    badge: 'Novo',
    badgeColor: 'bg-green-500',
    descricao: 'Controle de fluxo de caixa, contas a pagar e receber, relatórios financeiros.'
  },
  {
    id: 4,
    titulo: 'Supervisor de Produção',
    empresa: 'Indústria XYZ',
    local: 'Uberlândia/MG',
    tipo: 'Presencial',
    badge: 'Premium',
    badgeColor: 'bg-purple-500',
    descricao: 'Liderança de equipe, planejamento de produção e controle de qualidade.'
  },
]

// ===== SERVIÇOS =====
const servicos = [
  {
    icon: Users,
    title: "Gestão de Pessoas",
    description: "Soluções completas para gestão de pessoas, cultura e desenvolvimento organizacional.",
    features: ["Recrutamento e Seleção", "Treinamentos", "Avaliação de desempenho", "Plano de cargos e salários"]
  },
  {
    icon: DollarSign,
    title: "Consultoria Financeira",
    description: "Organização financeira para aumentar a lucratividade e sustentabilidade do negócio.",
    features: ["Fluxo de caixa", "Formação de preço", "Controle de custos", "Indicadores financeiros"]
  },
  {
    icon: Shield,
    title: "Segurança dos Alimentos",
    description: "Adequação às normas sanitárias e implantação de Boas Práticas de Fabricação.",
    features: ["Manual de Boas Práticas", "POPs", "Treinamentos", "Auditorias internas"]
  },
  {
    icon: Building2,
    title: "Gestão Empresarial",
    description: "Diagnóstico e planejamento estratégico para crescimento sustentável.",
    features: ["Diagnóstico empresarial", "Planejamento estratégico", "Definição de metas", "Indicadores (KPIs)"]
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

export default function HomePage() {
  const [formState, setFormState] = useState({ nome: "", telefone: "", empresa: "", email: "", mensagem: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const overlayY = useTransform(scrollYProgress, [0, 1], [0, 65]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % vagasDestaque.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % vagasDestaque.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + vagasDestaque.length) % vagasDestaque.length);
  };

  const submitContact = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormStatus("sending");
    setTimeout(() => {
      setFormStatus("success");
      setFormState({ nome: "", telefone: "", empresa: "", email: "", mensagem: "" });
      setTimeout(() => setFormStatus("idle"), 4000);
    }, 1500);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      
      {/* ===== HERO ===== */}
      <section ref={heroRef} id="home" className="relative flex min-h-[90vh] items-center overflow-hidden pt-20 bg-[#F8F4E6]">
        <div className="absolute inset-0">
          <img src="/recrutamento.png" alt="ZENTHOS" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#2D343A]/85 via-[#2D343A]/60 to-[#2D343A]/20"></div>
        </div>

        <motion.div className="relative z-10 mx-auto flex w-full max-w-7xl px-4 sm:px-6 lg:px-8" style={{ y: overlayY }}>
          <div className="max-w-4xl space-y-8 py-12 lg:py-20">
            <motion.div className="inline-flex items-center gap-3 px-4 py-2 text-[11px] tracking-[0.34em] text-[#E3C9A8] uppercase font-medium border border-[#E3C9A8]/30 rounded-full bg-white/10 backdrop-blur-sm" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <span className="h-2 w-2 rounded-full bg-[#E3C9A8]" />
              Gestão, Estratégia & Transformação
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.8 }}>
              <h1 className="font-serif text-5xl leading-[1.05] text-white sm:text-6xl lg:text-7xl">
                Transformamos empresas através da <br className="hidden sm:block" />
                <span className="text-[#E3C9A8]">Gestão, Estratégia e Transformação</span>
              </h1>
            </motion.div>

            <motion.p className="max-w-2xl text-lg leading-8 text-white/85 md:text-xl" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.85 }}>
              Ajudamos empresas a crescer por meio da melhoria de processos, desenvolvimento humano, tecnologia e inteligência organizacional.
            </motion.p>

            <motion.div className="flex flex-col gap-4 sm:flex-row" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.85 }}>
              <Link href="/cadastro">
                <button className="relative px-8 py-3.5 text-sm font-medium tracking-wider text-white bg-[#8B0000] rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
                  <span className="relative z-10 flex items-center gap-2">
                    Solicitar Diagnóstico <ArrowRight className="h-4 w-4" />
                  </span>
                  <span className="absolute inset-0 bg-[#E3C9A8] transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                </button>
              </Link>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="relative px-8 py-3.5 text-sm font-medium tracking-wider text-white border border-white/40 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
                <span className="relative z-10 flex items-center gap-2">
                  <Phone className="h-4 w-4" /> Falar com Especialista
                </span>
                <span className="absolute inset-0 bg-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
              </a>
            </motion.div>

            <motion.div className="flex gap-8 text-white/80" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              <div><span className="text-2xl font-bold text-[#E3C9A8]">15+</span> <span className="text-sm">Anos de Mercado</span></div>
              <div><span className="text-2xl font-bold text-[#E3C9A8]">500+</span> <span className="text-sm">Empresas Atendidas</span></div>
              <div><span className="text-2xl font-bold text-[#E3C9A8]">96%</span> <span className="text-sm">Satisfação</span></div>
            </motion.div>
          </div>
        </motion.div>
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#F8F4E6] to-transparent" />
      </section>

      {/* ===== CARROSSEL ===== */}
      <section className="py-16 bg-white border-y border-[#E8EAE0]">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-[#8B0000] uppercase tracking-wider">Oportunidades</span>
                <span className="h-px w-12 bg-[#8B0000]"></span>
              </div>
              <h2 className="text-3xl font-bold text-[#2D343A] mt-1">
                Vagas em <span className="text-[#8B0000]">Destaque</span>
              </h2>
              <p className="text-sm text-[#708090] mt-1">Oportunidades estratégicas para sua carreira</p>
            </div>
            <Link href="/candidato/vagas" className="group flex items-center gap-2 text-sm font-medium text-[#8B0000] hover:text-[#700000] transition">
              Ver todas as vagas
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-2xl">
              <div 
                className="flex transition-transform duration-700 ease-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {vagasDestaque.map((vaga) => (
                  <div key={vaga.id} className="w-full flex-shrink-0 px-1">
                    <div className="relative bg-gradient-to-br from-white to-[#F8F4E6] rounded-2xl p-8 border border-[#E8EAE0] shadow-sm hover:shadow-xl transition-all duration-500 group">
                      <div className="absolute top-4 right-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white shadow-lg ${vaga.badgeColor}`}>
                          {vaga.badge}
                        </span>
                      </div>

                      <div className="flex flex-col md:flex-row md:items-center gap-6">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-[#8B0000]/10 rounded-lg">
                              <BriefcaseIcon className="h-5 w-5 text-[#8B0000]" />
                            </div>
                            <h3 className="text-2xl font-bold text-[#2D343A] group-hover:text-[#8B0000] transition">
                              {vaga.titulo}
                            </h3>
                          </div>
                          
                          <p className="text-lg font-semibold text-[#2D343A]">{vaga.empresa}</p>
                          
                          <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-[#708090]">
                            <span className="flex items-center gap-1.5">
                              <MapPin className="h-4 w-4" />
                              {vaga.local}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Clock className="h-4 w-4" />
                              {vaga.tipo}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <UsersIcon className="h-4 w-4" />
                              12 candidatos
                            </span>
                          </div>

                          <p className="mt-3 text-sm text-[#708090] leading-relaxed max-w-2xl">
                            {vaga.descricao}
                          </p>
                        </div>

                        <div className="flex-shrink-0">
                          <Link href="/candidato/vagas">
                            <button className="group/btn relative px-8 py-3.5 bg-[#8B0000] text-white font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5">
                              <span className="relative z-10 flex items-center gap-2">
                                Candidatar-se
                                <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                              </span>
                              <span className="absolute inset-0 bg-[#E3C9A8] transform translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></span>
                            </button>
                          </Link>
                        </div>
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8B0000] via-[#E3C9A8] to-[#8B0000] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button 
              onClick={prevSlide}
              className="absolute -left-4 top-1/2 -translate-y-1/2 p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-[#F8F4E6] border border-[#E8EAE0] hover:border-[#8B0000] group"
            >
              <ChevronLeft className="h-5 w-5 text-[#2D343A] group-hover:text-[#8B0000] transition" />
            </button>
            <button 
              onClick={nextSlide}
              className="absolute -right-4 top-1/2 -translate-y-1/2 p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-[#F8F4E6] border border-[#E8EAE0] hover:border-[#8B0000] group"
            >
              <ChevronRightIcon className="h-5 w-5 text-[#2D343A] group-hover:text-[#8B0000] transition" />
            </button>

            <div className="flex justify-center gap-2 mt-6">
              {vagasDestaque.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    currentSlide === index 
                      ? 'w-10 bg-[#8B0000] shadow-md shadow-[#8B0000]/30' 
                      : 'w-3 bg-[#E8EAE0] hover:bg-[#8B0000]/40'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-4">
            <span className="text-xs text-[#708090]">
              {currentSlide + 1} de {vagasDestaque.length} vagas em destaque
            </span>
          </div>
        </div>
      </section>

      {/* ===== SERVIÇOS ===== */}
      <section id="servicos" className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-xs tracking-[0.36em] text-[#8B0000] uppercase font-medium">O que fazemos</p>
            <h2 className="mt-4 font-serif text-4xl text-[#2D343A] md:text-5xl">Nossos <span className="text-[#8B0000]">Serviços</span></h2>
            <div className="w-16 h-1 bg-[#8B0000] rounded-full mx-auto mt-4"></div>
            <p className="mt-4 text-[#708090] max-w-2xl mx-auto">Soluções completas para transformar sua organização</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {servicos.map((servico, index) => {
              const Icon = servico.icon
              return (
                <motion.div key={index} className="group relative bg-white border border-[#F8F4E6] rounded-xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp}>
                  <div className="absolute top-0 left-0 w-full h-1 bg-[#8B0000] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 bg-[#F8F4E6] text-[#8B0000] group-hover:bg-[#8B0000] group-hover:text-white transition-colors duration-300">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-bold text-[#2D343A] group-hover:text-[#8B0000] transition-colors">{servico.title}</h3>
                  <p className="mt-3 text-sm text-[#708090] leading-relaxed">{servico.description}</p>
                  <ul className="mt-6 space-y-2">
                    {servico.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-[#708090]">
                        <CheckCircle className="h-4 w-4 text-[#E3C9A8]" /> {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-16 md:py-20 bg-[#2D343A]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-white">Sua empresa pronta para a transformação?</h2>
          <p className="mt-4 text-[#A1A8AE] max-w-2xl mx-auto">Vamos conversar e construir juntos o próximo capítulo da sua história.</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/cadastro">
              <button className="relative px-8 py-3.5 text-sm font-medium tracking-wider text-white bg-[#8B0000] rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
                <span className="relative z-10 flex items-center gap-2">Solicitar Diagnóstico <ArrowRight className="h-4 w-4" /></span>
                <span className="absolute inset-0 bg-[#E3C9A8] transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
              </button>
            </Link>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="relative px-8 py-3.5 text-sm font-medium tracking-wider text-white border border-white/40 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
              <span className="relative z-10 flex items-center gap-2"><Phone className="h-4 w-4" /> Falar com Especialista</span>
              <span className="absolute inset-0 bg-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
            </a>
          </div>
        </div>
      </section>

      {/* ===== CONTATO ===== */}
      <section id="contato" className="py-20 md:py-28 bg-[#F8F4E6]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-xs tracking-[0.36em] text-[#8B0000] uppercase font-medium">Contato</p>
            <h2 className="mt-4 font-serif text-4xl text-[#2D343A] md:text-5xl">Vamos <span className="text-[#8B0000]">conversar</span></h2>
            <div className="w-16 h-1 bg-[#8B0000] rounded-full mx-auto mt-4"></div>
            <p className="mt-4 text-[#708090] max-w-2xl mx-auto">Estamos prontos para ajudar sua empresa a alcançar o próximo nível</p>
          </div>
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="bg-white border border-[#F8F4E6] rounded-2xl p-8">
              <h3 className="font-serif text-2xl text-[#2D343A]">Fale conosco</h3>
              <p className="mt-2 text-[#708090]">Preencha o formulário ou fale diretamente com um especialista.</p>
              <div className="mt-6 space-y-4">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 border border-[#F8F4E6] rounded-xl hover:border-[#8B0000] hover:bg-[#F8F4E6] transition-all">
                  <div className="w-12 h-12 bg-[#25D366]/10 rounded-full flex items-center justify-center text-[#25D366]">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  </div>
                  <div>
                    <p className="font-medium text-[#2D343A]">WhatsApp</p>
                    <p className="text-sm text-[#708090]">{whatsappDisplay}</p>
                  </div>
                </a>
                <a href={`mailto:${emailContato}`} className="flex items-center gap-4 p-4 border border-[#F8F4E6] rounded-xl hover:border-[#8B0000] hover:bg-[#F8F4E6] transition-all">
                  <div className="w-12 h-12 bg-[#8B0000]/10 rounded-full flex items-center justify-center text-[#8B0000]">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  <div>
                    <p className="font-medium text-[#2D343A]">Email</p>
                    <p className="text-sm text-[#708090]">{emailContato}</p>
                  </div>
                </a>
              </div>
              <div className="mt-6 p-4 bg-[#8B0000]/5 border border-[#8B0000]/10 rounded-xl">
                <p className="text-sm text-[#2D343A] font-medium">"A transformação começa com uma conversa."</p>
              </div>
            </div>

            <div className="bg-white border border-[#F8F4E6] rounded-2xl p-8">
              <h3 className="font-serif text-2xl text-[#2D343A]">Solicitar Diagnóstico</h3>
              <form className="mt-6 grid gap-4" onSubmit={submitContact}>
                <div>
                  <label className="block text-sm font-medium text-[#2D343A]">Nome completo</label>
                  <input className="w-full px-4 py-3 border border-[#F8F4E6] rounded-xl focus:border-[#8B0000] focus:ring-2 focus:ring-[#8B0000]/20 outline-none transition" type="text" name="nome" placeholder="Seu nome" value={formState.nome} onChange={(e) => setFormState({...formState, nome: e.target.value})} required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2D343A]">Telefone</label>
                  <input className="w-full px-4 py-3 border border-[#F8F4E6] rounded-xl focus:border-[#8B0000] focus:ring-2 focus:ring-[#8B0000]/20 outline-none transition" type="tel" name="telefone" placeholder="(00) 00000-0000" value={formState.telefone} onChange={(e) => setFormState({...formState, telefone: e.target.value})} required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2D343A]">Empresa</label>
                  <input className="w-full px-4 py-3 border border-[#F8F4E6] rounded-xl focus:border-[#8B0000] focus:ring-2 focus:ring-[#8B0000]/20 outline-none transition" type="text" name="empresa" placeholder="Nome da sua empresa" value={formState.empresa} onChange={(e) => setFormState({...formState, empresa: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2D343A]">Email</label>
                  <input className="w-full px-4 py-3 border border-[#F8F4E6] rounded-xl focus:border-[#8B0000] focus:ring-2 focus:ring-[#8B0000]/20 outline-none transition" type="email" name="email" placeholder="voce@empresa.com.br" value={formState.email} onChange={(e) => setFormState({...formState, email: e.target.value})} required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2D343A]">Mensagem</label>
                  <textarea className="w-full px-4 py-3 border border-[#F8F4E6] rounded-xl focus:border-[#8B0000] focus:ring-2 focus:ring-[#8B0000]/20 outline-none transition min-h-[100px] resize-none" name="mensagem" placeholder="Conte sobre sua empresa e o objetivo da consultoria..." value={formState.mensagem} onChange={(e) => setFormState({...formState, mensagem: e.target.value})} required />
                </div>
                <button type="submit" className="w-full py-3 text-white bg-[#8B0000] rounded-lg hover:bg-[#E3C9A8] hover:text-[#8B0000] transition-all duration-300 shadow-md shadow-[#8B0000]/20 hover:shadow-lg font-semibold">
                  {formStatus === "sending" ? "Enviando..." : formStatus === "success" ? "✓ Enviado!" : "Enviar Mensagem"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        .font-serif { font-family: 'Playfair Display', Georgia, serif; }
        html { scroll-behavior: smooth; }
      `}</style>
    </div>
  )
}
