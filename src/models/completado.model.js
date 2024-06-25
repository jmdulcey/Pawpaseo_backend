import mongoose from "mongoose";

const CompletadoSchema = new mongoose.Schema(
  {
    Id_peticion: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Peticiones",
      required: false,
    },
    id_paseador: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Paseadores",
      required: false,
    },
    Id_user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
        },
    calificacion: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Completado", CompletadoSchema);
