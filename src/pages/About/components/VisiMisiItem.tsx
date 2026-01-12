import React from "react";

interface VisiMisiItemProps {
  label: string;
  title: string;
  desc: string;
}

const VisiMisiItem: React.FC<VisiMisiItemProps> = ({
  label,
  title,
  desc,
}) => {
  return (
    <div className="text-center space-y-8">
      <p className="text-primary-300 font-semibold text-xl">
        {label}
      </p>

      <h2 className="text-4xl font-bold text-tertiary-500">
        {title}
      </h2>

      <p className="text-neutral leading-relaxed font-medium">
        {desc}
      </p>
    </div>
  );
};

export default VisiMisiItem;
