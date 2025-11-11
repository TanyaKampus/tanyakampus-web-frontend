import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/components/Button";
import JurusanTabs from "../components/JurusanTabs";
import JurusanCard from "../components/JurusanCard";
import { dataJurusan, tabs } from "@/data/dataJurusan";
import Vector from "@/assets/images/JurusanVector.png";

const RekomendasiJurusanSection = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const jurusanList = dataJurusan[activeTab];
  const navigate = useNavigate();

  const handleButtonClick = () => navigate("/kategori-jurusan");

  return (
    <section className="relative overflow-hidden px-16 py-28 text-center">
      <img
        src={Vector}
        alt="Vector"
        className="hidden md:block absolute right-0 top-70 object-cover"
      />

      <div className="relative z-10">
        <h1 className="text-2xl text-neutral md:text-3xl font-bold mb-4">
          Lagi nyari jurusan yang pas?
        </h1>

        <p className="text-neutral mb-8 font-medium max-w-sm text-center m-auto">
          Nih, jurusan ini bisa banget jadi pilihan terbaik buat kamu!
        </p>

        <JurusanTabs
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 place-items-center">
          {jurusanList.map((jurusan) => (
            <JurusanCard key={jurusan.name} jurusan={jurusan} />
          ))}
        </div>

        <div className="mt-10">
          <Button
            label="Cari Jurusan Lainnya"
            variant="outline-dark"
            className="m-auto"
            onClick={handleButtonClick}
          />
        </div>
      </div>
    </section>
  );
};

export default RekomendasiJurusanSection;
