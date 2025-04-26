import { useState } from "react";

import { Button } from "@/components/ui/button";
import { SkuItem } from "@/product-data/sku-types.ts";

import { postAddToCartMessage } from "./postAddToCartMessage";
import { postNavigateMessage } from "./postNavigateMessage";

export function AddToCartButton(props: {
  skus?: SkuItem[];
  sku?: SkuItem;
  className?: string;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const skus = [...(props.skus || []), ...(props.sku ? [props.sku] : [])];

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      await postAddToCartMessage(skus.map((it) => it.productId));
      setIsAdded(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoToCart = () => {
    postNavigateMessage("/cart").catch((error: unknown) => {
      console.error("Failed to navigate to cart:", error);
    });
  };

  return (
    <Button
      onClick={isAdded ? handleGoToCart : handleAddToCart}
      title={
        isAdded
          ? "Go to cart"
          : `Add ${skus.map((it) => it.label).join(", ")} to cart`
      }
      className={props.className}
      disabled={isLoading}
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          Adding to cart...
        </div>
      ) : isAdded ? (
        "Go to cart"
      ) : (
        "Add to cart"
      )}
    </Button>
  );
}
