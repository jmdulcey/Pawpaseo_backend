import { z } from "zod";

export const createPreguntaShema = z.object({
    descripcion: z.string({
        required_error: "La Descripcion debe ser una cadena de texto"
    }),
    
});