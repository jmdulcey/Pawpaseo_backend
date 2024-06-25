import { z } from "zod";
const direccionColombianaRegex = /^[A-Za-z0-9\s#-]+$/;

export const establecimientoRegisterSchema = z.object({
  nombre: z.string({
    required_error: "Nombre es requerido",
  }),
  email: z
    .string({
      required_error: "Email es requerido",
    })
    .email({
      required_error: "email no valido",
    }),
  descripcion: z.string({
    required_error: "Descripcion es requerida",
    validate: (value) => direccionColombianaRegex(value),
  }),
  ubicacion: z.string({
    required_error: "ubicacion es requerida",
  }),
  contacto: z
    .string({
      required_error: "El numero de contacto es requerido",
    })
    .min(10, {
      message: "El numero debe tener al menos 10 catacteres",
    }).refine((value) => {
      const parsedNumber = parseInt(value);
      return !isNaN(parsedNumber);
    }, "El contacto debe ser un número válido"),
});