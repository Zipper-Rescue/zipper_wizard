import { WizardIntro } from "./wizard-intro.tsx";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: WizardIntro,
} satisfies Meta<typeof WizardIntro>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
