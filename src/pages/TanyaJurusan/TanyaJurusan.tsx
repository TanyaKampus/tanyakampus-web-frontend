import { useEffect, useState, useMemo } from "react";
import Button from "@/components/Button";
import HeroSection from "./HeroSection";
import FilterDropdown from "./components/FilterDropdown";
import type { Filters } from "./components/types";
import JurusanCard from "../Home/components/JurusanCard";
import {
  getAllMajorCardService,
  type MajorCard,
} from "@/services/major.service";

const ITEMS_PER_PAGE = 6;

const TanyaJurusan = () => {
  const [majors, setMajors] = useState<MajorCard[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [filters, setFilters] = useState<Filters>({
    jenisKampus: "",
    akreditasi: "",
  });

  const handleFilterChange = (type: keyof Filters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [type]: prev[type] === value ? "" : value,
    }));
    setCurrentPage(1); // reset page kalau filter berubah
  };

  useEffect(() => {
    const fetchMajors = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getAllMajorCardService();
        setMajors(data);
      } catch (err) {
        console.error(err);
        setError("Gagal mengambil data jurusan");
      } finally {
        setLoading(false);
      }
    };

    fetchMajors();
  }, []);

  /** =========================
   * PAGINATION LOGIC
   * ========================= */
  const totalPages = Math.ceil(majors.length / ITEMS_PER_PAGE);

  const paginatedMajors = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return majors.slice(start, end);
  }, [majors, currentPage]);

  const handlePrev = () => {
    setCurrentPage((p) => Math.max(p - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((p) => Math.min(p + 1, totalPages));
  };

  return (
    <section>
      <HeroSection />

      <div className="px-6 md:px-16 py-12">
        <FilterDropdown filters={filters} onChange={handleFilterChange} />

        {loading && <p>Loading...</p>}
        {!loading && error && <p className="text-red-600">{error}</p>}

        {!loading && !error && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
              {paginatedMajors.map((jurusan) => (
                <JurusanCard
                  key={jurusan.id}
                  jurusan={jurusan}
                  className="h-[280px]"
                />
              ))}
            </div>

            {/* PAGINATION */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-10">
                <Button
                  label="<"
                  variant="outline-dark"
                  onClick={handlePrev}
                  disabled={currentPage === 1}
                />

                <span className="text-neutral font-medium">
                  {currentPage} dari {totalPages}
                </span>

                <Button
                  label=">"
                  variant="outline-dark"
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                />
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default TanyaJurusan;
