"use client";

import { useState } from "react";

/** Click-to-copy email, matching the reference's copy interaction. */
export default function CopyEmail({
  email,
  className = "",
}: {
  email: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`Copy email address ${email}`}
      className={`group relative inline-flex items-center gap-3 ${className}`}
    >
      <span className="link-sweep">{email}</span>
      <span
        aria-live="polite"
        className="t-label shrink-0 rounded-full border border-current/25 px-2.5 py-1 text-[0.6rem] opacity-60 transition-opacity duration-300 group-hover:opacity-100"
      >
        {copied ? "Copied" : "Copy"}
      </span>
    </button>
  );
}
