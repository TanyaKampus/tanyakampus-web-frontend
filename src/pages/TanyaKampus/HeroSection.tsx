import Lulu from "@/assets/images/LuluGetStarted2.png";
import BreadCrumbs from "@/components/BreadCrumbs";

const HeroSection = () => (
  <div className="relative h-[480px] bg-gradient-to-r from-primary-200 to-primary-100 text-neutral-white px-6 md:px-16 py-12 flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden">
    
    <div className="absolute top-4 left-6 md:left-16 text-neutral-black">
      <BreadCrumbs />
    </div>

    <div className="md:w-1/2 text-center md:text-left z-10 mt-8 md:mt-0">
      <h1 className="text-4xl font-bold mb-3">
        Kampus Idaman? Yuk Cari Tahu di Sini!
      </h1>
      <p className="text-2xl text-neutral-white">
        Yuk, tanya dulu! Kami bantu arahkan pilihan kampus yang sesuai dengan kamu.
      </p>
    </div>

    <img
      src={Lulu}
      alt="Lulu"
      className="absolute bottom-0 right-0 max-h-[420px] object-contain"
    />
  </div>
);

export default HeroSection;
