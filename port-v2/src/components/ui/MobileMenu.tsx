"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { nav, site, socials } from "@/lib/content";

/** Full-screen nav for phones, opened from the hero top bar. */
export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-sand-3 transition-colors duration-300 active:bg-yellow"
      >
        <span aria-hidden className="grid grid-cols-2 gap-[3px]">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="block h-[7px] w-[7px] rounded-[2px] bg-ink" />
          ))}
        </span>
      </button>

      {mounted &&
        createPortal(
          <div
            className={`fixed inset-0 z-[60] bg-ink transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              open
                ? "pointer-events-auto opacity-100"
                : "pointer-events-none opacity-0"
            }`}
            role="dialog"
            aria-modal="true"
            aria-hidden={!open}
          >
            <div className="flex h-full flex-col p-6">
              <div className="flex items-center justify-between">
                <span className="font-display rounded-xl bg-yellow px-3 py-1.5 text-lg leading-none text-ink">
                  {site.wordmark}
                  <span className="align-super text-[0.6em]">®</span>
                </span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="grid h-11 w-11 place-items-center rounded-xl border border-cream/25"
                >
                  <span aria-hidden className="relative block h-4 w-4">
                    <span className="absolute left-0 top-1/2 h-[1.5px] w-4 rotate-45 bg-cream" />
                    <span className="absolute left-0 top-1/2 h-[1.5px] w-4 -rotate-45 bg-cream" />
                  </span>
                </button>
              </div>

              <nav className="mt-12 flex flex-col gap-1">
                {nav.map((item, i) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="font-display border-b border-cream/12 py-4 text-3xl text-cream transition-colors duration-300 active:text-yellow"
                    style={{
                      transitionDelay: open ? `${80 + i * 40}ms` : "0ms",
                      transform: open ? "translateY(0)" : "translateY(12px)",
                      opacity: open ? 1 : 0,
                      transitionProperty: "transform, opacity, color",
                      transitionDuration: "600ms",
                      transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
                    }}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              <div className="mt-auto flex flex-wrap gap-4">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="t-label text-cream/60"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
