/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ProgressBar from "@/pages/Home/components/ProgressBar";
import QuestionCard from "@/pages/Home/components/QuestionCard";
import TestButtons from "@/pages/Home/components/TestButton";

import {
  getQuestionsByTypeService,
  submitAnswerService,
  getResultService,
  isTieFromFieldResults,
  calculateQuizService,
  completeQuizV2Service,
  abandonQuizService
} from "@/services/quiz.service";

import type { QuestionDTO } from "@/utils/interface";

type Phase = "BIDANG" | "TIE_BREAKER";

const Test = () => {
  const navigate = useNavigate();
  const params = useParams<{ quiz_id: string; riwayat_id: string }>();

  const quiz_id = params.quiz_id ?? "";
  const riwayat_id = params.riwayat_id ?? "";

  const [phase, setPhase] = useState<Phase>("BIDANG");
  const [questions, setQuestions] = useState<QuestionDTO[]>([]);
  const [index, setIndex] = useState(0);
  const [trigger, setTrigger] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const total = questions.length;
  const current = questions[index];
  const questionText = useMemo(() => current?.soal ?? "", [current]);

  const sortByUrutan = (arr: QuestionDTO[]) =>
    [...arr].sort((a, b) => (a.urutan ?? 0) - (b.urutan ?? 0));

  const loadQuestions = async (tipe: Phase) => {
    if (!quiz_id) {
      setError("quiz_id kosong di URL.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await getQuestionsByTypeService(quiz_id, tipe);
      if (!res?.success) throw new Error(res?.message || "Gagal ambil pertanyaan");

      const filtered = (res.data || []).filter((q) => q.tipe === tipe);
      setQuestions(sortByUrutan(filtered));
      setIndex(0);
      setTrigger(0);
    } catch (e: any) {
      setQuestions([]);
      setError(e?.message || "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadQuestions("BIDANG");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quiz_id]);

  const handleExit = async () => {
  if (!riwayat_id) {
    setError("riwayat_id kosong di URL.");
    return;
  }

  // optional: konfirmasi biar gak kepencet
  const ok = window.confirm("Keluar dari tes? Progres akan disimpan sebagai dibatalkan.");
  if (!ok) return;

  try {
    setLoading(true);
    setError("");

    const res = await abandonQuizService(riwayat_id);
    if (!res?.success) throw new Error(res?.message || "Gagal keluar/pause quiz");

    // ✅ setelah sukses abandon, arahkan kemana aja yang kamu mau
    // contoh: balik ke halaman kategori test
    navigate("/category-test");
    // atau: navigate(-1);
  } catch (e: any) {
    setError(e?.response?.data?.message || e?.message || "Terjadi kesalahan saat keluar");
  } finally {
    setLoading(false);
  }
};


  const findJawabanId = (q: QuestionDTO, pick: "YA" | "TIDAK") => {
    const found = q.jawaban?.find((j) => j.tipe_jawaban === pick);
    return found?.jawaban_id ?? "";
  };

  const goNext = () => setIndex((prev) => prev + 1);

  const finalizeAndGoResult = async () => {
    // 1) calculate
    const calc = await calculateQuizService(riwayat_id);
    if (!calc?.success) throw new Error(calc?.message || "Calculate gagal");

    // 2) complete
    const comp = await completeQuizV2Service(riwayat_id);
    if (!comp?.success) throw new Error(comp?.message || "Complete quiz gagal");

    // 3) go result
    navigate(`/category-test/${quiz_id}/result/${riwayat_id}`, {
      state: { phaseFinished: phase },
    });
  };

  const handlePick = async (pick: "YA" | "TIDAK") => {
    if (!current) return;

    const pertanyaan_id = current.pertanyaan_id;
    const jawaban_id = findJawabanId(current, pick);

    if (!riwayat_id) {
      setError("riwayat_id kosong di URL (dibutuhkan buat submit jawaban).");
      return;
    }
    if (!jawaban_id) {
      setError("jawaban_id tidak ketemu untuk pilihan ini.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // 1) submit jawaban
      const submitRes = await submitAnswerService(riwayat_id, { pertanyaan_id, jawaban_id });
      if (!submitRes?.success) throw new Error(submitRes?.message || "Submit jawaban gagal");

      // 2) progress
      setTrigger((prev) => Math.min(prev + 1, Math.max(total, 1)));

      const isLast = index === total - 1;
      if (!isLast) {
        goNext();
        return;
      }

      // ===== selesai 1 phase =====
      if (phase === "BIDANG") {
        // Cek tie dulu dari results (kalau backend sudah bisa hitung winner pada tahap ini)
        const r = await getResultService(riwayat_id);
        if (!r?.success) throw new Error(r?.message || "Gagal ambil results");

        const { isTie } = isTieFromFieldResults(r.data?.field_results || []);
        if (isTie) {
          setPhase("TIE_BREAKER");
          await loadQuestions("TIE_BREAKER");
          return;
        }

        // Tidak tie → finalize (calculate + complete) → hasil
        await finalizeAndGoResult();
        return;
      }

      // phase TIE_BREAKER selesai → finalize (calculate + complete) → hasil
      await finalizeAndGoResult();
    } catch (e: any) {
      setError(e?.message || "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white min-h-screen pt-24 px-4 md:px-8 relative">
      <div className="absolute top-20 left-[71rem] right-6 md:right-16 z-20">
        <button
          onClick={handleExit}
          className="bg-[#CF1F1F] cursor-pointer text-white px-6 py-2 rounded-lg text-lg font-semibold"
        >
          Keluar
        </button>
      </div>

      <div className="max-w-5xl mx-auto mt-10 w-full bg-white rounded-2xl shadow-lg p-10 md:p-16 text-center min-h-[400px] flex flex-col justify-between">
        {loading && <div className="text-gray-500 text-center mb-4">Memuat...</div>}
        {!!error && <div className="text-red-600 text-center mb-4">{error}</div>}

        <div className="text-sm text-gray-400 mb-4">
          Tipe Pertanyaan: <span className="font-semibold">{phase}</span>
        </div>

        <ProgressBar trigger={trigger} total={Math.max(total, 1)} />

        <div className="mt-10 flex-1 flex items-center justify-center">
          <QuestionCard question={questionText || "Pertanyaan tidak tersedia"} />
        </div>

        <div className="mt-6">
          <TestButtons onPick={handlePick} />
        </div>
      </div>
    </section>
  );
};

export default Test;
