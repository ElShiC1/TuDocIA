import { ApiError, GoogleGenAI } from "@google/genai";
import { Console } from "console";
import { NextRequest, NextResponse } from "next/server";


export function middleware(request: NextRequest) {
  const token = request.headers.get("x-token-api")?.trim();

  if (!token) {
    return NextResponse.json({ error: "Token inválido" }, { status: 401 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"], // solo aplica a rutas API
};
