import { useState } from "react";

import { FieldStep } from "@/components/field-step.tsx";
import { wizardSteps } from "@/zipper-wizard/wizard-steps.tsx";

export function ZipperWizard() {
  const [currentData, setCurrentData] = useState<Array<[string, string]>>([]);

  const steps = wizardSteps.buildSteps(currentData);

  return (
    <div className="flex flex-col gap-20 pb-[320px]">
      {steps.map((step, index) => (
        <FieldStep
          fieldData={step}
          key={step.key}
          selectedValue={currentData[index]?.[1]}
          onDataChanged={(key, value) => {
            setCurrentData([...currentData.slice(0, index), [key, value]]);
          }}
        />
      ))}
    </div>
  );
}
