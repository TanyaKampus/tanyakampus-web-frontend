import Lulu from "@/assets/images/LULUCS1.png";
import BreadCrumbs from "@/components/BreadCrumbs";

const HeroSection = () => (
  <div className="relative h-[480px] bg-gradient-to-r from-primary-200 to-primary-100 text-neutral-white px-6 md:px-16 py-12 flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden">
    
    <div className="absolute top-4 left-6 md:left-16 text-neutral-black">
      <BreadCrumbs />
    </div>

    <div className="md:w-1/2 text-center md:text-left z-10 mt-8 md:mt-0">
      <h1 className="text-4xl font-bold mb-8">
        Bingung Pilih Jurusan? Konsultasi Sekarang!
      </h1>
      <p className="text-2xl text-neutral-white">
        Obrolin masa depanmu bareng mentor ahli. Kami bantu temukan jalan terbaik buat kamu.
      </p>
    </div>

    <img
      src={Lulu}
      alt="Lulu"
      className="absolute bottom-0 right-10 max-h-[420px] object-contain"
    />
  </div>
);

export default HeroSection;
