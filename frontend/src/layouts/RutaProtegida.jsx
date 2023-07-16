import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function RutaProtegida() {
  const { auth } = useAuth();
  console.log(auth);
  return <>{auth._id ? <Outlet /> : <Navigate to="/" />}</>;
}

export default RutaProtegida;
