"use client";

import { FrozenLakeScene } from "@/components/FrozenLakeScene";
import { useMemories } from "@/hooks/useMemories";

export function FinalChapter() {
  const { friends, loading, count } = useMemories();

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#071221] text-white">
      <div className="absolute inset-0">
        <FrozenLakeScene />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#071221] via-[#071221]/46 to-transparent" />
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-end px-4 pb-16">
        <p className="text-xl text-white/70">21 years.</p>
        <p className="mt-2 text-xl text-white/70">
          {loading ? "Countless memories." : `${count} ${count === 1 ? "memory" : "memories"} and counting.`}
        </p>
        <p className="mt-2 text-xl text-white/70">Many adventures ahead.</p>
        <h2 className="mt-8 font-display text-7xl leading-none sm:text-9xl">Happy Birthday Parul</h2>
        <div className="mt-10 flex flex-wrap gap-3 text-sm text-white/62">
          {loading ? (
            <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-xl">Loading...</span>
          ) : friends.length === 0 ? (
            <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-xl">
              Waiting for the first memory
            </span>
          ) : (
            friends.map((friend) => (
              <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-xl" key={friend.name}>
                {friend.name}
              </span>
            ))
          )}
        </div>
        <div className="mt-12 flex items-center gap-4 text-white/58">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-white/36 to-white/10" />
          <p className="font-chapter text-[0.68rem] font-semibold uppercase tracking-[0.34em]">
            Made with love-Kabir Grewal
          </p>
          <span className="h-px flex-1 bg-gradient-to-l from-transparent via-white/36 to-white/10" />
        </div>
      </div>
    </section>
  );
}
