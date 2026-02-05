// import Lulu from "@/assets/images/LuluBodas.png";
// import Vector from "@/assets/images/VectorLogin.png";
import Button from "@/components/Button";
// import LogoItem from "@/components/LogoItem";
import ButtonRg from "@/assets/images/Button.png";
import BubbleKanan from "@/assets/images/Bubblekn.png";
import BubbleKiri from "@/assets/images/Bubblekr.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerService } from "@/services/auth.service";
import { toastError, toastSuccess } from "@/components/Toast";

const Identitas = () => {
  const navigate = useNavigate();
  const email = sessionStorage.getItem("register_email");

  const [form, setForm] = useState({
    nama: "",
    asal_sekolah: "",
    no_telepon: "",
    password: "",
    jenis_kelamin: "",
  });

  const handleSubmit = async () => {
    if (!email) return toastError("Email tidak ditemukan");

    try {
      await registerService({ email, ...form });
      sessionStorage.removeItem("register_email");
      toastSuccess("Registrasi Berhasil!");
      navigate("/succes");
    } catch {
      toastError("Registrasi Gagal!");
    }
  };

  return (
    <div className="flex min-h-screen justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-3 mb-4"
        >
          <img src={ButtonRg} className="w-10 h-10" />
          <h1 className="text-lg font-bold text-neutral">
            Isi Identitas Kamu Yuk
          </h1>
        </button>

        <p className="text-neutral mb-6 text-sm md:text-base">
          Sedikit lagi nih! Isi identitasmu dulu biar hasilnya pas banget.
        </p>

        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <input
            placeholder="Nama Lengkap"
            name="nama"
            className="w-full border rounded-xl px-3 py-2"
            onChange={(e) => setForm({ ...form, nama: e.target.value })}
          />

          <input
            placeholder="Asal Sekolah"
            name="asal_sekolah"
            className="w-full border rounded-xl px-3 py-2"
            onChange={(e) => setForm({ ...form, asal_sekolah: e.target.value })}
          />

          <div className="flex border rounded-xl overflow-hidden">
            <span className="px-3 py-2 bg-gray-100 border-r">+62</span>
            <input
              placeholder="82xxxxxxxxx"
              name="no_telepon"
              className="flex-1 px-3 py-2"
              onChange={(e) => setForm({ ...form, no_telepon: e.target.value })}
            />
          </div>

          <input
            type="password"
            name="password"
            placeholder="Password minimal 8 karakter"
            className="w-full border rounded-xl px-3 py-2"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <div className="flex gap-6">
            {["Laki-laki", "Perempuan"].map((v) => (
              <label key={v} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="jenis_kelamin"
                  value={v}
                  className="accent-teal-600"
                  onChange={(e) =>
                    setForm({ ...form, jenis_kelamin: e.target.value })
                  }
                />
                {v}
              </label>
            ))}
          </div>

          <Button
            type="submit"
            label="Daftar"
            variant="solid-dark"
            className="w-full"
          />
        </form>

        <img
          src={BubbleKanan}
          className="hidden md:block fixed right-0 top-0 w-[200px]"
        />
        <img
          src={BubbleKiri}
          className="hidden md:block fixed left-0 bottom-0 w-[200px]"
        />
      </div>
    </div>
  );
};

export default Identitas;
