"use client";

import { motion } from "framer-motion";

const lines = ["21 winters.", "21 seasons.", "Countless memories.", "June 24."];

export function IntroSequence() {
  return (
    <section className="relative grid min-h-screen place-items-center overflow-hidden bg-[#05070f] text-white">
      <div className="absolute inset-0 bg-[linear-gradient(160deg,transparent,rgba(187,216,255,0.22),transparent)]" />
      <motion.div
        animate={{ opacity: [0.25, 0.65, 0.28], scale: [1, 1.04, 1] }}
        className="absolute inset-x-0 top-1/3 mx-auto h-px w-3/4 bg-gradient-to-r from-transparent via-white/70 to-transparent"
        transition={{ duration: 6, repeat: Infinity }}
      />
      <div className="relative z-10 flex min-h-[62vh] flex-col items-center justify-center text-center">
        {lines.map((line, index) => (
          <motion.p
            animate={{ opacity: [0, 1, 1, 0], y: [18, 0, 0, -18] }}
            className="absolute font-display text-4xl uppercase leading-none text-white/88 sm:text-6xl"
            initial={{ opacity: 0 }}
            key={line}
            transition={{
              delay: index * 1.55,
              duration: 1.45,
              times: [0, 0.25, 0.72, 1]
            }}
          >
            {line}
          </motion.p>
        ))}
        <motion.h1
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          className="mt-36 font-display text-[22vw] uppercase leading-none text-white/90"
          initial={{ opacity: 0, y: 36, filter: "blur(18px)" }}
          transition={{ delay: 6.2, duration: 1.8, ease: "easeOut" }}
        >
          Parul
        </motion.h1>
      </div>
      <motion.div
        animate={{ opacity: 1 }}
        className="absolute bottom-8 z-10 text-xs uppercase text-white/52"
        initial={{ opacity: 0 }}
        transition={{ delay: 7.2, duration: 1.3 }}
      >
        Scroll to open the story
      </motion.div>
    </section>
  );
}
