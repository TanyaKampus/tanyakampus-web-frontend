import { Link } from "react-router-dom";
import LuluLogo from "@/assets/images/LuluBodas.png";

const LogoItem = () => {
  return (
    <Link to="/" className="flex gap-2 items-center">
      <img src={LuluLogo} className="h-[40px] w-[40px]" />
      <h1 className="text-xl font-bold">TanyaKampus</h1>
    </Link>
  );
};

export default LogoItem;
