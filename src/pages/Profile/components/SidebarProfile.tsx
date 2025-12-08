import Button from "@/components/Button";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { FaUniversity } from "react-icons/fa";
import { RiGraduationCapFill } from "react-icons/ri";
import { LiaPeopleCarrySolid } from "react-icons/lia";
import { MdPerson, MdHistory } from "react-icons/md";

const SidebarProfile = () => {
  const [isFavoriteOpen, setIsFavoriteOpen] = useState(false);
  const location = useLocation();

  const toggleFavorite = () => {
    setIsFavoriteOpen(!isFavoriteOpen);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex flex-col w-72">
      <div className="bg-white shadow-lg min-h-screen p-6 flex flex-col justify-between rounded-lg">
        <div>
          <div className="text-center mt-8 mb-10">
            <img
              src="https://placehold.co/200x200/png?text=Avatar"
              alt="profile"
              className="w-[168px] h-[168px] rounded-full object-cover mx-auto"
            />
            <h2 className="mt-6 font-semibold text-xl">Halo,</h2>
            <p className="text-neutral text-xl">Lionel Marco</p>
          </div>

          <nav className="space-y-2">
            <Link
              to="/profile"
              className={`relative gap-2 flex items-center justify-center px-4 py-3 rounded-lg transition-colors duration-200 
                ${isActive("/profile") ? "bg-[#F8F8F8] text-primary-300" : "text-neutral hover:bg-[#F8F8F8]"}
              `}
            >
              <span className="font-medium">Profile</span>
              <MdPerson className="w-6 h-6" />
            </Link>

            <div className="relative">
              <button
                onClick={toggleFavorite}
                className={`w-full cursor-pointer flex items-center justify-center px-4 py-3 rounded-lg transition-colors duration-200
                  ${location.pathname.includes("/profile/favorite") ? "bg-[#F8F8F8] text-primary-300" : "text-neutral hover:bg-[#F8F8F8]"}
                `}
              >
                <span className="font-medium">Favorite</span>
                <FaChevronDown
                  className={`ml-2 w-4 h-4 transition-transform duration-300 ${
                    isFavoriteOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isFavoriteOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="mt-1 space-y-4 font-medium text-center">

                  <Link
                    to="/profile/favorite/kampus"
                    className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200
                      ${isActive("/profile/favorite/kampus") ? "bg-[#F8F8F8] text-primary-300" : "text-neutral hover:bg-[#F8F8F8]"}
                    `}
                  >
                    <FaUniversity className="w-[24px] h-[24px]" />
                    <span>Kampus</span>
                  </Link>

                  <Link
                    to="/profile/favorite/jurusan"
                    className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200
                      ${isActive("/profile/favorite/jurusan") ? "bg-[#F8F8F8] text-primary-300" : "text-neutral hover:bg-[#F8F8F8]"}
                    `}
                  >
                    <RiGraduationCapFill className="w-[24px] h-[24px]" />
                    <span>Jurusan</span>
                  </Link>

                  <Link
                    to="/profile/favorite/mentor"
                    className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200
                      ${isActive("/profile/favorite/mentor") ? "bg-[#F8F8F8] text-primary-300" : "text-neutral hover:bg-[#F8F8F8]"}
                    `}
                  >
                    <LiaPeopleCarrySolid className="w-[24px] h-[24px]" />
                    <span>Mentor</span>
                  </Link>
                </div>
              </div>
            </div>

            <Link
              to="/profile/riwayat-tes"
              className={`relative flex gap-2 items-center justify-center px-4 py-3 rounded-lg transition-colors duration-200
                ${isActive("/profile/riwayat-tes") ? "bg-[#F8F8F8] text-primary-300" : "text-neutral hover:bg-[#F8F8F8]"}
              `}
            >
              <span className="font-medium">Riwayat Tes</span>
              <MdHistory className="w-6 h-6" />
            </Link>
          </nav>
        </div>
      </div>

      <Button label="Keluar" variant="error" className="mt-6" />
    </div>
  );
};

export default SidebarProfile;
