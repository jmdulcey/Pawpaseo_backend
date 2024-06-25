import { z } from "zod";
export const createRequestShema = z.object({
    precio: z.string().regex(/^\d+$/, {
        message: "El precio solo debe contener dígitos numericos",
    }),
    date: z.string().datetime().optional(),
});