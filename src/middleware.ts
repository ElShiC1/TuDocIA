import { ApiError, GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  try {
    const tokenCookie = request.cookies.get('x-token-api')?.value;
    const headers = request.headers
    const parsedToken = tokenCookie ? JSON.parse(atob(tokenCookie)) : null;
    const publicRoutes = ['/login', '/register', '/']


    if (publicRoutes.some((value) => value.includes(request.nextUrl.pathname))) {
      if (parsedToken === null || !parsedToken.token || !parsedToken.user || !parsedToken.date) {
        console.log('paso por aqui', parsedToken)
        if (request.nextUrl.pathname === '/') {
          return NextResponse.rewrite(new URL('/login', request.url))
        }
        if (['/login', '/register'].includes(request.nextUrl.pathname)) {
          return NextResponse.next()
        }

        return NextResponse.rewrite(new URL('/login', request.url))
      }

      const headers = new Headers({
        "x-pathname": request.nextUrl.pathname,
        "x-powered-by": "next-middleware",
      });

      console.log(headers, 'paso por aqui')

      return NextResponse.next({ headers })
    }

    if (parsedToken === null || !parsedToken.token) {
      return NextResponse.json({ message: 'No autenticado', code: 401 }, { status: 401 });
    }

    const response = NextResponse.next();
    return response
  } catch (error) {
    if (error instanceof ApiError) {
      return NextResponse.json({ message: 'No autenticado', code: 401 }, { status: 401 });
    }

    if (error instanceof Error) {
      return NextResponse.json({ message: 'No Unknow', code: 401 }, { status: 401 });
    }

    return NextResponse.next();
  }
}

export const config = {
  matcher: ['/', '/api/ia/:path*', '/login', '/register'],
};