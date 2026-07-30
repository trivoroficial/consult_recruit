'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Mail, Phone, MapPin, Send, 
  MessageCircle, Clock, Building2,
  Users, CheckCircle, ArrowRight,
  Headphones
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

  const whatsappNumber = "5534991850735"
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Olá! Gostaria de falar com um especialista da ZENTHOS.")}`

  return (
    <div className="min-h-screen bg-[#F8F4E6]">
      
      {/* ===== HERO COM IMAGEM ===== */}
      <section className="relative overflow-hidden py-20 md:py-28 min-h-[60vh] flex items-center">
        {/* IMAGEM DE FUNDO */}
        <div className="absolute inset-0">
          <img 
            src="/contato.png" 
            alt="Fale Conosco" 
            className="w-full h-full object-cover"
          />
          {/* GRADIENTE SOBRE A IMAGEM */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#4A0E1A]/90 via-[#6B1A2A]/70 to-[#6B1A2A]/40"></div>
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
                  <span className="text-xs font-semibold text-[#6B1A2A] uppercase tracking-wider">Contato</span>
                  <span className="h-px w-8 bg-[#6B1A2A]"></span>
                </div>
                <h2 className="text-2xl font-bold text-[#2D343A] mt-1">
                  Envie sua <span className="text-[#6B1A2A]">mensagem</span>
                </h2>
                <p className="text-sm text-[#708090] mt-1">
                  Preencha o formulário e nossa equipe entrará em contato
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                      Nome completo <span className="text-[#6B1A2A]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A] transition"
                      value={form.nome}
                      onChange={(e) => setForm({...form, nome: e.target.value})}
                      placeholder="Seu nome"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                      Email <span className="text-[#6B1A2A]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A] transition"
                      value={form.email}
                      onChange={(e) => setForm({...form, email: e.target.value})}
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                      Telefone <span className="text-[#6B1A2A]">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A] transition"
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
                      className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A] transition"
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
                    className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A] transition"
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
                    Mensagem <span className="text-[#6B1A2A]">*</span>
                  </label>
                  <textarea
                    rows={5}
                    required
                    className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A] transition resize-none"
                    value={form.mensagem}
                    onChange={(e) => setForm({...form, mensagem: e.target.value})}
                    placeholder="Conte sobre sua empresa e o que precisa..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full py-3.5 bg-[#6B1A2A] text-white rounded-lg hover:bg-[#4A0E1A] transition font-semibold flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg shadow-[#6B1A2A]/20 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
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
              <div className="bg-gradient-to-br from-[#6B1A2A] to-[#4A0E1A] rounded-2xl p-8 text-white">
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
                      <p className="text-sm text-white/70">(34) 99185-0735</p>
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
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                    <button className="w-full py-3 bg-[#25D366] text-white rounded-lg hover:bg-[#1DA851] transition font-semibold flex items-center justify-center gap-2">
                      <MessageCircle className="h-5 w-5" />
                      Falar com Especialista
                    </button>
                  </a>
                </div>
              </div>

              {/* STATS */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl p-6 border border-[#E8EAE0] text-center">
                  <p className="text-2xl font-bold text-[#6B1A2A]">500+</p>
                  <p className="text-sm text-[#708090]">Empresas Atendidas</p>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-[#E8EAE0] text-center">
                  <p className="text-2xl font-bold text-[#6B1A2A]">96%</p>
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
