// src/middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

const supabaseUrl = 'https://dhnmyofmavrsfjtntxjt.supabase.co'
const supabaseAnonKey = 'sb_publishable_NpAUC2GRqhwUsafIkFo6iQ_4azrbrsC'

// Rotas protegidas
const protectedRoutes = ['/admin', '/empresa', '/candidato']

// Rotas públicas
const publicRoutes = [
  '/', '/sobre', '/servicos', '/contato', 
  '/login', '/cadastro', '/recuperar-senha',
  '/vagas', '/empresas'
]

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Verifica se é uma rota pública
  if (publicRoutes.some(route => pathname === route || pathname.startsWith(route + '/'))) {
    return NextResponse.next()
  }

  // Verifica se é uma rota protegida
  const isProtected = protectedRoutes.some(route => pathname.startsWith(route))
  
  if (isProtected) {
    // Criar resposta
    let supabaseResponse = NextResponse.next({
      request,
    })

    const supabase = createServerClient(
      supabaseUrl,
      supabaseAnonKey,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookiesToSet: { name: string; value: string; options?: any }[]) {
            cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
            supabaseResponse = NextResponse.next({
              request,
            })
            cookiesToSet.forEach(({ name, value, options }) =>
              supabaseResponse.cookies.set(name, value, options)
            )
          },
        },
      }
    )

    // Verificar se o usuário está autenticado
    const { data: { user } } = await supabase.auth.getUser()

    // Se NÃO estiver autenticado, redirecionar para login
    if (!user) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // Se estiver autenticado, verificar permissões
    try {
      const { data: userData } = await supabase
        .from('usuarios')
        .select('role')
        .eq('id', user.id)
        .single()

      const role = userData?.role || 'candidato'

      // Verificar se tem permissão para a rota
      if (pathname.startsWith('/admin') && role !== 'admin') {
        return NextResponse.redirect(new URL('/login', request.url))
      }

      if (pathname.startsWith('/empresa') && role !== 'admin' && role !== 'empresa') {
        return NextResponse.redirect(new URL('/login', request.url))
      }

      if (pathname.startsWith('/candidato') && role !== 'admin' && role !== 'candidato') {
        return NextResponse.redirect(new URL('/login', request.url))
      }

    } catch (error) {
      console.error('Erro ao verificar permissões:', error)
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // Permitir acesso
    return supabaseResponse
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.svg$|.*\\.jpg$|.*\\.webp$|logo.png).*)',
  ],
}
