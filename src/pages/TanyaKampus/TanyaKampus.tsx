import { useEffect, useMemo, useState } from "react";
import Button from "@/components/Button";
import HeroSection from "./HeroSection";
import FilterDropdown from "./components/FilterDropdown";
import type { Filters } from "./components/types";
import KampusCard from "@/pages/Home/components/KampusCard";
import {
  getAllCampus,
  type CampusCardProps,
} from "@/services/campus.service";
import axios from "axios";

const PAGE_SIZE = 6;

const TanyaKampus = () => {
  const [filters, setFilters] = useState<Filters>({
    jenisKampus: "",
    akreditasi: "",
  });

  const [allCampus, setAllCampus] = useState<CampusCardProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // pagination
  const [page, setPage] = useState(1);

  const handleFilterChange = (type: keyof Filters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [type]: prev[type] === value ? "" : value,
    }));
  };

  // 🔥 fetch data
  useEffect(() => {
    const fetchCampus = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getAllCampus();
        setAllCampus(data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(
            (err.response?.data as any)?.message ||
              err.message ||
              "Gagal mengambil data kampus"
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

  // ✅ FILTER YANG BENAR
  const filtered = useMemo(() => {
    return allCampus.filter((k) => {
      const okJenis =
        !filters.jenisKampus || k.jenis_kampus === filters.jenisKampus;

      const okAkreditasi =
        !filters.akreditasi || k.akreditasi === filters.akreditasi;

      return okJenis && okAkreditasi;
    });
  }, [allCampus, filters]);

  // reset page kalau filter berubah
  useEffect(() => {
    setPage(1);
  }, [filters]);

  const totalPages = useMemo(() => {
    const t = Math.ceil(filtered.length / PAGE_SIZE);
    return t <= 0 ? 1 : t;
  }, [filtered.length]);

  useEffect(() => {
    setPage((p) => Math.min(Math.max(p, 1), totalPages));
  }, [totalPages]);

  const paginated = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page]);

  const canPrev = page > 1;
  const canNext = page < totalPages;

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
                key={kampus.kampus_id}
                kampus={kampus}
                className="h-[350px]"
              />
            ))}
          </div>
        )}

        {!loading && !error && (
          <div className="flex justify-center items-center gap-4 mt-10">
            <button
              type="button"
              onClick={() => canPrev && setPage((p) => p - 1)}
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
              onClick={() => canNext && setPage((p) => p + 1)}
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
