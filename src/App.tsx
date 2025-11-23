import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/Home";
import Login from "./pages/Authentication/Login";
import Daftar from "./pages/Authentication/Register";
import Identitas from "./pages/Authentication/Register/Identitas";
import Succes from "./pages/Authentication/Register/Succes";
import NotFoundPage from "./pages/NotFoundPage";
import TanyaKampus from "./pages/TanyaKampus/TanyaKampus";
import TanyaJurusan from "./pages/TanyaJurusan/TanyaJurusan";
import CategoryTest from "./pages/CategoryTest/CategoryTest";
import CekarusMinat from "./pages/CategoryTest/CekarusMinat";
// import Test from "./pages/CategoryTest/Test";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/category-test">
            <Route index element={<CategoryTest />} />

            {/* Cekarus Minat */}
            <Route path="cekarus-minat" element={<CekarusMinat />}>
              {/* Test sebagai nested route */}
              {/* <Route path="test" element={<Test />} /> */}
            </Route>
          </Route>
          {/* <Route path="test" element={<Test />} /> */}
          <Route path="/tanya-kampus" element={<TanyaKampus />} />
          <Route path="/tanya-jurusan" element={<TanyaJurusan />} />
          <Route path="/login" element={<Login />} />
          <Route path="/daftar" element={<Daftar />} />
          <Route path="/identitas" element={<Identitas />} />
          <Route path="/succes" element={<Succes />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
