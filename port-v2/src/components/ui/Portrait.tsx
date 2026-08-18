"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Renders the portrait if one exists at `src`, otherwise falls back to a
 * styled silhouette so the hero composition still reads correctly.
 *
 * To use your own photo: drop a background-removed PNG at
 * `public/assets/portrait.png` (roughly 1200×1600, transparent background).
 */
/**
 * next/image rewrites asset URLs for `basePath`, but a raw <img> does not, so
 * the prefix has to be applied by hand here.
 */
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function Portrait({
  src = "/assets/portrait.png",
  alt,
  className = "",
  wrapClassName = "",
}: {
  src?: string;
  alt: string;
  className?: string;
  wrapClassName?: string;
}) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [failed, setFailed] = useState(false);

  // The <img> is in the SSR HTML, so a 404 can fire before React hydrates and
  // attaches onError. Re-check completed-but-empty images on mount.
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`relative flex items-end justify-center ${wrapClassName} ${className}`}
      >
        {/* Torso */}
        <div className="absolute bottom-0 left-1/2 h-[62%] w-[74%] -translate-x-1/2 rounded-t-[46%_38%] bg-gradient-to-b from-charcoal via-ink to-ink" />
        {/* Head */}
        <div className="absolute bottom-[56%] left-1/2 h-[26%] w-[38%] -translate-x-1/2 rounded-[50%] bg-charcoal" />
        {/* Hint chip */}
        <span className="t-label relative z-10 mb-[8%] rounded-full bg-yellow px-3 py-1.5 text-[0.55rem] whitespace-nowrap text-ink">
          add portrait.png
        </span>
      </div>
    );
  }

  return (
    <div className={wrapClassName}>
      {/* Plain <img> so a missing file degrades to the silhouette above rather
          than throwing. Swap to next/image once the real asset is in place. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src={`${BASE}${src}`}
        alt={alt}
        className={className}
        onError={() => setFailed(true)}
        draggable={false}
      />
    </div>
  );
}
