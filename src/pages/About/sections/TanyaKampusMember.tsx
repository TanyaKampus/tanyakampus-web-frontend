import React from "react";
import MemberCard from "../components/MemberCard";
import LuluCard from "../components/LuluCard";

import Member1 from "@/assets/images/Marco.png";
import Member2 from "@/assets/images/Hanip.png";
import Member3 from "@/assets/images/Rafli.png";
import Member4 from "@/assets/images/Kya.png";
import Member5 from "@/assets/images/Marpa.png";
import Member6 from "@/assets/images/Gifar.png";
import Member7 from "@/assets/images/Erga.png";

const members = [
  { image: Member1, name: "Rizki Maulana Ramadhan", role: "Project Manager & UI/UX", quote: "404 Not Found" },
  { image: Member2, name: "Raden Hanif Abdul Hakim", role: "Frontend Engineer", quote: "Ga habis thinking sama ni project" },
  { image: Member3, name: "Rafli Alamsyah", role: "Backend Engineer", quote: "Ga habis thinking sama ni project" },
  { image: Member4, name: "Rizkya Putri Yustiawan", role: "System Analysis", quote: "Ga habis thinking sama ni project" },
  { image: Member5, name: "Marva Zahra", role: "Business Analyst", quote: "Ga habis thinking sama ni project" },
  { image: Member6, name: "M. Al-Giffari", role: "Frontend Engineer", quote: "Mikis Kird" },
  { image: Member7, name: "Erga Firmanda", role: "Graphic Design", quote: "Ga habis thinking sama ni project" },
];

const TanyaKampusMember: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <h2 className="text-3xl font-bold text-center mb-12 text-neutral">
        Kenalan sama tim <br /> TanyaKampus!
      </h2>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 auto-rows-fr">
        {members.slice(0, 3).map((member) => (
          <MemberCard key={member.name} {...member} />
        ))}

        <div className="lg:row-span-1">
          <LuluCard />
        </div>

        {members.slice(3).map((member) => (
          <MemberCard key={member.name} {...member} />
        ))}
      </div>
    </section>
  );
};

export default TanyaKampusMember;
