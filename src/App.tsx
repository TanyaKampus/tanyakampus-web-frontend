import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/Home";
import Login from "./pages/Authentication/Login";
import Daftar from "./pages/Authentication/Register";
import Identitas from "./pages/Authentication/Register/Identitas";
import Succes from "./pages/Authentication/Register/Succes";
import NotFoundPage from "./pages/NotFoundPage";
import TanyaKampus from "./pages/TanyaKampus/TanyaKampus";
import DetailKampus from "./pages/TanyaKampus/DetailKampus"; 
import TanyaJurusan from "./pages/TanyaJurusan/TanyaJurusan";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />

          {/* Tanya Kampus */}
          <Route path="tanya-kampus">
            <Route index element={<TanyaKampus />} />
            <Route path=":id" element={<DetailKampus />} /> {/* detail kampus */}
          </Route>

          <Route path="tanya-jurusan" element={<TanyaJurusan />} />
          <Route path="login" element={<Login />} />
          <Route path="daftar" element={<Daftar />} />
          <Route path="identitas" element={<Identitas />} />
          <Route path="succes" element={<Succes />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
