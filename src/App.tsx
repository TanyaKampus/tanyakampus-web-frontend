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
import CategoryTest from "./pages/CategoryTest/CategoryTest";
import CekarusMinat from "./pages/CategoryTest/CekarusMinat";

import ProfileLayout from "./pages/Profile/components/ProfileLayout";
import ProfileRiwayatTes from "./pages/Profile/ProfileRiwayatTes";
import ProfileFavoritJurusan from "./pages/Profile/ProfileFavoritJurusan";
import ProfileFavoritKampus from "./pages/Profile/ProfileFavoritKampus";
import ProfileFavoritMentor from "./pages/Profile/ProfileFavoritMentor";
import ProfileIndex from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />

          <Route path="category-test">
            <Route index element={<CategoryTest />} />
            <Route path="cek-arus-minat" element={<CekarusMinat />} />
          </Route>

          <Route path="tanya-kampus">
            <Route index element={<TanyaKampus />} />
            <Route path=":id" element={<DetailKampus />} />
          </Route>

          <Route path="tanya-jurusan" element={<TanyaJurusan />} />

          {/* START OF AUTHENTICATOR */}
          <Route path="login" element={<Login />} />
          <Route path="daftar" element={<Daftar />} />
          <Route path="identitas" element={<Identitas />} />
          <Route path="succes" element={<Succes />} />
          {/* END OF AUTHENTICATOR */}

          {/* START OF PROFILE */}
          <Route path="profile" element={<ProfileLayout />}>
            <Route index element={<ProfileIndex />} />
            <Route path="favorite/jurusan" element={<ProfileFavoritJurusan />} />
            <Route path="favorite/kampus" element={<ProfileFavoritKampus />} />
            <Route path="favorite/mentor" element={<ProfileFavoritMentor />} />
            <Route path="riwayat-tes" element={<ProfileRiwayatTes />} />
          </Route>
          {/* END OF PROFILE */}

        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
