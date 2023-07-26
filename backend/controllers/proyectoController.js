import Proyecto from "../models/Proyecto.js";
import Usuario from "../models/Usuario.js";

const obtenerProyectos = async (req, res) => {
  //   console.log(req.usuario);
  try {
    const proyectos = await Proyecto.find()
      .where("creador")
      .equals(req.usuario)
      .select("-tareas");
    res.json(proyectos);
  } catch (error) {
    console.log(error);
    const err = new Error("Hubo un error");
    return res.status(404).json({ msg: err.message });
  }
};

const nuevoProyecto = async (req, res) => {
  const proyecto = new Proyecto(req.body);
  proyecto.creador = req.usuario._id;

  try {
    const proyectoAlmacenado = await proyecto.save();
    res.json(proyectoAlmacenado);
  } catch (error) {
    console.log(error);
    const err = new Error("Hubo un error");
    return res.status(404).json({ msg: err.message });
  }
};

const obtenerProyecto = async (req, res) => {
  const { id } = req.params;
  try {
    const proyecto = await Proyecto.findById(id).populate("tareas");

    if (!proyecto) {
      const error = new Error("No encontrado");
      return res.status(404).json({ msg: error.message });
    }

    // console.log(proyecto.creador);
    // console.log(req.usuario._id);

    if (proyecto.creador.toString() !== req.usuario._id.toString()) {
      const error = new Error("Acción No Válida");
      return res.status(401).json({ msg: error.message });
    }

    // Obtener las tareas del Proyecto

    res.json(proyecto);
  } catch (error) {
    console.log(error);
    const err = new Error("Hubo un error");
    return res.status(404).json({ msg: err.message });
  }
};

const editarProyecto = async (req, res) => {
  const { id } = req.params;
  //   console.log(req.body);
  try {
    const proyecto = await Proyecto.findById(id);

    if (!proyecto) {
      const error = new Error("No encontrado");
      return res.status(404).json({ msg: error.message });
    }

    // console.log(proyecto.creador);
    // console.log(req.usuario._id);

    if (proyecto.creador.toString() !== req.usuario._id.toString()) {
      const error = new Error("Acción No Válida");
      return res.status(401).json({ msg: error.message });
    }

    proyecto.nombre = req.body.nombre || proyecto.nombre;
    proyecto.descripcion = req.body.descripcion || proyecto.descripcion;
    proyecto.fechaEntrega = req.body.fechaEntrega || proyecto.fechaEntrega;
    proyecto.cliente = req.body.cliente || proyecto.cliente;

    try {
      const proyectoAlmacenado = await proyecto.save();

      res.json(proyectoAlmacenado);
    } catch (error) {
      console.log(error);
      const err = new Error("Hubo un error");
      return res.status(404).json({ msg: err.message });
    }
  } catch (error) {
    console.log(error);
    const err = new Error("Hubo un error");
    return res.status(404).json({ msg: err.message });
  }
};

const eliminarProyecto = async (req, res) => {
  const { id } = req.params;
  //   console.log(req.body);
  try {
    const proyecto = await Proyecto.findById(id);

    if (!proyecto) {
      const error = new Error("No encontrado");
      return res.status(404).json({ msg: error.message });
    }

    // console.log(proyecto.creador);
    // console.log(req.usuario._id);

    if (proyecto.creador.toString() !== req.usuario._id.toString()) {
      const error = new Error("Acción No Válida");
      return res.status(401).json({ msg: error.message });
    }

    try {
      await proyecto.deleteOne();

      res.json({ msg: "Proyecto Eliminado" });
    } catch (error) {
      console.log(error);
      const err = new Error("Hubo un error");
      return res.status(404).json({ msg: err.message });
    }
  } catch (error) {
    console.log(error);
    const err = new Error("Hubo un error");
    return res.status(404).json({ msg: err.message });
  }
};

const buscarColaborador = async (req, res) => {
  // console.log(req.body)
  const { email } = req.body;
  try {
    const usuario = await Usuario.findOne({ email }).select(
      "-confirmado -password -token -createdAt -updatedAt -__v"
    );

    if (!usuario) {
      const error = new Error("Proyecto no encontrado");
      return res.status(404).json({ msg: error.message });
    }

    res.json(usuario);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Hubo un error" });
  }
};

const agregarColaborador = async (req, res) => {
  // console.log(req.params.id);
  try {
    const proyecto = await Proyecto.findById(req.params.id);
    if (!proyecto) {
      const error = new Error("Usuario No Encontrado");
      return res.status(404).json({ msg: error.message });
    }
    res.json({});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Hubo un error" });
  }
};

const eliminarColaborador = async (req, res) => {};

export {
  obtenerProyectos,
  nuevoProyecto,
  obtenerProyecto,
  editarProyecto,
  eliminarProyecto,
  buscarColaborador,
  agregarColaborador,
  eliminarColaborador,
};
