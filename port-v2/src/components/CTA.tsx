"use client";

import { cta, site, socials } from "@/lib/content";
import { SplitLines } from "@/components/ui/Anim";
import CopyEmail from "@/components/ui/CopyEmail";
import Portrait from "@/components/ui/Portrait";

export default function CTA() {
  return (
    <section
      id="contact"
      className="cta_section noise relative z-20 overflow-hidden rounded-t-[28px] bg-ink py-20 text-cream md:rounded-t-[44px] md:py-32"
    >
      {/* Portrait ghosted behind the copy */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center opacity-[0.13]">
        <Portrait
          alt=""
          wrapClassName="h-[60vh] w-[min(80vw,420px)] flex items-end justify-center"
          className="h-full w-auto object-contain object-bottom grayscale"
        />
      </div>

      <div className="shell relative z-10 text-center">
        <SplitLines className="t-h1 mx-auto max-w-[15ch] text-cream" as="h2">
          {cta.heading}
        </SplitLines>
        <SplitLines
          className="t-h1 mx-auto max-w-[15ch] text-yellow"
          as="p"
          delay={0.08}
        >
          {cta.emphasis}
        </SplitLines>

        <SplitLines
          className="t-body mx-auto mt-8 max-w-[52ch] text-cream/60"
          as="p"
          delay={0.15}
        >
          {cta.body}
        </SplitLines>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a href={`mailto:${site.email}`} className="btn btn-light">
            Send an Email
          </a>
          {socials
            .filter((s) => s.label !== "Email")
            .map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-light"
              >
                {s.label}
              </a>
            ))}
        </div>

        <div className="mt-10">
          <CopyEmail
            email={site.email}
            className="t-body text-cream/70 transition-colors hover:text-yellow"
          />
        </div>
      </div>
    </section>
  );
}
