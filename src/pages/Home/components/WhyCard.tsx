import { MdKeyboardArrowRight } from "react-icons/md";

interface WhyCardProps {
  title: string;
  desc: string;
  bg: string;
  text: string;
  iconColor: string;
  img: string;
  vector: string;
}

const WhyCard: React.FC<WhyCardProps> = ({
  title,
  desc,
  bg,
  text,
  iconColor,
  img,
  vector,
}) => {
  return (
    <div
      className={`relative group cursor-pointer ${bg} ${text}
        flex flex-col justify-between p-6 md:p-8 rounded-2xl 
        transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] 
        w-[270px] md:w-[300px] h-[420px] hover:w-[480px] overflow-hidden`}
    >
      <img
        src={vector}
        alt="vector"
        className="absolute left-0 bottom-0 h-64 w-50"
      />

      <img
        src={img}
        alt={title}
        className="absolute bottom-0 left-0 w-36 md:w-64 object-contain opacity-0 translate-y-10 scale-95 
        transition-all duration-700 ease-out group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100"
      />

      <div className="z-10 relative flex flex-col justify-between h-full">
        <div className="transition-all duration-700 ease-out transform translate-y-48 group-hover:translate-y-0">
          <h3 className="text-xl font-semibold leading-snug mb-1">{title}</h3>
          <p className="text-sm opacity-90">{desc}</p>
        </div>

        <div
          className={`w-10 h-10 flex items-center justify-center rounded-full ${iconColor} self-end 
          transition-all duration-500 transform group-hover:translate-x-1`}
        >
          <MdKeyboardArrowRight size={40} />
        </div>
      </div>
    </div>
  );
};

export default WhyCard;
