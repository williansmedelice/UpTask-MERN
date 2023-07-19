import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useProyectos from "../hooks/useProyectos";

const Proyecto = () => {
  const params = useParams();
  const { proyecto, cargando, obtenerProyecto, setProyecto } = useProyectos();

  useEffect(() => {
    obtenerProyecto(params.id);
    return () => {
      setProyecto({});
    };
  }, []);

  const { nombre } = proyecto;

  return cargando ? (
    "Cargando...!"
  ) : (
    <div>
      <h1 className="font-black text-4xl">{nombre}</h1>
    </div>
  );
};

export default Proyecto;
