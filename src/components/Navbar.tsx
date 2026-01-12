import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import Button from "./Button";
import LogoItem from "./LogoItem";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";

interface User {
  id: string;
  email: string;
}

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const handleLoginButton = () => navigate("/login");
  const handleDaftarButton = () => navigate("/daftar");

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
  const toggleProfileDropdown = () => setIsProfileDropdownOpen((prev) => !prev);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navClass = `
    fixed top-0 left-0 w-full z-50 transition-all duration-500
    ${
      isHomePage
        ? isScrolled
          ? "bg-gradient-to-r from-primary-200 via-primary-200 to-primary-100 text-white shadow-xs"
          : "text-white"
        : "bg-gradient-to-r from-primary-200 via-primary-200 to-primary-100 text-white"
    }
  `;

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
            {user ? (
              <div className="relative">
                <div
                  onClick={toggleProfileDropdown}
                  className="flex items-center gap-3 cursor-pointer select-none"
                >
                  <div className="w-9 h-9 rounded-full bg-white text-primary-200 flex items-center justify-center font-bold">
                    {user.email.charAt(0).toUpperCase()}
                  </div>

                  <span className="font-medium text-white">
                    {user.email.split("@")[0]}
                  </span>
                </div>

                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-3 bg-white w-40 rounded-xl shadow-lg overflow-hidden">
                    <button
                      onClick={() => navigate("/profile")}
                      className="w-full text-left text-black px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Profile
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>

        <MobileMenu
          isMenuOpen={isMenuOpen}
          isDropdownOpen={isDropdownOpen}
          toggleDropdown={toggleDropdown}
          onLoginClick={() => {
            setIsMenuOpen(false);
            navigate("/login");
          }}
          user={user}
          onLogout={handleLogout}
        />
      </nav>
    </>
  );
};

export default Navbar;
