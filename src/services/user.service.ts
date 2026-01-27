import api from "./api";

export const getMeService = async () => {
  const res = await api.get("/api/user/me");
  return res.data;
};

export const updateMeService = async (payload: {
  nama?: string;
  jenis_kelamin?: string;
  tanggal_lahir?: string;
  telepon?: string;
  pendidikan?: string;
  foto_profil?: File;
}) => {
  const fd = new FormData();

  if (payload.nama) fd.append("nama", payload.nama);
  if (payload.jenis_kelamin) fd.append("jenis_kelamin", payload.jenis_kelamin);
  if (payload.tanggal_lahir) fd.append("tanggal_lahir", payload.tanggal_lahir);
  if (payload.telepon) fd.append("telepon", payload.telepon);
  if (payload.pendidikan) fd.append("pendidikan", payload.pendidikan);
  if (payload.foto_profil) fd.append("foto_profil", payload.foto_profil);

  const res = await api.patch("/api/user/me", fd);
  return res.data;
};
