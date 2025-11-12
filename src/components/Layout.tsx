import { Outlet, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "./Footer";

const Layout = () => {
  const location = useLocation();

  const hideLayoutPaths = ["/login", "/daftar", "/identitas", "/succes"];

  const shouldHideLayout = hideLayoutPaths.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      {!shouldHideLayout && <Navbar />}
      <main className={`flex-grow ${!shouldHideLayout ? "pt-20" : ""}`}>
        <Outlet />
      </main>
      {!shouldHideLayout && <Footer />}
    </div>
  );
};

export default Layout;
