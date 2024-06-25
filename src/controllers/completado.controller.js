import Completado from "../models/completado.model.js";

export const getHistorial = async (req, res) => {
  try {
    const historialId = req.params.id;

    const historialFound = await Completado.findById(historialId)
      .populate('Id_user') 
      .exec();

    if (!historialFound) {
      return res.status(404).json({ message: 'Historial no encontrado' });
    }
    return res.json({
      historialFound,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


export const getAllHistorial = async (req, res) => {
    try {
    const historialFound = await Completado.find().populate('Id_user').exec();
    return res.json({
      historialFound,
    });
  } catch (error) {
     return res.status(500).json({ message: error.message });
  }
};
