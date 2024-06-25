import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    foto_perfil: {
      type: String,
      required: false,
      unique: true,
    },
    nombre: {
      type: String,
      required: true,
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

export default mongoose.model("User", userSchema);
