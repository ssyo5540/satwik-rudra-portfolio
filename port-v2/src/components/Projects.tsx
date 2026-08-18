"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { projects } from "@/lib/content";
import { asset } from "@/lib/asset";
import { SplitLines } from "@/components/ui/Anim";

type Project = (typeof projects.items)[number];

function KindTag({ kind }: { kind: string }) {
  const freelance = kind === "Freelance";
  return (
    <span
      className={`t-label rounded-full px-3 py-1.5 text-[0.56rem] ${
        freelance ? "bg-ink text-cream" : "border border-ink/30 text-ink/70"
      }`}
    >
      {kind}
    </span>
  );
}

function StatusTag({ status }: { status: string }) {
  const live = status === "Live";
  return (
    <span
      className={`t-label inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[0.56rem] ${
        live ? "bg-yellow text-ink" : "border border-ink/30 text-ink/70"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          live ? "bg-ink" : "animate-pulse bg-ink/50"
        }`}
      />
      {status}
    </span>
  );
}

function CardMedia({ project }: { project: Project }) {
  const phone = project.shotStyle === "phone";

  if (!project.shots.length) {
    return (
      <div className="relative flex h-full min-h-[30vh] items-center justify-center overflow-hidden rounded-[18px] bg-ink p-8">
        <div className="text-center">
          <p
            className="font-display text-yellow"
            style={{ fontSize: "clamp(2rem, 4vw, 3.4rem)", lineHeight: 0.9 }}
          >
            {project.name}
          </p>
          <p className="t-label mt-3 text-cream/45">In development</p>
        </div>
      </div>
    );
  }

  if (phone) {
    return (
      <div className="relative flex h-full min-h-[30vh] items-end justify-center gap-3 overflow-hidden rounded-[18px] bg-ink px-5 pt-7 md:gap-5 md:px-8 md:pt-10">
        {project.shots.slice(0, 3).map((src, i) => (
          <div
            key={src}
            className="relative w-[28%] shrink-0 overflow-hidden rounded-t-[12px] border border-cream/12 shadow-[0_16px_40px_-20px_rgba(0,0,0,0.9)] md:rounded-t-[16px]"
            style={{ transform: `translateY(${i === 1 ? -16 : 0}px)` }}
          >
            <Image
              src={asset(src)}
              alt={`${project.name} screen ${i + 1}`}
              width={416}
              height={900}
              sizes="(max-width: 768px) 30vw, 220px"
              className="h-auto w-full"
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="relative h-full min-h-[30vh] overflow-hidden rounded-[18px] bg-ink">
      <Image
        src={asset(project.shots[0])}
        alt={`${project.name} screenshot`}
        width={1400}
        height={875}
        sizes="(max-width: 768px) 92vw, 55vw"
        className="h-full w-full object-cover object-top"
      />
    </div>
  );
}

function Card({ project }: { project: Project }) {
  return (
    <div className="shell grid w-full gap-6 md:grid-cols-12 md:items-center md:gap-10">
      {/* Copy */}
      <div className="order-2 md:order-1 md:col-span-5">
        <div className="mb-4 flex items-center gap-3 md:mb-5">
          {project.icon ? (
            <Image
              src={asset(project.icon)}
              alt={`${project.name} app icon`}
              width={56}
              height={56}
              className="h-11 w-11 rounded-[11px] shadow-[0_8px_24px_-10px_rgba(0,0,0,0.5)] md:h-14 md:w-14 md:rounded-[14px]"
            />
          ) : (
            <span className="font-display grid h-11 w-11 shrink-0 place-items-center rounded-[11px] bg-ink text-lg text-yellow md:h-14 md:w-14 md:rounded-[14px] md:text-2xl">
              {project.name.charAt(0)}
            </span>
          )}
          <div className="min-w-0">
            <h3 className="t-h3 text-[1.35rem] md:text-[1.9rem]">
              {project.name}
            </h3>
            <p className="t-label mt-0.5 text-ink/50">{project.tagline}</p>
          </div>
        </div>

        <div className="mb-4 flex flex-wrap items-center gap-2 md:mb-6">
          <KindTag kind={project.kind} />
          <StatusTag status={project.status} />
          <span className="t-label rounded-full border border-ink/20 px-3 py-1.5 text-[0.56rem] text-ink/60">
            {project.year}
          </span>
        </div>

        <p className="t-body mb-5 line-clamp-5 text-[0.92rem] text-ink/70 md:mb-7 md:line-clamp-none md:text-base">
          {project.body}
        </p>

        <ul className="mb-5 flex flex-wrap gap-2 md:mb-7">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="t-label rounded-full border border-ink/15 px-2.5 py-1 text-[0.55rem] text-ink/65"
            >
              {tag}
            </li>
          ))}
        </ul>

        <div className="hidden border-t border-ink/10 pt-5 md:block">
          <p className="t-label mb-1.5 text-ink/40">Role</p>
          <p className="t-body mb-6 text-ink/75">{project.role}</p>
        </div>

        <div className="flex flex-wrap gap-2.5">
          {project.links
            .filter((l) => l.href)
            .map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-solid !px-4 !py-2.5 !text-[0.65rem]"
              >
                {l.label}
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden>
                  <path
                    d="M2.5 9.5 9.5 2.5M4 2.5h5.5V8"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            ))}
        </div>
      </div>

      {/* Media */}
      <div className="order-1 h-[30vh] md:order-2 md:col-span-7 md:h-[62vh]">
        <CardMedia project={project} />
      </div>
    </div>
  );
}

export default function Projects() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const total = projects.items.length;

  useIsomorphicLayoutEffect(() => {
    const el = root.current;
    const stageEl = stage.current;
    const trackEl = track.current;
    if (!el || !stageEl || !trackEl || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Pin the stage and convert vertical scroll into horizontal travel.
      // Scroll distance equals the track's overflow, so the mapping is 1:1 and
      // normal vertical scrolling resumes once the last card is reached.
      const st = ScrollTrigger.create({
        trigger: stageEl,
        start: "top top",
        end: () => "+=" + (trackEl.scrollWidth - window.innerWidth),
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) =>
          setActive(Math.round(self.progress * (total - 1))),
        animation: gsap.to(trackEl, {
          x: () => -(trackEl.scrollWidth - window.innerWidth),
          ease: "none",
        }),
      });

      return () => st.kill();
    }, root);

    return () => ctx.revert();
  }, [total]);

  /** Arrow controls scroll the page, which drives the pinned track. */
  const nudge = (dir: 1 | -1) => {
    const trackEl = track.current;
    if (!trackEl) return;
    window.scrollBy({ left: 0, top: window.innerWidth * dir, behavior: "smooth" });
  };

  return (
    <section
      ref={root}
      id="projects"
      className="relative z-20 rounded-t-[28px] bg-sand-2 pt-20 md:rounded-t-[44px] md:pt-28"
    >
      {/* Heading (normal flow, scrolls away before the pin starts) */}
      <div className="shell mb-12 grid gap-8 md:mb-16 md:grid-cols-12 md:items-end">
        <div className="md:col-span-6">
          <p className="t-label mb-5 text-ink/45">{projects.eyebrow}</p>
          <SplitLines className="t-h2" as="h2">
            {projects.heading.join("\n")}
          </SplitLines>
        </div>
        <div className="md:col-span-6">
          <SplitLines className="t-body text-ink/65" as="p" delay={0.1}>
            {projects.intro}
          </SplitLines>
        </div>
      </div>

      {/* Pinned stage */}
      <div
        ref={stage}
        className="relative h-[100svh] overflow-hidden"
        role="region"
        aria-label="Projects"
      >
        <div ref={track} className="flex h-full will-change-transform">
          {projects.items.map((p) => (
            <div
              key={p.slug}
              className="project-card flex h-full w-screen shrink-0 items-center pb-24 md:pb-20"
            >
              <Card project={p} />
            </div>
          ))}
        </div>

        {/* Progress + controls */}
        <div className="shell pointer-events-none absolute inset-x-0 bottom-6 flex items-center justify-between gap-4 md:bottom-8">
          <div className="flex items-center gap-1.5" aria-hidden>
            {projects.items.map((p, i) => (
              <span
                key={p.slug}
                className={`h-[3px] rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  i === active ? "w-8 bg-ink" : "w-3 bg-ink/25"
                }`}
              />
            ))}
          </div>
          <div className="pointer-events-auto flex items-center gap-2.5">
            <span className="t-label mr-1 hidden text-ink/40 sm:block">
              {String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            {(["prev", "next"] as const).map((dir) => (
              <button
                key={dir}
                type="button"
                onClick={() => nudge(dir === "next" ? 1 : -1)}
                aria-label={dir === "prev" ? "Previous project" : "Next project"}
                disabled={dir === "prev" ? active === 0 : active === total - 1}
                className="grid h-11 w-11 place-items-center rounded-full border border-ink/25 bg-sand-2/70 backdrop-blur transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-ink hover:bg-ink hover:text-cream disabled:pointer-events-none disabled:opacity-25"
              >
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path
                    d={dir === "prev" ? "M10 3 5 8l5 5" : "M6 3l5 5-5 5"}
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="h-20 md:h-28" />
    </section>
  );
}
