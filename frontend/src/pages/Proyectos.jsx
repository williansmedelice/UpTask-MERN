import useProyectos from "../hooks/useProyectos";

function Proyectos() {
  const { proyectos } = useProyectos();

  return (
    <>
      <h1 className="text-4xl font-black">Proyectos</h1>
    </>
  );
}

export default Proyectos;
