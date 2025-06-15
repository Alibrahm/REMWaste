// src/components/HeavyWasteTypeButton.tsx
import React from 'react';

interface HeavyWasteTypeButtonProps {
  label: string;
  isSelected: boolean;
  onToggle: (label: string) => void;
}

const HeavyWasteTypeButton: React.FC<HeavyWasteTypeButtonProps> = ({ label, isSelected, onToggle }) => {
  return (
    <button
      onClick={() => onToggle(label)}
      className={`
        px-4 py-2 rounded-lg font-semibold text-sm sm:text-base transition-colors duration-200 ease-in-out
        ${isSelected
          ? 'bg-[#0037C1] text-white'
          : 'bg-gray-700 text-gray-200 hover:bg-gray-600'} // Unselected state
      `}
    >
      {label}
    </button>
  );
};

export default HeavyWasteTypeButton;