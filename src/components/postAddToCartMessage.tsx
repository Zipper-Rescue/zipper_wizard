export function postAddToCartMessage(productIds: number[]) {
  window.parent.postMessage(
    { command: "add-to-cart", productIds, quantity: 1 },
    "*",
  );
}
