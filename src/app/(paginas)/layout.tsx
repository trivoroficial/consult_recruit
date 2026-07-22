import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ReactNode } from 'react'

export default function PaginasLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <>
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  )
}
