import React from "react";

interface Props {
  onYes: () => void;
  onNo: () => void;
}

const TestButtons: React.FC<Props> = ({ onYes, onNo }) => {
  return (
    <div className="flex justify-center gap-6 mt-8">
      <button
        onClick={onNo}
        className="bg-[#C44F2C] text-white px-13 py-3 rounded-lg text-lg font-semibold"
      >
        Tidak
      </button>

      <button
        onClick={onYes}
        className="bg-[#069494] text-white px-15 py-3 rounded-lg text-lg font-semibold"
      >
        Ya
      </button>
    </div>
  );
};

export default TestButtons;
