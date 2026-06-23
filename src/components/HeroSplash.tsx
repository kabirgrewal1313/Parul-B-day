"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import type { CSSProperties } from "react";
import { heroImages } from "@/lib/story-data";

const splashLabels = [
  { text: "JUNE 24", className: "hero-splash__label hero-splash__label--date" },
  { text: "WINTER STORY", className: "hero-splash__label hero-splash__label--winter" },
  { text: "TWENTY ONE", className: "hero-splash__label hero-splash__label--age" },
  { text: "MEMORIES", className: "hero-splash__label hero-splash__label--memories" },
  { text: "雪の章", className: "hero-splash__label hero-splash__label--jp" }
];

const snowflakes = [
  { x: "8%", y: "21%", size: "1.15rem", delay: "-1s" },
  { x: "18%", y: "74%", size: "0.86rem", delay: "-3.4s" },
  { x: "34%", y: "18%", size: "0.72rem", delay: "-5s" },
  { x: "59%", y: "13%", size: "1rem", delay: "-2.5s" },
  { x: "78%", y: "28%", size: "0.78rem", delay: "-4.2s" },
  { x: "88%", y: "70%", size: "1.08rem", delay: "-6s" }
];

const crystalShards = [
  { x: "13%", y: "43%", rotate: "-18deg", delay: "-2s" },
  { x: "29%", y: "64%", rotate: "12deg", delay: "-4.7s" },
  { x: "66%", y: "23%", rotate: "24deg", delay: "-1.4s" },
  { x: "81%", y: "49%", rotate: "-32deg", delay: "-5.8s" },
  { x: "91%", y: "31%", rotate: "9deg", delay: "-3.2s" }
];

const sakuraPetals = [
  { x: "11%", y: "29%", rotate: "28deg", delay: "-3.8s" },
  { x: "44%", y: "12%", rotate: "-22deg", delay: "-1.8s" },
  { x: "71%", y: "78%", rotate: "16deg", delay: "-4.8s" },
  { x: "87%", y: "17%", rotate: "-36deg", delay: "-6.4s" }
];

const butterflies = [
  { x: "24%", y: "36%", delay: "-2.2s" },
  { x: "76%", y: "66%", delay: "-5.6s" },
  { x: "88%", y: "41%", delay: "-3.1s" }
];

const grandStars = [
  { x: "31%", y: "17%", size: "3.1rem", delay: "-1.7s" },
  { x: "64%", y: "29%", size: "4.4rem", delay: "-4.1s" },
  { x: "86%", y: "15%", size: "3.6rem", delay: "-2.8s" },
  { x: "18%", y: "62%", size: "2.7rem", delay: "-5.3s" }
];

export function HeroSplash() {
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 0.28], [0, -24]);
  const typeY = useTransform(scrollYProgress, [0, 0.28], [0, 110]);
  const typeX = useTransform(scrollYProgress, [0, 0.28], [0, -34]);
  const imageY = useTransform(scrollYProgress, [0, 0.28], [0, -92]);
  const imageX = useTransform(scrollYProgress, [0, 0.28], [0, 26]);
  const particleY = useTransform(scrollYProgress, [0, 0.28], [0, -150]);
  const particleX = useTransform(scrollYProgress, [0, 0.28], [0, -42]);
  const foregroundY = useTransform(scrollYProgress, [0, 0.28], [0, -54]);

  return (
    <section className="hero-splash chapter overflow-hidden" aria-label="Parul winter story hero">
      <motion.div className="hero-splash__background" style={{ y: backgroundY }} />

      <motion.div className="hero-splash__type-layer" style={{ x: typeX, y: typeY }}>
        <span className="hero-splash__word hero-splash__word--main">PARUL</span>
        <span className="hero-splash__word hero-splash__word--twenty">TWENTY ONE</span>
        <span className="hero-splash__word hero-splash__word--chapter">WINTER STORY</span>
      </motion.div>

      <motion.div className="hero-splash__labels" style={{ y: foregroundY }}>
        {splashLabels.map((label) => (
          <span className={label.className} key={label.text}>
            {label.text}
          </span>
        ))}
      </motion.div>

      <motion.div className="hero-splash__character" style={{ x: imageX, y: imageY }}>
        <div className="hero-splash__image-aura" />
        <Image
          alt="Parul as a winter anime heroine playing a crystal piano"
          className="hero-splash__image"
          fill
          priority
          sizes="100vw"
          src={heroImages.splash}
        />
      </motion.div>

      <motion.div className="hero-splash__particles" style={{ x: particleX, y: particleY }}>
        {snowflakes.map((flake) => (
          <span
            aria-hidden="true"
            className="hero-splash__flake"
            key={`${flake.x}-${flake.y}`}
            style={
              {
                "--x": flake.x,
                "--y": flake.y,
                "--size": flake.size,
                "--delay": flake.delay
              } as CSSProperties
            }
          >
            ✧
          </span>
        ))}

        {crystalShards.map((shard) => (
          <span
            aria-hidden="true"
            className="hero-splash__crystal"
            key={`${shard.x}-${shard.y}`}
            style={
              {
                "--x": shard.x,
                "--y": shard.y,
                "--rotate": shard.rotate,
                "--delay": shard.delay
              } as CSSProperties
            }
          />
        ))}

        {sakuraPetals.map((petal) => (
          <span
            aria-hidden="true"
            className="hero-splash__petal"
            key={`${petal.x}-${petal.y}`}
            style={
              {
                "--x": petal.x,
                "--y": petal.y,
                "--rotate": petal.rotate,
                "--delay": petal.delay
              } as CSSProperties
            }
          />
        ))}

        {butterflies.map((butterfly) => (
          <span
            aria-hidden="true"
            className="hero-splash__butterfly"
            key={`${butterfly.x}-${butterfly.y}`}
            style={
              {
                "--x": butterfly.x,
                "--y": butterfly.y,
                "--delay": butterfly.delay
              } as CSSProperties
            }
          />
        ))}

        {grandStars.map((star) => (
          <span
            aria-hidden="true"
            className="hero-splash__grand-star"
            key={`${star.x}-${star.y}`}
            style={
              {
                "--x": star.x,
                "--y": star.y,
                "--size": star.size,
                "--delay": star.delay
              } as CSSProperties
            }
          >
            ✦
          </span>
        ))}

        <span className="hero-splash__geo hero-splash__geo--ring" />
        <span className="hero-splash__geo hero-splash__geo--circle" />
        <span className="hero-splash__geo hero-splash__geo--star">✦</span>
      </motion.div>

      <motion.div className="hero-splash__foreground" style={{ y: foregroundY }} />

      <div className="hero-splash__caption">
        <p className="hero-splash__kicker">Character Story 01</p>
        <h1>Winter Story</h1>
        <p>June 24 · a cinematic birthday chapter for Parul, twenty one, written in snowlight and music.</p>
      </div>
    </section>
  );
}
