import Request from "../models/requests.model.js";
import Walker from "../models/petWalker.model.js";
import Completado from "../models/completado.model.js";

export const getRequests = async (req, res) => {
  try {
    const request = await Request.find({
      user: req.params.id,
    }).populate("user");
    res.json(request);
  } catch (error) {
    return res.status(500).json({ message: "Algo fue mal" } + error);
  }
};

export const createRequest = async (req, res) => {
  try {
    let {
      longitud,
      latitud,
      precio,
      user,
      estado,
      date,
      paseador,
      completado,
    } = req.body;
    if (!latitud) {
      latitud = null;
    }
    if (!longitud) {
      longitud = null;
    }
    const precioNumerico = parseInt(precio, 10);

    if (isNaN(precioNumerico)) {
      return res
        .status(400)
        .json({ message: "El precio debe ser un número válido." });
    }

    const newRequest = new Request({
      latitud,
      longitud,
      precio: precioNumerico,
      estado,
      date,
      user,
      paseador,
      completado,
    });

    const savedRequest = await newRequest.save();

    res.json(savedRequest);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Algo fue mal" });
  }
};

export const getRequest = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id).populate("user");
    if (!request)
      return res.status(404).json({ message: "Peticion no encontrada" });
    res.json(request);
  } catch (error) {
    return res.status(404).json({ message: "Peticion no encontrada" });
  }
};

export const deleteRequest = async (req, res) => {
  try {
    const request = await Request.findByIdAndDelete(req.params.id);
    if (!request)
      return res.status(404).json({ message: "Peticion no encontrada" });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(404).json({ message: "Peticion no encontrada" });
  }
};

export const updateRequest = async (req, res) => {
  try {
    const request = await Request.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!request)
      return res.status(404).json({ message: "Peticion no encontrada" });
    res.json(request);
  } catch (error) {
    return res.status(404).json({ message: "Peticion no encontrada" });
  }
};


export const completarYCalificarPeticion = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: "Peticion no encontrada" });
    }

    if (request.paseador == null) {
      return res.status(404).json({ message: "Peticion no aceptada" });
    }

    const updaterequest = await Request.findByIdAndUpdate(
      req.params.id,
      { completado: true },
      { new: true }
    );

    const user = await Walker.findById(request.paseador);
    let updatedData = {};

    if ('calificacion' in req.body) {
      const calificacion = parseInt(req.body.calificacion);
      switch(calificacion) {
        case 1:
          updatedData.calificacion = Math.max(user.calificacion - 1, 0);
          if(user.calificacion <= 2 ) {
            updatedData.estado = false; 
          }      
          break;
        case 2:
          updatedData.calificacion = user.calificacion - 0.5;
          if(user.calificacion <= 2 ) {
            updatedData.estado = false; 
          }  
          break;
        case 3:
          updatedData.calificacion = user.calificacion;
          break;
        case 4:
          if(user.calificacion < 5) {
            updatedData.calificacion = user.calificacion + 0.5;
          }
          break;
        case 5:
          if(user.calificacion < 5) {
            updatedData.calificacion = user.calificacion + 1;
          }
          break;
      }
    }

    const updatedWalker = await Walker.findByIdAndUpdate(
      user._id,
      updatedData,
      { new: true }
    );

    const completadoData = new Completado({
      Id_peticion: request._id,
      id_paseador: request.paseador,
      Id_user: request.user, 
      calificacion: user.calificacion,
    });

    await completadoData.save();

    res.json({ updaterequest, updatedWalker, completadoData });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


export const acceptRequest = async (req, res) => {
  try {
    const { paseador } = req.body;
    const request = await Request.findByIdAndUpdate(
      req.params.id,
      { estado: "aceptado", paseador },
      {
        new: true,
      }
    );
    if (!request)
      return res.status(404).json({ message: "Peticion no encontrada" });
    res.json(request);
  } catch (error) {
    return res.status(404).json({ message: "Peticion no encontrada" });
  }
}; 

export const getPeticion = async (req, res) => {
  try {
    const id = await Request.findById(req.params.id);
    const peticionFound = await Request.findById(id);

    return res.json({
      peticionFound,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getPeticiones = async (req, res) => {
  try {
    const peticionFound = await Request.find();
    return res.json({
      peticionFound,
    });
  } catch (error) {
    console.log(error);
  }
};
