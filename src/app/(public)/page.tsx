'use client'

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from 'next/link'
import { cn } from "@/lib/utils"

// ===== DADOS =====
const navLinks = [
  { id: "home", label: "Início" },
  { id: "sobre", label: "Sobre" },
  { id: "servicos", label: "Serviços" },
  { id: "diferenciais", label: "Diferenciais" },
  { id: "resultados", label: "Resultados" },
  { id: "contato", label: "Contato" },
];

const whatsappNumber = "5534991177058";
const whatsappMessage = "Olá! Gostaria de conhecer as soluções da TRIVOR.";
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
const emailContato = "contato@trivor.com.br";

// ===== SERVIÇOS =====
const servicos = [
  {
    icon: "👤",
    title: "Recrutamento & Seleção",
    description: "Encontramos profissionais alinhados ao perfil técnico e comportamental da sua organização.",
    features: ["Busca ativa de talentos", "Triagem inteligente", "Entrevistas estruturadas", "Banco de talentos"]
  },
  {
    icon: "👥",
    title: "Gestão de Pessoas",
    description: "Estratégias para desenvolver equipes e fortalecer a cultura organizacional.",
    features: ["Pesquisa de clima", "Avaliação de desempenho", "Treinamentos", "Plano de desenvolvimento"]
  },
  {
    icon: "📊",
    title: "Consultoria Financeira",
    description: "Estruturação financeira para empresas mais saudáveis e competitivas.",
    features: ["Planejamento financeiro", "Fluxo de caixa", "Indicadores", "Precificação"]
  },
  {
    icon: "🛡️",
    title: "Segurança dos Alimentos",
    description: "Implementação de processos seguros e eficientes para sua indústria.",
    features: ["Boas Práticas", "POP", "APPCC", "Auditorias"]
  }
];

// ===== DIFERENCIAIS =====
const differentiators = [
  { title: "Inteligência Estratégica", text: "Análise de dados e IA para decisões mais assertivas." },
  { title: "Gestão de Talentos", text: "Atração, desenvolvimento e retenção dos melhores profissionais." },
  { title: "Consultoria Personalizada", text: "Soluções sob medida com foco em resultados." },
  { title: "Tecnologia Aplicada", text: "Plataforma SaaS com inteligência artificial integrada." },
];

// ===== DEPOIMENTOS =====
const testimonials = [
  {
    quote: "A TRIVOR transformou nossa gestão de pessoas. Em 6 meses, reduzimos o turnover em 40%.",
    author: "Carlos Eduardo",
    role: "CEO, Grupo XPTO"
  },
  {
    quote: "O processo de recrutamento com a TRIVOR encontrou o profissional perfeito para nossa diretoria.",
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
  const [activeTestimonial, setActiveTestimonial] = useState(0);
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

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveTestimonial((current) => (current + 1) % testimonials.length);
    }, 6000);
    return () => window.clearInterval(timer);
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
    <div className="relative min-h-screen overflow-x-hidden bg-[#FDFCFB] text-[#2D3121]">

      {/* ===== HEADER ===== */}
      <header className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 bg-white/95 backdrop-blur-md",
        scrolled ? "border-[#8E7AB5]/20 shadow-md" : "border-transparent"
      )}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <a href="#home" className="flex items-center gap-3">
            <div className="relative w-12 h-12 md:w-14 md:h-14">
              <img src="/logo.png" alt="TRIVOR" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className="text-2xl md:text-3xl font-bold text-[#2D3121]">TRIVOR</span>
                <span className="text-[10px] font-light text-[#8E7AB5] align-top mt-1">™</span>
              </div>
              <span className="text-[10px] font-light text-[#5C6347] tracking-wider uppercase">
                Gestão & Estratégia
              </span>
            </div>
          </a>

          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <a key={link.id} href={`#${link.id}`} className="text-sm font-medium text-[#2D3121] transition hover:text-[#8E7AB5]">
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Link href="/login">
              <button className="px-4 py-2 text-sm font-medium text-[#5C6347] hover:text-[#8E7AB5] hover:bg-[#F4F5F0] rounded-lg transition">
                Entrar
              </button>
            </Link>
            <Link href="/cadastro">
              <button className="px-5 py-2.5 text-sm font-semibold text-white bg-[#8E7AB5] rounded-full hover:bg-[#726191] transition shadow-md shadow-[#8E7AB5]/20 hover:shadow-lg hover:-translate-y-0.5">
                Cadastrar
              </button>
            </Link>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 text-sm font-semibold text-white bg-[#5C6347] rounded-full hover:bg-[#4A5039] transition shadow-md shadow-[#5C6347]/20 hover:shadow-lg hover:-translate-y-0.5">
              Especialista
            </a>
          </div>

          <button
            className="inline-flex flex-col items-center justify-center gap-1 rounded-xl border border-[#8E7AB5]/20 bg-white px-4 py-3 lg:hidden"
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="block h-0.5 w-5 bg-[#8E7AB5]" />
            <span className="block h-0.5 w-5 bg-[#8E7AB5]" />
            <span className="block h-0.5 w-5 bg-[#8E7AB5]" />
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-[#8E7AB5]/10 bg-white px-4 py-5 lg:hidden">
            <div className="mx-auto flex max-w-7xl flex-col gap-3">
              {navLinks.map((link) => (
                <a key={link.id} href={`#${link.id}`} className="block rounded-xl px-3 py-3 text-base font-medium text-[#2D3121] hover:bg-[#F4F5F0] hover:text-[#8E7AB5]" onClick={() => setMenuOpen(false)}>
                  {link.label}
                </a>
              ))}
              <div className="flex flex-col gap-3 pt-4 border-t border-[#8E7AB5]/10">
                <Link href="/login" onClick={() => setMenuOpen(false)}>
                  <button className="w-full py-3 text-sm font-medium text-[#5C6347] border border-[#8E7AB5] rounded-full hover:bg-[#F4F5F0] transition">
                    Entrar
                  </button>
                </Link>
                <Link href="/cadastro" onClick={() => setMenuOpen(false)}>
                  <button className="w-full py-3 text-sm font-semibold text-white bg-[#8E7AB5] rounded-full hover:bg-[#726191] transition">
                    Cadastrar
                  </button>
                </Link>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="w-full py-3 text-sm font-semibold text-white bg-[#5C6347] rounded-full hover:bg-[#4A5039] transition text-center">
                  Especialista
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* ===== HERO COM IMAGEM ===== */}
        <section ref={heroRef} id="home" className="relative flex min-h-[90vh] items-center overflow-hidden pt-20">
          
          {/* IMAGEM DE FUNDO - recrutamento.png */}
          <div className="absolute inset-0">
            <img 
              src="/recrutamento.png" 
              alt="TRIVOR - Recrutamento Estratégico" 
              className="w-full h-full object-cover"
            />
            {/* OVERLAY PARA ESCURECER E MELHORAR LEGIBILIDADE */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#2D3121]/90 via-[#2D3121]/60 to-[#2D3121]/20"></div>
          </div>

          <motion.div className="relative z-10 mx-auto flex w-full max-w-7xl px-4 sm:px-6 lg:px-8" style={{ y: overlayY }}>
            <div className="max-w-4xl space-y-8 py-12 lg:py-20">
              <motion.div 
                className="inline-flex items-center gap-3 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-[11px] tracking-[0.34em] text-white/90 backdrop-blur-md uppercase" 
                initial={{ opacity: 0, y: 18 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.7 }}
              >
                <span className="h-2 w-2 rounded-full bg-white shadow-[0_0_18px_rgba(255,255,255,0.4)]" />
                Recrutamento Estratégico
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 22 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.1, duration: 0.8 }}
              >
                <p className="font-serif text-5xl tracking-[0.22em] text-white/95 sm:text-6xl lg:text-7xl">TRIVOR</p>
                <p className="text-sm tracking-[0.32em] text-[#5C6347] uppercase sm:text-base">Gestão & Estratégia Empresarial</p>
              </motion.div>

              <motion.h1 
                className="max-w-4xl font-serif text-5xl leading-[1.02] text-white sm:text-6xl lg:text-7xl" 
                initial={{ opacity: 0, y: 24 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.2, duration: 0.85 }}
              >
                Transforme seu negócio com <br className="hidden sm:block" />
                <span className="text-[#8E7AB5]">inteligência estratégica</span>
              </motion.h1>

              <motion.p 
                className="max-w-2xl text-lg leading-8 text-white/85 md:text-xl" 
                initial={{ opacity: 0, y: 24 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.3, duration: 0.85 }}
              >
                Conectamos gestão estratégica, tecnologia e inteligência humana para construir organizações mais eficientes, preparadas e competitivas.
              </motion.p>

              <motion.div 
                className="flex flex-col gap-3 sm:flex-row" 
                initial={{ opacity: 0, y: 24 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.4, duration: 0.85 }}
              >
                <Link href="/cadastro">
                  <button className="px-6 py-3 text-sm font-semibold text-white bg-[#8E7AB5] rounded-full shadow-lg shadow-[#8E7AB5]/30 hover:bg-[#726191] hover:-translate-y-0.5 transition-all">
                    Solicitar Diagnóstico →
                  </button>
                </Link>
                <a 
                  href={whatsappUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="px-6 py-3 text-sm font-semibold text-white bg-white/20 backdrop-blur-sm border border-white/40 rounded-full hover:bg-white/30 hover:-translate-y-0.5 transition-all"
                >
                  Falar com Especialista →
                </a>
              </motion.div>

              <motion.div 
                className="flex gap-8 text-white/80" 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ delay: 0.6 }}
              >
                <div><span className="text-2xl font-bold text-[#8E7AB5]">15+</span> <span className="text-sm">Anos</span></div>
                <div><span className="text-2xl font-bold text-[#8E7AB5]">1.000+</span> <span className="text-sm">Clientes</span></div>
                <div><span className="text-2xl font-bold text-[#8E7AB5]">96%</span> <span className="text-sm">Satisfação</span></div>
              </motion.div>
            </div>
          </motion.div>

          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#FDFCFB] to-transparent" />
        </section>

        {/* ===== SERVIÇOS ===== */}
        <section id="servicos" className="py-20 md:py-28 bg-[#FDFCFB]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-xs tracking-[0.36em] text-[#5C6347] uppercase font-medium">Serviços</p>
              <h2 className="mt-4 font-serif text-4xl text-[#2D3121] md:text-5xl">
                Soluções <span className="text-[#8E7AB5]">Estratégicas</span>
              </h2>
              <div className="w-16 h-1 bg-[#8E7AB5] rounded-full mx-auto mt-4"></div>
              <p className="mt-4 text-[#5C6347] max-w-2xl mx-auto">
                Serviços completos para transformar sua organização
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {servicos.map((servico, index) => (
                <motion.div 
                  key={index} 
                  className="bg-white border border-[#E8EAE0] rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-2 hover:border-[#8E7AB5] transition-all duration-300" 
                  initial="hidden" 
                  whileInView="visible" 
                  viewport={{ once: true, amount: 0.3 }} 
                  variants={fadeUp}
                >
                  <div className="text-3xl mb-3">{servico.icon}</div>
                  <h3 className="text-xl font-bold text-[#2D3121]">{servico.title}</h3>
                  <p className="mt-2 text-sm text-[#5C6347]">{servico.description}</p>
                  <ul className="mt-4 space-y-1.5">
                    {servico.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-[#5C6347]">
                        <span className="text-[#8E7AB5]">✓</span> {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== DIFERENCIAIS ===== */}
        <section id="diferenciais" className="py-20 md:py-28 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-xs tracking-[0.36em] text-[#5C6347] uppercase font-medium">Diferenciais</p>
              <h2 className="mt-4 font-serif text-4xl text-[#2D3121] md:text-5xl">
                Por que <span className="text-[#8E7AB5]">TRIVOR</span>
              </h2>
              <div className="w-16 h-1 bg-[#8E7AB5] rounded-full mx-auto mt-4"></div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {differentiators.map((item, index) => (
                <motion.div 
                  key={index} 
                  className="bg-[#F8F7F4] border border-[#E8EAE0] rounded-2xl p-6 text-center hover:shadow-lg hover:-translate-y-2 hover:border-[#8E7AB5] transition-all duration-300" 
                  initial="hidden" 
                  whileInView="visible" 
                  viewport={{ once: true, amount: 0.3 }} 
                  variants={fadeUp}
                >
                  <div className="w-14 h-14 bg-[#8E7AB5]/10 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl text-[#8E7AB5]">
                    ✦
                  </div>
                  <h3 className="text-lg font-bold text-[#2D3121]">{item.title}</h3>
                  <p className="mt-2 text-sm text-[#5C6347]">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== SOBRE ===== */}
        <section id="sobre" className="py-20 md:py-28 bg-[#FDFCFB]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div>
                <p className="text-xs tracking-[0.36em] text-[#5C6347] uppercase font-medium">Sobre Nós</p>
                <h2 className="mt-4 font-serif text-4xl text-[#2D3121] md:text-5xl">
                  Parceiros na <span className="text-[#8E7AB5]">evolução</span> do seu negócio
                </h2>
                <div className="w-16 h-1 bg-[#8E7AB5] rounded-full mt-4"></div>
                <p className="mt-6 text-[#5C6347] leading-relaxed">
                  Cada organização possui uma história. Nosso papel é transformar essa história em produtividade, rentabilidade e legado com rigor técnico, visão de futuro e presença constante ao lado do cliente.
                </p>
                <div className="mt-6 grid grid-cols-3 gap-4">
                  <div className="bg-white border border-[#E8EAE0] rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-[#8E7AB5]">🎯</p>
                    <p className="text-xs text-[#5C6347] mt-1">Missão</p>
                  </div>
                  <div className="bg-white border border-[#E8EAE0] rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-[#8E7AB5]">👁️</p>
                    <p className="text-xs text-[#5C6347] mt-1">Visão</p>
                  </div>
                  <div className="bg-white border border-[#E8EAE0] rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-[#8E7AB5]">⭐</p>
                    <p className="text-xs text-[#5C6347] mt-1">Valores</p>
                  </div>
                </div>
              </div>
              <div className="bg-[#8E7AB5] rounded-3xl p-8 text-white">
                <p className="text-2xl font-serif">"Transformamos empresas através de pessoas, processos e inteligência."</p>
                <div className="mt-6 flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#5C6347] rounded-full flex items-center justify-center text-xl">T</div>
                  <div>
                    <p className="font-semibold">TRIVOR</p>
                    <p className="text-sm text-white/70">Gestão & Estratégia</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== DEPOIMENTOS ===== */}
        <section id="resultados" className="py-20 md:py-28 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-xs tracking-[0.36em] text-[#5C6347] uppercase font-medium">Depoimentos</p>
              <h2 className="mt-4 font-serif text-4xl text-[#2D3121] md:text-5xl">
                O que <span className="text-[#8E7AB5]">dizem</span> sobre nós
              </h2>
              <div className="w-16 h-1 bg-[#8E7AB5] rounded-full mx-auto mt-4"></div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {testimonials.map((item, index) => (
                <motion.div 
                  key={index} 
                  className="bg-[#F8F7F4] border border-[#E8EAE0] rounded-2xl p-8 hover:shadow-lg transition-all duration-300" 
                  initial="hidden" 
                  whileInView="visible" 
                  viewport={{ once: true, amount: 0.3 }} 
                  variants={fadeUp}
                >
                  <p className="text-4xl text-[#8E7AB5]">"</p>
                  <p className="text-[#2D3121] leading-relaxed">{item.quote}</p>
                  <div className="mt-4">
                    <p className="font-semibold text-[#2D3121]">{item.author}</p>
                    <p className="text-sm text-[#5C6347]">{item.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CTA ===== */}
        <section className="py-16 md:py-20 bg-[#8E7AB5]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-serif text-3xl md:text-4xl text-white">Sua empresa pode ir muito mais longe</h2>
            <p className="mt-4 text-white/80 max-w-2xl mx-auto">
              Vamos conversar e transformar inteligência em produtividade, rentabilidade e legado.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/cadastro">
                <button className="px-6 py-3 text-sm font-semibold text-[#2D3121] bg-white rounded-full hover:bg-gray-100 shadow-lg hover:-translate-y-0.5 transition-all">
                  Solicitar Diagnóstico →
                </button>
              </Link>
              <a 
                href={whatsappUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="px-6 py-3 text-sm font-semibold text-white bg-[#5C6347] rounded-full hover:bg-[#4A5039] shadow-lg shadow-[#5C6347]/20 hover:-translate-y-0.5 transition-all"
              >
                Falar com Especialista →
              </a>
            </div>
          </div>
        </section>

        {/* ===== CONTATO ===== */}
        <section id="contato" className="py-20 md:py-28 bg-[#FDFCFB]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-xs tracking-[0.36em] text-[#5C6347] uppercase font-medium">Contato</p>
              <h2 className="mt-4 font-serif text-4xl text-[#2D3121] md:text-5xl">
                Vamos <span className="text-[#8E7AB5]">conversar</span>
              </h2>
              <div className="w-16 h-1 bg-[#8E7AB5] rounded-full mx-auto mt-4"></div>
              <p className="mt-4 text-[#5C6347] max-w-2xl mx-auto">
                O momento de agir é agora. Cada decisão adiada é uma oportunidade que passa.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              <div className="bg-white border border-[#E8EAE0] rounded-2xl p-8">
                <h3 className="font-serif text-2xl text-[#2D3121]">Fale conosco</h3>
                <p className="mt-2 text-[#5C6347]">Preencha o formulário ou fale diretamente com um especialista.</p>
                
                <div className="mt-6 space-y-4">
                  <a 
                    href={whatsappUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-4 p-4 border border-[#E8EAE0] rounded-xl hover:border-[#8E7AB5] hover:bg-[#F8F7F4] transition-all"
                  >
                    <div className="w-10 h-10 bg-[#25D366]/10 rounded-full flex items-center justify-center text-[#25D366] text-xl">💬</div>
                    <div>
                      <p className="font-medium text-[#2D3121]">WhatsApp</p>
                      <p className="text-sm text-[#5C6347]">Falar com especialista</p>
                    </div>
                  </a>
                  <a 
                    href={`mailto:${emailContato}`} 
                    className="flex items-center gap-4 p-4 border border-[#E8EAE0] rounded-xl hover:border-[#8E7AB5] hover:bg-[#F8F7F4] transition-all"
                  >
                    <div className="w-10 h-10 bg-[#8E7AB5]/10 rounded-full flex items-center justify-center text-[#8E7AB5] text-xl">✉️</div>
                    <div>
                      <p className="font-medium text-[#2D3121]">Email</p>
                      <p className="text-sm text-[#5C6347]">{emailContato}</p>
                    </div>
                  </a>
                </div>

                <div className="mt-6 p-4 bg-[#8E7AB5]/5 border border-[#8E7AB5]/20 rounded-xl">
                  <p className="text-sm text-[#2D3121] font-medium">"Daqui a um ano, você vai agradecer a decisão que tomar hoje."</p>
                </div>
              </div>

              <div className="bg-white border border-[#E8EAE0] rounded-2xl p-8">
                <h3 className="font-serif text-2xl text-[#2D3121]">Solicitar Diagnóstico</h3>
                <form className="mt-6 grid gap-4" onSubmit={submitContact}>
                  <div>
                    <label className="block text-sm font-medium text-[#2D3121]">Nome completo</label>
                    <input 
                      className="w-full px-4 py-3 border border-[#E8EAE0] rounded-xl focus:border-[#8E7AB5] focus:ring-2 focus:ring-[#8E7AB5]/20 outline-none transition" 
                      type="text" 
                      name="nome" 
                      placeholder="Seu nome" 
                      value={formState.nome} 
                      onChange={(e) => setFormState({...formState, nome: e.target.value})} 
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#2D3121]">Telefone</label>
                    <input 
                      className="w-full px-4 py-3 border border-[#E8EAE0] rounded-xl focus:border-[#8E7AB5] focus:ring-2 focus:ring-[#8E7AB5]/20 outline-none transition" 
                      type="tel" 
                      name="telefone" 
                      placeholder="(00) 00000-0000" 
                      value={formState.telefone} 
                      onChange={(e) => setFormState({...formState, telefone: e.target.value})} 
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#2D3121]">Empresa</label>
                    <input 
                      className="w-full px-4 py-3 border border-[#E8EAE0] rounded-xl focus:border-[#8E7AB5] focus:ring-2 focus:ring-[#8E7AB5]/20 outline-none transition" 
                      type="text" 
                      name="empresa" 
                      placeholder="Nome da sua empresa" 
                      value={formState.empresa} 
                      onChange={(e) => setFormState({...formState, empresa: e.target.value})} 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#2D3121]">Email</label>
                    <input 
                      className="w-full px-4 py-3 border border-[#E8EAE0] rounded-xl focus:border-[#8E7AB5] focus:ring-2 focus:ring-[#8E7AB5]/20 outline-none transition" 
                      type="email" 
                      name="email" 
                      placeholder="voce@empresa.com.br" 
                      value={formState.email} 
                      onChange={(e) => setFormState({...formState, email: e.target.value})} 
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#2D3121]">Mensagem</label>
                    <textarea 
                      className="w-full px-4 py-3 border border-[#E8EAE0] rounded-xl focus:border-[#8E7AB5] focus:ring-2 focus:ring-[#8E7AB5]/20 outline-none transition min-h-[100px] resize-none" 
                      name="mensagem" 
                      placeholder="Conte sobre sua empresa e o objetivo da consultoria..." 
                      value={formState.mensagem} 
                      onChange={(e) => setFormState({...formState, mensagem: e.target.value})} 
                      required 
                    />
                  </div>
                  <button 
                    type="submit" 
                    className="w-full py-3 text-white bg-[#8E7AB5] rounded-full hover:bg-[#726191] transition shadow-md shadow-[#8E7AB5]/20 hover:shadow-lg"
                  >
                    {formStatus === "sending" ? "Enviando..." : formStatus === "success" ? "✓ Enviado!" : "Enviar Mensagem"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ===== RODAPÉ ===== */}
      <footer className="border-t border-[#E8EAE0] bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-[#2D3121]">TRIVOR</span>
                <span className="text-[#8E7AB5]">™</span>
              </div>
              <p className="mt-2 text-sm text-[#5C6347]">Gestão & Estratégia Empresarial</p>
              <p className="mt-4 text-sm text-[#5C6347]">© 2026 TRIVOR. Todos os direitos reservados.</p>
            </div>
            <div>
              <h4 className="font-semibold text-[#2D3121]">Menu</h4>
              <ul className="mt-3 space-y-2 text-sm text-[#5C6347]">
                {navLinks.map((link) => (
                  <li key={link.id}><a href={`#${link.id}`} className="hover:text-[#8E7AB5] transition">{link.label}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-[#2D3121]">Contato</h4>
              <ul className="mt-3 space-y-2 text-sm text-[#5C6347]">
                <li><a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#8E7AB5] transition">WhatsApp</a></li>
                <li><a href={`mailto:${emailContato}`} className="hover:text-[#8E7AB5] transition">{emailContato}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-[#2D3121]">Acessos</h4>
              <ul className="mt-3 space-y-2 text-sm text-[#5C6347]">
                <li><Link href="/login" className="hover:text-[#8E7AB5] transition">Entrar</Link></li>
                <li><Link href="/cadastro" className="hover:text-[#8E7AB5] transition">Cadastrar</Link></li>
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
