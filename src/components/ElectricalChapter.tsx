import { Cpu, RadioTower, Zap } from "lucide-react";

const facts = [
  "Still investigating why she chose ENI.",
  "Survived another semester.",
  "Currently fighting assignments."
];

export function ElectricalChapter() {
  return (
    <section className="chapter overflow-hidden bg-[#f8fbff]">
      <div className="absolute left-[-3vw] top-10 giant-word">Circuit</div>
      <div className="chapter-inner grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="reveal">
          <p className="mb-4 text-sm uppercase text-ink/56">Electrical Engineering Arc</p>
          <h2 className="break-words font-display text-5xl leading-none text-ink sm:text-7xl lg:text-8xl">
            The Assignment Boss Fight
          </h2>
          <p className="mt-8 max-w-xl text-lg leading-8 text-ink/70">
            The Dept she most abused yet somehow managed to survive. #Anankhi
          </p>
        </div>
        <div className="reveal relative min-h-[auto] overflow-hidden border border-white/80 bg-white/45 p-5 shadow-crystal backdrop-blur-2xl sm:p-8 lg:min-h-[560px]">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(187,216,255,0.2)_1px,transparent_1px),linear-gradient(rgba(187,216,255,0.18)_1px,transparent_1px)] bg-[size:42px_42px]" />
          <div className="relative grid h-full gap-5">
            {[Cpu, Zap, RadioTower].map((Icon, index) => (
              <div className="glass-panel flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:gap-5 sm:p-6" key={facts[index]}>
                <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-white text-ink shadow-glow">
                  <Icon size={24} />
                </div>
                <p className="min-w-0 break-words font-display text-2xl leading-tight sm:text-3xl">{facts[index]}</p>
              </div>
            ))}
            <div className="relative mt-6 h-44 overflow-hidden rounded-none border border-white/70 bg-[#eaf2ff]/70">
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 600 180" role="img" aria-label="Animated circuit diagram">
                <path d="M20 80 H130 V40 H260 V100 H390 V60 H560" fill="none" stroke="#7da7dd" strokeWidth="3" />
                <path d="M60 140 H210 V120 H340 V150 H520" fill="none" stroke="#cfc6ff" strokeWidth="3" />
                {[70, 160, 260, 390, 515].map((cx) => (
                  <circle cx={cx} cy={cx % 2 ? 80 : 140} fill="#fff" key={cx} r="9" stroke="#7da7dd" strokeWidth="3" />
                ))}
              </svg>
              <div className="shimmer-line" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
