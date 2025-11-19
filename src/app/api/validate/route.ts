import { ErrorGlobal } from "@/lib/errors/ErrorGlobal";
import { Response } from "@/server/helper/Response";
import { GoogleAuth } from "@/server/service/googleAuth";
import { TokenParsed } from "@/server/util/tokenParsed";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const token = request.headers.get("x-token-api") || request.cookies.get("x-token-api")?.value;
        if (!token) throw new ErrorGlobal('tokenCookieError', 'Cookie no encontrado', { code: 'VALIDATE_ERROR', status: 500 });
        const parsedToken = TokenParsed(token)
        await GoogleAuth(parsedToken)
        const response = Response({ message: 'Autenticado correctamente', status: 201, code: 'AUTH_SUCCESS' }, parsedToken)
        return NextResponse.json(response, { status: 200 })
    } catch (err) {
        if (err instanceof ErrorGlobal) {
            const error = err.toJSON();
            return NextResponse.json(error, { status: error.status });
        }

        const error = err instanceof ErrorGlobal ? err : new ErrorGlobal('UnknownError', 'Error desconocido', { code: 'UNKNOWN_ERROR', status: 500 });
        return NextResponse.json(error.toJSON(), { status: 500 });
    }
}
