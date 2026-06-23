"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export function SecretEnding() {
  const [open, setOpen] = useState(false);

  return (
    <section className="chapter grid place-items-center overflow-hidden bg-[#071221] text-white">
      <div className="absolute inset-0 bg-[linear-gradient(130deg,rgba(187,216,255,0.2),transparent_38%,rgba(255,214,231,0.13)_70%,transparent)]" />
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.p
          animate={{ opacity: 1, y: 0 }}
          className="text-xl text-white/72"
          initial={{ opacity: 0, y: 22 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          One final memory remains locked.
        </motion.p>
        <button
          className="crystal relative mx-auto mt-12 grid h-72 w-52 place-items-center overflow-hidden bg-gradient-to-b from-white via-[#bbd8ff] to-[#cfc6ff] text-ink shadow-glow"
          onClick={() => setOpen(true)}
          type="button"
        >
          <span className="font-display text-5xl">Open</span>
          <div className="shimmer-line" />
        </button>
        {open ? (
          <motion.div animate={{ opacity: 1, y: 0 }} className="mx-auto mt-12 max-w-2xl" initial={{ opacity: 0, y: 24 }}>
            <h2 className="font-display text-6xl leading-none">For Parul</h2>
            <p className="mt-8 text-xl leading-9 text-white/76">
              Happy 21st. You are loved more loudly than this page can say, and every person here is
              lucky to be part of your story.
            </p>
          </motion.div>
        ) : null}
      </div>
    </section>
  );
}
