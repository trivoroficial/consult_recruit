import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'

const montserrat = Montserrat({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700']
})

export const metadata: Metadata = {
  title: 'TRIVOR - Gestão & Estratégia Empresarial',
  description: 'Plataforma inteligente de consultoria empresarial, recrutamento e gestão de pessoas.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={montserrat.className}>
        {children}
      </body>
    </html>
  )
}
