"use client";

import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useEffect, useMemo, useState } from "react";

export function AmbientParticles() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setReady(true));
  }, []);

  const petals = useMemo(
    () =>
      Array.from({ length: 18 }, (_, index) => ({
        left: `${(index * 17) % 100}%`,
        duration: `${12 + (index % 6) * 1.6}s`,
        delay: `${-(index % 9) * 1.4}s`,
        drift: `${index % 2 === 0 ? 18 + index * 3 : -22 - index * 2}vw`
      })),
    []
  );

  return (
    <>
      {ready ? (
        <Particles
          id="winter-particles"
          className="pointer-events-none fixed inset-0 z-[3]"
          options={{
            fullScreen: false,
            background: { color: "transparent" },
            fpsLimit: 60,
            particles: {
              number: { value: 92, density: { enable: true } },
              color: { value: ["#ffffff", "#bbd8ff", "#ffd6e7"] },
              opacity: { value: { min: 0.28, max: 0.78 } },
              size: { value: { min: 1, max: 4 } },
              move: {
                enable: true,
                speed: { min: 0.22, max: 0.82 },
                direction: "bottom",
                drift: 0.32,
                outModes: "out"
              },
              links: {
                enable: true,
                distance: 120,
                color: "#bbd8ff",
                opacity: 0.08,
                width: 1
              },
              shape: { type: "circle" }
            },
            detectRetina: true
          }}
        />
      ) : null}
      {petals.map((petal, index) => (
        <span
          className="sakura-petal"
          key={index}
          style={{
            left: petal.left,
            animationDuration: petal.duration,
            animationDelay: petal.delay,
            ["--petal-drift" as string]: petal.drift
          }}
        />
      ))}
    </>
  );
}
