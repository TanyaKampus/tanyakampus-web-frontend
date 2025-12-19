import { mentors } from "@/data/dummyMentor";
import CTASection from "./sections/CTASection";
import HeroSection from "./sections/HeroSection";
import { useState } from "react";
import MentorsCard from "@/components/MentorsCard";
import Button from "@/components/Button";

const Konsultasi = () => {
  const allMentors = mentors;

  const ITEMS_PER_PAGE = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(allMentors.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentData = allMentors.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  return (
    <div>
      <HeroSection />
      <CTASection />
      <div className="grid grid-cols-3 gap-10 px-14">
        {currentData.map((mentor) => (
          <MentorsCard {...mentor} className="w-full h-[350px]" />
        ))}
      </div>

      <div className="flex justify-center items-center gap-4 mt-10 mb-20">
        <Button
          label="<"
          variant="outline-dark"
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage === 1}
        />

        <span className="text-neutral font-medium">
          {currentPage} dari {totalPages}
        </span>

        <Button
          label=">"
          variant="outline-dark"
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage === totalPages}
        />
      </div>
    </div>
  );
};

export default Konsultasi;
