import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        frost: "#F8FBFF",
        snow: "#EDF6FF",
        ice: "#EAF2FF",
        sakura: "#FFD6E7",
        periwinkle: "#BBD8FF",
        dream: "#CFC6FF",
        ink: "#243756"
      },
      fontFamily: {
        display: ["Cormorant Garamond", "Georgia", "Palatino Linotype", "serif"],
        chapter: ["Cinzel", "Georgia", "serif"],
        handwritten: ["Kalam", "Bradley Hand", "Segoe Print", "cursive"],
        manga: ["Bangers", "Impact", "fantasy"],
        jp: ["Zen Old Mincho", "serif"],
        sans: ["Inter", "ui-sans-serif", "system-ui"]
      },
      boxShadow: {
        crystal: "0 30px 80px rgba(99, 135, 202, 0.23)",
        glow: "0 0 40px rgba(187, 216, 255, 0.7)"
      }
    }
  },
  plugins: []
};

export default config;
