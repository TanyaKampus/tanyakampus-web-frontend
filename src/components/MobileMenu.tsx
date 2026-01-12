import { FiChevronDown } from "react-icons/fi";
import { RiCompass3Fill } from "react-icons/ri";
import { MdOutlineScience } from "react-icons/md";
import { LiaPeopleCarrySolid } from "react-icons/lia";
import { FaUniversity } from "react-icons/fa";
import { RiGraduationCapFill } from "react-icons/ri";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

interface User {
  id: string;
  email: string;
}

interface MobileMenuProps {
  isMenuOpen: boolean;
  isDropdownOpen: boolean;
  toggleDropdown: () => void;
  onLoginClick: () => void;
  user: User | null;
  onLogout: () => void;
}

interface DropdownItem {
  label: string;
  icon: React.ReactNode;
  href: string;
}

const campusDropdown: DropdownItem[] = [
  { label: "Tanya Kampus", icon: <FaUniversity />, href: "/tanya-kampus" },
  { label: "Tanya Jurusan", icon: <RiGraduationCapFill />, href: "/tanya-jurusan" },
];

const MobileMenu: React.FC<MobileMenuProps> = ({
  isMenuOpen,
  isDropdownOpen,
  toggleDropdown,
  onLoginClick,
  user,
  onLogout,
}) => {
  const navigate = useNavigate();

  return (
    <div
      className={`md:hidden bg-primary-300 text-tertiary-100 shadow-lg px-6 pb-6 overflow-hidden transition-all duration-500 ease-in-out ${
        isMenuOpen
          ? "max-h-[800px] opacity-100 translate-y-0"
          : "max-h-0 opacity-0 -translate-y-3"
      }`}
    >
      {/* MENU */}
      <ul className="flex flex-col space-y-4 font-medium pt-4">
        <li>
          <button
            onClick={toggleDropdown}
            className="flex items-center justify-between w-full"
          >
            <span className="flex items-center gap-2">
              <RiCompass3Fill size={20} />
              Informasi Kampus
            </span>
            <FiChevronDown
              className={`transition-transform ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          <div
            className={`flex flex-col mt-2 pl-4 border-l border-white/30 transition-all duration-300 ${
              isDropdownOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
            } overflow-hidden`}
          >
            {campusDropdown.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center gap-2 py-2"
              >
                {item.icon}
                {item.label}
              </a>
            ))}
          </div>
        </li>

        <li>
          <a href="/category-test" className="flex items-center gap-2">
            <MdOutlineScience size={20} />
            Tanya Minat Bakat
          </a>
        </li>

        <li>
          <a href="/konsultasi" className="flex items-center gap-2">
            <LiaPeopleCarrySolid size={20} />
            Konsultasi
          </a>
        </li>

        <li>
          <a href="/tentang">Tentang</a>
        </li>
      </ul>

      {/* AUTH SECTION */}
      <div className="pt-6 border-t border-white/20 mt-6">
        {user ? (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white text-primary-200 flex items-center justify-center font-bold">
                {user.email.charAt(0).toUpperCase()}
              </div>
              <span className="font-medium">
                {user.email.split("@")[0]}
              </span>
            </div>

            <Button
              label="Profile"
              variant="solid-light"
              onClick={() => navigate("/profile")}
            />

            <Button
              label="Logout"
              variant="outline"
              onClick={onLogout}
            />
          </div>
        ) : (
          <div className="flex flex-col space-y-3">
            <Button label="Daftar" variant="solid-light" />
            <Button label="Masuk" variant="outline" onClick={onLoginClick} />
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileMenu;
