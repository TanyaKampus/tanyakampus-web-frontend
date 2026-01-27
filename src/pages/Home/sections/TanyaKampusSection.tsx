// src/pages/Home/RecommendationSection.tsx
import { useEffect, useMemo, useState } from "react";
import Button from "@/components/Button";
import CampusCard from "../components/KampusCard";
import Vector from "@/assets/images/RecomVector.png";
import KuraKura from "@/assets/images/KuraKura.png";
import { useNavigate } from "react-router-dom";
import { getAllCampus, type Campus } from "@/services/campus.service";
import axios from "axios";

const SLIDE_INTERVAL = 4000;
const FADE_DURATION = 500;

type ApiErrorResponse = {
  message?: string;
  error?: string;
};

function extractCampuses(payload: unknown): Campus[] {
  // kasus 1: API langsung array
  if (Array.isArray(payload)) return payload as Campus[];

  // kasus 2: API bungkus di object
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
      if (Array.isArray(c)) return c as Campus[];
    }
  }

  return [];
}

const RecommendationSection = () => {
  const navigate = useNavigate();

  const [campuses, setCampuses] = useState<Campus[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleButtonClick = () => navigate("/tanya-kampus");

  useEffect(() => {
    const fetchCampuses = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await getAllCampus();
        // ✅ getAllCampus boleh balikin array / object -> kita normalize
        const list = extractCampuses(res);
        setCampuses(list);
      } catch (err) {
        if (axios.isAxiosError<ApiErrorResponse>(err)) {
          const msg =
            err.response?.data?.message ||
            err.response?.data?.error ||
            err.message ||
            "Gagal mengambil data kampus";
          setError(msg);
        } else {
          setError("Terjadi error tak terduga");
        }
        setCampuses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCampuses();
  }, []);

  useEffect(() => {
    setCurrentIndex(0);
  }, [campuses.length]);

  useEffect(() => {
    if (campuses.length <= 3) return;

    const intervalId = setInterval(() => {
      setIsFading(true);

      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % campuses.length);
        setIsFading(false);
      }, FADE_DURATION);
    }, SLIDE_INTERVAL);

    return () => clearInterval(intervalId);
  }, [campuses.length]);

  const displayCampuses = useMemo(() => {
    if (!campuses.length) return [];
    return Array.from({ length: 3 }, (_, i) => campuses[(currentIndex + i) % campuses.length]);
  }, [campuses, currentIndex]);

  if (loading) return <p className="text-center mt-32">Loading rekomendasi kampus...</p>;
  if (!loading && error) return <p className="text-center mt-32 text-red-600">{error}</p>;
  if (!loading && !error && !campuses.length) return <p className="text-center mt-32">Data kampus kosong.</p>;

  return (
    <section className="relative px-6 md:px-16 lg:px-32 mt-72 overflow-hidden">
      <img
        src={Vector}
        alt="Vector"
        className="absolute left-0 h-[450px] top-[50%] -translate-y-1/2 pointer-events-none"
      />

      <img
        src={KuraKura}
        alt="Kura Kura"
        className="hidden md:block absolute left-0 -bottom-1 z-0 w-[150px]"
      />

      <div className="container mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 px-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 max-w-2xl">
              Kampus ini cocok banget buat kamu
            </h2>
            <p className="text-lg md:text-xl font-medium text-gray-600 mt-4 max-w-md">
              Yuk intip kampus yang cocok banget deh buat kamu!
            </p>
          </div>

          <Button
            label="Cari kampus lainnya"
            variant="outline-dark"
            className="mt-6 md:mt-0"
            onClick={handleButtonClick}
          />
        </div>

        <div
          className={`relative flex justify-center items-center h-[28rem] gap-14 transition-opacity duration-500 ease-in-out ${
            isFading ? "opacity-0" : "opacity-100"
          }`}
        >
          {displayCampuses.map((kampus, i) => {
            const isCenter = i === 1;
            return (
              <div
                key={String(kampus.kampus_id)} // ✅ aman
                className={`transition-all duration-500 ease-in-out ${
                  isCenter ? "scale-110 -translate-y-4 z-10" : "scale-90 blur-xs opacity-70"
                }`}
              >
                <CampusCard kampus={kampus} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RecommendationSection;
