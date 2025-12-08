import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant?:
    | "solid"
    | "outline"
    | "solid-dark"
    | "solid-light"
    | "outline-dark"
    | "google"
    | "neutral"
    | "error";
  className?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  active?: boolean; // ✅ tambahan baru
}

const Button: React.FC<ButtonProps> = ({
  label,
  variant = "solid-dark",
  className = "",
  startIcon,
  endIcon,
  active = false,
  ...rest
}) => {
  const baseClasses =
    "cursor-pointer font-semibold px-5 py-3 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2";

  const getVariantClasses = (variant: string) => {
    switch (variant) {
      case "solid":
        return "border border-tertiary-100 hover:bg-white hover:text-primary-300";
      case "outline":
        return "bg-transparent border border-white text-white hover:bg-white hover:text-primary-300";
      case "outline-dark":
        return "bg-transparent border border-primary-300 text-primary-300 hover:bg-primary-300 hover:text-white";
      case "solid-light":
        return "bg-white text-primary-300 font-semibold hover:bg-gray-200";
      case "solid-dark":
        return "bg-primary-300 text-white hover:bg-primary-400";
      case "neutral":
        return active
          ? "bg-neutral text-neutral-white"
          : "bg-neutral-white text-neutral hover:bg-gray-100";
      case "google":
        return "w-full flex items-center justify-center gap-2 bg-[#BE0B0B] text-white font-medium py-2 rounded-md hover:bg-[#C23321]";
      case "error":
        return "w-full flex items-center justify-center gap-2 bg-[#CF1F1F] text-white font-medium py-2 rounded-md hover:bg-[#9c1919]";
      default:
        return "bg-primary-300 text-white hover:bg-primary-400";
    }
  };

  const variantClasses = getVariantClasses(variant);

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${className}`}
      {...rest}
    >
      {startIcon && <span className="flex items-center">{startIcon}</span>}
      <span>{label}</span>
      {endIcon && <span className="flex items-center">{endIcon}</span>}
    </button>
  );
};

export default Button;
