import RiwayatTesCard from "@/components/RiwayatTesCard";
import { riwayatTes } from "@/data/dummyRiwayatTes";

const ProfileRiwayatTes = () => {
  return (
    <div>
      <h1 className="text-3xl text-neutral font-bold">Riwayat Tes</h1>
      <p className="mt-2 text-[#BDBDBD] text-lg">
        Simpan hasil tes untuk perbandingan akurat dan analisis perkembangan tesmu
      </p>

      <div className="my-6 bg-[#D9D9D9] w-full h-0.5"></div>

      <div className="flex flex-col gap-6">
        {riwayatTes.map((item) => (
          <RiwayatTesCard
            key={item.id}
            date={item.date}
            majors={item.majors}
            waitingCount={item.waitingCount}
          />
        ))}
      </div>
    </div>
  );
};

export default ProfileRiwayatTes;
