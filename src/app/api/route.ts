import { NextRequest, NextResponse } from "next/server";
import { ApiError } from "@google/genai";
import { GoogleAI } from "./helper/googleIA";
import { GenerateQuest } from "./types/Quest";

interface QuestIARequest extends NextRequest {
    json: () => Promise<GenerateQuest>;
}

export async function POST(request: QuestIARequest) {
    try {
        const body = await request.json();
        console.log(body)
        const data = await GoogleAI({...body, token: request.cookies.get('x-token-api')?.value || ''});
        return NextResponse.json({ message: 'Data correctamente recibida', data: data }, { status: 201 });
    } catch (err) {
        console.log(err)
        if (err instanceof ApiError) {
            return NextResponse.json({ message: 'Api Key Invalido', code: 400 }, { status: 200 })
        }

        return NextResponse.json({ message: 'Cuerpo inválido o vacío', code: 404 }, { status: 200 });
    }
}
