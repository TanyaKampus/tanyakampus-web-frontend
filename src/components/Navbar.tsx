import { useState } from "react";
import { useLocation } from "react-router-dom";
import Button from "./Button";
import LogoItem from "./LogoItem";
import LoginModal from "./LoginModal";

const Navbar = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const navClass = isHomePage
    ? "absolute top-0 left-0 w-full z-20 bg-transparent text-tertiary-100"
    : "relative w-full z-20 bg-cyan-700 text-tertiary-100 shadow-md";

  return (
    <>
      <nav className={navClass}>
        <div className="container mx-auto px-16 py-4 flex justify-between items-center">
          <LogoItem />

          <ul className="hidden md:flex items-center space-x-8 font-medium">
            <li><a href="/">Home</a></li>
            <li><a href="/about">Lorem</a></li>
            <li><a href="#">Lorem</a></li>
          </ul>

          <div className="hidden md:flex items-center space-x-4">
            <Button label="Daftar" variant="solid-light" />
            <Button
              label="Masuk"
              variant="outline"
              onClick={() => setIsLoginOpen(true)}
            />
          </div>
        </div>
      </nav>

      {/* Modal Login */}
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
};

export default Navbar;
