// src/services/major.service.ts
import api from "./api";

/** =========================
 * Types dari backend kamu (Jurusan select)
 * ========================= */
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

/** meta pagination dari backend */
export type MajorMeta = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

/** Response controller backend kamu (update: tambah meta) */
export type GetAllMajorResponse = {
  success: boolean;
  message: string;
  data: MajorDTO[];
  meta?: MajorMeta; // ✅ optional biar gak error kalau endpoint lama belum ada
};

export type GetMajorByIdResponse = {
  success: boolean;
  message: string;
  data: MajorDTO;
};

/** =========================
 * Format yang dipakai UI Card (frontend)
 * ========================= */
export type MajorCard = {
  id: string;
  name: string;
  description: string;
  icon: string;
  bidangName: string;
  bidangId: string;
};

/** fallback icon */
const FALLBACK_ICON = "/images/placeholder-major.png";

const normalizeIcon = (src?: string | null) => {
  const val = (src || "").trim();
  if (!val) return FALLBACK_ICON;

  if (val.startsWith("http://") || val.startsWith("https://")) return val;

  const base = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/+$/, "");
  if (!base) return val.startsWith("/") ? val : `/${val}`;

  return val.startsWith("/") ? `${base}${val}` : `${base}/${val}`;
};

const toMajorCard = (m: MajorDTO): MajorCard => ({
  id: m.jurusan_id,
  name: m.nama_jurusan,
  description: (m.deskripsi || "").trim(),
  icon: normalizeIcon(m.icon),
  bidangName: m.bidang?.nama_bidang || "",
  bidangId: m.bidang?.bidang_id || "",
});

type GetAllMajorParams = {
  page?: number;
  limit?: number;
};

type GetAllMajorCardResult = {
  data: MajorCard[];
  meta: MajorMeta;
};

const emptyMeta = (limit: number): MajorMeta => ({
  total: 0,
  page: 1,
  limit,
  totalPages: 1,
  hasNextPage: false,
  hasPrevPage: false,
});

/** ambil semua jurusan (raw response) */
export const getAllMajorService = async (
  params?: GetAllMajorParams,
): Promise<GetAllMajorResponse> => {
  const res = await api.get<GetAllMajorResponse>("/api/major", { params });
  return res.data;
};

/** ambil jurusan siap card + meta pagination */
export const getAllMajorCardService = async (
  params?: GetAllMajorParams,
): Promise<GetAllMajorCardResult> => {
  const res = await api.get<GetAllMajorResponse>("/api/major", { params });

  const items = Array.isArray(res.data?.data) ? res.data.data : [];
  const meta = res.data?.meta ?? emptyMeta(params?.limit ?? 6);

  return {
    data: items.map(toMajorCard),
    meta,
  };
};

export const getMajorByIdService = async (jurusan_id: string) => {
  const res = await api.get(`/api/major/${jurusan_id}`);
  return res.data;
};