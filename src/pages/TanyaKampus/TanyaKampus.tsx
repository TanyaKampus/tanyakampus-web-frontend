import { useEffect, useMemo, useState } from "react";
import HeroSection from "./HeroSection";
import FilterDropdown from "./components/FilterDropdown";
import type { Filters } from "./components/types";
import KampusCard from "@/pages/Home/components/KampusCard";
import { getAllCampus, type Campus } from "@/services/campus.service";
import Button from "@/components/Button";

const PAGE_SIZE = 6;

const TanyaKampus = () => {
  const [filters, setFilters] = useState<Filters>({
    jenisKampus: "",
    akreditasi: "",
  });

  const [allItems, setAllItems] = useState<Campus[]>([]);
  const [filteredItems, setFilteredItems] = useState<Campus[]>([]);
  const [pageItems, setPageItems] = useState<Campus[]>([]);

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* =====================
     FETCH SEMUA DATA
     ===================== */
  useEffect(() => {
    const fetchCampus = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await getAllCampus({
          page: 1,
          limit: 1000, // 🔥 ambil banyak
        });

        setAllItems(res.data || []);
      } catch {
        setError("Gagal mengambil data kampus");
        setAllItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCampus();
  }, []);

  /* =====================
     FILTER FRONTEND
     ===================== */
  useEffect(() => {
    let result = [...allItems];

    if (filters.jenisKampus) {
      result = result.filter(
        (k) =>
          k.jenis_kampus.toLowerCase() ===
          filters.jenisKampus.toLowerCase()
      );
    }

    if (filters.akreditasi) {
      result = result.filter(
        (k) =>
          k.akreditasi.toLowerCase() ===
          filters.akreditasi.toLowerCase()
      );
    }

    setFilteredItems(result);
    setPage(1); // reset page saat filter berubah
  }, [filters, allItems]);

  /* =====================
     PAGINATION FRONTEND
     ===================== */
  const totalPages = Math.ceil(filteredItems.length / PAGE_SIZE);

  useEffect(() => {
    const start = (page - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    setPageItems(filteredItems.slice(start, end));
  }, [page, filteredItems]);

  /* =====================
     HANDLER
     ===================== */
  const handleFilterChange = (type: keyof Filters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [type]: prev[type] === value ? "" : value,
    }));
  };

  const pageLabel = useMemo(
    () => `${page} dari ${totalPages || 1}`,
    [page, totalPages]
  );

  return (
    <section>
      <HeroSection />

      <div className="px-6 md:px-23 py-12">
        <FilterDropdown filters={filters} onChange={handleFilterChange} />

        {loading && <p>Loading...</p>}
        {!loading && error && <p className="text-red-600">{error}</p>}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
            {pageItems.length === 0 && (
              <p className="col-span-full text-neutral-500">
                Tidak ada kampus sesuai filter
              </p>
            )}

            {pageItems.map((kampus) => (
              <KampusCard
                key={kampus.kampus_id}
                kampus={kampus}
                className="h-[350px]"
              />
            ))}
          </div>
        )}

        {/* PAGINATION TIDAK PERNAH HILANG */}
        {!loading && !error && totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-10">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              <Button label="<" variant="outline-dark" />
            </button>

            <span className="text-neutral font-medium">{pageLabel}</span>

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
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
