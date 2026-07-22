'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Mail, Phone, MapPin, Send, 
  MessageCircle, Clock, Building2,
  Users, ChevronRight, CheckCircle,
  ArrowRight, Globe, Sparkles,
  Calendar, FileText, Headphones
} from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

export default function ContatoPage() {
  const [form, setForm] = useState({ 
    nome: '', 
    email: '', 
    telefone: '', 
    empresa: '',
    assunto: '',
    mensagem: '' 
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    setTimeout(() => {
      setStatus('success')
      setForm({ nome: '', email: '', telefone: '', empresa: '', assunto: '', mensagem: '' })
      setTimeout(() => setStatus('idle'), 3000)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-[#F8F4E6]">
      
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#2D343A] via-[#1A1A2E] to-[#0F0F1A] py-20 md:py-28">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[#8B0000]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-[#E3C9A8]/5 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div 
              className="inline-flex items-center gap-3 px-4 py-2 text-[11px] tracking-[0.34em] text-[#E3C9A8] uppercase font-medium border border-[#E3C9A8]/30 rounded-full bg-white/5 backdrop-blur-sm"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span className="h-2 w-2 rounded-full bg-[#E3C9A8]" />
              Fale Conosco
            </motion.div>

            <motion.h1 
              className="mt-6 font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
            >
              Vamos <br />
              <span className="text-[#E3C9A8]">transformar sua empresa</span>
            </motion.h1>

            <motion.p 
              className="mt-4 text-lg text-white/70 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.85 }}
            >
              Estamos prontos para ajudar sua empresa a alcançar o próximo nível. 
              Preencha o formulário ou fale diretamente com um especialista.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ===== CONTATO ===== */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-2">
            
            {/* FORMULÁRIO */}
            <motion.div 
              className="bg-white rounded-2xl p-8 border border-[#E8EAE0] shadow-sm"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
            >
              <div className="mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-[#8B0000] uppercase tracking-wider">Contato</span>
                  <span className="h-px w-8 bg-[#8B0000]"></span>
                </div>
                <h2 className="text-2xl font-bold text-[#2D343A] mt-1">
                  Envie sua <span className="text-[#8B0000]">mensagem</span>
                </h2>
                <p className="text-sm text-[#708090] mt-1">
                  Preencha o formulário e nossa equipe entrará em contato
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                      Nome completo <span className="text-[#8B0000]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition"
                      value={form.nome}
                      onChange={(e) => setForm({...form, nome: e.target.value})}
                      placeholder="Seu nome"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                      Email <span className="text-[#8B0000]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition"
                      value={form.email}
                      onChange={(e) => setForm({...form, email: e.target.value})}
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                      Telefone <span className="text-[#8B0000]">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition"
                      value={form.telefone}
                      onChange={(e) => setForm({...form, telefone: e.target.value})}
                      placeholder="(00) 00000-0000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                      Empresa
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition"
                      value={form.empresa}
                      onChange={(e) => setForm({...form, empresa: e.target.value})}
                      placeholder="Nome da sua empresa"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                    Assunto
                  </label>
                  <select
                    className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition"
                    value={form.assunto}
                    onChange={(e) => setForm({...form, assunto: e.target.value})}
                  >
                    <option value="">Selecione um assunto</option>
                    <option value="consultoria">Consultoria</option>
                    <option value="recrutamento">Recrutamento e Seleção</option>
                    <option value="treinamento">Treinamento</option>
                    <option value="seguranca">Segurança dos Alimentos</option>
                    <option value="outro">Outro</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                    Mensagem <span className="text-[#8B0000]">*</span>
                  </label>
                  <textarea
                    rows={5}
                    required
                    className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition resize-none"
                    value={form.mensagem}
                    onChange={(e) => setForm({...form, mensagem: e.target.value})}
                    placeholder="Conte sobre sua empresa e o que precisa..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full py-3.5 bg-[#8B0000] text-white rounded-lg hover:bg-[#700000] transition font-semibold flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg shadow-[#8B0000]/20 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                >
                  {status === 'sending' ? (
                    <span className="flex items-center gap-2">
                      <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                      Enviando...
                    </span>
                  ) : status === 'success' ? (
                    <>
                      <CheckCircle className="h-5 w-5" />
                      Mensagem enviada com sucesso!
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      Enviar Mensagem
                    </>
                  )}
                </button>

                {status === 'success' && (
                  <motion.div 
                    className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm text-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    ✅ Mensagem enviada com sucesso! Em breve entraremos em contato.
                  </motion.div>
                )}
              </form>
            </motion.div>

            {/* INFORMAÇÕES */}
            <motion.div 
              className="space-y-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              transition={{ delay: 0.2 }}
            >
              {/* CARD PRINCIPAL */}
              <div className="bg-gradient-to-br from-[#8B0000] to-[#5C0000] rounded-2xl p-8 text-white">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-white/10 rounded-lg">
                    <Headphones className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs text-[#E3C9A8] uppercase tracking-wider">Suporte Premium</p>
                    <p className="text-sm font-medium">Disponível 24/7</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition">
                    <Phone className="h-5 w-5 text-[#E3C9A8] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Telefone</p>
                      <p className="text-sm text-white/70">+55 37 99117-7058</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition">
                    <Mail className="h-5 w-5 text-[#E3C9A8] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-sm text-white/70">contato@zenthos.com.br</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition">
                    <MapPin className="h-5 w-5 text-[#E3C9A8] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Localização</p>
                      <p className="text-sm text-white/70">Uberlândia/MG</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition">
                    <Clock className="h-5 w-5 text-[#E3C9A8] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Horário de Atendimento</p>
                      <p className="text-sm text-white/70">Segunda a Sexta: 8h às 18h</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-white/10">
                  <a href="https://wa.me/5537991177058" target="_blank" rel="noopener noreferrer">
                    <button className="w-full py-3 bg-[#25D366] text-white rounded-lg hover:bg-[#1DA851] transition font-semibold flex items-center justify-center gap-2">
                      <MessageCircle className="h-5 w-5" />
                      Falar no WhatsApp
                    </button>
                  </a>
                </div>
              </div>

              {/* STATS */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl p-6 border border-[#E8EAE0] text-center">
                  <p className="text-2xl font-bold text-[#8B0000]">500+</p>
                  <p className="text-sm text-[#708090]">Empresas Atendidas</p>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-[#E8EAE0] text-center">
                  <p className="text-2xl font-bold text-[#8B0000]">96%</p>
                  <p className="text-sm text-[#708090]">Satisfação</p>
                </div>
              </div>

              {/* DEPOIMENTO */}
              <div className="bg-white rounded-2xl p-6 border border-[#E8EAE0]">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-yellow-400">★★★★★</span>
                  <span className="text-sm text-[#708090]">4.9/5</span>
                </div>
                <p className="text-sm text-[#708090] italic">
                  "A ZENTHOS transformou nossa gestão de pessoas. Resultados incríveis!"
                </p>
                <p className="text-xs text-[#2D343A] font-medium mt-2">
                  — João Silva, CEO da XPTO
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
