import Image from "next/image";
import { profileStats, heroImages } from "@/lib/story-data";

export function ProfileChapter() {
  return (
    <section className="chapter overflow-hidden">
      <div className="absolute left-[-5vw] top-12 giant-word">Smile</div>
      <div className="chapter-inner">
        <div className="reveal mb-12 max-w-3xl">
          <p className="mb-4 text-sm uppercase text-ink/56">Chapter 1</p>
          <h2 className="font-display text-6xl leading-none text-ink sm:text-8xl">The Girl Behind The Smile</h2>
        </div>
        <div className="grid items-stretch gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="reveal manga-panel relative min-h-[680px] overflow-hidden p-5">
            <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-[#bbd8ff]/24" />
            <Image
              alt="Parul portrait"
              className="object-cover"
              fill
              sizes="(max-width: 900px) 100vw, 42vw"
              src={heroImages.saree}
            />
            <div className="absolute bottom-5 left-5 right-5 glass-panel p-5">
              <p className="text-xs uppercase text-ink/56">Main heroine</p>
              <h3 className="font-display text-5xl">Parul</h3>
            </div>
          </div>
          <div className="reveal grid gap-4 sm:grid-cols-2">
            {profileStats.map(([label, value], index) => (
              <div className="glass-panel relative overflow-hidden p-6" key={label}>
                <span className="absolute right-4 top-2 font-display text-6xl text-[#bbd8ff]/32">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="relative text-xs uppercase text-ink/52">{label}</p>
                <p className="relative mt-5 font-display text-3xl leading-tight text-ink">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
