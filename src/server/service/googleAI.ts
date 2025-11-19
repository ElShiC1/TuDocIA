import { GoogleGenAI } from "@google/genai";
import { GenerateQuest, Quest } from "@/lib/types/ts/Quest";
import { generateQuestSchema } from "@/lib/types/validate/QuestVD";
import { PromptStructured, systemInstruction } from "../prompt/prompt";
import { Response } from "../helper/Response";
import { ErrorDto } from "@/lib/errors/ErrorDto";
import { ErrorGlobal } from "@/lib/errors/ErrorGlobal";




export const GoogleAI = async (generate: GenerateQuest & {token: string}) => {

    const result = generateQuestSchema.safeParse(generate);

    if (!result.success) {
        throw new ErrorDto('GenerateErrorDto', {
            code: 'DTO_INVALID',
            status: 400
        }, result.error.issues);
    }

    const ai = new GoogleGenAI({ apiKey: generate.token });

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: generate.quest,
        config: {
            responseMimeType: 'application/json',
            systemInstruction: systemInstruction(generate),
            responseSchema: PromptStructured
        }
    })

    const data = JSON.parse(response.text!) 

    if (data.title === "ERROR_INVALID_INPUT") {
        throw new ErrorGlobal('AIError', "El contenido proporcionado es insuficiente o inválido para generar preguntas.", { code: 'AI_INVALID_RESPONSE', status: 404, context: { response: data } });
    }

    return Response({ message: `Quest ${data.title} generado.`, status: 201, code: 'QUEST_SUCCESS' }, data as Quest)
}
