import * as React from "react";
import { cn } from "@/lib/util/cn.ts";
import { useEffect } from "react";

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
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  });

  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col items-center gap-1",
        "min-h-[100vh]",
        "p-2",
        "bg-white",
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
