import { useState } from "react";
import Lulu from "@/assets/images/LuluBodas.png";
import Vector from "@/assets/images/VectorLogin.png";
import Button from "@/components/Button";
import LogoItem from "@/components/LogoItem";
import BubbleKiri from "@/assets/images/Bubble.png";
import { loginService } from "@/services/auth.service";
import { useNavigate } from "react-router-dom";
import { toastError, toastSuccess } from "@/components/Toast";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await loginService({ email, password });

      if (res?.success) {
        if (rememberMe) {
          localStorage.setItem("user", JSON.stringify(res.data));
        } else {
          sessionStorage.setItem("user", JSON.stringify(res.data));
        }

        toastSuccess("Login Berhasil!");
        navigate("/");
      }
    } catch {
      toastError("Email atau Password Salah.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col md:flex-row overflow-hidden">
      {/* LEFT – hanya tampil di tablet & desktop */}
      <div className="relative hidden md:flex md:flex-1 bg-gradient-to-b from-primary-200 to-primary-100 items-center justify-center overflow-hidden">
        <div className="absolute top-6 left-8 z-10">
          <LogoItem />
        </div>

        <img
          src={Vector}
          alt="Vector"
          className="absolute top-0 right-0 w-[140px]"
        />

        <img
          src={Lulu}
          alt="Lulu"
          className="max-w-[480px] absolute bottom-[-18%] left-1/2 -translate-x-[60%] scale-x-[-1] rotate-[8deg]"
        />
      </div>

      {/* RIGHT */}
      <div className="flex flex-1 flex-col justify-center items-center px-4 py-8 md:px-0">
        {/* Logo versi mobile */}
        <div className="md:hidden mb-6 p-4 bg-primary-300 rounded-full">
          <LogoItem />
        </div>

        <div className="w-full max-w-md">
          <h1 className="text-2xl font-bold text-neutral text-center mb-2">
            Yuk masuk dulu!
          </h1>
          <p className="text-center text-neutral mb-6 text-sm md:text-base">
            Temukan jurusan dan kampus terbaik sesuai kepribadianmu.
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* EMAIL */}
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

            {/* PASSWORD */}
            <div>
              <label className="block text-sm font-semibold mb-1">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Masukan Password kamu"
                  className="w-full border border-neutral rounded-xl px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral hover:text-primary-300"
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>

              <label className="flex items-center gap-2 text-sm mt-2">
                <input
                  type="checkbox"
                  className="accent-teal-600"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                Ingatkan saya
              </label>
            </div>

            {error && (
              <p className="text-sm text-red-500 text-center">{error}</p>
            )}

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
              className="w-full flex items-center justify-center gap-2 bg-[#BE0B0B] text-white font-medium py-2 rounded-md hover:bg-[#C23321]"
            >
              <img
                src="https://www.svgrepo.com/show/355037/google.svg"
                alt="Google"
                className="w-5 h-5"
              />
              Login dengan Google
            </button>
          </form>
        </div>

        {/* Bubble disembunyikan di mobile */}
        <img
          src={BubbleKiri}
          alt="Bubble kanan bawah"
          className="hidden md:block fixed right-0 bottom-0 w-[200px]"
        />
      </div>
    </div>
  );
};

export default Login;
