"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";

/**
 * Infinite horizontal marquee that also reacts to scroll velocity and
 * direction — the same trick the reference uses on its client strip.
 */
export default function Marquee({
  items,
  speed = 28,
  className = "",
  itemClassName = "",
  separator = "✦",
}: {
  items: string[];
  speed?: number;
  className?: string;
  itemClassName?: string;
  separator?: string;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = track.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Track holds the list twice, so -50% is a seamless loop point.
      const tween = gsap.to(el, {
        xPercent: -50,
        duration: speed,
        ease: "none",
        repeat: -1,
      });

      const st = ScrollTrigger.create({
        trigger: wrap.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          // Scrolling down speeds it up; scrolling up reverses it.
          tween.timeScale(self.direction === 1 ? 1 : -1);
        },
      });

      return () => {
        st.kill();
        tween.kill();
      };
    }, wrap);

    return () => ctx.revert();
  }, [speed]);

  const row = [...items, ...items];

  return (
    <div ref={wrap} className={`overflow-hidden ${className}`}>
      <div ref={track} className="marquee-track">
        {row.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className={`flex shrink-0 items-center ${itemClassName}`}
          >
            {item}
            <span aria-hidden className="mx-6 opacity-40 md:mx-9">
              {separator}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
