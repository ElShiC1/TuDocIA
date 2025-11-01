import { z } from 'zod';

export const generateQuestSchema = z.object({
  quest: z.string().min(10, { message: 'La pregunta no puede estar vacía' }),
  questions: z.coerce.number()
    .int()
    .positive({ message: "Debe ser un número entero positivo" })
    .min(1, { message: "Preguntas mínimas 1" })
    .max(50, { message: "Preguntas máximas 50" }),
  difficulty: z.enum(['easy', 'medium', 'hard'], { message: 'La dificultad debe ser "easy", "medium" o "hard"' }),
  language: z.enum(['es', 'en'], { message: 'El idioma debe ser "es" o "en"' }),
  category: z.string().min(1, { message: 'La categoría es obligatoria' })
});
