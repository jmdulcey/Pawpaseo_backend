import User from "../models/user.model.js";
import Walker from "../models/petWalker.model.js";
import bycrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
import cloudinary from "../cloudinaryConfig.js";

export const userRegister = async (req, res) => {
  const { email, password, nombre, telefono, ciudad, foto_perfil } = req.body;
  let ciudad_default = null;
  let foto_perfil_url = null;

  const emailFound = await User.findOne({ email }) || await Walker.findOne({ email });
  if (emailFound)
    return res.status(400).json(["el email ya esta en uso"]);

  const nombreFound = await User.findOne({ nombre }) || await Walker.findOne({ nombre });
  if (nombreFound)
    return res.status(400).json(["el nombre ya esta en uso"]);

  const file = req.file;
  if (file) {
    const uploadResult = await cloudinary.uploader.upload(file.path, {
      folder: "client",
    });
    foto_perfil_url = uploadResult.secure_url;
  }
  try {
    const passwordHash = await bycrypt.hash(password, 10);
    const newUser = new User({
      nombre,
      telefono, 
      ciudad: ciudad_default,
      email,
      password: passwordHash,
      foto_perfil: foto_perfil_url,
    });

    const userSaved = await newUser.save();

    const token = await createAccessToken({ id: userSaved._id });

    res.cookie("token", token);
    res.json({
      id: userSaved._id,
      foto_perfil: userSaved.foto_perfil,
      nombre: userSaved.nombre,
      telefono: userSaved.telefono,
      ciudad: userSaved.ciudad,
      email: userSaved.email,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const userLogin = async (req, res) => {
  const { identifier, password } = req.body;
  try {
    let userFound = await User.findOne({
      $or: [{ email: identifier }, { nombre: identifier }],
    });

    if (!userFound) {
      // Si no se encuentra un usuario, busca un paseador
      let walkerFound = await Walker.findOne({
        $or: [{ email: identifier }, { nombre: identifier }],
      });

      if (!walkerFound) {
        return res.status(400).json({ message: "Usuario o paseador no encontrado" });
      }

      // Verifica el estado del paseador
      if (walkerFound.estado == false) {
        return res.status(404).json({ message: "paseador baneado" });
      }

      // Verifica la contraseña del paseador
      const isMatch = await bycrypt.compare(password, walkerFound.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Contraseña incorrecta" });
      }

      // Crea y envía el token para el paseador
      const token = await createAccessToken({ id: walkerFound._id });
      res.cookie("token", token);
      return res.json({
        id: walkerFound._id,
        foto: walkerFound.foto_perfil,
        nombre: walkerFound.nombre,
        email: walkerFound.email,
        telefono: walkerFound.telefono,
        ciudad:walkerFound.ciudad,
        createdAt: walkerFound.createdAt,
        updatedAt: walkerFound.updatedAt,
        services: walkerFound.services 
      });

    } else {
      // Verifica el estado del usuario
      if (userFound.estado == false) {
        return res.status(404).json({ message: "usuario baneado" });
      }

      // Verifica la contraseña del usuario
      const isMatch = await bycrypt.compare(password, userFound.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Contraseña incorrecta" });
      }

      // Crea y envía el token para el usuario
      const token = await createAccessToken({ id: userFound._id });
      res.cookie("token", token);
      return res.json({
        id: userFound._id,
        foto: userFound.foto_perfil,
        nombre: userFound.nombre,
        email: userFound.email,
        telefono:userFound.telefono,
        ciudad: userFound.ciudad,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt,
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const logout = (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

export const userProfile = async (req, res) => {
  const userFound = await User.findById(req.user.id);

  if (!userFound)
    return res.status(400).json({ message: "usuario no encontrado" });
  return res.json({
    id: userFound._id,
    foto_perfil: userFound.foto_perfil,
    nombre: userFound.nombre,
    email: userFound.email,
    telefono: userFound.telefono,
    ciudad: userFound.ciudad,
    createdAt: userFound.createdAt,
    updatedAT: userFound.updatedAt,
  });
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user)
      return res.status(404).json({ message: "usuario no encontrado" });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(404).json({ message: "usuario no encontrado" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user)
      return res.status(404).json({ message: "usuario no encontrado" });

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

    let updatedData = req.body;
    if (updatedData.password) {
      updatedData.password = await bycrypt.hash(updatedData.password, 10);
    }
    updatedData.foto_perfil = newProfilePicUrl;

    const updatedUser = await User.findByIdAndUpdate(
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
