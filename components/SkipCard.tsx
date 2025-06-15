// src/components/SkipCard.tsx
import React from 'react';
import { Skip } from '@/types';
import { CheckIcon, TruckIcon } from '@heroicons/react/20/solid'; 
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { cn } from "@/lib/utils"; 

interface SkipCardProps {
  skip: Skip;
  isSelected: boolean;
  onSelect: (skip: Skip) => void;
  hoveredCardId: number | null; 
  setHoveredCardId: React.Dispatch<React.SetStateAction<number | null>>; 
}

const SkipCard: React.FC<SkipCardProps> = ({ skip, isSelected, onSelect, hoveredCardId, setHoveredCardId }) => {
  const router = useRouter();
  const price = (skip.price_before_vat * (1 + skip.vat / 100)).toFixed(2);

  const getImageUrl = (size: number) => {
    switch (size) {
      case 4: return 'https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/4-yarder-skip.jpg';
      case 5: return 'https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/5-yarder-skip.jpg';
      case 6: return 'https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/6-yarder-skip.jpg';
      case 8: return 'https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/8-yarder-skip.jpg';
      case 10: return 'https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/8-yarder-skip.jpg';
      case 12: return 'https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/8-yarder-skip.jpg';
      default: return `https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/8-yarder-skip.jpg`;
    }
  };

  const imageUrl = getImageUrl(skip.size);

  const handleViewProduct = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/skip-details/${skip.id}`);
  };

  const isCurrentCardHovered = hoveredCardId === skip.id;
  const isAnyCardHovered = hoveredCardId !== null;

  return (
    <motion.div
      onMouseEnter={() => setHoveredCardId(skip.id)}
      onMouseLeave={() => setHoveredCardId(null)}
      className={cn(
        `relative flex flex-col p-5 rounded-xl shadow-lg bg-white border border-gray-200 cursor-pointer transition-all duration-300 ease-in-out group`,
        isAnyCardHovered && !isCurrentCardHovered && !isSelected && "opacity-50 scale-[0.98]",
        isSelected
          ? 'border-[#1E40AF] ring-2 ring-[#1E40AF] transform scale-105 z-20 shadow-xl'
          : 'hover:border-gray-400 hover:shadow-md' 
      )}
      onClick={() => onSelect(skip)}
      role="radio"
      aria-checked={isSelected}
      tabIndex={0}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={!isSelected && !isAnyCardHovered ? { scale: 1.02, boxShadow: "0 4px 8px rgba(0,0,0,0.1)" } : {}}
      whileTap={{ scale: isSelected ? 1.05 : 0.98 }}
    >
      {/* "ON SALE" banner */}
      {Math.random() > 0.7 && (
        <div className="absolute top-0 left-0 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-br-lg rounded-tl-xl z-10">
          ON SALE
        </div>
      )}

      {/* "Popular" badge */}
      {skip.size === 6 && (
        <div className="absolute top-0 -right-2 bg-gradient-to-r from-[#059669] to-green-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-xl transform translate-y-[-50%] rotate-3 shadow-md z-10">
          Popular
        </div>
      )}

      {/* Image Container with Checkmark */}
      <div className="relative w-full h-48 mb-4 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center border border-gray-200 shadow-sm">
        <Image
          src={imageUrl}
          alt={`${skip.size} Yard Skip`}
          width={300}
          height={200}
          className="object-contain w-full h-full"
          onError={(e) => {
            e.currentTarget.srcset = '';
            e.currentTarget.src = `https://placehold.co/300x200/CBD5E1/475569?text=Skip+${skip.size}Yd`;
            e.currentTarget.style.objectFit = 'contain';
          }}
        />
        {/* Selected Checkmark */}
        {isSelected && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute top-2 left-2 bg-[#1E40AF] p-1.5 rounded-full text-white shadow-md z-10"
          >
            <CheckIcon className="h-5 w-5" />
          </motion.div>
        )}
      </div>

      {/* Content Area */}
      <div className="text-center w-full flex-grow flex flex-col items-center">
        <h3 className="text-2xl font-extrabold text-gray-900 mb-1">
          {skip.size} Yard Skip
        </h3>
        <p className="text-base text-gray-700 font-medium mb-1">
          General Waste
          {skip.allows_heavy_waste && <span className="ml-1 text-[#059669]"> (Heavy Waste OK)</span>}
        </p>

        {/* Pricing */}
        <div className="my-2">
            {Math.random() > 0.7 && (
                <p className="text-sm text-gray-500 line-through">Was &pound;{(parseFloat(price) + 30).toFixed(2)}</p>
            )}
            <p className="text-3xl font-bold text-[#1E40AF]">&pound;{price}</p>
        </div>

        <div className="flex flex-col items-start w-full text-left mt-3">
          {/* Truck Banner for Allowed On Road */}
          {skip.allowed_on_road && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center text-blue-600 text-sm font-medium mb-1"
            >
              <TruckIcon className="h-5 w-5 mr-1 text-blue-500" />
              Road Placement Allowed
            </motion.div>
          )}

          {/* Hire Period */}
          <p className="flex items-center text-gray-600 text-sm mb-1">
            <CheckIcon className="h-4 w-4 text-[#059669] mr-1" />
            {skip.hire_period_days} Day Hire
          </p>

          {/* Finance Options */}
          <p className="flex items-center text-gray-600 text-sm">
            <CheckIcon className="h-4 w-4 text-[#059669] mr-1" />
            Finance Options Available
          </p>
        </div>
      </div>

      {/* Action Button: "View Product" or "Selected" */}
      <motion.button
        onClick={isSelected ? (e) => e.stopPropagation() : handleViewProduct}
        className={`w-full py-3 mt-4 rounded-lg font-semibold text-base transition-all duration-200 ease-in-out
          ${isSelected
            ? 'bg-[#1E40AF] text-white cursor-default'
            : 'bg-gray-100 text-gray-700 hover:bg-[#1E40AF] hover:text-white hover:shadow-lg'}
        `}
        disabled={isSelected}
        whileHover={!isSelected ? { scale: 1.01 } : {}}
        whileTap={{ scale: isSelected ? 1 : 0.99 }}
      >
        {isSelected ? (
          <span className="flex items-center justify-center">
            Selected
            <CheckIcon className="h-4 w-4 ml-2" />
          </span>
        ) : (
          'View Skip →'
        )}
      </motion.button>
    </motion.div>
  );
};

export default SkipCard;