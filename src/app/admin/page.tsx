import { AmbientParticles } from "@/components/AmbientParticles";
import { AdminDashboard } from "@/components/AdminDashboard";
import { SoundToggle } from "@/components/SoundToggle";

export default function AdminPage() {
  return (
    <>
      <SoundToggle />
      <AmbientParticles />
      <main className="chapter">
        <div className="absolute left-[-4vw] top-24 giant-word">Admin</div>
        <div className="chapter-inner relative z-10 pt-16">
          <p className="mb-4 text-sm uppercase text-ink/56">Moderation Dashboard</p>
          <h1 className="mb-10 font-display text-6xl leading-none text-ink sm:text-8xl">Approve Memories</h1>
          <AdminDashboard />
        </div>
      </main>
    </>
  );
}
