"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { about } from "@/lib/content";
import { SplitLines } from "@/components/ui/Anim";

/**
 * Stacked-card timeline. Each card sticks to the top and scales back as the
 * next one slides over it, so the story reads as a deck being dealt.
 */
export default function Journey() {
  const root = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".journey-card");

      cards.forEach((card, i) => {
        // Slide in from below.
        gsap.from(card, {
          yPercent: 12,
          opacity: 0,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: { trigger: card, start: "top 92%", once: true },
        });

        // Recede as the following cards cover it.
        //
        // fromTo (not to) is required: from a computed `filter: none`, GSAP
        // infers the start as brightness(0) and animates 0 -> target, which
        // renders the receding cards almost black. An explicit brightness(1)
        // start keeps the interpolation in the intended range.
        if (i < cards.length - 1) {
          gsap.fromTo(
            card,
            { scale: 1, filter: "brightness(1)" },
            {
              scale: 0.93,
              filter: "brightness(0.86)",
              ease: "none",
              immediateRender: false,
              scrollTrigger: {
                trigger: cards[i + 1],
                start: "top bottom",
                end: "top top",
                scrub: true,
              },
            }
          );
        }
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="about"
      className="about-section relative z-10 bg-sand pb-[18vh] pt-20 md:pt-28"
    >
      <div className="shell">
        {/* Heading block */}
        <div className="mb-14 grid gap-8 md:mb-20 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p className="t-label mb-5 text-ink/45">{about.eyebrow}</p>
            <SplitLines className="t-h2" as="h2">
              {about.heading.join("\n")}
            </SplitLines>
          </div>
          <div className="md:col-span-5">
            <SplitLines className="t-body text-ink/65" as="p" delay={0.1}>
              {about.intro}
            </SplitLines>
          </div>
        </div>

        {/* Card stack */}
        <div className="about-card-container relative">
          {about.timeline.map((entry, i) => (
            <article
              key={entry.year}
              className="journey-card sticky overflow-hidden rounded-[22px] border border-ink/10 bg-sand-3 shadow-[0_18px_50px_-28px_rgba(0,0,0,0.45)]"
              style={{
                top: `calc(9vh + ${i * 12}px)`,
                marginBottom: "2.5rem",
                zIndex: i + 1,
              }}
            >
              <div className="grid md:grid-cols-12">
                {/* Text */}
                <div className="order-2 p-7 md:order-1 md:col-span-7 md:p-11 lg:p-14">
                  <div className="mb-6 flex items-center gap-3">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-yellow ring-1 ring-ink/30" />
                    <span className="t-label text-ink/50">{entry.tag}</span>
                  </div>
                  <h3 className="t-h3 mb-4 text-2xl md:text-[1.9rem]">
                    {entry.title}
                  </h3>
                  <p className="t-body max-w-[52ch] text-ink/70">{entry.body}</p>
                </div>

                {/* Year panel */}
                <div className="order-1 relative flex min-h-[92px] items-center justify-center overflow-hidden bg-ink md:order-2 md:col-span-5 md:min-h-[260px]">
                  <span
                    className="font-display select-none text-yellow"
                    style={{
                      fontSize: "clamp(2.9rem, 9vw, 9rem)",
                      lineHeight: 0.8,
                    }}
                  >
                    {entry.year}
                  </span>
                  <span className="t-label absolute bottom-4 right-5 text-cream/35 text-[0.58rem]">
                    {String(i + 1).padStart(2, "0")} /{" "}
                    {String(about.timeline.length).padStart(2, "0")}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
