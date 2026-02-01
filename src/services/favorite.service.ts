import api from "./api";

export const addFavoriteCampusService = async (kampus_id: string) => {
  const res = await api.post(
    "/api/favorite/campus",
    { kampus_id },
    {
      withCredentials: true,
    }
  );

  return res.data;
};

export const removeFavoriteCampusService = async (kampus_id: string) => {
  const res = await api.delete(`/api/favorite/campus/${kampus_id}`);
  return res.data;
};

export const getFavoriteCampusService = async (
  page = 1,
  limit = 5
) => {
  const res = await api.get(
    `/api/favorite/campus?page=${page}&limit=${limit}`,
    {
      withCredentials: true,
    }
  );

  return res.data;
};

export const addFavoriteMajorService = async (jurusan_id: string) => {
  const res = await api.post(
    "/api/favorite/major",
    { jurusan_id },
    {
      withCredentials: true,
    }
  );
  

  return res.data;
};

export const removeFavoriteMajorService = async (jurusan_id: string) => {
  const res = await api.delete(`/api/favorite/major/${jurusan_id}`, {
    withCredentials: true,
  });
  return res.data;
};


export const getFavoriteMajorService = async () => {
  const res = await api.get("/api/favorite/major", {
    withCredentials: true,
  });
  return res.data;
};