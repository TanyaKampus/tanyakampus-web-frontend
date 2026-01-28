/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Major } from "@/data/categorytest";
import { startQuizService } from "@/services/quiz.service";

interface TestCardProps {
  test: Major;
}

interface TestCardProps {
  test: Major;
  // to: string;
  quiz_id: string
}

const TestCard: React.FC<TestCardProps> = ({ test, quiz_id }) => {
  const navigate = useNavigate();
  const [starting, setStarting] = useState(false);
  const [error, setError] = useState("");

  const isFree = test.category === "Gratis!";
  const categoryBadgeClass = isFree
    ? "bg-[#A81B1B] text-white"
    : "bg-[#CBB74E] text-white";

  const handleCardClick = async () => {
    if (starting) return;

    try {
      setStarting(true);
      setError("");

      const res = await startQuizService(quiz_id);
      if (!res?.success) throw new Error(res?.message || "Gagal start quiz");

      const riwayat_id = res?.data?.riwayat_id;
      if (!riwayat_id) throw new Error("history_id tidak ditemukan dari response /start");

      navigate(`/category-test/${quiz_id}/test/${riwayat_id}`);
    } catch (e: any) {
      setError(e?.message || "Terjadi kesalahan");
    } finally {
      setStarting(false);
    }
  };

  return (
    <div className="w-[400px]">
      <div
        className={`rounded-xl shadow-md bg-white overflow-hidden cursor-pointer hover:shadow-lg transition ${
          starting ? "opacity-70 pointer-events-none" : ""
        }`}
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

          <div
            className={`absolute top-9 left-6 px-4 py-2 text-base font-semibold rounded-xl ${categoryBadgeClass}`}
          >
            {starting ? "Memulai..." : test.category}
          </div>
        </div>

        <div className="px-5 py-2">
          <h2 className="text-2xl font-bold text-[#383838] mb-2">{test.name}</h2>
          <p className="text-[#A8A8A8] text-base leading-relaxed">
            {test.description}
          </p>
        </div>
      </div>

      {!!error && (
        <p className="mt-2 text-sm text-red-600 text-center">{error}</p>
      )}
    </div>
  );
};

export default TestCard;