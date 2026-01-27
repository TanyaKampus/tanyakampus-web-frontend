import { useEffect, useState } from "react";
import { getMeService, updateMeService } from "@/services/user.service";

const ProfileForm = () => {
  const [form, setForm] = useState({
    nama: "",
    email: "",
    pendidikan: "",
    telepon: "",
    gender: "",
    tanggal_lahir: "",
    foto_profil: null as File | null,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // ✅ TARIK DATA DARI BACKEND
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await getMeService();
        const u = res.data;

        setForm({
          nama: u.profile?.nama || "",
          email: u.email || "",
          pendidikan: u.profile?.asal_sekolah || "",
          telepon: u.profile?.no_telepon || "",
          gender: u.profile?.jenis_kelamin || "",
          tanggal_lahir: u.profile?.tanggal_lahir
            ? u.profile.tanggal_lahir.slice(0, 10)
            : "",
          foto_profil: null,
        });
      } catch (err: any) {
        setError(err.response?.data?.message || "Gagal mengambil profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setForm({ ...form, foto_profil: file });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);

      await updateMeService({
        nama: form.nama,
        jenis_kelamin: form.gender,
        tanggal_lahir: form.tanggal_lahir,
        pendidikan: form.pendidikan,
        telepon: form.telepon,
        foto_profil: form.foto_profil ?? undefined,
      });

      alert("Profil berhasil disimpan");
    } catch (err: any) {
      alert(err.response?.data?.message || "Gagal update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading profile...</p>;

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="font-bold text-lg mb-4">Identitas</h2>

      {error && <p className="text-red-500 mb-3">{error}</p>}

      <div className="space-y-5">
        <div>
          <label className="text-sm text-[#BDBDBD]">Nama</label>
          <input
            type="text"
            name="nama"
            value={form.nama}
            onChange={handleChange}
            className="w-full mt-1 border-[#D7D7D7] border-2 px-3 py-2 rounded-lg"
          />
        </div>

        <div>
          <label className="text-sm text-[#BDBDBD]">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            disabled
            className="w-full mt-1 border-[#D7D7D7] border-2 px-3 py-2 rounded-lg bg-gray-50"
          />
        </div>

        <div>
          <label className="text-sm text-[#BDBDBD]">Pendidikan Terakhir</label>
          <input
            type="text"
            name="pendidikan"
            value={form.pendidikan}
            onChange={handleChange}
            className="w-full mt-1 border-[#D7D7D7] border-2 px-3 py-2 rounded-lg"
          />
        </div>

        <div>
          <label className="text-sm text-[#BDBDBD]">No Telepon</label>
          <input
            type="text"
            name="telepon"
            value={form.telepon}
            onChange={handleChange}
            className="w-full mt-1 border-[#D7D7D7] border-2 px-3 py-2 rounded-lg"
          />
        </div>

        <div>
          <label className="text-sm text-[#BDBDBD]">Jenis Kelamin</label>
          <input
            type="text"
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="w-full mt-1 border-[#D7D7D7] border-2 px-3 py-2 rounded-lg"
          />
        </div>

        <div>
          <label className="text-sm text-[#BDBDBD]">Tanggal Lahir</label>
          <input
            type="date"
            name="tanggal_lahir"
            value={form.tanggal_lahir}
            onChange={handleChange}
            className="w-full mt-1 border-[#D7D7D7] border-2 px-3 py-2 rounded-lg"
          />
        </div>

        <div>
          <label className="text-sm text-[#BDBDBD]">Foto Profil</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="w-full mt-1 border-[#D7D7D7] border-2 px-3 py-2 rounded-lg"
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="rounded-lg px-4 py-2 border-2 border-[#D7D7D7]"
        >
          {saving ? "Menyimpan..." : "Simpan"}
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;
