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
  reference: "/images/ui-reference.png"
};

export const profileStats = [
  ["Name", "Parul"],
  ["Level", "21"],
  ["Class", "Music Club Officer"],
  ["Special Skill", "Making Everyone Feel Comfortable"],
  ["Weakness", "Electrical Engineering Assignments"],
  ["Favorite Things", "Music, good people, gentle chaos"],
  ["Fun Fact", "Still investigating why she chose EE."]
];

export const characterForms: CharacterForm[] = [
  {
    title: "Ice Skater",
    role: "Winter Princess",
    description: "A heroine moving across a frozen lake, carrying every memory like a ribbon of light.",
    image: heroImages.anime,
    icon: Snowflake,
    palette: "from-[#f8fbff] via-[#eaf2ff] to-[#ffd6e7]"
  },
  {
    title: "Keyboardist",
    role: "Melody Keeper",
    description: "Soft piano, quiet courage, and the kind of presence that makes a room feel warmer.",
    image: heroImages.saree,
    icon: Music2,
    palette: "from-[#fff7fb] via-[#edf6ff] to-[#cfc6ff]"
  },
  {
    title: "EE Survivor",
    role: "Circuit Mage",
    description: "Currently fighting assignments, surviving semesters, and making it look suspiciously elegant.",
    image: heroImages.cafe,
    icon: Zap,
    palette: "from-[#f8fbff] via-[#dff2ff] to-[#fff2c8]"
  },
  {
    title: "Club Leader",
    role: "Signal Star",
    description: "Organizes the chaos, remembers the details, and somehow keeps everyone included.",
    image: heroImages.saree,
    icon: Crown,
    palette: "from-[#f9fbff] via-[#e9f4ff] to-[#f7d9ff]"
  },
  {
    title: "Best Friend",
    role: "Memory Anchor",
    description: "The person who makes ordinary days feel like scenes worth replaying.",
    image: heroImages.cafe,
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
    from: "The EE Timeline",
    title: "Field report",
    body: "Assignments arrived. Circuits attacked. Somehow, Parul survived another semester and kept smiling through the lore."
  },
  {
    from: "The Birthday Chapter",
    title: "Twenty one",
    body: "May this year be softer than the last, brighter than expected, and full of moments that feel impossible to forget."
  }
];
