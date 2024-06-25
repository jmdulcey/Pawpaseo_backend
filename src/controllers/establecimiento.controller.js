import Establecimiento from "../models/establecimiento.model.js";


export const establecimientoRegister = async (req, res) => {
  const { nombre, email, descripcion, ubicacion, contacto } = req.body;
  try {
    const newEstablecimiento = new Establecimiento({
      nombre,
      email,
      descripcion,
      ubicacion,
      contacto,
    });
    const establecimientoSaved = await newEstablecimiento.save();
    res.json({
      id: establecimientoSaved._id,
      nombre: establecimientoSaved.nombre,
      email: establecimientoSaved.email,
      ubicacion: establecimientoSaved.ubicacion,
      descripcion: establecimientoSaved.descripcion,
      contacto: establecimientoSaved.contacto,
      createdAt: establecimientoSaved.createdAt,
      updatedAt: establecimientoSaved.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteEstablecimiento = async (req, res) => {
  try {
    const establecimiento = await Establecimiento.findByIdAndDelete(req.params.id);
    if (!establecimiento)
      return res.status(404).json({ message: "Establecimiento no encontrado" });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(404).json({ message: "Establecimiento no encontrado" });
  }
};

export const updateEstablecimiento = async (req, res) => {
  try {
    const establecimiento = await Establecimiento.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!establecimiento)
      return res.status(404).json({ message: "Establecimiento no encontrado" });
    res.json(establecimiento);
  } catch (error) {
    return res.status(404).json({ message: "Establecimiento no encontrado" });
  }
};


