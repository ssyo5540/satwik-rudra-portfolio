"use client";

import { ReactNode, ElementType, useRef } from "react";
import { gsap, SplitText, MOTION, prefersReducedMotion } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";

type Common = {
  children: ReactNode;
  className?: string;
  delay?: number;
  start?: string;
  as?: ElementType;
};

/* -------------------------------------------------------------------------
   SplitLines — the signature move. Text is split into lines, each masked,
   then swept up from yPercent 100 → 0 with a 0.1s stagger on expo.out.
   ---------------------------------------------------------------------- */
export function SplitLines({
  children,
  className = "",
  delay = 0,
  start = MOTION.start,
  as: Tag = "div",
  once = true,
}: Common & { once?: boolean }) {
  const ref = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    let split: InstanceType<typeof SplitText> | null = null;

    const ctx = gsap.context(() => {
      split = new SplitText(el, {
        type: "lines",
        linesClass: "split-line",
        // Wrap each line so the mask has something to clip.
        autoSplit: true,
        mask: "lines",
      });

      gsap.from(split.lines, {
        yPercent: 110,
        duration: MOTION.lineReveal.duration,
        stagger: MOTION.lineReveal.stagger,
        delay,
        ease: MOTION.lineReveal.ease,
        scrollTrigger: { trigger: el, start, once },
      });
    }, ref);

    return () => {
      split?.revert();
      ctx.revert();
    };
  }, [delay, start, once]);

  return (
    <Tag ref={ref as never} className={className}>
      {children}
    </Tag>
  );
}

/* -------------------------------------------------------------------------
   Rise — y 10% + scale 0.6 + opacity 0 → settled. Used for cards and media.
   ---------------------------------------------------------------------- */
export function Rise({
  children,
  className = "",
  delay = 0,
  start = MOTION.start,
  as: Tag = "div",
  distance = "10%",
  scale = 0.85,
  stagger = 0,
  selector,
}: Common & {
  distance?: string;
  scale?: number;
  stagger?: number;
  selector?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const targets = selector ? el.querySelectorAll(selector) : el;
      gsap.from(targets, {
        y: distance,
        opacity: 0,
        scale,
        duration: MOTION.rise.duration,
        ease: MOTION.rise.ease,
        delay,
        stagger,
        scrollTrigger: { trigger: el, start, once: true },
      });
    }, ref);

    return () => ctx.revert();
  }, [delay, start, distance, scale, stagger, selector]);

  return (
    <Tag ref={ref as never} className={className}>
      {children}
    </Tag>
  );
}

/* -------------------------------------------------------------------------
   Wipe — clip-path inset(100% 0 0 0) → inset(0). Used for image reveals.
   ---------------------------------------------------------------------- */
export function Wipe({
  children,
  className = "",
  delay = 0.2,
  start = MOTION.start,
  as: Tag = "div",
}: Common) {
  const ref = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { clipPath: "inset(100% 0% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: MOTION.wipe.duration,
          delay,
          ease: MOTION.wipe.ease,
          scrollTrigger: { trigger: el, start, once: true },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [delay, start]);

  return (
    <Tag ref={ref as never} className={className}>
      {children}
    </Tag>
  );
}

/* -------------------------------------------------------------------------
   Counter — number counts up when scrolled into view.
   ---------------------------------------------------------------------- */
export function Counter({
  value,
  suffix = "",
  className = "",
}: {
  value: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      el.textContent = `${value}${suffix}`;
      return;
    }

    const ctx = gsap.context(() => {
      const counter = { n: 0 };
      gsap.to(counter, {
        n: value,
        duration: 1.8,
        ease: "expo.out",
        scrollTrigger: { trigger: el, start: "top 92%", once: true },
        onUpdate: () => {
          el.textContent = `${Math.round(counter.n)}${suffix}`;
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [value, suffix]);

  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  );
}
