import { AuthSchema } from "@/lib/types/validate/AuthVD";
import { ApiError, GoogleGenAI } from "@google/genai";
import { ErrorGlobal } from "@/lib/errors/ErrorGlobal";
import { ErrorDto } from "@/lib/errors/ErrorDto";

export const GoogleAuth = async (data: { token: string, user: string, theme: string }) => {
    try {
        const result = AuthSchema.safeParse(data);

        if (!result.success) {
            throw new ErrorDto('AuthErrorDto', {
                code: 'DTO_INVALID',
                status: 400
            }, result.error.issues);
        }

        await new GoogleGenAI({ apiKey: data.token }).models.list();
    } catch (error) {
        if (error instanceof ApiError){
            throw new ErrorGlobal('ApiError', 'Api Key Invalido', { code: 'AUTH_INVALID_TOKEN', status: 401, context: { token: data.token } });
        }
        
        throw error;
    }
}