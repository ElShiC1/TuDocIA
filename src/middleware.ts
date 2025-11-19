import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  try {
    const tokenCookie = request.cookies.get('x-token-api')?.value;
    const headers = new Headers({
      "x-pathname": request.nextUrl.pathname,
      "x-powered-by": "next-middleware",
    });


    if (!tokenCookie) {

      if (request.nextUrl.pathname === "/") {
        const url = request.nextUrl.clone();
        url.pathname = '/login';
        const response = NextResponse.rewrite(url);
        response.headers.set('x-pathname', request.nextUrl.pathname);
        response.headers.set('x-powered-by', 'next-middleware');

        return response;

      }

    }


    return NextResponse.next({ headers })
  } catch (error) {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ['/', '/login', '/register'],
};