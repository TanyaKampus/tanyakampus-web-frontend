import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { MajorCard } from "@/services/major.service";
import Like from "@/assets/images/love.png";
import LikeActive from "@/assets/images/loveactive.png";
import {
  addFavoriteMajorService,
  removeFavoriteMajorService,
} from "@/services/favorite.service";

interface JurusanCardProps {
  jurusan: MajorCard;
  className?: string;
  isFavorite?: boolean;
  onUnfavorite?: (id: string) => void;
  variant?: "default" | "favorite";
}

const JurusanCard: React.FC<JurusanCardProps> = ({
  jurusan,
  className = "",
  isFavorite = false,
  onUnfavorite,
  variant = "default",
}) => {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(isFavorite);
  const [loading, setLoading] = useState(false);

  const handleNavigate = () => {
    navigate(`/tanya-jurusan/${jurusan.id}`);
  };

  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (loading) return;

    try {
      setLoading(true);

      if (liked) {
        await removeFavoriteMajorService(jurusan.id);
        setLiked(false);
        onUnfavorite?.(jurusan.id);
      } else {
        await addFavoriteMajorService(jurusan.id);
        setLiked(true);
      }
    } catch (err) {
      console.error("Favorite error:", err);
    } finally {
      setLoading(false);
    }
  };

  const sizeClass =
    variant === "favorite"
      ? "w-full h-[140px]"
      : "w-[360px] h-[200px]";

  return (
    <div
      onClick={handleNavigate}
      className={`
        relative
        ${sizeClass}
        rounded-xl
        overflow-hidden
        shadow-md
        hover:shadow-lg
        transition
        cursor-pointer
        ${className}
      `}
    >
      <img
        src={jurusan.icon}
        alt={jurusan.name}
        className="w-full h-full object-cover"
      />

      {/* BIDANG */}
      <div className="absolute top-3 right-3 bg-white text-secondary-500 px-3 py-1 text-xs font-semibold rounded-full">
        {jurusan.bidangName}
      </div>

      {/* BOTTOM */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-4 py-3">
        <div className="flex justify-between items-end">
          <p className="text-white font-semibold text-base truncate">
            {jurusan.name}
          </p>

          <button
            onClick={handleLike}
            disabled={loading}
            className="w-9 h-9 flex-shrink-0"
          >
            <img
              src={liked ? LikeActive : Like}
              alt="favorite"
              className={`w-full h-full transition ${
                liked ? "scale-110" : "opacity-70"
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default JurusanCard;
