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

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    email: string;
  };
}

export interface RegisterPayload {
  email: string;
  password: string;
  nama: string;
  asal_sekolah: string;
  no_telepon: string;
  jenis_kelamin: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
}

