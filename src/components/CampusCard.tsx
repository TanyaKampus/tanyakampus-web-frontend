import React from "react";
import { useNavigate } from "react-router-dom";
import type { CampusCard } from "@/services/campus.service";

interface KampusCardProps {
  kampus: CampusCard;
  className?: string;
}

const KampusCard: React.FC<KampusCardProps> = ({ kampus, className = "" }) => {
  const navigate = useNavigate();
  const handleClick = () => navigate(`/tanya-kampus/${kampus.id}`);

  return (
    <div
      className={`relative w-[350px] ${className} rounded-xl overflow-hidden shadow-md hover:shadow-lg transition cursor-pointer`}
      onClick={handleClick}
    >
      <img src={kampus.image} alt={kampus.name} className="w-full h-full object-cover" />

      <div
        className="absolute inset-0 bg-gradient-to-t"
        style={{
          backgroundImage: `linear-gradient(to top, rgba(116, 208, 208, 0.8), transparent)`,
        }}
      />

      <div className="absolute bg-white text-secondary-500 top-3 right-3 px-3 py-1 text-sm font-semibold rounded-lg z-10">
        {kampus.category}
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-3 text-left z-10">
        <div className="flex items-center gap-3">
          <img
            src={kampus.logo}
            alt={`${kampus.name} Logo`}
            className="w-14 h-14 object-contain p-1"
          />
          <p className="text-white font-semibold text-lg max-w-[250px]">{kampus.name}</p>
        </div>
      </div>
    </div>
  );
};

export default KampusCard;
