import Minat from "@/assets/images/Minat.png";
import Selam from "@/assets/images/MinastSelam.png";

export interface Major {
  name: string;
  image: string;
  category: string;
  description: string;
}

export const categoryTest: Record<string, Major[]> = {
  Minat: [
    {
      name: "Cek Arus Minat",
      image: Minat,
      category: "Gratis!",
      description:
        "Tes cepat ini dirancang untuk memetakan arah minat dan potensi awalmu secara umum. Gratis, hasilnya langsung keluar, dan siap jadi bekal pertamamu!",
    },
    {
      name: "Paket Selam Mendalam",
      image: Selam,
      category: "Best Value!",
      description:
        "Ini adalah ekspedisi menyeluruh untuk menemukan harta karun potensimu. Dapatkan laporan psikometri lengkap, peta jurusan paling akurat, dan analisis mendalam tentang ....",
    },
  ],
};
