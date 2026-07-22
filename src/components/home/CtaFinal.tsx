// src/components/home/CtaFinal.tsx
import Link from 'next/link'

export function CtaFinal() {
  return (
    <section className="py-16 bg-gradient-to-br from-[#8B0000] to-[#5C0000] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Pronto para começar sua jornada?
        </h2>
        <p className="text-white/70 text-lg max-w-2xl mx-auto mb-8">
          Junte-se a milhares de profissionais e empresas que já transformaram suas carreiras com a ZENTHOS.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/cadastro"
            className="px-8 py-3 bg-[#C9A84C] hover:bg-[#B8973A] text-[#1A1A2E] font-semibold rounded-lg transition"
          >
            Criar conta gratuita
          </Link>
          <Link
            href="/vagas"
            className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition border border-white/20"
          >
            Ver vagas disponíveis
          </Link>
        </div>
      </div>
    </section>
  )
}
