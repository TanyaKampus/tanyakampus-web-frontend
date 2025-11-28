// src/data/datadetailkampus.ts
import { programStudi } from "./dataProgramStudi";
import LogoUnikom from "@/assets/images/logounikomnew.png";
import LogoITB from "@/assets/images/LogoITBnew.png";
import Unikom1 from "@/assets/images/UNIKOM.jpg";
import Unikom2 from "@/assets/images/Unikom2.png";
import Unikom3 from "@/assets/images/Unikom3.png";
import ITB1 from "@/assets/images/ITB1.png";
import ITB2 from "@/assets/images/ITB2.png";
import ITB3 from "@/assets/images/ITB3.png";

export const dataDetailKampus = [
  {
    id: "unikom",
    nama: "Universitas Komputer Indonesia (UNIKOM)",
    logo: LogoUnikom,
    kategori: ["Swasta", "Unggul", "Kota Bandung"],

    carouselImages: [Unikom1, Unikom2, Unikom3],

    deskripsi: `
      Universitas Komputer Indonesia (UNIKOM) adalah perguruan tinggi swasta di Bandung yang berdiri sejak tahun 2000. Fokus utamanya pada teknologi informasi, desain, dan bisnis kreatif yang terintegrasi dengan kewirausahaan digital.
    `,

    programStudi: programStudi["unikom"],

    alamatKampus: {
      alamatLengkap:
        "Jl. Dipatiukur No. 102–118, Kota Bandung, Jawa Barat 40132",
      telepon: "(022) 2504119",
      website: "https://www.unikom.ac.id",
      instagram: "@unikom_official",
      mapEmbed:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4873.9236228925865!2d107.61290647499618!3d-6.887010993112002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e6f8aa08188b%3A0x632d24e6061e8903!2sUniversitas%20Komputer%20Indonesia%20(UNIKOM)!5e1!3m2!1sid!2sid!4v1764268628891!5m2!1sid!2sid",
    },
  },

  {
    id: "itb",
    nama: "Institut Teknologi Bandung (ITB)",
    logo: LogoITB,
    kategori: ["Negeri", "Unggul", "Kota Bandung"],

    carouselImages: [ITB1,ITB2,ITB3],

    deskripsi: `
      Institut Teknologi Bandung (ITB) adalah perguruan tinggi negeri yang berfokus pada sains, teknologi, seni, dan manajemen. Berdiri sejak 1920 dan menjadi salah satu kampus terbaik di Indonesia.
    `,

    programStudi: programStudi["itb"],

    alamatKampus: {
      alamatLengkap: "Jl. Ganesha No. 10, Kota Bandung, Jawa Barat 40132",
      telepon: "(022) 2500935",
      website: "https://www.itb.ac.id",
      instagram: "@itb1920",
      mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d77982.22700071114!2d107.53397354863279!3d-6.890361699999992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e65767c9b183%3A0x2478e3dcdce37961!2sInstitut%20Teknologi%20Bandung!5e1!3m2!1sid!2sid!4v1764269874249!5m2!1sid!2sid",
    },
  },
];
