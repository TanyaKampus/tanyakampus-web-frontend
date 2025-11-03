import { MdKeyboardArrowRight } from "react-icons/md";
import Map from "@/assets/images/Map.png";
import Compass from "@/assets/images/Compass.png";
import Lighthouse from "@/assets/images/Lighthouse.png";
import VectorPrimary from "@/assets/images/VectorPrim100.png";
import VectorSec from "@/assets/images/VectorSec200.png";
import VectorTer from "@/assets/images/VectorTer200.png";

const WhySection = () => {
  const cards = [
    {
      title: "Rekomendasi Jurusan yang Tepat Buat Kamu",
      desc: "Temukan jurusan paling cocok dengan minat dan kepribadianmu",
      bg: "bg-primary-300",
      text: "text-white",
      iconColor: "bg-white text-primary-300",
      img: Map,
      vector: VectorPrimary,
    },
    {
      title: "Bantu kamu yakin ambil langkah kuliah",
      desc: "Dapatkan insight dan panduan kuliah",
      bg: "bg-secondary-200",
      text: "text-neutral",
      iconColor: "bg-neutral text-secondary-200",
      img: Compass,
      vector: VectorSec,
    },
    {
      title: "Bimbingan pilih kampus tanpa ribet",
      desc: "Temukan kampus dengan cepat dan mudah",
      bg: "bg-tertiary-300",
      text: "text-white",
      iconColor: "bg-white text-tertiary-300",
      img: Lighthouse,
      vector: VectorTer,
    },
  ];

  return (
    <section className="px-6 md:px-20 py-16 flex flex-col items-center">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-2">
        Kenapa Harus Tanya Kampus?
      </h2>
      <p className="text-gray-600 text-center mb-10">
        Yuk temukan kampus yang cocok dengan kepribadian dan minat kamu!
      </p>

      <div className="flex flex-col md:flex-row items-center justify-center gap-6 w-full max-w-6xl">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`relative group cursor-pointer ${card.bg} ${card.text}
              flex flex-col justify-between p-6 md:p-8 rounded-2xl 
              transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] 
              w-[270px] md:w-[300px] h-[420px] hover:w-[480px] overflow-hidden`}
          >
            {/* Vector di sisi kiri */}
            <img
              src={card.vector}
              alt="vector"
              className="absolute left-0 bottom-0 h-64 w-50"
            />

            {/* Gambar utama (muncul saat hover) */}
            <img
              src={card.img}
              alt={card.title}
              className="absolute bottom-0 left-0 w-36 md:w-64 object-contain opacity-0 translate-y-10 scale-95 
              transition-all duration-700 ease-out group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100"
            />

            {/* Isi card */}
            <div className="z-10 relative flex flex-col justify-between h-full">
              {/* Judul & Deskripsi */}
              <div
                className="transition-all duration-700 ease-out transform translate-y-48 group-hover:translate-y-0"
              >
                <h3 className="text-xl font-semibold leading-snug mb-1">
                  {card.title}
                </h3>
                <p className="text-sm opacity-90">{card.desc}</p>
              </div>

              {/* Ikon panah di bawah */}
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full ${card.iconColor} self-end 
                transition-all duration-500 transform group-hover:translate-x-1`}
              >
                <MdKeyboardArrowRight size={40} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhySection;
