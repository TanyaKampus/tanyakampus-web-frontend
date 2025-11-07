import LogoItem from "./LogoItem";
import Kapal from "@/assets/images/Kapal.png";
import { RiInstagramFill, RiLinkedinBoxFill, RiWhatsappFill } from "react-icons/ri";

const Footer = () => {
  return (
    <div className="relative w-full">
      <img
        src={Kapal}
        alt="Kapal"
        className="absolute -top-20 right-0 w-[260px] pointer-events-none"
      />

      <footer className="w-full py-6 px-8 bg-gradient-to-tr from-primary-300 to-primary-100 flex items-center justify-between text-neutral-white text-sm">
        <LogoItem />

        <div className="flex flex-col items-center">
          <div className="flex gap-4 mb-2 text-xl">
            <a href="#" className="hover:text-gray-200 transition-colors">
              <RiInstagramFill />
            </a>
            <a href="#" className="hover:text-gray-200 transition-colors">
              <RiLinkedinBoxFill />
            </a>
            <a href="#" className="hover:text-gray-200 transition-colors">
              <RiWhatsappFill />
            </a>
          </div>

          <p className="font-semibold">© 2025 TanyaKampus</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
