import HeroSection from "./sections/HeroSection";
import AccordionSection from "./sections/AccordionSection";
import RecommendationSection from "./sections/RecommendationSection";
import WhySection from "./sections/WhySection";
import TestimonySection from "./sections/TestimonySection";
import GetStartedSection from "./sections/GetStartedSection";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <RecommendationSection />
      <WhySection />
      <TestimonySection />
      <GetStartedSection />
      <AccordionSection />
    </div>
  );
};

export default HomePage;
