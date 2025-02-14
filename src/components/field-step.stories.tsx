import type { Meta, StoryObj } from "@storybook/react";
import { FieldStep } from "@/components/field-step.tsx";
import { zipperTypeField } from "@/data/zipper-type/zipper-type-field.ts";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  component: FieldStep,
} satisfies Meta<typeof FieldStep>;

export default meta;
type Story = StoryObj<typeof meta>;

//
// -----------------------------------------------------------------------------
//
export const NoSelection: Story = {
  args: {
    fieldData: zipperTypeField,
  },
};

//
// -----------------------------------------------------------------------------
//
export const WithSelection: Story = {
  args: {
    fieldData: zipperTypeField,
    selectedValue: "two-way",
  },
};
