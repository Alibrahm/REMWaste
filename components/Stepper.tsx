// src/components/Stepper.tsx
"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion"; 
import {
  CheckCircleIcon,
  MapPinIcon,
  TrashIcon,
  ArchiveBoxIcon,
  CalendarDaysIcon,
  CreditCardIcon,
} from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils"; 

interface Step {
  id: string;
  name: string;
  icon: React.ElementType;
  route: string;
}

interface StepperProps {
  currentStepIndex: number;
  className?: string;
}

const steps: Step[] = [
  { id: "01", name: "Postcode", icon: MapPinIcon, route: "/" },
  { id: "02", name: "Waste Type", icon: TrashIcon, route: "/waste-type" },
  { id: "03", name: "Select Skip", icon: ArchiveBoxIcon, route: "/select-skip" },
  { id: "04", name: "Permit Check", icon: CheckCircleIcon, route: "/permit-check" },
  { id: "05", name: "Choose Date", icon: CalendarDaysIcon, route: "/choose-date" },
  { id: "06", name: "Payment", icon: CreditCardIcon, route: "/payment" },
];

const Stepper: React.FC<StepperProps> = ({ currentStepIndex, className }) => {
  const router = useRouter();

  const handleStepClick = (route: string, index: number) => {
    if (index <= currentStepIndex) {
      router.push(route);
    }
  };

  const stepVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
    hover: { scale: 1.05, boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" },
    tap: { scale: 0.95 },
  };

  const iconVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0, opacity: 0 },
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "flex justify-center items-center py-6 border-b-[0.5] border-gray-100",
        " backdrop-blur-xs shadow-md z-30", 
        className
      )}
    >
      <ol className="flex items-center w-full max-w-6xl px-4 md:px-8">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <motion.li
              className={cn(
                "flex items-center group",
                index <= currentStepIndex ? "cursor-pointer" : "cursor-not-allowed"
              )}
              onClick={() => handleStepClick(step.route, index)}
              variants={stepVariants}
              initial="hidden"
              animate="visible"
              whileHover={index <= currentStepIndex ? "hover" : ""}
              whileTap={index <= currentStepIndex ? "tap" : ""}
              transition={{ duration: 0.2 }}
            >
              <div
                className={cn(
                  `flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 transition-all duration-300 ease-in-out flex-shrink-0`,
                  index < currentStepIndex
                    ? 'bg-[#1E40AF] border-[#1E40AF] text-white' 
                    : index === currentStepIndex
                      ? 'border-[#1E40AF] bg-white text-[#1E40AF] shadow-md ring-2 ring-[#1E40AF]/20' 
                      : 'border-gray-300 bg-white text-gray-500 group-hover:border-gray-400 group-hover:text-gray-600' 
                )}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {index < currentStepIndex ? (
                    <motion.div
                      key="check"
                      variants={iconVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                    >
                      <CheckCircleIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key={step.id}
                      variants={iconVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                    >
                      <step.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <span
                className={cn(
                  `ml-3 hidden sm:block text-sm sm:text-base font-medium whitespace-nowrap transition-colors duration-300`,
                  index < currentStepIndex
                    ? 'text-gray-600' 
                    : index === currentStepIndex
                      ? 'text-[#1E40AF] font-semibold'
                      : 'text-gray-400 group-hover:text-gray-600' 
                )}
              >
                {step.name}
              </span>
            </motion.li>

            {index < steps.length - 1 && (
              <div
                className={cn(
                  `mx-2 md:mx-4 h-0.5 flex-1 transition-colors duration-300`,
                  index < currentStepIndex
                    ? 'bg-[#1E40AF]' 
                    : 'bg-gray-300'
                )}
              />
            )}
          </React.Fragment>
        ))}
      </ol>
    </motion.nav>
  );
};

export default Stepper;