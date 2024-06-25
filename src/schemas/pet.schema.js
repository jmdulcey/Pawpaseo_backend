import { z } from "zod";
import moment from "moment";

export const createPetShema = z.object({
    nombre: z.string({
        required_error: "Nombre de la mascota es requerido"
    }),
    descripcion: z.string({
        required_error: "La Descripcion debe ser una cadena de texto"
    }),
    date: z.string().datetime().optional(),
    genero: z.string().refine((value) => value === "masculino" || value === "femenino", {
        message: "El género debe ser 'masculino' o 'femenino'",
    }),
    nacimiento: z.string({
        required_error:"la fecha de nacimiento es requerida"
    }).refine((value) => {
        const format = value.includes('-') ? "DD-MM-YYYY HH:mm:ss" : "HH:mm:ss";
        const date = moment(value, format);
        return date.isValid();
    }, {
        message: "La fecha de nacimiento debe estar en el formato 'DD-MM-YYYY HH:mm:ss' o 'HH:mm:ss'"
    }).transform((value) => {
        const format = value.includes('-') ? "DD-MM-YYYY HH:mm:ss" : "HH:mm:ss";
        let date = moment(value, format);
        if (!value.includes('-')) {
            date = moment().set({
                hour: date.get('hour'),
                minute: date.get('minute'),
                second: date.get('second'),
            });
        }
        return date.toISOString();
    }),
    alergias: z.string({
        required_error:"la alergia es requerida"
    }),
    vacunas: z.string().refine((value) => {
    const vacunasPermitidas = ["Moquillo Canino", "Hepatitis Infecciosa Canina", "Parvovirosis", "Leptospirosis", "Rabia", "Tos de las Perreras", "Babesiosis", "Enfermedad de Lyme","Otro"];
    const vacunasIngresadas = value.split(',').map(vacuna => vacuna.trim());
    return vacunasIngresadas.every(vacuna => vacunasPermitidas.includes(vacuna));
}, {
    message: "Escriba las vacunas contra las que está vacunado su mascota, separadas por comas. Las opciones son: 'Moquillo Canino', 'Hepatitis Infecciosa Canina', 'Parvovirosis', 'Leptospirosis', 'Rabia', 'Tos de las Perreras', 'Babesiosis', 'Enfermedad de Lyme', 'Otro",
}),

    raza: z.string().refine((value) => value === "Golden Retriever"
        || value === "Yorkshire"
        || value === "Bulldog"
        || value === "Chihuahua"
        || value === "Labrador"
        || value === "Poodle"
        || value === "Boxer"
        || value === "Criollo"
        || value === "Beagle"
        || value === "Otro", {
        message: "escriba una de las siguientes Razas:'Golden Retriever', 'Yorkshire', 'Bulldog', 'Chihuahua', 'Labrador', 'Poodle', 'Boxer', 'Beagle', 'Criollo' ",
    }),
});