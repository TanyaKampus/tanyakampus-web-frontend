import HeroSection from "./sections/HeroSection";
import AccordionSection from "./sections/AccordionSection";
import RecommendationSection from "./sections/TanyaKampusSection";
import WhySection from "./sections/WhySection";
import TestimonySection from "./sections/TestimonySection";
import GetStartedSection from "./sections/GetStartedSection";
import RekomendasiJurusanSection from "./sections/TanyaJurusanSection";
import TestSection from "./sections/TestSection";
import LaukOrangeSection from "./sections/LaukOrangeSection";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <RecommendationSection />
      <RekomendasiJurusanSection />
      <TestSection />
      <WhySection />
      <LaukOrangeSection />
      <TestimonySection />
      <GetStartedSection />
      <AccordionSection />
    </div>
  );
};

export default HomePage;
