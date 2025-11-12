import { useState, useRef, useEffect } from "react";
import FilterSection from "./FilterSection";
import { FILTER_OPTIONS } from "../utils/constant";
import type { Filters } from "./types"; 

interface FilterDropdownProps {
  filters: Filters;
  onChange: (type: keyof Filters, value: string) => void;
}

const FilterDropdown = ({ filters, onChange }: FilterDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getSelectedText = () => {
    const { jenisKampus, akreditasi } = filters;
    if (!jenisKampus && !akreditasi) return "Pilih Kategori Jurusan";
    const parts = [jenisKampus, akreditasi && `Akreditasi ${akreditasi}`].filter(Boolean);
    return parts.join(", ");
  };

  return (
    <div className="max-w-sm mb-10 relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full cursor-pointer rounded-lg border border-primary-300 p-3 text-left text-neutral-800 bg-white flex items-center justify-between transition-all focus:outline-none focus:ring-2 focus:ring-[#00A9A4]"
      >
        <span className={filters.jenisKampus || filters.akreditasi ? "text-neutral-800" : "text-neutral-500"}>
          {getSelectedText()}
        </span>
        <svg
          className={`w-5 h-5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div
        className={`absolute z-50 w-full mt-2 bg-white rounded-lg border border-neutral-300 shadow-lg overflow-hidden transition-all duration-300 origin-top ${
          isOpen ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0 pointer-events-none"
        }`}
      >
        <div className="p-4">
          <div className="bg-yellow-300 text-neutral font-medium shadow-sm text-sm px-3 py-1.5 rounded inline-block mb-4">
            Filter
          </div>
          <div className="border-1 border-neutral mb-10"></div>

          <FilterSection
            title="Jenis Kampus"
            options={FILTER_OPTIONS.jenisKampus}
            selected={filters.jenisKampus}
            onChange={(v) => onChange("jenisKampus", v)}
          />

          <FilterSection
            title="Akreditasi"
            options={FILTER_OPTIONS.akreditasi}
            selected={filters.akreditasi}
            onChange={(v) => onChange("akreditasi", v)}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterDropdown;
