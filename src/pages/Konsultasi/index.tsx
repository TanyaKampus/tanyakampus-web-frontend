import CTASection from "./sections/CTASection";
import HeroSection from "./sections/HeroSection";
import { useEffect, useMemo, useState } from "react";
import MentorsCard from "@/components/MentorsCard";
import Button from "@/components/Button";
import {
  getAllMentorsCardService,
  type MentorsCardItem,
} from "@/services/mentor.service";

const ITEMS_PER_PAGE = 6;

const Konsultasi = () => {
  const [allMentors, setAllMentors] = useState<MentorsCardItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getAllMentorsCardService();
        console.log(data)
        setAllMentors(data);
        setCurrentPage(1);
      } catch (e) {
        setError("Gagal mengambil data mentor.");
      } finally {
        setLoading(false);
      }
    };

    fetchMentors();
  }, []);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(allMentors.length / ITEMS_PER_PAGE)),
    [allMentors.length],
  );

  const currentData = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return allMentors.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [allMentors, currentPage]);

  const handlePrev = () => setCurrentPage((prev) => Math.max(1, prev - 1));
  const handleNext = () =>
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));

  return (
    <div>
      <HeroSection />
      <CTASection />

      {loading && <p className="text-center mt-10">Loading...</p>}
      {!loading && error && (
        <p className="text-center mt-10 text-red-600">{error}</p>
      )}

      {!loading && !error && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-14">
            {currentData.map((mentor) => (
              <MentorsCard
                key={mentor.id}
                {...mentor}
                className="w-full h-[350px]"
              />
            ))}
          </div>

          <div className="flex justify-center items-center gap-4 mt-10 mb-20">
            <Button
              label="<"
              variant="outline-dark"
              onClick={handlePrev}
              disabled={currentPage === 1}
            />

            <span className="text-neutral font-medium">
              {currentPage} dari {totalPages}
            </span>

            <Button
              label=">"
              variant="outline-dark"
              onClick={handleNext}
              disabled={currentPage === totalPages}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Konsultasi;
