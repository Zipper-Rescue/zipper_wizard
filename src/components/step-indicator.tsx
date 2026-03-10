import { cn } from "@/lib/util/cn.ts";

export function StepIndicator({
  totalSteps,
  currentStep,
  uncertainCount = 0,
}: {
  totalSteps: number;
  currentStep: number;
  uncertainCount?: number;
}) {
  const firstUncertainIndex = totalSteps - uncertainCount;

  return (
    <div className="flex items-center justify-center gap-0 mt-2">
      {Array.from({ length: totalSteps }, (_, i) => {
        const stepNumber = i + 1;
        const isCompleted = stepNumber < currentStep;
        const isUncertain = i >= firstUncertainIndex;
        const nextCompleted = stepNumber + 1 < currentStep;
        const lineFilled = isCompleted && nextCompleted;

        return (
          <div key={stepNumber} className="flex items-center flex-1 max-w-12">
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0",
                isCompleted && "bg-primary text-primary-foreground",
                !isCompleted &&
                  !isUncertain &&
                  "border-2 border-primary text-primary",
                isUncertain &&
                  "border-2 border-dashed border-primary/40 text-primary/40",
              )}
            >
              {stepNumber}
            </div>
            {i < totalSteps - 1 && (
              <div
                className={cn(
                  "flex-1 h-0.5 min-w-2 mx-0.5",
                  lineFilled
                    ? "bg-primary"
                    : i >= firstUncertainIndex - 1
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
