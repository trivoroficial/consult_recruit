// src/components/home/ComoFunciona.tsx
import { Search, FileText, CheckCircle } from 'lucide-react'

export function ComoFunciona() {
  const passos = [
    {
      icon: Search,
      title: 'Encontre a vaga',
      description: 'Navegue por centenas de vagas e encontre a oportunidade que combina com seu perfil.'
    },
    {
      icon: FileText,
      title: 'Candidate-se',
      description: 'Envie seu currículo e se candidate à vaga com apenas alguns cliques.'
    },
    {
      icon: CheckCircle,
      title: 'Seja contratado',
      description: 'Acompanhe seu processo e receba a oportunidade que você merece.'
    }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#2D343A]">Como funciona?</h2>
          <p className="text-[#708090] mt-2">Três passos simples para transformar sua carreira</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {passos.map((passo, index) => (
            <div key={index} className="text-center">
              <div className="w-20 h-20 bg-[#8B0000]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <passo.icon className="h-10 w-10 text-[#8B0000]" />
              </div>
              <h3 className="text-xl font-semibold text-[#2D343A]">{passo.title}</h3>
              <p className="text-[#708090] mt-2 text-sm">{passo.description}</p>
              <span className="inline-block mt-4 px-3 py-1 bg-[#8B0000]/5 text-[#8B0000] rounded-full text-xs font-medium">
                Passo {index + 1}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
