import { useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";

const faqs = [
  {
    question: "Apa itu TanyaKampus?",
    answer: `TanyaKampus adalah platform yang bantu kamu menemukan jurusan dan karier yang paling cocok dengan minat serta kepribadianmu. 
    Semudah isi tes, hasilnya langsung bisa kamu lihat dan pahami.`,
  },
  {
    question: "Tesnya kayak gimana sih?",
    answer:
      "Tesnya berupa beberapa pertanyaan ringan tentang minat, caraa berpikir, dan hal yang kamu suka. Nggak perlu belajar kok - jawab aja sesuai diri kamu!",
  },
  {
    question: "Apakah hasil tesnya bisa dipercaya?",
    answer:
      "Iya! Tes ini disusun berdasarkan metode psikologi minat bakat dan udah diuji ke banyak siswa SMA. Tujuannya bukan menlai, tapi mmebantu kamu mengenali potensi diri",
  },
  {
    question: "Apakah ikut TanyaKampus itu gratis?",
    answer: "Yap, gratis untuk tes dasar! Kamu bisa langsung coba tanpa login dulu. Nanti kalau mau simpan hasil atau lanjut ke rekomendasi kampus, baru deh login dulu.",
  },
];

const AccordionSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full flex flex-col items-center py-16 px-6 relative overflow-hidden">
      <h1 className="text-2xl max-w-lg font-bold text-center text-neutral mb-3">
        Tanya yang Sering Muncul di Laut TanyaKampus
      </h1>
      <p className="text-neutral font-medium text-center max-w-sm mb-10">
        Masih penasaran tentang cara kerja TanyaKampus? Yuk, baca jawaban dari
        Lulu di bawah ini!
      </p>

      <div className="w-full max-w-2xl space-y-5">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              onClick={() => toggleAccordion(index)}
              className={`transition-all duration-500 ease-in-out rounded-2xl cursor-pointer ${
                isOpen
                  ? "bg-transparent shadow-md"
                  : "bg-transparent"
              }`}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5">
                <h3
                  className={`text-base font-semibold transition-colors duration-300 ${
                    isOpen ? "text-neutral" : "text-neutral"
                  }`}
                >
                  {faq.question}
                </h3>

                {/* Icon animasi */}
                <div
                  className={`bg-primary-300 w-10 h-10 rounded-full flex items-center justify-center text-white transform transition-transform duration-300 ${
                    isOpen ? "rotate-90" : "rotate-0"
                  }`}
                >
                  {isOpen ? <FaTimes size={14} /> : <FaPlus size={14} />}
                </div>
              </div>

              {/* Body */}
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out px-6 ${
                  isOpen ? "max-h-60 pb-6" : "max-h-0"
                }`}
              >
                <p className="text-neutral text-base max-w-lg leading-relaxed whitespace-pre-line">
                  {faq.answer}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AccordionSection;
