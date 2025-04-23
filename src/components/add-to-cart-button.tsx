import { Button } from "@/components/ui/button";
import { SkuItem } from "@/product-data/sku-types.ts";

import { postAddToCartMessage } from "./postAddToCartMessage";

export function AddToCartButton({
  sku,
  className,
}: {
  sku: SkuItem;
  className?: string;
}) {
  return (
    <Button
      onClick={() => {
        postAddToCartMessage(sku.productId);
      }}
      title={`Add ${sku.label} to cart`}
      className={className}
    >
      Add to cart
    </Button>
  );
}
