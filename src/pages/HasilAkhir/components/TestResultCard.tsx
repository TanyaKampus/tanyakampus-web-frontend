import React, { useMemo } from "react";

interface TestResultCardProps {
  facultyName?: string;
  description?: string[];
  imageUrl?: string | null; 
}

const TestResultCard: React.FC<TestResultCardProps> = ({
  facultyName = "Hasil Tes",
  description = [],
  imageUrl = null,
}) => {
  const safeDescription = useMemo(
    () => (Array.isArray(description) ? description : []),
    [description]
  );

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-extrabold text-center text-[#C44F2C] mb-4">
        {facultyName}
      </h2>

      <div className="w-full h-80 rounded-lg mb-6 overflow-hidden bg-gray-100">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={facultyName}
            className="w-full h-full object-cover"
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            Foto bidang belum tersedia
          </div>
        )}
      </div>

      <div className="space-y-4 text-gray-600">
        {safeDescription.length === 0 ? (
          <p className="leading-relaxed text-gray-500">
            Deskripsi hasil belum tersedia.
          </p>
        ) : (
          safeDescription.map((paragraph, index) => (
            <p key={index} className="leading-relaxed">
              {paragraph}
            </p>
          ))
        )}
      </div>
    </div>
  );
};

export default TestResultCard;
