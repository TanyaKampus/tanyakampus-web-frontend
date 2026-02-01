import { useState } from "react";
import BreadCrumbs from "@/components/BreadCrumbs";
import Like from "@/assets/images/love.png";
import Likeactive from "@/assets/images/loveactive.png";
import { addFavoriteMajorService } from "@/services/favorite.service";
import { toastError, toastSuccess } from "@/components/Toast";
import axios from "axios";

type Props = {
  jurusan: {
    jurusan_id: string;
    nama_jurusan: string;
    deskripsi?: string;
    icon?: string | null;
    bidang: {
      bidang_id: string;
      nama_bidang: string;
      deskripsi?: string;
    };
  };
};

const HeroDetailJurusan: React.FC<Props> = ({ jurusan }) => {
  const [liked, setLiked] = useState(false);
  const [loadingLike, setLoadingLike] = useState(false);

  const handleLike = async () => {
    if (loadingLike) return;

    try {
      setLoadingLike(true);
      await addFavoriteMajorService(jurusan.jurusan_id);
      setLiked(true);
      toastSuccess("Berhasil Menambahkan Jurusan ke Favorit!");
    } catch (err: unknown) {
      // ✅ no-any: aman & rapi
      if (axios.isAxiosError(err)) {
        const status = err.response?.status;
        const msg =
          (err.response?.data as { message?: string } | undefined)?.message ??
          err.message;

        // contoh: favorit sudah ada biasanya 409 / 400 (tergantung backend)
        if (status === 409) {
          toastError("Jurusan sudah ada dalam Favorite");
          return;
        }

        // fallback message dari backend/axios
        toastError(msg || "Gagal menambahkan favorit");
        return;
      }

      // non-axios error
      toastError("Terjadi kesalahan. Coba lagi.");
    } finally {
      setLoadingLike(false);
    }
  };

  return (
    <div className="relative pb-24 bg-[#E2F2F2] text-[#5C5C5C] px-6 md:px-16 py-12">
      {/* Breadcrumb */}
      <div className="absolute top-4 left-6 md:left-16 z-10">
        <BreadCrumbs />
      </div>

      <div className="flex items-start gap-10 pt-16 relative">
        {/* ICON */}
        <div className="w-40 h-40 flex items-center justify-center bg-white rounded-xl shadow-md">
          {jurusan.icon ? (
            <img
              src={jurusan.icon}
              alt={jurusan.nama_jurusan}
              className="w-full h-full object-contain p-6"
            />
          ) : (
            <span className="text-gray-400">ICON</span>
          )}
        </div>

        {/* LIKE */}
        <button
          onClick={handleLike}
          disabled={loadingLike}
          className="absolute top-16 right-0"
          aria-label="Tambah ke favorit"
        >
          <div
            className={`w-9 h-9 transition-all ${
              liked ? "scale-110 opacity-100" : "opacity-60"
            } ${loadingLike ? "opacity-40" : ""}`}
          >
            <img
              src={liked ? Likeactive : Like}
              alt="like"
              className="w-full h-full object-contain"
            />
          </div>
        </button>

        {/* INFO */}
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-bold">{jurusan.nama_jurusan}</h1>

          <span className="inline-block bg-white px-4 py-1 rounded-full text-sm font-semibold text-primary-300 w-fit">
            {jurusan.bidang.nama_bidang}
          </span>

          {/* ✅ tampilkan deskripsi jurusan kalau ada,
              fallback ke deskripsi bidang kalau jurusan kosong */}
          {(jurusan.deskripsi || jurusan.bidang.deskripsi) && (
            <p className="mt-4 text-gray-700 max-w-2xl leading-relaxed">
              {jurusan.deskripsi ?? jurusan.bidang.deskripsi}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroDetailJurusan;
