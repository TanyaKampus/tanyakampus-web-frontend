import { useEffect, useMemo, useState } from "react";
import JurusanCard from "../Home/components/JurusanCard";
import Button from "@/components/Button";
import { getFavoriteMajorService } from "@/services/favorite.service";
import type { MajorCard } from "@/services/major.service";

const ITEMS_PER_PAGE = 3;

const ProfileFavoritJurusan = () => {
  const [data, setData] = useState<MajorCard[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setLoading(true);
        const res = await getFavoriteMajorService();

        // 🔁 MAP BACKEND → MajorCard
        const mapped: MajorCard[] = res.data.map((item: any) => ({
          id: item.jurusan.jurusan_id,
          name: item.jurusan.nama_jurusan,
          icon: item.jurusan.icon,
          bidangName: item.jurusan.bidang?.nama_bidang || "-",
        }));

        setData(mapped);
      } catch (err: any) {
        setError(
          err.response?.data?.message || "Gagal mengambil jurusan favorit"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  // PAGINATION
  const totalPages = Math.max(1, Math.ceil(data.length / ITEMS_PER_PAGE));

  const currentData = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return data.slice(start, start + ITEMS_PER_PAGE);
  }, [data, currentPage]);

  return (
    <div>
      <h1 className="text-3xl text-neutral font-bold">Jurusan Favorit</h1>
      <p className="mt-2 text-[#BDBDBD] text-lg">
        Simpan jurusan pilihanmu agar mudah dibandingkan dan diakses kapan saja.
      </p>

      <div className="my-6 bg-[#D9D9D9] w-full h-0.5"></div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <>
          <div className="flex flex-col items-center gap-6">
            {currentData.length === 0 && (
              <p className="text-gray-500">Belum ada jurusan favorit</p>
            )}

            {currentData.map((jurusan) => (
              <JurusanCard
                key={jurusan.id}
                jurusan={jurusan}
                className="h-[150px] w-full"
              />
            ))}
          </div>

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-10">
              <Button
                label="<"
                variant="outline-dark"
                onClick={() =>
                  setCurrentPage((prev) => Math.max(1, prev - 1))
                }
                disabled={currentPage === 1}
              />

              <span className="text-neutral font-medium">
                {currentPage} dari {totalPages}
              </span>

              <Button
                label=">"
                variant="outline-dark"
                onClick={() =>
                  setCurrentPage((prev) =>
                    Math.min(totalPages, prev + 1)
                  )
                }
                disabled={currentPage === totalPages}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProfileFavoritJurusan;
