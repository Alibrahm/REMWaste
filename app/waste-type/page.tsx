// src/app/waste-type/page.tsx
"use client";

import { useState } from "react";
import Stepper from "@/components/Stepper";
import WasteTypeCard from "@/components/WasteTypeCard";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import HeavyWasteTypeButton from "@/components/HeavyWasteTypeButton";
import { WasteType } from "@/types";
import {
    BuildingOffice2Icon,
    HomeIcon,
    WrenchScrewdriverIcon,
    InformationCircleIcon,
    TrashIcon
} from "@heroicons/react/24/outline";
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from "framer-motion";
import { useWasteTypeStore } from '@/store/wasteTypeStore';

const wasteTypes: WasteType[] = [
    { id: "construction", name: "Construction Waste", description: "Building materials and renovation debris.", icon: WrenchScrewdriverIcon },
    { id: "household", name: "Household Waste", description: "General household items and furniture.", icon: HomeIcon },
    { id: "garden", name: "Garden Waste", description: "Green waste and landscaping materials", icon: TrashIcon },
    { id: "commercial", name: "Commercial Waste", description: "Business and office clearance", icon: BuildingOffice2Icon },
];

// Define heavy waste types
const heavyWasteOptions = [
    "Soil", "Concrete", "Bricks", "Tiles", "Sand", "Gravel", "Rubble"
];

export default function WasteTypePage() {
    const router = useRouter();
    const selectedWasteTypes = useWasteTypeStore((state) => state.selectedWasteTypes);
    const toggleWasteType = useWasteTypeStore((state) => state.toggleWasteType);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedHeavyWasteTypes, setSelectedHeavyWasteTypes] = useState<string[]>([]);

    const handleOpenModal = () => {
        if (selectedWasteTypes.length === 0) {
            alert("Please select at least one waste type to continue.");
            return;
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleToggleHeavyWaste = (type: string) => {
        setSelectedHeavyWasteTypes((prev) =>
            prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
        );
    };

    const handleConfirmHeavyWaste = () => {
        console.log("Confirmed Heavy Waste Types:", selectedHeavyWasteTypes);
        handleCloseModal();
        router.push('/select-skip');
    };

    const handleNoHeavyWaste = () => {
        setSelectedHeavyWasteTypes([]);
        handleCloseModal();
        router.push('/select-skip');
    };


    const getSelectedWasteTypeNames = () => {
        const names = selectedWasteTypes.map(id => {
            const type = wasteTypes.find(wt => wt.id === id);
            return type ? type.name : '';
        });
        if (names.length === 0) return "";
        if (names.length <= 3) return names.join(", ");
        return `${names.slice(0, 3).join(", ")}, and ${names.length - 3} more`;
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Stepper currentStepIndex={1} />

            <main className="flex-grow flex flex-col items-center p-4 py-8">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-2 md:mb-8">
                    What type of waste are you disposing of?
                </h1>

                <div className="w-full px-4 sm:px-0 md:max-w-3xl lg:max-w-4xl mb-2 md:mb-8">
                    <div className="bg-blue-900/20 p-3 sm:p-6 rounded-lg flex items-start">
                        <InformationCircleIcon className="h-6 w-6 text-blue-400 mr-3 flex-shrink-0 mt-0.5" />
                        <p className="text-gray-300 text-sm sm:text-base">
                            Select all that apply
                        </p>
                    </div>
                </div>

                <div className="w-full px-4 sm:px-0 md:max-w-3xl lg:max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
                    {wasteTypes.map((type) => (
                        <WasteTypeCard
                            key={type.id}
                            wasteType={type}
                            isSelected={selectedWasteTypes.includes(type.id)}
                            onSelect={toggleWasteType}
                        />
                    ))}
                </div>
            </main>

            <AnimatePresence>
                {selectedWasteTypes.length > 0 && (
                    <motion.div
                        initial={{ y: "100%", opacity: 0 }}
                        animate={{ y: "0%", opacity: 1 }}
                        exit={{ y: "100%", opacity: 0 }}
                        transition={{
                            duration: 0.3,
                            ease: "easeOut",
                        }}
                        className="
                            fixed bottom-0 left-0 right-0
                            bg-[#1a1a1a] border-t border-gray-800
                            py-4 px-4 sm:px-6 md:px-8
                            flex flex-col sm:flex-row items-center justify-between
                            shadow-lg
                            z-50
                        "
                    >
                        <div className="text-sm sm:text-base flex flex-col md:pl-10 text-gray-300 mb-2 sm:mb-0">
                            <span className="font-semibold text-white">Selected Waste Types:</span>{" "}
                            {getSelectedWasteTypeNames()}
                        </div>
                        <div className="flex space-x-2 w-full sm:w-auto">
                            <Button
                                variant="secondary"
                                size="small"
                                onClick={() => router.back()}
                                className="w-full sm:w-auto px-4 py-2"
                            >
                                Back
                            </Button>
                            <Button
                                variant="primary"
                                size="small"
                                onClick={handleOpenModal}
                                className={`w-full sm:w-auto px-4 py-2 ${selectedWasteTypes.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={selectedWasteTypes.length === 0}
                            >
                                Continue <span className="ml-1 text-base">&rarr;</span>
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="Do You Have Any Heavy Waste Types?">
                <p className="text-gray-300 text-sm sm:text-base mb-4 text-center">Select All That Apply</p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                    {heavyWasteOptions.map((option) => (
                        <HeavyWasteTypeButton
                            key={option}
                            label={option}
                            isSelected={selectedHeavyWasteTypes.includes(option)}
                            onToggle={handleToggleHeavyWaste}
                        />
                    ))}
                </div>

                <div className="flex flex-col space-y-3">
                    {selectedHeavyWasteTypes.length > 0 && (
                        <Button
                            onClick={handleConfirmHeavyWaste}
                            fullWidth
                            variant="primary"
                            className="bg-green-600 hover:bg-green-700 text-white"
                        >
                            Confirm Selected Heavy Waste
                        </Button>
                    )}
                    <Button
                        onClick={handleNoHeavyWaste}
                        fullWidth
                        variant="secondary"
                        className="bg-green-700/50 hover:bg-green-600/70 text-white"
                    >
                        I Don't Have Any
                    </Button>
                </div>
            </Modal>
        </div>
    );
}