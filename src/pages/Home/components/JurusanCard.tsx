import type { MajorCard } from "@/services/major.service";
import { useNavigate } from "react-router-dom";

interface JurusanCardProps {
  jurusan: MajorCard;
  className?: string;
}

const JurusanCard: React.FC<JurusanCardProps> = ({
  jurusan,
  className = "",
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/tanya-jurusan/${jurusan.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className={`relative w-[366px] ${className} rounded-xl overflow-hidden shadow-md hover:shadow-lg transition cursor-pointer`}
    >
      <img
        src={jurusan.icon}
        alt={jurusan.name}
        className="w-full h-full object-cover"
      />

      <div className="absolute bg-white text-secondary-500 top-3 right-3 px-3 py-1 text-sm font-semibold rounded-lg">
        {jurusan.bidangName}
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-3 text-left">
        <p className="text-white font-semibold">{jurusan.name}</p>
      </div>
    </div>
  );
};

export default JurusanCard;
