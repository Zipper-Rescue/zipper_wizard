import { useState } from "react";
import { wizardSteps } from "@/data/wizard-steps.ts";
import { FieldStep } from "@/components/field-step.tsx";

export function ZipperWizard() {
  const [currentData, setCurrentData] = useState<object>({});

  const steps = wizardSteps.buildSteps(currentData);

  return (
    <div className="flex flex-col gap-8">
      {steps.map((step) => (
        <FieldStep
          fieldData={step}
          key={step.key}
          onDataChanged={(stepData) => {
            setCurrentData((prevData) => ({ ...prevData, ...stepData }));
          }}
        />
      ))}
    </div>
  );
}
