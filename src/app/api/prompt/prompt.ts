import { Type } from "@google/genai";

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


