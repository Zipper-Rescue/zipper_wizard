import * as React from "react";
import { useEffect } from "react";

import { cn } from "@/lib/util/cn.ts";

export function StepLayout({
  title,
  description,
  links,
}: {
  title: string | React.ReactNode;
  description?: string | React.ReactNode;
  links?: React.ReactNode[];
}) {
  const ref = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      // Wait for the component to render, and iframe to resize, before
      // scrolling into view.
      setTimeout(() => {
        ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 30);
    }
  });

  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col items-center gap-1",
        "p-2",
        "bg-white",

        // Padding top accounts for the fixed header, which will cover
        // the title of the step when it is scrolled into view.
        "pt-[100px] md:pt-[120px]",
      )}
    >
      <h1 className={"text-3xl font-semibold"}>{title}</h1>
      <section className={"mb-4 text-center"}>{description}</section>

      {links && (
        <section className={"flex gap-2 flex-wrap justify-center"}>
          {links}
        </section>
      )}
    </div>
  );
}
