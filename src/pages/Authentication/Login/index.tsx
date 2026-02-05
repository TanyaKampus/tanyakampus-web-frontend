import { useState } from "react";
import Lulu from "@/assets/images/LuluBodas.png";
import Vector from "@/assets/images/VectorLogin.png";
import Button from "@/components/Button";
import LogoItem from "@/components/LogoItem";
import BubbleKiri from "@/assets/images/Bubble.png";
import { loginService } from "@/services/auth.service";
import { useNavigate } from "react-router-dom";
import { toastError, toastSuccess } from "@/components/Toast";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await loginService({ email, password });

      if (res?.success) {
        localStorage.setItem("user", JSON.stringify(res.data));
        toastSuccess("Login Berhasil!")
          navigate("/");
        return;
      }
    } catch (err: any) {
      toastError("Email atau Password Salah.")
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="relative flex-1 bg-gradient-to-b from-primary-200 to-primary-100 flex flex-col justify-center items-center overflow-hidden">
        <div className="absolute top-6 left-8 z-10">
          <LogoItem />
        </div>

        <img
          src={Vector}
          alt="Vector"
          className="absolute top-0 right-0 w-[150px] object-cover"
        />

        <img
          src={Lulu}
          alt="Lulu"
          className="max-w-[520px] absolute bottom-[-18%] left-1/2 -translate-x-[60%] object-contain scale-x-[-1] rotate-[8deg]"
        />
      </div>

      {/* RIGHT */}
      <div className="flex-1 flex flex-col justify-center items-center pt-2">
        <div className="max-w-md w-full">
          <h1 className="text-2xl font-bold text-neutral text-center mb-2">
            Yuk masuk dulu!
          </h1>
          <p className="text-center text-neutral mb-6">
            Temukan jurusan dan kampus terbaik sesuai kepribadianmu.
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-semibold mb-1">Email</label>
              <input
                type="email"
                placeholder="Masukan Email kamu"
                className="w-full border border-neutral rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Password</label>
              <input
                type="password"
                placeholder="Masukan Password kamu"
                className="w-full border border-neutral rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <div className="flex justify-between items-center text-sm mt-1">
                <label className="flex items-center gap-1">
                  <input type="checkbox" className="accent-teal-600" />
                  Ingatkan saya
                </label>
                <a href="#" className="text-neutral hover:underline">
                  Lupa Password?
                </a>
              </div>
            </div>

            {error && <p className="text-sm text-red-500 text-center">{error}</p>}

            <Button
              label={loading ? "Loading..." : "Masuk"}
              variant="solid-dark"
              className="w-full"
              disabled={loading}
            />

            <p className="text-center text-sm mt-4">
              Belum punya akun?{" "}
              <a
                href="/daftar"
                className="text-tertiary-300 font-semibold hover:underline"
              >
                Daftar Sekarang
              </a>
            </p>

            <div className="flex items-center my-4">
              <div className="flex-1 h-px bg-neutral" />
              <span className="px-3 text-sm text-neutral">atau dengan</span>
              <div className="flex-1 h-px bg-neutral" />
            </div>

            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 bg-[#BE0B0B] cursor-pointer text-white font-medium py-2 rounded-md hover:bg-[#C23321] transition"
            >
              <img
                src="https://www.svgrepo.com/show/355037/google.svg"
                alt="Google"
                className="w-5 h-5"
              />
              Login dengan Google
            </button>
          </form>

          <img
            src={BubbleKiri}
            alt="Bubble kanan bawah"
            className="fixed right-0 bottom-0 w-[200px] object-contain z-10"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
