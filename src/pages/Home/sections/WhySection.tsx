import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Map from "@/assets/images/Map.png";
import Compass from "@/assets/images/Compass.png";
import Lighthouse from "@/assets/images/Lighthouse.png";

const WhySection = () => {
  const [, setActiveSlide] = useState(0);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    dotsClass: "slick-dots custom-dots",
    centerMode: true,
    centerPadding: "100px",
    afterChange: (current: number) => setActiveSlide(current), 
  };

  const cards = [
    {
      title: "Rekomendasi Jurusan yang Tepat Buat Kamu",
      desc: "Temukan jurusan yang paling cocok dengan minat, cara belajar, dan kepribadianmu lewat tes TanyaKampus. Hasilnya bukan asal tebak - tapi dirancang biar kamu kuliah di tempat yang benar benar pas.",
      bg: "bg-primary-300",
      img: Map,
    },
    {
      title: "Bantu Kamu Yakin Ambil Langkah Kuliah",
      desc: "Dapatkan insight karier, arah pengembangan diri, dan panduan kuliah yang bikin kamu nggak salah pilih masa depan. TanyaKampus bantu kamu melangkah dengan percaya diri.",
      bg: "bg-secondary-300",
      img: Compass,
    },
    {
      title: "Bimbingan Pilih Kampus Tanpa Ribet",
      desc: "Dari hasil tes, kamu bisa langsung lihat kampus mana yang sesuai dengan jurusan impianmu semua dirangkum rapi biar kamu bisa bandingin dengan mudah",
      bg: "bg-tertiary-300",
      img: Lighthouse,
    },
  ];

  return (
    <section className="px-0 md:px-16 overflow-hidden -mt-34">
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          Kenapa Harus TanyaKampus?
        </h2>
        <p className="text-gray-500 mt-2">
          Yuk temukan kampus yang cocok dengan kepribadian dan minat kamu!
        </p>
      </div>

      <Slider {...settings}>
        {cards.map((item, index) => {
          return (
            <div key={index} className="px-4">
              <div
                className={`relative rounded-2xl overflow-hidden p-6 md:p-10 ${item.bg} ${
                    index === 1 ? "text-neutral" : "text-white"
                } h-[369px] transition-colors duration-300`}
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="absolute bottom-0 left-0 w-36 md:w-64 object-contain pointer-events-none"
                />
                <div className="relative z-20 flex items-center h-full">
                  <div className="md:pl-44">
                    <h3 className="text-4xl font-bold mb-3">{item.title}</h3>
                    <p className="text-lg">{item.desc}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </section>
  );
};

export default WhySection;
