import { cn } from "@/lib/util/cn.ts";

import type { StepStatus } from "@/zipper-wizard/step-builder.ts";

const circleBase =
  "rounded-full flex items-center justify-center font-bold shrink-0";

const lineHeavy = "h-[2.5px] bg-primary";
const lineThin = "h-px bg-primary";

const circleStrokeStyle: Record<StepStatus, string> = {
  completed: "border-[2.5px] border-primary",
  current: "",
  upcoming: "border border-primary",
  uncertain: "border border-dashed border-primary/40",
  skipped: "border border-primary/20",
};

const circleStyles: Record<StepStatus, string> = {
  completed: "w-8 h-8 text-sm bg-primary/5 text-primary",
  current: "w-9 h-9 text-sm bg-primary text-primary-foreground",
  upcoming: "w-7 h-7 text-xs text-primary",
  uncertain: "w-7 h-7 text-xs text-primary/40",
  skipped: "w-7 h-7 text-xs text-primary/20",
};

const lineStrokeStyle: Record<StepStatus, string> = {
  completed: lineHeavy,
  current: lineHeavy,
  skipped: lineHeavy,
  upcoming: lineThin,
  uncertain: lineThin,
};

function isHeavy(status: StepStatus) {
  return status === "completed" || status === "current" || status === "skipped";
}

export function StepIndicator({ statuses }: { statuses: StepStatus[] }) {
  const lastStatus = statuses[statuses.length - 1];
  const destinationReached = statuses.every(
    (s) => s === "completed" || s === "skipped",
  );

  return (
    <div className="flex items-center justify-center gap-0 mt-2">
      {statuses.map((status, i) => {
        return (
          <div key={i} className="flex items-center flex-1 max-w-12">
            <div
              className={cn(
                circleBase,
                circleStrokeStyle[status],
                circleStyles[status],
              )}
            >
              {i + 1}
            </div>
            {i < statuses.length - 1 && (
              <div
                className={cn(
                  "flex-1 min-w-3",
                  lineStrokeStyle[statuses[i + 1]],
                )}
              />
            )}
          </div>
        );
      })}

      <div className="flex items-center flex-1 max-w-12">
        <div
          className={cn(
            "flex-1 min-w-3",
            isHeavy(lastStatus) ? lineHeavy : lineThin,
          )}
        />
        <div
          className={cn(
            circleBase,
            "w-8 h-8",
            destinationReached
              ? "bg-primary text-primary-foreground"
              : "border border-primary text-primary",
          )}
        >
          <ZipperPullIcon className="w-5 h-5" />
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
