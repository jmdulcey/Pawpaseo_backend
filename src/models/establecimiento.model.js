import mongoose from "mongoose";

const guarderiaSchema = new mongoose.Schema(
    {
    nombre: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
        required: true,
        trim: true,
    },
    ubicacion: {
        type: String,
        required: true,
        unique: true,
        },
    contacto: {
        type: String,
        required: true,
        },
    estado:{
        type: Boolean,
        default: true
        },
},
{
    timestamps: true,
}
);

export default mongoose.model("Establecimiento", guarderiaSchema);
