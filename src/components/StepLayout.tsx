import * as React from "react";
import {cn} from "@/lib/utils.ts";

export function StepLayout({
                             title, subTitle, description, links
                           }: {
  title: string | React.ReactNode;
  subTitle?: string | React.ReactNode;
  description?: string | React.ReactNode;
  links?: React.ReactNode[];
}) {
  return (
    <div className={cn("flex flex-col items-center gap-1", "bg-white")}>
      <h1 className={"text-3xl font-semibold"}>{ title }</h1>
      <h2 className={"mb-1 text-center"}>{ subTitle }</h2>
      <section className={"mb-4 text-center"}>{ description }</section>

      { links?.length && <section className={"flex gap-2 flex-wrap justify-center"}>{ links }</section>}
    </div>
  );
}