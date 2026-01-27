// src/services/campus.service.ts
import api from "./api";

export interface Campus {
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

// kalau backend detail mengembalikan jurusan
export interface Jurusan {
  jurusan_id: string;
  nama_jurusan: string;
  // tambahin field lain kalau ada di backend
}

export type CampusMeta = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

export interface GetAllCampusResponse {
  success: boolean;
  message: string;
  data: Campus[];
  meta?: CampusMeta; // ✅ penting: backend kamu punya meta
}

export interface GetCampusByIdResponse {
  success: boolean;
  message: string;
  data: Campus & {
    jurusan?: Jurusan[];
  };
}

// ✅ Params pagination + filter (optional)
export type GetAllCampusParams = {
  page?: number;
  limit?: number;
  jenis_kampus?: string;
  akreditasi?: string;
};

// ✅ return FULL response (biar meta kebawa)
export const getAllCampus = async (
  params?: GetAllCampusParams
): Promise<GetAllCampusResponse> => {
  const res = await api.get<GetAllCampusResponse>("/api/campus", {
    params,
  });
  return res.data;
};

// ✅ helper kalau kamu cuma butuh data[] (tanpa meta)
export const getAllCampusDataOnly = async (
  params?: GetAllCampusParams
): Promise<Campus[]> => {
  const res = await getAllCampus(params);
  return res.data || [];
};

export const getCampusByIdService = async (
  id: string
): Promise<GetCampusByIdResponse> => {
  const res = await api.get<GetCampusByIdResponse>(`/api/campus/${id}`);
  return res.data;
};
