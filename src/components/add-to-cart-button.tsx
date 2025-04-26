import { useState } from "react";

import { Button } from "@/components/ui/button";
import { SkuItem } from "@/product-data/sku-types.ts";

import { postAddToCartMessage } from "./postAddToCartMessage";
import { postNavigateMessage } from "./postNavigateMessage";

type WorkflowState =
  | "add-to-cart"
  | "adding-to-cart"
  | "go-to-cart"
  | "going-to-cart";

export type AddToCartButtonProps = {
  skus?: SkuItem[];
  sku?: SkuItem;
  className?: string;
  workflowState?: WorkflowState;
  onAddToCart?: (productIds: number[]) => Promise<void>;
  onNavigate?: (path: string) => Promise<void>;
};

export function AddToCartButton({
  skus = [],
  sku,
  className,
  workflowState = "add-to-cart",
  onAddToCart = postAddToCartMessage,
  onNavigate = postNavigateMessage,
}: AddToCartButtonProps) {
  const skusList = [...skus, ...(sku ? [sku] : [])];
  const [currentWorkflowState, setCurrentWorkflowState] =
    useState<WorkflowState>(workflowState);

  const handleAddToCart = async () => {
    try {
      setCurrentWorkflowState("adding-to-cart");
      await onAddToCart(skusList.map((it) => it.productId));
    } finally {
      await handleGoToCart();
    }
  };

  const handleGoToCart = async () => {
    try {
      setCurrentWorkflowState("going-to-cart");
      await onNavigate("/cart");
    } catch (error) {
      console.error("Failed to navigate to cart:", error);
    } finally {
      // Done
    }
  };

  const getButtonLabel = () => {
    switch (currentWorkflowState) {
      case "adding-to-cart":
        return "Adding to cart...";
      case "go-to-cart":
        return "Go to cart";
      case "going-to-cart":
        return "Going to cart...";
      default:
        return "Add to cart";
    }
  };

  const getButtonTitle = () => {
    switch (currentWorkflowState) {
      case "go-to-cart":
      case "going-to-cart":
        return "Go to cart";
      default:
        return `Add ${skusList.map((it) => it.label).join(", ")} to cart`;
    }
  };

  const handleClick = async () => {
    if (currentWorkflowState === "go-to-cart") {
      await handleGoToCart();
    }

    if (currentWorkflowState === "add-to-cart") {
      await handleAddToCart();
    }
  };

  const showSpinner =
    currentWorkflowState === "adding-to-cart" ||
    currentWorkflowState === "going-to-cart";

  return (
    <Button
      onClick={() => {
        handleClick().catch(console.error);
      }}
      title={getButtonTitle()}
      className={className}
      disabled={showSpinner}
    >
      {showSpinner ? (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          {getButtonLabel()}
        </div>
      ) : (
        getButtonLabel()
      )}
    </Button>
  );
}
