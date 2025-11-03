import BG from "@/assets/images/HeroWave.png";
import Button from "@/components/Button";
import { RiWhatsappFill } from "react-icons/ri";

const HeroSection = () => {
  return (
    <div className="relative w-full h-screen flex items-center justify-center text-tertiary-100">
      <img
        src={BG}
        alt="Hero Background"
        className="absolute inset-0 w-full object-cover"
      />

      <div className="relative z-10 text-center px-10">
        <h1 className="text-4xl md:text-5xl font-bold max-w-2xl mb-6">
          Jelajahi Laut Pertamamu Sekarang!
        </h1>
        <p className="text-lg md:text-xl max-w-xl mx-auto mb-6">
          Saatnya menyelami potensimu dan cari tau jurusan impian yang pas
          bareng <span className="font-bold">TanyaKampus</span>
        </p>
        <div className="flex gap-4 items-center justify-center">
          <Button label="Mulai Test" />
          <Button
            label="Konsultasi Sekarang"
            variant="outline"
            startIcon={<RiWhatsappFill size={24} />}
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
