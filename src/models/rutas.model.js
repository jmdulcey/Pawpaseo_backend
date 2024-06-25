import mongoose from "mongoose";

const rutaSchema = new mongoose.Schema(
    {
        punto_a: {
            type: String,
            required: true,
        },
        punto_b: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Rutas", rutaSchema);
