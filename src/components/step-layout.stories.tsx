import type { Meta, StoryObj } from "@storybook/react";

import { StepLayout } from "./step-layout.tsx";
import { ImageOption } from "@/components/image-option.tsx";

import separatingImage from "@/zipper-wizard/zipper-type/separating.png";
import nonSeparatingImage from "@/zipper-wizard/zipper-type/non-separating.png";
import twoWaySeparatingImage from "@/zipper-wizard/zipper-type/two-way-separating.png";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  component: StepLayout,
} satisfies Meta<typeof StepLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    title: "Example Step",
    description: (
      <>
        <p>
          This is an <strong>important</strong> step. Please follow the
          instructions carefully.
        </p>
        <p>
          Once you know what you need to do, click the button below to continue.
        </p>
      </>
    ),
    links: [
      <ImageOption imageUrl={separatingImage} label="Separating" key={1} />,
      <ImageOption
        imageUrl={nonSeparatingImage}
        label="Non-separating"
        key={1}
      />,
      <ImageOption
        imageUrl={twoWaySeparatingImage}
        label="Two-way separating"
        key={1}
      />,
    ],
  },
};
