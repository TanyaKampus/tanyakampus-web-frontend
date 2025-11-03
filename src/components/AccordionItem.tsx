import { FaPlus, FaTimes } from "react-icons/fa";

interface AccordionItemProps {
  index: number;
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  question,
  answer,
  isOpen,
  onToggle,
}) => {
  return (
    <div
      onClick={onToggle}
      className={`transition-all duration-500 ease-in-out rounded-2xl cursor-pointer ${
        isOpen ? "bg-transparent shadow-md" : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-6 py-5">
        <h3
          className={`text-base font-semibold transition-colors duration-300 ${
            isOpen ? "text-neutral" : "text-neutral"
          }`}
        >
          {question}
        </h3>

        <div
          className={`bg-primary-300 w-10 h-10 rounded-full flex items-center justify-center text-white transform transition-transform duration-300 ${
            isOpen ? "rotate-90" : "rotate-0"
          }`}
        >
          {isOpen ? <FaTimes size={14} /> : <FaPlus size={14} />}
        </div>
      </div>

      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out px-6 ${
          isOpen ? "max-h-60 pb-6" : "max-h-0"
        }`}
      >
        <p className="text-neutral text-base max-w-lg leading-relaxed whitespace-pre-line">
          {answer}
        </p>
      </div>
    </div>
  );
};

export default AccordionItem;
