import mongoose from "mongoose";

const petSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    descripcion: {
      type: String,
      required: true,
    },
    imagen: {
      type: String,
      required: false,
    },
    genero: {
      type: String,
      required: true,
    },
    nacimiento: {
      type: Date,
      required: true,
    },
    raza: {
      type: String,
      required: true,
    },
    vacunas: {
      type: String,
      required: true,
    },
    alergias: {
      type: String,
      required: true,
    },
    peso: {
      type: String,
      required: false,
      default: null
    },
    date: {
      type: Date,
      default: Date.now,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Pets", petSchema);
