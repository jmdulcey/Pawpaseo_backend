import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
  {
    longitud: {
      type: String,
      required: false,
    },
    latitud: {
      type: String,
      required: false,
    },
    precio: {
      type: Number,
      required: false,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    estado: {
      type: String,
      default: "En espera",
      required: true,
    },
    paseador: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Paseadores",
      default: null,
    },
    completado: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Peticiones", requestSchema);
