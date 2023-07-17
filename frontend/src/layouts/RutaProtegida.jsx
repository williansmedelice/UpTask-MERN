import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loader from "../components/Loader";

function RutaProtegida() {
  const { auth, cargando } = useAuth();

  if (cargando) return <Loader />;

  return <>{auth._id ? <Outlet /> : <Navigate to="/" />}</>;
}

export default RutaProtegida;
