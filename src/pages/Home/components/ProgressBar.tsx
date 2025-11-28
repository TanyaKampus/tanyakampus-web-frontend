import React, { useEffect, useState } from "react";
import LuluTest from "@/assets/images/LuluTest.png"; // ganti path sesuai file kamu

interface Props {
  total: number;
  trigger: number; 
}

const ProgressBar: React.FC<Props> = ({ total, trigger }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (trigger > 0 && current < total) {
      setCurrent((prev) => prev + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);

  const percentage = (current / total) * 100;

  return (
    <div className="relative w-full h-6"> {/* container relative untuk positioning gambar */}
      {/* Progress bar */}
      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#069494] transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Gambar LuluTest */}
      <img
        src={LuluTest}
        alt="LuluTest"
        className="absolute top-0 -translate-y-1/2 transition-all duration-300"
        style={{ left: `calc(${percentage}% - 12px)` }} // -12px untuk menyesuaikan tengah gambar
      />
    </div>
  );
};

export default ProgressBar;
