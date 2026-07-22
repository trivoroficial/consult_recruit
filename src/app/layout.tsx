import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ZENTHOS | Plataforma de Recrutamento e Seleção',
  description: 'Conectando talentos às melhores oportunidades do mercado.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className="flex flex-col min-h-screen bg-[#F8F4E6] text-[#2D343A] antialiased">
        {children}
      </body>
    </html>
  )
}
