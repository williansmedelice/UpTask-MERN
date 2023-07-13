import { Router } from "express";
const router = Router();
import {
  registrar,
  autenticar,
  confirmar,
  olvidePassword,
  comprobarToken,
  nuevoPassword,
  perfil,
} from "../controllers/usuarioController.js";
import checkAuth from "../middleware/checkAuth.js";

// Autemticación, Registro y Confirmación de Usuarios

router.post("/", registrar); // Crear un nuevo usuario
router.post("/login", autenticar); // Autenticar un nuevo usuario
router.get("/confirmar/:token", confirmar); // Confirmar un nuevo usuario
router.post("/olvide-password", olvidePassword); //Olvide Password

// router.get("/olvide-password/:token", comprobarToken); // Comprobar Token para cambiar password
// router.post("/olvide-password/:token", nuevoPassword); // Ingresa un nuevo Password

router.route("/olvide-password/:token").get(comprobarToken).post(nuevoPassword);

router.get("/perfil", checkAuth, perfil);

export default router;
