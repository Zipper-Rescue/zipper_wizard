import type { Meta, StoryObj } from "@storybook/react";
import { SkuCard } from "@/components/sku-card.tsx";
import { skuData } from "@/product-data/sku-data.js";

const meta = {
  component: SkuCard,
} satisfies Meta<typeof SkuCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// Get a slider example
const sliderExample = skuData.find((sku) => sku.productType === "slider")!;
// Get a stop example
const stopExample = skuData.find((sku) => sku.productType === "stop")!;

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
