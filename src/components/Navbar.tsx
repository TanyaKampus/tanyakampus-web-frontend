import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import Button from "./Button";
import LogoItem from "./LogoItem";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";
import { getMeService } from "@/services/user.service";

interface User {
  id: string;
  email: string;
  role: string;
  profile?: {
    nama: string;
    foto_profil: string;
  };
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
  const [loadingUser, setLoadingUser] = useState(true);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
  const toggleProfileDropdown = () =>
    setIsProfileDropdownOpen((prev) => !prev);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const handleLoginButton = () => navigate("/login");
  const handleDaftarButton = () => navigate("/daftar");

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await getMeService();
        setUser(res.data);
      } catch {
        setUser(null);
      } finally {
        setLoadingUser(false);
      }
    };

    fetchMe();
  }, []);

  const handleLogout = () => {
    setUser(null);
    navigate("/");
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
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
    <nav className={navClass}>
      <div className="container mx-auto px-6 md:px-16 py-4 flex justify-between items-center">
        <LogoItem />

        {/* MOBILE BUTTON */}
        <button
          className="md:hidden text-2xl"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </button>

        <DesktopMenu
          isDropdownOpen={isDropdownOpen}
          toggleDropdown={toggleDropdown}
        />

        {/* DESKTOP RIGHT */}
        <div className="hidden md:flex items-center space-x-4">
          {loadingUser ? null : user ? (
            <div className="relative">
              <div
                onClick={toggleProfileDropdown}
                className="flex items-center gap-3 cursor-pointer"
              >
                {/* AVATAR */}
                <div>
                 <img src={user.profile?.foto_profil} className="w-10 h-10 rounded-full bg-white object-cover" />
                </div>

                {/* DISPLAY NAME */}
                <span className="font-medium text-white">
                  {user.profile?.nama || user.email.split("@")[0]}
                </span>
              </div>

              {/* PROFILE DROPDOWN */}
              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-3 bg-white w-40 rounded-xl shadow-lg overflow-hidden">
                  <button
                    onClick={() => navigate("/profile")}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-black"
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

      {/* MOBILE MENU */}
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
  );
};

export default Navbar;
