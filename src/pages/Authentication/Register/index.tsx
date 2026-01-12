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
    navigate(-1)
  }
  
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

      <div className="flex-1 flex flex-col justify-center items-center pt-2">
        <div className="max-w-md w-full -mt-29">
            <button className="flex items-center gap-3" onClick={handleBackButton}>
              <img
                src={ButtonRg}
                alt="Kembali ke login"
                className="w-12 h-40 object-contain cursor-pointer"
              />
              <h1 className="text-[20px] font-bold text-neutral text-center">
                Sudah Punya Akun
              </h1>
            </button>
          <h1 className="text-[24px] font-bold text-neutral text-left">
            Yuk Daftar Dulu!
          </h1>
          <p className="text-left text-neutral mb-6">
            Biar kamu bisa temukan jurusan dan kampus terbaik sesuai
            kepribadianmu.
          </p>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Masukan Email kamu"
          className="w-full border border-neutral rounded-xl px-3 py-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
            </div>
            <div className="flex items-center gap-2 mt-2 text-sm text-neutral">
              <div className="w-4 h-4 flex items-center justify-center rounded-full bg-neutral text-white text-xs font-bold">
                i
              </div>
              <span>Pastikan email kamu sudah benar</span>
            </div>

              <Button label="Lanjut" variant="solid-dark" className="w-full" onClick={handleNext}/>

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

export default Register;
