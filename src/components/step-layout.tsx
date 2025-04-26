import * as React from "react";
import { useEffect } from "react";

import { iframeSafeScrollIntoView } from "@/lib/iframeSafeScrollIntoView.ts";
import { cn } from "@/lib/util/cn.ts";

export function StepLayout({
  title,
  description,
  links,
}: {
  title?: string | React.ReactNode | null;
  description?: string | React.ReactNode;
  links?: React.ReactNode[];
}) {
  const ref = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      // Wait for the component to render, and iframe to resize, before
      // scrolling into view.
      setTimeout(() => {
        iframeSafeScrollIntoView(ref.current, {
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  });

  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col items-center gap-1 p-2 bg-white pt-10 md:pt-[120px]",
      )}
    >
      {title && <h1 className={"text-3xl font-semibold"}>{title}</h1>}
      <section className={"mb-4 text-center"}>{description}</section>

      {links && (
        <section className={"flex gap-2 flex-wrap justify-center"}>
          {links}
        </section>
      )}
    </div>
  );
}
