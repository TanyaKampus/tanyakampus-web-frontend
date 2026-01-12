import React from "react";
import { AiFillInstagram, AiFillLinkedin  } from "react-icons/ai";

interface MemberCardProps {
  image: string;
  name: string;
  role: string;
  quote?: string;
}

const MemberCard: React.FC<MemberCardProps> = ({
  image,
  name,
  role,
  quote,
}) => {
  return (
    <div className="rounded-2xl p-4 transition">
      <img
        src={image}
        alt={name}
        className="w-full h-[300px] object-cover rounded-tr-4xl rounded-br-4xl rounded-bl-4xl"
      />

      <div className="mt-4 space-y-2">
        <span className="inline-block px-3 py-1 font-medium text-primary-300 border border-primary-300 rounded-full">
          {name}
        </span>

        <p className="text-sm font-semibold text-tertiary-500">
          {role}
        </p>

        {quote && (
          <p className="text-sm text-neutral">
            “{quote}”
          </p>
        )}

        <div className="flex gap-2 pt-2 text-teal-600 text-2xl">
          <span className="cursor-pointer"><AiFillInstagram /></span>
          <span className="cursor-pointer"><AiFillLinkedin /></span>
        </div>
      </div>
    </div>
  );
};

export default MemberCard;
