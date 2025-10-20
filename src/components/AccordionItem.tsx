import React, { useState, useEffect } from "react";

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  children,
  isOpen,
  onToggle,
}) => {
  const [isCollapsing, setIsCollapsing] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setIsCollapsing(true);
      const timer = setTimeout(() => {
        setIsCollapsing(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <div className="w-full">
      <button
        onClick={onToggle}
        className={`
          flex items-center justify-between w-full p-3 bg-white cursor-pointer
          shadow-md
          ${isOpen || isCollapsing ? "rounded-t-2xl" : "rounded-full"}
        `}
      >
        <span className="text-base font-semibold text-gray-800">{title}</span>

        <div
          className="
            flex-shrink-0 w-8 h-8 bg-pri rounded-full 
            flex items-center justify-center 
            transition-transform duration-300
          "
        >
          <span className="text-white text-xl cursor-pointer">
            {isOpen ? "-" : "+"}
          </span>
        </div>
      </button>

      <div
        className={`
          overflow-hidden bg-white shadow-md rounded-b-2xl
          transition-all duration-300 ease-in-out
          ${isOpen ? "max-h-96" : "max-h-0"}
        `}
      >
        <div className="p-5 text-gray-700">{children}</div>
      </div>
    </div>
  );
};

export default AccordionItem;
