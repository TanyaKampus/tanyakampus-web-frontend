// src/components/MajorRecommendationCard.tsx

import React from 'react';
import type { MajorRecommendation } from '../../../data/hasilAkhirData'; // Sesuaikan path

interface MajorCardProps {
  major: MajorRecommendation;
}

const MajorRecommendationCard: React.FC<MajorCardProps> = ({ major }) => {
  // Dalam skenario nyata, filter harusnya dilakukan di komponen induk,
  // tapi kita tetap menjaganya di sini untuk keamanan.
  if (!major.isRecommended) return null; 

  // Menggunakan styling yang lebih dekat dengan gambar:
  // - Ukuran font yang lebih besar.
  // - Padding vertikal dan horizontal yang lebih besar.
  // - Tidak menggunakan 'inline-block' agar tombol menempati lebar penuh (diatur oleh flex container).
  return (
    <button
      className="w-full py-2 px-4 text-base font-medium rounded-lg border border-[#C44F2C] text-[#C44F2C] shadow-sm transition"
      onClick={() => console.log(`Lihat detail jurusan: ${major.name}`)}
      aria-label={`Lihat Jurusan ${major.name}`}
    >
      {major.name}
    </button>
  );
};

export default MajorRecommendationCard;