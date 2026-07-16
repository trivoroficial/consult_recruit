import Link from 'next/link'

const whatsappNumber = "5537991177058"
const whatsappDisplay = "+55 37 99117-7058"
const emailContato = "contato@zenthos.com.br"

export function Footer() {
  return (
    <footer className="bg-[#2D343A] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          
          {/* COLUNA 1 */}
          <div>
            <span className="text-xl font-bold text-white">ZENTHOS</span>
            <span className="block text-[9px] font-light text-[#A1A8AE] tracking-[0.15em] uppercase mt-1">
              Recrutamento & Seleção
            </span>
            <p className="mt-4 text-sm text-white/60 leading-relaxed">
              Recrutamento & Seleção de alta performance para sua empresa.
            </p>
          </div>

          {/* COLUNA 2 */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4">Navegação</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><Link href="/" className="hover:text-[#E3C9A8] transition">Início</Link></li>
              <li><Link href="/sobre" className="hover:text-[#E3C9A8] transition">Sobre</Link></li>
              <li><Link href="/servicos" className="hover:text-[#E3C9A8] transition">Serviços</Link></li>
              <li><Link href="/contato" className="hover:text-[#E3C9A8] transition">Contato</Link></li>
            </ul>
          </div>

          {/* COLUNA 3 */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4">Serviços</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li>Recrutamento & Seleção</li>
              <li>Gestão de Pessoas</li>
              <li>Consultoria Financeira</li>
              <li>Segurança dos Alimentos</li>
            </ul>
          </div>

          {/* COLUNA 4 */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4">Contato</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><a href={`mailto:${emailContato}`} className="hover:text-[#E3C9A8] transition">{emailContato}</a></li>
              <li><a href={`https://wa.me/${whatsappNumber}`} target="_blank" className="hover:text-[#E3C9A8] transition">{whatsappDisplay}</a></li>
            </ul>
          </div>

        </div>

        <div className="mt-8 border-t border-white/10 pt-8 text-center text-sm text-white/40">
          <p>© 2026 ZENTHOS™. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
