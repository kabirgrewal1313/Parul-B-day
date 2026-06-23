"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

export function ScrollDirector() {
  useEffect(() => {
    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".chapter").forEach((section) => {
        const reveals = section.querySelectorAll(".reveal");
        if (!reveals.length) {
          return;
        }

        gsap.fromTo(
          reveals,
          { y: 56, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.15,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 72%"
            }
          }
        );
      });

      gsap.utils.toArray<HTMLElement>(".parallax-slow").forEach((element) => {
        gsap.to(element, {
          yPercent: -12,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      });
    });

    return () => context.revert();
  }, []);

  return null;
}
