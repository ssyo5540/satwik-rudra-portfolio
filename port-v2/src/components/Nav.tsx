"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { nav, site } from "@/lib/content";

/** Sticky bar that drops in once the hero is out of the way. */
export default function Nav() {
  const root = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.set(el, { yPercent: -110 });

      ScrollTrigger.create({
        start: "top -85%",
        end: "max",
        onToggle: (self) =>
          gsap.to(el, {
            yPercent: self.isActive ? 0 : -110,
            duration: 0.7,
            ease: "expo.out",
          }),
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={root}
      className="fixed inset-x-0 top-0 z-50 will-change-transform"
    >
      <div className="mx-auto mt-3 flex w-[calc(100%-1.5rem)] max-w-[1440px] items-center justify-between rounded-full border border-ink/10 bg-sand-3/80 px-4 py-2.5 backdrop-blur-xl md:px-6">
        <a
          href="#hero"
          className="font-display text-lg leading-none tracking-tight"
        >
          {site.wordmark}
          <span className="text-yellow" style={{ WebkitTextStroke: "0.5px #000" }}>
            ®
          </span>
        </a>

        <nav className="hidden items-center gap-5 lg:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="t-label link-sweep text-ink/75 transition-colors hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href={`mailto:${site.email}`}
          className="btn btn-solid !px-4 !py-2 !text-[0.65rem]"
        >
          Get in Touch
        </a>
      </div>
    </div>
  );
}
