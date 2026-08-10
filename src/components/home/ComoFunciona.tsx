'use client'

import { motion } from 'framer-motion'
import { Search, FileText, Users, CheckCircle, Sparkles } from 'lucide-react'

export function ComoFunciona() {
  const steps = [
    {
      icon: Search,
      title: 'Encontre a vaga ideal',
      description: 'Explore oportunidades exclusivas que combinam com seu perfil e objetivos de carreira.',
      color: 'bg-[#8B1A2A]/5 text-[#8B1A2A]'
    },
    {
      icon: FileText,
      title: 'Candidate-se em 2 minutos',
      description: 'Seu futuro não espera. Preencha seus dados e dê o primeiro passo rumo à transformação.',
      color: 'bg-[#E3C9A8]/20 text-[#8B1A2A]'
    },
    {
      icon: Users,
      title: 'Conecte-se com especialistas',
      description: 'Nossa equipe de especialistas vai guiar você em cada etapa do processo.',
      color: 'bg-[#8B1A2A]/5 text-[#8B1A2A]'
    },
    {
      icon: CheckCircle,
      title: 'Comece sua nova jornada',
      description: 'Você foi escolhido. Agora é hora de brilhar e construir a carreira que sempre sonhou.',
      color: 'bg-[#E3C9A8]/20 text-[#8B1A2A]'
    }
  ]

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#8B1A2A]/5 text-[#8B1A2A] rounded-full text-sm font-medium mb-4">
              <Sparkles className="h-4 w-4" />
              Sua jornada em 4 passos
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A2E]">
              Da descoberta à conquista
              <br />
              <span className="text-[#8B1A2A]">em apenas 4 passos</span>
            </h2>
            <p className="text-[#6B7280] mt-4 text-lg">
              Milhares de pessoas já transformaram suas carreiras com a ZENTHOS.
              <br />
              <span className="font-medium text-[#8B1A2A]">Agora é a sua vez.</span>
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative text-center p-8 bg-[#FAFAFA] rounded-2xl border border-[#E5E7EB] hover:border-[#8B1A2A]/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 ${step.color} group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="h-10 w-10" />
                </div>

                <div className="absolute -top-3 -right-3 w-8 h-8 bg-[#8B1A2A] text-white text-sm font-bold rounded-full flex items-center justify-center">
                  {index + 1}
                </div>

                <h3 className="text-xl font-bold text-[#1A1A2E] mb-3">
                  {step.title}
                </h3>
                <p className="text-[#6B7280] text-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12 p-6 bg-gradient-to-r from-[#8B1A2A]/5 to-[#E3C9A8]/20 rounded-2xl max-w-2xl mx-auto border border-[#8B1A2A]/10"
        >
          <p className="text-[#1A1A2E] font-medium">
            ⏳ <span className="text-[#8B1A2A] font-bold">Não espere.</span> A oportunidade que você está esperando
            <br className="hidden md:block" />
            pode não estar disponível amanhã.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
