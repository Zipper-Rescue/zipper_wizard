import { postMessage } from "@/lib/util/postMessage";

export async function postNavigateMessage(
  path: string,
  options?: { timeoutMs?: number },
) {
  return postMessage({ command: "navigate", path }, options);
}
