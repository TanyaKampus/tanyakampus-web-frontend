// src/pages/Tentang/components/LuluCard.tsx
import React from "react";
import LuluImage from "@/assets/images/LuluBodas.png";
import { AiFillInstagram, AiFillLinkedin } from "react-icons/ai";
import { RiWhatsappFill } from "react-icons/ri";

const LuluCard: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-bl from-primary-200 to-[#7DD5D5] rounded-tr-4xl rounded-br-2xl rounded-bl-2xl rounded-tl-2xl p-6 text-white h-full min-h-[380px] overflow-hidden">
      <div className="flex gap-4 mb-6 text-3xl text-white z-10 relative">
        <span><AiFillInstagram /></span>
        <span><AiFillLinkedin /></span>
        <span><RiWhatsappFill /></span>
      </div>

      <p className="text-base leading-relaxed mb-6 z-10 relative max-w-[260px]">
        "Setiap perjalanan besar dimulai dari satu pilihan yang berani"
      </p>

      <img
        src={LuluImage}
        alt="Lulu"
        className="absolute bottom-0 right-0 w-[260px] opacity-95 pointer-events-none"
      />

      <div className="absolute bottom-6 left-6 z-10">
        <span className="inline-block px-6 py-2 border border-white rounded-full mb-2">
          “Lulu”
        </span>
        <p className="text-sm font-semibold">Chief Cheerleader</p>
      </div>
    </div>
  );
};

export default LuluCard;
