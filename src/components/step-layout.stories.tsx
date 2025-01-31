import type { Meta, StoryObj } from '@storybook/react';

import { StepLayout } from './step-layout.tsx';

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
    description: <>
      <p>This is an <strong>important</strong> step. Please follow the instructions carefully.</p>
      <p>Once you know what you need to do, click the button below to continue.</p>
    </>,
    links: [
      <a href="https://example.com" key={1}>Example Link</a>,
      <a href="https://example.com" key={2}>Example Link</a>,
      <a href="https://example.com" key={3}>Example Link</a>,
    ],
  },
};
