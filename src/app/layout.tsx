import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppButton } from '@/components/layout/WhatsAppButton'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'ZENTHOS - Gestão, Estratégia & Transformação',
  description: 'Consultoria especializada em gestão empresarial, recursos humanos e transformação organizacional.',
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
        <main className="min-h-screen pt-20 bg-[#F8F4E6]">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  )
}
