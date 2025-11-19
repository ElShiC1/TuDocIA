import { z } from 'zod';

export const AuthSchema = z.object({
  user: z.string().min(1, 'El campo "user" es obligatorio'),
  token: z.string().min(1, 'El campo "token" es obligatorio'),
  theme: z.enum(["system", "light", "dark"], "Theme invalido").optional()
});

export const FileSchema = z.object({
  file: z
    .custom<FileList>((v) => v instanceof FileList)
    .refine((files) => files && files.length === 1, {
      message: "Debes subir exactamente 1 archivo",
    })
    .refine((files) => {
      const f = files?.[0];
      if (!f) return false;

      const isJsonMime = f.type === "application/json";
      const isJsonExt = f.name.toLowerCase().endsWith(".json");

      return isJsonMime || isJsonExt;
    }, {
      message: "Archivo invalido ",
    })
});