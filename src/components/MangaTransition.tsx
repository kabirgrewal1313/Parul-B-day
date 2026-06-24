"use client";

import { motion } from "framer-motion";

interface MangaTransitionProps {
  leftImage?: string;
  rightImage?: string;
  leftAlt?: string;
  rightAlt?: string;
}

export function MangaTransition({
  leftImage = "/images/WhatsApp Image 2026-06-24 at 16.11.42.jpeg",
  rightImage = "/images/WhatsApp Image 2026-06-24 at 16.13.24.jpeg",
  leftAlt = "Manga panel",
  rightAlt = "Manga panel",
}: MangaTransitionProps) {
  return (
    <section className="relative overflow-hidden bg-white px-4 py-24 text-ink">
      <div className="absolute inset-0 speed-lines opacity-60" />

      <div className="relative mx-auto grid max-w-6xl gap-5 md:grid-cols-[1.15fr_0.85fr]">
        <motion.div
          className="manga-panel overflow-hidden"
          initial={{ rotate: -2, x: -80, opacity: 0 }}
          whileInView={{ rotate: -1, x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.9 }}
        >
          <img
            src={leftImage}
            alt={leftAlt}
            className="w-full object-contain"
          />
        </motion.div>

        <motion.div
          className="manga-panel overflow-hidden"
          initial={{ rotate: 3, x: 80, opacity: 0 }}
          whileInView={{ rotate: 1, x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.9, delay: 0.15 }}
        >
          <img
            src={rightImage}
            alt={rightAlt}
            className="w-full object-contain"
          />
        </motion.div>
      </div>
    </section>
  );
}