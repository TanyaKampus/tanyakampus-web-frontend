import React from "react";
import { useNavigate } from "react-router-dom";
import type { Major } from "@/data/categorytest";

interface TestCardProps {
  test: Major;
}

const TestCard: React.FC<TestCardProps> = ({ test }) => {
  const navigate = useNavigate();
  
  const isFree = test.category === "Gratis!";
  const categoryBadgeClass = isFree
    // Gratis!
    ? "bg-[#A81B1B] text-white"    
    // Best Value!
    : "bg-[#CBB74E] text-white"; 
    
  
  const handleCardClick = () => {
    navigate("/category-test/cekarus-minat"); 
  };
    
  
  return (
    <div 
      className="w-[400px] rounded-xl shadow-md bg-white overflow-hidden mb-50 cursor-pointer hover:shadow-lg transition"
      onClick={handleCardClick}
    >
      <div className="relative bg-white p-4 pt-5">
        <div className="h-[220px] flex items-center justify-center">
          <img
            src={test.image}
            alt={test.name}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Badge Kategori */}
        <div 
          className={`absolute top-9 left-6 px-4 py-2 text-base font-semibold rounded-xl ${categoryBadgeClass}`}
        >
          {test.category}
        </div>
      </div>

      <div className="px-5 py-2">
        <h2 className="text-2xl font-bold text-[#383838] mb-2">{test.name}</h2>
        <p className="text-[#A8A8A8] text-base leading-relaxed">
          {test.description}
        </p>
      </div>
    </div>
  );
};

export default TestCard;