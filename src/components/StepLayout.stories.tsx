import type { Meta, StoryObj } from "@storybook/react";

import { StepLayout } from "./StepLayout.tsx";
import { ImageOption } from "@/components/ImageOption.tsx";

import separatingImage from "../../public/images/zipper_type/separating.png";
import nonSeparatingImage from "../../public/images/zipper_type/non-separating.png";
import twoWaySeparatingImage from "../../public/images/zipper_type/two-way-separating.png";

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
    subTitle: "This step is an example!",
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
