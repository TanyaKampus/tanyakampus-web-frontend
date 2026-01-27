import { useEffect, useState } from "react";
import KampusCard from "../Home/components/KampusCard";
import Button from "@/components/Button";
import { getFavoriteCampusService } from "@/services/favorite.service";

const ITEMS_PER_PAGE = 5;

const ProfileFavoritKampus = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchFavoriteCampus();
  }, []);

  const fetchFavoriteCampus = async () => {
    try {
      setLoading(true);
      const res = await getFavoriteCampusService();
      setData(res.data || []);
    } catch (err) {
      console.error("Gagal mengambil kampus favorit");
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.max(
    1,
    Math.ceil(data.length / ITEMS_PER_PAGE)
  );

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentData = data.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  if (loading) return <p>Loading kampus favorit...</p>;

  return (
    <div>
      <h1 className="text-3xl text-neutral font-bold">Kampus Favorit</h1>
      <p className="mt-2 text-[#BDBDBD] text-lg">
        Simpan kampus pilihanmu agar mudah dibandingkan dan diakses kapan saja.
      </p>

      <div className="my-6 bg-[#D9D9D9] w-full h-0.5"></div>

      {currentData.length === 0 ? (
        <p className="text-center text-neutral mt-10">
          Belum ada kampus favorit
        </p>
      ) : (
        <div className="flex flex-col items-center gap-6">
          {currentData.map((item) => (
            <KampusCard
              key={item.id}
              kampus={item.kampus} // ⬅️ ambil data kampus
              className="w-full h-[150px]"
            />
          ))}
        </div>
      )}

      {data.length > ITEMS_PER_PAGE && (
        <div className="flex justify-center items-center gap-4 mt-10">
          <Button
            label="<"
            variant="outline-dark"
            disabled={currentPage === 1}
            onClick={() =>
              setCurrentPage((p) => Math.max(1, p - 1))
            }
          />

          <span className="text-neutral font-medium">
            {currentPage} dari {totalPages}
          </span>

          <Button
            label=">"
            variant="outline-dark"
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage((p) =>
                Math.min(totalPages, p + 1)
              )
            }
          />
        </div>
      )}
    </div>
  );
};

export default ProfileFavoritKampus;
