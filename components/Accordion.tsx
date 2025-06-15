import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { useState } from "react";


interface AccordionProps {
    title: string;
    children: React.ReactNode;
  }
  
export const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div className="border-b border-gray-700 py-3">
        <button
          className="flex justify-between items-center w-full text-white py-2 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="text-lg font-semibold">{title}</span>
          <ChevronRightIcon className={`h-5 w-5 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
        </button>
        {isOpen && (
          <div className="pt-2 pb-4 text-gray-300">
            {children}
          </div>
        )}
      </div>
    );
  };