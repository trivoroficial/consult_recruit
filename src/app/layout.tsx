import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
const playfair = Playfair_Display({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ZENTHOS - Gestão, Estratégia & Transformação',
  description: 'Recrutamento & Seleção de alta performance para sua empresa',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} antialiased bg-[#F8F4E6]`}>
        {children}
      </body>
    </html>
  )
}
