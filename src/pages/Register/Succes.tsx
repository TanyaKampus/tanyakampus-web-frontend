// import Lulu from "@/assets/images/LuluBodas.png";
// import Vector from "@/assets/images/VectorLogin.png";
import Button from "@/components/Button";
// import LogoItem from "@/components/LogoItem";
import LuluIjo from "@/assets/images/LuluIjo.png";
import LuluHappy from "@/assets/images/LuluHappy1.png";
import BubbleKanan from "@/assets/images/Bubblekn.png";
import BubbleKiri from "@/assets/images/Bubblest.png";

const Succes = () => {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen relative bg-gray-50 pt-10">
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
      <div className="flex flex-col items-center px-4 pt-10 text-center space-y-4 max-w-md w-full">
        {/* Logo dan Judul */}
        <div className="flex items-center justify-center gap-3">
          <img
            src={LuluIjo}
            alt="Logo TanyaKampus"
            className="w-12 h-12 object-contain"
          />
          <h1 className="text-teal-500 font-bold text-xl">TanyaKampus</h1>
        </div>

        <h1 className="text-neutral font-bold text-2xl mt-15">
          Yeay! Akun kamu sudah jadi
        </h1>
        <p className="text-neutral text-base">
          Sekarang kamu bisa mulai kenalin diri dan temukan jurusan serta kampus
          yang paling cocok buat kamu.
        </p>

        <Button
          label="Selamat Datang di TanyaKampus"
          variant="solid-dark"
          className="w-full mt-4"
        />
      </div>


      <div className="absolute bottom-0 w-full">
        <img
          src={LuluHappy}
          alt="Lulu Happy"
          className="w-2/9 object-contain mx-auto"
        />
      </div>
    </div>
  );
};

export default Succes;
