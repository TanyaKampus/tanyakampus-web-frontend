import HeroSection from "./sections/HeroSection";
import AccordionSection from "./sections/AccordionSection";
import RecommendationSection from "./sections/RecommendationSection";
import WhySection from "./sections/WhySection";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <RecommendationSection />
      <WhySection />
      <AccordionSection />
    </div>
  );
};

export default HomePage;
