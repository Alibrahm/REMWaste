// src/app/select-skip/page.tsx
"use client";
import { useState } from "react";
import Stepper from "@/components/Stepper";
import Button from "@/components/Button";
import SkipCard from "@/components/SkipCard";
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from "framer-motion";
import { useAddressStore } from '@/store/addressStore';
import { useSkipStore } from '@/store/skipStore';
import { useSkipsSWR } from '@/hooks/useSkipsSWR';
import { Skip } from "@/types";
import SelectedSkipBanner from "@/components/SelectedSkipBanner";
import { SparklesIcon, TruckIcon, HomeModernIcon, RocketLaunchIcon, UserGroupIcon } from "@heroicons/react/24/outline";

// Helper component for the bento boxes
const BentoBox = ({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: delay, ease: "easeOut" }}
        className={`relative p-4 rounded-2xl bg-white border border-gray-100 shadow-xl flex flex-col justify-between overflow-hidden
                    hover:shadow-2xl hover:border-blue-100 transition-all duration-300 ease-in-out
                    ${className}`}
    >
        {children}
    </motion.div>
);

export default function SelectSkipPage() {
    const router = useRouter();

    const postalCode = useAddressStore((state) => state.postalCode);
    const area = useAddressStore((state) => state.selectedAddressDetails?.city || null);
    const { skips, isLoadingSkips, error: skipsError } = useSkipsSWR(postalCode, area);

    const selectedSkip = useSkipStore((state) => state.selectedSkip);
    const setSelectedSkip = useSkipStore((state) => state.setSelectedSkip);

    const [hoveredCardId, setHoveredCardId] = useState<number | null>(null);

    const handleSelectSkip = (skip: Skip) => {
        setSelectedSkip(skip);
    };

    const handleContinue = () => {
        if (!selectedSkip) {
            alert("Please select a skip size to continue.");
            return;
        }
        console.log("Selected Skip:", selectedSkip);
        router.push('/permit-check');
    };

    const formatPrice = (priceBeforeVat: number, vat: number) => {
        return (priceBeforeVat * (1 + vat / 100)).toFixed(2);
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800 relative overflow-hidden">
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: 'url(/images/wasteskipbg.png)',
                    backgroundRepeat: 'repeat',
                    backgroundSize: 'auto',
                    backgroundAttachment: 'fixed',
                }}
            >
                <div className="absolute inset-0 bg-black/50 backdrop-brightness-75"></div>
            </div>
            <div className="absolute inset-0 z-10 opacity-5">
                <div className="absolute inset-0 bg-[length:60px_60px] [background-image:linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)]"></div>
                <div className="absolute inset-0 bg-[length:100px_100px] [background-image:linear-gradient(45deg,rgba(0,0,0,0.01)_1px,transparent_1px),linear-gradient(-45deg,rgba(0,0,0,0.01)_1px,transparent_1px)]"></div>
            </div>
            <Stepper currentStepIndex={2} />
            <main className="flex-grow flex flex-col items-center p-4 py-8 relative z-20">
                {/* Main Heading for the Page -contrast against the background */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="w-full text-center mb-12 relative z-30"
                >
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-2 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-[#1E40AF] to-blue-600 drop-shadow-lg">
                        Choose Your Perfect Disposal Solution
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-100 max-w-3xl mx-auto font-light text-shadow-md">
                        Select the ideal skip size for your waste needs and explore our reliable services.
                    </p>
                </motion.div>

                <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
                    {/* Selected Skip Banner */}
                    <BentoBox className="md:col-span-2 lg:col-span-3 flex items-center justify-center">
                        <AnimatePresence mode="wait">
                            {selectedSkip ? (
                                <SelectedSkipBanner selectedSkip={selectedSkip} formatPrice={formatPrice} />
                            ) : (
                                <motion.div
                                    key="no-selection-message"
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 20 }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                    className="w-full h-full flex items-center justify-center text-gray-500 text-lg sm:text-xl text-center flex-col p-4"
                                >
                                    <TruckIcon className="h-16 w-16 text-gray-300 mb-4" />
                                    <p className="font-semibold mb-2">Ready to find your perfect skip?</p>
                                    <p className="text-sm text-gray-400">Select a skip size below to see details here.</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </BentoBox>

                    <BentoBox delay={0.2} className="hidden lg:flex flex-col items-center justify-center text-center">
                        <SparklesIcon className="h-12 w-12 text-[#1E40AF] mb-3" />
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Effortless Process</h3>
                        <p className="text-gray-600 text-sm">Quick and easy booking from selection to delivery.</p>
                    </BentoBox>

                    {/* Skip Cards Grid */}
                    {isLoadingSkips || skipsError || skips.length === 0 ? (
                        <div className="md:col-span-4 lg:col-span-4 min-h-[400px] flex items-center justify-center">
                            {isLoadingSkips ? (
                                <div className="text-gray-600 text-xl py-10 text-center flex flex-col items-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-10 w-10 text-[#1E40AF]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <p className="mt-4">Fetching available skips...</p>
                                </div>
                            ) : skipsError ? (
                                <div className="text-red-600 text-lg text-center py-10 max-w-xl mx-auto bg-white/80 rounded-lg p-6 border border-red-300 shadow-md">
                                    <p className="font-semibold mb-2">Failed to load skips.</p>
                                    <p className="text-sm text-gray-600">{skipsError.message}.</p>
                                    <p className="text-xs text-gray-500 mt-3">
                                        Please ensure a valid postcode was selected on the previous page or try refreshing.
                                    </p>
                                </div>
                            ) : (
                                <div className="text-gray-500 text-lg text-center py-10 bg-white/80 rounded-lg p-6 border border-gray-200 shadow-md">
                                    No skips available for your location ({postalCode || 'N/A'}). Please try a different address.
                                </div>
                            )}
                        </div>
                    ) : (
                        <BentoBox delay={0.3} className="md:col-span-2 lg:col-span-4 min-h-[500px] overflow-hidden">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Available Skip Sizes</h2>
                            <motion.div
                                initial="hidden"
                                animate="visible"
                                variants={{
                                    visible: { transition: { staggerChildren: 0.05 } },
                                }}
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                            >
                                {skips.map((skip) => (
                                    <SkipCard
                                        key={skip.id}
                                        skip={skip}
                                        isSelected={selectedSkip?.id === skip.id}
                                        onSelect={handleSelectSkip}
                                        hoveredCardId={hoveredCardId}
                                        setHoveredCardId={setHoveredCardId}
                                    />
                                ))}
                            </motion.div>
                        </BentoBox>
                    )}


                    {/* More Info Boxes - Colors adjusted */}
                    <BentoBox delay={0.4} className="md:col-span-1 hidden lg:flex flex-col items-center justify-center text-center">
                        <HomeModernIcon className="h-12 w-12 text-purple-600 mb-3" />
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Residential & Commercial</h3>
                        <p className="text-gray-600 text-sm">Solutions tailored for homes, businesses, and construction sites.</p>
                    </BentoBox>

                    <BentoBox delay={0.5} className="hidden lg:flex flex-col items-center justify-center text-center">
                        <RocketLaunchIcon className="h-12 w-12 text-orange-600 mb-3" />
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Fast Delivery</h3>
                        <p className="text-gray-600 text-sm">Next-day delivery available in most areas.</p>
                    </BentoBox>

                    <BentoBox delay={0.6} className="hidden lg:flex flex-col items-center justify-center text-center">
                        <UserGroupIcon className="h-12 w-12 text-pink-600 mb-3" />
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Customer Support</h3>
                        <p className="text-gray-600 text-sm">Dedicated team ready to assist you.</p>
                    </BentoBox>
                </div>

                <p className="relative z-10 text-gray-100 text-xs text-center max-w-2xl mx-auto mt-12 mb-20 text-shadow-md">
                    Imagery and information shown throughout this website may not reflect the exact shape or size specification, colours may vary, options and/or accessories may be featured at additional cost.
                </p>
            </main>

            {/* Sticky bottom navigation bar - Adapted for lighter theme */}
            <AnimatePresence>
                {selectedSkip && (
                    <motion.div
                        initial={{ y: "100%", opacity: 0 }}
                        animate={{ y: "0%", opacity: 1 }}
                        exit={{ y: "100%", opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="
                            fixed bottom-0 left-0 right-0
                            bg-white border-t border-gray-200
                            py-4 px-4 sm:px-6 md:px-8
                            flex flex-col sm:flex-row items-center justify-between
                            shadow-xl
                            z-50
                        "
                    >
                        <div className="text-sm sm:text-base flex items-center md:pl-10 text-gray-700 mb-2 sm:mb-0">
                            <span className="font-semibold text-gray-900 mr-2">Selected:</span>{" "}
                            <span className="text-[#1E40AF] font-bold text-lg mr-2">{selectedSkip.size} Yard Skip</span>
                            <span className="text-blue-600 font-bold text-lg">&pound;{formatPrice(selectedSkip.price_before_vat, selectedSkip.vat)}</span>
                        </div>
                        <div className="flex space-x-3 w-full sm:w-auto">
                            <Button
                                variant="secondary"
                                size="small"
                                onClick={() => router.back()}
                                className="w-full sm:w-auto px-5 py-2.5  text-white rounded-full border border-gray-300 hover:border-gray-400 bg-gray-100 text-gray-700 hover:bg-gray-200"
                            >
                                Back
                            </Button>
                            <Button
                                variant="primary"
                                size="small"
                                onClick={handleContinue}
                                className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-gradient-to-r from-[#1E40AF] to-blue-700 text-white font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300"
                            >
                                Continue <span className="ml-1 text-base">&rarr;</span>
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}