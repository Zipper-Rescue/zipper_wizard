import { useState } from "react";

import { FieldStep } from "@/components/field-step.tsx";
import { wizardSteps } from "@/zipper-wizard/wizard-steps.tsx";

export function ZipperWizard() {
  const [currentData, setCurrentData] = useState<Array<[string, string]>>([]);

  const { steps, stepStatuses } = wizardSteps.buildSteps(currentData);

  return (
    <div className="flex flex-col gap-20 pb-[320px]">
      {steps.map((step, index) => {
        const showIndicator = index > 0 && step.options.length > 0;
        return (
          <FieldStep
            fieldData={step}
            key={step.key}
            selectedValue={currentData[index]?.[1]}
            stepStatuses={showIndicator ? stepStatuses : undefined}
            onDataChanged={(key, value) => {
              setCurrentData([...currentData.slice(0, index), [key, value]]);
            }}
          />
        );
      })}
    </div>
  );
}
