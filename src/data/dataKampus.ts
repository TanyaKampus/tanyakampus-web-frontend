// src/data/dataKampus.ts
import Unikom from "@/assets/images/UNIKOM.jpg";
import LogoUnikom from "@/assets/images/UnikomLogo.png";
import Itb from "@/assets/images/ITB.jpeg";
import LogoItb from "@/assets/images/ITBLogo.png";
import Unpad from "@/assets/images/UNPAD.jpg";
import LogoUnpad from "@/assets/images/UnpadLogo.png";
import Binus from "@/assets/images/Binus.png";
import LogoBinus from "@/assets/images/LogoBINUS.png";
import Isbi from "@/assets/images/Isbi.png";
import LogoIsbi from "@/assets/images/ISBILogo.png";
import Telkom from "@/assets/images/TELU.jpg";
import LogoTelkom from "@/assets/images/TelULogo.png";

export interface Major {
  id: string;
  name: string;
  image: string;
  category: string;
  logo: string;
}

export const dataKampus: Record<string, Major[]> = {
  Bandung: [
    {
      id: "unikom",
      name: "Universitas Komputer Indonesia",
      image: Unikom,
      category: "Swasta",
      logo: LogoUnikom,
    },
    {
      id: "itb",
      name: "Institut Teknologi Bandung",
      image: Itb,
      category: "Negeri",
      logo: LogoItb,
    },
    {
      id: "unpad",
      name: "Universitas Padjajaran",
      image: Unpad,
      category: "Negeri",
      logo: LogoUnpad,
    },
  ],

  Mewah: [
    {
      id: "binus",
      name: "Binus University",
      image: Binus,
      category: "Swasta",
      logo: LogoBinus,
    },
    {
      id: "isbi",
      name: "Institut Seni Budaya Indonesia",
      image: Isbi,
      category: "Negeri",
      logo: LogoIsbi,
    },
    {
      id: "telu",
      name: "Telkom University",
      image: Telkom,
      category: "Swasta",
      logo: LogoTelkom,
    },
  ],
};

export const tabs = Object.keys(dataKampus);
