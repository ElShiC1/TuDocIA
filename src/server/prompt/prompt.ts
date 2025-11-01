import { Type } from "@google/genai";


export const systemInstruction = (generate: {questions: number, difficulty: string, language: string}) =>  `
    Instrucción Principal: Genera ${generate.questions} preguntas de opción múltiple de dificultad ${generate.difficulty}, cada una con 4 opciones y solo una correcta, en ${generate.language}.

    *** LÓGICA DE VALIDACIÓN CRÍTICA ***
    1.  **Tema Válido:** Procede con la generación normal, llenando todos los campos ('title', 'questions', 'array', etc.) con contenido coherente.
    2.  **Tema Inválido/Vago:** Si el contenido del tema en 'contents' es insuficiente, demasiado corto (menos de 15 caracteres), o no tiene sentido (ej: 'asdf', '123'), NO generes preguntas. En su lugar, debes rellenar el objeto JSON de la siguiente manera para indicar el error, mientras cumples con el esquema:
        a.  Establece "title": "ERROR_INVALID_INPUT"
        b.  Establece "questions": 0
        c.  Establece "array": [] (Un array vacío)
`;


export const PromptStructured = {
    type: Type.OBJECT,
    properties: {
        // La propiedad 'quest' en el nivel superior (ej: una pregunta general, aunque tu ejemplo la repite)
        title: {
            type: Type.STRING,
            description: "Only the topic title for the quiz."
        },
        // La propiedad 'questions' para el número total de preguntas
        questions: {
            type: Type.NUMBER,
            description: "The total number of questions in the array."
        },
        // El array principal de preguntas
        array: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    // Propiedad 'quest' para la pregunta individual
                    quest: {
                        type: Type.STRING,
                        description: "The text of the individual question."
                    },
                    // Propiedad 'alternative' para las opciones de respuesta
                    alternative: {
                        type: Type.ARRAY,
                        description: "Array of 4 possible answers.",
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                answer: {
                                    type: Type.STRING,
                                    description: "The text of the answer option."
                                },
                                correct: {
                                    type: Type.BOOLEAN,
                                    description: "True if it is the correct answer, False if it is not."
                                }
                            },
                            required: ["answer", "correct"]
                        }
                    }
                },
                required: ["quest", "alternative"]
            }
        }
    },
    required: ["title", "questions", "array"]
};


