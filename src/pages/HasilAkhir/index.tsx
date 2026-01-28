/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import TestResultCard from "./components/TestResultCard";
import MajorRecommendationCard from "./components/MajorRecommendationCard";
import CampusRecommendationCard from "./components/CampusRecommendationCard";
import RadarBidangChart from "./components/RadarBidangChart";

import loadingImg from "../../assets/images/loading.png";
import downloadImg from "../../assets/images/download.png";
import vector from "../../assets/images/JurusanVector.png";

import { getResultService } from "@/services/quiz.service";
import type {
  CampusCardUI,
  FieldResultDTO,
  GetResultBackendResponse,
  MajorCardUI,
} from "@/utils/interface";
import ResultPDF from "./components/ResultPDF";
import { PDFDownloadLink } from "@react-pdf/renderer";

// helper kecil biar aman jadi array paragraf
const toParagraphs = (text?: string | null) => {
  if (!text) return [];
  // split by newline, rapihin, buang kosong
  return text
    .split(/\r?\n+/g)
    .map((s) => s.trim())
    .filter(Boolean);
};

const HasilAkhir: React.FC = () => {
  const navigate = useNavigate();
  const { riwayat_id = "" } = useParams<{ riwayat_id: string }>();

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // simpan raw data backend
  const [raw, setRaw] = useState<GetResultBackendResponse["data"] | null>(null);

  useEffect(() => {
    if (!riwayat_id) {
      setError("Riwayat ID tidak ditemukan.");
      setLoading(false);
      return;
    }

    const fetchResult = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await getResultService(riwayat_id);

        if (!res?.success) {
          setError(res?.message || "Gagal mengambil hasil.");
          setRaw(null);
          return;
        }

        setRaw(res.data ?? null);
      } catch (e: any) {
        setError(
          e?.response?.data?.message || e?.message || "Terjadi kesalahan.",
        );
        setRaw(null);
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [riwayat_id]);

  // =========================
  // ✅ Mapping backend -> FieldResultDTO untuk RadarBidangChart
  // =========================
  const fieldResults: FieldResultDTO[] = useMemo(() => {
    const hasil = raw?.hasilBidang;
    if (!Array.isArray(hasil)) return [];

    return hasil.map((r) => ({
      bidang_id: r.bidang_id,
      nama_bidang: r.bidang?.nama_bidang, // optional sesuai interface kamu
      skor_bidang: Number(r.skor_bidang ?? 0),
      skor_tiebreaker: Number(r.skor_tiebreaker ?? 0),
      skor_total: Number(r.skor_total ?? 0),
      persentase: Number(r.persentase ?? 0),
      is_winner: Boolean(r.is_winner),
      bidang: r.bidang
        ? {
            bidang_id: r.bidang.bidang_id,
            nama_bidang: r.bidang.nama_bidang,
            foto_bidang: (r.bidang as any).foto_bidang ?? null,
            deskripsi: r.bidang.deskripsi ?? null,
          }
        : null,
    }));
  }, [raw]);

  // ambil pemenang bidang
  const winnerBidang = useMemo(() => {
    const win = fieldResults.find((x) => x.is_winner);
    if (win) return win;
    // fallback: cari sesuai bidang_terpilih
    const selectedId = raw?.bidang_terpilih;
    if (selectedId) return fieldResults.find((x) => x.bidang_id === selectedId);
    return undefined;
  }, [fieldResults, raw?.bidang_terpilih]);

  // buat judul + deskripsi untuk TestResultCard
  const facultyName = useMemo(() => {
    return (
      winnerBidang?.bidang?.nama_bidang ||
      winnerBidang?.nama_bidang ||
      "Hasil Tes"
    );
  }, [winnerBidang]);

  const facultyImageUrl = useMemo(() => {
    return winnerBidang?.bidang?.foto_bidang ?? null;
  }, [winnerBidang]);

  const description = useMemo(() => {
    const desc = winnerBidang?.bidang?.deskripsi ?? null;
    const paragraphs = toParagraphs(desc);
    // fallback kalau deskripsi kosong
    if (paragraphs.length > 0) return paragraphs;

    return [
      "Berikut adalah bidang/jurusan/kampus yang direkomendasikan berdasarkan hasil tes kamu.",
      "Silakan cek rekomendasi jurusan dan kampus di bawah ya.",
    ];
  }, [winnerBidang]);

  // =========================
  // ✅ Mapping hasilJurusan -> MajorCardUI (untuk MajorRecommendationCard)
  // isRecommended: true untuk jurusan yang bidangnya sama dengan bidang terpilih
  // =========================
  const safeMajors: MajorCardUI[] = useMemo(() => {
    const items = raw?.hasilJurusan;
    if (!Array.isArray(items)) return [];

    const selectedBidangId = raw?.bidang_terpilih;

    return (
      items
        .map((it) => {
          const jur = it.jurusan;
          const nama = jur?.nama_jurusan ?? "Jurusan";
          const bidangId = jur?.bidang_id ?? jur?.bidang?.bidang_id ?? null;

          return {
            id: jur?.jurusan_id ?? it.jurusan_id ?? it.id,
            nama,
            isRecommended: Boolean(
              selectedBidangId && bidangId === selectedBidangId,
            ),
          };
        })
        // optional: tampilkan recommended dulu
        .sort((a, b) => Number(b.isRecommended) - Number(a.isRecommended))
    );
  }, [raw]);

  // =========================
  // ✅ Mapping hasilKampus -> CampusCardUI (untuk CampusRecommendationCard)
  // =========================
  const campusRecommendations: CampusCardUI[] = useMemo(() => {
    const items = raw?.hasilKampus;
    if (!Array.isArray(items)) return [];

    return items.map((it, idx) => {
      const kampus = it.kampus;

      const imageUrl =
        (kampus as any)?.foto_kampus ||
        (kampus as any)?.logo_kampus || // fallback kalau foto belum ada
        `https://picsum.photos/600/600?random=${idx + 1}`;

      return {
        id: kampus?.kampus_id ?? it.kampus_id ?? it.id,
        name: kampus?.nama_kampus ?? "Kampus",
        imageUrl,
        tag: "Rekomendasi",
      };
    });
  }, [raw]);

  // =========================
  // UI states
  // =========================
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Memuat hasil...
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-8 relative">
      <img
        src={vector}
        className="absolute top-0 right-0 pointer-events-none select-none"
        alt="vector"
      />

      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">
          {error}
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        {/* LEFT */}
        <div className="lg:w-2/3 flex flex-col gap-8">
          <TestResultCard
            facultyName={facultyName}
            description={description}
            imageUrl={facultyImageUrl}
          />

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Rekomendasi Jurusan */}
            <div className="lg:w-1/3 bg-white p-6 rounded-xl shadow border">
              <h3 className="text-xl font-semibold mb-4">
                Rekomendasi Jurusan
              </h3>

              {safeMajors.length === 0 ? (
                <div className="text-sm text-gray-500">
                  Belum ada rekomendasi jurusan.
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {safeMajors.map((m) => (
                    <MajorRecommendationCard key={m.id} major={m} />
                  ))}
                </div>
              )}
            </div>

            {/* Diagram Bidang */}
            <div className="lg:w-2/3 bg-white p-6 rounded-xl shadow border">
              <h3 className="text-xl text-center mb-2 font-semibold">
                Diagram Bidang
              </h3>

              <RadarBidangChart fieldResults={fieldResults} />
            </div>
          </div>

          {/* Rekomendasi Kampus */}
          <div className="p-6 bg-white rounded-xl shadow border">
            <h3 className="text-xl font-semibold mb-4">Rekomendasi Kampus</h3>

            {campusRecommendations.length === 0 ? (
              <div className="text-sm text-gray-500">
                Belum ada rekomendasi kampus.
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-4">
                {campusRecommendations.map((c) => (
                  <CampusRecommendationCard key={c.id} campus={c} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT */}
        <div className="lg:w-1/3">
          <button
            onClick={() => navigate("/category-test")}
            className="w-full border-2 border-[#00897b] text-[#00897b] py-4 rounded-lg mb-4 flex items-center justify-center gap-2"
            type="button"
          >
            <img src={loadingImg} className="h-5 w-5" alt="ulang" />
            Ulang Tes
          </button>

          <div className="w-full">
            {raw ? (
              <PDFDownloadLink
                document={
                  <ResultPDF
                    title={facultyName}
                    description={description}
                    meta={{
                      riwayat_id: raw.riwayat_id,
                      quizName: raw.quiz?.nama_quiz ?? "Quiz",
                      status: raw.status_quiz,
                      tanggal_mulai: raw.tanggal_mulai,
                      tanggal_selesai: raw.tanggal_selesai,
                    }}
                    fieldResults={fieldResults}
                    majors={safeMajors}
                    campuses={campusRecommendations}
                  />
                }
                fileName={`hasil-tes-${riwayat_id}.pdf`}
              >
                {({ loading: pdfLoading }) => (
                  <button
                    disabled={pdfLoading}
                    className={`w-full bg-[#00897b] cursor-pointer text-white py-4 rounded-lg flex items-center justify-center gap-2 ${
                      pdfLoading ? "opacity-60 cursor-not-allowed" : ""
                    }`}
                    type="button"
                  >
                    <img
                      src={downloadImg}
                      className="h-5 w-5 z-50"
                      alt="download"
                    />
                    {pdfLoading ? "Membuat PDF..." : "Unduh Hasil"}
                  </button>
                )}
              </PDFDownloadLink>
            ) : (
              <button
                disabled
                className="w-full bg-[#00897b] text-white py-4 rounded-lg opacity-60 cursor-not-allowed flex items-center justify-center gap-2"
                type="button"
              >
                <img src={downloadImg} className="h-5 w-5" alt="download" />
                Unduh Hasil
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HasilAkhir;
