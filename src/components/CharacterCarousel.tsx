"use client";

import Image from "next/image";
import { characterForms } from "@/lib/story-data";

export function CharacterCarousel() {
  return (
    <section className="chapter overflow-hidden bg-gradient-to-br from-[#fffafd] via-[#edf6ff] to-[#f7d9ff]">
      <div className="absolute left-[-4vw] top-24 giant-word">Faces</div>
      <div className="chapter-inner">
        <div className="reveal mb-10 max-w-4xl">
          <div>
            <p className="mb-4 text-sm uppercase text-ink/56">Chapter 2</p>
            <h2 className="break-words font-display text-5xl leading-none text-ink sm:text-7xl lg:text-8xl">
              The Many Faces Of Parul
            </h2>
          </div>
        </div>
        <div className="reveal grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {characterForms.map((form) => {
            const Icon = form.icon;

            return (
              <article
                className={`relative grid min-w-0 gap-5 overflow-hidden border border-white/80 bg-gradient-to-br ${form.palette} p-5 shadow-crystal backdrop-blur-2xl sm:p-6`}
                key={form.title}
              >
                <div className="relative min-h-[280px] overflow-hidden bg-white/30 sm:min-h-[340px]">
                  <div className="absolute inset-x-8 bottom-6 h-24 rounded-[50%] bg-white/70 blur-3xl" />
                  <Image
                    alt={form.title}
                    className="object-contain drop-shadow-[0_24px_42px_rgba(70,99,150,0.22)]"
                    fill
                    sizes="(max-width: 768px) 92vw, (max-width: 1280px) 45vw, 31vw"
                    src={form.image}
                  />
                </div>
                <div className="min-w-0">
                  <div className="mb-5 grid h-14 w-14 place-items-center rounded-full bg-white text-ink shadow-glow">
                    <Icon size={24} />
                  </div>
                  <p className="text-sm uppercase text-ink/56">{form.role}</p>
                  <h3 className="mt-2 break-words font-display text-4xl leading-tight text-ink sm:text-5xl">
                    {form.title}
                  </h3>
                  <p className="mt-4 break-words text-base leading-7 text-ink/72">{form.description}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
