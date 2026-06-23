import { AmbientParticles } from "@/components/AmbientParticles";
import { FriendsDirectory } from "@/components/FriendsDirectory";
import { SoundToggle } from "@/components/SoundToggle";

export default function FriendsPage() {
  return (
    <>
      <SoundToggle />
      <AmbientParticles />
      <main className="chapter">
        <div className="absolute left-[-5vw] top-24 giant-word">Friends</div>
        <div className="chapter-inner relative z-10 pt-16">
          <p className="mb-4 text-sm uppercase text-ink/56">Friend Directory</p>
          <h1 className="mb-12 font-display text-6xl leading-none text-ink sm:text-8xl">All Contributors</h1>
          <FriendsDirectory />
        </div>
      </main>
    </>
  );
}
