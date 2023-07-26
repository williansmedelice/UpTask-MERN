import { Router } from "express";
const router = Router();
import {
  obtenerProyectos,
  nuevoProyecto,
  obtenerProyecto,
  editarProyecto,
  eliminarProyecto,
  buscarColaborador,
  agregarColaborador,
  eliminarColaborador,
} from "../controllers/proyectoController.js";
import checkAuth from "../middleware/checkAuth.js";

router
  .route("/")
  .get(checkAuth, obtenerProyectos)
  .post(checkAuth, nuevoProyecto);

router
  .route("/:id")
  .get(checkAuth, obtenerProyecto)
  .put(checkAuth, editarProyecto)
  .delete(checkAuth, eliminarProyecto);

router.post("/colaboradores", checkAuth, buscarColaborador);
router.post("/colaboradore/:id", checkAuth, agregarColaborador);
router.delete("/colaboradore/:id", checkAuth, eliminarColaborador);

export default router;
