import React from 'react';

export interface CampusCardProps {
  imageUrl: string;
  logoUrl: string;
  name: string;
  type: 'Negeri' | 'Swasta';
}

const CampusCard: React.FC<CampusCardProps> = ({ imageUrl, logoUrl, name, type }) => {
  return (
    <div className="relative w-72 h-80 rounded-2xl overflow-hidden transform transition-transform duration-300 hover:scale-105">
      <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
      <div className={`absolute bg-white text-secondary-500 top-4 right-4 px-3 py-1 text-sm font-semibold rounded-lg`}>
        {type}
      </div>
      <div className="absolute bottom-0 left-0 p-5 flex items-center gap-3 w-full bg-gradient-to-t from-white/20 to-transparent">
        <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center p-1 ">
          <img src={logoUrl} alt={`${name} logo`} className="w-full h-full object-contain" />
        </div>
        <div>
          <h3 className="text-white font-semibold">{name}</h3>
        </div>
      </div>
    </div>
  );
};

export default CampusCard;
