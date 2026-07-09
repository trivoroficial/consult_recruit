import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Rotas protegidas por perfil
const protectedRoutes = {
  admin: ['/admin', '/admin/'],
  empresa: ['/empresa', '/empresa/'],
  candidato: ['/candidato', '/candidato/'],
}

// Rotas públicas (não precisa estar logado)
const publicRoutes = ['/', '/sobre', '/servicos', '/contato', '/login', '/cadastro', '/recuperar-senha']

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Verifica se é uma rota pública
  if (publicRoutes.some(route => pathname === route || pathname.startsWith(route + '/'))) {
    return NextResponse.next()
  }

  // Verifica se o usuário está logado
  const userData = request.cookies.get('trivor_user')?.value

  // Se não estiver logado e tentar acessar rota protegida, redireciona para login
  if (!userData) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Se estiver logado, verifica permissão
  try {
    const user = JSON.parse(userData)
    const role = user.role

    // Verifica se o usuário tem permissão para acessar a rota
    const allowedRoutes = protectedRoutes[role as keyof typeof protectedRoutes] || []
    const isAuthorized = allowedRoutes.some(route => pathname.startsWith(route))

    if (!isAuthorized) {
      // Redireciona para o dashboard correto
      switch (role) {
        case 'admin':
          return NextResponse.redirect(new URL('/admin/dashboard', request.url))
        case 'empresa':
          return NextResponse.redirect(new URL('/empresa/dashboard', request.url))
        case 'candidato':
          return NextResponse.redirect(new URL('/candidato/dashboard', request.url))
        default:
          return NextResponse.redirect(new URL('/', request.url))
      }
    }
  } catch {
    // Se houver erro no parse, redireciona para login
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.svg$).*)',
  ],
}
