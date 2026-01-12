import CTASection from "./sections/CTASection";
import GetToKnowSection from "./sections/GetToKnowSection";
import HeroSection from "./sections/HeroSection";
import KuraKuraSection from "./sections/KuraKuraSection";
import LaukBiruSection from "./sections/LaukBiru";
import LaukOrangeSection from "./sections/LaukOrange";
import TanyaKampusMember from "./sections/TanyaKampusMember";
import VisiMisi from "./sections/VisiMisi";

const Tentang = () => {
  return (
    <div>
      <HeroSection />
      <KuraKuraSection />
      <VisiMisi />
      <GetToKnowSection />
      <LaukOrangeSection />
      <TanyaKampusMember />
      <LaukBiruSection />
      <CTASection />
    </div>
  );
};

export default Tentang;
