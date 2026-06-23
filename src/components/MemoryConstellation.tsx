"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";
import { MemoryImage } from "@/components/MemoryImage";
import { useMemories, type DisplayMemory } from "@/hooks/useMemories";

export function MemoryConstellation({ compact = false }: { compact?: boolean }) {
  const { memories, loading, error, count } = useMemories();
  const [opened, setOpened] = useState<Set<number>>(new Set());
  const [active, setActive] = useState<DisplayMemory | null>(null);

  const orderedOpened = useMemo(
    () => memories.filter((memory) => opened.has(memory.id)),
    [memories, opened]
  );

  const openMemory = (memory: DisplayMemory) => {
    setOpened((current) => new Set(current).add(memory.id));
    setActive(memory);
  };

  const closeMemory = () => setActive(null);

  useEffect(() => {
    if (!active) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMemory();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  return (
    <section className={`${compact ? "min-h-[84vh] px-4 py-20" : "chapter"} relative overflow-hidden bg-[#071221] text-white`}>
      <div className="absolute inset-0 bg-[linear-gradient(118deg,rgba(187,216,255,0.22),transparent_34%,rgba(255,214,231,0.17)_62%,transparent)]" />
      <div className="absolute left-[-3vw] top-14 font-display text-[18vw] uppercase leading-none text-white/8">21</div>
      <div className="chapter-inner relative z-10">
        <div className="reveal mb-8 max-w-3xl">
          <p className="mb-4 text-sm uppercase text-white/56">Memory Constellation</p>
          <h2 className="font-display text-6xl leading-none text-white sm:text-8xl">Stars Become Stories</h2>
        </div>
        <div className="reveal relative h-[620px] overflow-hidden border border-white/15 bg-white/[0.04] shadow-[0_35px_100px_rgba(0,0,0,0.25)] backdrop-blur-xl">
          {loading ? (
            <div className="grid h-full place-items-center text-sm text-white/56">Loading memories...</div>
          ) : error ? (
            <div className="grid h-full place-items-center px-6 text-center text-sm text-white/56">
              Could not load memories. Make sure the backend is running.
            </div>
          ) : count === 0 ? (
            <div className="grid h-full place-items-center px-6 text-center text-white/56">
              <div>
                <p className="font-display text-4xl text-white/80">No stars yet</p>
                <p className="mt-4 text-sm">Approved memories will appear here as glowing stars.</p>
              </div>
            </div>
          ) : (
            <>
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                {orderedOpened.slice(1).map((memory, index) => {
                  const previous = orderedOpened[index];
                  return previous ? (
                    <line
                      className="constellation-line"
                      key={`${previous.id}-${memory.id}`}
                      x1={previous.x}
                      y1={previous.y}
                      x2={memory.x}
                      y2={memory.y}
                    />
                  ) : null;
                })}
              </svg>
              {memories.map((memory, index) => (
                <button
                  className="absolute grid h-8 w-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/40 bg-white/15 shadow-glow transition hover:scale-125 hover:bg-white/45"
                  key={memory.id}
                  onClick={() => openMemory(memory)}
                  style={{ left: `${memory.x}%`, top: `${memory.y}%` }}
                  title={memory.friend}
                  type="button"
                >
                  <motion.span
                    animate={{ opacity: [0.5, 1, 0.5], scale: [0.86, 1.25, 0.86] }}
                    className="h-2.5 w-2.5 rounded-full bg-white"
                    transition={{ delay: index * 0.18, duration: 2.2, repeat: Infinity }}
                  />
                </button>
              ))}
            </>
          )}
          <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center justify-between gap-3 text-sm text-white/64">
            <span>
              {loading ? "Loading..." : `${opened.size} of ${count} ${count === 1 ? "memory" : "memories"} discovered`}
            </span>
            <span>{count > 0 ? "Open every star to connect them all" : "Waiting for the first memory"}</span>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {active ? (
          <motion.div
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[80] grid place-items-center bg-[#071221]/72 p-4 backdrop-blur-xl"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            onClick={closeMemory}
            role="presentation"
          >
            <motion.article
              animate={{ y: 0, opacity: 1, scale: 1 }}
              className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto border border-white/50 bg-white p-5 pt-14 text-ink shadow-crystal"
              exit={{ y: 24, opacity: 0, scale: 0.98 }}
              initial={{ y: 40, opacity: 0, scale: 0.96 }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                aria-label="Close memory"
                className="absolute right-4 top-4 z-20 grid h-11 w-11 place-items-center rounded-full border border-ink/10 bg-white text-ink shadow-md transition hover:scale-105 hover:bg-[#edf6ff]"
                onClick={closeMemory}
                title="Close memory"
                type="button"
              >
                <X size={20} strokeWidth={2.25} />
              </button>
              <MemoryImage alt={active.friend} className="mb-5 rounded-sm" src={active.avatar} />
              <p className="text-sm uppercase text-ink/52">{active.friend}</p>
              <h3 className="mt-2 font-display text-5xl">{active.title}</h3>
              <p className="mt-5 text-lg leading-8 text-ink/72">{active.message}</p>
            </motion.article>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
