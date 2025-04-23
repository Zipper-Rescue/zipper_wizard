import { ImageOption } from "@/components/image-option.tsx";
import { StepLayout } from "@/components/step-layout.tsx";
import { StepInfo } from "@/zipper-wizard/step-builder.ts";

export function FieldStep({
  fieldData,
  onDataChanged,
  selectedValue,
}: {
  fieldData: StepInfo;
  onDataChanged?: (key: string, value: string) => void;
  selectedValue?: string;
}) {
  // const selectedOption = fieldData.options.find(
  //   (option) => option.value === selectedValue,
  // );

  return (
    <StepLayout
      title={fieldData.label}
      description={fieldData.description}
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
