import { Link } from "react-router-dom";
import LuluLogo from "@/assets/images/LuluBodas.png";

const LogoItem = () => {
  return (
    <Link to="/" className="flex gap-2 items-center">
      <img src={LuluLogo} className="h-[69px] w-[72px]" />
      <h1 className="text-2xl font-bold text-tertiary-100">TanyaKampus</h1>
    </Link>
  );
};

export default LogoItem;
