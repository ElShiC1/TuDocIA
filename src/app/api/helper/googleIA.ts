import { GoogleGenAI } from "@google/genai";
import { PromptStructured } from "../prompt/prompt";
import { GenerateQuest, generateQuestSchema, Quest } from "../types/Quest";


export const GoogleAI = async (generate: GenerateQuest) => {

    const result = generateQuestSchema.safeParse(generate);

    if (!result.success) {
        throw new Error('Cuerpo inválido o vacío');
    }

    const ai = new GoogleGenAI({ apiKey: generate.token});
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: generate.quest,
        config: {
            responseMimeType: 'application/json',
            systemInstruction: `Generate ${generate.questions} multiple-choice quiz questions of ${generate.difficulty} difficulty, each with 4 options and only one correct answer, in ${generate.language}.`,
            responseSchema: PromptStructured
        }
    })

    return JSON.parse(response.text!) as Quest;
}
