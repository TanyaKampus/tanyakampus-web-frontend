import HeroSection from "./sections/HeroSection";
import AccordionSection from "./sections/AccordionSection";
import RecommendationSection from "./sections/RecommendationSection";
import WhySection from "./sections/WhySection";
import TestimonySection from "./sections/TestimonySection";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <RecommendationSection />
      <WhySection />
      <TestimonySection />
      <AccordionSection />
    </div>
  );
};

export default HomePage;
