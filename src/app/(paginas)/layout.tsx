import { ReactNode } from 'react'

export default function PaginasLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#F8F4E6]">
      {children}
    </div>
  )
}
