// src/components/SelectedSkipBanner.tsx
"use client";

import { motion } from "framer-motion";
import { TruckIcon, MapPinIcon, CheckIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { Skip } from "@/types";
import { FlipWords } from "@/components/ui/flip-words";
interface SelectedSkipBannerProps {
    selectedSkip: Skip;
    formatPrice: (price: number, vat: number) => string;
}

const SelectedSkipBanner = ({ selectedSkip, formatPrice }: SelectedSkipBannerProps) => {
    const imageUrl =
        selectedSkip.size === 4 ? 'https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/4-yarder-skip.jpg' :
            selectedSkip.size === 5 ? 'https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/5-yarder-skip.jpg' :
                selectedSkip.size === 6 ? 'https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/6-yarder-skip.jpg' :
                    selectedSkip.size === 8 ? 'https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/8-yarder-skip.jpg' :
                        selectedSkip.size === 10 ? 'https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/10-yarder-skip.jpg' :
                            selectedSkip.size === 12 ? 'https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/12-yarder-skip.jpg' :
                                `https://placehold.co/300x200/2A3B4C/E0E0E0?text=Skip+${selectedSkip.size}Yd`;

    const words = ["Sustainable Skips", "Financing options",];

    return (
        <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative w-full max-w-6xl mx-auto p-6 rounded-2xl bg-gradient-to-r from-blue-900 to-blue-700 text-white shadow-2xl overflow-hidden"
        >
            {/* Floating animated blobs */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-500 opacity-20 rounded-full mix-blend-screen filter blur-3xl animate-blob z-0"></div>
            <div className="absolute -bottom-12 right-0 w-40 h-40 bg-green-400 opacity-20 rounded-full mix-blend-screen filter blur-3xl animate-blob animation-delay-2000 z-0"></div>

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                {/* Skip Image */}
                <div className="flex-shrink-0 w-44 h-28 relative overflow-hidden rounded-lg border border-white/20">
                    <Image
                        src={imageUrl}
                        alt={`${selectedSkip.size} Yard Skip`}
                        fill
                        className="object-cover"
                    />
                </div>

                {/* Details */}
                <div className="flex-grow text-left space-y-1">
                    <div className="flex items-center space-x-2 text-xl font-semibold">
                        <CheckIcon className="w-5 h-5 text-green-300" />
                        <span>{selectedSkip.size} Yard Skip</span>
                    </div>
                    <div className="text-white text-sm">
                        <TruckIcon className="inline-block w-4 h-4 mr-1 text-white/70" />
                        Hire Period: <span className="font-medium">{selectedSkip.hire_period_days} days</span>
                    </div>

                    <div className="flex items-center  text-sm font-semibold">
                        <CheckIcon className="w-5 h-5 text-green-300" />
                        <FlipWords words={words} /> <br />
                    </div>
                   
                    <div className="text-white text-sm">
                        <MapPinIcon className="inline-block w-4 h-4 mr-1 text-white/70" />
                        {selectedSkip.postcode} {selectedSkip.area && `(${selectedSkip.area})`}
                    </div>
                    {selectedSkip.allows_heavy_waste && (
                        <div className="text-green-400 text-sm">
                            <CheckIcon className="inline-block w-4 h-4 mr-1" />
                            Allows Heavy Waste
                        </div>
                    )}
                </div>
                {/* <div className="flex flex-start">
                <div className="text-4xl mx-auto font-normal text-left text-neutral-600 dark:text-neutral-400">
                    Build
                    <FlipWords words={words} /> <br />
                    Solutions
                </div>
                </div> */}
            </div>

            <div className=" block absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-[20%] z-20">
                <div className="relative w-48 h-40">
                    <Image
                        src="/images/selectbanner.png"
                        alt="remwaste"
                        fill
                        objectFit="contain"
                        className="w-80 h-60 -translate-x-[30%]"
                        onError={(e) => { e.currentTarget.src = 'https://placehold.co/192x128/0037C1/FFFFFF?text=Skip+Plus'; e.currentTarget.style.objectFit = 'contain'; }}
                    />
                    <div className="absolute -top-6 right-8 w-24 h-24 bg-yellow-400 rounded-full flex flex-col items-center justify-center text-blue-900 font-bold text-center p-2 shadow-lg">
                        <span className="text-lg">NOW</span>
                        <span className="text-xl leading-tight"> &pound;{formatPrice(selectedSkip.price_before_vat, selectedSkip.vat)}</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default SelectedSkipBanner;