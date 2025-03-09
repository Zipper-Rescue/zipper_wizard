// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export

import { ZipperWizard } from "@/zipper-wizard/zipper-wizard.tsx";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: ZipperWizard,
} satisfies Meta<typeof ZipperWizard>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {},
};
