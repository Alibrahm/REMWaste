// src/components/AnimatedSkipDisplay.tsx
"use client";
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";

interface AnimatedSkipDisplayProps {
  currentSkipSize?: number; 
}

const AnimatedSkipDisplay: React.FC<AnimatedSkipDisplayProps> = ({ currentSkipSize }) => {
  const getImageUrl = (size: number) => {
    switch (size) {
      case 4: return 'https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/4-yarder-skip.jpg';
      case 5: return 'https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/5-yarder-skip.jpg';
      case 6: return 'https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/6-yarder-skip.jpg';
      case 8: return 'https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/8-yarder-skip.jpg';
      case 10: return 'https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/10-yarder-skip.jpg';
      case 12: return 'https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/12-yarder-skip.jpg';
      default: return 'https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/generic-skip.jpg'; 
    }
  };

  const imageUrl = getImageUrl(currentSkipSize || 6); 

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative w-full h-[250px] md:h-[400px] flex items-center justify-center
                 rounded-2xl bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] border border-[#0037C1] shadow-2xl overflow-hidden backdrop-blur-sm"
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <Image
          src={imageUrl}
          alt={`Large Animated Skip`}
          layout="fill"
          objectFit="contain" 
          className={cn(
            "transition-transform duration-300 ease-out",
            "animate-subtle-float-lg" 
          )}
          onError={(e) => { e.currentTarget.src = `https://placehold.co/400x300/2A3B4C/E0E0E0?text=Animated+Skip`; }}
        />
      </div>

      <div className="absolute bottom-4 left-4 right-4 text-center text-white text-lg md:text-xl font-bold bg-black/50 p-2 rounded-lg backdrop-blur-sm">
        <span className="text-[#0037C1]">{currentSkipSize || 'Your'}</span> Yard Skip
      </div>
    </motion.div>
  );
};

export default AnimatedSkipDisplay;