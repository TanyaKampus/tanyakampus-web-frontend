import { Outlet } from "react-router-dom";
import SidebarProfile from "./SidebarProfile";
import ProfileVector from "@/assets/images/ProfileVector.png";
import BreadCrumbs from "@/components/BreadCrumbs";

const ProfileLayout = () => {
  return (
    <div className="relative min-h-screen bg-gray-50 p-10">
      
      <div className="mb-6 ml-24">
        <BreadCrumbs />
      </div>

      <img
        src={ProfileVector}
        alt="Profile Vector"
        className="absolute -top-10 right-0 w-64 pointer-events-none select-none"
      />

      <div className="flex gap-20 justify-center">
        <SidebarProfile />

        <div className="flex-1 max-w-4xl bg-white shadow-sm rounded-lg p-20 relative z-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
