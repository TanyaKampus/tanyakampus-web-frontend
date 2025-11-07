import WhyCard from "../components/WhyCard";
import { whyCardsData } from "@/data/whyCardData";
import Vector from "@/assets/images/WhyVector.png";

const WhySection = () => {
  return (
    <section className="relative px-6 md:px-20 py-28 flex flex-col items-center">
      <img
        src={Vector}
        alt="Vector"
        className="absolute top-30 left-1/2 -translate-x-1/2 -translate-y-1/3 w-[300px] md:w-[450px] opacity-80 pointer-events-none"
      />

      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-2 z-10">
        Kenapa Harus Tanya Kampus?
      </h2>
      <p className="text-gray-600 text-center mb-10 z-10">
        Yuk temukan kampus yang cocok dengan kepribadian dan minat kamu!
      </p>

      <div className="flex flex-col md:flex-row items-center justify-center gap-6 w-full max-w-6xl z-10">
        {whyCardsData.map((card, index) => (
          <WhyCard key={index} {...card} />
        ))}
      </div>
    </section>
  );
};

export default WhySection;
