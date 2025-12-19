import type { IconType } from "react-icons";

export interface TestimonyCardProps {
  name: string;
  school: string;
  text: string;
  avatar: IconType;
  position: "center" | "top" | "bottom" | "hidden";
}

export interface RiwayatTes {
  id: number;
  date: string;
  majors: string[];
  waitingCount: number;
}