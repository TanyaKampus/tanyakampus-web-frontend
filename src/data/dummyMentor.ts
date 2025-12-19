import type { MentorsCardProps } from "@/components/MentorsCard";
import UnikomLogo from "@/assets/images/UnikomLogo.png";
import ITBLogo from "@/assets/images/ITBLogo.png";
import UnpadLogo from "@/assets/images/UnpadLogo.png";
import Wolverine from '@/assets/images/Wolverine.png';
import Deadpool from '@/assets/images/Deadpool.png';
import Thanos from '@/assets/images/Thanos.png';

export const mentors: MentorsCardProps[] = [
  {
    imageUrl: Wolverine,
    logoCampussUrl: UnikomLogo,
    name: "James Howlett",
    originCampuss: "Universitas Komputer Indonesia",
    major: "Teknik dan Ilmu Komputer"
  },
  {
    imageUrl: Deadpool,
    logoCampussUrl: ITBLogo,
    name: "Wade Wilson",
    originCampuss: "Institut Teknologi Bandung",
    major: "Bisnis dan Ekonomi"
  },
  {
    imageUrl: Thanos,
    logoCampussUrl: UnpadLogo,
    name: "Thanos",
    originCampuss: "Universitas Padjajaran",
    major: "Ilmu dan Sosial Politik"
  },
];
