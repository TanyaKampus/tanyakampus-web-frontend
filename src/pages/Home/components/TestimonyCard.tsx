import React from "react";
import { RiDoubleQuotesL, RiDoubleQuotesR } from "react-icons/ri";
import Hiasan from "@/assets/images/Hiasan.png";
import type { TestimonyCardProps } from "@/utils/interface";

const TestimonyCard: React.FC<TestimonyCardProps> = ({
  name,
  school,
  text,
  avatar: Avatar,
  position,
}) => {
  const positionClass =
    position === "center"
      ? "top-1/2 -translate-y-1/2 right-0 z-10 opacity-100 scale-100"
      : position === "top"
      ? "top-1/2 -translate-y-[160%] -right-50 z-0 opacity-40 scale-90 blur-[2px]"
      : position === "bottom"
      ? "top-1/2 translate-y-[70%] -right-50 z-0 opacity-40 scale-90 blur-xs"
      : "opacity-0 pointer-events-none";

  const borderClass =
    position === "center"
      ? "border-l-8 border-primary-300"
      : "border-l-8 border-slate-500";

  const iconClass =
    position === "center" ? "text-primary-300" : "text-slate-500";

  return (
    <div
      className={`absolute w-[700px] transition-all p-4 duration-500 ease-in-out ${positionClass}`}
    >
      <div className="relative">
        <RiDoubleQuotesL
          className={`absolute -top-10 -left-4 ${iconClass} text-7xl z-20`}
        />

        <div
          className={`bg-transparent rounded-2xl p-4 relative z-10 overflow-visible ${borderClass}`}
        >
          <div className="flex items-start gap-4 mb-6 mt-2">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-200 to-primary-300 rounded-full flex items-center justify-center text-3xl shadow-lg">
              <Avatar />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-neutral">{name}</h3>
              <p className="text-sm text-neutral">{school}</p>
            </div>
          </div>

          <p className="text-neutral mb-6">{text}</p>

          <img src={Hiasan} className="w-[140px] h-[26px]" />
        </div>

        <RiDoubleQuotesR
          className={`absolute -bottom-6 -right-6 ${iconClass} text-7xl z-10`}
        />
      </div>
    </div>
  );
};

export default TestimonyCard;
