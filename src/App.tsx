import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import LoadingScreen from "./components/LoadingScreen";
import Konsultasi from "./pages/Konsultasi";
import Tentang from "./pages/About";

const Layout = lazy(() => import("./components/Layout"));
const HomePage = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Authentication/Login"));
const Daftar = lazy(() => import("./pages/Authentication/Register"));
const Identitas = lazy(() => import("./pages/Authentication/Register/Identitas"));
const Succes = lazy(() => import("./pages/Authentication/Register/Succes"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const TanyaKampus = lazy(() => import("./pages/TanyaKampus/TanyaKampus"));
const DetailKampus = lazy(() => import("./pages/TanyaKampus/DetailKampus"));
const TanyaJurusan = lazy(() => import("./pages/TanyaJurusan/TanyaJurusan"));
const CategoryTest = lazy(() => import("./pages/CategoryTest/CategoryTest"));
const CekarusMinat = lazy(() => import("./pages/CategoryTest/CekarusMinat"));

const ProfileLayout = lazy(() => import("./pages/Profile/components/ProfileLayout"));
const ProfileIndex = lazy(() => import("./pages/Profile"));
const ProfileRiwayatTes = lazy(() => import("./pages/Profile/ProfileRiwayatTes"));
const ProfileFavoritJurusan = lazy(() => import("./pages/Profile/ProfileFavoritJurusan"));
const ProfileFavoritKampus = lazy(() => import("./pages/Profile/ProfileFavoritKampus"));
const ProfileFavoritMentor = lazy(() => import("./pages/Profile/ProfileFavoritMentor"));

const HasilAkhir = lazy(() => import("./pages/HasilAkhir")); 

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>

          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="hasil-akhir" element={<HasilAkhir />} />

            <Route path="tanya-kampus">
              <Route index element={<TanyaKampus />} />
              <Route path=":id" element={<DetailKampus />} />
            </Route>

            <Route path="tanya-jurusan" element={<TanyaJurusan />} />

            <Route path="category-test">
              <Route index element={<CategoryTest />} />
              <Route path="cek-arus-minat" element={<CekarusMinat />} />
            </Route>

            <Route path="konsultasi" element={<Konsultasi />} />

            <Route path="tentang" element={<Tentang />} />

            {/* AUTH */}
            <Route path="login" element={<Login />} />
            <Route path="daftar" element={<Daftar />} />
            <Route path="identitas" element={<Identitas />} />
            <Route path="succes" element={<Succes />} />

            {/* PROFILE */}
            <Route path="profile" element={<ProfileLayout />}>
              <Route index element={<ProfileIndex />} />
              <Route path="favorite/jurusan" element={<ProfileFavoritJurusan />} />
              <Route path="favorite/kampus" element={<ProfileFavoritKampus />} />
              <Route path="favorite/mentor" element={<ProfileFavoritMentor />} />
              <Route path="riwayat-tes" element={<ProfileRiwayatTes />} />
            </Route>

          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
