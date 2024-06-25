import { Router } from "express";
import {
  register,
  login,
  profile,
  updateAdmin,
  getAdmin,
  getAdmins,
  deleteAdmin,
} from "../controllers/admin.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";
import uploadAdmin from "../middlewares/from-admin.js";
import { upload } from "../middlewares/from-simple.js";

const router = Router();

/* registrar admin */
router.post(
  "/register",
  uploadAdmin.single("foto_perfil"),
  validateSchema(registerSchema),
  register
);

/* logearse con admin */
router.post("/login", upload.none(), validateSchema(loginSchema), login);

/* actualizar admin */
router.put("/update/:id", uploadAdmin.single("foto_perfil"), updateAdmin);

/* devuelve la info del admin */
router.get("/profile", authRequired, profile);

/* obtener un admind */
router.get("/data/:id", getAdmin);

/* obtener todos los admin */
router.get("/data", getAdmins);

/* eliminar un admin */
router.delete("/delete/:id", deleteAdmin);

export default router;
