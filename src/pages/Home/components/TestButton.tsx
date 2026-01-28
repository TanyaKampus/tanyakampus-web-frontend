import React from "react";

interface Props {
  onPick: (pick: "YA" | "TIDAK") => void;
}

const TestButtons: React.FC<Props> = ({ onPick }) => {
  return (
    <div className="flex justify-center gap-6 mt-8">
      <button
        onClick={() => onPick("TIDAK")}
        className="bg-[#C44F2C] cursor-pointer text-white px-13 py-3 rounded-lg text-lg font-semibold"
      >
        Tidak
      </button>

      <button
        onClick={() => onPick("YA")}
        className="bg-[#069494] cursor-pointer text-white px-15 py-3 rounded-lg text-lg font-semibold"
      >
        Ya
      </button>
    </div>
  );
};

export default TestButtons;
