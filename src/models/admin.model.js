import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    foto_perfil: {
      type: String,
      required: false,
    },
    nombre: {
      type: String,
      required: true,
      unique: true,
    },
    telefono: {
      type: String,
      required: true,
    },
    ciudad: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    estado: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Admin", adminSchema);
