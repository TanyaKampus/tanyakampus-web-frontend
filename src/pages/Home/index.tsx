import HeroSection from "./sections/HeroSection";
import AccordionSection from "./sections/AccordionSection";
import RecommendationSection from "./sections/RecommendationSection";
import WhySection from "./sections/WhySection";
import TestimonySection from "./sections/TestimonySection";
import GetStartedSection from "./sections/GetStartedSection";
import RekomendasiJurusanSection from "./sections/RekomendasiJurusanSection";
import TestSection from "./sections/TestSection";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <RecommendationSection />
      <RekomendasiJurusanSection />
      <TestSection />
      <WhySection />
      <TestimonySection />
      <GetStartedSection />
      <AccordionSection />
    </div>
  );
};

export default HomePage;
