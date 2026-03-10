import { ImageOption } from "@/components/image-option.tsx";
import { StepIndicator } from "@/components/step-indicator.tsx";
import { StepLayout } from "@/components/step-layout.tsx";

import type { StepInfo, StepStatus } from "@/zipper-wizard/step-builder.ts";

export function FieldStep({
  fieldData,
  onDataChanged,
  selectedValue,
  stepStatuses,
}: {
  fieldData: StepInfo;
  onDataChanged?: (key: string, value: string) => void;
  selectedValue?: string;
  stepStatuses?: StepStatus[];
}) {
  const indicator = stepStatuses ? (
    <StepIndicator statuses={stepStatuses} />
  ) : undefined;

  return (
    <StepLayout
      title={fieldData.label}
      description={fieldData.description}
      indicator={indicator}
      links={fieldData.options.map((option) => (
        <div className={"flex flex-col gap-2"} key={option.value}>
          <ImageOption
            imageUrl={option.imageUrl}
            label={option.label}
            isSelected={option.value === selectedValue}
            imageClass={option.imageClass}
            onClick={() => {
              onDataChanged?.(fieldData.key, option.value);
            }}
          />
        </div>
      ))}
    ></StepLayout>
  );
}
