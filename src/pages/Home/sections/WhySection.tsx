import WhyCard from "../components/WhyCard";
import { whyCardsData } from "@/data/whyCardData";

const WhySection = () => {


  return (
    <section className="px-6 md:px-20 py-16 flex flex-col items-center">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-2">
        Kenapa Harus Tanya Kampus?
      </h2>
      <p className="text-gray-600 text-center mb-10">
        Yuk temukan kampus yang cocok dengan kepribadian dan minat kamu!
      </p>

      <div className="flex flex-col md:flex-row items-center justify-center gap-6 w-full max-w-6xl">
        {whyCardsData.map((card, index) => (
          <WhyCard key={index} {...card} />
        ))}
      </div>
    </section>
  );
};

export default WhySection;
