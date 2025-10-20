import CampusCard, { type CampusCardProps } from "@/components/CampusCard";
import Button from "@/components/Button";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import UnpadLogo from "@/assets/images/UnpadLogo.png";
import TelULogo from "@/assets/images/TelULogo.png";
import ITBLogo from "@/assets/images/ITBLogo.png";
import UnikomLogo from "@/assets/images/UnikomLogo.png";
import Vector from "@/assets/images/VectorRecommendation.png";
const RecommendationSection = () => {
  // Data dummy untuk kartu kampus
  const campuses: CampusCardProps[] = [
    {
      imageUrl: "https://placehold.co/400x600/3498db/ffffff?text=Unikom",
      logoUrl: UnikomLogo,
      name: "Universitas Komputer Indonesia",
      type: "Swasta",
    },
    {
      imageUrl: "https://placehold.co/400x600/2ecc71/ffffff?text=ITB",
      logoUrl: ITBLogo,
      name: "Institut Teknologi Bandung",
      type: "Negeri",
    },
    {
      imageUrl: "https://placehold.co/400x600/e74c3c/ffffff?text=Unpad",
      logoUrl: UnpadLogo,
      name: "Universitas Padjadjaran",
      type: "Negeri",
    },
    {
      imageUrl: "https://placehold.co/400x600/f1c40f/ffffff?text=Tel-U",
      logoUrl: TelULogo,
      name: "Telkom University",
      type: "Swasta",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  const SLIDE_INTERVAL = 4000;
  const FADE_DURATION = 500;

  useEffect(() => {
    if (campuses.length <= 3) return;
    const intervalId = setInterval(() => {
      setIsFading(true);

      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % campuses.length);
        setIsFading(false);
      }, FADE_DURATION);
    }, SLIDE_INTERVAL);

    return () => clearInterval(intervalId);
  }, [campuses.length]);

  const displayCampuses = [];
  for (let i = 0; i < 3; i++) {
    displayCampuses.push(campuses[(currentIndex + i) % campuses.length]);
  }

  return (
    <section className="relative px-4 md:px-16 lg:px-32 py-72">
      <img
        src={Vector}
        alt="Vector"
        className="absolute left-0 top-[40%] -translate-y-1/2 pointer-events-none"
      />

      <div className="container mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 px-4">
          <div>
            <h2 className="text-3xl md:text-4xl max-w-2xl font-bold text-gray-800">
              Kampus ini cocok banget buat kamu
            </h2>
            <p className="text-lg md:text-xl max-w-md font-medium text-gray-600 mt-4">
              Yuk intip kampus yang cocok banget deh buat kamu!
            </p>
          </div>
          <div className="mt-6 md:mt-0 flex-shrink-0">
            <Button label="Cari kampus lainnya" variant="outline-dark" />
          </div>
        </div>

        <div
          className={`relative flex justify-center items-center h-[28rem] gap-[56px] transition-opacity duration-500 ease-in-out ${
            isFading ? "opacity-0" : "opacity-100"
          }`}
        >
          {displayCampuses.map((campus, index) => {
            const isCenter = index === 1;
            return (
              <div
                key={campus.name + index}
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
