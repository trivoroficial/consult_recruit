import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// ⚠️ MIDDLEWARE COMPLETAMENTE DESABILITADO
export async function middleware(request: NextRequest) {
  // Retorna sempre NextResponse.next() sem verificação
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.png|.*\\.svg|.*\\.jpg|.*\\.webp|logo.*|recrutamento.*).*)',
  ],
}
