"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { hero, site, nav, projectStats } from "@/lib/content";
import Portrait from "@/components/ui/Portrait";
import MobileMenu from "@/components/ui/MobileMenu";
import { Counter } from "@/components/ui/Anim";

/** Nav list with pipe separators, matching the reference's rule marks. */
function NavGroup({ items }: { items: typeof nav }) {
  return (
    <nav className="flex items-center">
      {items.map((item, i) => (
        <span key={item.href} className="flex items-center">
          {i > 0 && (
            <span aria-hidden className="mx-2.5 text-ink/25 lg:mx-4">
              |
            </span>
          )}
          <span className="overflow-hidden">
            <a
              href={item.href}
              className="hero-navitem t-label link-sweep block font-semibold text-ink"
            >
              {item.label}
            </a>
          </span>
        </span>
      ))}
    </nav>
  );
}

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const half = Math.ceil(nav.length / 2);
  const [years] = hero.stats;

  useIsomorphicLayoutEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.from(".hero-letter", { yPercent: 110, duration: 1.2, stagger: 0.07 })
        .fromTo(
          ".hero-portrait",
          { clipPath: "inset(100% 0% 0% 0%)", scale: 1.1 },
          { clipPath: "inset(0% 0% 0% 0%)", scale: 1, duration: 1.5 },
          0.3
        )
        .from(
          ".hero-bar > *",
          { y: -18, opacity: 0, duration: 0.7, stagger: 0.08 },
          0.5
        )
        .from(
          ".hero-navitem",
          { yPercent: 130, opacity: 0, duration: 0.6, stagger: 0.05 },
          0.7
        )
        .from(".hero-line", { yPercent: 115, duration: 0.9, stagger: 0.1 }, 0.85)
        .from(
          ".hero-card",
          { y: "12%", opacity: 0, scale: 0.6, duration: 1.1, stagger: 0.12 },
          1.0
        )
        .from(".hero-badge", { opacity: 0, x: 14, duration: 0.5, stagger: 0.07 }, 1.15)
        .from(".hero-cta > *", { opacity: 0, y: 16, duration: 0.7, stagger: 0.08 }, 1.2)
        .from(".hero-corner", { opacity: 0, duration: 1.1, stagger: 0.1 }, 1.25);

      // Stage is pinned with CSS `position: sticky`, not ScrollTrigger's pin,
      // which keeps document flow (and every downstream trigger) intact.
      gsap
        .timeline({
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        })
        .to(".hero-wordmark", { yPercent: -26, scale: 1.05 }, 0)
        .to(".hero-portrait-wrap", { yPercent: 5, scale: 1.08 }, 0)
        .to(".hero-ui", { yPercent: -20, opacity: 0 }, 0);
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="hero" className="relative h-[190vh] w-full bg-sand">
      <div className="hero-stage noise sticky top-0 h-[100svh] w-full overflow-hidden">
        {/* Wordmark — lower on phones/tablet, near the top on desktop */}
        <div className="hero-wordmark pointer-events-none absolute inset-x-0 top-[15%] z-0 flex justify-center overflow-hidden px-[1.5vw] md:top-[20%] lg:top-[3%]">
          <h2
            aria-label={site.wordmark}
            className="font-display flex w-full justify-between text-yellow"
            style={{ fontSize: "clamp(3.6rem, 21.5vw, 19rem)", lineHeight: 0.78 }}
          >
            {site.wordmark.split("").map((c, i) => (
              <span key={i} className="overflow-hidden">
                <span className="hero-letter block">{c}</span>
              </span>
            ))}
          </h2>
        </div>

        {/* Portrait — phones crop the shoulders, md+ shows the whole cut-out */}
        <div className="hero-portrait-wrap pointer-events-none absolute bottom-0 left-1/2 z-10 flex -translate-x-1/2 justify-center">
          <Portrait
            alt={`${site.name}, ${site.role}`}
            wrapClassName="hero-portrait flex h-[64svh] w-[104vw] items-end justify-center md:h-[57svh] md:w-[min(92vw,700px)] lg:h-[92svh] lg:w-[min(58vw,880px)]"
            className="h-full w-full object-cover object-top md:w-auto md:max-w-full md:object-contain md:object-bottom"
          />
        </div>

        {/* Phone top bar */}
        <div className="hero-bar absolute inset-x-0 top-0 z-30 flex items-center gap-3 p-4 md:hidden">
          <a
            href="#hero"
            className="font-display rounded-xl bg-yellow px-3.5 py-2 text-xl leading-none text-ink"
          >
            {site.wordmark}
            <span className="align-super text-[0.55em]">®</span>
          </a>
          <a
            href={hero.mobileCta.href}
            className="btn btn-yellow ml-auto !px-4 !py-2.5 !text-[0.68rem]"
          >
            {hero.mobileCta.label}
          </a>
          <MobileMenu />
        </div>

        {/* Tablet-only scrim: the portrait fills the lower corners at this
            width, so the corner copy needs something to sit on. */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[15] hidden h-[34%] md:block lg:hidden"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.28) 45%, rgba(0,0,0,0) 100%)",
          }}
        />

        {/* Layered UI */}
        <div className="hero-ui pointer-events-none absolute inset-0 z-20">
          {/* Nav row — under the wordmark on tablet, lower on desktop */}
          <div className="shell pointer-events-auto absolute inset-x-0 top-[39%] hidden items-center justify-between md:flex lg:top-[54%]">
            <NavGroup items={nav.slice(0, half)} />
            <NavGroup items={nav.slice(half)} />
          </div>

          {/* Headline */}
          <h1
            className="font-display absolute left-[18%] top-[70%] text-[clamp(1.9rem,8.4vw,2.9rem)] leading-[1.03] tracking-[-0.025em] text-cream md:left-[34.5%] md:top-[78%] md:text-[4.4vw] lg:left-[36%] lg:top-[59%] lg:text-[clamp(2rem,4.6vw,4.1rem)]"
          >
            {hero.headline.map((line, i) => (
              <span key={i} className="block overflow-hidden">
                <span className="hero-line block">{line}</span>
              </span>
            ))}
          </h1>

          {/* Attribute card — phones mid-left, desktop right, hidden on tablet */}
          <ul className="glass absolute left-[4%] top-[33%] flex flex-col gap-2.5 rounded-2xl px-4 py-3.5 md:hidden lg:left-auto lg:right-[21%] lg:top-[60%] lg:flex">
            {hero.badges.map((b) => (
              <li
                key={b.label}
                className="hero-badge flex items-center gap-3 text-cream"
              >
                <span aria-hidden className="text-base leading-none text-yellow">
                  {b.glyph}
                </span>
                <span className="text-[0.9rem] font-semibold leading-none lg:text-[0.8rem]">
                  {b.label}
                </span>
              </li>
            ))}
          </ul>

          {/* Years card — phones mid-right, desktop lower-left, hidden on tablet */}
          <div className="hero-card glass absolute right-[3%] top-[49%] rounded-2xl px-5 py-4 text-center md:hidden lg:left-[21%] lg:right-auto lg:top-[79%] lg:block">
            <div className="font-display text-5xl leading-none text-yellow lg:text-4xl">
              <Counter value={years.value} suffix={years.suffix} />
            </div>
            <div className="mt-1.5 max-w-[7ch] text-[0.8rem] font-semibold leading-tight text-cream lg:max-w-none lg:text-[0.66rem] lg:uppercase lg:tracking-[0.14em]">
              {years.label}
            </div>
          </div>

          {/* Projects card — count plus live / ongoing status */}
          <div className="hero-card glass absolute bottom-[6%] left-[4%] rounded-2xl px-5 py-4 md:hidden lg:bottom-auto lg:left-[17.5%] lg:top-[61%] lg:block">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-4xl leading-none text-yellow">
                <Counter value={projectStats.total} />
              </span>
              <span className="text-[0.8rem] font-semibold text-cream lg:text-[0.66rem] lg:uppercase lg:tracking-[0.14em]">
                Projects
              </span>
            </div>
            <ul className="mt-3 flex flex-col gap-1.5 border-t border-cream/15 pt-3">
              <li className="flex items-center gap-2.5 text-cream">
                <span aria-hidden className="status-dot text-yellow" />
                <span className="text-[0.78rem] font-semibold leading-none lg:text-[0.72rem]">
                  {projectStats.live} Live
                </span>
              </li>
              <li className="flex items-center gap-2.5 text-cream/85">
                <span
                  aria-hidden
                  className="status-dot text-[#ffb347]"
                  style={{ animationDelay: "0.55s" }}
                />
                <span className="text-[0.78rem] font-semibold leading-none lg:text-[0.72rem]">
                  {projectStats.ongoing} Ongoing
                </span>
              </li>
            </ul>
          </div>

          {/* Buttons — desktop only */}
          <div className="hero-cta pointer-events-auto absolute bottom-[5%] left-[39%] hidden gap-3 lg:flex">
            {hero.buttons.map((b) => (
              <a key={b.label} href={b.href} className="btn btn-yellow">
                {b.label}
              </a>
            ))}
          </div>

          {/* Corner tagline — tablet and desktop */}
          <div className="hero-corner absolute bottom-[3%] left-[clamp(1.25rem,4vw,4.5rem)] hidden text-cream md:block lg:bottom-[6%] lg:text-ink">
            <p className="t-body leading-relaxed">{hero.tagline.lead}</p>
            <p className="t-body leading-relaxed">{hero.tagline.sub}</p>
          </div>

          {/* Corner intro — tablet and desktop */}
          <p className="hero-corner t-body absolute bottom-[3%] right-[clamp(1.25rem,4vw,4.5rem)] hidden max-w-[22ch] leading-relaxed text-cream md:block lg:bottom-[5%] lg:max-w-[20ch] lg:text-ink">
            {hero.intro}
          </p>
        </div>
      </div>
    </section>
  );
}
