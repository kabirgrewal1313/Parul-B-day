"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { characterForms } from "@/lib/story-data";

export function CharacterCarousel() {
  const [active, setActive] = useState(0);
  const form = characterForms[active];
  const Icon = form.icon;

  return (
    <section className={`chapter overflow-hidden bg-gradient-to-br ${form.palette}`}>
      <div className="absolute left-[-4vw] top-24 giant-word">Faces</div>
      <div className="chapter-inner">
        <div className="reveal mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="mb-4 text-sm uppercase text-ink/56">Chapter 2</p>
            <h2 className="font-display text-6xl leading-none text-ink sm:text-8xl">The Many Faces Of Parul</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {characterForms.map((item, index) => {
              const ItemIcon = item.icon;
              return (
                <button
                  className={`grid h-12 w-12 place-items-center rounded-full border transition ${
                    active === index ? "border-white bg-white text-ink shadow-glow" : "border-white/70 bg-white/36 text-ink/64"
                  }`}
                  key={item.title}
                  onClick={() => setActive(index)}
                  title={item.title}
                  type="button"
                >
                  <ItemIcon size={19} />
                </button>
              );
            })}
          </div>
        </div>
        <div className="reveal relative min-h-[620px] overflow-hidden border border-white/80 bg-white/36 shadow-crystal backdrop-blur-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              animate={{ opacity: 1, x: 0, scale: 1 }}
              className="absolute inset-0 grid items-center gap-8 p-6 lg:grid-cols-[0.95fr_1.05fr] lg:p-12"
              exit={{ opacity: 0, x: -80, scale: 0.98 }}
              initial={{ opacity: 0, x: 80, scale: 1.02 }}
              key={form.title}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <div className="relative z-10 max-w-xl">
                <div className="mb-8 grid h-16 w-16 place-items-center rounded-full bg-white text-ink shadow-glow">
                  <Icon size={28} />
                </div>
                <p className="text-sm uppercase text-ink/56">{form.role}</p>
                <h3 className="mt-2 font-display text-7xl leading-none text-ink sm:text-9xl">{form.title}</h3>
                <p className="mt-8 text-xl leading-9 text-ink/72">{form.description}</p>
              </div>
              <div className="relative min-h-[560px]">
                <div className="absolute inset-x-12 bottom-6 h-32 rounded-[50%] bg-white/70 blur-3xl" />
                <Image
                  alt={form.title}
                  className="object-contain drop-shadow-[0_30px_55px_rgba(70,99,150,0.26)]"
                  fill
                  sizes="(max-width: 900px) 92vw, 50vw"
                  src={form.image}
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
