import Preguntas from "../models/preguntas.model.js";

export const userGetPreguntas = async (req, res) => {
  try {
    const pregunta = await Preguntas.find({
      user: req.user.id,
    }).populate("user");
    res.json(pregunta);
  } catch (error) {
    return res.status(500).json({ message: "Algo fue mal" });
  }
};

export const createPregunta = async (req, res) => {
  try {
    const { descripcion, fecha_hora, } = req.body;

    console.log(req.user);
    const newPregunta = new Preguntas({
      fecha_hora,
      descripcion,
      user: req.user.id,
    });

    const savedPregunta = await newPregunta.save();
    res.json(savedPregunta);
  } catch (error) {
    return res.status(500).json({ message: "Algo fue mal" } + error);
  }
};

export const createPreguntaPrueva = async (req, res) => {
    try {
      const { descripcion, fecha_hora, usuario, respuesta } = req.body;
  
      console.log(req.user);
      const newPregunta = new Preguntas({
        fecha_hora,
        descripcion,
        usuario,
        respuesta,
      });
  
      const savedPregunta = await newPregunta.save();
      res.json(savedPregunta);
    } catch (error) {
      return res.status(500).json({ message: "Algo fue mal" } + error);
    }
  };

export const userGetPregunta = async (req, res) => {
  try {
    const pregunta = await Preguntas.findById(req.params.id).populate("user");
    if (!pregunta)
      return res.status(404).json({ message: "pregunta no encontrada" });
    res.json(pregunta);
  } catch (error) {
    return res.status(404).json({ message: "pregunta no encontrada" });
  }
};

export const deletePregunta = async (req, res) => {
  try {
    const pregunta = await Preguntas.findByIdAndDelete(req.params.id);
    if (!pregunta)
      return res.status(404).json({ message: "pregunta no encontrada" });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(404).json({ message: "pregunta no encontrada" });
  }
};

export const updatePregunta = async (req, res) => {
  try {
    const pregunta = await Preguntas.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!pregunta)
      return res.status(404).json({ message: "pregunta no encontrada" });
    res.json(pregunta);
  } catch (error) {
    return res.status(404).json({ message: "pregunta no encontrada" });
  }
};

export const getPregunta = async (req, res) => {
    try {
      const id = await Preguntas.findById(req.params.id);
      const preguntaFound = await Preguntas.findById(id);
      return res.json({
        preguntaFound,
      });
    } catch (error) {
      console.log(error);
    }
  };
  
  export const getPreguntas = async (req, res) => {
    try {
      const preguntaFound = await Preguntas.find();
      return res.json({
        preguntaFound,
      });
    } catch (error) {
      console.log(error);
    }
  };