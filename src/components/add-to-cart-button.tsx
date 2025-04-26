import { Button } from "@/components/ui/button";
import { SkuItem } from "@/product-data/sku-types.ts";

import { postAddToCartMessage } from "./postAddToCartMessage";

export function AddToCartButton(props: {
  skus?: SkuItem[];
  sku?: SkuItem;
  className?: string;
}) {
  const skus = [...(props.skus || []), ...(props.sku ? [props.sku] : [])];

  return (
    <Button
      onClick={() => {
        postAddToCartMessage(skus.map((it) => it.productId));
      }}
      title={`Add ${skus.map((it) => it.label).join(", ")} to cart`}
      className={props.className}
    >
      Add to cart
    </Button>
  );
}
