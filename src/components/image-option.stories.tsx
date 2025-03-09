import { ImageOption } from "@/components/image-option.tsx";
import image from "@/zipper-wizard/zipper-type/separating.png";

import type { Meta, StoryObj } from "@storybook/react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  component: ImageOption,
} satisfies Meta<typeof ImageOption>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    label: "Example Image Option",
    imageUrl: image,
  },
};
