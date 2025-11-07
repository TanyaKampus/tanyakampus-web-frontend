import { useEffect, useState } from "react";
import Button from "@/components/Button";
import CampusCard, { type CampusCardProps } from "@/components/CampusCard";
import { campuses } from "@/data/campuses";
import Vector from "@/assets/images/VectorRecommendation.png";
import { useNavigate } from "react-router-dom";

const SLIDE_INTERVAL = 4000;
const FADE_DURATION = 500;

const RecommendationSection = () => {
  const navigate = useNavigate()
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  const handleButtonClick = () => {
    navigate('/rekomendasi-kampus')
  }

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
  }, []);

  const displayCampuses: CampusCardProps[] = Array.from(
    { length: 3 },
    (_, i) => campuses[(currentIndex + i) % campuses.length]
  );

  return (
    <section className="relative px-6 md:px-16 lg:px-32 py-72 overflow-hidden">
      <img
        src={Vector}
        alt="Vector"
        className="absolute left-0 top-[40%] -translate-y-1/2 pointer-events-none"
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
                key={`${campus.name}-${i}`}
                className={`transition-all duration-500 ease-in-out ${
                  isCenter
                    ? "scale-110 -translate-y-4 z-10"
                    : "scale-90 blur-xs opacity-70"
                }`}
              >
                <CampusCard {...campus} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RecommendationSection;
