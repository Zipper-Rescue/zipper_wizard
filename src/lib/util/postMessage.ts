interface PostMessageOptions {
  timeoutMs?: number;
}

export async function postMessage<T extends { command: string }>(
  message: T,
  options?: PostMessageOptions,
): Promise<void> {
  const uid = Math.random().toString(36).slice(2);
  const messageWithUid = { ...message, uid };

  return new Promise<void>((resolve, reject) => {
    const timeout = setTimeout(() => {
      window.removeEventListener("message", handleMessage);
      reject(new Error("Timeout"));
    }, options?.timeoutMs ?? 30_000);

    const handleMessage = (event: MessageEvent) => {
      const data = event.data as { message: string; uid: string };
      console.log("handleMessage", event.data);
      if (data.message === "command-complete" && data.uid === uid) {
        window.removeEventListener("message", handleMessage);
        resolve();
        clearTimeout(timeout);
      }
    };

    window.addEventListener("message", handleMessage);
    window.parent.postMessage(messageWithUid, "*");
  });
}
