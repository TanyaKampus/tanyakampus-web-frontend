import Map from "@/assets/images/Map.png";
import Compass from "@/assets/images/Compass.png";
import Lighthouse from "@/assets/images/Lighthouse.png";
import VectorPrimary from "@/assets/images/VectorPrim100.png";
import VectorSec from "@/assets/images/VectorSec200.png";
import VectorTer from "@/assets/images/VectorTer200.png";

export interface WhyCard {
  title: string;
  desc: string;
  bg: string;
  text: string;
  iconColor: string;
  img: string;
  vector: string;
}

export const whyCardsData: WhyCard[] = [
  {
    title: "Rekomendasi Jurusan yang Tepat Buat Kamu",
    desc: "Temukan jurusan paling cocok dengan minat dan kepribadianmu",
    bg: "bg-primary-300",
    text: "text-white",
    iconColor: "bg-white text-primary-300",
    img: Map,
    vector: VectorPrimary,
  },
  {
    title: "Bantu kamu yakin ambil langkah kuliah",
    desc: "Dapatkan insight dan panduan kuliah",
    bg: "bg-secondary-200",
    text: "text-neutral",
    iconColor: "bg-neutral text-secondary-200",
    img: Compass,
    vector: VectorSec,
  },
  {
    title: "Bimbingan pilih kampus tanpa ribet",
    desc: "Temukan kampus dengan cepat dan mudah",
    bg: "bg-tertiary-300",
    text: "text-white",
    iconColor: "bg-white text-tertiary-300",
    img: Lighthouse,
    vector: VectorTer,
  },
];
