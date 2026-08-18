"use client";

import { useRef, useState } from "react";
import { faq } from "@/lib/content";
import { SplitLines } from "@/components/ui/Anim";

function Item({
  q,
  a,
  open,
  onToggle,
  index,
}: {
  q: string;
  a: string;
  open: boolean;
  onToggle: () => void;
  index: number;
}) {
  const panel = useRef<HTMLDivElement>(null);

  return (
    <li className="border-b border-ink/12">
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={`faq-panel-${index}`}
          className="group flex w-full items-center justify-between gap-6 py-6 text-left md:py-8"
        >
          <span className="t-h3 max-w-[36ch] text-[1.1rem] transition-colors duration-400 group-hover:text-ink/60 md:text-[1.4rem]">
            {q}
          </span>
          <span
            aria-hidden
            className={`relative grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              open
                ? "rotate-45 border-yellow bg-yellow"
                : "border-ink/25 group-hover:border-ink/60"
            }`}
          >
            <span className="absolute h-[1.5px] w-3.5 bg-ink" />
            <span className="absolute h-3.5 w-[1.5px] bg-ink" />
          </span>
        </button>
      </h3>

      <div
        id={`faq-panel-${index}`}
        ref={panel}
        className="grid transition-[grid-template-rows] duration-600 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p
            className={`t-body max-w-[64ch] pb-7 pr-12 text-ink/65 transition-opacity duration-500 ${
              open ? "opacity-100" : "opacity-0"
            }`}
          >
            {a}
          </p>
        </div>
      </div>
    </li>
  );
}

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative z-20 bg-sand py-20 md:py-28">
      <div className="shell">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="md:sticky md:top-[18vh]">
              <p className="t-label mb-5 text-ink/45">FAQ</p>
              <SplitLines className="t-h2" as="h2">
                {faq.heading}
              </SplitLines>
            </div>
          </div>

          <div className="md:col-span-8">
            <ul className="border-t border-ink/12">
              {faq.items.map((item, i) => (
                <Item
                  key={item.q}
                  index={i}
                  q={item.q}
                  a={item.a}
                  open={open === i}
                  onToggle={() => setOpen(open === i ? null : i)}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
