import { useState } from "react";
import { useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import Button from "./Button";
import LogoItem from "./LogoItem";
import LoginModal from "./LoginModal";

const Navbar = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navClass = isHomePage
    ? "absolute top-0 left-0 w-full z-20 bg-transparent text-tertiary-100"
    : "relative w-full z-20 bg-cyan-700 text-tertiary-100 shadow-md";

  return (
    <>
      <nav className={`${navClass} transition-all`}>
        <div className="container mx-auto px-6 md:px-16 py-4 flex justify-between items-center">
          <LogoItem />

          <button
            className="md:hidden text-2xl focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>

          <ul className="hidden md:flex items-center space-x-8 font-medium">
            <li><a href="/" className="hover:text-gray-200 transition">Home</a></li>
            <li><a href="/about" className="hover:text-gray-200 transition">Lorem</a></li>
            <li><a href="#" className="hover:text-gray-200 transition">Lorem</a></li>
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

        <div
          className={`md:hidden bg-primary-300 text-tertiary-100 shadow-lg px-6 pb-4 space-y-4 overflow-hidden transition-all duration-500 ease-in-out
            ${isMenuOpen ? "max-h-[500px] opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-3"}
          `}
        >
          <ul className="flex flex-col space-y-4 font-medium pt-4">
            <li><a href="/" onClick={() => setIsMenuOpen(false)}>Home</a></li>
            <li><a href="/about" onClick={() => setIsMenuOpen(false)}>Lorem</a></li>
            <li><a href="#" onClick={() => setIsMenuOpen(false)}>Lorem</a></li>
          </ul>

          <div className="flex flex-col space-y-3 pt-4">
            <Button label="Daftar" variant="solid-light" />
            <Button
              label="Masuk"
              variant="outline"
              onClick={() => {
                setIsMenuOpen(false);
                setIsLoginOpen(true);
              }}
            />
          </div>
        </div>
      </nav>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
};

export default Navbar;
