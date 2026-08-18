"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { capabilities } from "@/lib/content";
import { SplitLines } from "@/components/ui/Anim";

export default function Capabilities() {
  const root = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Oversized heading drifts up against the scroll.
      gsap.to(".cap-heading", {
        yPercent: -14,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.from(".cap-row", {
        yPercent: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.09,
        ease: "expo.out",
        scrollTrigger: { trigger: ".cap-list", start: "top 88%", once: true },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="capabilities"
      className="what_you_get_section relative z-20 overflow-hidden bg-sand py-20 md:py-28"
    >
      <div className="shell">
        <div className="mb-4 flex flex-wrap items-baseline justify-between gap-4">
          <p className="t-label text-ink/45">{capabilities.subheading}</p>
          <p className="t-body max-w-[46ch] text-ink/60">
            {capabilities.intro}
          </p>
        </div>

        {/* Oversized heading */}
        <h2 className="cap-heading t-display leading-[0.82]" aria-label={capabilities.heading.join(" ")}>
          {capabilities.heading.map((line, i) => (
            <span key={i} className="block overflow-hidden">
              <span className="block">{line}</span>
            </span>
          ))}
        </h2>

        {/* Capability rows */}
        <ul className="cap-list mt-14 border-t border-ink/12 md:mt-20">
          {capabilities.items.map((item, i) => (
            <li
              key={item.title}
              className="cap-row group border-b border-ink/12"
            >
              <div className="grid gap-3 py-7 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:px-3 md:grid-cols-12 md:items-start md:gap-8 md:py-9">
                <span className="t-label text-ink/35 md:col-span-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="t-h3 md:col-span-4 md:text-[1.5rem]">
                  <span className="bg-gradient-to-r from-yellow to-yellow bg-[length:0%_38%] bg-left-bottom bg-no-repeat transition-[background-size] duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:bg-[length:100%_38%]">
                    {item.title}
                  </span>
                </h3>
                <p className="t-body text-ink/65 md:col-span-7">{item.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
