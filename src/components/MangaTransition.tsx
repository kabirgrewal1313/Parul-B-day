"use client";

import { motion } from "framer-motion";

export function MangaTransition({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <section className="relative min-h-[76vh] overflow-hidden bg-white px-4 py-24 text-ink">
      <div className="absolute inset-0 speed-lines opacity-60" />
      <div className="relative mx-auto grid w-full max-w-6xl gap-5 md:grid-cols-[1.15fr_0.85fr]">
        <motion.div
          className="manga-panel min-h-[420px] p-8"
          initial={{ rotate: -2, x: -80, opacity: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true, amount: 0.45 }}
          whileInView={{ rotate: -1, x: 0, opacity: 1 }}
        >
          <p className="text-sm uppercase text-ink/56">Manga Interlude</p>
          <h2 className="mt-8 font-display text-7xl leading-none sm:text-9xl">{title}</h2>
        </motion.div>
        <motion.div
          className="manga-panel flex min-h-[420px] items-end p-8"
          initial={{ rotate: 3, x: 80, opacity: 0 }}
          transition={{ delay: 0.16, duration: 0.9 }}
          viewport={{ once: true, amount: 0.45 }}
          whileInView={{ rotate: 1, x: 0, opacity: 1 }}
        >
          <div className="rounded-[48%] border-2 border-ink/70 bg-white px-8 py-7 text-xl leading-8 shadow-[8px_8px_0_rgba(187,216,255,0.55)]">
            {subtitle}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
