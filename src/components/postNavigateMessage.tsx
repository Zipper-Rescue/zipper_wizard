import { postMessage } from "@/lib/util/postMessage";

const defaultBaseUrl = "https://staging2.zipperrescue.com/";

export async function postNavigateMessage(
  path: string,
  options?: { timeoutMs?: number },
) {
  if (window.parent == window) {
    window.open(defaultBaseUrl + path);
    return Promise.resolve();
  }

  return postMessage({ command: "navigate", path }, options);
}
