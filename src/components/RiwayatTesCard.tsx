import React from "react";
import { IoCalendarClear } from "react-icons/io5";
import { MdOutlineFileDownload } from "react-icons/md";
import Button from "./Button";

interface RiwayatTesCardProps {
  date: string;
  majors: string[];
  waitingCount: number;

  status?: "COMPLETED" | "IN_PROGRESS" | "CANCELLED" | "ABANDONED" | string;
  onView?: () => void;
  onDownload?: () => void;
}

type StatusKey = "COMPLETED" | "IN_PROGRESS" | "CANCELLED" | "ABANDONED";

const statusConfig: Record<StatusKey, { label: string; className: string }> = {
  COMPLETED: {
    label: "Sudah Selesai",
    className: "bg-green-50 text-green-700 border border-green-200",
  },
  IN_PROGRESS: {
    label: "Sedang Dikerjakan",
    className: "bg-yellow-50 text-yellow-700 border border-yellow-200",
  },
  CANCELLED: {
    label: "Dibatalkan",
    className: "bg-red-50 text-red-700 border border-red-200",
  },
  ABANDONED: {
    label: "Meninggalkan Quiz",
    className: "bg-red-50 text-red-700 border border-red-200",
  }
};

const RiwayatTesCard: React.FC<RiwayatTesCardProps> = ({
  date,
  majors,
  waitingCount,
  status = "COMPLETED",
  onView,
  onDownload,
}) => {
  const isCompleted = status === "COMPLETED";

  const badge =
    statusConfig[status as StatusKey] ?? {
      label: String(status ?? "UNKNOWN"),
      className: "bg-gray-50 text-gray-700 border border-gray-200",
    };

  return (
    <div className="w-full border border-gray-200 rounded-xl p-6 flex justify-between items-start gap-6">
      <div className="flex flex-col gap-4">
        {/* DATE + BADGE */}
        <div className="flex items-center gap-2 text-gray-600 text-sm">
          <IoCalendarClear size={24} className="text-primary-300" />
          <span>{date}</span>

          {/* Badge Status */}
          <span
            className={`ml-3 px-3 py-1 rounded-full text-xs font-semibold ${badge.className}`}
          >
            {badge.label}
          </span>
        </div>

        {/* MAJORS */}
        <div className="flex flex-wrap gap-3">
          {(Array.isArray(majors) ? majors : []).map((major, index) => (
            <span
              key={index}
              className="px-2 py-1 border border-secondary-500 text-secondary-500 rounded-lg text-sm"
            >
              {major}
            </span>
          ))}
        </div>

        {/* WAITING COUNT */}
        <p className="text-sm text-gray-700">
          <span className="font-semibold">{waitingCount} Kampus</span>{" "}
          menunggu kamu!
        </p>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex flex-col gap-3 min-w-[180px]">
        <Button
          label="Lihat Hasil"
          variant="outline-dark"
          onClick={onView}
          disabled={!isCompleted}
        />
        <Button
          label="Unduh Hasil"
          variant="solid-dark"
          startIcon={<MdOutlineFileDownload size={24} />}
          onClick={onDownload}
          disabled={!isCompleted}
        />
      </div>
    </div>
  );
};

export default RiwayatTesCard;
