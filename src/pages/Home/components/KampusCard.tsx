// src/components/KampusCard.tsx (MODIFIED)

import React from "react";
import type { Major } from "@/data/dataKampus"; 

interface KampusCardProps {
  Kampus: Major; 
}

const KampusCard: React.FC<KampusCardProps> = ({ Kampus }) => (
  <div className="relative w-[350px] h-[350px] rounded-xl overflow-hidden shadow-md hover:shadow-lg transition">
    
    {/* Gambar Kampus */}
    <img
      src={Kampus.image}
      alt={Kampus.name}
      className="w-full h-full object-cover"
    />
    
    <div 
      className="absolute inset-0 bg-gradient-to-t" 
      style={{ 
  
        backgroundImage: `linear-gradient(to top, rgba(116, 208, 208, 0.8), transparent)` 
      }}
    ></div>
    
    {/* Kategori/Status (Swasta/Negeri) di kanan atas */}
    <div className="absolute bg-white text-secondary-500 top-3 right-3 px-3 py-1 text-sm font-semibold rounded-lg z-10">
      {Kampus.category}
    </div>
    
    {/* Overlay Gradient dan Konten Bawah */}
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-3 text-left z-10">
      
      <div className="flex items-center gap-3">
        
        {/* Logo Kampus */}
        <img 
          src={Kampus.logo} 
          alt={`${Kampus.name} Logo`} 
          className="w-14 h-14 object-contain p-1" 
        /> 
        
        {/* Nama Kampus */}
        <p className="text-white font-semibold text-lg max-w-[250px]">
          {Kampus.name}
        </p>

      </div>
      
    </div>
  </div>
);

export default KampusCard;