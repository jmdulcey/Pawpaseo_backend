import mongoose from "mongoose";

const preguntasSchema = new mongoose.Schema(
    {
        fecha_hora: {
            type: Date,
            default: Date.now(),
            required: true,
        },
        descripcion: {
            type: String,
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: ""
        },
        respuesta: {
            type: String,
            required: true,
            default:" ",
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Preguntas", preguntasSchema);
