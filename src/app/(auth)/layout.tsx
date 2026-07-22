// src/app/(auth)/layout.tsx
import { ReactNode } from 'react'

export default function AuthLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#F8F4E6] flex items-center justify-center p-4">
      {children}
    </div>
  )
}
