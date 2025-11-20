import BreadCrumbs from "@/components/BreadCrumbs";
import Vectorkr from "@/assets/images/Vector1.png";
import Vectorkn from "@/assets/images/Vector2.png";

import { categoryTest } from "@/data/categorytest";

const CekarusMinat = () => {
  const testData = categoryTest.Minat[0];

  const handleStartTest = () => {
    console.log("Mulai tes:", testData.name);
  };

  return (
    <section className="relative pt-20 px-4 md:px-8 min-h-screen bg-white">
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

      <div className="absolute top-4 left-6 md:left-16 text-neutral-black">
        <BreadCrumbs />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto p-8 md:p-12 bg-white rounded-2xl shadow-xl mb-30">
        <div className="relative mb-8">
          <div className="absolute top-10 left-68 bg-[#A81B1B] text-white text-lg font-semibold px-4 py-2 rounded-lg z-30">
            {testData.category}
          </div>

          <div className="flex justify-center items-center rounded-lg p-6">
            <img
              src={testData.image}
              alt={testData.name}
              className="w-full h-auto max-h-95  object-contain"
            />
          </div>
        </div>

        <div className="mt-8 w-full flex justify-center">
          <div className="w-full max-w-2xl mx-auto text-left">
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#383838] mb-4">
              {testData.name}
            </h1>

            <p className="text-[#A8A8A8] text-lg leading-relaxed mb-10">
              {testData.description}
            </p>
          </div>
        </div>

        {/* Tombol */}
        <div className="text-center">
          <button
            onClick={handleStartTest}
            className="w-full md:w-auto bg-[#069494] text-white text-xl font-bold py-3 px-72 rounded-lg 
            hover:bg-[#0da3a3] transition duration-300 shadow-md"
          >
            Mulai test
          </button>
        </div>
      </div>
    </section>
  );
};

export default CekarusMinat;