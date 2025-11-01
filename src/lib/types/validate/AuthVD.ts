import { z } from 'zod';

export const AuthSchema = z.object({
  user: z.string().min(1, 'El campo "user" es obligatorio'),
  token: z.string().min(1, 'El campo "token" es obligatorio')
});
