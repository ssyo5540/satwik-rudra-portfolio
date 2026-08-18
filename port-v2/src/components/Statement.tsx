"use client";

import { statement, stack } from "@/lib/content";
import { SplitLines } from "@/components/ui/Anim";
import Marquee from "@/components/ui/Marquee";

/** Big typographic beat between the hero and the story. */
export default function Statement() {
  return (
    <section className="relative z-10 bg-sand pb-16 pt-24 md:pb-24 md:pt-36">
      <div className="shell">
        <SplitLines className="t-display max-w-[14ch]" as="h2">
          {statement.lead}
        </SplitLines>
        <SplitLines
          className="t-display mt-1 text-right text-charcoal/45"
          as="p"
          delay={0.1}
        >
          {statement.emphasis}
        </SplitLines>
      </div>

      <div className="mt-16 border-y border-ink/10 py-5 md:mt-24">
        <Marquee
          items={stack}
          speed={34}
          itemClassName="t-label text-ink/70 text-[0.78rem]"
        />
      </div>
    </section>
  );
}
