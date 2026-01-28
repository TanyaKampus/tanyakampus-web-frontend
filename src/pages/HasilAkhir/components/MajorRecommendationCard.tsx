import React from "react";
import type { MajorCardUI } from "@/utils/interface";

interface MajorCardProps {
  major: MajorCardUI;
}

const MajorRecommendationCard: React.FC<MajorCardProps> = ({ major }) => {
  if (!major.isRecommended) return null;

  return (
    <button
      className="w-full py-2 px-4 text-base font-medium rounded-lg border border-[#C44F2C] text-[#C44F2C] shadow-sm transition hover:bg-[#C44F2C] hover:text-white"
      onClick={() => console.log(`Lihat detail jurusan: ${major.nama}`)}
      aria-label={`Lihat Jurusan ${major.nama}`}
      type="button"
    >
      {major.nama}
    </button>
  );
};

export default MajorRecommendationCard;
