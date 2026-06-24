import type { LucideIcon } from "lucide-react";
import { Crown, Music2, Snowflake, Sparkles, Zap } from "lucide-react";

export type CharacterForm = {
  title: string;
  role: string;
  description: string;
  image: string;
  icon: LucideIcon;
  palette: string;
};

export const heroImages = {
  anime: "/images/anime-placeholder.png",
  splash: "/images/parul-anime-hero.png",
  cafe: "/images/parul-cafe.jpeg",
  saree: "/images/parul-saree.jpeg",
  reference: "/images/ui-reference.png",
  driver: "/images/Driver.jpeg",
  mc: "/images/MC_Parul.jpeg",
  keyboard: "/images/Keyboard.jpeg",
  drunk: "/images/Swim.jpeg",
  friend:"/images/WhatsApp Image 2026-06-24 at 16.11.42.jpeg"
};

export const profileStats = [
  ["Name", "Parul"],
  ["Level", "21"],
  ["Designation", "Music Club's Wife"],
  ["Special Skill", "Having The Most Dumb Crushes"],
  ["Weakness", "ENI"],
  ["Favorite Things", "Music, Manga, and Nagging People"],
  ["Fun Fact", "Somehow manages to find a crush dumber than the last one every time"]
];

export const characterForms: CharacterForm[] = [
  {
    title: "Music Club' Wife",
    role: "Work Princess",
    description: "Spends More time sorting the BTs of the club than actually playing music, but somehow makes it look like a performance.",
    image: heroImages.mc,
    icon: Snowflake,
    palette: "from-[#f8fbff] via-[#eaf2ff] to-[#ffd6e7]"
  },
  {
    title: "Keyboardist",
    role: "Melody Keeper",
    description: "The Keyboard queen who somehow manages to make a shit performance look ok ;)",
    image: heroImages.keyboard,
    icon: Music2,
    palette: "from-[#fff7fb] via-[#edf6ff] to-[#cfc6ff]"
  },
  {
    title: "ENI Survivor",
    role: "Circuit Breaker",
    description: "Currently fighting assignments, surviving semesters, abusing profs and still smiling.",
    image: heroImages.cafe,
    icon: Zap,
    palette: "from-[#f8fbff] via-[#dff2ff] to-[#fff2c8]"
  },
  {
    title: "Driver",
    role: "Nightmare on roads",
    description: "The person who makes the co-passenger question their life choices.",
    image: heroImages.driver,
    icon: Crown,
    palette: "from-[#f9fbff] via-[#e9f4ff] to-[#f7d9ff]"
  },
  {
    title: "Drunk",
    role: "The Drunkiest Drunk",
    description: "The person who should never ever be let near a bacardi",
    image: heroImages.drunk,
    icon: Sparkles,
    palette: "from-[#fffafd] via-[#f8fbff] to-[#dcecff]"
  },
  {
    title: "Best Friend and Brother",
    role: "Helping People Survive",
    description: "The person who by constantly irritating you, makes you laugh and never lets you give up.",
    image: heroImages.friend,
    icon: Sparkles,
    palette: "from-[#fffafd] via-[#f8fbff] to-[#dcecff]"
  }
];

export const letters = [
  {
    from: "The Music Room",
    title: "A little melody",
    body: "Some people enter a room and ask for attention. You enter and make everyone feel like they belong there."
  },
  {
    from: "The ENI Timeline",
    title: "Field report",
    body: "Assignments arrived. Circuits attacked. Somehow, Parul survived another semester and kept smiling through the lore."
  },
  {
    from: "The Birthday Chapter",
    title: "Twenty one",
    body: "May this year be softer than the last, brighter than expected, and full of moments that feel impossible to forget."
  }
];
