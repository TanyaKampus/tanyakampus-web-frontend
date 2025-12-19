import Button from "@/components/Button";
import LuluIcon from "@/assets/images/LULUCS.png";
import Cumi from "@/assets/images/Cumi.png";

const GetStartedSection = () => {
  return (
    <div className="relative p-6 -mt-20">
      <img
        src={Cumi}
        alt="Cumi"
        className="absolute -top-32 right-0 w-[300px] z-0 pointer-events-none object-cover"
      />

      <div className="relative rounded-tr-[4rem] rounded-bl-[4rem] w-full h-[384px] bg-gradient-to-tr from-primary-200 via-primary-200 to-primary-100 text-neutral-white overflow-hidden z-10">
        <div className="absolute left-20 top-1/2 -translate-y-1/2 max-w-xl flex flex-col gap-3">
          <h1 className="text-4xl font-semibold">Bingung Mau Melangkah Kemana?</h1>
          <p className="text-xl max-w-7xl">
            Jangan khawatir, kami punya peta dan kompas untuk membantumu menemukan jalur yang tepat.
          </p>
          <Button
            label="Konsultasi Sekarang"
            variant="solid-light"
            className="w-80 mt-6"
          />
        </div>

        <img
          src={LuluIcon}
          alt="Lulu Icon"
          className="absolute right-0 h-[384px] object-cover"
        />
      </div>
    </div>
  );
};

export default GetStartedSection;
