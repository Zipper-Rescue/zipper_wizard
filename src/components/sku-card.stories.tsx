import { skuData } from "@/product-data/sku-data.generated";

import { SkuCard } from "./sku-card";

import type { SkuItem } from "@/product-data/sku-types";
import type { Meta, StoryObj } from "@storybook/react";

const sliderSkus = skuData.filter(
  (item): item is SkuItem & { productType: "slider" } =>
    item.productType === "slider",
);

const kitSkus = skuData.filter(
  (item): item is SkuItem & { productType: "kit" } =>
    item.productType === "kit",
);

const stopSkus = skuData.filter(
  (item): item is SkuItem & { productType: "stop" } =>
    item.productType === "stop",
);

const meta = {
  title: "Components/SkuCard",
  component: SkuCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SkuCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Slider: Story = {
  args: {
    sku: sliderSkus[0],
  },
};

export const Kit: Story = {
  args: {
    sku: kitSkus[0],
  },
};

export const Stop: Story = {
  args: {
    sku: stopSkus[0],
  },
};
