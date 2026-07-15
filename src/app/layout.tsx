import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { WhatsAppButton } from '@/components/layout/WhatsAppButton'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ZENTHOS | Gestão, Estratégia & Transformação',
  description: 'Ajudamos empresas a crescer por meio da melhoria de processos, desenvolvimento humano, tecnologia e inteligência organizacional.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  )
}
