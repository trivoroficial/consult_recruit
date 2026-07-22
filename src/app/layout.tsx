import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'ZENTHOS | Plataforma de Recrutamento e Seleção',
  description: 'Conectando talentos às melhores oportunidades.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      {/* Removemos as classes inline de cor para respeitar o seu globals.css */}
      <body className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-1">
          {children}
        </main>
        
        <Footer />
      </body>
    </html>
  )
}
