import { AmbientParticles } from "@/components/AmbientParticles";
import { CharacterCarousel } from "@/components/CharacterCarousel";
import { ElectricalChapter } from "@/components/ElectricalChapter";
import { FinalChapter } from "@/components/FinalChapter";
import { HeroSplash } from "@/components/HeroSplash";
import { IceCrystalMemories } from "@/components/IceCrystalMemories";
import { IntroSequence } from "@/components/IntroSequence";
import { LetterChapter } from "@/components/LetterChapter";
import { MainPageAuthGate } from "@/components/MainPageAuthGate";
import { MangaTransition } from "@/components/MangaTransition";
import { MemoryConstellation } from "@/components/MemoryConstellation";
import { MusicChapter } from "@/components/MusicChapter";
import { ProfileChapter } from "@/components/ProfileChapter";
import { ScrollDirector } from "@/components/ScrollDirector";
import { SecretEnding } from "@/components/SecretEnding";
import { SoundToggle } from "@/components/SoundToggle";
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = await cookies();
  const unlocked = cookieStore.get("parul_main_page_unlocked")?.value === "true";

  if (!unlocked) {
    return <MainPageAuthGate />;
  }

  return (
    <>
      <SoundToggle />
      <AmbientParticles />
      <ScrollDirector />
      <IntroSequence />
      <HeroSplash />
      <ProfileChapter />
      <MangaTransition title="Page Turn" subtitle="The next chapter changes her form." />
      <CharacterCarousel />
      <ElectricalChapter />
      <MusicChapter />
      <MangaTransition title="Memory Gate" subtitle="Not every memory appears at once. Some have to be discovered." />
      <MemoryConstellation />
      <IceCrystalMemories />
      <LetterChapter />
      <SecretEnding />
      <FinalChapter />
    </>
  );
}
