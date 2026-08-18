"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { Flip } from "gsap/Flip";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, Flip);
  // Match the reference site's feel: nothing snaps, everything eases out long.
  gsap.defaults({ ease: "expo.out", duration: 1 });
}

export { gsap, ScrollTrigger, SplitText, Flip };

/** Shared easing/duration vocabulary lifted from the reference's data-tl values. */
export const MOTION = {
  lineReveal: { duration: 0.6, stagger: 0.1, ease: "expo.out" },
  rise: { duration: 1.1, ease: "expo.out" },
  pop: { duration: 0.9, ease: "expo.out" },
  wipe: { duration: 1.5, ease: "expo.out" },
  start: "top 88%",
} as const;

/**
 * True when motion should be suppressed. Honours the OS setting, and also a
 * `?nomotion=1` query flag which renders every section in its final state —
 * handy for screenshot QA and for debugging layout without motion in the way.
 */
export const prefersReducedMotion = () => {
  if (typeof window === "undefined") return false;
  if (new URLSearchParams(window.location.search).has("nomotion")) return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};
