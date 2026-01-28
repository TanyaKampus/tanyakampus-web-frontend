import type { IconType } from "react-icons";

export interface CampussProps {
  kampus_id: string;
  nama_kampus: string;
  jenis_kampus: string;
  logo_kampus: string;
  akreditasi: string;
  alamat_kampus: string;
  maps_url: string;
  instagram: string;
  website: string;
  no_telepon: string;
  deskripsi_kampus: string;
  foto_kampus: string;
}

export type StartQuizResponse = {
  success: boolean;
  message: string;
  data: {
    riwayat_id: string;
    quiz_id: string;
    startedAt?: string;
  };
};

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
  accessToken: string; // ✅ token untuk FE
  refreshToken: string; // ✅ token untuk refresh
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
  data: {
    id: string;
    email: string;
  };
  accessToken: string;
  refreshToken: string;
}

export type ActiveQuizDTO = {
  quiz_id: string;
  nama_quiz: string;
  deskripsi_quiz: string;
  is_active: boolean;
  createdAt: string;
  updatedAt: string;
};

export type GetActiveQuizResponse = {
  success: boolean;
  message: string;
  data: ActiveQuizDTO;
};

export type AnswerDTO = {
  jawaban_id: string;
  tipe_jawaban: "YA" | "TIDAK";
};

export type QuestionDTO = {
  pertanyaan_id: string;
  quiz_id: string;
  soal: string;
  tipe: "BIDANG" | "TIE_BREAKER";
  bidang_id: string | null;
  tiebreaker_type: string | null;
  urutan: number;
  jawaban: AnswerDTO[];
};

export type GetQuestionsResponse = {
  success: boolean;
  message: string;
  data: QuestionDTO[];
};

// src/utils/interface.ts

export type FieldResultDTO = {
  bidang_id: string;
  nama_bidang?: string; 
  skor_bidang: number;
  skor_tiebreaker: number;
  skor_total: number;
  persentase: number;
  is_winner: boolean;

  // optional kalau suatu saat backend kirim nested bidang
  bidang?: {
    bidang_id: string;
    nama_bidang: string;
    foto_bidang: string | null
    deskripsi?: string | null;
  } | null;
};

// ✅ bentuk response yang bener-bener kamu dapet di console
export type BackendHasilBidangItem = {
  id: string;
  riwayat_id: string;
  bidang_id: string;
  skor_bidang: number;
  skor_tiebreaker: number;
  skor_total: number;
  persentase: number;
  is_winner: boolean;
  createdAt?: string;

  bidang?: {
    bidang_id: string;
    nama_bidang: string;
    deskripsi?: string | null;
    createdAt?: string;
    updatedAt?: string;
  } | null;
};

export type BackendHasilJurusanItem = {
  id: string;
  riwayat_id: string;
  jurusan_id: string;
  jurusan?: {
    jurusan_id: string;
    nama_jurusan: string;
    bidang_id?: string | null;
    bidang?: {
      bidang_id: string;
      nama_bidang: string;
    } | null;
  } | null;
};

export type BackendHasilKampusItem = {
  id: string;
  riwayat_id: string;
  kampus_id: string;
  kampus?: {
    kampus_id: string;
    nama_kampus: string;
    // kalau ada properti gambar di backend kamu, taruh di sini juga
    // contoh:
    // gambar?: string | null;
    // logo?: string | null;
  } | null;
};

export type GetResultBackendResponse = {
  success: boolean;
  message: string;
  data: {
    riwayat_id: string;
    quiz_id: string;
    user_id: string;
    status_quiz: "COMPLETED" | "IN_PROGRESS" | "CANCELLED";
    tanggal_mulai: string;
    tanggal_selesai: string;
    bidang_terpilih: string;
    used_tiebreaker?: boolean;
    field_results?: FieldResultDTO[];
    hasilBidang: BackendHasilBidangItem[];
    hasilJurusan: BackendHasilJurusanItem[];
    hasilKampus: BackendHasilKampusItem[];

    quiz?: {
      quiz_id: string;
      nama_quiz: string;
    };
  };
};

export interface CampusCardUI {
  id: string;
  name: string;
  imageUrl: string;
  tag: string;
}

export type MajorCardUI = {
  id: string;
  nama: string;
  isRecommended: boolean;
};

export type QuizHistoryMeItemDTO = {
  riwayat_id: string;
  status_quiz: "COMPLETED" | "IN_PROGRESS" | "CANCELLED";
  tanggal_mulai: string;
  tanggal_selesai: string | null;
  quiz: {
    quiz_id: string;
    nama_quiz: string;
  };
  bidang_terpilih: string | null;
};

export type GetMyQuizHistoryResponseDTO = {
  success: boolean;
  message: string;
  data: QuizHistoryMeItemDTO[];
};

export type AbandonQuizResponse = {
  success: boolean;
  message: string;
  data?: string;
};
