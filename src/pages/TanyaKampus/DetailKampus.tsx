import { useParams } from "react-router-dom";
import { dataDetailKampus } from "@/data/dataDetailKampus";
import HeroDetail from "./HeroDetail";
import ProgramStudiKampus from "./ProgramStudiKampus";
import { FiMapPin, FiPhone, FiGlobe } from "react-icons/fi";
import Instagram from "@/assets/images/Instagram.png";

const KampusDetail = () => {
  const { id } = useParams<{ id: string }>();

  const kampus = dataDetailKampus.find((k) => k.id === id);

  if (!kampus) return <p>Kampus tidak ditemukan</p>;

  return (
    <section>
      <HeroDetail />

      <div className="pl-20">
        <h1 className="text-xl font-bold mt-20">Tentang Kampus</h1>
        <p className="text-gray-700 mt-6 whitespace-pre-line text-justify max-w-xl">
          {kampus.deskripsi}
        </p>
      </div>

      <section className="mt-50">
        <ProgramStudiKampus />
      </section>

      <section className="mt-12 mb-60">
        <h2 className="text-xl font-md pl-27">Alamat Kampus</h2>
        <div className="flex justify-center mt-4">
          <iframe
            src={kampus.alamatKampus.mapEmbed}
            className="w-full max-w-[82rem] h-90 rounded-lg"
            loading="lazy"
          ></iframe>
        </div>

        <div className="flex flex-col gap-2 mt-10 pl-30 text-gray-700">
          {/* Tiga info sejajar */}
          <div className="flex flex-wrap gap-6">
            <p className="flex items-center gap-2">
              <FiMapPin className="text-[#383838]" />{" "}
              {kampus.alamatKampus.alamatLengkap}
            </p>
            <p className="flex items-center gap-2">
              <FiPhone className="text-[#383838]" /> Telepon:{" "}
              {kampus.alamatKampus.telepon}
            </p>
            <p className="flex items-center gap-2">
              <FiGlobe className="text-[#383838]" /> Website:{" "}
              {kampus.alamatKampus.website}
            </p>
          </div>

          <p className="flex items-center gap-2 mt-2">
            <img
              src={Instagram}
              alt="Instagram"
              className="w-5 h-5"
            />
            Instagram: {kampus.alamatKampus.instagram}
          </p>
        </div>
      </section>
    </section>
  );
};

export default KampusDetail;
