// src/pages/HasilAkhir/components/TestResultCard.tsx

import React from 'react';

interface TestResultCardProps {
  facultyName: string;
  description: string[];
}

const TestResultCard: React.FC<TestResultCardProps> = ({ facultyName, description }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
      {/* Faculty Name di tengah dan warna #C44F2C */}
      <h2 className="text-2xl font-extrabold text-center text-[#C44F2C] mb-4">
        {facultyName}
      </h2>
      
      {/* Gambar placeholder */}
      <div className="w-full h-80 bg-gray-200 rounded-lg mb-6"></div>

      <div className="space-y-4 text-gray-600">
        {description.map((paragraph, index) => (
          <p key={index} className="leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
};

export default TestResultCard;
