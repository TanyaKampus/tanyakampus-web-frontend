// src/pages/TanyaKampus/DetailKampus/index.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import HeroDetail from "./HeroDetail";
import ProgramStudiKampus from "./ProgramStudiKampus";

import { FiMapPin, FiPhone, FiGlobe } from "react-icons/fi";
import Instagram from "@/assets/images/Instagram.png";

import {
  getCampusByIdService,
  type GetCampusByIdResponse,
} from "@/services/campus.service";

const KampusDetail = () => {
  const { id } = useParams<{ id: string }>();

  const [kampus, setKampus] = useState<GetCampusByIdResponse["data"] | null>(
    null,
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchDetail = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await getCampusByIdService(id);
        setKampus(res.data);
      } catch (e: any) {
        console.error(e);
        setKampus(null);
        setError(e?.response?.data?.message || "Gagal mengambil detail kampus");
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;
  if (!kampus) return <p className="p-6">Kampus tidak ditemukan</p>;

  return (
    <section>
      {/* ✅ Hero pakai data dari API */}
      <HeroDetail kampus={kampus} />

      <div className="pl-20">
        <h1 className="text-xl font-bold mt-20">Tentang Kampus</h1>
        <p className="text-gray-700 mt-6 whitespace-pre-line text-justify max-w-xl">
          {kampus.deskripsi_kampus || "-"}
        </p>
      </div>

      {/* ✅ Program studi pakai data jurusan dari API */}
      <section className="mt-50">
        <ProgramStudiKampus jurusan={kampus.jurusan || []} kampusNama={kampus.nama_kampus}/>
      </section>

      {/* ⚠️ Bagian alamat kamu masih dari data statis.
          Kalau backend belum punya alamat/mapEmbed, biarkan dulu (desain tetap).
          Nanti kalau backend sudah ada, baru sambungkan. */}
      <section className="mt-12 mb-60">
        <h2 className="text-xl font-md pl-27">Alamat Kampus</h2>

        <div className="flex justify-center mt-4">
          <iframe
            // sementara dummy biar UI tetap jalan
            src={"https://www.google.com/maps?q=Indonesia&output=embed"}
            className="w-full max-w-[82rem] h-90 rounded-lg"
            loading="lazy"
          ></iframe>
        </div>

        <div className="flex flex-col gap-2 mt-10 pl-30 text-gray-700">
          <div className="flex flex-wrap gap-6">
            <p className="flex items-center gap-2">
              <FiMapPin className="text-[#383838]" /> {"Alamat belum tersedia"}
            </p>
            <p className="flex items-center gap-2">
              <FiPhone className="text-[#383838]" /> Telepon: {"-"}
            </p>
            <p className="flex items-center gap-2">
              <FiGlobe className="text-[#383838]" /> Website: {"-"}
            </p>
          </div>

          <p className="flex items-center gap-2 mt-2">
            <img src={Instagram} alt="Instagram" className="w-5 h-5" />
            Instagram: {"-"}
          </p>
        </div>
      </section>
    </section>
  );
};

export default KampusDetail;
