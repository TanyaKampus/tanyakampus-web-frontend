import { useEffect, useMemo, useState } from "react";
import JurusanCard from "@/pages/Home/components/JurusanCard";
import Button from "@/components/Button";
import { getFavoriteMajorService } from "@/services/favorite.service";
import type { MajorCard } from "@/services/major.service";

const ITEMS_PER_PAGE = 3;

const ProfileFavoritJurusan = () => {
  const [data, setData] = useState<MajorCard[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      const res = await getFavoriteMajorService();

      const mapped: MajorCard[] = res.data.map((item: any) => ({
        id: item.jurusan.jurusan_id,
        name: item.jurusan.nama_jurusan,
        icon: item.jurusan.icon,
        bidangName: item.jurusan.bidang?.nama_bidang || "-",
      }));

      setData(mapped);
    } catch (err) {
      console.error("Fetch favorite error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUnfavorite = (id: string) => {
    setData((prev) => prev.filter((j) => j.id !== id));
  };

  const totalPages = Math.max(1, Math.ceil(data.length / ITEMS_PER_PAGE));

  const currentData = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return data.slice(start, start + ITEMS_PER_PAGE);
  }, [data, currentPage]);

  return (
    <div>
      <h1 className="text-3xl font-bold">Jurusan Favorit</h1>
      <p className="text-gray-400 mt-1">Jurusan yang telah kamu simpan</p>

      {loading && <p>Loading...</p>}

      <div className="flex flex-col gap-6 mt-6">
        {currentData.length === 0 && (
          <p className="text-gray-500">Belum ada jurusan favorit</p>
        )}

        {currentData.map((jurusan) => (
          <JurusanCard
            jurusan={jurusan}
            isFavorite
            variant="favorite"
            onUnfavorite={handleUnfavorite}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-4 mt-10">
          <Button
            label="<"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          />
          <span>
            {currentPage} dari {totalPages}
          </span>
          <Button
            label=">"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          />
        </div>
      )}
    </div>
  );
};

export default ProfileFavoritJurusan;
