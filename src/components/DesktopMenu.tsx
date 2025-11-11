import { FiChevronDown } from "react-icons/fi";
import { RiCompass3Fill } from "react-icons/ri";
import { MdOutlineScience } from "react-icons/md";
import { LiaPeopleCarrySolid } from "react-icons/lia";
import { FaUniversity } from "react-icons/fa";
import { RiGraduationCapFill } from "react-icons/ri";

interface DesktopMenuProps {
  isDropdownOpen: boolean;
  toggleDropdown: () => void;
}

interface DropdownItem {
  label: string;
  icon: React.ReactNode;
  href: string;
}

const campusDropdown: DropdownItem[] = [
  { label: "Tanya Kampus", icon: <FaUniversity />, href: "#" },
  { label: "Tanya Jurusan", icon: <RiGraduationCapFill />, href: "#" },
];

const DesktopMenu: React.FC<DesktopMenuProps> = ({
  isDropdownOpen,
  toggleDropdown,
}) => {
  return (
    <ul className="hidden md:flex items-center space-x-8 font-medium relative">
      <li className="relative">
        <button
          onClick={toggleDropdown}
          className="flex items-center gap-2 cursor-pointer hover:text-gray-200 transition focus:outline-none"
        >
          <RiCompass3Fill size={24}/>
          Informasi Kampus
          <FiChevronDown
            className={`transform transition-transform duration-300 ${
              isDropdownOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        <div
          className={`absolute left-0 mt-2 w-56 bg-white text-neutral rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 origin-top ${
            isDropdownOpen
              ? "opacity-100 scale-y-100"
              : "opacity-0 scale-y-0 pointer-events-none"
          }`}
        >
          {campusDropdown.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="flex items-center gap-2 px-4 py-3 hover:bg-gray-100 transition"
            >
              {item.icon}
              {item.label}
            </a>
          ))}
        </div>
      </li>

      <li>
        <a
          href="/minat-bakat"
          className="flex items-center gap-2 hover:text-gray-200 transition"
        >
          <MdOutlineScience size={24} />
          Tanya Minat Bakat
        </a>
      </li>
      <li>
        <a
          href="/konsultasi"
          className="flex items-center gap-2 hover:text-gray-200 transition"
        >
          <LiaPeopleCarrySolid size={24} />
          Konsultasi
        </a>
      </li>
      <li>
        <a href="/about" className="hover:text-gray-200 transition">
          Tentang
        </a>
      </li>
    </ul>
  );
};

export default DesktopMenu;
