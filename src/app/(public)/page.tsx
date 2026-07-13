"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Users, Briefcase, TrendingUp, ShieldCheck, 
  ArrowRight, Zap, Building2, Crown, BarChart3, 
  ArrowUpRight, Target
} from 'lucide-react';

export default function Home() {
  const [activeJob, setActiveJob] = useState(0);

  const jobs = [
    { title: "Diretor de Operações (COO)", company: "Tech Global", salary: "R$ 32k + Bonus", tag: "Estratégico" },
    { title: "Gerente Sênior de RH", company: "Indústria 4.0", salary: "R$ 18k", tag: "Cultura" },
    { title: "Head de Finanças", company: "Agro de Elite", salary: "R$ 25k+", tag: "Financeiro" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveJob((prev) => (prev === jobs.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-trivor-bg">
      {/* ===== HERO SECTION (NEURO-ESTRATÉGIA) ===== */}
      <section className="relative pt-24 pb-32 overflow-hidden px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          
          <div className="z-10 space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-trivor-lilas/10 text-trivor-lilas text-xs font-black tracking-widest uppercase animate-pulse">
              <Zap size={14} /> Inteligência Híbrida Ativada
            </div>
            
            <h1 className="text-6xl md:text-8xl font-serif text-trivor-deep leading-tight">
              A maestria de <br/>
              <span className="text-trivor-lilas italic">gerir mentes.</span>
            </h1>
            
            <p className="text-xl text-trivor-oliva/80 max-w-lg leading-relaxed border-l-4 border-trivor-lilas pl-6">
              A TRIVOR não apenas preenche vagas. Nós orquestramos o crescimento da sua empresa através de <span className="font-bold text-trivor-deep">neuro-estratégia</span> e processos blindados.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="/cadastro" className="bg-trivor-lilas text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-xl shadow-trivor-lilas/30 hover:scale-105 transition-all flex items-center gap-2 group">
                Elevar minha Empresa <ArrowUpRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/servicos" className="border-2 border-trivor-oliva text-trivor-oliva px-10 py-5 rounded-2xl font-bold text-lg hover:bg-trivor-oliva hover:text-white transition-all">
                Explorar Soluções
              </Link>
            </div>

            {/* MÉTRICAS EM MINIATURA */}
            <div className="pt-10 grid grid-cols-3 gap-8 border-t border-trivor-lilas/10">
              <div>
                <p className="text-2xl font-bold text-trivor-deep">15k+</p>
                <p className="text-xs uppercase tracking-tighter text-trivor-oliva/60 font-bold">Talentos</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-trivor-deep">200+</p>
                <p className="text-xs uppercase tracking-tighter text-trivor-oliva/60 font-bold">Empresas</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-trivor-deep">90%</p>
                <p className="text-xs uppercase tracking-tighter text-trivor-oliva/60 font-bold">Satisfação</p>
              </div>
            </div>
          </div>

          {/* CARROSSEL DE VAGAS DINÂMICO */}
          <div className="relative group animate-float">
            <div className="absolute -inset-4 bg-gradient-to-tr from-trivor-lilas/20 to-trivor-oliva/20 blur-3xl rounded-full"></div>
            <div className="relative bg-white p-10 rounded-[2.5rem] shadow-[0_32px_64px_-15px_rgba(45,49,33,0.1)] border border-trivor-lilas/10">
              <div className="flex justify-between items-center mb-10">
                <span className="text-xs font-black tracking-[0.3em] uppercase text-trivor-lilas">Pipeline de Elite</span>
                <div className="flex gap-1.5">
                  {jobs.map((_, i) => (
                    <div key={i} className={`h-1.5 w-8 rounded-full transition-all duration-500 ${activeJob === i ? 'bg-trivor-lilas' : 'bg-trivor-lilas/20'}`} />
                  ))}
                </div>
              </div>

              <div className="min-h-[200px] transition-all duration-500">
                <span className="bg-trivor-oliva text-white text-[10px] px-3 py-1 rounded-md font-bold uppercase mb-4 inline-block">{jobs[activeJob].tag}</span>
                <h2 className="text-4xl font-bold text-trivor-deep mb-2">{jobs[activeJob].title}</h2>
                <p className="text-trivor-oliva font-medium text-lg mb-8 flex items-center gap-2">
                   <Building2 size={18} className="text-trivor-lilas" /> {jobs[activeJob].company}
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-trivor-bg p-4 rounded-2xl border border-trivor-lilas/5">
                    <p className="text-[10px] font-bold text-trivor-lilas uppercase mb-1">Remuneração</p>
                    <p className="font-bold text-trivor-deep">{jobs[activeJob].salary}</p>
                  </div>
                  <div className="bg-trivor-bg p-4 rounded-2xl border border-trivor-lilas/5">
                    <p className="text-[10px] font-bold text-trivor-lilas uppercase mb-1">Previsão</p>
                    <p className="font-bold text-trivor-deep italic font-serif">Imediata</p>
                  </div>
                </div>
              </div>

              <button className="w-full mt-10 bg-trivor-deep text-white py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-trivor-lilas transition-all shadow-lg group">
                Candidatura Private <Zap size={18} className="group-hover:fill-yellow-400 transition-colors" />
              </button>
            </div>
            
            {/* BADGE DE IA */}
            <div className="absolute -bottom-6 -left-6 bg-trivor-oliva text-white p-6 rounded-2xl shadow-2xl flex items-center gap-4 border-4 border-white">
              <Target size={30} className="text-trivor-lilas" />
              <div>
                <p className="text-[10px] font-black uppercase opacity-60">Score de Match</p>
                <p className="text-2xl font-bold tracking-tighter">98.4%</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ===== SOLUÇÕES (CARDS DE LUXO) ===== */}
      <section className="py-24 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl md:text-5xl font-serif text-trivor-deep">Arquitetura de <span className="text-trivor-oliva italic">Crescimento</span></h2>
            <p className="text-trivor-oliva/60 max-w-xl mx-auto">Sincronizamos pessoas e processos através de quatro pilares fundamentais.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Recrutamento & Seleção", icon: <Users />, desc: "Talentos mapeados psicologicamente para sua cultura.", color: "lilas" },
              { title: "Gestão de Pessoas", icon: <BarChart3 />, desc: "Desenvolvimento de lideranças e KPIs de performance.", color: "oliva" },
              { title: "Consultoria Financeira", icon: <TrendingUp />, desc: "Engenharia de caixa e valuation para expansão.", color: "lilas" },
              { title: "Segurança de Alimentos", icon: <ShieldCheck />, desc: "Blindagem de processos para indústrias competitivas.", color: "oliva" }
            ].map((card, i) => (
              <div key={i} className="group p-10 rounded-[2rem] bg-trivor-bg border border-transparent hover:border-trivor-lilas/20 hover:bg-white hover:shadow-2xl transition-all duration-500">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-colors ${card.color === 'lilas' ? 'bg-trivor-lilas/10 text-trivor-lilas group-hover:bg-trivor-lilas group-hover:text-white' : 'bg-trivor-oliva/10 text-trivor-oliva group-hover:bg-trivor-oliva group-hover:text-white'}`}>
                  {card.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-trivor-deep">{card.title}</h3>
                <p className="text-sm text-trivor-oliva/70 leading-relaxed mb-6">{card.desc}</p>
                <Link href="/servicos" className="inline-flex items-center text-xs font-black uppercase tracking-widest text-trivor-lilas group-hover:gap-3 transition-all">
                  Explorar <ArrowRight size={14} className="ml-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TECNOLOGIA INTELIGENTE (MODO DARK) ===== */}
      <section className="py-24 bg-trivor-deep text-white px-6 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-trivor-lilas opacity-10 blur-[150px]"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <Crown className="text-trivor-lilas mb-6 h-12 w-12" />
              <h2 className="text-4xl md:text-6xl font-serif leading-tight">A inteligência processa. <br/> <span className="text-trivor-lilas italic">O humano decide.</span></h2>
            </div>
            <Link href="/cadastro" className="bg-white text-trivor-deep px-8 py-4 rounded-xl font-bold hover:bg-trivor-lilas hover:text-white transition-all">
              Acessar Plataforma
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Neuro-Análise", desc: "Leitura comportamental de currículos via IA." },
              { title: "Matching Preditivo", desc: "Antecipamos o sucesso do candidato na vaga." },
              { title: "Ranking de Elite", desc: "Classificação automática dos Top 1% talentos." }
            ].map((item, i) => (
              <div key={i} className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                <Zap className="text-trivor-lilas mb-4" />
                <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA FINAL ===== */}
      <section className="py-24 bg-trivor-bg px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-10">
          <h2 className="text-4xl md:text-6xl font-serif text-trivor-deep leading-tight">
            Seu próximo nível de <span className="text-trivor-lilas italic">performance</span> começa agora.
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/cadastro" className="bg-trivor-lilas text-white px-12 py-5 rounded-2xl font-bold text-lg shadow-2xl shadow-trivor-lilas/20 hover:scale-105 transition-all">
              Solicitar Diagnóstico
            </Link>
            <Link href="/contato" className="bg-trivor-oliva text-white px-12 py-5 rounded-2xl font-bold text-lg shadow-2xl shadow-trivor-oliva/20 hover:scale-105 transition-all">
              Falar com Especialista
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
