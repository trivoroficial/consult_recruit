'use client'

import { AnimatePresence, motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from "react";
import Link from 'next/link'
import Image from 'next/image'
import { cn } from "@/lib/utils"

// ===== DADOS =====
type SectionLink = {
  id: string;
  label: string;
  submenu?: { id: string; label: string }[];
};

type ServiceGroup = {
  title: string;
  items: string[];
};

type GalleryItem = {
  src: string;
  alt: string;
  title: string;
};

type Testimonial = {
  quote: string;
  author: string;
  role: string;
  photo: string;
};

const navLinks: SectionLink[] = [
  { id: "home", label: "Início" },
  { 
    id: "sobre", 
    label: "Sobre",
    submenu: [
      { id: "quem-somos", label: "Quem Somos" },
      { id: "diferenciais", label: "Diferenciais" },
      { id: "processo", label: "Processo" }
    ]
  },
  { 
    id: "servicos", 
    label: "Serviços",
    submenu: [
      { id: "estrategia-gestao", label: "Estratégia e Gestão" },
      { id: "pessoas-cultura", label: "Pessoas e Cultura" },
      { id: "tecnologia", label: "Tecnologia e IA" }
    ]
  },
  { id: "resultados", label: "Resultados" },
  { id: "contato", label: "Contato" },
];

const whatsappNumber = "5534991177058";
const whatsappMessage = "Olá! Gostaria de conhecer as soluções da TRIVOR.";
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
const emailContato = "contato@trivor.com.br";

// ===== MENSAGENS DE VALOR =====
const valueMessages = [
  { 
    icon: "🎯", 
    title: "Decisões Estratégicas",
    description: "Enquanto o mercado reage, você antecipa. Cada decisão se torna um ativo que seus concorrentes não terão acesso."
  },
  { 
    icon: "⚡", 
    title: "Excelência que se Revela",
    description: "Não precisa ser explicada. Ela aparece nos resultados, nos números e na forma como sua empresa é vista."
  },
  { 
    icon: "🌱", 
    title: "Crescimento Sustentável",
    description: "Mais que um projeto, você constrói a base para as próximas décadas. O legado que ninguém tira de você."
  },
  { 
    icon: "🔮", 
    title: "Visão de Futuro",
    description: "O líder que vê o futuro não espera. Ele constrói. E transforma visão em realidade tangível."
  },
];

// ===== DEPOIMENTOS =====
const testimonials: Testimonial[] = [
  {
    quote: "A TRIVOR transformou nossa gestão de pessoas. Em 6 meses, reduzimos o turnover em 40% e aumentamos a satisfação dos colaboradores em 85%.",
    author: "Carlos Eduardo",
    role: "CEO, Grupo XPTO",
    photo: "https://images.pexels.com/photos/5484072/pexels-photo-5484072.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=900",
  },
  {
    quote: "O processo de recrutamento com a TRIVOR é impressionante. Encontraram o profissional perfeito para nossa diretoria em tempo recorde.",
    author: "Mariana Oliveira",
    role: "Diretora de RH, Indústria ABC",
    photo: "https://images.pexels.com/photos/5484072/pexels-photo-5484072.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=900",
  },
];

// ===== DIFERENCIAIS =====
const differentiators = [
  { title: "Inteligência Estratégica", text: "Análise de dados e IA para decisões mais assertivas e competitivas." },
  { title: "Gestão de Talentos", text: "Atração, desenvolvimento e retenção dos melhores profissionais do mercado." },
  { title: "Consultoria Personalizada", text: "Soluções sob medida para cada organização, com foco em resultados." },
  { title: "Tecnologia Aplicada", text: "Plataforma SaaS com inteligência artificial para otimizar processos." },
  { title: "Ciência & Método", text: "Recomendações fundamentadas em análise, observação e método." },
  { title: "Resultados Mensuráveis", text: "KPIs claros e acompanhamento contínuo para garantir o sucesso." },
];

// ===== SERVIÇOS =====
const serviceGroups: ServiceGroup[] = [
  {
    title: "Recrutamento & Seleção",
    items: ["Executive Search", "Headhunting", "Triagem Inteligente", "Banco de Talentos", "Matching com IA"],
  },
  {
    title: "Gestão de Pessoas",
    items: ["Pesquisa de Clima", "Avaliação de Desempenho", "Treinamentos", "Plano de Carreira", "Liderança"],
  },
  {
    title: "Consultoria Estratégica",
    items: ["Diagnóstico Empresarial", "Planejamento Financeiro", "Estrutura Organizacional", "Governança", "Sucessão"],
  },
  {
    title: "Tecnologia & IA",
    items: ["Análise de Currículos", "Matching Inteligente", "Ranking de Talentos", "Relatórios Avançados", "Dashboards"],
  },
];

const processSteps = ["Diagnóstico", "Planejamento", "Implantação", "Monitoramento", "Resultados"];

// ===== ANIMAÇÕES =====
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

// ===== COMPONENTES =====
function ArrowButton({
  label,
  href,
  tone = "gold",
  onClick,
  type = "button",
  target = "_self",
  size = "default",
}: {
  label: string;
  href?: string;
  tone?: "gold" | "dark";
  onClick?: () => void;
  type?: "button" | "submit";
  target?: "_self" | "_blank";
  size?: "default" | "sm";
}) {
  const isGold = tone === "gold";
  
  const baseClasses = cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-[0.18em] transition duration-300",
    size === "sm" ? "px-4 py-2 text-xs" : "px-5 py-2.5 text-xs"
  );

  const toneClasses = isGold
    ? "bg-[#8E7AB5] shadow-[0_12px_30px_rgba(142,122,181,0.25)] hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(142,122,181,0.35)]"
    : "bg-[#5C6347] border-2 border-white/40 shadow-[0_8px_24px_rgba(0,0,0,0.3)] hover:bg-[#4A5039] hover:border-[#8E7AB5]/60";

  const textColor = isGold ? "#FFFFFF" : "#FFFFFF";

  const content = (
    <>
      <span style={{ color: textColor }}>{label}</span>
      <span aria-hidden="true" style={{ color: textColor }}>→</span>
    </>
  );

  if (href) {
    return (
      <a 
        className={cn(baseClasses, toneClasses)} 
        href={href} 
        onClick={onClick} 
        target={target} 
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
      >
        {content}
      </a>
    );
  }

  return (
    <button className={cn(baseClasses, toneClasses)} onClick={onClick} type={type}>
      {content}
    </button>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
  center = false,
}: {
  eyebrow: string;
  title: string;
  description: string;
  center?: boolean;
}) {
  return (
    <motion.div
      className={cn("space-y-4", center && "mx-auto max-w-3xl text-center")}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
      }}
    >
      <motion.p className="text-xs tracking-[0.36em] text-[#8E7AB5] uppercase" variants={fadeUp}>{eyebrow}</motion.p>
      <motion.h2 className="max-w-4xl font-serif text-4xl leading-tight text-white md:text-5xl lg:text-6xl" variants={fadeUp}>{title}</motion.h2>
      <motion.p className="max-w-3xl text-base leading-8 text-white/72 md:text-lg" variants={fadeUp}>{description}</motion.p>
    </motion.div>
  );
}

function GlassPanel({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("glass-panel", className)}>{children}</div>;
}

function Icon({ name }: { name: string }) {
  const common = "h-6 w-6";
  switch (name) {
    case "precision":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M12 3v3" /><path d="M12 18v3" /><path d="M3 12h3" /><path d="M18 12h3" />
          <circle cx="12" cy="12" r="4.5" /><circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
        </svg>
      );
    case "leaf":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M19 5c-6.5 0-12 5.5-12 12 0 1.1.9 2 2 2 6.5 0 12-5.5 12-12 0-1.1-.9-2-2-2Z" />
          <path d="M7 17c4.2-1 7.7-4.5 10-10" strokeLinecap="round" />
        </svg>
      );
    case "chart":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M4 19h16" /><path d="M6 16V9" /><path d="M12 16V5" /><path d="M18 16v-7" />
        </svg>
      );
    case "talent":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      );
    case "science":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 3h4" /><path d="M12 3v6l5 8a2 2 0 0 1-1.7 3H8.7A2 2 0 0 1 7 17l5-8V3" /><path d="M8.5 14h7" />
        </svg>
      );
    default:
      return (<svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="9" /></svg>);
  }
}

// ===== PÁGINA PRINCIPAL =====
export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);
  const [formState, setFormState] = useState({
    nome: "", telefone: "", empresa: "", email: "", mensagem: "",
  });
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const prefersReducedMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement | null>(null);
  const galleryIntervalRef = useRef<number | null>(null);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const videoY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const overlayY = useTransform(scrollYProgress, [0, 1], [0, 65]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;
    galleryIntervalRef.current = window.setInterval(() => {
      setCurrentGalleryIndex((prev) => (prev + 1) % 4);
    }, 4000);
    return () => {
      if (galleryIntervalRef.current) clearInterval(galleryIntervalRef.current);
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const timer = window.setInterval(() => {
      setActiveTestimonial((current) => (current + 1) % testimonials.length);
    }, 6000);
    return () => window.clearInterval(timer);
  }, [prefersReducedMotion]);

  const floatingParticles = useMemo(
    () => [
      { top: "12%", left: "9%", size: 9, delay: 0 },
      { top: "20%", left: "76%", size: 11, delay: 1.6 },
      { top: "62%", left: "16%", size: 8, delay: 0.8 },
      { top: "72%", left: "80%", size: 12, delay: 1.1 },
      { top: "40%", left: "50%", size: 7, delay: 2.2 },
    ],
    [],
  );

  const galleryItems: GalleryItem[] = [
    { src: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=1600", alt: "Equipe em reunião", title: "Consultoria Estratégica" },
    { src: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=1600", alt: "Análise de dados", title: "Inteligência de Dados" },
    { src: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=1600", alt: "Planejamento", title: "Planejamento Estratégico" },
    { src: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=1600", alt: "Resultados", title: "Resultados Mensuráveis" },
  ];

  const submitContact = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormStatus("sending");
    // Simula envio
    setTimeout(() => {
      setFormStatus("success");
      setFormState({ nome: "", telefone: "", empresa: "", email: "", mensagem: "" });
      setTimeout(() => setFormStatus("idle"), 4000);
    }, 1500);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#F5F6F7] text-[#1F2933]">
      {/* ===== HEADER ===== */}
      <header className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-all duration-500",
        scrolled 
          ? "border-[#5C6347]/10 bg-white/95 backdrop-blur-xl shadow-[0_18px_60px_rgba(0,0,0,0.08)]" 
          : "border-transparent bg-white"
      )}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
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

          <nav className="hidden items-center gap-6 lg:flex">
            {navLinks.map((link) => (
              <div 
                key={link.id}
                className="relative group"
                onMouseEnter={() => setActiveSubmenu(link.id)}
                onMouseLeave={() => setActiveSubmenu(null)}
              >
                <a className="text-sm font-medium tracking-[0.08em] text-[#1F2933] transition hover:text-[#5C6347]" href={`#${link.id}`}>
                  {link.label}
                </a>
                {link.submenu && (
                  <div className={cn(
                    "absolute left-0 top-full pt-2 transition-all duration-200",
                    activeSubmenu === link.id ? "opacity-100 visible" : "opacity-0 invisible"
                  )}>
                    <div className="min-w-[220px] rounded-2xl bg-white p-2 shadow-[0_18px_60px_rgba(0,0,0,0.12)] border border-[#5C6347]/10">
                      {link.submenu.map((sub) => (
                        <a key={sub.id} href={`#${sub.id}`} className="block rounded-xl px-4 py-3 text-sm text-[#1F2933] transition hover:bg-[#5C6347]/5 hover:text-[#5C6347]">
                          {sub.label}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            <div className="flex items-center gap-2">
              <ArrowButton label="Diagnóstico" href="#contato" tone="gold" size="sm" />
              <ArrowButton label="Especialista" href={whatsappUrl} tone="dark" target="_blank" size="sm" />
            </div>
          </nav>

          <button
            className="inline-flex flex-col items-center justify-center gap-1 rounded-xl border border-[#5C6347]/20 bg-white px-4 py-3 text-[#1F2933] transition hover:bg-[#5C6347]/5 lg:hidden"
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-label="Abrir menu"
          >
            <span className="block h-0.5 w-5 bg-[#5C6347]" />
            <span className="block h-0.5 w-5 bg-[#5C6347]" />
            <span className="block h-0.5 w-5 bg-[#5C6347]" />
          </button>
        </div>

        <AnimatePresence>
          {menuOpen ? (
            <motion.div
              className="border-t border-[#5C6347]/10 bg-white px-4 py-5 lg:hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="mx-auto flex max-w-7xl flex-col gap-3">
                {navLinks.map((link) => (
                  <div key={link.id}>
                    <a className="block rounded-xl px-3 py-3 text-base font-medium text-[#1F2933] transition hover:bg-[#5C6347]/5 hover:text-[#5C6347]" href={`#${link.id}`} onClick={() => setMenuOpen(false)}>
                      {link.label}
                    </a>
                    {link.submenu && (
                      <div className="ml-4 space-y-1 border-l-2 border-[#5C6347]/20 pl-4">
                        {link.submenu.map((sub) => (
                          <a key={sub.id} href={`#${sub.id}`} className="block rounded-xl px-3 py-2 text-sm text-[#1F2933]/70 transition hover:bg-[#5C6347]/5 hover:text-[#5C6347]" onClick={() => setMenuOpen(false)}>
                            {sub.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="flex flex-col gap-3">
                  <ArrowButton label="Diagnóstico" href="#contato" tone="gold" onClick={() => setMenuOpen(false)} />
                  <ArrowButton label="Especialista" href={whatsappUrl} tone="dark" onClick={() => setMenuOpen(false)} target="_blank" />
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>

      <main>
        {/* ===== HERO ===== */}
        <section ref={heroRef} id="home" className="relative flex min-h-[100svh] items-center overflow-hidden pt-20">
          <motion.div className="absolute inset-0" style={{ y: videoY, scale: videoScale }}>
            <div className="h-full w-full bg-gradient-to-br from-[#2D3121] via-[#5C6347] to-[#8E7AB5]"></div>
          </motion.div>

          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(45,49,33,0.92)_0%,rgba(45,49,33,0.7)_40%,rgba(45,49,33,0.2)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(45,49,33,0.24)_0%,rgba(45,49,33,0.45)_100%)]" />

          {floatingParticles.map((particle, index) => (
            <motion.span
              key={index}
              className="absolute rounded-full bg-[#8E7AB5] shadow-[0_0_24px_rgba(142,122,181,0.65)]"
              style={{ top: particle.top, left: particle.left, width: particle.size, height: particle.size }}
              animate={prefersReducedMotion ? undefined : { y: [0, -18, 0], opacity: [0.35, 1, 0.35] }}
              transition={prefersReducedMotion ? undefined : { duration: 4 + index, repeat: Infinity, delay: particle.delay }}
            />
          ))}

          <motion.div className="relative z-10 mx-auto flex w-full max-w-7xl px-4 sm:px-6 lg:px-8" style={{ y: overlayY }}>
            <div className="max-w-4xl space-y-8 py-12 lg:py-20">
              <motion.div className="inline-flex items-center gap-3 rounded-full border border-[#8E7AB5]/20 bg-white/8 px-4 py-2 text-[11px] tracking-[0.34em] text-white/75 backdrop-blur-md uppercase" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                <span className="h-2 w-2 rounded-full bg-[#8E7AB5] shadow-[0_0_18px_rgba(142,122,181,0.75)]" />
                A vanguarda em consultoria estratégica
              </motion.div>

              <motion.div className="space-y-4" initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.8 }}>
                <p className="font-serif text-5xl tracking-[0.22em] text-white/96 sm:text-6xl lg:text-7xl xl:text-8xl">TRIVOR</p>
                <p className="text-sm tracking-[0.32em] text-[#8E7AB5] uppercase sm:text-base">Gestão & Estratégia Empresarial</p>
              </motion.div>

              <motion.h1 className="max-w-4xl font-serif text-5xl leading-[1.02] text-white sm:text-6xl lg:text-7xl xl:text-8xl" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.85 }}>
                Transforme seu negócio com inteligência estratégica.
              </motion.h1>

              <motion.p className="max-w-2xl text-lg leading-8 text-white/78 md:text-xl" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.85 }}>
                Na TRIVOR, cada organização recebe uma estratégia personalizada para crescer, otimizar processos e construir um legado sustentável.
              </motion.p>

              <motion.div className="flex flex-col gap-3 sm:flex-row" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.85 }}>
                <ArrowButton label="Diagnóstico" href="#contato" tone="gold" />
                <ArrowButton label="Especialista" href={whatsappUrl} tone="dark" target="_blank" />
              </motion.div>
            </div>
          </motion.div>

          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#2D3121] to-transparent" />
        </section>

        {/* ===== MENSAGENS DE VALOR ===== */}
        <section className="border-y border-white/8 bg-[#2D3121] py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-xs tracking-[0.36em] text-[#8E7AB5] uppercase">O que você conquista ao escolher a excelência</p>
              <h2 className="mt-4 font-serif text-3xl text-white md:text-4xl">
                A diferença entre <span className="text-[#8E7AB5]">gerenciar</span> e <span className="text-[#8E7AB5]">protagonizar</span>
              </h2>
              <p className="mt-3 text-white/70 max-w-2xl mx-auto">Enquanto outros apenas reagem, você constrói um legado. Cada decisão se torna um ativo.</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {valueMessages.map((item, index) => (
                <motion.div key={index} className="glass-panel p-6 text-center transition hover:-translate-y-2 hover:border-[#8E7AB5]/30" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeUp}>
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="font-serif text-xl text-white">{item.title}</h3>
                  <p className="mt-3 text-sm text-white/80 leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== QUEM SOMOS ===== */}
        <section id="quem-somos" className="py-28 md:py-36 bg-[#5C6347]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <p className="text-xs tracking-[0.36em] text-[#8E7AB5] uppercase">Quem Somos</p>
              <h2 className="mt-4 font-serif text-4xl text-white md:text-5xl lg:text-6xl">
                Parceiros estratégicos na <br />
                <span className="text-[#8E7AB5]">evolução do seu negócio</span>
              </h2>
              <p className="mt-6 max-w-3xl mx-auto text-white/70 text-lg leading-8">
                Cada organização possui uma história. Nosso papel é transformar essa história em produtividade, rentabilidade e legado com rigor técnico, visão de futuro e presença constante ao lado do cliente.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {[
                { title: "Missão", icon: "leaf", text: "Ativar o máximo potencial das organizações por meio de estratégia, dados e gestão integrada." },
                { title: "Visão", icon: "chart", text: "Ser a consultoria mais eficiente e inspiradora do Brasil, referência em resultados." },
                { title: "Valores", icon: "science", text: "Rigor técnico, transparência, inovação, sustentabilidade, parceria genuína e resultados tangíveis." },
              ].map((item) => (
                <motion.div key={item.title} className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-[#4A5039]/40 to-[#8E7AB5]/10 p-8 transition-all duration-500 hover:-translate-y-2 hover:border-[#8E7AB5]/30" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeUp}>
                  <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#8E7AB5]/5 blur-3xl transition duration-700 group-hover:bg-[#8E7AB5]/15" />
                  <div className="relative">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[#8E7AB5]/25 bg-[#8E7AB5]/10 text-[#8E7AB5] transition group-hover:scale-110 group-hover:bg-[#8E7AB5]/20">
                      <Icon name={item.icon} />
                    </div>
                    <h3 className="mt-6 font-serif text-3xl text-white">{item.title}</h3>
                    <div className="mt-3 h-1 w-12 rounded-full bg-gradient-to-r from-[#8E7AB5] to-transparent" />
                    <p className="mt-5 text-base leading-7 text-white/75">{item.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== ESTRATÉGIAS ===== */}
        <section id="estrategias" className="py-24 md:py-32 bg-[#5C6347]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="Estratégias" title="O selo de excelência que consolida organizações mais prósperas e eficientes." description="Nosso método combina ciência aplicada, inteligência estratégica e visão empresarial para organizar a operação, fortalecer a tomada de decisão e valorizar o patrimônio do cliente." center />
            <div className="mt-14 grid gap-4 lg:grid-cols-3">
              {[
                {
                  title: "Decisão guiada por dados",
                  text: "Transformamos análises e monitoramento em um plano claro para crescer, reduzir riscos e otimizar resultados."
                },
                {
                  title: "Gestão de rentabilidade",
                  text: "Cada processo é tratado como patrimônio produtivo, com foco em retorno, previsibilidade e eficiência operacional."
                },
                {
                  title: "Legado sustentável",
                  text: "Unimos ciência e responsabilidade para fortalecer a operação e a sucessão das próximas gerações."
                }
              ].map((pillar, index) => (
                <motion.div key={pillar.title} className="glass-panel relative overflow-hidden p-8" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.35 }} variants={fadeUp} whileHover={{ y: -8 }} transition={{ duration: 0.35 }}>
                  <div className="absolute right-0 top-0 h-20 w-20 rounded-full bg-[#8E7AB5]/10 blur-2xl" />
                  <div className="flex items-center justify-between text-[#8E7AB5]">
                    <span className="text-xs tracking-[0.32em] uppercase">0{index + 1}</span>
                    <span className="h-px flex-1 bg-gradient-to-r from-[#8E7AB5]/60 to-transparent" />
                  </div>
                  <h3 className="mt-8 font-serif text-3xl text-white">{pillar.title}</h3>
                  <p className="mt-4 max-w-md text-sm leading-7 text-white/72">{pillar.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== DIFERENCIAIS ===== */}
        <section id="diferenciais" className="py-24 md:py-32 bg-[#5C6347]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="Diferenciais" title="Porque escolher a TRIVOR?" description="Uma experiência premium de consultoria que une inteligência estratégica, gestão de pessoas e tecnologia para elevar a tomada de decisão." center />
            <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {differentiators.map((item, index) => (
                <motion.div key={item.title} className="group glass-panel p-6 transition duration-300 hover:border-[#8E7AB5]/35 hover:bg-white/8" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.35 }} variants={fadeUp} whileHover={{ y: -8 }} transition={{ duration: 0.35 }}>
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-[22px] border border-white/10 bg-white/6 text-[#8E7AB5] transition group-hover:border-[#8E7AB5]/40 group-hover:bg-[#8E7AB5]/10">
                      <Icon name={index % 2 === 0 ? "precision" : "talent"} />
                    </div>
                    <h3 className="font-serif text-2xl text-white">{item.title}</h3>
                  </div>
                  <p className="mt-5 text-sm leading-7 text-white/72">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== SERVIÇOS ===== */}
        <section id="servicos" className="py-24 md:py-32 bg-[#5C6347]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="Serviços" title="Soluções completas para organizações de alta performance." description="Cada serviço foi organizado para transmitir clareza, escala e amplitude técnica, com a elegância de uma consultoria global." center />
            <div className="mt-16 grid gap-4 lg:grid-cols-4">
              {serviceGroups.map((group, groupIndex) => (
                <motion.div key={group.title} className="group glass-panel p-7" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeUp} whileHover={{ y: -6 }}>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#8E7AB5]/12 text-[#8E7AB5]">
                      <Icon name={groupIndex === 0 ? "talent" : groupIndex === 1 ? "leaf" : groupIndex === 2 ? "chart" : "precision"} />
                    </div>
                    <h3 className="font-serif text-xl text-white">{group.title}</h3>
                  </div>
                  <div className="mt-7 grid gap-3">
                    {group.items.map((item) => (
                      <div key={item} className="rounded-[22px] border border-white/8 bg-white/4 px-4 py-4 text-sm tracking-[0.06em] text-white/82 transition group-hover:border-[#8E7AB5]/30 group-hover:bg-white/8">
                        {item}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== PROCESSO ===== */}
        <section id="processo" className="py-24 md:py-32 bg-[#5C6347]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="Processo" title="Como trabalhamos" description="Uma jornada clara e acompanhada de perto, da análise da organização à geração de resultados mensuráveis." center />
            <div className="relative mt-16">
              <motion.div className="absolute left-6 right-6 top-7 hidden h-px origin-left bg-gradient-to-r from-transparent via-[#8E7AB5]/80 to-transparent md:block" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 1.1, ease: "easeOut" }} />
              <div className="grid gap-4 md:grid-cols-5">
                {processSteps.map((step, index) => (
                  <motion.div key={step} className="relative glass-panel p-6 text-center" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeUp}>
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#8E7AB5]/30 bg-[#8E7AB5]/12 font-serif text-2xl text-[#8E7AB5]">0{index + 1}</div>
                    <h3 className="mt-5 font-serif text-2xl text-white">{step}</h3>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===== DEPOIMENTOS ===== */}
        <section id="resultados" className="py-28 md:py-36 bg-[#5C6347]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="Depoimentos" title="A confiança de quem transforma sua organização." description="A percepção do cliente confirma a qualidade da consultoria e o impacto da parceria." center />
            <div className="mt-14 grid gap-4 lg:grid-cols-[1fr_1.18fr]">
              <GlassPanel className="p-6 lg:p-8">
                <div className="flex items-center justify-between">
                  <p className="text-sm tracking-[0.28em] text-[#8E7AB5] uppercase">Depoimento</p>
                  <div className="flex gap-2">
                    {testimonials.map((_, index) => (
                      <button key={index} type="button" className={cn("h-2.5 rounded-full transition-all", index === activeTestimonial ? "w-8 bg-[#8E7AB5]" : "w-2.5 bg-white/30")} onClick={() => setActiveTestimonial(index)} aria-label={`Ver depoimento ${index + 1}`} />
                    ))}
                  </div>
                </div>
                <div className="mt-8 overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div key={activeTestimonial} className="space-y-6" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} transition={{ duration: 0.45 }}>
                      <div className="flex items-center gap-4">
                        <img src={testimonials[activeTestimonial].photo} alt={testimonials[activeTestimonial].author} className="h-16 w-16 rounded-2xl object-cover" />
                        <div>
                          <p className="font-serif text-2xl text-white">{testimonials[activeTestimonial].author}</p>
                          <p className="text-sm text-white/65">{testimonials[activeTestimonial].role}</p>
                        </div>
                      </div>
                      <p className="text-xl leading-9 text-white/86 md:text-2xl">"{testimonials[activeTestimonial].quote}"</p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </GlassPanel>

              <GlassPanel className="relative overflow-hidden p-8 lg:p-10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(142,122,181,0.16),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(92,99,71,0.18),transparent_32%)]" />
                <div className="relative">
                  <p className="text-xs tracking-[0.36em] text-[#8E7AB5] uppercase">Performance observada</p>
                  <h3 className="mt-4 font-serif text-4xl text-white">Resultados que aparecem no balanço e na cultura.</h3>
                  <ul className="mt-8 space-y-5 text-white/76">
                    <li>Redução de custos e melhor uso dos recursos organizacionais.</li>
                    <li>Processos acompanhados de perto para reduzir falhas e elevar eficiência.</li>
                    <li>Consultoria presente desde o planejamento até a execução e pós-implantação.</li>
                  </ul>
                  <div className="mt-10 rounded-[28px] border border-white/10 bg-white/4 p-6 text-sm leading-7 text-white/72">Nosso foco é ampliar produtividade com segurança técnica e uma gestão capaz de proteger o patrimônio do cliente.</div>
                </div>
              </GlassPanel>
            </div>
          </div>
        </section>

        {/* ===== CTA GIGANTE ===== */}
        <section className="py-24 md:py-32 bg-[#5C6347]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="overflow-hidden rounded-[40px] border border-white/10 bg-[#4A5039] px-6 py-16 text-center shadow-[0_28px_100px_rgba(0,0,0,0.32)] sm:px-10 lg:px-16">
              <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.7 }} className="mx-auto max-w-4xl">
                <p className="text-xs tracking-[0.38em] text-[#8E7AB5] uppercase">Sua organização pode ir muito mais longe</p>
                <h2 className="mt-5 font-serif text-4xl leading-tight text-white md:text-6xl">Sua empresa pode crescer muito mais.</h2>
                <p className="mt-5 text-lg leading-8 text-white/80">Vamos conversar e transformar inteligência em produtividade, rentabilidade e legado.</p>
                <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
                  <ArrowButton label="Diagnóstico" href="#contato" tone="gold" />
                  <ArrowButton label="Especialista" href={whatsappUrl} tone="dark" target="_blank" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ===== CONTATO ===== */}
        <section id="contato" className="py-24 md:py-32 bg-[#5C6347]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading 
              eyebrow="Contato" 
              title="O momento de agir é agora" 
              description="Enquanto você pensa, outro líder já está colhendo resultados. Cada decisão adiada é uma oportunidade que passa." 
              center 
            />
            <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1fr]">
              <GlassPanel className="p-8 lg:p-10 flex flex-col justify-between">
                <div>
                  <p className="text-xs tracking-[0.36em] text-[#8E7AB5] uppercase">Por que agora?</p>
                  <h3 className="mt-4 font-serif text-3xl text-white">O líder que vence não espera o momento perfeito. Ele cria.</h3>
                  
                  <div className="mt-8 space-y-4">
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 transition-all duration-300 hover:border-[#25D366]/40 hover:bg-[#25D366]/10 hover:-translate-y-0.5">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#25D366]/15 text-[#25D366] transition group-hover:bg-[#25D366]/25">
                        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="font-serif text-lg text-white">Falar com Especialista</p>
                        <p className="text-xs text-white/60">Conversa direta e personalizada</p>
                      </div>
                      <svg className="h-5 w-5 text-white/40 transition group-hover:text-[#25D366] group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </a>

                    <a href={`mailto:${emailContato}`} className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 transition-all duration-300 hover:border-[#8E7AB5]/40 hover:bg-[#8E7AB5]/10 hover:-translate-y-0.5">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#8E7AB5]/15 text-[#8E7AB5] transition group-hover:bg-[#8E7AB5]/25">
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                      </div>
                      <div className="flex-1">
                        <p className="font-serif text-lg text-white">Envie um Email</p>
                        <p className="text-xs text-white/60">{emailContato}</p>
                      </div>
                      <svg className="h-5 w-5 text-white/40 transition group-hover:text-[#8E7AB5] group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </a>

                    <div className="mt-10 pt-8 border-t border-white/10">
                      <div className="space-y-6">
                        <div className="flex items-start gap-3">
                          <div className="mt-1 text-[#8E7AB5] flex-shrink-0">
                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                            </svg>
                          </div>
                          <div>
                            <p className="font-serif text-lg text-white mb-2">Você já sabe que pode ir além</p>
                            <p className="text-sm text-white/70 leading-relaxed">
                              No fundo, você já percebeu que sua organização tem um potencial que ainda não foi liberado. A questão não é <em>se</em> você pode crescer. É <em>quando</em> você vai decidir começar.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="mt-1 text-[#8E7AB5] flex-shrink-0">
                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                            </svg>
                          </div>
                          <div>
                            <p className="font-serif text-lg text-white mb-2">O custo de esperar é maior do que você imagina</p>
                            <p className="text-sm text-white/70 leading-relaxed">
                              Cada ciclo sem uma estratégia clara é uma oportunidade que não volta. Enquanto você adia, outro líder está na frente.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="mt-1 text-[#8E7AB5] flex-shrink-0">
                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                            </svg>
                          </div>
                          <div>
                            <p className="font-serif text-lg text-white mb-2">Não é sobre gasto. É sobre investimento no seu legado</p>
                            <p className="text-sm text-white/70 leading-relaxed">
                              O que você constrói hoje não é só para você. É para quem vem depois. Para a tranquilidade de saber que fez tudo o que podia.
                            </p>
                          </div>
                        </div>

                        <div className="mt-8 p-5 rounded-2xl border border-[#8E7AB5]/30 bg-gradient-to-r from-[#8E7AB5]/10 to-transparent">
                          <p className="text-center font-serif text-lg text-white mb-2">
                            Daqui a um ano, você vai agradecer a decisão que tomar hoje.
                          </p>
                          <p className="text-center text-sm text-[#8E7AB5]">
                            Ou vai se perguntar por que esperou tanto.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </GlassPanel>

              <GlassPanel className="p-6 sm:p-8 lg:p-10">
                <div>
                  <p className="text-sm tracking-[0.28em] text-[#8E7AB5] uppercase">Formulário</p>
                  <h3 className="mt-3 font-serif text-3xl text-white">Solicitar Diagnóstico</h3>
                </div>
                <form className="mt-8 grid gap-4" onSubmit={submitContact}>
                  {[
                    { name: "nome", label: "Nome completo", type: "text", placeholder: "Seu nome" },
                    { name: "telefone", label: "Telefone", type: "tel", placeholder: "(00) 00000-0000" },
                    { name: "empresa", label: "Empresa", type: "text", placeholder: "Nome da sua empresa" },
                    { name: "email", label: "Email", type: "email", placeholder: "voce@empresa.com.br" },
                  ].map((field) => (
                    <label key={field.name} className="grid gap-2 text-sm text-white/74">
                      <span>{field.label}</span>
                      <input className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-white/40 focus:border-[#8E7AB5] focus:outline-none focus:ring-2 focus:ring-[#8E7AB5]/30 transition" type={field.type} name={field.name} placeholder={field.placeholder} value={formState[field.name as keyof typeof formState]} onChange={(event) => setFormState((current) => ({ ...current, [field.name]: event.target.value }))} required />
                    </label>
                  ))}
                  <label className="grid gap-2 text-sm text-white/74">
                    <span>Mensagem</span>
                    <textarea className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-white/40 focus:border-[#8E7AB5] focus:outline-none focus:ring-2 focus:ring-[#8E7AB5]/30 transition min-h-36 resize-none" name="mensagem" placeholder="Conte um pouco sobre sua empresa e o principal objetivo da consultoria." value={formState.mensagem} onChange={(event) => setFormState((current) => ({ ...current, mensagem: event.target.value }))} required />
                  </label>
                  <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
                    <ArrowButton label={formStatus === "sending" ? "Enviando..." : "Enviar"} tone="gold" type="submit" />
                    {formStatus === "success" && <p className="text-sm text-[#8E7AB5]">✓ Mensagem enviada!</p>}
                    {formStatus === "error" && <p className="text-sm text-[#8E7AB5]">Redirecionando...</p>}
                  </div>
                </form>
              </GlassPanel>
            </div>
          </div>
        </section>
      </main>

      {/* ===== RODAPÉ ===== */}
      <footer className="border-t border-gray-200 bg-white py-14">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1fr_0.8fr] lg:px-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12">
                <img src="/logo.png" alt="TRIVOR" className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-[#2D3121]">TRIVOR</span>
                <span className="text-[10px] font-light text-[#5C6347] tracking-wider uppercase">Gestão & Estratégia</span>
              </div>
            </div>
            <p className="max-w-sm text-sm leading-7 text-gray-700">Uma consultoria premium em gestão estratégica para organizações que buscam produtividade, rentabilidade e legado.</p>
            <p className="text-xs tracking-[0.3em] text-[#5C6347] uppercase font-medium">Cultivando inteligência. Colhendo resultados.</p>
          </div>

          <div>
            <p className="text-sm tracking-[0.28em] text-[#5C6347] uppercase font-medium">Menu</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {navLinks.map((link) => (
                <a key={link.id} href={`#${link.id}`} className="text-sm text-gray-700 transition hover:text-[#5C6347]">{link.label}</a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm tracking-[0.28em] text-[#5C6347] uppercase font-medium">Contato</p>
            <div className="mt-4 space-y-3 text-sm text-gray-700">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="block transition hover:text-[#25D366]">Especialista: +55 34 99117-7058</a>
              <a href={`mailto:${emailContato}`} className="block transition hover:text-[#5C6347]">Email: {emailContato}</a>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-4 border-t border-gray-200 px-4 pt-6 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>TRIVOR © 2026</p>
          <p>Estrutura preparada para Google Analytics, Meta Pixel e Google Ads.</p>
        </div>
      </footer>

      {/* ===== WHATSAPP FLUTUANTE ===== */}
      <a href={whatsappUrl} target="_blank" rel="noreferrer" className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_30px_rgba(37,211,102,0.4)] transition hover:scale-110 hover:shadow-[0_8px_40px_rgba(37,211,102,0.6)]" aria-label="Falar com Especialista">
        <span className="absolute inset-0 rounded-full bg-[#25D366]/40 animate-ping opacity-40" />
        <svg className="relative h-7 w-7" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

      {/* ===== ESTILOS GLOBAIS ===== */}
      <style jsx global>{`
        .glass-panel {
          background: rgba(255, 255, 255, 0.06);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 28px;
          transition: all 0.4s ease;
        }
        .glass-panel:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(142, 122, 181, 0.25);
        }
        .premium-input {
          @apply w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-white/40 focus:border-[#8E7AB5] focus:outline-none focus:ring-2 focus:ring-[#8E7AB5]/30 transition;
        }
        .section-kicker {
          @apply text-xs tracking-[0.36em] text-[#8E7AB5] uppercase;
        }
        @media (max-width: 768px) {
          .glass-panel {
            border-radius: 20px;
          }
        }
      `}</style>
    </div>
  );
}
