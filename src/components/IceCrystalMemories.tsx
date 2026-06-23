"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { MemoryImage } from "@/components/MemoryImage";
import { useMemories } from "@/hooks/useMemories";

export function IceCrystalMemories() {
  const { memories, loading, error, count } = useMemories();
  const [opened, setOpened] = useState<number[]>([]);

  return (
    <section className="chapter overflow-hidden">
      <div className="absolute right-[-5vw] top-16 giant-word">Crystal</div>
      <div className="chapter-inner">
        <div className="reveal mb-10 max-w-3xl">
          <p className="mb-4 text-sm uppercase text-ink/56">Ice Crystal Memory Chapter</p>
          <h2 className="font-display text-6xl leading-none text-ink sm:text-8xl">Tap The Frozen Memories</h2>
          {!loading ? (
            <p className="mt-4 text-ink/56">
              {count} approved {count === 1 ? "memory" : "memories"} waiting to thaw
            </p>
          ) : null}
        </div>
        {loading ? (
          <p className="reveal text-ink/56">Loading memories...</p>
        ) : error ? (
          <p className="reveal text-ink/56">Could not load memories. Make sure the backend is running.</p>
        ) : count === 0 ? (
          <p className="reveal text-ink/56">No approved memories yet. Check back after friends contribute.</p>
        ) : (
          <div className="reveal grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {memories.map((memory, index) => {
              const isOpened = opened.includes(memory.id);
              return (
                <button
                  className={`group relative overflow-hidden border border-white/80 bg-white/40 p-6 text-left shadow-crystal backdrop-blur-2xl ${
                    isOpened ? "min-h-0" : "min-h-[330px]"
                  }`}
                  key={memory.id}
                  onClick={() => setOpened((current) => (current.includes(memory.id) ? current : [...current, memory.id]))}
                  type="button"
                >
                  {!isOpened ? (
                    <>
                      <motion.div
                        animate={{ scale: [1, 1.04, 1], rotate: [-1, 2, -1] }}
                        className="crystal absolute left-1/2 top-10 h-48 w-36 -translate-x-1/2 bg-gradient-to-b from-white via-[#e8f3ff] to-[#bbd8ff] shadow-glow"
                        transition={{ duration: 3 + index * 0.2, repeat: Infinity }}
                      />
                      <div className="relative z-10 mt-56 text-center font-display text-3xl text-ink/70">
                        Locked Memory {index + 1}
                      </div>
                    </>
                  ) : (
                    <motion.div animate={{ opacity: 1, y: 0 }} className="relative z-10 grid gap-4" initial={{ opacity: 0, y: 22 }}>
                      <MemoryImage
                        alt={memory.friend}
                        className="rounded-sm"
                        maxHeightClass="max-h-80"
                        src={memory.avatar}
                      />
                      <div>
                        <p className="text-xs uppercase text-ink/52">{memory.friend}</p>
                        <h3 className="mt-2 font-display text-4xl">{memory.title}</h3>
                        <p className="mt-4 leading-7 text-ink/72">{memory.message}</p>
                      </div>
                    </motion.div>
                  )}
                  <div className="shimmer-line opacity-0 transition group-hover:opacity-100" />
                </button>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
