export function postAddToCartMessage(productId: number) {
  window.parent.postMessage(
    { command: "add-to-cart", productId, quantity: 1 },
    "*",
  );
}
