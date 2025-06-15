// src/components/WasteTypeCard.tsx
import React from "react";
import { WasteType } from "@/types";
import { CheckIcon } from '@heroicons/react/20/solid'; 

interface WasteTypeCardProps {
  wasteType: WasteType;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const WasteTypeCard: React.FC<WasteTypeCardProps> = ({ wasteType, isSelected, onSelect }) => {
  // Main card container styles
  const cardClasses = `
    flex items-start py-4 px-6 rounded-lg shadow-lg cursor-pointer transition-all duration-200
    ${isSelected ? 'bg-[#0037C1]/10 border-2 border-[#0037C1]' : 'bg-[#212121] border-2 border-transparent hover:border-gray-600'}
  `;

  // Icon container styles (the colored circle background)
  const iconContainerClasses = `
    flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center mr-4
    ${isSelected ? 'bg-[#0037C1]/20' : 'bg-[#161616] border border-[#2A2A2A] text-gray-400'}
  `;

  // Actual icon styles
  const iconClasses = `
    h-7 w-7 ${isSelected ? 'text-[#0037C1]' : 'text-gray-400'}
  `;

  // Title text styles
  const titleClasses = `
    text-lg sm:text-xl font-semibold
    ${isSelected ? 'text-white' : 'text-white'}
  `;

  // Description text styles
  const descriptionClasses = `
    text-sm sm:text-base mt-1
    ${isSelected ? 'text-blue-100' : 'text-gray-400'}
  `;

  // Checkbox styles (the square with the tick)
  const checkboxClasses = `
    flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center self-start mt-1
    ${isSelected ? 'bg-[#0037C1] border-[#0037C1]' : 'bg-transparent border-gray-500'}
  `;

  return (
    <div
      className={cardClasses}
      onClick={() => onSelect(wasteType.id)}
      role="checkbox"
      aria-checked={isSelected}
      tabIndex={0}
    >
      {/* Icon Section */}
      <div className={iconContainerClasses}>
        <wasteType.icon className={iconClasses} />
      </div>

      {/* Text Content Section */}
      <div className="flex-grow">
        <h3 className={titleClasses}>{wasteType.name}</h3>
        <p className={descriptionClasses}>{wasteType.description}</p>
      </div>

      {/* Checkbox Section */}
      <span className={checkboxClasses}>
        {isSelected && (
          <CheckIcon className="w-4 h-4 text-white" />
        )}
      </span>
    </div>
  );
};

export default WasteTypeCard;