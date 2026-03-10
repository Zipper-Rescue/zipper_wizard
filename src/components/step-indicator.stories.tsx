import { StepIndicator } from "./step-indicator.tsx";

import type { StepStatus } from "@/zipper-wizard/step-builder.ts";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: StepIndicator,
} satisfies Meta<typeof StepIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

const allStates: StepStatus[] = [
  "completed", // 1: done
  "completed", // 2: done
  "current", // 3: here
  "skipped", // 4: optional, not needed (e.g. coilType when metal selected)
  "upcoming", // 5: required, waiting
  "uncertain", // 6: optional, maybe
  "uncertain", // 7: optional, maybe
];

export const AllStates: Story = {
  args: {
    statuses: allStates,
  },
};
