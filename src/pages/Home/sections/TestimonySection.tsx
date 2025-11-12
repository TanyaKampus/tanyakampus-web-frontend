import { useState, useEffect } from "react";
import TestimonyCard from "../components/TestimonyCard";
import { RiUser2Fill } from "react-icons/ri";
import Vector from "@/assets/images/TestiVector.png";

const TestimonySection = () => {
  const testimonies = [
    {
      name: "Neng Wanda",
      school: "SMA 101 Jakarta",
      text: "Giffar ganteng banget!",
      avatar: RiUser2Fill,
      rating: 5,
    },
    {
      name: "Ahmad Thanos Abidin",
      school: "SMA 89 Surabaya",
      text: "Tesnya seru dan jelas! Aku akhirnya yakin ambil DKV setelah tahu hasil minatku",
      avatar: RiUser2Fill,
      rating: 5,
    },
    {
      name: "Haji Deadpool",
      school: "SMA 77 Bandung",
      text: "Aku suka sama giffar!",
      avatar: RiUser2Fill,
      rating: 5,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === testimonies.length - 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [testimonies.length]);

  const getCardPosition = (index: number) => {
    const diff = index - currentIndex;
    if (diff === 0) return "center";
    if (diff === 1 || diff === -(testimonies.length - 1)) return "top";
    if (diff === -1 || diff === testimonies.length - 1) return "bottom";
    return "hidden";
  };

  return (
    <div className="min-h-screen relative overflow-hidden py-88 px-6 sm:px-10">
      <img
        src={Vector}
        alt="Vector"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-70 pointer-events-none"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-4 z-10 px-4">
            <h1 className="text-4xl max-w-md font-bold text-neutral leading-tight">
              Sudah Tahu Arah Mereka, Sekarang Giliran Kamu!
            </h1>
            <p className="text-lg md:text-xl text-neutral max-w-md">
              Baca kisah singkat mereka yang udah nemuin jurusan impiannya
            </p>
          </div>

          <div className="relative h-[500px] sm:h-[600px] flex items-center justify-end">
            <div className="relative w-full h-full">
              {testimonies.map((testimony, index) => (
                <TestimonyCard
                  key={index}
                  name={testimony.name}
                  school={testimony.school}
                  text={testimony.text}
                  avatar={testimony.avatar}
                  position={getCardPosition(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonySection;
