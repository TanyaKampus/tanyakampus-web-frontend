import Accordion, { type AccordionData } from "@/components/Accordion";
import BG from "@/assets/images/AccordionBG.png";
import LuluBodas from "@/assets/images/LuluBodas.png";

const AccordionSection = () => {
  const accordionItems: AccordionData[] = [
    {
      id: "1",
      title: "Kecerdasan",
      content: (
        <p>
          Ini adalah konten untuk bagian Kecerdasan & Kepintaran. Anda bisa
          memasukkan teks, gambar, atau komponen React lainnya di sini.
        </p>
      ),
    },
    {
      id: "2",
      title: "Penolong",
      content: (
        <p>
          Ini adalah konten untuk bagian Penolong & Pemandu. Penjelasan lebih
          lanjut akan muncul di sini.
        </p>
      ),
    },
    {
      id: "3",
      title: "Prestasi",
      content: (
        <ul className="space-y-2">
          <li className="list-disc ml-5">
            Mendapatkan nilai sempurna di ujian.
          </li>
          <li className="list-disc ml-5">
            Menjuarai kompetisi tingkat nasional.
          </li>
          <li className="list-disc ml-5">Lulus dengan predikat cum laude.</li>
        </ul>
      ),
    },
    {
      id: "4",
      title: "Kesuskesan Masa Depan",
      content: (
        <p>
          Definisi dan langkah-langkah untuk mencapai kesuksesan masa depan
          Anda.
        </p>
      ),
    },
  ];

  return (
    <section className="relative py-40 min-h-screen flex items-center justify-center p-4 overflow-hidden">
      <img
        src={BG}
        alt="Latar belakang abstrak"
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      />
      <div className="relative z-20 container mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16">
          
          <div className="flex-shrink-0 w-full max-w-sm lg:w-5/12">
            <img 
              src={LuluBodas} 
              className="w-full h-auto object-contain rounded-2xl" 
              alt="Lulu Bodas"
            />
          </div>
          
          <div className="w-full lg:w-7/12">
            <Accordion items={accordionItems} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccordionSection;
