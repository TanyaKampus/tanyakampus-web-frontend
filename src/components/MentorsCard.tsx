import React from "react";

export interface MentorsCardProps {
  imageUrl: string;
  name: string;
  originCampuss: string;
  major: string;

  // ✅ pakai nama field dari backend
  logo_kampus: string;

  className?: string;
}

const MentorsCard: React.FC<MentorsCardProps> = ({
  imageUrl,
  name,
  originCampuss,
  major,
  logo_kampus,
  className = "",
}) => {
  return (
    <div
      className={`relative ${className} w-full h-[150px] rounded-lg overflow-hidden transition-transform duration-300 hover:scale-[1.02]`}
    >
      <img src={imageUrl} alt={name} className="m-auto" />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      <div className="absolute top-4 right-4 bg-white text-secondary-500 px-3 py-1 text-sm font-semibold rounded-lg z-10">
        {major}
      </div>

      <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3 z-10">
        <div className="w-12 h-12 rounded-full flex items-center justify-center p-1 bg-white/90">
          <img
            src={logo_kampus}
            alt={`${originCampuss} logo`}
            className="w-full h-full object-contain"
          />
        </div>

        <div className="gap-2 flex flex-col">
          <h3 className="text-white font-semibold text-lg leading-tight">
            {name}
          </h3>
          <p className="text-white">{originCampuss}</p>
        </div>
      </div>
    </div>
  );
};

export default MentorsCard;
