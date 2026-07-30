'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

export function Footer() {
  const pathname = usePathname()

  const isDashboard = pathname?.startsWith('/admin') || 
                      pathname?.startsWith('/empresa') || 
                      pathname?.startsWith('/candidato') ||
                      pathname?.startsWith('/login') ||
                      pathname?.startsWith('/cadastro')

  if (isDashboard) {
    return null
  }

  return (
    <footer className="bg-white border-t border-[#E8EAE0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* COLUNA 1 - LOGO ZENTHOS */}
          <div>
            <img 
              src="/logo.png" 
              alt="ZENTHOS" 
              className="object-contain"
              style={{
                height: '2cm',
                width: 'auto',
              }}
            />
            <p className="text-sm text-[#708090] mt-4 max-w-xs">
              Plataforma de recrutamento e seleção conectando talentos às melhores oportunidades.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-[#2D343A] mb-4">Navegação</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="text-[#708090] hover:text-[#6B1A2A] transition">Início</Link></li>
              <li><Link href="/sobre" className="text-[#708090] hover:text-[#6B1A2A] transition">Sobre</Link></li>
              <li><Link href="/servicos" className="text-[#708090] hover:text-[#6B1A2A] transition">Serviços</Link></li>
              <li><Link href="/contato" className="text-[#708090] hover:text-[#6B1A2A] transition">Contato</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-[#2D343A] mb-4">Para Candidatos</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/cadastro" className="text-[#708090] hover:text-[#6B1A2A] transition">Cadastre-se</Link></li>
              <li><Link href="/login" className="text-[#708090] hover:text-[#6B1A2A] transition">Acessar Conta</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-[#2D343A] mb-4">Para Empresas</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/login" className="text-[#708090] hover:text-[#6B1A2A] transition">Acessar Conta</Link></li>
              <li><Link href="/contato" className="text-[#708090] hover:text-[#6B1A2A] transition">Fale Conosco</Link></li>
            </ul>
          </div>
        </div>

        {/* RODAPÉ FINAL COM COPYRIGHT VIGORRE */}
        <div className="border-t border-[#E8EAE0] mt-8 pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {/* LOGO VIGORRE - CORRIGIDO */}
              <img 
                src="/logo-vigorre.png" 
                alt="VIGORRE" 
                className="object-contain"
                style={{
                  height: '1.2cm',
                  width: 'auto',
                }}
              />
              <div>
                <p className="text-sm font-semibold text-[#6B1A2A]">VIGORRE</p>
                <p className="text-xs text-[#708090]">© 2026 VIGORRE TECH™. Todos os direitos reservados.</p>
              </div>
            </div>
            <div className="text-center text-xs text-[#708090]">
              <p>
                <a href="https://www.vigorre.com.br" target="_blank" rel="noopener noreferrer" className="hover:text-[#6B1A2A] transition">
                  www.vigorre.com.br
                </a>
                {' | '}
                <a href="tel:+5534991850735" className="hover:text-[#6B1A2A] transition">
                  (34) 99185-0735
                </a>
              </p>
              <p>
                <a href="mailto:contato@vigorre.com.br" className="hover:text-[#6B1A2A] transition">
                  contato@vigorre.com.br
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
