import CampusCard, { type CampusCardProps } from '@/components/CampusCard';
import Button from '@/components/Button';

// Import CSS untuk react-slick
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from 'react';
import UnpadLogo from '@/assets/images/UnpadLogo.png'
import TelULogo from '@/assets/images/TelULogo.png'
import ITBLogo from '@/assets/images/ITBLogo.png'
import UnikomLogo from '@/assets/images/UnikomLogo.png'
const RecommendationSection = () => {
  // Data dummy untuk kartu kampus
  const campuses: CampusCardProps[] = [
    {
      imageUrl: 'https://placehold.co/400x600/3498db/ffffff?text=Unikom',
      logoUrl: UnikomLogo,
      name: 'Universitas Komputer Indonesia',
      type: 'Swasta',
    },
    {
      imageUrl: 'https://placehold.co/400x600/2ecc71/ffffff?text=ITB',      
      logoUrl: ITBLogo,
      name: 'Institut Teknologi Bandung',
      type: 'Negeri',
    },
    {
      imageUrl: 'https://placehold.co/400x600/e74c3c/ffffff?text=Unpad',
      logoUrl: UnpadLogo,
      name: 'Universitas Padjadjaran',
      type: 'Negeri',
    },
    {
      imageUrl: 'https://placehold.co/400x600/f1c40f/ffffff?text=Tel-U',
      logoUrl: TelULogo,
      name: 'Telkom University',
      type: 'Swasta',
    },
  ];

const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  const SLIDE_INTERVAL = 4000; 
  const FADE_DURATION = 500; 

  useEffect(() => {
    if (campuses.length <= 3) return; 
    const intervalId = setInterval(() => {
      setIsFading(true); 

      setTimeout(() => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % campuses.length);
        setIsFading(false);
      }, FADE_DURATION);

    }, SLIDE_INTERVAL);

    return () => clearInterval(intervalId);
  }, [campuses.length]);

  const displayCampuses = [];
  for (let i = 0; i < 3; i++) {
    displayCampuses.push(campuses[(currentIndex + i) % campuses.length]);
  }

  return (
    <section className="px-32 py-82 relative z-10 overflow-hidden">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between text-neutral items-start md:items-center mb-12 px-4">
          <div>
            <h2 className="text-4xl max-w-2xl font-bold text-gray-800">
              Kampus ini cocok banget buat kamu
            </h2>
            <p className="text-xl max-w-xs font-medium text-gray-600 mt-4">
              Yuk intip kampus yang cocok banget deh buat kamu!
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex-shrink-0">
            <Button label="Cari kampus lainnya" variant="outline-dark" />
          </div>
        </div>

        <div className="relative flex justify-center items-center h-96">
          <div
            className={`flex justify-center gap-6 transition-opacity duration-500 ease-in-out ${isFading ? 'opacity-0' : 'opacity-100'}`}
          >
            {displayCampuses.map((campus) => (
              <CampusCard key={campus.name} {...campus} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecommendationSection;
