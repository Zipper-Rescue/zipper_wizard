import { useState } from "react";

import { FieldStep } from "@/components/field-step.tsx";
import { wizardSteps } from "@/zipper-wizard/wizard-steps.tsx";

export function ZipperWizard() {
  const [currentData, setCurrentData] = useState<Array<[string, string]>>([]);

  const { steps, remainingRequiredCount, remainingConditionalCount } =
    wizardSteps.buildSteps(currentData);

  const indicatorSteps = steps
    .map((step, i) => ({ step, originalIndex: i }))
    .filter(
      ({ step, originalIndex }) => originalIndex > 0 && step.options.length > 0,
    );
  const totalIndicatorSteps =
    indicatorSteps.length +
    Math.max(remainingRequiredCount - 1, 0) +
    remainingConditionalCount;
  const uncertainCount = remainingConditionalCount;
  const indicatorStepByOriginalIndex = new Map(
    indicatorSteps.map(({ originalIndex }, pos) => [
      originalIndex,
      {
        stepIndex: pos + 1,
        totalSteps: totalIndicatorSteps,
        uncertainCount,
      },
    ]),
  );

  return (
    <div className="flex flex-col gap-20 pb-[320px]">
      {steps.map((step, index) => {
        const indicatorProps = indicatorStepByOriginalIndex.get(index);
        return (
          <FieldStep
            fieldData={step}
            key={step.key}
            selectedValue={currentData[index]?.[1]}
            stepIndex={indicatorProps?.stepIndex}
            totalSteps={indicatorProps?.totalSteps}
            uncertainCount={indicatorProps?.uncertainCount}
            onDataChanged={(key, value) => {
              setCurrentData([...currentData.slice(0, index), [key, value]]);
            }}
          />
        );
      })}
    </div>
  );
}
