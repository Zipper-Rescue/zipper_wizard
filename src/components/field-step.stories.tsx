import type { Meta, StoryObj } from "@storybook/react";
import { FieldStep } from "@/components/field-step.tsx";
import { zipperTypeField } from "@/data/zipper-type/zipper-type-field.ts";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  component: FieldStep,
} satisfies Meta<typeof FieldStep>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    fieldData: zipperTypeField,
  },
};
