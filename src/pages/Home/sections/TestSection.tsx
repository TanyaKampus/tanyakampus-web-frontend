import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/components/Button";
import ArusMinat from "@/assets/images/ArusMinat.png";
import SelamDalam from "@/assets/images/SelamDalam.png";
import Vector from "@/assets/images/TestVector.png";
import Penyelam from "@/assets/images/Penyelam.png";

const cards = [
  {
    id: 1,
    img: ArusMinat,
    title: "Tes Arus Minat",
    desc: "Tes cepat ini dirancang untuk memetakan arah minat dan potensi awalmu secara umum. Gratis, hasilnya langsung keluar, dan siap jadi bekal pertamamu!",
    label: "Gratis",
    labelColor: "bg-[#A81B1B]",
  },
  {
    id: 2,
    img: SelamDalam,
    title: "Paket Selam Mendalam",
    desc: "Ini adalah ekspedisi menyeluruh untuk menemukan harta karun potensimu. Dapatkan laporan psikometri lengkap, peta jurusan paling akurat, dan analisis mendalam tentang kekuatan personalitas, preferensi belajar, dan strategi karir jangka panjang.",
    label: "Best Value!",
    labelColor: "bg-[#CBB74E]",
  },
];

const TestSection = () => {
  const navigate = useNavigate(); // hook navigate
  const [activeIndex, setActiveIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setActiveIndex((prev) => (prev === cards.length - 1 ? 0 : prev + 1));
        setFade(true);
      }, 400);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleLihatTes = () => {
    navigate("/category-test"); // tombol "Lihat Tes Lainnya"
  };

  const handleMulaiCekOmbak = () => {
    navigate("/category-test/cek-arus-minat"); // tombol "Mulai Cek Ombak"
  };

  return (
    <section className="relative flex flex-col md:flex-row items-center justify-between gap-10 py-28 px-10 md:px-26 overflow-hidden">
      {/* Background Vector */}
      <img
        src={Vector}
        alt="Vector"
        className="hidden md:block absolute top-0 right-[250px] h-[450px] w-[450px] object-contain pointer-events-none z-0"
      />

      <img
        src={Penyelam}
        alt="Penyelam"
        className="hidden md:block absolute right-34 -top-3 w-[220px] object-contain z-0"
      />

      {/* Text Section */}
      <div className="flex-1 max-w-lg relative z-10">
        <h1 className="text-4xl text-neutral font-bold mb-4">
          Temukan Kompas Jurusanmu
        </h1>
        <p className="text-neutral text-xl mb-6">
          Lautan pilihan itu luas. Gunakan alat navigasi kami untuk memetakan
          rute jurusan dan karir yang paling tepat buatmu.
        </p>
        <Button
          label="Lihat Tes Lainnya"
          variant="outline-dark"
          onClick={handleLihatTes}
        />
      </div>

      {/* Card Section */}
      <div className="relative flex-1 flex items-center justify-center z-10">
        <div
          className={`w-full max-w-sm bg-white rounded-2xl shadow-lg p-4 flex flex-col justify-between h-[480px] transition-opacity duration-500 ${
            fade ? "opacity-100" : "opacity-0"
          }`}
        >
          <div>
            <div className="relative mb-4">
              <img
                src={cards[activeIndex].img}
                className="w-full rounded-xl"
                alt={cards[activeIndex].title}
              />
              <span
                className={`absolute top-3 left-3 text-white text-sm p-2 rounded-xl ${cards[activeIndex].labelColor}`}
              >
                {cards[activeIndex].label}
              </span>
            </div>

            <h3 className="text-xl font-semibold mb-3">
              {cards[activeIndex].title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {cards[activeIndex].desc}
            </p>
          </div>

          <Button
            label="Mulai Cek Ombak"
            variant="solid-dark"
            className="w-full mt-4"
            onClick={handleMulaiCekOmbak} // arah ke CekarusMinat
          />
        </div>

        {/* Dots */}
        <div className="absolute right-[40px] top-1/2 -translate-y-1/2 flex flex-col gap-2">
          {cards.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setFade(false);
                setTimeout(() => {
                  setActiveIndex(i);
                  setFade(true);
                }, 300);
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                i === activeIndex ? "bg-primary-300 scale-125" : "bg-[#D9D9D9]"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestSection;
