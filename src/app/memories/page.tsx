import { AmbientParticles } from "@/components/AmbientParticles";
import { IceCrystalMemories } from "@/components/IceCrystalMemories";
import { MemoryConstellation } from "@/components/MemoryConstellation";
import { SoundToggle } from "@/components/SoundToggle";

export default function MemoriesPage() {
  return (
    <>
      <SoundToggle />
      <AmbientParticles />
      <MemoryConstellation compact />
      <IceCrystalMemories />
    </>
  );
}
