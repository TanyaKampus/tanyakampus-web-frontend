import { useEffect, useMemo, useState } from "react";
import Button from "@/components/Button";
import HeroSection from "./HeroSection";
import FilterDropdown from "./components/FilterDropdown";
import type { Filters } from "./components/types";
import KampusCard from "@/pages/Home/components/KampusCard";
import {
  getAllCampusCardService,
  type CampusCard,
} from "@/services/campus.service";
import axios from "axios";

const PAGE_SIZE = 6;

const TanyaKampus = () => {
  const [filters, setFilters] = useState<Filters>({
    jenisKampus: "",
    akreditasi: "",
  });
  const [allCampus, setAllCampus] = useState<CampusCard[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ pagination state
  const [page, setPage] = useState(1);

  const handleFilterChange = (type: keyof Filters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [type]: prev[type] === value ? "" : value,
    }));
  };

  useEffect(() => {
    const fetchCampus = async () => {
      try {
        setLoading(true);
        setError("");

        console.log("CALL /api/campus START");
        const data = await getAllCampusCardService();
        console.log("CALL /api/campus SUCCESS:", data);

        setAllCampus(data);
      } catch (error) {
        console.error("CALL /api/campus ERROR:", error);

        if (axios.isAxiosError(error)) {
          console.log("STATUS:", error.response?.status);
          console.log("BODY:", error.response?.data);

          setError(
            (error.response?.data as any)?.message ||
              error.message ||
              "Gagal mengambil data kampus",
          );
        } else {
          setError("Terjadi error tak terduga");
        }

        setAllCampus([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCampus();
  }, []);

  // ✅ hasil filter
  const filtered = useMemo(() => {
    return allCampus.filter((k) => {
      const okJenis =
        !filters.jenisKampus || k.category === filters.jenisKampus;
      const okAkreditasi = !filters.akreditasi; // belum support
      return okJenis && okAkreditasi;
    });
  }, [allCampus, filters.jenisKampus, filters.akreditasi]);

  // ✅ kalau filter berubah, balik ke page 1
  useEffect(() => {
    setPage(1);
  }, [filters.jenisKampus, filters.akreditasi]);

  // ✅ total pages berdasarkan hasil filter
  const totalPages = useMemo(() => {
    const t = Math.ceil(filtered.length / PAGE_SIZE);
    return t <= 0 ? 1 : t;
  }, [filtered.length]);

  // ✅ jaga-jaga kalau data berkurang tapi page masih tinggi
  useEffect(() => {
    setPage((p) => Math.min(Math.max(p, 1), totalPages));
  }, [totalPages]);

  // ✅ data yang tampil di halaman sekarang (6 item)
  const paginated = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page]);

  const canPrev = page > 1;
  const canNext = page < totalPages;

  const handlePrev = () => {
    if (!canPrev) return;
    setPage((p) => p - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNext = () => {
    if (!canNext) return;
    setPage((p) => p + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section>
      <HeroSection />

      <div className="px-6 md:px-23 py-12">
        <FilterDropdown filters={filters} onChange={handleFilterChange} />

        {loading && <p>Loading...</p>}
        {!loading && error && <p className="text-red-600">{error}</p>}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
            {paginated.map((kampus) => (
              <KampusCard
                key={kampus.id}
                kampus={kampus}
                className="h-[350px]"
              />
            ))}
          </div>
        )}

        {/* ✅ pagination tetap gaya kamu */}
        {!loading && !error && (
          <div className="flex justify-center items-center gap-4 mt-10">
            <button
              type="button"
              onClick={handlePrev}
              disabled={!canPrev}
              className={!canPrev ? "opacity-50 cursor-not-allowed" : ""}
            >
              <Button label="<" variant="outline-dark" />
            </button>

            <span className="text-neutral font-medium">
              {page} dari {totalPages}
            </span>

            <button
              type="button"
              onClick={handleNext}
              disabled={!canNext}
              className={!canNext ? "opacity-50 cursor-not-allowed" : ""}
            >
              <Button label=">" variant="outline-dark" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default TanyaKampus;
