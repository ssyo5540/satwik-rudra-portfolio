"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

/**
 * Lenis smooth scrolling driven by GSAP's ticker, with ScrollTrigger kept in
 * sync. Mirrors the reference site's setup (Lenis + GSAP ScrollTrigger).
 */
export default function SmoothScroll() {
  useEffect(() => {
    document.documentElement.classList.remove("no-js");

    // `?nomotion=1` renders everything in its final state (see prefersReducedMotion).
    if (new URLSearchParams(window.location.search).has("nomotion")) {
      document.documentElement.classList.add("no-js");
    }

    // Native scroll events cover programmatic jumps (deep links, reloads at a
    // saved position, back/forward) that never pass through Lenis. Without
    // this, reveal animations can stay parked in their "from" state.
    const onNativeScroll = () => ScrollTrigger.update();
    window.addEventListener("scroll", onNativeScroll, { passive: true });

    // Re-measure once webfonts settle, otherwise trigger positions are based
    // on fallback-font line boxes and drift.
    let refreshTimer: number | undefined;
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(() => {
      refreshTimer = window.setTimeout(refresh, 60);
    });

    if (prefersReducedMotion()) {
      return () => {
        window.removeEventListener("scroll", onNativeScroll);
        if (refreshTimer) clearTimeout(refreshTimer);
      };
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Anchor links route through Lenis so in-page jumps stay smooth.
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement)?.closest?.(
        'a[href^="#"]'
      ) as HTMLAnchorElement | null;
      if (!anchor) return;
      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: 0, duration: 1.4 });
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("scroll", onNativeScroll);
      if (refreshTimer) clearTimeout(refreshTimer);
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
