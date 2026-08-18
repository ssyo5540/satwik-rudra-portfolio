"use client";

import { footer, nav, site, socials } from "@/lib/content";
import CopyEmail from "@/components/ui/CopyEmail";

export default function Footer() {
  return (
    <footer className="relative z-20 overflow-hidden bg-sand pb-8 pt-16 md:pt-24">
      <div className="shell">
        <div className="grid gap-10 border-t border-ink/12 pt-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="t-h3 max-w-[22ch] text-[1.35rem] md:text-[1.6rem]">
              {footer.line}
            </p>
            <CopyEmail
              email={site.email}
              className="t-body mt-6 text-ink/70 transition-colors hover:text-ink"
            />
            <p className="t-label mt-3 text-ink/40">{site.location}</p>
          </div>

          <div className="md:col-span-3 md:col-start-8">
            <p className="t-label mb-5 text-ink/40">Navigate</p>
            <ul className="flex flex-col gap-2.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="t-body link-sweep text-ink/70">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="t-label mb-5 text-ink/40">Elsewhere</p>
            <ul className="flex flex-col gap-2.5">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="t-body link-sweep text-ink/70"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Oversized wordmark sign-off */}
        <div className="mt-16 overflow-hidden">
          <p
            aria-hidden
            className="font-display select-none whitespace-nowrap text-center leading-[0.8] text-ink/[0.07]"
            style={{ fontSize: "clamp(4rem, 21vw, 19rem)" }}
          >
            {site.wordmark}
          </p>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-ink/12 pt-6 md:flex-row">
          <p className="t-label text-ink/40">{footer.copyright}</p>
          <p className="t-label text-ink/40">
            Built with Next.js &amp; GSAP
          </p>
        </div>
      </div>
    </footer>
  );
}
