// src/pages/TanyaKampus/DetailKampus/ProgramStudiKampus.tsx
import { useState } from "react";

type Props = {
  kampusNama: string;
  jurusan: Array<{
    jurusan_id: string;
    nama_jurusan: string;
    deskripsi?: string | null;
  }>;
};

const ProgramStudiKampus: React.FC<Props> = ({ kampusNama, jurusan }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Biar desain kamu tetap sama: kita bikin 1 kategori "Program Studi"
  const dataS1 = [
    {
      kategori: "Program Studi",
      list: jurusan.map((j) => j.nama_jurusan),
    },
  ];

  return (
    <div className="min-h-[480px] bg-[#E2F2F2] px-6 md:px-16 py-12 overflow-hidden">
      {/* Header Program Studi */}
      <div className="mb-10">
        <h1 className="text-3xl font-semibold mb-3">Program Studi</h1>
        <p className="text-[#6f6f6f] leading-relaxed ">
          Yuk, jelajahi beragam jurusan seru di {kampusNama} dan temukan bidang
          yang paling cocok <br />buat pengembangan kariermu!
        </p>
      </div>

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-[180px_1fr] gap-20">
        {/* Label S1 / Sarjana */}
        <div className="md:block">
          <div className="bg-white w-full rounded-full px-6 py-3 shadow-sm flex items-center justify-between hover:shadow-md">
            <span className="font-semibold text-gray-900 text-lg">
              S1 / Sarjana
            </span>
            <span className="text-gray-500 text-xl">{">"}</span>
          </div>
        </div>

        {/* Dropdown */}
        <div className="flex flex-col gap-2">
          {dataS1.map((item, index) => (
            <div key={index} className="w-full">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-[430px] bg-white rounded-full px-4 py-1 flex items-center justify-between shadow-sm hover:shadow-md transition-all"
              >
                <span className="font-medium text-lg">{item.kategori}</span>

                <p className="w-12 h-12 bg-teal-600 hover:bg-teal-700 text-white rounded-full flex items-center justify-center transition">
                  +
                </p>
              </button>

              <div
                className={`bg-white w-[430px] rounded-xl shadow-md p-4 px-6 flex flex-col gap-3 transition-all duration-300 overflow-hidden ${
                  openIndex === index
                    ? "max-h-200 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                {item.list.length === 0 && (
                  <div className="text-gray-700 py-2">
                    Belum ada jurusan untuk kampus ini.
                  </div>
                )}

                {item.list.map((prodi, i) => (
                  <div key={i} className="text-gray-700 last:border-none py-2">
                    {prodi}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgramStudiKampus;
