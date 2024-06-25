import mongoose from "mongoose";

const resenasSchema = new mongoose.Schema(
    {
        fecha_hora: {
            type: Date,
            default: Date.now(),
            required: true,
        },
        imagen: {
            type: String,
            required: false,
        },
        descripcion: {
            type: String,
            default: null,
        },
        calificacion: {
            type: String,
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Resenas", resenasSchema);
