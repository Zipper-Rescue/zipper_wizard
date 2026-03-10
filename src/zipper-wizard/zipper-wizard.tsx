import { useState } from "react";

import { FieldStep } from "@/components/field-step.tsx";
import { computeStepStatuses } from "@/zipper-wizard/step-builder.ts";
import { wizardSteps } from "@/zipper-wizard/wizard-steps.tsx";

const template = wizardSteps.indicatorTemplate;

export function ZipperWizard() {
  const [currentData, setCurrentData] = useState<Array<[string, string]>>([]);

  const steps = wizardSteps.buildSteps(currentData);

  return (
    <div className="flex flex-col gap-20 pb-[320px]">
      {steps.map((step, index) => {
        const showIndicator = index > 0 && step.options.length > 0;
        const keysUpToHere = new Set(
          steps.slice(0, index + 1).map((s) => s.key),
        );
        const statuses = showIndicator
          ? computeStepStatuses(template, keysUpToHere, step.key)
          : undefined;
        return (
          <FieldStep
            fieldData={step}
            key={step.key}
            selectedValue={currentData[index]?.[1]}
            stepStatuses={statuses}
            onDataChanged={(key, value) => {
              setCurrentData([...currentData.slice(0, index), [key, value]]);
            }}
          />
        );
      })}
    </div>
  );
}
