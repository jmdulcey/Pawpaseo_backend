import { z } from "zod";

export const registerSchema = z.object({
  nombre: z.string({
    required_error: "Nombre es requerido",
  }),
  telefono: z.string().regex(/^\d+$/, {
    message: "El teléfono solo debe contener dígitos numericos",
  }),
  email: z
    .string({
      required_error: "Email es requerido",
    })
    .email({
      required_error: "email no valido",
    }),
  password: z
    .string({
      required_error: "password es requerido",
    })
    .min(6, {
      message: "password debe tener al menos 6 catacteres",
    }),
});

export const loginSchema = z.object({
  identifier: z
    .string({
      required_error: "Identificador es Requerido",
    }),
  password: z
    .string({
      required_error: "Contraseña es Requerida",
    })
    .min(6, {
      message: "La contraseña debe tener al menos 6 caracteres",
    }),
});

