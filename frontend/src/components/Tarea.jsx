import useProyectos from "../hooks/useProyectos";
import useAdmin from "../hooks/useAdmin";
import { formatearFecha } from "../helpers/formatearfecha";

const Tarea = ({ tarea }) => {
  const { handleModalEditarTarea, handleModalEliminarTarea } = useProyectos();
  const { nombre, descripcion, fechaEntrega, prioridad, _id, estado } = tarea;
  const admin = useAdmin();
  return (
    <div className="border-b p-5 flex justify-between items-center">
      <div>
        <p className="mb-1 text-xl">{nombre}</p>
        <p className="mb-1 text-sm text-gray-500 uppercase">{descripcion}</p>
        <p className="mb-1 text-xl">{formatearFecha(fechaEntrega)}</p>
        <p className="mb-1 text-xl text-gray-600">Prioridad: {prioridad}</p>
      </div>
      <div className="flex gap-2">
        {admin && (
          <button
            type="button"
            className="bg-indigo-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
            onClick={() => handleModalEditarTarea(tarea)}
          >
            Editar
          </button>
        )}
        {estado ? (
          <button
            type="button"
            className="bg-sky-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
          >
            Completa
          </button>
        ) : (
          <button
            type="button"
            className="bg-gray-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
          >
            Incompleta
          </button>
        )}
        {admin && (
          <button
            type="button"
            className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
            onClick={() => handleModalEliminarTarea(tarea)}
          >
            Eliminar
          </button>
        )}
      </div>
    </div>
  );
};

export default Tarea;
