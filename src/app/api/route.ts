import { NextRequest, NextResponse } from "next/server";
import { ApiError, GoogleGenAI } from "@google/genai";
import { GoogleAuth } from "@/server/service/googleAuth";
import { Response } from "@/server/helper/Response";
import { ErrorGlobal } from "@/lib/errors/ErrorGlobal";
import { ErrorDto } from "@/lib/errors/ErrorDto";




export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    await GoogleAuth(body);

    const token = btoa(JSON.stringify({
      token: body.token,
      date: new Date().toISOString(),
      user: body.user,
      theme: body.theme ?? 'system'
    }));

    const response = NextResponse.json(Response({ message: 'Autenticado correctamente', status: 201, code: 'AUTH_SUCCESS' }, { user: body.user, token: token }), { status: 201 });

    response.cookies.set('x-token-api', token, {
      httpOnly: false,
      secure: false,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7
    });

    return response;
  } catch (err) {
    if (err instanceof ErrorGlobal) {
      const error = err.toJSON();
      return NextResponse.json(error, { status: error.status });
    }

    if (err instanceof ErrorDto) {
      const error = err.toJSON();
      return NextResponse.json(error, { status: error.status });
    }

    const error = err instanceof ErrorGlobal ? err : new ErrorGlobal('UnknownError', 'Error desconocido', { code: 'UNKNOWN_ERROR', status: 500 });
    return NextResponse.json(error.toJSON(), { status: 500 });
  }
}
