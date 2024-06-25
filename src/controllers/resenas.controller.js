import Resenas from "../models/resenas.model.js";
import cloudinary from "../cloudinaryConfig.js";

export const userGetResenas = async (req, res) => {
  try {
    const resenas = await Resenas.find({
      user: req.user.id,
    }).populate("user");
    res.json(resenas);
  } catch (error) {
    return res.status(500).json({ message: "Algo fue mal" });
  }
};

export const createResena = async (req, res) => {
  try {
    const { fecha_hora, descripcion, calificacion, imagen } = req.body;
    let imagen_url = null;
    const file = req.file;
    if (file) {
      const uploadResult = await cloudinary.uploader.upload(file.path, {
        folder: "reseñas",
      });
      imagen_url = uploadResult.secure_url;
    }
    console.log(req.user);
    const newResenas = new Resenas({
      fecha_hora,
      descripcion,
      calificacion,
      imagen: imagen_url,
      user: req.user.id,
    });

    const savedResenas = await newResenas.save();
    res.json(savedResenas);
  } catch (error) {
    return res.status(500).json({ message: "Algo fue mal" } + error);
  }
};

export const userGetResena = async (req, res) => {
  try {
    const esenas = await Resenas.findById(req.params.id).populate("user");
    if (!esenas)
      return res.status(404).json({ message: "Reseña no encontrada" });
    res.json(esenas);
  } catch (error) {
    return res.status(404).json({ message: "Reseña no encontrada" });
  }
};

export const deleteResena = async (req, res) => {
  try {
    const resena = await Resenas.findByIdAndDelete(req.params.id);
    if (!resena)
      return res.status(404).json({ message: "Reseña no encontrada" });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(404).json({ message: "Reseña no encontrada" });
  }
};

export const updateResena = async (req, res) => {
  try {
    const resena = await Resenas.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!resena)
      return res.status(404).json({ message: "Reseña no encontrada" });
    res.json(resena);
  } catch (error) {
    return res.status(404).json({ message: "Reseña no encontrada" });
  }
};

export const getResena = async (req, res) => {
  try {
    const id = await Resenas.findById(req.params.id);
    const resenaFound = await Resenas.findById(id);
    return res.json({
      resenaFound,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getResenas = async (req, res) => {
  try {
    const resenaFound = await Resenas.find();
    return res.json({
      resenaFound,
    });
  } catch (error) {
    console.log(error);
  }
};
