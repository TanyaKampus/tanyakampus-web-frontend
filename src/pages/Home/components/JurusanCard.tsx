import type { Major } from "@/data/dataJurusan";

interface JurusanCardProps {
  jurusan: Major;
}

const JurusanCard: React.FC<JurusanCardProps> = ({ jurusan }) => (
  <div className="relative w-[366px] h-[280px] rounded-xl overflow-hidden shadow-md hover:shadow-lg transition">
    <img
      src={jurusan.image}
      alt={jurusan.name}
      className="w-full h-full object-cover"
    />
    <div className="absolute bg-white text-secondary-500 top-3 right-3 px-3 py-1 text-sm font-semibold rounded-lg">
      {jurusan.category}
    </div>
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-3 text-left">
      <p className="text-white font-semibold">{jurusan.name}</p>
    </div>
  </div>
);

export default JurusanCard;
