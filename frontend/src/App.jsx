import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import RutaProtegida from "./layouts/RutaProtegida";
// Pages
import Login from "./pages/Login";
import Registrar from "./pages/Registrar";
import OlvidePassword from "./pages/OlvidePassword";
import NuevoPassword from "./pages/NuevoPassword";
import ConfirmaCuenta from "./pages/ConfirmaCuenta";
import Proyectos from "./pages/Proyectos";
import NuevoProyecto from "./pages/NuevoProyecto";
// Context
import { AuthProvider } from "./context/AuthProvider";
import PageNotFound404 from "./pages/PageNotFound404";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<AuthLayout />}>
            <Route index element={<Login />} />
            <Route path="registrar" element={<Registrar />} />
            <Route path="olvide-password" element={<OlvidePassword />} />
            <Route path="nuevo-password/:token" element={<NuevoPassword />} />
            <Route path="confirmar/:token" element={<ConfirmaCuenta />} />
          </Route>
          <Route path="/proyectos" element={<RutaProtegida />}>
            <Route index element={<Proyectos />} />
            <Route path="crear-proyecto" element={<NuevoProyecto />} />
          </Route>
          <Route path="*" element={<PageNotFound404 />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
