// src/pages/HasilAkhir/index.tsx

import React from "react";
import TestResultCard from "./components/TestResultCard";
import MajorRecommendationCard from "./components/MajorRecommendationCard";
import CampusRecommendationCard from "./components/CampusRecommendationCard";
import { hasilAkhirData } from "../../data/hasilAkhirData";
import loading from "../../assets/images/loading.png"
import download from "../../assets/images/download.png"
import type {
  CampusRecommendation,
  MajorRecommendation,
} from "@/data/hasilAkhirData";


const HasilAkhir: React.FC = () => {
  const {
    facultyName,
    description,
    majorRecommendations,
    campusRecommendations,
  } = hasilAkhirData;

  return (
    <div className="container mx-auto p-4 sm:p-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Konten Kiri (besar) */}
        <div className="lg:w-2/3 flex flex-col gap-8">
          {/* HASIL TES */}
          <TestResultCard facultyName={facultyName} description={description} />

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/3 bg-white p-6 rounded-xl shadow-lg border border-gray-200 flex flex-col">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Rekomendasi Jurusan:
              </h3>
              <hr className="mb-4 border-t border-gray-300" />
              <div className="flex flex-col gap-3 flex-1">
                {majorRecommendations
                  .filter((major) => major.isRecommended)
                  .map((major: MajorRecommendation) => (
                    <MajorRecommendationCard key={major.id} major={major} />
                  ))}
              </div>
              <hr className="mt-4 mb-4 border-t border-gray-300" />
              <button
                className="w-full py-3 bg-[#C44F2C] text-white font-semibold rounded-lg shadow-md transition duration-150 ease-in-out hover:bg-[#a84424]"
                onClick={() => console.log("Lihat semua jurusan lainnya")}
              >
                Lihat Jurusan Lainnya
              </button>
            </div>

            <div className="lg:w-2/3 bg-white p-6 rounded-xl shadow-lg border border-gray-200 flex flex-col">
              <h3 className="text-xl text-center font-semibold text-gray-800 mb-4">
                Diagram Bidang:
              </h3>
              <hr className="mb-4 border-t border-gray-300" />{" "}
              {/* Pindah hr agar di bawah judul */}
              {/* <div className="flex-1 w-full bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 min-h-[300px]">
                [Placeholder untuk Chart/Diagram]
              </div> */}
            </div>
          </div>

          {/* Rekomendasi Kampus (Full Width) */}
          <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-200">
            <div className="flex items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800 flex-1">
                Rekomendasi Kampus:
              </h3>
              <button className="py-3 px-3 text-sm font-medium bg-[#C44F2C] text-white rounded-lg mr-12">
                Lihat Kampus Lainnya
              </button>
            </div>

            <div className="flex flex-wrap -m-2">
              {campusRecommendations.map((campus: CampusRecommendation) => (
                <CampusRecommendationCard key={campus.id} campus={campus} />
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Kanan */}
        <div className="lg:w-1/3 flex flex-col gap-6">
          {/* Pilihan Aksi */}
          <div className="p-6">

            {/* Tombol 1: Ulang Tes - Bordered (Mirip desain) */}
            <button
              className="w-50 flex items-center justify-center gap-4 py-4 px-4 mb-4 text-lg font-semibold border-2 border-[#00897b] text-[#00897b] rounded-lg hover:bg-teal-50 transition-colors shadow-sm"
              onClick={() => console.log("Mengulang Tes")}
            >
              {/* Menggunakan ikon yang sesuai dengan FA (Font Awesome) */}
              <i className="fas fa-redo text-2xl"></i>
             <img src={loading} />
              Ulang Tes
            </button>

            {/* Tombol 2: Unduh Hasil - Solid Background (Mirip desain) */}
            <button
              className="w-50 flex items-center justify-center gap-4 py-4 px-4 text-lg font-semibold bg-[#00897b] text-white rounded-lg hover:bg-[#006b5e] transition-colors shadow-md"
              onClick={() => console.log("Mengunduh Hasil")}
            >
              {/* Menggunakan ikon yang sesuai dengan FA (Font Awesome) */}
              <i className="fas fa-download text-lg"></i>
              <img src={download} />
              Unduh Hasil
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HasilAkhir;
