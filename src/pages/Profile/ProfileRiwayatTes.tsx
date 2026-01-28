/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import RiwayatTesCard from "@/components/RiwayatTesCard";
import { getMyQuizHistoryService } from "@/services/quiz.service";
import type { QuizHistoryMeItemDTO } from "@/utils/interface";

const formatDate = (iso?: string | null) => {
  if (!iso) return "-";
  const d = new Date(iso);
  return d.toLocaleString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const ProfileRiwayatTes = () => {
  const navigate = useNavigate();

  const [items, setItems] = useState<QuizHistoryMeItemDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await getMyQuizHistoryService();

        if (!res?.success) {
          setError(res?.message || "Gagal mengambil riwayat tes.");
          setItems([]);
          return;
        }

        setItems(Array.isArray(res.data) ? res.data : []);
      } catch (e: any) {
        setError(e?.response?.data?.message || e?.message || "Terjadi kesalahan.");
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const uiItems = useMemo(() => {
    return items.map((it) => {
      const date = formatDate(it.tanggal_selesai ?? it.tanggal_mulai);

      const majors: string[] =
        it.status_quiz === "COMPLETED"
          ? [
              it.quiz?.nama_quiz ?? "Quiz",
              it.bidang_terpilih ? "Bidang terpilih tersedia" : "Bidang terpilih belum tersedia",
            ]
          : [
              it.quiz?.nama_quiz ?? "Quiz",
              it.status_quiz === "IN_PROGRESS" ? "Sedang dikerjakan" : "Dibatalkan",
            ];

      return {
        riwayat_id: it.riwayat_id,
        status: it.status_quiz,
        date,
        majors,
        waitingCount: 0,
        quiz_id: it.quiz_id
      };
    });
  }, [items]);

  return (
    <div>
      <h1 className="text-3xl text-neutral font-bold">Riwayat Tes</h1>
      <p className="mt-2 text-[#BDBDBD] text-lg">
        Simpan hasil tes untuk perbandingan akurat dan analisis perkembangan tesmu
      </p>

      <div className="my-6 bg-[#D9D9D9] w-full h-0.5"></div>

      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-gray-500">Memuat riwayat...</div>
      ) : uiItems.length === 0 ? (
        <div className="text-gray-500">Belum ada riwayat tes.</div>
      ) : (
        <div className="flex flex-col gap-6">
          {uiItems.map((item) => (
            <RiwayatTesCard
              key={item.riwayat_id}
              date={item.date}
              majors={item.majors}
              waitingCount={item.waitingCount}
              status={item.status}
              onView={() => navigate(`/${item.quiz_id}/result/${item.riwayat_id}`)}
              onDownload={() => console.log("download:", item.riwayat_id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfileRiwayatTes;
