import Button from "@/components/Button";
import MentorsCard from "@/components/MentorsCard";
import { mentors } from "@/data/dummyMentor";
import { useState } from "react";

const ProfileFavoritMentor = () => {
    const allMentors = mentors
  
    const ITEMS_PER_PAGE = 3;
    const [currentPage, setCurrentPage] = useState(1);
  
    const totalPages = Math.ceil(allMentors.length / ITEMS_PER_PAGE);
  
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentData = allMentors.slice(
      startIndex,
      startIndex + ITEMS_PER_PAGE
    );
  
  return (
    <div>
      <h1 className="text-3xl text-neutral font-bold">Mentor Favorit</h1>
      <p className="mt-2 text-[#BDBDBD] text-lg">Simpan Mentor pilihanmu agar mudah dibandingkan dan diakses kapan saja.</p>
      <div className="my-6 bg-[#D9D9D9] w-full h-0.5"></div>
            <div className="flex flex-col items-center gap-6">
        {currentData.map((mentor) => (
          <MentorsCard {...mentor} className="w-full h-[150px]"/>
        ))}
      </div>

      <div className="flex justify-center items-center gap-4 mt-10">
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

export default ProfileFavoritMentor;
