// src/services/user.service.ts
import api from "./api";

export const getMeService = async () => {
  const token = localStorage.getItem("token");
  const res = await api.get("/api/user/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true
  });
  return res.data;
};

export const updateMeService = async (payload: {
  nama?: string;
  jenis_kelamin?: string;
  tanggal_lahir?: string;
  no_telepon?: string;
  asal_sekolah?: string;
  foto_profil?: File;
}) => {
  const fd = new FormData();

  if (payload.nama) fd.append("nama", payload.nama);
  if (payload.jenis_kelamin) fd.append("jenis_kelamin", payload.jenis_kelamin);
  if (payload.tanggal_lahir) fd.append("tanggal_lahir", payload.tanggal_lahir);
  if (payload.no_telepon) fd.append("no_telepon", payload.no_telepon);
  if (payload.asal_sekolah) fd.append("asal_sekolah", payload.asal_sekolah);
  if (payload.foto_profil) fd.append("foto_profil", payload.foto_profil);

  const res = await api.patch("/api/user/me", fd, {
    withCredentials: true
  });

  return res.data;
};
