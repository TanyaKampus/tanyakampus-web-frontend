import { useState } from "react";
import { useNavigate } from "react-router-dom"; // import useNavigate
import ProgressBar from "@/pages/Home/components/ProgressBar";
import TestCard from "@/pages/Home/components/QuestionCard";
import TestButtons from "@/pages/Home/components/TestButton";
import { minatQuestions } from "@/data/testQuestions";

const Test = () => {
  const [index, setIndex] = useState(0);
  const [trigger, setTrigger] = useState(0); // untuk progress bar
  const navigate = useNavigate(); // hook navigate

  const total = minatQuestions.length;
  const question = minatQuestions[index].question;

  const handleAnswer = () => {
    if (trigger < total) {
      setTrigger((prev) => prev + 1);
    }

    if (index + 1 < total) {
      setIndex((prev) => prev + 1);
    } else {
      console.log("Test selesai!");
    }
  };

  const handleExit = () => {
    navigate(-1); // kembali ke halaman sebelumnya
  };

  return (
    <section className="bg-white min-h-screen pt-24 px-4 md:px-8 relative">

      {/* Tombol Keluar */}
      <div className="absolute top-20 left-[71rem] right-6 md:right-16 z-20">
        <button
          onClick={handleExit}
          className="bg-[#CF1F1F] text-white px-6 py-2 rounded-lg text-lg font-semibold"
        >
          Keluar
        </button>
      </div>

      <div className="max-w-5xl mx-auto mt-10 w-full bg-white rounded-2xl shadow-lg p-10 md:p-16 text-center min-h-[400px] flex flex-col justify-between">
        <ProgressBar trigger={trigger} total={total} />

        <div className="mt-10 flex-1 flex items-center justify-center">
          <TestCard question={question} />
        </div>

        <div className="mt-6">
          <TestButtons onYes={handleAnswer} onNo={handleAnswer} />
        </div>
      </div>
    </section>
  );
};

export default Test;
