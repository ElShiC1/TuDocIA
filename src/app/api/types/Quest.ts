import { z } from 'zod';

export interface GenerateQuest{
    quest: string, 
    questions: number,
    difficulty: 'easy' | 'medium' | 'hard',
    language: 'es' | 'en',
    token: string
}

export interface Quest {
    title: string,
    questions: number,
    array: {
        quest: string,
        alternative: {
            answer: string,
            correct: boolean
        }[]
    }[]
}

export const generateQuestSchema = z.object({
  quest: z.string().min(1, { message: 'La pregunta no puede estar vacía' }),
  questions: z.number().int().positive({ message: 'Debe ser un número entero positivo' }),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  language: z.enum(['es', 'en']),
  token: z.string().min(1, { message: 'El token es obligatorio' }),
});