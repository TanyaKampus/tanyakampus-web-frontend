import IF from "@/assets/images/IF.png";
import IS from "@/assets/images/SI.png";
import TEKKOM from "@/assets/images/TekKom.png";
import MANAJ from "@/assets/images/Manajemen.png";
import AKUN from "@/assets/images/Akuntan.png";
import BISDIG from "@/assets/images/Bisdig.png";
import ILKOM from "@/assets/images/Ilkom.png";
import HI from "@/assets/images/HI.png";
import HUKUM from "@/assets/images/Law.png";
import DKV from "@/assets/images/DKV.png";
import DESIN from "@/assets/images/DesInter.png";
import ARSI from "@/assets/images/Arsi.png";

export interface Major {
  name: string;
  image: string;
  category: string;
}

export const dataJurusan: Record<string, Major[]> = {
  "Teknik dan Ilmu Komputer": [
    { name: "Teknik Informatika", image: IF, category: "Teknik dan Ilmu Komputer" },
    { name: "Sistem Informasi", image: IS, category: "Teknik dan Ilmu Komputer" },
    { name: "Teknik Komputer", image: TEKKOM, category: "Teknik dan Ilmu Komputer" },
  ],
  "Bisnis dan Ekonomi": [
    { name: "Manajemen", image: MANAJ, category: "Bisnis dan Ekonomi" },
    { name: "Akuntansi", image: AKUN, category: "Bisnis dan Ekonomi" },
    { name: "Bisnis Digital", image: BISDIG, category: "Bisnis dan Ekonomi" },
  ],
  "Ilmu Sosial dan Politik": [
    { name: "Ilmu Komunikasi", image: ILKOM, category: "Ilmu Sosial dan Politik" },
    { name: "Hubungan Internasional (HI)", image: HI, category: "Ilmu Sosial dan Politik" },
    { name: "Hukum", image: HUKUM, category: "Ilmu Sosial dan Politik" },
  ],
  "Desain dan Seni": [
    { name: "Desain Komunikasi Visual (DKV)", image: DKV, category: "Desain dan Seni" },
    { name: "Desain Interior", image: DESIN, category: "Desain dan Seni" },
    { name: "Arsitektur", image: ARSI, category: "Desain dan Seni" },
  ],
};

export const tabs = Object.keys(dataJurusan);
