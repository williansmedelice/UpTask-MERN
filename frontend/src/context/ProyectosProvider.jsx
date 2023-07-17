import { useState, useEffect, createContext } from "react";
import clientAxios from "../config/clientAxios";

const ProyectosContext = createContext();

const ProyectosProvider = ({ children }) => {
  const [proyectos, setProyectos] = useState([]);

  return (
    <ProyectosContext.Provider value={{ proyectos }}>
      {children}
    </ProyectosContext.Provider>
  );
};

export { ProyectosProvider };

export default ProyectosContext;
