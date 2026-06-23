"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { letters } from "@/lib/story-data";

export function LetterChapter() {
  const [open, setOpen] = useState(0);

  return (
    <section className="chapter overflow-hidden bg-[#fffafd]">
      <div className="absolute left-[-5vw] top-20 giant-word">Letters</div>
      <div className="chapter-inner">
        <div className="reveal mb-10 max-w-3xl">
          <p className="mb-4 text-sm uppercase text-ink/56">Letter Chapter</p>
          <h2 className="font-display text-6xl leading-none text-ink sm:text-8xl">Sealed Notes Unfold</h2>
        </div>
        <div className="reveal grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="grid gap-4">
            {letters.map((letter, index) => (
              <button
                className={`border p-6 text-left transition ${
                  open === index ? "border-white bg-white shadow-crystal" : "border-white/70 bg-white/40"
                }`}
                key={letter.title}
                onClick={() => setOpen(index)}
                type="button"
              >
                <p className="text-xs uppercase text-ink/52">{letter.from}</p>
                <p className="mt-2 font-display text-3xl">{letter.title}</p>
              </button>
            ))}
          </div>
          <motion.article
            animate={{ rotateX: 0, opacity: 1, y: 0 }}
            className="min-h-[430px] origin-top border border-white bg-white/84 p-8 shadow-crystal"
            initial={{ rotateX: -18, opacity: 0, y: 20 }}
            key={letters[open].title}
            transition={{ duration: 0.72, ease: "easeOut" }}
          >
            <p className="font-handwritten text-2xl text-ink/58">{letters[open].from}</p>
            <h3 className="mt-8 font-display text-6xl leading-none">{letters[open].title}</h3>
            <p className="mt-10 font-handwritten text-3xl leading-[1.55] text-ink/78">{letters[open].body}</p>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
