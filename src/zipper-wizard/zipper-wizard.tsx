import { useState } from "react";
import { wizardSteps } from "@/zipper-wizard/wizard-steps.ts";
import { FieldStep } from "@/components/field-step.tsx";

export function ZipperWizard() {
  const [currentData, setCurrentData] = useState<object>({});

  const { steps, relevantInput } = wizardSteps.buildSteps(currentData);

  return (
    <div className="flex flex-col gap-2 pb-[320px]">
      {steps.map((step) => (
        <FieldStep
          fieldData={step}
          key={step.key}
          onDataChanged={(key, value) => {
            setCurrentData({ ...relevantInput, [key]: value });
          }}
        />
      ))}
    </div>
  );
}
