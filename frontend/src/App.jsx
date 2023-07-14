import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
// Pages
import Login from "./pages/Login";
import Registrar from "./pages/Registrar";
import OlvidePassword from "./pages/OlvidePassword";
import NuevoPassword from "./pages/NuevoPassword";
import ConfirmaCuenta from "./pages/ConfirmaCuenta";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path="registrar" element={<Registrar />} />
          <Route path="olvide-password" element={<OlvidePassword />} />
          <Route path="nuevo-password/:token" element={<NuevoPassword />} />
          <Route path="confirmar/:token" element={<ConfirmaCuenta />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
