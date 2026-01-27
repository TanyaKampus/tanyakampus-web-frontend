import { useEffect, useMemo, useState } from "react";
import Button from "@/components/Button";
import HeroSection from "./HeroSection";
import JurusanCard from "../Home/components/JurusanCard";
import axios from "axios";
import {
  getAllMajorCardService,
  type MajorCard,
  type MajorMeta,
} from "@/services/major.service";

const ITEMS_PER_PAGE = 6;

type ApiErrorResponse = {
  message?: string;
  error?: string;
};

const emptyMeta: MajorMeta = {
  total: 0,
  page: 1,
  limit: ITEMS_PER_PAGE,
  totalPages: 1,
  hasNextPage: false,
  hasPrevPage: false,
};

const TanyaJurusan = () => {
  const [majors, setMajors] = useState<MajorCard[]>([]);
  const [meta, setMeta] = useState<MajorMeta>(emptyMeta);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [page, setPage] = useState(1);

  const fetchMajors = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await getAllMajorCardService({
        page,
        limit: ITEMS_PER_PAGE,
      });

      setMajors(res.data);
      setMeta(res.meta);
    } catch (err: unknown) {
      if (axios.isAxiosError<ApiErrorResponse>(err)) {
        setError(
          err.response?.data?.message ||
            err.response?.data?.error ||
            err.message ||
            "Gagal mengambil data jurusan",
        );
      } else {
        setError("Terjadi error tak terduga");
      }

      setMajors([]);
      setMeta(emptyMeta);
    } finally {
      setLoading(false);
    }
  };

  // fetch saat page berubah
  useEffect(() => {
    fetchMajors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const canPrev = meta.hasPrevPage;
  const canNext = meta.hasNextPage;

  const pageLabel = useMemo(() => {
    const totalPages = meta.totalPages || 1;
    return `${meta.page || page} dari ${totalPages}`;
  }, [meta.page, meta.totalPages, page]);

  return (
    <section>
      <HeroSection />

      <div className="px-6 md:px-16 py-12">
        {loading && <p>Loading...</p>}
        {!loading && error && <p className="text-red-600">{error}</p>}

        {!loading && !error && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
              {majors.map((jurusan) => (
                <JurusanCard
                  key={jurusan.id}
                  jurusan={jurusan}
                  className="h-[280px]"
                />
              ))}
            </div>

            {/* PAGINATION */}
            {(meta.totalPages ?? 1) > 1 && (
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
          </>
        )}
      </div>
    </section>
  );
};

export default TanyaJurusan;
