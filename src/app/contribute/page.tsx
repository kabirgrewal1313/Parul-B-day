import { AmbientParticles } from "@/components/AmbientParticles";
import { ContributeForm } from "@/components/ContributeForm";
import { SoundToggle } from "@/components/SoundToggle";

export default function ContributePage() {
  return (
    <>
      <SoundToggle />
      <AmbientParticles />
      <main className="chapter">
        <div className="absolute right-[-6vw] top-24 giant-word">Submit</div>
        <div className="chapter-inner relative z-10 grid items-start gap-10 pt-16 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="mb-4 text-sm uppercase text-ink/56">Submission Portal</p>
            <h1 className="font-display text-6xl leading-none text-ink sm:text-8xl">Send A Memory</h1>
            <p className="mt-8 text-lg leading-8 text-ink/70">
              Friends can submit an image and message here. Submissions stay hidden until approved
              from the admin dashboard.
            </p>
          </div>
          <ContributeForm />
        </div>
      </main>
    </>
  );
}
