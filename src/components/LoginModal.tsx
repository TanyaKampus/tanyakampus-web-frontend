import React from "react";
import Button from "./Button";
import LogoItem from "./LogoItem";
import BG from "@/assets/images/LoginVector.png";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
<div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
  <div className="relative bg-white rounded-2xl shadow-lg w-[90%] md:w-[450px] h-[94%] overflow-y-auto p-8 no-scrollbar">

    {/* Background Image */}
    <img
      src={BG}
      alt="background"
      className="absolute top-0 left-0 w-full h-[98%] object-cover pointer-events-none"
    />

    {/* Close Button */}
    <button
      onClick={onClose}
      className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-20"
    >
      ✕
    </button>

    {/* Konten */}
    <div className="relative z-10">
      <div className="flex items-center justify-center mb-6">
        <LogoItem />
      </div>
      <div className="flex flex-col text-center text-white">
        <h1 className="font-bold mb-2">Yuk masuk dulu!</h1>
        <p className="mb-2">Temukan jurusan dan kampus terbaik sesuai kepribadianmu.</p>
      </div>

      <div className="space-y-3 text-tertiary-100">
        <div>
          <label className="text-sm font-medium">Email</label>
          <input
            type="email"
            placeholder="Masukkan Email kamu"
            className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none placeholder:text-tertiary-100"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Password</label>
          <input
            type="password"
            placeholder="Masukkan Password kamu"
            className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none placeholder:text-tertiary-100"
          />
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-primary-400">
            <input type="checkbox" className="accent-primary-400" />
            Ingatkan saya
          </label>
          <button className="text-primary-400 hover:underline">Lupa Password?</button>
        </div>

        <Button label="Masuk" variant="solid-dark" className="w-full" />
      </div>

      <p className="text-center text-sm mt-4">
        Belum punya akun?{" "}
        <a href="#" className="text-primary-400 font-medium hover:underline">
          Daftar Sekarang
        </a>
      </p>

      <div className="flex items-center my-4">
        <hr className="flex-1 border-gray-300" />
        <span className="px-2 text-xs text-gray-400">atau dengan</span>
        <hr className="flex-1 border-gray-300" />
      </div>

      <button className="w-full flex items-center justify-center gap-2 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700">
        <span className="text-sm">Login dengan Google</span>
      </button>
    </div>
  </div>
</div>

  );
};

export default LoginModal;
