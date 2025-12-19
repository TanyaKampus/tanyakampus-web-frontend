import React from "react";
import { IoCalendarClear } from "react-icons/io5";
import { MdOutlineFileDownload } from "react-icons/md";
import Button from "./Button";

interface RiwayatTesCardProps {
  date: string;
  majors: string[];
  waitingCount: number;
}

const RiwayatTesCard: React.FC<RiwayatTesCardProps> = ({
  date,
  majors,
  waitingCount,
}) => {
  return (
    <div className="w-full border border-gray-200 rounded-xl p-6 flex justify-between items-start gap-6">
      
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 text-gray-600 text-sm">
          <IoCalendarClear size={24} className="text-primary-300"/>
          <span>{date}</span>
        </div>

        <div className="flex flex-wrap gap-3">
          {majors.map((major, index) => (
            <span
              key={index}
              className="px-2 py-1 border border-secondary-500 text-secondary-500 rounded-lg text-sm"
            >
              {major}
            </span>
          ))}
        </div>

        <p className="text-sm text-gray-700">
          <span className="font-semibold">{waitingCount} Kampus</span>{" "}
          menunggu kamu!
        </p>
      </div>

      <div className="flex flex-col gap-3 min-w-[180px]">
        <Button label="Lihat Hasil" variant="outline-dark"/>
        <Button label="Unduh Hasil" variant="solid-dark" startIcon={<MdOutlineFileDownload size={24}/>}/>
      </div>
    </div>
  );
};

export default RiwayatTesCard;
