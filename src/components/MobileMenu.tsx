import { FiChevronDown } from "react-icons/fi";
import { RiCompass3Fill } from "react-icons/ri";
import { MdOutlineScience } from "react-icons/md";
import { LiaPeopleCarrySolid } from "react-icons/lia";
import { FaUniversity } from "react-icons/fa";
import { RiGraduationCapFill } from "react-icons/ri";
import Button from "./Button";

interface MobileMenuProps {
  isMenuOpen: boolean;
  isDropdownOpen: boolean;
  toggleDropdown: () => void;
  onLoginClick: () => void;
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
}) => {
  return (
    <div
      className={`md:hidden bg-primary-300 text-tertiary-100 shadow-lg px-6 pb-4 space-y-4 overflow-hidden transition-all duration-500 ease-in-out ${
        isMenuOpen
          ? "max-h-[600px] opacity-100 translate-y-0"
          : "max-h-0 opacity-0 -translate-y-3"
      }`}
    >
      <ul className="flex flex-col space-y-4 font-medium pt-4">
        <li>
          <button
            onClick={toggleDropdown}
            className="flex items-center justify-between w-full focus:outline-none"
          >
            <span className="flex items-center gap-2">
              <RiCompass3Fill /> Informasi Kampus
            </span>
            <FiChevronDown
              className={`transform transition-transform ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          <div
            className={`flex flex-col mt-2 pl-4 border-l border-white/30 overflow-hidden transition-all duration-300 ease-in-out ${
              isDropdownOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
            }`}
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
          <a href="/minat-bakat" className="flex items-center gap-2">
            <MdOutlineScience /> Tanya Minat Bakat
          </a>
        </li>
        <li>
          <a href="/konsultasi" className="flex items-center gap-2">
            <LiaPeopleCarrySolid /> Konsultasi
          </a>
        </li>
        <li>
          <a href="/about">Tentang</a>
        </li>
      </ul>

      <div className="flex flex-col space-y-3 pt-4">
        <Button label="Daftar" variant="solid-light" />
        <Button label="Masuk" variant="outline" onClick={onLoginClick} />
      </div>
    </div>
  );
};

export default MobileMenu;
