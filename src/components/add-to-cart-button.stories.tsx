import { SkuItem } from "@/product-data/sku-types";

import { AddToCartButton } from "./add-to-cart-button";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof AddToCartButton> = {
  title: "Components/AddToCartButton",
  component: AddToCartButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof AddToCartButton>;

const mockSku: SkuItem = {
  productId: 123,
  productType: "slider",
  label: "Test Product",
  imageFn: async () => ({ default: "test-image.jpg" }),
  toothType: "coil",
  sliderSize: 5,
  pullStyle: "single",
  lockingType: "non-locking",
  teethPerInch: 10,
  applicableItemTypes: ["jacketsAndCoats"],
};

const mockSkus: SkuItem[] = [
  {
    productId: 123,
    productType: "slider",
    label: "Test Product 1",
    imageFn: async () => ({ default: "test-image-1.jpg" }),
    toothType: "coil",
    sliderSize: 5,
    pullStyle: "single",
    lockingType: "non-locking",
    teethPerInch: 10,
    applicableItemTypes: ["jacketsAndCoats"],
  },
  {
    productId: 456,
    productType: "slider",
    label: "Test Product 2",
    imageFn: async () => ({ default: "test-image-2.jpg" }),
    toothType: "coil",
    sliderSize: 5,
    pullStyle: "single",
    lockingType: "non-locking",
    teethPerInch: 10,
    applicableItemTypes: ["jacketsAndCoats"],
  },
];

const mockAddToCart = async (productIds: number[]) => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  console.log("Adding to cart:", productIds);
};

const mockNavigate = async (path: string) => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  console.log("Navigating to:", path);
};

export const Default: Story = {
  args: {
    sku: mockSku,
    onAddToCart: mockAddToCart,
    onNavigate: mockNavigate,
  },
};

export const MultipleSkus: Story = {
  args: {
    skus: mockSkus,
    onAddToCart: mockAddToCart,
    onNavigate: mockNavigate,
  },
};

export const AddingToCart: Story = {
  args: {
    sku: mockSku,
    workflowState: "adding-to-cart",
    onAddToCart: mockAddToCart,
    onNavigate: mockNavigate,
  },
};

export const GoToCart: Story = {
  args: {
    sku: mockSku,
    workflowState: "go-to-cart",
    onAddToCart: mockAddToCart,
    onNavigate: mockNavigate,
  },
};

export const GoingToCart: Story = {
  args: {
    sku: mockSku,
    workflowState: "going-to-cart",
    onAddToCart: mockAddToCart,
    onNavigate: mockNavigate,
  },
};
