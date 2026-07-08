import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          
          {/* COLUNA 1 - LOGO */}
          <div>
            <span className="text-2xl font-bold text-purple-600">TRIVOR</span>
            <p className="mt-2 text-sm text-gray-600">
              Gestão & Estratégia Empresarial
            </p>
            <p className="mt-4 text-sm text-gray-500">
              Transformando empresas através de pessoas, processos e inteligência.
            </p>
          </div>

          {/* COLUNA 2 - NAVEGAÇÃO */}
          <div>
            <h3 className="mb-4 font-semibold text-gray-900">Navegação</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="text-gray-600 hover:text-purple-600">Início</Link></li>
              <li><Link href="/sobre" className="text-gray-600 hover:text-purple-600">Sobre</Link></li>
              <li><Link href="/servicos" className="text-gray-600 hover:text-purple-600">Serviços</Link></li>
              <li><Link href="/contato" className="text-gray-600 hover:text-purple-600">Contato</Link></li>
            </ul>
          </div>

          {/* COLUNA 3 - SERVIÇOS */}
          <div>
            <h3 className="mb-4 font-semibold text-gray-900">Serviços</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Recrutamento & Seleção</li>
              <li>Gestão de Pessoas</li>
              <li>Consultoria Financeira</li>
              <li>Segurança dos Alimentos</li>
            </ul>
          </div>

          {/* COLUNA 4 - CONTATO */}
          <div>
            <h3 className="mb-4 font-semibold text-gray-900">Contato</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>contato@trivor.com.br</li>
              <li>(34) 99999-9999</li>
            </ul>
          </div>

        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-gray-500">
          <p>&copy; 2026 TRIVOR. Todos os direitos reservados.</p>
          <p className="mt-1">
            <Link href="/privacidade" className="hover:text-purple-600">Política de Privacidade</Link>
            {' • '}
            <Link href="/termos" className="hover:text-purple-600">Termos de Uso</Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
