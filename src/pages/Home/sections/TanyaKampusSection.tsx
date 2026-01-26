import { useEffect, useState } from "react";
import Button from "@/components/Button";
import CampusCard from "@/components/CampusCard";
import Vector from "@/assets/images/RecomVector.png";
import KuraKura from "@/assets/images/KuraKura.png";
import { useNavigate } from "react-router-dom";
import { getAllCampus } from "@/services/campus.service";
import type { CampusCardProps } from "@/services/campus.service";

const SLIDE_INTERVAL = 4000;
const FADE_DURATION = 500;

const RecommendationSection = () => {
  const navigate = useNavigate();
  const [campuses, setCampuses] = useState<CampusCardProps[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleButtonClick = () => {
    navigate("/tanya-kampus");
  };

  useEffect(() => {
    const fetchCampuses = async () => {
      try {
        const data = await getAllCampus();
        setCampuses(data);
      } catch (error) {
        console.error("Gagal mengambil data kampus:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCampuses();
  }, []);

  // 🔁 Slider logic (tetap sama)
  useEffect(() => {
    if (campuses.length <= 3) return;

    const intervalId = setInterval(() => {
      setIsFading(true);

      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % campuses.length);
        setIsFading(false);
      }, FADE_DURATION);
    }, SLIDE_INTERVAL);

    return () => clearInterval(intervalId);
  }, [campuses]);

  if (loading) {
    return <p className="text-center mt-32">Loading rekomendasi kampus...</p>;
  }

  const displayCampuses = Array.from(
    { length: 3 },
    (_, i) => campuses[(currentIndex + i) % campuses.length]
  );

  return (
    <section className="relative px-6 md:px-16 lg:px-32 mt-72 overflow-hidden">
      <img
        src={Vector}
        alt="Vector"
        className="absolute left-0 h-[450px] top-[50%] -translate-y-1/2 pointer-events-none"
      />

      <img
        src={KuraKura}
        alt="Kura Kura"
        className="hidden md:block absolute left-0 -bottom-1 z-0 w-[150px]"
      />

      <div className="container mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 px-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 max-w-2xl">
              Kampus ini cocok banget buat kamu
            </h2>
            <p className="text-lg md:text-xl font-medium text-gray-600 mt-4 max-w-md">
              Yuk intip kampus yang cocok banget deh buat kamu!
            </p>
          </div>

          <Button
            label="Cari kampus lainnya"
            variant="outline-dark"
            className="mt-6 md:mt-0"
            onClick={handleButtonClick}
          />
        </div>

        <div
          className={`relative flex justify-center items-center h-[28rem] gap-14 transition-opacity duration-500 ease-in-out ${
            isFading ? "opacity-0" : "opacity-100"
          }`}
        >
          {displayCampuses.map((campus, i) => {
            const isCenter = i === 1;
            return (
              <div
                key={campus.kampus_id}
                className={`transition-all duration-500 ease-in-out ${
                  isCenter
                    ? "scale-110 -translate-y-4 z-10"
                    : "scale-90 blur-xs opacity-70"
                }`}
              >
                <CampusCard kampus={campus} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RecommendationSection;
