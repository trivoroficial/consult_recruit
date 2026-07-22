// src/components/home/Depoimentos.tsx
import { Star } from 'lucide-react'

export function Depoimentos() {
  const depoimentos = [
    {
      nome: 'João Silva',
      cargo: 'Analista Administrativo',
      empresa: 'XPTO',
      texto: 'A ZENTHOS me ajudou a encontrar a vaga perfeita. O processo foi simples e rápido!',
      estrelas: 5
    },
    {
      nome: 'Maria Santos',
      cargo: 'Auxiliar de RH',
      empresa: 'ABC',
      texto: 'Plataforma incrível! Consegui minha primeira oportunidade na área de RH.',
      estrelas: 5
    }
  ]

  return (
    <section className="py-16 bg-[#F8F4E6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#2D343A]">O que dizem nossos usuários</h2>
          <p className="text-[#708090] mt-2">Histórias reais de quem transformou sua carreira</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {depoimentos.map((depoimento, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 border border-[#E8EAE0] shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-[#8B0000]/10 rounded-full flex items-center justify-center text-[#8B0000] font-bold">
                  {depoimento.nome.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-[#2D343A]">{depoimento.nome}</p>
                  <p className="text-sm text-[#708090]">{depoimento.cargo} - {depoimento.empresa}</p>
                </div>
              </div>
              <div className="flex gap-1 mb-2">
                {[...Array(depoimento.estrelas)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-[#708090]">"{depoimento.texto}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
