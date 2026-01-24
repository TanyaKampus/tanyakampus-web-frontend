// src/services/mentor.service.ts
import api from "./api";

/** ===== DTO dari backend ===== */
export type MentorDTO = {
  mentor_id: string;
  nama_mentor: string;
  pendidikan: string;
  keahlian: string;
  foto_mentor?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

export type GetAllMentorResponse = {
  success: boolean;
  message: string;
  data: MentorDTO[];
  total?: number;
};

export type GetMentorByIdResponse = {
  success: boolean;
  message: string;
  data: MentorDTO;
};

/** ===== Format yang dipakai UI MemberCard ===== */
export type MentorCard = {
  id: string;
  image: string;
  name: string;
  role: string;
  quote?: string;
  instagram?: string;
  linkedin?: string;
  whatsapp?: string;
};

/** fallback image */
const FALLBACK_IMAGE = "/images/placeholder-mentor.jpg";

/** kalau foto_mentor berupa path relatif, jadikan absolute */
const normalizeImage = (src?: string | null) => {
  const val = (src || "").trim();
  if (!val) return FALLBACK_IMAGE;

  if (val.startsWith("http://") || val.startsWith("https://")) return val;

  const base = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/+$/, "");
  if (!base) return val.startsWith("/") ? val : `/${val}`;

  return val.startsWith("/") ? `${base}${val}` : `${base}/${val}`;
};

const toMentorCard = (m: MentorDTO): MentorCard => ({
  id: m.mentor_id,
  name: m.nama_mentor,
  role: m.keahlian,         // tampil di UI sebagai role
  quote: m.pendidikan,      // tampil di UI sebagai quote (opsional)
  image: normalizeImage(m.foto_mentor),
});

/** ===== services ===== */
export const getAllMentorService = async (): Promise<GetAllMentorResponse> => {
  const res = await api.get<GetAllMentorResponse>("/api/mentor");
  return res.data;
};

export const getAllMentorCardService = async (): Promise<MentorCard[]> => {
  const res = await api.get<GetAllMentorResponse>("/api/mentor");
  const items = res.data?.data;
  return Array.isArray(items) ? items.map(toMentorCard) : [];
};

export const getMentorByIdService = async (id: string): Promise<GetMentorByIdResponse> => {
  const res = await api.get<GetMentorByIdResponse>(`/api/mentor/${id}`);
  return res.data;
};
