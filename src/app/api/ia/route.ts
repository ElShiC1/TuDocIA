import { NextRequest, NextResponse } from "next/server";
import { ApiError } from "@google/genai";
import { GenerateQuest } from "@/lib/types/ts/Quest";
import { GoogleAI } from "@/server/service/googleAI";
import { ErrorGlobal } from "@/lib/errors/ErrorGlobal";
import { ErrorDto } from "@/lib/errors/ErrorDto";

interface QuestIARequest extends NextRequest {
    json: () => Promise<GenerateQuest>;
}

export async function POST(request: QuestIARequest) {
    const parsedToken = JSON.parse(atob(request.cookies.get('x-token-api')?.value || '{}'));
    console.log(parsedToken)
    try {
        const body = await request.json();
        const data = await GoogleAI({ ...body, token: parsedToken.token || '' });
        return NextResponse.json(data, { status: data.status });
    } catch (err) {

        if (err instanceof ApiError) {
            const error = new ErrorGlobal('ApiError', 'Api Key Invalido', {
                code: 'AUTH_INVALID_TOKEN', status: 401, context: {
                    token: parsedToken.token || 'unknown'
                }
            });
            return NextResponse.json(error.toJSON(), { status: error.metadata.status })
        }

        if (err instanceof ErrorDto) {
            return NextResponse.json(err.toJSON(), { status: err.metadata.status });
        }

        const error = err instanceof ErrorGlobal ? err : new ErrorGlobal('UnknownError', 'Error desconocido', { code: 'UNKNOWN_ERROR', status: 500 });
        return NextResponse.json(error.toJSON(), { status: error.metadata.status });
    }
}
