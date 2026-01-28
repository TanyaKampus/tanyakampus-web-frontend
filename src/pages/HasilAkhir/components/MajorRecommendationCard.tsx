import React from "react";
import type { MajorCardUI } from "@/utils/interface";
import { useNavigate } from "react-router-dom";

interface MajorCardProps {
  major: MajorCardUI;
}

const MajorRecommendationCard: React.FC<MajorCardProps> = ({ major }) => {
  const navigate = useNavigate();
  if (!major.isRecommended) return null;

  return (
    <div onClick={() => navigate(`/tanya-jurusan/${major.id}`)}>
      <button
        className="w-full py-2 px-4 text-base cursor-pointer font-medium rounded-lg border border-[#C44F2C] text-[#C44F2C] shadow-sm transition hover:bg-[#C44F2C] hover:text-white"
        aria-label={`Lihat Jurusan ${major.nama}`}
        type="button"
      >
        {major.nama}
      </button>
    </div>
  );
};

export default MajorRecommendationCard;
