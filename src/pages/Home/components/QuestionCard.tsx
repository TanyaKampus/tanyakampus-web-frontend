import React from "react";

interface Props {
  question: string;
}

const QuestionCard: React.FC<Props> = ({ question }) => {
  return (
    <div className="">
      <p className="text-2xl md:text-3xl font-bold text-[#383838] leading-relaxed">
        {question}
      </p>

      <p className="mt-8 text-gray-400">
        Tidak ada jawaban salah. Jawablah jujur agar hasilnya tepat.
      </p>
    </div>
  );
};

export default QuestionCard;
