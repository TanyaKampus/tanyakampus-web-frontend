import { Outlet } from "react-router-dom";
import SidebarProfile from "./SidebarProfile";
import ProfileVector from "@/assets/images/ProfileVector.png";

const ProfileLayout = () => {
  return (
    <div className="relative flex min-h-screen bg-gray-50 p-10 gap-20 justify-center">
      
      <img 
        src={ProfileVector} 
        alt="Profile Vector"
        className="absolute -top-10 right-0 w-64 pointer-events-none select-none"
      />

      <SidebarProfile />

      <div className="flex-1 max-w-3xl bg-white shadow-sm rounded-lg p-20 relative z-10">
        <Outlet />
      </div>

    </div>
  );
};

export default ProfileLayout;
