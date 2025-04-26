import { postMessage } from "@/lib/util/postMessage";

export async function postAddToCartMessage(
  productIds: number[],
  options?: { timeoutMs?: number },
) {
  return postMessage(
    { command: "add-to-cart", productIds, quantity: 1 },
    options,
  );
}
