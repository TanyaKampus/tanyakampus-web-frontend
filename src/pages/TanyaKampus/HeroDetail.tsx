import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import BreadCrumbs from "@/components/BreadCrumbs";
import { dataDetailKampus } from "@/data/dataDetailKampus";
import Like from "@/assets/images/love.png";
import Likeactive from "@/assets/images/loveactive.png";

const HeroDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const kampus = dataDetailKampus.find((k) => k.id === id);

  if (!kampus) return null;

  const images: string[] = kampus.carouselImages ?? [];
  const autoplayDelay = 5000;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [activeIndex, setActiveIndex] = useState<number>(0);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [liked, setLiked] = useState(false);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, autoplayDelay);

    return () => clearInterval(interval);
  }, [images.length, autoplayDelay]);

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
  };

  const DotSeparator = () => (
    <span className="text-primary-300 text-4xl mx-2 leading-none flex items-center">
      •
    </span>
  );

  return (
    <div className="relative pb-35 bg-[#E2F2F2] text-[#5C5C5C] px-6 md:px-16 py-12 flex flex-col items-start gap-8 overflow-hidden">
      {/* Breadcrumb */}
      <div className="absolute top-4 left-6 md:left-16 text-neutral-black z-10">
        <BreadCrumbs />
      </div>

      <div className="flex w-full h-full justify-between items-start pt-10 relative">
        <div className="flex flex-row items-center gap-6 mt-10 z-10 relative">
          <img src={kampus.logo} className="w-40 h-40 object-contain mt-25" />

          <button
            onClick={() => setLiked(!liked)}
            className="absolute top-0 right-0 transition duration-200 translate-y-10"
          >
            <div
              className={`
      w-9 h-9 transition-all duration-200
      ${liked ? "opacity-100 scale-110" : "opacity-60 scale-100"}
    `}
            >
              <img
                src={liked ? Likeactive : Like}
                alt="like"
                className="w-full h-full object-contain"
              />
            </div>
          </button>

          <div className="flex flex-col">
            <h1 className="text-3xl font-bold text-[#5C5C5C] leading-tight mt-25">
              {kampus.nama.split(" (")[0]}
              <br />({kampus.nama.split(" (")[1]?.replace(")", "")})
            </h1>

            <div className="text-xl font-medium mt-2 text-gray-800 flex flex-wrap items-center">
              {Array.isArray(kampus.kategori)
                ? kampus.kategori.map((item, index) => (
                    <span key={index} className="flex items-center">
                      <span>{item}</span>
                      {index < kampus.kategori.length - 1 && <DotSeparator />}
                    </span>
                  ))
                : kampus.kategori}
            </div>
          </div>
        </div>

        {images.length > 0 && (
          <div className="absolute right-0 top-0 bottom-0 w-full md:w-2/3 lg:w-1/2 h-full z-0 overflow-hidden">
            <div className="relative w-full h-full flex justify-center items-center">
              {images.map((imgSrc, index) => (
                <img
                  key={index}
                  src={imgSrc}
                  alt={`Gambar kampus ${index + 1}`}
                  className={`absolute transition-opacity duration-1000 ease-in-out 
                    ${index === activeIndex ? "opacity-100" : "opacity-0"} 
                    w-4/5 h-auto max-h-[300px] object-cover rounded-xl`}
                />
              ))}

              {images.length > 1 && (
                <div className="absolute bottom-0  left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handleDotClick(index)}
                      className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                        index === activeIndex
                          ? "bg-teal-500"
                          : "bg-gray-400 hover:bg-gray-300"
                      }`}
                      aria-label={`Lihat gambar ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroDetail;
