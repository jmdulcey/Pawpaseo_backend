import Walker from "../models/petWalker.model.js";
import User from "../models/user.model.js";
import bycrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
import cloudinary from "../cloudinaryConfig.js";

export const paseadorRegister = async (req, res) => {
  const { email, password, nombre, telefono, ciudad, services, certificado, calificacion, foto_perfil } = req.body;
  let certificado_url = null
  let foto_perfil_url = null

  const userFound = await User.findOne({ email }) || await Walker.findOne({ email });
  if (userFound)
    return res.status(400).json(["el email ya esta en uso"])

  const nombreFound = await User.findOne({ nombre }) || await Walker.findOne({ nombre });
  if (nombreFound)
    return res.status(400).json(["el nombre ya esta en uso"]);

  const file = req.file; 
    if (file) {
      const uploadResult = await cloudinary.uploader.upload(file.path, {
        folder: "certificado", 
      });
      foto_perfil_url = uploadResult.secure_url;
    }
  try {
    const passwordHash = await bycrypt.hash(password, 10);
    const newPetWalker = new Walker({
      nombre,
      telefono,
      foto_perfil: foto_perfil_url, 
      certificado: certificado_url,
      ciudad,
      calificacion,
      email,
      services,
      password: passwordHash,
    });
    const walkerSaved = await newPetWalker.save();

    const token = await createAccessToken({ id: walkerSaved._id });

    res.cookie("token", token);
    res.json({
      id: walkerSaved._id,
      foto_perfil: walkerSaved.foto_perfil,
      nombre: walkerSaved.nombre,
      telefono: walkerSaved.telefono,
      ciudad: walkerSaved.ciudad,
      email: walkerSaved.email,
      calificacion: walkerSaved.calificacion,
      services: walkerSaved.services,
      createdAt: walkerSaved.createdAt,
      updatedAt: walkerSaved.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const paseadorProfile = async (req, res) => {
  const walkerFound = await Walker.findById(req.user.id);

  if (!walkerFound)
    return res.status(400).json({ message: "Paseador no encontrado" });
  return res.json({
    id: walkerFound._id,
    foto_perfil: walkerFound.foto_perfil,
    services: walkerFound.services,
    username: walkerFound.nombre,
    telefono: walkerFound.telefono,
    ciudad: walkerFound.ciudad,
    services: walkerFound.services,
    email: walkerFound.email,
    createdAt: walkerFound.createdAt,
    updatedAT: walkerFound.updatedAt,
  });
};

export const deletePaseador = async (req, res) => {
  try {
    const walker = await Walker.findByIdAndDelete(req.params.id);
    if (!walker)
      return res.status(404).json({ message: "paseador no encontrado" });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(404).json({ message: "paseador no encontrado" });
  }
};

export const updatePaseador = async (req, res) => {
  try {
    const user = await Walker.findById(req.params.id);
    if (!user)
      return res.status(404).json({ message: "paseador no encontrado" });
    const currentProfilePicUrl = user.foto_perfil;
    let newProfilePicUrl = currentProfilePicUrl;

    const file = req.file;
    if (file) {
      if (currentProfilePicUrl) {
        const publicId = currentProfilePicUrl.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(publicId);
      }

      const uploadResult = await cloudinary.uploader.upload(file.path, {
        folder: "client",
      });
      newProfilePicUrl = uploadResult.secure_url;
    }

    const updatedData = (req.body)
    if (updatedData.password) {
      updatedData.password = await bycrypt.hash(updatedData.password, 10);
    }
    updatedData.foto_perfil = newProfilePicUrl;

    const updatedUser = await Walker.findByIdAndUpdate(
      req.params.id,
      updatedData,
      {
        new: true,
      }
    );
    res.json(updatedUser);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
