import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/Home";
import CampusCategory from "./pages/CampusCategory/CampusCategory";
import Login from "./pages/Login";
import Daftar from "./pages/Register";
import Identitas from "./pages/Register/Identitas";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/rekomendasi-kampus" element={<CampusCategory />} />
          <Route path="/login" element={<Login />} />
          <Route path="/daftar" element={<Daftar />} />
          <Route path="/identitas" element={<Identitas />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

