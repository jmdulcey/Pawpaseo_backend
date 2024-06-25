import Admin from "../models/admin.model.js";
import bycrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
import cloudinary from "../cloudinaryConfig.js";

export const register = async (req, res) => {
  const { email, password, nombre, telefono, ciudad, foto_perfil } = req.body;
  let ciudad_default = null
  let foto_perfil_url = null
  const file = req.file; 
    if (file) {
      const uploadResult = await cloudinary.uploader.upload(file.path, {
        folder: "admin", 
      });
      foto_perfil_url = uploadResult.secure_url;
    }
  try {
    const passwordHash = await bycrypt.hash(password, 10);
    const newAdmin = new Admin({
      nombre,
      telefono,
      ciudad: ciudad_default,
      email,
      password: passwordHash,
      foto_perfil: foto_perfil_url, 
    });
    const adminSaved = await newAdmin.save();

    const token = await createAccessToken({ id: adminSaved._id });

    res.cookie("token", token);
    res.json({
      id: adminSaved._id,
      nombre: adminSaved.nombre,
      telefono: adminSaved.telefono,
      foto_perfil: adminSaved.foto_perfil,
      ciudad: adminSaved.ciudad,
      email: adminSaved.email,
      createdAt: adminSaved.createdAt,
      updatedAt: adminSaved.updatedAt,
    });
    console.log("Admin creado");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { identifier, password } = req.body; 
  try {
    const adminFound = await Admin.findOne({ $or: [{ email: identifier }, { nombre: identifier }] });

    if (!adminFound)
      return res.status(400).json({ message: "admin no encontrado" });
    const isMatch = await bycrypt.compare(password, adminFound.password);

    if (!isMatch)
      return res.status(400).json({ message: "Contraseña incorrecta" });

    const token = await createAccessToken({ id: adminFound._id });

    res.cookie("token", token);
    res.json({
      id: adminFound._id,
      nombre: adminFound.nombre,
      email: adminFound.email,
      createdAt: adminFound.createdAt,
      updatedAt: adminFound.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateAdmin = async (req, res) => {
  try {
    const user = await Admin.findById(req.params.id);
    if (!user)
      return res.status(404).json({ message: "admin no encontrado" });

    const currentProfilePicUrl = user.foto_perfil;

    let newProfilePicUrl = currentProfilePicUrl;
    const file = req.file;
    if (file) {
      if (currentProfilePicUrl) {
        const publicId = currentProfilePicUrl.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(publicId);
      }

      const uploadResult = await cloudinary.uploader.upload(file.path, {
        folder: "admin",
      });
      newProfilePicUrl = uploadResult.secure_url;
    }

    let updatedData = req.body;
    if (updatedData.password) {
      updatedData.password = await bycrypt.hash(updatedData.password, 10);
    }
    updatedData.foto_perfil = newProfilePicUrl;

    const updatedUser = await Admin.findByIdAndUpdate(
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

export const getAdmin = async (req, res) => {
  try {
    const id = await Admin.findById(req.params.id)
    const adminFound = await Admin.findById(id)
    return res.json({
      adminFound
    })
  } catch (error) {
    console.log(error)
  }
}

export const getAdmins = async (req, res) => {
  try {
    const adminFound = await Admin.find();
    return res.json({
      adminFound
    })
  } catch (error) {
    console.log(error)
  }
}

export const profile = async (req, res) => {
  const adminFound = await Admin.findById(req.user.id)

  if (!adminFound) return res.status(400).json({ message: "admin no encontrado" });
  return res.json({
    id: adminFound._id,
    foto_perfil: adminFound.foto_perfil,
    nombre: adminFound.nombre,
    email: adminFound.email,
    telefono: adminFound.telefono,
    ciudad: adminFound.ciudad,
    createdAt: adminFound.createdAt,
    updatedAT: adminFound.updatedAt,
  })
};

export const deleteAdmin = async (req, res) => {
  try {
    const user = await Admin.findByIdAndDelete(req.params.id);
    if (!user)
      return res.status(404).json({ message: "admin no encontrado" });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(404).json({ message: "admin no encontrado" });
  }
};

