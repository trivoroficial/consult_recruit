'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight, 
  Send, 
  MessageCircle,
  Clock,
  Building2,
  Users,
  CheckCircle
} from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
}

export default function Contato() {
  const [formState, setFormState] = useState({
    nome: '',
    email: '',
    telefone: '',
    empresa: '',
    mensagem: ''
  })
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success'>('idle')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus('sending')
    setTimeout(() => {
      setFormStatus('success')
      setFormState({ nome: '', email: '', telefone: '', empresa: '', mensagem: '' })
      setTimeout(() => setFormStatus('idle'), 4000)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-[#F8F4E6]">
      
      {/* ===== HERO ===== */}
      <section className="relative py-20 md:py-28 bg-[#2D343A] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#8B0000]/20 to-transparent"></div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#8B0000]/5 rounded-full blur-3xl"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <motion.div 
              className="inline-flex items-center gap-3 px-4 py-2 text-[11px] tracking-[0.34em] text-[#E3C9A8] uppercase font-medium border border-[#E3C9A8]/30 rounded-full bg-white/10 backdrop-blur-sm"
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
              Vamos <span className="text-[#E3C9A8]">conversar</span>
            </motion.h1>
            <motion.p 
              className="mt-4 text-lg text-white/70 max-w-2xl"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.85 }}
            >
              Estamos prontos para ajudar sua empresa a alcançar o próximo nível. 
              Entre em contato e descubra como a ZENTHOS pode transformar sua organização.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ===== CONTATO ===== */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-2">
            
            {/* ===== INFORMAÇÕES ===== */}
            <motion.div 
              className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
            >
              <h2 className="font-serif text-3xl text-[#2D343A]">Fale conosco</h2>
              <p className="mt-2 text-[#708090]">
                Preencha o formulário ao lado ou fale diretamente com nossos especialistas.
              </p>
              <p className="mt-4 text-sm text-[#708090]">
                <span className="font-medium text-[#2D343A]">Tempo médio de resposta:</span> até 2 horas
              </p>

              <div className="mt-8 space-y-4">
                {/* WhatsApp */}
                <a 
                  href="https://wa.me/5537991177058?text=Olá! Gostaria de conhecer as soluções da ZENTHOS." 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group flex items-center gap-4 p-4 border border-[#E8EAE0] rounded-xl hover:border-[#8B0000] hover:bg-[#F8F4E6] transition-all duration-300"
                >
                  <div className="flex items-center justify-center w-12 h-12 bg-[#25D366]/10 rounded-xl text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white transition-all duration-300">
                    <MessageCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-medium text-[#2D343A]">WhatsApp</p>
                    <p className="text-sm text-[#708090]">Falar com especialista</p>
                  </div>
                </a>

                {/* Email */}
                <a 
                  href="mailto:contato@zenthos.com.br" 
                  className="group flex items-center gap-4 p-4 border border-[#E8EAE0] rounded-xl hover:border-[#8B0000] hover:bg-[#F8F4E6] transition-all duration-300"
                >
                  <div className="flex items-center justify-center w-12 h-12 bg-[#8B0000]/10 rounded-xl text-[#8B0000] group-hover:bg-[#8B0000] group-hover:text-white transition-all duration-300">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-medium text-[#2D343A]">Email</p>
                    <p className="text-sm text-[#708090]">contato@zenthos.com.br</p>
                  </div>
                </a>

                {/* Telefone */}
                <div className="group flex items-center gap-4 p-4 border border-[#E8EAE0] rounded-xl hover:border-[#8B0000] hover:bg-[#F8F4E6] transition-all duration-300">
                  <div className="flex items-center justify-center w-12 h-12 bg-[#8B0000]/10 rounded-xl text-[#8B0000] group-hover:bg-[#8B0000] group-hover:text-white transition-all duration-300">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-medium text-[#2D343A]">Telefone</p>
                    <p className="text-sm text-[#708090]">+55 37 99117-7058</p>
                  </div>
                </div>

                {/* Localização */}
                <div className="group flex items-center gap-4 p-4 border border-[#E8EAE0] rounded-xl hover:border-[#8B0000] hover:bg-[#F8F4E6] transition-all duration-300">
                  <div className="flex items-center justify-center w-12 h-12 bg-[#8B0000]/10 rounded-xl text-[#8B0000] group-hover:bg-[#8B0000] group-hover:text-white transition-all duration-300">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-medium text-[#2D343A]">Localização</p>
                    <p className="text-sm text-[#708090]">Uberlândia - MG</p>
                  </div>
                </div>
              </div>

              {/* Horário */}
              <div className="mt-8 p-4 bg-[#F8F4E6] rounded-xl border border-[#E8EAE0]">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-[#8B0000]" />
                  <div>
                    <p className="font-medium text-[#2D343A]">Horário de Atendimento</p>
                    <p className="text-sm text-[#708090]">Segunda a Sexta, 8h às 18h</p>
                  </div>
                </div>
              </div>

              {/* Confiança */}
              <div className="mt-8 p-4 bg-[#8B0000]/5 border border-[#8B0000]/20 rounded-xl">
                <p className="text-sm text-[#2D343A] font-medium">
                  "A transformação começa com uma conversa."
                </p>
              </div>
            </motion.div>

            {/* ===== FORMULÁRIO ===== */}
            <motion.div 
              className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
            >
              <h2 className="font-serif text-3xl text-[#2D343A]">Solicitar Diagnóstico</h2>
              <p className="mt-2 text-[#708090]">
                Preencha os campos abaixo e nossa equipe entrará em contato.
              </p>

              <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                    Nome completo <span className="text-[#8B0000]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-[#E8EAE0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B0000] focus:border-transparent transition-all duration-200 bg-[#F8F4E6]/50"
                    value={formState.nome}
                    onChange={(e) => setFormState({...formState, nome: e.target.value})}
                    placeholder="Seu nome completo"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                    Email <span className="text-[#8B0000]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 border border-[#E8EAE0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B0000] focus:border-transparent transition-all duration-200 bg-[#F8F4E6]/50"
                    value={formState.email}
                    onChange={(e) => setFormState({...formState, email: e.target.value})}
                    placeholder="voce@empresa.com.br"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                    Telefone <span className="text-[#8B0000]">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    className="w-full px-4 py-3 border border-[#E8EAE0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B0000] focus:border-transparent transition-all duration-200 bg-[#F8F4E6]/50"
                    value={formState.telefone}
                    onChange={(e) => setFormState({...formState, telefone: e.target.value})}
                    placeholder="(00) 00000-0000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                    Empresa
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-[#E8EAE0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B0000] focus:border-transparent transition-all duration-200 bg-[#F8F4E6]/50"
                    value={formState.empresa}
                    onChange={(e) => setFormState({...formState, empresa: e.target.value})}
                    placeholder="Nome da sua empresa"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                    Mensagem <span className="text-[#8B0000]">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-[#E8EAE0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B0000] focus:border-transparent transition-all duration-200 bg-[#F8F4E6]/50 resize-none"
                    value={formState.mensagem}
                    onChange={(e) => setFormState({...formState, mensagem: e.target.value})}
                    placeholder="Conte sobre sua empresa e o objetivo da consultoria..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={formStatus === 'sending'}
                  className="w-full py-3.5 bg-[#8B0000] hover:bg-[#700000] text-white font-semibold rounded-xl transition-all duration-300 shadow-md shadow-[#8B0000]/20 hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {formStatus === 'sending' ? (
                    'Enviando...'
                  ) : formStatus === 'success' ? (
                    <>
                      <CheckCircle className="h-5 w-5" />
                      Mensagem enviada!
                    </>
                  ) : (
                    <>
                      Enviar Mensagem
                      <Send className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-16 md:py-20 bg-[#2D343A]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-white">
            Sua empresa pronta para a transformação?
          </h2>
          <p className="mt-4 text-[#A1A8AE] max-w-2xl mx-auto">
            O momento de agir é agora. Cada decisão adiada é uma oportunidade que passa.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/cadastro">
              <button className="px-8 py-4 text-sm font-semibold text-[#2D343A] bg-[#E3C9A8] rounded-lg hover:bg-[#D4B894] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-2">
                Solicitar Diagnóstico
                <ArrowRight className="h-5 w-5" />
              </button>
            </Link>
            <a 
              href="https://wa.me/5537991177058?text=Olá! Gostaria de conhecer as soluções da ZENTHOS." 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-8 py-4 text-sm font-semibold text-white border-2 border-white/40 rounded-lg hover:bg-white hover:text-[#2D343A] hover:border-white transition-all duration-300"
            >
              Falar com Especialista
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
