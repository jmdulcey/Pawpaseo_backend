import Pet from "../models/pets.model.js";
import cloudinary from "../cloudinaryConfig.js";


export const userGetPets = async (req, res) => {
  try {
    const pets = await Pet.find({
      user: req.params.id,
    }).populate("user");
    res.json(pets);
  } catch (error) {
    return res.status(500).json({ message: "Algo fue mal" });
  }
};

export const createPet = async (req, res) => {

  try {
    const { nombre, descripcion, date, genero, nacimiento, raza, vacunas, alergias, peso, imagen, user, } = req.body;
    let foto_perfil_url = null;
    const file = req.file;
    if (file) {
      const uploadResult = await cloudinary.uploader.upload(file.path, {
        folder: "pets",
      });
      foto_perfil_url = uploadResult.secure_url;
    }
    console.log(req.user);
    const newPet = new Pet({
      nombre,
      descripcion,
      imagen: foto_perfil_url,
      genero,
      nacimiento,
      raza,
      vacunas,
      alergias,
      peso,
      date,
      user,
    });
    
    const savedPet = await newPet.save();
    res.json(savedPet);
  } catch (error) {
    return res.status(500).json({ message: "Algo fue mal" }+error);
  }
};

export const createPetPrueva = async (req, res) => {

  try {
    const { nombre, descripcion, date, genero, nacimiento, raza, vacunas, alergias, peso, imagen, user } = req.body;
    let foto_perfil_url = null;
    let sin_user= null
    const file = req.file;
    if (file) {
      const uploadResult = await cloudinary.uploader.upload(file.path, {
        folder: "pets",
      });
      foto_perfil_url = uploadResult.secure_url;
    }
    console.log(req.user);
    const newPet = new Pet({
      nombre,
      descripcion,
      imagen: foto_perfil_url,
      genero,
      nacimiento,
      raza,
      vacunas,
      alergias,
      peso,
      date,
      user: sin_user,
    });
    
    const savedPet = await newPet.save();
    res.json(savedPet);
  } catch (error) {
    return res.status(500).json({ message: "Algo fue mal" }+error);
  }
};

export const userGetPet = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id).populate("user");
    if (!pet)
      return res.status(404).json({ message: "Mascota no encontrada" });
    res.json(pet);
  } catch (error) {
    return res.status(404).json({ message: "Mascota no encontrada" });
  }
};

export const deletePet = async (req, res) => {
  try {
    const pet = await Pet.findByIdAndDelete(req.params.id);
    if (!pet)
      return res.status(404).json({ message: "Mascota no encontrada" });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(404).json({ message: "Mascota no encontrada" });
  }
};

export const updatePet = async (req, res) => {
  try {
    const pet = await Pet.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!pet)
      return res.status(404).json({ message: "Mascota no encontrada" });
    res.json(pet);
  } catch (error) {
    return res.status(404).json({ message: "Mascota no encontrada" });
  }
};
