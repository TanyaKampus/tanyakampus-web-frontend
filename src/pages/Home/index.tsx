import HeroSection from "./sections/HeroSection";
import AccordionSection from "./sections/AccordionSection";
import RecommendationSection from "./sections/RecommendationSection";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <RecommendationSection />
      <AccordionSection />
    </div>
  );
};

export default HomePage;
