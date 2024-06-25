import { Router } from "express";
import {
  getUser,
  getUsers,
  getWalker,
  getWalkers,
  getPet,
  getPets,
  getEstablecimiento,
  getEstablecimientos,
} from "../controllers/get.controller.js";
import {
  userLogin,
  userRegister,
  logout,
  userProfile,
  deleteUser,
  updateUser,
} from "../controllers/auth.controller.js";
import {
  userGetPets,
  userGetPet,
  createPet,
  updatePet,
  deletePet,
  createPetPrueva,
} from "../controllers/pet.controller.js";
import {
  paseadorRegister,
  paseadorProfile,
  deletePaseador,
  updatePaseador,
} from "../controllers/petWalker.controller.js";
import {
  createRequest,
  deleteRequest,
  getRequest,
  getRequests,
  updateRequest,
  acceptRequest,
  getPeticion,
  getPeticiones,
  completarYCalificarPeticion,
} from "../controllers/request.controller.js";
import {
  establecimientoRegister,
  deleteEstablecimiento,
  updateEstablecimiento,
} from "../controllers/establecimiento.controller.js";
import {
  createResena,
  deleteResena,
  updateResena,
  userGetResena,
  userGetResenas,
  getResena,
  getResenas,
} from "../controllers/resenas.controller.js";
import {
  createPregunta,
  createPreguntaPrueva,
  deletePregunta,
  updatePregunta,
  userGetPregunta,
  userGetPreguntas,
  getPregunta,
  getPreguntas,
} from "../controllers/preguntas.controller.js";
import {
  getHistorial,
  getAllHistorial,
} from "../controllers/completado.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import uploadUser from "../middlewares/from-users.js";
import uploadPet from "../middlewares/from-pets.js";
import uploadReseña from "../middlewares/from-resenas.js";
import { upload } from "../middlewares/from-simple.js";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";
import { paseadorRegisterSchema } from "../schemas/petWalker.shema.js";
import { createPetShema } from "../schemas/pet.schema.js";
import { createRequestShema } from "../schemas/request.schema.js";
import { establecimientoRegisterSchema } from "../schemas/establecimiento.schema.js";
import { createPreguntaShema } from "../schemas/preguntas.schema.js";
import { resenaSchema } from "../schemas/resena.shema.js";
import uploadCertificado from "../middlewares/from-certificado.js";

const router = Router();

/* deslogearse para todos */
router.post("/logout", logout);
/* iniciar seccion para usuario y  paseador */
router.post("/login", upload.none(), validateSchema(loginSchema), userLogin);

/* usuarios */
/* obtener usuario por id */
router.get("/usuario/:id", getUser);

/* obtener todos los usuarios */
router.get("/usuarios", getUsers);

/* actualizar un usuario por id */
router.put("/usuario/:id", uploadUser.single("foto_perfil"), updateUser);

/* registrar un usuario nuevo */
router.post(
  "/usuario",
  uploadUser.single("foto_perfil"),
  validateSchema(registerSchema),
  userRegister
);

/* traer informacion de usuario, requiere iniciar seccion */
router.get("/usuarioProfile", authRequired, userProfile);

/* eliminar un usuario */
router.delete("/usuario/:id", deleteUser);

/* paseadores */
/* obtener paseador por id */
router.get("/paseador/:id", getWalker);

/* obtener todos los paseadores */
router.get("/paseadores", getWalkers);

/* registrar un usuario paseador */
router.post(
  "/paseador",
  uploadCertificado.single("certificado"),
  validateSchema(paseadorRegisterSchema),
  paseadorRegister
);

/* traer informacion de paseador, requiere iniciar seccion */
router.get("/paseadorProfile", authRequired, paseadorProfile);

/* eliminar un paseador */
router.delete("paseador/:id", deletePaseador);

/* actualizar un paseador por id */
router.put("/paseador/:id", uploadUser.single("foto_perfil"), updatePaseador);

/* mascotas */
/* obtener mascota por id */
router.get("/mascota/:id", getPet);

/* obtener todas las mascotas */
router.get("/mascotas", getPets);

/* actualizar una mascota por id */
router.put("/mascota/:id", upload.none(), updatePet);

/* obtener todas las mascotas de un usuario logeado */
router.get("/mascotasUsuario/:id", userGetPets);

/* obtener una mascota de un usuario logeado por id */
router.get("/mascotaUsuario/:id", userGetPet);

/* crear una mascota, nesecita logearse */
router.post(
  "/mascota",
  uploadPet.single("imagen"),
  validateSchema(createPetShema),
  createPet
);

router.post(
  "/mascotaprueva",
  uploadPet.single("imagen"),
  validateSchema(createPetShema),
  createPetPrueva
);

/* eliminar una mascota por id */
router.delete("/mascota/:id", deletePet);

/* preguntas */
/* obtener pregunta por id */
router.get("/pregunta/:id", getPregunta);

/* obtener todas las preguntas */
router.get("/preguntas", getPreguntas);

/* actualizar una pregunta por id */
router.put("/pregunta/:id", upload.none(), updatePregunta);

/* actualizar una pregunta de un usuario logeado por id */
router.put(
  "/preguntasUsuario/:id",
  upload.none(),
  authRequired,
  updatePregunta
);

/* obtener todas las preguntas de un usuario logeado */
router.get("/preguntasUsuario", authRequired, userGetPreguntas);

/* obtener una pregunta de un usuario logeado por id */
router.get("/preguntaUsuario/:id", authRequired, userGetPregunta);

/* crear una pregunta, nesecita logearse */
router.post(
  "/preguntaUsuario",
  upload.none(),
  authRequired,
  validateSchema(createPreguntaShema),
  createPregunta
);

/* crear una pregunta */
router.post(
  "/pregunta",
  upload.none(),
  validateSchema(createPreguntaShema),
  createPreguntaPrueva
);

/* eliminar una pregunta por id */
router.delete("/pregunta/:id", deletePregunta);

/* peticiones */
/* obtener peticion por id */
router.get("/peticion/:id", getPeticion);

/* obtener todas las peticiones */
router.get("/peticiones", getPeticiones);

/* obtener todas las peticiones de un usuario, el :id va el id del usuario */
router.get("/peticionesUsuario/:id", getRequests);

/* obtener una peticion por id */
router.get("/peticionUsuario/:id", getRequest);

/* crear una peticion */
router.post(
  "/peticion",
  upload.none(),
  validateSchema(createRequestShema),
  createRequest
);

/* eliminar una peticion por id */
router.delete("/peticion/:id", deleteRequest);

/* actualizar una peticion por id */
router.put("/peticion/:id", upload.none(), updateRequest);

/* aceptar una peticion por id */
router.put("/peticiona/:id", upload.none(), acceptRequest);

/* calificar una peticion por id */
router.put("/peticionc/:id", upload.none(), completarYCalificarPeticion);

/* estableciminetos */
/* obtener todos los establecimientos */
router.get("/establecimientos", getEstablecimientos);

/* obtener un establecimient por id */
router.get("/establecimiento/:id", getEstablecimiento);

/* registrar un establecimiento */
router.post(
  "/establecimiento",
  upload.none(),
  validateSchema(establecimientoRegisterSchema),
  establecimientoRegister
);

/* eliminar un establecimiento */
router.delete("/establecimiento/:id", deleteEstablecimiento);

/* actualizar un establecimiento */
router.put("/establecimiento/:id", upload.none(), updateEstablecimiento);

/* reseñas */
/* obtenes todas las reseñas */
router.get("/resenas", getResenas);

/* obtener una reseña por id */
router.get("/resena/:id", getResena);

/* actualizar una reseña */
router.put("/resena/:id", upload.none(), updateResena);

/* actualizar una reseña de un usuario logeado */
router.put("/resenaUsuario/:id", upload.none(), authRequired, updateResena);

/* obtenes todas las reseñas de un usuario logeado */
router.get("/resenasusuario", authRequired, userGetResenas);

/* obtener una reseña por id de un usuario logeado */
router.get("/resenausuario/:id", authRequired, userGetResena);

/* crear una reseña */
router.post(
  "/resena",
  uploadReseña.single("imagen"),
  authRequired,
  validateSchema(resenaSchema),
  createResena
);

/* eliminar una reseña */
router.delete("/resena/:id", deleteResena);

/* obtener un historial */
router.get("/peticionhistorial/:id", getHistorial);

/* obtener todo el historial */
router.get("/peticionhistorial", getAllHistorial);

export default router;
