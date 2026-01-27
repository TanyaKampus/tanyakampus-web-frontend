import { useEffect, useMemo, useState } from "react";
import Button from "@/components/Button";
import HeroSection from "./HeroSection";
import FilterDropdown from "./components/FilterDropdown";
import type { Filters } from "./components/types";
import KampusCard from "@/pages/Home/components/KampusCard";
import {
  getAllCampus,
  type Campus,
  type CampusMeta,
} from "@/services/campus.service";
import axios from "axios";

const PAGE_SIZE = 6;

type ApiErrorResponse = {
  message?: string;
  error?: string;
};

const emptyMeta: CampusMeta = {
  total: 0,
  page: 1,
  limit: PAGE_SIZE,
  totalPages: 1,
  hasNextPage: false,
  hasPrevPage: false,
};

const TanyaKampus = () => {
  const [filters, setFilters] = useState<Filters>({
    jenisKampus: "",
    akreditasi: "",
  });

  const [items, setItems] = useState<Campus[]>([]);
  const [meta, setMeta] = useState<CampusMeta>(emptyMeta);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ page untuk server-side pagination
  const [page, setPage] = useState(1);

  const handleFilterChange = (type: keyof Filters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [type]: prev[type] === value ? "" : value,
    }));
  };

  // ✅ reset page saat filter berubah
  useEffect(() => {
    setPage(1);
  }, [filters.jenisKampus, filters.akreditasi]);

  const fetchCampus = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await getAllCampus({
        page,
        limit: PAGE_SIZE,
        jenis_kampus: filters.jenisKampus || undefined,
        akreditasi: filters.akreditasi || undefined,
      });

      setItems(res.data || []);
      setMeta(res.meta || emptyMeta);
    } catch (err: unknown) {
      if (axios.isAxiosError<ApiErrorResponse>(err)) {
        setError(
          err.response?.data?.message ||
            err.response?.data?.error ||
            err.message ||
            "Gagal mengambil data kampus",
        );
      } else {
        setError("Terjadi error tak terduga");
      }

      setItems([]);
      setMeta(emptyMeta);
    } finally {
      setLoading(false);
    }
  };

  // ✅ fetch saat page / filter berubah
  useEffect(() => {
    fetchCampus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, filters.jenisKampus, filters.akreditasi]);

  const canPrev = meta.hasPrevPage;
  const canNext = meta.hasNextPage;

  const pageLabel = useMemo(() => {
    const totalPages = meta.totalPages || 1;
    return `${meta.page || page} dari ${totalPages}`;
  }, [meta.page, meta.totalPages, page]);

  return (
    <section>
      <HeroSection />

      <div className="px-6 md:px-23 py-12">
        <FilterDropdown filters={filters} onChange={handleFilterChange} />

        {loading && <p>Loading...</p>}
        {!loading && error && <p className="text-red-600">{error}</p>}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
            {items.map((kampus) => (
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
              onClick={() => canPrev && setPage((p) => Math.max(1, p - 1))}
              disabled={!canPrev}
              className={!canPrev ? "opacity-50 cursor-not-allowed" : ""}
            >
              <Button label="<" variant="outline-dark" />
            </button>

            <span className="text-neutral font-medium">{pageLabel}</span>

            <button
              type="button"
              onClick={() =>
                canNext &&
                setPage((p) => Math.min(meta.totalPages || p + 1, p + 1))
              }
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
