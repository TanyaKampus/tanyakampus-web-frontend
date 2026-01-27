import Button from "@/components/Button";
import { useEffect, useState } from "react";
import { FaChevronDown, FaUniversity } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RiGraduationCapFill } from "react-icons/ri";
import { LiaPeopleCarrySolid } from "react-icons/lia";
import { MdPerson, MdHistory } from "react-icons/md";
import { getMeService } from "@/services/user.service";

const SidebarProfile = () => {
  const [isFavoriteOpen, setIsFavoriteOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await getMeService();
        setUser(res.data);
      } catch {
        setUser(null);
      }
    };

    fetchMe();
  }, []);

  const toggleFavorite = () => {
    setIsFavoriteOpen((prev) => !prev);
  };

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch {
      // ignore aja yages
    } finally {
      navigate("/login");
    }
  };

  if (!user) return null;

  const profile = user.profile;

  return (
    <div className="flex flex-col w-72">
      <div className="bg-white shadow-lg min-h-screen p-6 flex flex-col justify-between rounded-lg">
        <div>
          {/* USER INFO */}
          <div className="text-center mt-8 mb-10">
            <img
              src={
                profile?.foto_profil ||
                "https://placehold.co/200x200/png?text=Avatar"
              }
              alt="profile"
              className="w-[168px] h-[168px] rounded-full object-cover mx-auto"
            />
            <h2 className="mt-6 font-semibold text-xl">Halo,</h2>
            <p className="text-neutral text-xl">
              {profile?.nama || user.email}
            </p>
          </div>

          {/* NAV */}
          <nav className="space-y-2">
            <Link
              to="/profile"
              className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg
                ${isActive("/profile")
                  ? "bg-[#F8F8F8] text-primary-300"
                  : "text-neutral hover:bg-[#F8F8F8]"}`}
            >
              <span className="font-medium">Profile</span>
              <MdPerson className="w-6 h-6" />
            </Link>

            {/* FAVORITE */}
            <div>
              <button
                onClick={toggleFavorite}
                className={`w-full flex items-center justify-center px-4 py-3 rounded-lg
                  ${location.pathname.includes("/profile/favorite")
                    ? "bg-[#F8F8F8] text-primary-300"
                    : "text-neutral hover:bg-[#F8F8F8]"}`}
              >
                <span className="font-medium">Favorite</span>
                <FaChevronDown
                  className={`ml-2 w-4 h-4 transition-transform ${
                    isFavoriteOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  isFavoriteOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="mt-1 space-y-4 text-center">

                  <Link
                    to="/profile/favorite/kampus"
                    className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg
                      ${isActive("/profile/favorite/kampus")
                        ? "bg-[#F8F8F8] text-primary-300"
                        : "text-neutral hover:bg-[#F8F8F8]"}`}
                  >
                    <FaUniversity className="w-6 h-6" />
                    Kampus
                  </Link>

                  <Link
                    to="/profile/favorite/jurusan"
                    className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg
                      ${isActive("/profile/favorite/jurusan")
                        ? "bg-[#F8F8F8] text-primary-300"
                        : "text-neutral hover:bg-[#F8F8F8]"}`}
                  >
                    <RiGraduationCapFill className="w-6 h-6" />
                    Jurusan
                  </Link>

                  <Link
                    to="/profile/favorite/mentor"
                    className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg
                      ${isActive("/profile/favorite/mentor")
                        ? "bg-[#F8F8F8] text-primary-300"
                        : "text-neutral hover:bg-[#F8F8F8]"}`}
                  >
                    <LiaPeopleCarrySolid className="w-6 h-6" />
                    Mentor
                  </Link>
                </div>
              </div>
            </div>

            <Link
              to="/profile/riwayat-tes"
              className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg
                ${isActive("/profile/riwayat-tes")
                  ? "bg-[#F8F8F8] text-primary-300"
                  : "text-neutral hover:bg-[#F8F8F8]"}`}
            >
              <span className="font-medium">Riwayat Tes</span>
              <MdHistory className="w-6 h-6" />
            </Link>
          </nav>
        </div>
      </div>

      <Button
        label="Keluar"
        variant="error"
        className="mt-6"
        onClick={handleLogout}
      />
    </div>
  );
};

export default SidebarProfile;
