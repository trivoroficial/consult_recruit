// src/app/(public)/layout.tsx
import { ReactNode } from 'react'

export default function PublicLayout({
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
