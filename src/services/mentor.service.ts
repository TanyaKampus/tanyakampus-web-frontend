// src/services/mentor.service.ts
import api from "./api";

export type MentorDTO = {
  mentor_id?: string; // optional biar aman
  nama_mentor: string;
  pendidikan: string;
  keahlian: string;
  foto_mentor?: string | null;
  logo_kampus?: string | null;

  // beberapa backend kadang pakai id lain
  id?: string;
  _id?: string;

  createdAt?: string;
  updatedAt?: string;
};

export type GetAllMentorResponse = {
  success?: boolean;
  message?: string;
  data?: MentorDTO[]; // optional biar tidak maksa
  total?: number;
};

export type GetMentorByIdResponse = {
  success?: boolean;
  message?: string;
  data?: MentorDTO;
};

/** ===== Format yang dipakai UI MentorsCard (Konsultasi) ===== */
export type MentorsCardItem = {
  id: string;
  imageUrl: string;
  name: string;
  originCampuss: string;
  major: string;
  logo_kampus: string;
};

const FALLBACK_IMAGE = "/images/placeholder-mentor.jpg";
const FALLBACK_CAMPUS_LOGO = "/images/placeholder-campus-logo.png";

/** normalize url umum */
const normalizeUrl = (src?: string | null, fallback?: string) => {
  const val = (src || "").trim();
  if (!val) return fallback || "";

  if (val.startsWith("http://") || val.startsWith("https://")) return val;

  const base = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/+$/, "");
  if (!base) return val.startsWith("/") ? val : `/${val}`;

  return val.startsWith("/") ? `${base}${val}` : `${base}/${val}`;
};

/** =========================
 * ✅ Helpers: type guards (tanpa any)
 * ========================= */
const isRecord = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null;

const hasString = (obj: Record<string, unknown>, key: string): obj is Record<string, unknown> & Record<string, string> =>
  typeof obj[key] === "string" && (obj[key] as string).trim().length > 0;

const isMentorDTO = (v: unknown): v is MentorDTO => {
  if (!isRecord(v)) return false;
  return (
    hasString(v, "nama_mentor") &&
    hasString(v, "pendidikan") &&
    hasString(v, "keahlian")
  );
};

const isMentorDTOArray = (v: unknown): v is MentorDTO[] => {
  return Array.isArray(v) && v.every(isMentorDTO);
};

/** ✅ ambil array mentor dari berbagai bentuk response (tanpa any) */
const extractMentorList = (payload: unknown): MentorDTO[] => {
  // case 1: backend langsung array mentor
  if (isMentorDTOArray(payload)) return payload;

  // case 2: { success, message, data: [...] }
  if (isRecord(payload) && isMentorDTOArray(payload.data)) return payload.data;

  // case 3: backend balikin single object mentor (tanpa wrapper)
  if (isMentorDTO(payload)) return [payload];

  // case 4: { data: { ...mentor } }
  if (isRecord(payload) && isMentorDTO(payload.data)) return [payload.data];

  return [];
};

const buildMentorId = (m: MentorDTO) => {
  return (
    m.mentor_id ||
    m.id ||
    m._id ||
    `${m.nama_mentor}-${m.pendidikan}-${m.keahlian}` // fallback deterministic
  );
};

/** ✅ mapper untuk MentorsCard (Konsultasi) */
const toMentorsCardItem = (m: MentorDTO): MentorsCardItem => ({
  id: buildMentorId(m),
  imageUrl: normalizeUrl(m.foto_mentor, FALLBACK_IMAGE),
  name: m.nama_mentor,
  originCampuss: m.pendidikan,
  major: m.keahlian,
  logo_kampus: normalizeUrl(m.logo_kampus, FALLBACK_CAMPUS_LOGO),
});

/** ===== services ===== */
export const getAllMentorsCardService = async (): Promise<MentorsCardItem[]> => {
  const res = await api.get("/api/mentor");

  // ini penting untuk debug cepat
  console.log("RAW mentor response:", res.data);

  const list = extractMentorList(res.data);
  return list.map(toMentorsCardItem);
};
