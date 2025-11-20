import HeroSection from "./HeroSection"; // Asumsi komponen ini ada
import { categoryTest } from "@/data/categorytest";
import TestCard from "../Home/components/TestCard";
import Vectorkr from "@/assets/images/Vector1.png";
import Vectorkn from "@/assets/images/Vector2.png";

const CategoryTest = () => {
  const allTests = Object.values(categoryTest).flat();

  return (
    <section className="relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <img
          src={Vectorkr}
          alt="Vector Kiri"
          className="absolute left-0 bottom-0 w-auto h-auto z-10 
                     transform translate-y-1/2 -translate-x-1/4"
        />

        <img
          src={Vectorkn}
          alt="Vector Kanan"
          className="absolute right-0 top-1/2 w-auto h-auto z-10 
                     transform -translate-y-1/2 translate-x-1/4"
        />
      </div>
      <HeroSection />
      <div className="relative z-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center mt-10">
        {allTests.map((test) => (
          <TestCard key={test.name} test={test} />
        ))}
      </div>
    </section>
  );
};

export default CategoryTest;
