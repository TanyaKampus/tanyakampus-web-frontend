/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from "react";
import HeroSection from "./HeroSection";
import TestCard from "../Home/components/TestCard";
import Vectorkr from "@/assets/images/Vector1.png";
import Vectorkn from "@/assets/images/Vector2.png";

import { getActiveQuizService } from "@/services/quiz.service";
import type { ActiveQuizDTO } from "@/utils/interface";

import QuizImg from "@/assets/images/ArusMinat.png";

type TestCardModel = {
  name: string;
  description: string;
  category: string;
  image: string;
};

type CardItem = {
  quiz_id: string;
  model: TestCardModel;
};


const CategoryTest = () => {
  const [quiz, setQuiz] = useState<ActiveQuizDTO | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchActiveQuiz = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await getActiveQuizService();
        if (!res?.success || !res?.data) {
          throw new Error(res?.message || "Gagal ambil quiz aktif");
        }

        setQuiz(res.data);
      } catch (e: any) {
        setQuiz(null);
        setError(e?.message || "Terjadi kesalahan");
      } finally {
        setLoading(false);
      }
    };

    fetchActiveQuiz();
  }, []);

const cards: CardItem[] = useMemo(() => {
  if (!quiz) return [];

  return [
    {
      quiz_id: quiz.quiz_id,
      model: {
        name: quiz.nama_quiz,
        description: quiz.deskripsi_quiz,
        category: "Gratis!",
        image: QuizImg,
      },
    },
  ];
}, [quiz]);

  return (
    <section className="relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <img
          src={Vectorkr}
          alt="Vector Kiri"
          className="absolute left-0 bottom-0 w-auto h-auto z-10 transform translate-y-1/2 -translate-x-1/4"
        />

        <img
          src={Vectorkn}
          alt="Vector Kanan"
          className="absolute right-0 top-1/2 w-auto h-auto z-10 transform -translate-y-1/2 translate-x-1/4"
        />
      </div>

      <HeroSection />

      <div className="relative z-20 mt-10">
        {loading && (
          <div className="text-center text-gray-500">Loading quiz...</div>
        )}

        {!loading && error && (
          <div className="text-center text-red-600">{error}</div>
        )}

        {!loading && !error && cards.length === 0 && (
          <div className="text-center text-gray-500">
            Belum ada quiz yang aktif.
          </div>
        )}

        {!loading && !error && cards.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
            {cards.map((item) => (
              <TestCard key={item.quiz_id} test={item.model} quiz_id={item.quiz_id} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CategoryTest;
