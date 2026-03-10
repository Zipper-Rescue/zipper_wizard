import { cn } from "@/lib/util/cn.ts";

import type { StepStatus } from "@/zipper-wizard/step-builder.ts";

export function StepIndicator({ statuses }: { statuses: StepStatus[] }) {
  return (
    <div className="flex items-center justify-center gap-0 mt-2">
      {statuses.map((status, i) => {
        const stepNumber = i + 1;
        const nextStatus = statuses[i + 1];

        const nextReached =
          nextStatus === "completed" ||
          nextStatus === "current" ||
          nextStatus === "skipped";

        return (
          <div key={stepNumber} className="flex items-center flex-1 max-w-12">
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0",
                status === "completed" && "bg-primary text-primary-foreground",
                (status === "current" || status === "upcoming") &&
                  "border-2 border-primary text-primary",
                status === "uncertain" &&
                  "border-2 border-dashed border-primary/40 text-primary/40",
                status === "skipped" &&
                  "border-2 border-dashed border-primary/20 text-primary/20",
              )}
            >
              {status === "skipped" ? "—" : stepNumber}
            </div>
            {i < statuses.length - 1 && (
              <div
                className={cn(
                  "flex-1 h-0.5 min-w-2 mx-0.5",
                  nextReached
                    ? "bg-primary"
                    : nextStatus === "uncertain"
                      ? "border border-dashed border-primary/40"
                      : "border border-primary",
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
