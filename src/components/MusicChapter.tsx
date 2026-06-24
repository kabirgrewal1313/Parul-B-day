import Image from "next/image";
import { Music2 } from "lucide-react";
import { heroImages } from "@/lib/story-data";

export function MusicChapter() {
  return (
    <section className="chapter overflow-hidden bg-gradient-to-b from-[#fffafd] via-[#edf6ff] to-[#f8fbff]">
      <div className="absolute right-[-3vw] top-16 giant-word">Music</div>
      <div className="chapter-inner grid items-center gap-10 lg:grid-cols-[1fr_1fr]">
        <div className="reveal relative min-h-[420px] overflow-hidden border border-white/80 bg-white/38 shadow-crystal backdrop-blur-2xl sm:min-h-[560px] lg:min-h-[660px]">
          <Image
            alt="Parul music chapter portrait"
            className="object-contain opacity-95"
            fill
            sizes="(max-width: 900px) 100vw, 48vw"
            src={heroImages.mc}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#f8fbff] via-transparent to-white/25" />
          <div className="absolute left-8 top-8 grid h-16 w-16 place-items-center rounded-full bg-white text-ink shadow-glow">
            <Music2 size={28} />
          </div>
          <div className="absolute bottom-8 left-8 right-8 flex h-24 items-end gap-2">
            {Array.from({ length: 18 }, (_, index) => (
              <span
                className="music-key flex-1 origin-bottom rounded-t-full bg-white/82 shadow-glow"
                key={index}
                style={{
                  height: `${38 + (index % 6) * 10}px`,
                  animation: "pulse-key 1.8s ease-in-out infinite"
                }}
              />
            ))}
          </div>
        </div>
        <div className="reveal">
          <p className="mb-4 text-sm uppercase text-ink/56">Music Chapter</p>
          <h2 className="break-words font-display text-5xl leading-none text-ink sm:text-7xl lg:text-8xl">
            Music Club has never been more chaotic than when she was in charge.
          </h2>
          <p className="mt-8 text-lg leading-8 text-ink/70">
            May the club have the power to recover from the chaos she left behind, and may the music never stop playing. JK, she was one of the best PORs ever. Fuck Sweety
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {["Keyboard", "Music club", "POR", "Inaug Debacles"].map((item) => (
              <div className="glass-panel min-w-0 break-words p-5 font-display text-xl sm:text-2xl" key={item}>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
