// import Lulu from "@/assets/images/LuluBodas.png";
// import Vector from "@/assets/images/VectorLogin.png";
import Button from "@/components/Button";
// import LogoItem from "@/components/LogoItem";
import ButtonRg from "@/assets/images/Button.png";
import BubbleKanan from "@/assets/images/Bubblekn.png";
import BubbleKiri from "@/assets/images/Bubblekr.png";
import { Link, useNavigate } from "react-router-dom";
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
      await registerService({
        email,
        ...form,
      });
      
      sessionStorage.removeItem("register_email");
      toastSuccess("Registrasi Berhasil!")
      navigate('/succes')
    } catch (err) {
      console.error("Register gagal", err);
      toastError("Registasi Gagal!")
    }
  };
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="flex-1 flex flex-col justify-center items-center pt-26">
        <div className="max-w-md w-full -mt-29">
          <Link to="/daftar">
            <button className="flex items-center gap-3">
              <img
                src={ButtonRg}
                alt="Kembali ke login"
                className="w-12 h-40 object-contain cursor-pointer"
              />
              <h1 className="text-[20px] font-bold text-neutral text-center">
                Isi Identitas Kamu Yuk
              </h1>
            </button>
          </Link>
          <p className="text-left text-neutral mb-6">
            Sedikit lagi nih! Isi identitasmu dulu biar hasilnya pas banget sama
            kepribadianmu.
          </p>

          <form className="space-y-4">
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-semibold mb-1"
              >
                Nama
              </label>
              <input
                placeholder="Masukan Nama Kamu"
                name="nama"
                className="w-full border border-neutral rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                onChange={(e) => setForm({ ...form, nama: e.target.value })}
              />
            </div>

            <div>
              <label
                htmlFor="school"
                className="block text-sm font-semibold mb-1"
              >
                Asal Sekolah
              </label>
              <input
                placeholder="Dari Mana Asalah Sekolah Kamu"
                name="asal_sekolah"
                onChange={(e) =>
                  setForm({ ...form, asal_sekolah: e.target.value })
                }
                className="w-full border border-neutral rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-semibold mb-1"
              >
                No. Telepon
              </label>
              <div className="flex w-full border border-neutral rounded-xl overflow-hidden">
                <span className="px-3 py-2 bg-gray-100 text-neutral font-medium flex items-center justify-center border-r border-neutral">
                  +62
                </span>
                <input
                  id="no_telepon"
                  name="no_telepon"
                  type="tel"
                  placeholder="82xxxxxxxxx"
                  inputMode="tel"
                  // pattern="[0-9]{9,15}"
                  maxLength={15}
                  autoComplete="tel"
                  required
                  className="flex-1 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  onChange={(e) =>
                    setForm({ ...form, no_telepon: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold mb-1"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Buat password minimal 8 karakter"
                minLength={8}
                autoComplete="new-password"
                required
                className="w-full border border-neutral rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>
            <div>
              <span className="block text-sm font-semibold mb-1">
                Jenis Kelamin
              </span>
              <div className="flex items-center gap-6 mt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value="Laki-laki"
                    className="accent-teal-600 w-4 h-4"
                    required
                    onChange={(e) =>
                      setForm({ ...form, jenis_kelamin: e.target.value })
                    }
                  />
                  <span className="text-sm text-neutral">Laki-Laki</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value="Perempuan"
                    className="accent-teal-600 w-4 h-4"
                    required
                    onChange={(e) =>
                      setForm({ ...form, jenis_kelamin: e.target.value })
                    }
                  />
                  <span className="text-sm text-neutral">Perempuan</span>
                </label>
              </div>
            </div>

              <Button type="button" label="Daftar" variant="solid-dark" className="w-full" onClick={handleSubmit}/>
          </form>

          <img
            src={BubbleKanan}
            alt="Bubble kanan atas"
            className="fixed right-0 top-0 w-[200px] object-contain z-10"
          />

          <img
            src={BubbleKiri}
            alt="Bubble kiri bawah"
            className="fixed left-0 bottom-0 w-[200px] object-contain z-10"
          />
        </div>
      </div>
    </div>
  );
};

export default Identitas;
