import React, { useMemo } from "react";

interface TestResultCardProps {
  facultyName?: string;
  description?: string[];
}

const TestResultCard: React.FC<TestResultCardProps> = ({
  facultyName = "Hasil Tes",
  description = [],
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

      <div className="w-full h-80 bg-gray-200 rounded-lg mb-6" />

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
