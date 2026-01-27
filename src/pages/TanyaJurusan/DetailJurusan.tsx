import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMajorByIdService } from "@/services/major.service";
import HeroDetailJurusan from "./components/HeroDetail";
const DetailJurusan = () => {
  const { id } = useParams<{ id: string }>();
  const [jurusan, setJurusan] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchDetail = async () => {
      try {
        const res = await getMajorByIdService(id);
        setJurusan(res.data);
      } catch (err) {
        console.error("Gagal mengambil detail jurusan");
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  if (loading) return <p>Loading detail jurusan...</p>;
  if (!jurusan) return <p>Data jurusan tidak ditemukan</p>;

  return <HeroDetailJurusan jurusan={jurusan} />;
};

export default DetailJurusan;
