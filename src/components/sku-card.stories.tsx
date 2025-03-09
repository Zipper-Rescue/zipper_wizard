import { SkuCard } from "@/components/sku-card.tsx";
import { Throw } from "@/lib/util/throw.js";
import { skuData } from "@/product-data/sku-data.js";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: SkuCard,
} satisfies Meta<typeof SkuCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// Get a slider example
const sliderExample =
  skuData.find((sku) => sku.productType === "slider") ?? Throw("missing");
// Get a stop example
const stopExample =
  skuData.find((sku) => sku.productType === "stop") ?? Throw("missing");

export const SliderExample: Story = {
  args: {
    sku: sliderExample,
  },
};

export const StopExample: Story = {
  args: {
    sku: stopExample,
  },
};

export const Selected: Story = {
  args: {
    sku: sliderExample,
    isSelected: true,
  },
};
