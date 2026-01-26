import axios from "axios";

export interface CampusCardProps {
  kampus_id: string;
  nama_kampus: string;
  jenis_kampus: string;
  akreditasi: string;
  alamat_kampus: string;
  deskripsi_kampus: string;
  foto_kampus: string;
}

export interface CampusResponse {
  success: boolean;
  message: string;
  data: CampusCardProps[];
}

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const getAllCampus = async (): Promise<CampusCardProps[]> => {
  const response = await axios.get<CampusResponse>(`${API_URL}/api/campus`);
  return response.data.data;
};

export const getCampusByIdService = async (id: string) => {
  const response = await axios.get(`${API_URL}/api/campus/${id}`);
  return response.data;
};
