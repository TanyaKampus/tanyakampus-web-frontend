import { useState } from "react";
import AccordionItem from "@/components/AccordionItem"; 
import { faqs } from "@/data/faqs";
import Vector from '@/assets/images/AccordionVector.png';

const AccordionSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  return (
    <section className="w-full flex flex-col items-center py-28 px-6 relative overflow-hidden">
      <img
        src={Vector}
        alt="Decorative Vector"
        className="absolute bottom-0 left-0 h-[450px] pointer-events-none"
      />

      <h1 className="text-2xl max-w-lg font-bold text-center text-neutral mb-3 z-10">
        Tanya yang Sering Muncul di Laut TanyaKampus
      </h1>
      <p className="text-neutral font-medium text-center max-w-sm mb-10 z-10">
        Masih penasaran tentang cara kerja TanyaKampus? Yuk, baca jawaban dari Lulu di bawah ini!
      </p>

      <div className="w-full max-w-2xl space-y-5 z-10">
        {faqs.map((faq, index) => (
          <AccordionItem
            key={index}
            index={index}
            question={faq.question}
            answer={faq.answer}
            isOpen={openIndex === index}
            onToggle={() => handleToggle(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default AccordionSection;
