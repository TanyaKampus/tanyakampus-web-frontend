import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;     
  variant?: 'solid' | 'outline' | 'solid-dark' | 'solid-light';
  className?: string; 
}

const Button: React.FC<ButtonProps> = ({ 
  label, 
  variant = 'solid-dark', 
  className = '', 
  ...rest 
}) => {
  const baseClasses = 'cursor-pointer font-semibold px-5 py-3 rounded-lg transition-colors duration-200';

  const getVariantClasses = (variant: string) => {
    switch (variant) {
      case 'solid':
        return 'border border-tertiary-100 font-semibold rounded-lg hover:bg-white hover:text-primary-300 transition-colors';
      case 'outline':
        return 'bg-transparent border border-white text-white hover:bg-white hover:text-primary-300';
      case 'solid-light':
        return 'bg-white text-primary-300 font-semibold px-5 py-2 rounded-lg hover:bg-gray-200 transition-colors';
      case 'solid-dark':
        return 'bg-primary-300 text-white hover:bg-primary-400';
      default:
        return 'bg-primary-300 text-white hover:bg-primary-400';
    }
  };

  const variantClasses = getVariantClasses(variant);

  return (
    <button className={`${baseClasses} ${variantClasses} ${className}`} {...rest}>
      {label}
    </button>
  );
};

export default Button;

