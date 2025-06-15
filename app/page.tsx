"use client";
import { motion } from "motion/react";
import React from "react";
import { AuroraBackground } from "../components/ui/aurora-background";
import { SearchCombobox } from "../components/SearchCombobox";

export default function Home() {
  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative min-h-screen flex flex-col gap-4 items-center justify-center px-4"
      >
        <h1
          className="text-[54px] sm:text-[72px] md:text-[72px] -mt-4 font-bold text-white text-center tracking-[-0.082em] heading drop-shadow-[0_2px_2px_rgba(255,255,255,0.4)]"
        >
          SKIP HIRE
        </h1>
        <h4 className="font-extralight text-base md:text-3xl -mt-4 dark:text-neutral-200 italic ">
          With a difference.
        </h4>
        <SearchCombobox />
        <span className="mt-4 text-center text-gray-400 text-sm">Version 1.1.35</span>
      </motion.div>
    </AuroraBackground>
  );
}
