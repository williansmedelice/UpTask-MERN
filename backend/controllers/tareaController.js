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

    // Almacenar el ID en el proyecto
    existeProyecto.tareas.push(tareaAlmacenada._id);
    await existeProyecto.save();

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
    // console.log(tarea);

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

  try {
    const tarea = await Tarea.findById(id).populate("proyecto");
    // console.log(tarea);

    if (!tarea) {
      const error = new Error("Tarea no encontrada");
      return res.status(404).json({ msg: error.message });
    }

    if (tarea.proyecto.creador.toString() !== req.usuario._id.toString()) {
      const error = new Error("Acción no válida");
      return res.status(403).json({ msg: error.message });
    }

    const proyecto = await Proyecto.findById(tarea.proyecto);
    proyecto.tareas.pull(tarea._id);

    await Promise.allSettled([await proyecto.save(), await tarea.deleteOne()]);
    res.json({ msg: "La tarea se eliminó" });
  } catch (error) {
    console.log(error);
    const err = new Error("Hubo un error");
    return res.status(404).json({ msg: err.message });
  }
};

const cambiarEstado = async (req, res) => {
  // console.log(req.params);
  const { id } = req.params;

  try {
    const tarea = await Tarea.findById(id).populate("proyecto");

    if (!tarea) {
      const error = new Error("Tarea no encontrada");
      return res.status(404).json({ msg: error.message });
    }
    // console.log(tarea);

    if (
      tarea.proyecto.creador.toString() !== req.usuario._id.toString() &&
      !tarea.proyecto.colaboradores.some(
        (colaborador) =>
          colaborador._id.toString() === req.usuario._id.toString()
      )
    ) {
      const error = new Error("Acción No Válida");
      return res.status(403).json({ msg: error.message });
    }
    tarea.estado = !tarea.estado;
    tarea.completado = req.usuario._id;

    await tarea.save();

    const tareaAlmacenada = await Tarea.findById(id)
      .populate("proyecto")
      .populate("completado", "nombre");

    res.json(tareaAlmacenada);
  } catch (error) {
    console.log(error);
    const err = new Error("Hubo un error");
    return res.status(500).json({ msg: err.message });
  }
};

export {
  agregarTarea,
  obtenerTarea,
  actualizarTarea,
  eliminarTarea,
  cambiarEstado,
};
