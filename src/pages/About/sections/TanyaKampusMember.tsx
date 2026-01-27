// src/pages/Tentang/sections/TanyaKampusMember.tsx
import React, { useEffect, useState } from "react";
import MemberCard from "../components/MemberCard";
import LuluCard from "../components/LuluCard";

import type { MentorCard } from "@/services/mentor.service";
import { getAllMentorCardService } from "@/services/mentor.service";

// fallback lokal kalau backend belum ada data
import Member1 from "@/assets/images/Marco.png";
import Member2 from "@/assets/images/Hanip.png";
import Member3 from "@/assets/images/Rafli.png";
import Member4 from "@/assets/images/Kya.png";
import Member5 from "@/assets/images/Marpa.png";
import Member6 from "@/assets/images/Gifar.png";
import Member7 from "@/assets/images/Erga.png";

const fallbackMembers: MentorCard[] = [
  { id: "1", image: Member1, name: "Rizki Maulana Ramadhan", role: "Project Manager & UI/UX", quote: "404 Not Found" },
  { id: "2", image: Member2, name: "Raden Hanif Abdul Hakim", role: "Frontend Engineer", quote: "Ga habis thinking sama ni project" },
  { id: "3", image: Member3, name: "Rafli Alamsyah", role: "Backend Engineer", quote: "Bukan suhu tapi wani di adu" },
  { id: "4", image: Member4, name: "Rizkya Putri Yustiawan", role: "System Analysis", quote: "Ga habis thinking sama ni project" },
  { id: "5", image: Member5, name: "Marva Zahra", role: "Business Analyst", quote: "Ga habis thinking sama ni project" },
  { id: "6", image: Member6, name: "M. Al-Giffari", role: "Frontend Engineer", quote: "Mikis Kird" },
  { id: "7", image: Member7, name: "Erga Firmanda", role: "Graphic Design", quote: "Ga habis thinking sama ni project" },
];

const TanyaKampusMember: React.FC = () => {
  const [members, setMembers] = useState<MentorCard[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        setLoading(true);
        setError("");

        console.log("CALL /api/mentor START");
        const data = await getAllMentorCardService();
        console.log("CALL /api/mentor SUCCESS:", data);

        // kalau backend kosong, pakai fallback
        setMembers(data.length ? data : fallbackMembers);
      } catch (e: unknown) {
        console.log("CALL /api/mentor ERROR:", e);
        setError("Gagal mengambil data mentor. (pakai fallback)");
        setMembers(fallbackMembers);
      } finally {
        setLoading(false);
      }
    };

    fetchMentors();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <h2 className="text-3xl font-bold text-center mb-12 text-neutral">
        Kenalan sama tim <br /> TanyaKampus!
      </h2>

      {loading && <p className="text-center">Loading...</p>}
      {!loading && error && <p className="text-center text-red-600 mb-6">{error}</p>}

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 auto-rows-fr items-stretch">
        {members.slice(0, 3).map((m) => (
          <MemberCard key={m.id} member={m} />
        ))}

        <div className="lg:row-span-1">
          <LuluCard />
        </div>

        {members.slice(3).map((m) => (
          <MemberCard key={m.id} member={m} />
        ))}
      </div>
    </section>
  );
};

export default TanyaKampusMember;
