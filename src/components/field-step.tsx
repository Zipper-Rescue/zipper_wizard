import { StepLayout } from "@/components/step-layout.tsx";
import { StepInfo } from "@/data/step-builder.ts";
import { ImageOption } from "@/components/image-option.tsx";
import { useState } from "react";
import { Button } from "@/components/ui/button.tsx";

export function FieldStep({
  fieldData,
  onDataChanged,
  ...props
}: {
  fieldData: StepInfo;
  onDataChanged?: (key: string, value: unknown) => void;
  selectedValue?: string;
}) {
  const [selectedValue, setSelectedValue] = useState<string | undefined>(
    props.selectedValue,
  );

  const selectedOption = fieldData.options.find(
    (option) => option.value === selectedValue,
  );
  const optionChoices =
    selectedOption != null ? [selectedOption] : fieldData.options;

  return (
    <StepLayout
      title={fieldData.label}
      description={fieldData.description}
      links={optionChoices.map((option) => (
        <div className={"flex flex-col gap-2"} key={option.value}>
          <ImageOption
            imageUrl={option.imageUrl}
            label={option.label}
            onClick={() => {
              setSelectedValue(option.value);
              onDataChanged?.(fieldData.key, option.value);
            }}
          />

          {selectedOption && (
            <Button
              onClick={() => {
                setSelectedValue(undefined);
                onDataChanged?.(fieldData.key, undefined);
              }}
            >
              Change
            </Button>
          )}
        </div>
      ))}
    ></StepLayout>
  );
}
