import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Button from "@/components/Button";
import JurusanTabs from "../components/JurusanTabs";
import JurusanCard from "../components/JurusanCard";
import Vector from "@/assets/images/JurusanVector.png";
import { getAllMajorCardService, type MajorCard } from "@/services/major.service";
import axios from "axios";

type ApiErrorResponse = {
  message?: string;
  error?: string;
};

function extractMajors(payload: unknown): MajorCard[] {
  // kasus 1: langsung array
  if (Array.isArray(payload)) return payload as MajorCard[];

  // kasus 2: dibungkus object
  if (payload && typeof payload === "object") {
    const obj = payload as Record<string, unknown>;

    const candidates = [
      obj.data, // { data: [...] }
      obj.items, // { items: [...] }
      (obj.data && typeof obj.data === "object"
        ? (obj.data as Record<string, unknown>).items
        : undefined), // { data: { items: [...] } }
    ];

    for (const c of candidates) {
      if (Array.isArray(c)) return c as MajorCard[];
    }
  }

  return [];
}

const RekomendasiJurusanSection = () => {
  const [tabs, setTabs] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<string>("");

  const [allMajors, setAllMajors] = useState<MajorCard[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMajors = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await getAllMajorCardService();
        const items = extractMajors(res);

        setAllMajors(items);

        const uniqTabs = Array.from(
          new Set(
            items
              .map((m) => (m.bidangName ?? "").trim())
              .filter((v) => v.length > 0),
          ),
        );

        setTabs(uniqTabs);
        setActiveTab((prev) => prev || uniqTabs[0] || "");
      } catch (err) {
        if (axios.isAxiosError<ApiErrorResponse>(err)) {
          setError(
            err.response?.data?.message ||
              err.response?.data?.error ||
              err.message ||
              "Gagal mengambil data jurusan",
          );
        } else {
          setError("Terjadi error tak terduga");
        }
        setAllMajors([]);
        setTabs([]);
        setActiveTab("");
      } finally {
        setLoading(false);
      }
    };

    fetchMajors();
  }, []);

  // ✅ jurusanList seperti versi statis kamu (dataJurusan[activeTab])
  const jurusanList = useMemo(() => {
    if (!activeTab) return [];
    return allMajors.filter((m) => (m.bidangName ?? "") === activeTab);
  }, [allMajors, activeTab]);

  // ✅ tampil 3 card
  const top3 = useMemo(() => jurusanList.slice(0, 3), [jurusanList]);

  return (
    <section className="relative overflow-hidden px-16 py-28 text-center">
      <img
        src={Vector}
        alt="Vector"
        className="hidden md:block absolute right-0 top-70 object-cover"
      />

      <div className="relative z-10">
        <h1 className="text-2xl text-neutral md:text-3xl font-bold mb-4">
          Lagi nyari jurusan yang pas?
        </h1>

        <p className="text-neutral mb-8 font-medium max-w-sm text-center m-auto">
          Nih, jurusan ini bisa banget jadi pilihan terbaik buat kamu!
        </p>

        {loading && <p className="text-center">Loading jurusan...</p>}

        {!loading && error && <p className="text-center text-red-600">{error}</p>}

        {!loading && !error && tabs.length > 0 && (
          <>
            <JurusanTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 place-items-center">
              {top3.map((jurusan) => (
                <JurusanCard key={String(jurusan.id)} jurusan={jurusan} />
              ))}
            </div>

            <div className="mt-10">
              <Link to="/tanya-jurusan">
                <Button label="Cari Jurusan Lainnya" variant="outline-dark" className="m-auto" />
              </Link>
            </div>
          </>
        )}

        {!loading && !error && tabs.length === 0 && (
          <p className="text-center text-gray-500">Data jurusan kosong.</p>
        )}
      </div>
    </section>
  );
};

export default RekomendasiJurusanSection;
