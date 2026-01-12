import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import Button from "./Button";
import LogoItem from "./LogoItem";
import LoginModal from "./LoginModal";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";

const Navbar = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const navigate = useNavigate();

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleLoginButton = () => {
    navigate("/login");
  };

  const handleDaftarButton = () => {
    navigate("/daftar");
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navClass = `
    fixed top-0 left-0 w-full z-50 transition-all duration-500
    ${isHomePage
      ? isScrolled
        ? "bg-gradient-to-r from-primary-200 via-primary-200 to-primary-100 text-white shadow-xs"
        : "text-white"
      : "bg-gradient-to-r from-primary-200 via-primary-200 to-primary-100 text-white"}
  `;

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <>
      <nav className={navClass}>
        <div className="container mx-auto px-6 md:px-16 py-4 flex justify-between items-center">
          <LogoItem />

          <button
            className="md:hidden text-2xl focus:outline-none"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>

          <DesktopMenu
            isDropdownOpen={isDropdownOpen}
            toggleDropdown={toggleDropdown}
          />

          <div className="hidden md:flex items-center space-x-4">
            <Button
              label="Daftar"
              variant="solid-light"
              onClick={handleDaftarButton}
            />
            <Button
              label="Masuk"
              variant="outline"
              onClick={handleLoginButton}
            />
          </div>
        </div>

        <MobileMenu
          isMenuOpen={isMenuOpen}
          isDropdownOpen={isDropdownOpen}
          toggleDropdown={toggleDropdown}
          onLoginClick={() => {
            setIsMenuOpen(false);
            setIsLoginOpen(true);
          }}
        />
      </nav>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
};

export default Navbar;
