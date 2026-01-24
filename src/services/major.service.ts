// src/services/major.service.ts
import api from "./api";

/** =========================
 *  Types dari backend kamu (Jurusan select)
 *  ========================= */
export type BidangDTO = {
  bidang_id: string;
  nama_bidang: string;
  deskripsi?: string | null;
};

export type MajorDTO = {
  jurusan_id: string;
  nama_jurusan: string;
  deskripsi?: string | null;
  icon?: string | null;
  bidang?: {
    bidang_id: string;
    nama_bidang: string;
    deskripsi?: string | null;
  } | null;
  createdAt?: string;
  updatedAt?: string;
};

/** Response controller backend kamu */
export type GetAllMajorResponse = {
  success: boolean;
  message: string;
  data: MajorDTO[];
};

export type GetMajorByIdResponse = {
  success: boolean;
  message: string;
  data: MajorDTO;
};

/** =========================
 *  Format yang dipakai UI Card (frontend)
 *  ========================= */
export type MajorCard = {
  id: string;
  name: string;
  description: string;
  icon: string;
  bidangName: string;   // contoh: "TEKNIK_DAN_ILMU_KOMPUTER"
  bidangId: string;
};

/** fallback icon (taruh file di /public/images/) */
const FALLBACK_ICON = "/images/placeholder-major.png";

/** kalau icon dari backend berupa path relatif, jadikan absolute */
const normalizeIcon = (src?: string | null) => {
  const val = (src || "").trim();
  if (!val) return FALLBACK_ICON;

  // sudah absolute
  if (val.startsWith("http://") || val.startsWith("https://")) return val;

  // base backend
  const base = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/+$/, "");
  if (!base) return val.startsWith("/") ? val : `/${val}`;

  return val.startsWith("/") ? `${base}${val}` : `${base}/${val}`;
};

/** mapper DTO -> MajorCard */
const toMajorCard = (m: MajorDTO): MajorCard => ({
  id: m.jurusan_id,
  name: m.nama_jurusan,
  description: (m.deskripsi || "").trim(),
  icon: normalizeIcon(m.icon),
  bidangName: m.bidang?.nama_bidang || "",
  bidangId: m.bidang?.bidang_id || "",
});

/** =========================
 *  Services
 *  ========================= */

/** ambil semua jurusan (raw response) */
export const getAllMajorService = async (): Promise<GetAllMajorResponse> => {
  const res = await api.get<GetAllMajorResponse>("/api/major");
  return res.data;
};

/** ambil semua jurusan (langsung siap buat card UI) */
export const getAllMajorCardService = async (): Promise<MajorCard[]> => {
  const res = await api.get<GetAllMajorResponse>("/api/major");
  const items = res.data?.data;
  return Array.isArray(items) ? items.map(toMajorCard) : [];
};

/** ambil detail jurusan by id */
export const getMajorByIdService = async (id: string): Promise<GetMajorByIdResponse> => {
  const res = await api.get<GetMajorByIdResponse>(`/api/major/${id}`);
  return res.data;
};
