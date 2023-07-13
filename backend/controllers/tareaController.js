import Proyecto from "../models/Proyecto.js";
import Tarea from "../models/Tarea.js";

const agregarTarea = async (req, res) => {
  //   console.log(req.body);
  const { proyecto } = req.body;

  const existeProyecto = await Proyecto.findById(proyecto);
  //   console.log(existeProyecto);

  if (!existeProyecto) {
    const error = new Error("El Proyecto no existe");
    return res.status(404).json({ msg: error.message });
  }

  if (existeProyecto.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error("No tiene los permisos para añadir taraeas");
    return res.status(403).json({ msg: error.message });
  }

  try {
    const tareaAlmacenada = await Tarea.create(req.body);
    res.json(tareaAlmacenada);
  } catch (error) {
    console.log(error);
    const err = new Error("Hubo un error");
    return res.status(404).json({ msg: err.message });
  }
};

const obtenerTarea = async (req, res) => {
  const { id } = req.params;

  try {
    const tarea = await Tarea.findById(id).populate("proyecto");
    console.log(tarea);

    if (!tarea) {
      const error = new Error("Tarea no encontrada");
      return res.status(404).json({ msg: error.message });
    }

    if (tarea.proyecto.creador.toString() !== req.usuario._id.toString()) {
      const error = new Error("Acción no válida");
      return res.status(403).json({ msg: error.message });
    }
    res.json(tarea);
  } catch (error) {
    console.log(error);
    const err = new Error("Hubo un error");
    return res.status(404).json({ msg: err.message });
  }
};

const actualizarTarea = async (req, res) => {
  const { id } = req.params;
  const tarea = await Tarea.findById(id).populate("proyecto");
  console.log(tarea);

  if (!tarea) {
    const error = new Error("Tarea no encontrada");
    return res.status(404).json({ msg: error.message });
  }

  if (tarea.proyecto.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error("Acción no válida");
    return res.status(403).json({ msg: error.message });
  }

  tarea.nombre = req.body.nombre || tarea.nombre;
  tarea.descripcion = req.body.descripcion || tarea.descripcion;
  tarea.prioridad = req.body.prioridad || tarea.prioridad;
  tarea.fechaEntrega = req.body.fechaEntrega || tarea.fechaEntrega;

  try {
    const tareaAlmacenada = await tarea.save();
    res.json(tareaAlmacenada);
  } catch (error) {
    console.log(error);
  }
};

const eliminarTarea = async (req, res) => {
  const { id } = req.params;
  const tarea = await Tarea.findById(id).populate("proyecto");
  console.log(tarea);

  if (!tarea) {
    const error = new Error("Tarea no encontrada");
    return res.status(404).json({ msg: error.message });
  }

  if (tarea.proyecto.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error("Acción no válida");
    return res.status(403).json({ msg: error.message });
  }

  try {
    await tarea.deleteOne();
    res.json({ msg: "Tarea Eliminada" });
  } catch (error) {
    console.log(error);
  }
};

const cambiarEstado = async (req, res) => {};

export {
  agregarTarea,
  obtenerTarea,
  actualizarTarea,
  eliminarTarea,
  cambiarEstado,
};
