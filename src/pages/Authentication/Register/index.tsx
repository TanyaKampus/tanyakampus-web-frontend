import Lulu from "@/assets/images/LuluBodas.png";
import Vector from "@/assets/images/VectorLogin.png";
import Button from "@/components/Button";
import LogoItem from "@/components/LogoItem";
import ButtonRg from "@/assets/images/Button.png";
import BubbleKiri from "@/assets/images/Bubble.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleNext = () => {
    sessionStorage.setItem("register_email", email);
    navigate("/identitas");
  };

  const handleBackButton = () => {
    navigate(-1);
  };

  return (
    <div className="flex min-h-screen flex-col md:flex-row overflow-hidden">
      {/* LEFT – hanya desktop */}
      <div className="relative hidden md:flex md:flex-1 bg-gradient-to-b from-primary-200 to-primary-100 items-center justify-center overflow-hidden">
        <div className="absolute top-6 left-8 z-10">
          <LogoItem />
        </div>

        <img
          src={Vector}
          alt="Vector"
          className="absolute top-0 right-0 w-[150px]"
        />

        <img
          src={Lulu}
          alt="Lulu"
          className="max-w-[480px] absolute bottom-[-18%] left-1/2 -translate-x-[60%] scale-x-[-1] rotate-[8deg]"
        />
      </div>

      {/* RIGHT */}
      <div className="flex flex-1 flex-col justify-center items-center px-4 py-8 md:px-0">
        {/* Logo mobile */}
        <div className="md:hidden mb-6 p-4 bg-primary-300 rounded-full">
          <LogoItem />
        </div>

        <div className="w-full max-w-md">
          <button
            className="flex items-center gap-3 mb-4"
            onClick={handleBackButton}
          >
            <img
              src={ButtonRg}
              alt="Kembali"
              className="w-10 h-10 object-contain"
            />
            <h1 className="text-lg font-bold text-neutral">Sudah Punya Akun</h1>
          </button>

          <h1 className="text-2xl font-bold text-neutral mb-1">
            Yuk Daftar Dulu!
          </h1>
          <p className="text-neutral mb-6 text-sm md:text-base">
            Biar kamu bisa temukan jurusan dan kampus terbaik sesuai
            kepribadianmu.
          </p>

          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleNext();
            }}
          >
            <div>
              <label className="block text-sm font-semibold mb-1">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Masukan Email kamu"
                className="w-full border border-neutral rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2 text-sm text-neutral">
              <div className="w-4 h-4 flex items-center justify-center rounded-full bg-neutral text-white text-xs font-bold">
                i
              </div>
              <span>Pastikan email kamu sudah benar</span>
            </div>

            <Button
              type="submit"
              label="Lanjut"
              variant="solid-dark"
              className="w-full"
            />

            <div className="flex items-center my-4">
              <div className="flex-1 h-px bg-neutral" />
              <span className="px-3 text-sm text-neutral">atau dengan</span>
              <div className="flex-1 h-px bg-neutral" />
            </div>

            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 bg-[#BE0B0B] text-white py-2 rounded-md hover:bg-[#C23321]"
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

        <img
          src={BubbleKiri}
          alt="Bubble"
          className="hidden md:block fixed right-0 bottom-0 w-[200px]"
        />
      </div>
    </div>
  );
};

export default Register;
