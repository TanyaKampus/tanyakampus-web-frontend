import { dataJurusan } from "@/data/dataJurusan";
import Lulu from "@/assets/images/LuluGetStarted.png";
import JurusanCard from "../Home/components/JurusanCard";

const RekomendasiJurusan = () => {
  const allMajors = Object.values(dataJurusan).flat();

  return (
    <section>
      <div className="bg-gradient-to-r from-primary-300 to-primary-200 text-neutral-white px-6 md:px-16 py-12 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl font-bold mb-3">
            Kampus Idaman? Yuk Cari Tahu di Sini!
          </h1>
          <p className="text-2xl text-neutral-white">
            Yuk, tanya dulu! Kami bantu arahkan pilihan kampus yang sesuai
            dengan kamu.
          </p>
        </div>

        <div className="md:w-1/2 flex justify-center md:justify-end">
          <img src={Lulu} alt="Lulu" className="max-w-[476px] object-contain" />
        </div>
      </div>

      <div className="px-6 md:px-16 py-12">
        <div className="max-w-xs mb-10">
          <select
            className="w-full cursor-pointer rounded-lg border border-primary-300 p-2 text-neutral focus:outline-none focus:ring-2 focus:ring-[#00A9A4]"
            defaultValue=""
          >
            <option value="" disabled>
              Pilih Kategori Jurusan
            </option>
            {Object.keys(dataJurusan).map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {allMajors.map((jurusan) => (
            <JurusanCard key={jurusan.name} jurusan={jurusan} />
          ))}
        </div>

        <div className="flex justify-center items-center gap-4 mt-10">
          <button className="border border-gray-300 rounded-lg px-3 py-1 text-gray-600 hover:bg-gray-100 transition">
            &lt;
          </button>
          <span className="text-gray-700 font-medium">1 dari 1</span>
          <button className="border border-gray-300 rounded-lg px-3 py-1 text-gray-600 hover:bg-gray-100 transition">
            &gt;
          </button>
        </div>
      </div>
    </section>
  );
};

export default RekomendasiJurusan;
