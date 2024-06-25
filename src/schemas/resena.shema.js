import { z } from "zod";

export const resenaSchema = z.object({
  descripcion: z.string({
    required_error: "descripcion debe ser una cadena de texto",
  }),
  calificacion: z.string().regex(/^[1-5]$/, {
  message: "La calificación debe ser un número en string del 1 al 5",
}),
});
