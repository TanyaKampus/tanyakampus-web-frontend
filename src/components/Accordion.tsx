import React, { useState } from 'react';
import AccordionItem from './AccordionItem'; 

export interface AccordionData {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionData[];
}

const Accordion: React.FC<AccordionProps> = ({ items }) => {
  const [openItemId, setOpenItemId] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setOpenItemId(prevId => (prevId === id ? null : id));
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <div className="space-y-6 relative z-0">
        {items.map(item => (
          <AccordionItem
            key={item.id}
            title={item.title}
            isOpen={openItemId === item.id}
            onToggle={() => handleToggle(item.id)}
          >
            {item.content}
          </AccordionItem>
        ))}
      </div>
    </div>
  );
};

export default Accordion;