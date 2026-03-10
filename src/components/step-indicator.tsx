import { cn } from "@/lib/util/cn.ts";

import type { StepStatus } from "@/zipper-wizard/step-builder.ts";

export function StepIndicator({ statuses }: { statuses: StepStatus[] }) {
  const destinationReached = statuses.every(
    (s) => s === "completed" || s === "skipped",
  );
  const lastStatus = statuses[statuses.length - 1];
  const lineToDestinationSolid =
    lastStatus === "completed" || lastStatus === "skipped";

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

      <div className="flex items-center flex-1 max-w-12">
        <div
          className={cn(
            "flex-1 h-0.5 min-w-2 mx-0.5",
            lineToDestinationSolid ? "bg-primary" : "border border-primary",
          )}
        />
        <div
          className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
            destinationReached
              ? "bg-primary text-primary-foreground"
              : "border-2 border-primary text-primary",
          )}
        >
          <ZipperPullIcon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}

function ZipperPullIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 38.9 95"
      className={className}
      fill="currentColor"
    >
      <path d="M.2,10.9c0,2.2-.5,13.1.1,15.4.6,2.3,4.8,1.1,5.4,6.6.6,5.5.9,10.6,0,22-.9,11.4-9.4,18.8-3.4,30.9,0,0,0,0,0,0,4.3,7.6,18.9,12.8,28.7,5.8,0,0,0,0,.2-.1,2.3-1.7,4.3-4,5.9-7.2,4.1-10.2-3.5-19.6-4.4-30.2-.4-5.4-.5-15.2,0-20.5.5-4.8,4.5-3.9,5.7-7.8,1-3.1.2-11.6-.7-16.4S28.9,0,19.4,0,.4,4.9.2,10.9ZM26.3,5c4.6,1.2,7.9,2.4,8.5,7.7.2,1.7.2,11.1-.3,12.2-.2.5-1.2,1.3-1.7,1.5,0-1.8,0-5-1.3-6.5-1.4-1.5-5.2-.7-5.2-1V5ZM15.3,2.9h8v37h-8V2.9ZM15.4,42.5c.9.5,6.7.4,7.6.2.9-.2,3.3-3.2,3.3-4.1v-16.2h3v32.7c0,10.2,9,17.7,4.1,29-4.9,11.3-27.6,10-29.5-4.6-1.2-8.4,5.4-15.8,5.4-23.4V22.4h3.1c0-.1,0,15.6,0,15.6,0,1.2,2.1,4,3,4.5ZM3.8,12.6c.5-4.8,4.2-6.7,8.5-7.7v13.9c0,.3-4-.6-5.5,1.7-1,1.5-.3,4-.5,5.8-.3.4-1.2.1-2-1.2-.8-1.3-1-7.7-.5-12.5Z" />
      <path d="M20.1,69.5c4.6,0,8.3,3.2,8.3,7.1s-3.7,7.1-8.3,7.1-8.3-3.2-8.3-7.1,3.7-7.1,8.3-7.1M20.1,66.3c-6.3,0-11.4,4.6-11.4,10.3s5.1,10.3,11.4,10.3,11.4-4.6,11.4-10.3-5.1-10.3-11.4-10.3h0Z" />
    </svg>
  );
}
