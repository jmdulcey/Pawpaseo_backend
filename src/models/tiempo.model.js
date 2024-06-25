import mongoose from "mongoose";

const tiempoSchema = new mongoose.Schema(
  {
    longitud: {
      type: String,
      required: true,
    },
    latitud: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("TiempoReal", tiempoSchema);
