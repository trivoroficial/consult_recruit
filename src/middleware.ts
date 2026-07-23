import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // 1. Rotas públicas (não exigem login)
  const publicRoutes = ['/', '/sobre', '/servicos', '/contato', '/login', '/cadastro', '/recuperar-senha']
  if (publicRoutes.some(route => pathname === route || pathname.startsWith(route + '/'))) {
    return NextResponse.next()
  }

  // 2. Ler o cookie que definimos no login
  const userCookie = request.cookies.get('zenthos_user')?.value
  let user = null

  if (userCookie) {
    try {
      user = JSON.parse(userCookie)
    } catch (e) {
      const response = NextResponse.redirect(new URL('/login', request.url))
      response.cookies.delete('zenthos_user')
      return response
    }
  }

  // 3. Se não tiver usuário, manda para o login
  if (!user) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // 4. Proteção por PERFIL (Role)
  if (pathname.startsWith('/admin') && user.role !== 'admin') {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  if (pathname.startsWith('/empresa') && user.role !== 'empresa') {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  if (pathname.startsWith('/candidato') && user.role !== 'candidato') {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.svg$|.*\\.jpg$|.*\\.webp$).*)',
  ],
}
