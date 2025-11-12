import LaukOrange from "@/assets/images/LaukOrange.png";

const LaukOrangeSection = () => {
  return (
    <div className="relative px-10 py-20">
      <img
        src={LaukOrange}
        alt="Lauk Orange"
        className="absolute left-0 w-[250px] z-0 pointer-events-none"
      />
    </div>
  );
};

export default LaukOrangeSection;
