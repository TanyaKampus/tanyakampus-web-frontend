import { useState } from "react";
import { dataKampus } from "@/data/dataKampus";
import Button from "@/components/Button";
import HeroSection from "./HeroSection";
import FilterDropdown from "./components/FilterDropdown";
import type { Filters } from "./components/types";
import KampusCard from "@/pages/Home/components/KampusCard";

const TanyaKampus = () => {
  const allMajors = Object.values(dataKampus).flat();
  const [filters, setFilters] = useState<Filters>({
    jenisKampus: "",
    akreditasi: "",
  });

  const handleFilterChange = (type: keyof Filters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [type]: prev[type] === value ? "" : value,
    }));
  };

  return (
    <section>
      <HeroSection />

      <div className="px-6 md:px-23 py-12">
        <FilterDropdown filters={filters} onChange={handleFilterChange} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
          {allMajors.map((kampus) => (
            <KampusCard key={kampus.id} kampus={kampus} />
          ))}
        </div>

        <div className="flex justify-center items-center gap-4 mt-10">
          <Button label="<" variant="outline-dark" />
          <span className="text-neutral font-medium">1 dari 1</span>
          <Button label=">" variant="outline-dark" />
        </div>
      </div>
    </section>
  );
};

export default TanyaKampus;
