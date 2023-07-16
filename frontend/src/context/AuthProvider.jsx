import { useState, useEffect, createContext } from "react";
import clientAxios from "../config/clientAxios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  useEffect(() => {
    const autenticarUsuario = async () => {
      const token = localStorage.getItem("token");
      //   console.log(token);
      if (!token) {
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const { data } = await clientAxios(`/usuarios/perfil`, config);
        console.log(data);
        setAuth(data);
      } catch (error) {
        console.log(error);
      }
    };

    autenticarUsuario();
  }, []);
  return (
    <AuthContext.Provider value={{ setAuth }}>{children}</AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
