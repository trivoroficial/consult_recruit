'use client'

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from 'next/link'
import { cn } from "@/lib/utils"
import { 
  ArrowRight, 
  Users, 
  Briefcase, 
  TrendingUp, 
  Shield, 
  Zap, 
  Building2, 
  Award, 
  Crown, 
  BarChart3,
  CheckCircle,
  Sparkles,
  Target,
  Lightbulb,
  Layers,
  ChevronRight,
  Phone,
  Mail
} from 'lucide-react'

// ===== DADOS =====
const navLinks = [
  { id: "home", label: "Início" },
  { id: "sobre", label: "Sobre" },
  { id: "servicos", label: "Serviços" },
  { id: "solucoes", label: "Soluções" },
  { id: "tecnologia", label: "Tecnologia" },
  { id: "treinamentos", label: "Treinamentos" },
  { id: "contato", label: "Contato" },
];

const whatsappNumber = "5537991177058";
const whatsappDisplay = "+55 37 99117-7058";
const whatsappMessage = "Olá! Gostaria de conhecer as soluções da ZENTHOS.";
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
const emailContato = "contato@zenthos.com.br";

// ===== SERVIÇOS =====
const servicos = [
  {
    icon: Target,
    title: "Gestão Empresarial",
    description: "Estratégias para otimizar processos, estrutura organizacional e governança corporativa.",
    features: ["Planejamento Estratégico", "Estrutura Organizacional", "Governança Corporativa", "Indicadores de Performance"]
  },
  {
    icon: Users,
    title: "Recursos Humanos",
    description: "Soluções completas para gestão de pessoas, cultura e desenvolvimento organizacional.",
    features: ["Recrutamento & Seleção", "Avaliação de Desempenho", "Pesquisa de Clima", "Plano de Carreira"]
  },
  {
    icon: Lightbulb,
    title: "Transformação Digital",
    description: "Implementação de tecnologia e inovação para impulsionar a competitividade.",
    features: ["Inteligência Artificial", "Automação de Processos", "Análise de Dados", "Plataformas SaaS"]
  },
  {
    icon: TrendingUp,
    title: "Consultoria Estratégica",
    description: "Diagnóstico e planejamento para reestruturação e crescimento sustentável.",
    features: ["Diagnóstico Empresarial", "Reestruturação", "Planejamento Financeiro", "Sucessão e Governança"]
  }
];

// ===== SOLUÇÕES =====
const solucoes = [
  { title: "Diagnóstico Organizacional", desc: "Análise completa da sua empresa para identificar oportunidades de melhoria." },
  { title: "Transformação Cultural", desc: "Desenvolvimento de cultura organizacional alinhada à estratégia e propósito." },
  { title: "Liderança e Alta Performance", desc: "Programas de desenvolvimento para executivos e líderes." },
  { title: "Inteligência de Negócios", desc: "Dashboards e indicadores para tomada de decisão baseada em dados." },
];

// ===== DEPOIMENTOS =====
const testimonials = [
  {
    quote: "A ZENTHOS transformou nossa gestão. Em 12 meses, aumentamos a produtividade em 35% e reduzimos custos operacionais em 20%.",
    author: "Carlos Eduardo",
    role: "CEO, Grupo XPTO"
  },
  {
    quote: "O diagnóstico e a reestruturação feitos pela ZENTHOS foram fundamentais para nosso crescimento sustentável.",
    author: "Mariana Oliveira",
    role: "Diretora de RH, Indústria ABC"
  }
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [formState, setFormState] = useState({
    nome: "", telefone: "", empresa: "", email: "", mensagem: "",
  });
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const heroRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const overlayY = useTransform(scrollYProgress, [0, 1], [0, 65]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
    <div className="relative min-h-screen overflow-x-hidden bg-[#F8F4E6] text-[#2D343A]">

      {/* ===== HEADER ===== */}
      <header className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 bg-white/95 backdrop-blur-md",
        scrolled ? "border-[#E3C9A8]/40 shadow-md" : "border-transparent"
      )}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <a href="#home" className="flex items-center gap-3">
            {/* LOGO ZENTHOS - CAMINHO CORRIGIDO */}
            <img 
              src="/logo.png" 
              alt="ZENTHOS" 
              className="h-[1.5cm] w-auto object-contain"
            />
            <div className="flex flex-col">
              <span className="text-2xl md:text-3xl font-bold text-[#2D343A]">ZENTHOS</span>
              <span className="text-[10px] font-light text-[#708090] tracking-wider uppercase whitespace-nowrap">
                Gestão, Estratégia & Transformação
              </span>
            </div>
          </a>

          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <a key={link.id} href={`#${link.id}`} className="text-sm font-medium text-[#708090] transition hover:text-[#8B0000]">
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Link href="/login">
              <button className="px-4 py-2 text-sm font-medium text-[#708090] hover:text-[#8B0000] transition">
                Entrar
              </button>
            </Link>
            <Link href="/cadastro">
              <button className="px-5 py-2.5 text-sm font-semibold text-white bg-[#8B0000] rounded-lg hover:bg-[#E3C9A8] hover:text-[#8B0000] transition shadow-md shadow-[#8B0000]/20 hover:shadow-lg hover:-translate-y-0.5">
                Solicitar Diagnóstico
              </button>
            </Link>
          </div>

          <button
            className="inline-flex flex-col items-center justify-center gap-1 rounded-xl border border-[#8B0000]/20 bg-white px-4 py-3 lg:hidden"
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="block h-0.5 w-5 bg-[#8B0000]" />
            <span className="block h-0.5 w-5 bg-[#8B0000]" />
            <span className="block h-0.5 w-5 bg-[#8B0000]" />
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-[#8B0000]/10 bg-white px-4 py-5 lg:hidden">
            <div className="mx-auto flex max-w-7xl flex-col gap-3">
              {navLinks.map((link) => (
                <a key={link.id} href={`#${link.id}`} className="block rounded-xl px-3 py-3 text-base font-medium text-[#708090] hover:bg-[#FDF2F2] hover:text-[#8B0000]" onClick={() => setMenuOpen(false)}>
                  {link.label}
                </a>
              ))}
              <div className="flex flex-col gap-3 pt-4 border-t border-[#8B0000]/10">
                <Link href="/login" onClick={() => setMenuOpen(false)}>
                  <button className="w-full py-3 text-sm font-medium text-[#708090] border border-[#708090] rounded-lg hover:bg-[#F1F2F3] transition">
                    Entrar
                  </button>
                </Link>
                <Link href="/cadastro" onClick={() => setMenuOpen(false)}>
                  <button className="w-full py-3 text-sm font-semibold text-white bg-[#8B0000] rounded-lg hover:bg-[#E3C9A8] hover:text-[#8B0000] transition">
                    Solicitar Diagnóstico
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* ===== HERO COM IMAGEM DE FUNDO ===== */}
        <section ref={heroRef} id="home" className="relative flex min-h-[90vh] items-center overflow-hidden pt-20 bg-[#F8F4E6]">
          
          {/* IMAGEM DE FUNDO */}
          <div className="absolute inset-0">
            <img 
              src="/recrutamento.png" 
              alt="ZENTHOS - Gestão, Estratégia & Transformação" 
              className="w-full h-full object-cover"
            />
            {/* OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#2D343A]/85 via-[#2D343A]/60 to-[#2D343A]/20"></div>
          </div>

          <motion.div className="relative z-10 mx-auto flex w-full max-w-7xl px-4 sm:px-6 lg:px-8" style={{ y: overlayY }}>
            <div className="max-w-4xl space-y-8 py-12 lg:py-20">
              <motion.div 
                className="inline-flex items-center gap-3 px-4 py-2 text-[11px] tracking-[0.34em] text-[#E3C9A8] uppercase font-medium border border-[#E3C9A8]/30 rounded-full bg-white/10 backdrop-blur-sm" 
                initial={{ opacity: 0, y: 18 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.7 }}
              >
                <span className="h-2 w-2 rounded-full bg-[#E3C9A8]" />
                Gestão, Estratégia & Transformação
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 22 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.1, duration: 0.8 }}
              >
                <h1 className="font-serif text-5xl leading-[1.05] text-white sm:text-6xl lg:text-7xl">
                  Transformamos empresas através da <br className="hidden sm:block" />
                  <span className="text-[#E3C9A8]">Gestão, Estratégia e Transformação</span>
                </h1>
              </motion.div>

              <motion.p 
                className="max-w-2xl text-lg leading-8 text-white/85 md:text-xl" 
                initial={{ opacity: 0, y: 24 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.2, duration: 0.85 }}
              >
                Ajudamos empresas a crescer por meio da melhoria de processos, desenvolvimento humano, tecnologia e inteligência organizacional.
              </motion.p>

              <motion.div 
                className="flex flex-col gap-4 sm:flex-row" 
                initial={{ opacity: 0, y: 24 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.3, duration: 0.85 }}
              >
                <Link href="/cadastro">
                  <button className="px-8 py-4 text-sm font-bold text-white bg-[#8B0000] rounded-lg hover:bg-[#E3C9A8] hover:text-[#8B0000] transition-all duration-300 shadow-lg shadow-[#8B0000]/20 hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-2">
                    Solicitar Diagnóstico
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </Link>
                <Link href="/servicos">
                  <button className="px-8 py-4 text-sm font-bold text-white border-2 border-white/40 rounded-lg hover:bg-white hover:text-[#8B0000] hover:border-white transition-all duration-300 flex items-center justify-center gap-2">
                    Conhecer Soluções
                  </button>
                </Link>
              </motion.div>

              <motion.div 
                className="flex gap-8 text-white/80" 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ delay: 0.5 }}
              >
                <div><span className="text-2xl font-bold text-[#E3C9A8]">15+</span> <span className="text-sm">Anos de Mercado</span></div>
                <div><span className="text-2xl font-bold text-[#E3C9A8]">500+</span> <span className="text-sm">Empresas Atendidas</span></div>
                <div><span className="text-2xl font-bold text-[#E3C9A8]">96%</span> <span className="text-sm">Satisfação</span></div>
              </motion.div>
            </div>
          </motion.div>

          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#F8F4E6] to-transparent" />
        </section>

        {/* ===== SERVIÇOS ===== */}
        <section id="servicos" className="py-20 md:py-28 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-xs tracking-[0.36em] text-[#8B0000] uppercase font-medium">O que fazemos</p>
              <h2 className="mt-4 font-serif text-4xl text-[#2D343A] md:text-5xl">
                Nossos <span className="text-[#8B0000]">Serviços</span>
              </h2>
              <div className="w-16 h-1 bg-[#8B0000] rounded-full mx-auto mt-4"></div>
              <p className="mt-4 text-[#708090] max-w-2xl mx-auto">
                Soluções completas para transformar sua organização
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {servicos.map((servico, index) => {
                const Icon = servico.icon
                return (
                  <motion.div 
                    key={index} 
                    className="group relative bg-white border border-[#F8F4E6] rounded-xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden" 
                    initial="hidden" 
                    whileInView="visible" 
                    viewport={{ once: true, amount: 0.2 }} 
                    variants={fadeUp}
                  >
                    {/* Barra Superior Burgundy no Hover */}
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

        {/* ===== SOBRE ===== */}
        <section id="sobre" className="py-20 md:py-28 bg-[#F8F4E6]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div>
                <p className="text-xs tracking-[0.36em] text-[#8B0000] uppercase font-medium">Sobre</p>
                <h2 className="mt-4 font-serif text-4xl text-[#2D343A] md:text-5xl">
                  Parceiros na <span className="text-[#8B0000]">transformação</span> do seu negócio
                </h2>
                <div className="w-16 h-1 bg-[#8B0000] rounded-full mt-4"></div>
                <p className="mt-6 text-[#708090] leading-relaxed">
                  A ZENTHOS é uma consultoria especializada em gestão empresarial, recursos humanos, transformação organizacional e reestruturação empresarial. Combinamos estratégia, tecnologia e inteligência artificial para impulsionar o crescimento sustentável das organizações.
                </p>
                <div className="mt-6 grid grid-cols-3 gap-4">
                  <div className="bg-white border border-[#F8F4E6] rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-[#8B0000]">🎯</p>
                    <p className="text-xs text-[#708090] mt-1">Missão</p>
                  </div>
                  <div className="bg-white border border-[#F8F4E6] rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-[#8B0000]">👁️</p>
                    <p className="text-xs text-[#708090] mt-1">Visão</p>
                  </div>
                  <div className="bg-white border border-[#F8F4E6] rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-[#8B0000]">⭐</p>
                    <p className="text-xs text-[#708090] mt-1">Valores</p>
                  </div>
                </div>
              </div>
              <div className="bg-[#2D343A] rounded-3xl p-8 text-white">
                <p className="text-2xl font-serif">"A transformação começa com a decisão de mudar. Nós guiamos essa jornada."</p>
                <div className="mt-6 flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#8B0000] rounded-full flex items-center justify-center text-xl font-bold">Z</div>
                  <div>
                    <p className="font-semibold">ZENTHOS</p>
                    <p className="text-sm text-[#A1A8AE]">Gestão, Estratégia & Transformação</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== SOLUÇÕES ===== */}
        <section id="solucoes" className="py-20 md:py-28 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-xs tracking-[0.36em] text-[#8B0000] uppercase font-medium">Soluções</p>
              <h2 className="mt-4 font-serif text-4xl text-[#2D343A] md:text-5xl">
                Nossas <span className="text-[#8B0000]">Soluções</span>
              </h2>
              <div className="w-16 h-1 bg-[#8B0000] rounded-full mx-auto mt-4"></div>
              <p className="mt-4 text-[#708090] max-w-2xl mx-auto">
                Entregamos valor através de soluções integradas e personalizadas
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {solucoes.map((item, index) => (
                <motion.div 
                  key={index} 
                  className="bg-white border border-[#F8F4E6] rounded-xl p-6 flex items-start gap-4 hover:shadow-lg hover:-translate-y-1 hover:border-[#8B0000]/30 transition-all duration-300" 
                  initial="hidden" 
                  whileInView="visible" 
                  viewport={{ once: true, amount: 0.3 }} 
                  variants={fadeUp}
                >
                  <div className="w-12 h-12 rounded-lg bg-[#8B0000]/10 flex items-center justify-center flex-shrink-0 text-[#8B0000]">
                    <ChevronRight className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#2D343A]">{item.title}</h3>
                    <p className="text-sm text-[#708090] mt-1">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== TECNOLOGIA ===== */}
        <section id="tecnologia" className="py-20 md:py-28 bg-[#F8F4E6]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-xs tracking-[0.36em] text-[#8B0000] uppercase font-medium">Tecnologia</p>
              <h2 className="mt-4 font-serif text-4xl text-[#2D343A] md:text-5xl">
                Inteligência <span className="text-[#8B0000]">Aplicada</span>
              </h2>
              <div className="w-16 h-1 bg-[#8B0000] rounded-full mx-auto mt-4"></div>
              <p className="mt-4 text-[#708090] max-w-2xl mx-auto">
                Combinamos tecnologia avançada com expertise humana para gerar resultados
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <motion.div className="bg-white border border-[#F8F4E6] rounded-xl p-6 text-center hover:shadow-lg hover:-translate-y-2 hover:border-[#8B0000]/30 transition-all duration-300" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeUp}>
                <div className="w-16 h-16 bg-[#8B0000]/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-[#8B0000]">
                  <Zap className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-bold text-[#2D343A]">Inteligência Artificial</h3>
                <p className="mt-2 text-sm text-[#708090]">Automação de processos e análise preditiva para tomada de decisão</p>
              </motion.div>
              <motion.div className="bg-white border border-[#F8F4E6] rounded-xl p-6 text-center hover:shadow-lg hover:-translate-y-2 hover:border-[#8B0000]/30 transition-all duration-300" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeUp}>
                <div className="w-16 h-16 bg-[#8B0000]/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-[#8B0000]">
                  <BarChart3 className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-bold text-[#2D343A]">Data & Analytics</h3>
                <p className="mt-2 text-sm text-[#708090]">Dashboards e indicadores para gestão baseada em dados</p>
              </motion.div>
              <motion.div className="bg-white border border-[#F8F4E6] rounded-xl p-6 text-center hover:shadow-lg hover:-translate-y-2 hover:border-[#8B0000]/30 transition-all duration-300" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeUp}>
                <div className="w-16 h-16 bg-[#8B0000]/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-[#8B0000]">
                  <Layers className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-bold text-[#2D343A]">Transformação Digital</h3>
                <p className="mt-2 text-sm text-[#708090]">Implementação de tecnologias para otimizar operações</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ===== DEPOIMENTOS ===== */}
        <section id="resultados" className="py-20 md:py-28 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-xs tracking-[0.36em] text-[#8B0000] uppercase font-medium">Resultados</p>
              <h2 className="mt-4 font-serif text-4xl text-[#2D343A] md:text-5xl">
                O que <span className="text-[#8B0000]">dizem</span> nossos clientes
              </h2>
              <div className="w-16 h-1 bg-[#8B0000] rounded-full mx-auto mt-4"></div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {testimonials.map((item, index) => (
                <motion.div 
                  key={index} 
                  className="bg-[#F8F4E6] border border-[#F8F4E6] rounded-2xl p-8 hover:shadow-lg transition-all duration-300" 
                  initial="hidden" 
                  whileInView="visible" 
                  viewport={{ once: true, amount: 0.3 }} 
                  variants={fadeUp}
                >
                  <p className="text-4xl text-[#8B0000]">"</p>
                  <p className="text-[#2D343A] leading-relaxed">{item.quote}</p>
                  <div className="mt-4">
                    <p className="font-semibold text-[#2D343A]">{item.author}</p>
                    <p className="text-sm text-[#708090]">{item.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CTA ===== */}
        <section className="py-16 md:py-20 bg-[#2D343A]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-serif text-3xl md:text-4xl text-white">Sua empresa pronta para a transformação?</h2>
            <p className="mt-4 text-[#A1A8AE] max-w-2xl mx-auto">
              Vamos conversar e construir juntos o próximo capítulo da sua história.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/cadastro">
                <button className="px-8 py-4 text-sm font-bold text-white bg-[#8B0000] rounded-lg hover:bg-[#E3C9A8] hover:text-[#8B0000] transition-all duration-300 shadow-lg shadow-[#8B0000]/20 hover:shadow-xl flex items-center justify-center gap-2">
                  Solicitar Diagnóstico
                  <ArrowRight className="h-5 w-5" />
                </button>
              </Link>
              <a 
                href={whatsappUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="px-8 py-4 text-sm font-bold text-white border-2 border-white/40 rounded-lg hover:bg-white hover:text-[#8B0000] hover:border-white transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Phone className="h-5 w-5" />
                Falar com Especialista
              </a>
            </div>
          </div>
        </section>

        {/* ===== CONTATO ===== */}
        <section id="contato" className="py-20 md:py-28 bg-[#F8F4E6]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-xs tracking-[0.36em] text-[#8B0000] uppercase font-medium">Contato</p>
              <h2 className="mt-4 font-serif text-4xl text-[#2D343A] md:text-5xl">
                Vamos <span className="text-[#8B0000]">conversar</span>
              </h2>
              <div className="w-16 h-1 bg-[#8B0000] rounded-full mx-auto mt-4"></div>
              <p className="mt-4 text-[#708090] max-w-2xl mx-auto">
                Estamos prontos para ajudar sua empresa a alcançar o próximo nível
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              <div className="bg-white border border-[#F8F4E6] rounded-2xl p-8">
                <h3 className="font-serif text-2xl text-[#2D343A]">Fale conosco</h3>
                <p className="mt-2 text-[#708090]">Preencha o formulário ou fale diretamente com um especialista.</p>
                
                <div className="mt-6 space-y-4">
                  <a 
                    href={whatsappUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-4 p-4 border border-[#F8F4E6] rounded-xl hover:border-[#8B0000] hover:bg-[#F8F4E6] transition-all"
                  >
                    <div className="w-12 h-12 bg-[#25D366]/10 rounded-full flex items-center justify-center text-[#25D366]">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-[#2D343A]">WhatsApp</p>
                      <p className="text-sm text-[#708090]">{whatsappDisplay}</p>
                    </div>
                  </a>
                  <a 
                    href={`mailto:${emailContato}`} 
                    className="flex items-center gap-4 p-4 border border-[#F8F4E6] rounded-xl hover:border-[#8B0000] hover:bg-[#F8F4E6] transition-all"
                  >
                    <div className="w-12 h-12 bg-[#8B0000]/10 rounded-full flex items-center justify-center text-[#8B0000]">
                      <Mail className="h-6 w-6" />
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
                    <input 
                      className="w-full px-4 py-3 border border-[#F8F4E6] rounded-xl focus:border-[#8B0000] focus:ring-2 focus:ring-[#8B0000]/20 outline-none transition" 
                      type="text" 
                      name="nome" 
                      placeholder="Seu nome" 
                      value={formState.nome} 
                      onChange={(e) => setFormState({...formState, nome: e.target.value})} 
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#2D343A]">Telefone</label>
                    <input 
                      className="w-full px-4 py-3 border border-[#F8F4E6] rounded-xl focus:border-[#8B0000] focus:ring-2 focus:ring-[#8B0000]/20 outline-none transition" 
                      type="tel" 
                      name="telefone" 
                      placeholder="(00) 00000-0000" 
                      value={formState.telefone} 
                      onChange={(e) => setFormState({...formState, telefone: e.target.value})} 
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#2D343A]">Empresa</label>
                    <input 
                      className="w-full px-4 py-3 border border-[#F8F4E6] rounded-xl focus:border-[#8B0000] focus:ring-2 focus:ring-[#8B0000]/20 outline-none transition" 
                      type="text" 
                      name="empresa" 
                      placeholder="Nome da sua empresa" 
                      value={formState.empresa} 
                      onChange={(e) => setFormState({...formState, empresa: e.target.value})} 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#2D343A]">Email</label>
                    <input 
                      className="w-full px-4 py-3 border border-[#F8F4E6] rounded-xl focus:border-[#8B0000] focus:ring-2 focus:ring-[#8B0000]/20 outline-none transition" 
                      type="email" 
                      name="email" 
                      placeholder="voce@empresa.com.br" 
                      value={formState.email} 
                      onChange={(e) => setFormState({...formState, email: e.target.value})} 
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#2D343A]">Mensagem</label>
                    <textarea 
                      className="w-full px-4 py-3 border border-[#F8F4E6] rounded-xl focus:border-[#8B0000] focus:ring-2 focus:ring-[#8B0000]/20 outline-none transition min-h-[100px] resize-none" 
                      name="mensagem" 
                      placeholder="Conte sobre sua empresa e o objetivo da consultoria..." 
                      value={formState.mensagem} 
                      onChange={(e) => setFormState({...formState, mensagem: e.target.value})} 
                      required 
                    />
                  </div>
                  <button 
                    type="submit" 
                    className="w-full py-3 text-white bg-[#8B0000] rounded-lg hover:bg-[#E3C9A8] hover:text-[#8B0000] transition-all duration-300 shadow-md shadow-[#8B0000]/20 hover:shadow-lg font-semibold"
                  >
                    {formStatus === "sending" ? "Enviando..." : formStatus === "success" ? "✓ Enviado!" : "Enviar Mensagem"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ===== RODAPÉ ZENTHOS (COR SLATE #708090) ===== */}
      <footer className="bg-[#708090] text-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 md:grid-cols-4">
            <div className="md:col-span-1">
              <div className="flex items-center gap-3">
                <img 
                  src="/logo.png" 
                  alt="ZENTHOS" 
                  className="h-10 w-auto object-contain brightness-0 invert"
                />
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-white tracking-tight">ZENTHOS</span>
                  <span className="text-[10px] font-light text-[#E3C9A8] tracking-widest uppercase whitespace-nowrap">
                    Gestão, Estratégia & Transformação
                  </span>
                </div>
              </div>
              <p className="mt-6 text-sm text-white/70 leading-relaxed">
                Transformando organizações através de estratégia, tecnologia e inteligência humana.
              </p>
              <p className="mt-6 text-xs text-white/50">© 2026 ZENTHOS. Todos os direitos reservados.</p>
            </div>
            
            <div>
              <h4 className="font-bold text-white text-sm uppercase tracking-wider">Navegação</h4>
              <ul className="mt-4 space-y-3 text-sm text-white/70">
                {navLinks.slice(0, 4).map((link) => (
                  <li key={link.id}><a href={`#${link.id}`} className="hover:text-[#E3C9A8] transition-colors duration-200">{link.label}</a></li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-white text-sm uppercase tracking-wider">Contato</h4>
              <ul className="mt-4 space-y-3 text-sm text-white/70">
                <li>
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#E3C9A8] transition-colors duration-200">
                    {whatsappDisplay}
                  </a>
                </li>
                <li><a href={`mailto:${emailContato}`} className="hover:text-[#E3C9A8] transition-colors duration-200">{emailContato}</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-white text-sm uppercase tracking-wider">Acesso ao Sistema</h4>
              <ul className="mt-4 space-y-3 text-sm text-white/70">
                <li><Link href="/login" className="hover:text-[#E3C9A8] transition-colors duration-200">Área do Cliente</Link></li>
                <li><Link href="/cadastro" className="hover:text-[#E3C9A8] transition-colors duration-200">Solicitar Diagnóstico</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

      {/* ===== WHATSAPP FLUTUANTE ===== */}
      <a 
        href={whatsappUrl} 
        target="_blank" 
        rel="noreferrer" 
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_30px_rgba(37,211,102,0.4)] transition hover:scale-110 hover:shadow-[0_8px_40px_rgba(37,211,102,0.6)]" 
        aria-label="Falar com Especialista"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366]/40 animate-ping opacity-40" />
        <svg className="relative h-7 w-7" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

      {/* ===== ESTILOS GLOBAIS ===== */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        .font-serif {
          font-family: 'Playfair Display', Georgia, serif;
        }
        
        body {
          font-family: 'Inter', sans-serif;
        }
        
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
}
