"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { work } from "@/lib/content";
import { SplitLines } from "@/components/ui/Anim";

export default function Work() {
  const root = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".work-card").forEach((card) => {
        gsap.from(card, {
          y: "10%",
          opacity: 0,
          scale: 0.94,
          duration: 1.1,
          ease: "expo.out",
          scrollTrigger: { trigger: card, start: "top 90%", once: true },
        });
      });

      // Index numerals count along with the scroll.
      gsap.from(".work-index", {
        opacity: 0,
        x: -14,
        duration: 0.8,
        stagger: 0.08,
        ease: "expo.out",
        scrollTrigger: { trigger: ".work-list", start: "top 85%", once: true },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="work"
      className="work_section noise relative z-20 rounded-t-[28px] bg-ink py-20 text-cream md:rounded-t-[44px] md:py-28"
    >
      <div className="shell">
        <div className="grid gap-12 md:grid-cols-12 md:gap-10">
          {/* Sticky heading */}
          <div className="work-sticky md:col-span-5">
            <div className="md:sticky md:top-[16vh]">
              <p className="t-label mb-6 text-cream/40">Experience</p>
              <SplitLines className="t-h2 text-cream" as="h2">
                {work.heading.join("\n")}
              </SplitLines>
              <SplitLines
                className="t-body mt-7 max-w-[42ch] text-cream/55"
                as="p"
                delay={0.1}
              >
                {work.intro}
              </SplitLines>
            </div>
          </div>

          {/* Cards */}
          <div className="work-list md:col-span-7">
            <ul className="flex flex-col gap-5">
              {work.items.map((item, i) => (
                <li
                  key={item.company}
                  className="work-card group relative overflow-hidden rounded-[20px] border border-cream/12 bg-cream/[0.035] p-6 transition-colors duration-500 hover:border-yellow/45 md:p-9"
                >
                  {/* Hover wash */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 -z-10 translate-y-full bg-cream/[0.055] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0"
                  />

                  <div className="mb-5 flex items-start justify-between gap-5">
                    <div>
                      <span className="work-index t-label mb-3 block text-cream/30">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3
                        className="t-h3 text-[1.55rem] transition-colors duration-500 group-hover:text-yellow md:text-[1.85rem]"
                        style={{ color: undefined }}
                      >
                        {item.company}
                      </h3>
                      <p className="t-label mt-2 text-cream/55">{item.role}</p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="t-label text-cream/45 text-[0.6rem]">
                        {item.period}
                      </p>
                      <p className="t-label mt-1.5 text-cream/30 text-[0.6rem]">
                        {item.place}
                      </p>
                    </div>
                  </div>

                  <p className="t-body max-w-[58ch] text-cream/60">
                    {item.body}
                  </p>

                  <ul className="mt-6 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <li
                        key={tag}
                        className="t-label rounded-full border border-cream/18 px-3 py-1.5 text-[0.58rem] text-cream/65"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
