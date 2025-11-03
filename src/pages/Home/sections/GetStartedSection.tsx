import Button from "@/components/Button";
import LuluIcon from "@/assets/images/LuluGetStarted.png";

const GetStartedSection = () => {
  return (
    <div className="py-28">
      <div className="relative w-full h-[384px] bg-gradient-to-tr from-primary-200 to-primary-100 text-neutral-white overflow-hidden">
        <div className="absolute left-8 top-1/2 -translate-y-1/2 max-w-4xl flex flex-col gap-3">
          <h1 className="text-4xl font-semibold">Yuk Mulai Petualanganmu!</h1>
          <p className="text-2xl max-w-xl">
            Gratis, cuma butuh 5 menit buat tahu jurusan impianmu!
          </p>
          <Button
            label="Mulai Tes Sekarang"
            variant="solid-light"
            className="w-80 mt-6"
          />
        </div>

        <img
          src={LuluIcon}
          alt="Lulu Icon"
          className="absolute -right-40 -bottom-70 w-[640px] h-[671px] object-cover"
        />
      </div>
    </div>
  );
};

export default GetStartedSection;
