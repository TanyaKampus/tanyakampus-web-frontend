// src/services/campus.service.ts
import api from "./api";

/** DTO sesuai SELECT backend (campus.repository.ts) */
export type CampusDTO = {
  kampus_id: string;
  nama_kampus: string;
  jenis_kampus: string;
  deskripsi_kampus?: string | null;
  foto_kampus?: string | null;
};

/** Response GET /api/campus */
export type GetAllCampusResponse = {
  success: boolean;
  message: string;
  data: CampusDTO[];
};

/** Response GET /api/campus/:id */
export type GetCampusByIdResponse = {
  success: boolean;
  message: string;
  data: CampusDTO & {
    jurusan?: Array<{
      jurusan_id: string;
      nama_jurusan: string;
      deskripsi?: string | null;
      icon?: string | null;
    }>;
  };
};

/** Format yang dipakai Card UI */
export type CampusCard = {
  id: string;
  name: string;
  category: string; // jenis_kampus
  image: string;
  logo: string;
};

/** fallback (taruh file di /public/images/) */
const FALLBACK_IMAGE = "/images/placeholder-campus.jpg";
const FALLBACK_LOGO = "/images/placeholder-logo.png";

/** kalau backend balikin path relatif, jadiin absolute */
const normalizeAsset = (src?: string | null) => {
  const val = (src || "").trim();
  if (!val) return "";

  if (val.startsWith("http://") || val.startsWith("https://")) return val;

  const base = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/+$/, "");
  if (!base) return val.startsWith("/") ? val : `/${val}`;

  return val.startsWith("/") ? `${base}${val}` : `${base}/${val}`;
};

/** mapper dto -> card */
const toCampusCard = (c: CampusDTO): CampusCard => {
  const img = normalizeAsset(c.foto_kampus) || FALLBACK_IMAGE;

  return {
    id: c.kampus_id,
    name: c.nama_kampus,
    category: c.jenis_kampus,
    image: img,
    logo: FALLBACK_LOGO, // kalau nanti ada logo dari backend tinggal ganti
  };
};

/** Ambil semua campus (RAW) */
export const getAllCampusService = async (): Promise<GetAllCampusResponse> => {
  const response = await api.get<GetAllCampusResponse>("/api/campus");
  return response.data;
};

/** Ambil semua campus (siap dipakai KampusCard) */
export const getAllCampusCardService = async (): Promise<CampusCard[]> => {
  const response = await api.get<GetAllCampusResponse>("/api/campus");
  const items = response.data?.data ?? [];
  return Array.isArray(items) ? items.map(toCampusCard) : [];
};

/** Detail campus by id */
export const getCampusByIdService = async (
  id: string,
): Promise<GetCampusByIdResponse> => {
  const response = await api.get<GetCampusByIdResponse>(`/api/campus/${id}`);
  return response.data;
};
