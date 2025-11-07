import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/Home";
import CampusCategory from "./pages/CampusCategory/CampusCategory";
import Login from "./pages/Login";
import RekomendasiJurusan from "./pages/RekomendasiJurusan/RekomendasiJurusan";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/kategori-kampus" element={<CampusCategory />} />
          <Route path='/kategori-jurusan' element={<RekomendasiJurusan />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

