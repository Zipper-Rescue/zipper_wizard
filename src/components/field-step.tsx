import { StepLayout } from "@/components/step-layout.tsx";
import { DataField } from "@/data/data-field.ts";
import { ImageOption } from "@/components/image-option.tsx";
import { useState } from "react";
import { Button } from "@/components/ui/button.tsx";

export function FieldStep({ fieldData }: { fieldData: DataField }) {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

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
            }}
          />

          {selectedOption != null && (
            <Button
              onClick={() => {
                setSelectedValue(null);
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
