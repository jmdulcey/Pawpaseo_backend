import mongoose from "mongoose";

const petWalkerSchema = new mongoose.Schema({
  foto_perfil: {
      type: String,
      required: false,
    },
  certificado: {
      type: String,
      required: false,
    },
  nombre: {
    type: String,
    required: true,
  },
  telefono: {
    type: String,
    required: true,
  },
  calificacion: {
    type: Number,
    required: false,
    default: 5,
  },
  ciudad: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  services: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  estado:{
    type: Boolean,
    default: true
  }
},{
  timestamps: true
});

export default mongoose.model("Paseadores", petWalkerSchema);
