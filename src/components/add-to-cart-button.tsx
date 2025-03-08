import { Button } from "@/components/ui/button";
import { SkuItem } from "@/product-data/sku-data";

export function AddToCartButton({
  sku,
  className,
}: {
  sku: SkuItem;
  className?: string;
}) {
  return (
    <Button
      onClick={() => postAddToCartMessage(sku.productId)}
      title={`Add ${sku.label} to cart`}
      className={className}
    >
      Add to cart
    </Button>
  );
}

export function postAddToCartMessage(productId: number) {
  window.parent.postMessage(
    { command: "add-to-cart", productId, quantity: 1 },
    "*"
  );
}
